// src/components/checkout/PaymentForm.tsx
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import axios from "axios";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import { useClearCartMutation } from "../../features/cart/cartApi";

interface PaymentFormProps {
  cartItems: any[];
  email: string;
  eventId?: string; // optional, for events
}

const PaymentForm = ({ cartItems, email, eventId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
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
        // Payment succeeded: create booking records
        for (const item of cartItems) {
          await createBooking({
            name: "Customer Name", // replace with actual
            email,
            phone: "Customer Phone",
            eventTitle: item.name,
            tickets: item.quantity,
            date: new Date().toISOString(),
          }).unwrap();
        }

        // Clear cart
        await clearCart({ userEmail: email });

        // Clear the Stripe CardElement
        const cardElement = elements.getElement(CardElement);
        if (cardElement) {
          cardElement.clear(); // This clears the card form fields
        }

        alert("Payment Successful! Booking Confirmed.");
        navigate("/payment-success"); // redirect to bookings page
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
        className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
