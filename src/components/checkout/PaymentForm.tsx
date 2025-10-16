// // src/components/checkout/PaymentForm.tsx
// import { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router";
// import axios from "axios";
// import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
// import { useClearCartMutation } from "../../features/cart/cartApi";


// interface PaymentFormProps {
//   cartItems: any[];
//   email: string;
//   eventId?: string;
// }

// const PaymentForm = ({ cartItems, email }: PaymentFormProps) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [isLoading, setIsLoading] = useState(false);
//   const [createBooking] = useCreateBookingMutation();
//   const [clearCart] = useClearCartMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setIsLoading(true);

//     try {
//       // Create PaymentIntent on backend
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/payments/create-payment-intent`,
//         { cartItems, email }
//       );

//       const clientSecret = data.clientSecret;

//       // Confirm Card Payment
//       const cardElement = elements.getElement(CardElement);
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement!, billing_details: { email } },
//       });

//       if (paymentResult.error) {
//         alert(paymentResult.error.message);
//         setIsLoading(false);
//       } else if (paymentResult.paymentIntent.status === "succeeded") {
//         // Payment succeeded: create booking records
//         for (const item of cartItems) {
//           await createBooking({
//             name: "Customer Name",
//             email,
//             phone: "Customer Phone",
//             eventTitle: item.name,
//             tickets: item.quantity,
//             date: new Date().toISOString(),
//           }).unwrap();
//         }

//         // Clear cart
//         await clearCart({ userEmail: email });

//         // Clear the Stripe CardElement
//         const cardElement = elements.getElement(CardElement);
//         if (cardElement) {
//           cardElement.clear(); // This clears the card form fields
//         }

//         alert("Payment Successful! Booking Confirmed.");
//         navigate("/payment-success"); // redirect to bookings page
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed. Try again.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement options={{ hidePostalCode: true }} />
//       <button
//         type="submit"
//         disabled={!stripe || isLoading}
//         className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//       >
//         {isLoading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;


import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import { useClearCartMutation } from "../../features/cart/cartApi";
import { useAuth } from "../../hook/useAuth";

interface PaymentFormProps {
  cartItems: any[];
  email: string;
}

const PaymentForm = ({ cartItems, email }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [createBooking] = useCreateBookingMutation();
  const [clearCart] = useClearCartMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    try {
      // Create PaymentIntent on backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-payment-intent`,
        { cartItems, email }
      );

      const clientSecret = data.clientSecret;

      // Confirm Card Payment
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement!, billing_details: { email } },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
        setIsLoading(false);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        // ✅ UPDATED: Payment succeeded - create bookings and update seats
        const bookingPromises = cartItems.map(async (item) => {
          const bookingData = {
            userId: user?._id || "unknown",
            userEmail: user?.email || "unknown",
            userName: user?.name || "Customer",
            productId: item.productId,
            productType: item.type,
            productTitle: item.name,
            productPrice: item.price,
            quantity: item.quantity,
            paymentIntentId: paymentResult.paymentIntent.id,
            paymentStatus: "succeeded" as const,
            paymentAmount: paymentResult.paymentIntent.amount / 100,
            paymentCurrency: paymentResult.paymentIntent.currency,
            ...(item.type === 'event' && {
              eventDate: item.date,
              eventTime: item.time,
              eventLocation: item.location
            }),
            status: "confirmed" as const,
          };

          const bookingResult = await createBooking(bookingData).unwrap();
          
          // ✅ UPDATE: Decrease seats for paid events
          if (item.type === 'event') {
            try {
              const eventResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/events/${item.productId}`
              );
              if (eventResponse.ok) {
                const event = await eventResponse.json();
                const remainingSeats = event.seats - item.quantity;
                
                await fetch(
                  `${import.meta.env.VITE_API_URL}/events/${item.productId}/seats`,
                  {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ seats: remainingSeats })
                  }
                );
              }
            } catch (seatError) {
              console.error('Error updating event seats:', seatError);
            }
          }
          
          return bookingResult;
        });

        await Promise.all(bookingPromises);

        // ✅ CLEAR CART after successful payment
        if (user?.email) {
          await clearCart({ userEmail: user.email }).unwrap();
        }

        // ✅ CLEAR Stripe CardElement
        if (cardElement) {
          cardElement.clear();
        }

        alert("Payment Successful! Booking Confirmed.");
        navigate("/payment-success", { 
          state: { 
            success: true,
            cartItems: cartItems,
            paymentIntent: paymentResult.paymentIntent
          } 
        });
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;