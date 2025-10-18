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
        // UPDATED: Payment succeeded - create bookings and update seats
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
            ...(item.type === "event" && {
              eventDate: item.date,
              eventTime: item.time,
              eventLocation: item.location,
            }),
            status: "confirmed" as const,
          };

          return await createBooking(bookingData).unwrap();
        });

        await Promise.all(bookingPromises);

        // CLEAR CART after successful payment
        if (user?.email) {
          await clearCart({ userEmail: user.email }).unwrap();
        }

        // CLEAR Stripe CardElement
        if (cardElement) {
          cardElement.clear();
        }

        alert("Payment Successful! Booking Confirmed.");
        navigate("/payment-success", {
          state: {
            success: true,
            cartItems: cartItems,
            paymentIntent: paymentResult.paymentIntent,
          },
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
