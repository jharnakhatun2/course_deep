import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useLocation } from "react-router";
import CheckOut from "../../pages/CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../hook/useAuth";
import { useCreatePaymentIntentMutation } from "../../features/payment/paymentApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOutWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  const cartItems = (location.state as any)?.cartItems || [];

  // use RTK Query mutation
  const [createPaymentIntent, { data, isLoading, error }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (cartItems.length > 0 && user?.email) {
      createPaymentIntent({ cartItems, email: user.email });
    }
  }, [cartItems, user, createPaymentIntent]);

  const clientSecret = data?.clientSecret;
  const options = clientSecret
    ? { clientSecret, appearance: { theme: "stripe" as const } }
    : undefined;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading payment...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    const errorMessage =
      "data" in error
        ? (error as any).data?.error || "Failed to initialize payment"
        : "Something went wrong. Please try again.";
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg">{errorMessage}</div>
      </div>
    );
  }

  // No client secret yet
  if (!clientSecret) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Preparing checkout...</div>
      </div>
    );
  }

  // Ready to render Stripe checkout
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOut />
    </Elements>
  );
};

export default CheckOutWrapper;
