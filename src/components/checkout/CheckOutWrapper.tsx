// CheckOutWrapper.tsx
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import CheckOut from "../../pages/CheckOut";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../../hook/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOutWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const cartItems = (location.state as any)?.cartItems || [];

   useEffect(() => {
    if (cartItems.length > 0 && user?.email) {
      createPaymentIntent();
    } else {
      setIsLoading(false);
    }
  }, [cartItems, user]);

  const createPaymentIntent = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      if (!user?.email) {
        throw new Error("User email not available. Please log in.");
      }

      const response = await fetch("http://localhost:5000/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          email: user.email, 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const data = await response.json();
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err);
      setError((err as Error).message || "Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const options = clientSecret
  ? { clientSecret, appearance: { theme: "stripe" as const } }
  : undefined;


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading payment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }

  if (!clientSecret) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Preparing checkout...</div>
    </div>
  );
}

  return (
        <Elements stripe={stripePromise} options={options}>
          <CheckOut />
        </Elements>
  );
};

export default CheckOutWrapper;