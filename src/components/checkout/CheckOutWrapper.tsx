import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckOut from "../../pages/CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../hook/useAuth";
import { useCreatePaymentIntentMutation } from "../../features/payment/paymentApi";
import Loader from "../../ult/loader/Loader";
import { validateCartForCheckout } from "../cart/cartHelpers";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOutWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  const cartItems = (location.state as any)?.cartItems || [];
   const [paymentIntentCreated, setPaymentIntentCreated] = useState(false);

  // use RTK Query mutation
  const [createPaymentIntent, { data, isLoading, error }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
  const initializePayment = async () => {
    if (cartItems.length > 0 && user?.email && !paymentIntentCreated) {
      try {
        // ✅ ENHANCED VALIDATION: Check for duplicates AND seat availability
        const validation = await validateCartForCheckout(cartItems, user.email);
        
        if (!validation.isValid) {
          // Show error and redirect back to cart
          alert(`Cannot proceed to checkout:\n${validation.errors.join('\n')}`);
          window.history.back();
          return;
        }

        // If validation passes, create payment intent
        console.log("Creating payment intent...");
        createPaymentIntent({ cartItems, email: user.email });
        setPaymentIntentCreated(true);
      } catch (error) {
        console.error("Validation error:", error);
        alert("Error validating your cart items. Please try again.");
        window.history.back();
      }
    }
  };

  initializePayment();
}, [cartItems, user, createPaymentIntent, paymentIntentCreated]);

  const clientSecret = data?.clientSecret;
  const options = clientSecret
    ? { clientSecret, appearance: { theme: "stripe" as const } }
    : undefined;

  // Loading state
  if (isLoading) return <Loader />

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
