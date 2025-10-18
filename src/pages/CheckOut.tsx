import { useState, type FormEvent } from "react";
import ProductList from "../components/checkout/ProductList";
import ApplyCoupon from "../components/checkout/ApplyCoupon";
import { useLocation, useNavigate } from "react-router";
import type { CartItem } from "../ult/types/types";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useAuth } from "../hook/useAuth";
import { useCreateBookingMutation } from "../features/bookings/bookingsApi";
import { useClearCartMutation } from "../features/cart/cartApi";

interface LocationState {
  cartItems: CartItem[];
  subtotal: number;
}

const CheckOut = () => {
  const [shippingMethod, setShippingMethod] = useState<"flat" | "pickup">(
    "flat"
  );
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  // ADD: New hooks for booking creation
  const { user } = useAuth();
  const [createBooking] = useCreateBookingMutation();
  const [clearCart] = useClearCartMutation();

  // Stripe payment state
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Get cart data from navigation state with proper typing
  const cartItems = (location.state as LocationState)?.cartItems || [];
  const cartSubtotal = (location.state as LocationState)?.subtotal || 0;
  const shippingCost = shippingMethod === "flat" ? 15 : 0;
  // Calculate discount (10% if coupon is applied)
  const discount = couponApplied ? cartSubtotal * 0.1 : 0;
  // Calculate total after discount and shipping
  const total = cartSubtotal - discount + shippingCost;

  // Handle coupon application
  const handleApplyCoupon = (code: string): boolean => {
    if (code.toLowerCase() === "save10") {
      setCouponApplied(true);
      setCouponCode(code);
      return true;
    }
    return false;
  };

  // Handle coupon removal
  const handleRemoveCoupon = (): void => {
    setCouponApplied(false);
    setCouponCode("");
  };

  // Handle successful payment with booking creation and seat decrement
  const handleSuccessfulPayment = async (paymentIntent: any) => {
    try {
      const paidEventItems = cartItems.filter(item => 
      item.type === "event" && item.price > 0
    );
      // Create bookings for each cart item and update seats
      const bookingPromises = paidEventItems.map(async (item) => {
        const bookingData = {
          // User information
          userId: user?._id || "unknown",
          userEmail: user?.email || "unknown",
          userName: user?.name || "Customer",

          // Product information
          productId: item.productId,
          productType: item.type,
          productTitle: item.name,
          productPrice: item.price,
          quantity: item.quantity,

          // Payment information
          paymentIntentId: paymentIntent.id,
          paymentStatus: "succeeded" as const,
          paymentAmount: paymentIntent.amount / 100, // Convert from cents
          paymentCurrency: paymentIntent.currency,

          // Event-specific information
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

      // ✅ CLEAR CART after successful payment
      if (user?.email) {
        await clearCart({ userEmail: user.email }).unwrap();
      }

      // ✅ CLEAR Stripe CardElement
      const cardElement = elements?.getElement(CardElement);
      if (cardElement) {
        cardElement.clear();
      }

      // Redirect to success page
      navigate("/payment-success", {
        state: {
          success: true,
          cartItems: cartItems,
          paymentIntent: paymentIntent,
        },
      });
    } catch (err) {
      console.error("Error creating bookings:", err);
      // Still show success but with warning
      navigate("/payment-success", {
        state: {
          success: true,
          warning:
            "Payment succeeded but there was an issue with booking creation.",
        },
      });
    }
  };

  // Handle payment submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError("Payment system not ready. Please wait.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if PaymentElement is mounted and ready
      const paymentElement = elements.getElement(PaymentElement);
      if (!paymentElement) {
        setError("Payment form is not ready. Please wait.");
        setIsLoading(false);
        return;
      }

      // Trigger form validation
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(
          submitError.message || "Please check your payment information"
        );
        setIsLoading(false);
        return;
      }

      // Confirm the payment
      const { error: confirmationError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/payment-success`,
          },
          redirect: "if_required",
        });

      if (confirmationError) {
        setError(confirmationError.message || "Payment failed");
        console.error(confirmationError);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment succeeded — redirect manually
        // navigate("/payment-success", { state: { success: true } });
        await handleSuccessfulPayment(paymentIntent);
      }
      // If no error, the payment is processing and user may be redirected
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Order Summary */}
        {cartItems.length > 0 ? (
          <div className=" p-6 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b border-gray-300 pb-4 mb-4">
              {/* Product List */}
              <ProductList cartItems={cartItems} />

              {/* Subtotal */}
              <div className="flex justify-between pt-4">
                <span>Subtotal</span> <span>${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>
            {/* Apply Coupon */}
            <ApplyCoupon
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponApplied={couponApplied}
              couponCode={couponCode}
            />
            {/* Discount Display */}
            {couponApplied && (
              <div className="flex justify-between text-green-600 mb-2">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="h-[1px] w-full bg-gray-500/20 my-3" />
            {/* Shipping */}
            <div className="mb-4">
              <label className="block font-bold mb-2">Shipping</label>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "flat"}
                  onChange={() => setShippingMethod("flat")}
                  className="mr-2"
                />
                Flat rate: $15.00
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "pickup"}
                  onChange={() => setShippingMethod("pickup")}
                  className="mr-2"
                />
                Local pickup
              </label>
            </div>
            <div className="h-[1px] w-full bg-gray-500/20 my-3" /> {/* Total */}
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span> <span>${total.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className=" p-6 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>No Product</span> <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span> <span>$0</span>
              </div>
            </div>

            {/* Apply Coupon - Even when cart is empty */}
            <ApplyCoupon
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponApplied={couponApplied}
              couponCode={couponCode}
            />

            <div className="mb-4">
              <label className="block font-medium mb-2">Shipping</label>
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "flat"}
                  onChange={() => setShippingMethod("flat")}
                  className="mr-2"
                />
                Flat rate: $15.00
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "pickup"}
                  onChange={() => setShippingMethod("pickup")}
                  className="mr-2"
                />
                Local pickup
              </label>
            </div>
            <div className="flex justify-between font-semibold mb-4">
              <span>Total</span> <span>$00.00</span>
            </div>
          </div>
        )}

        {/* Billing Details */}
        <div className="p-6 lg:col-span-2">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Payment Information */}
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <PaymentElement />
            {/* Pay button */}
            <button
              type="submit"
              disabled={isLoading || !stripe || !elements}
              className="cursor-pointer w-2/4 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition-smooth"
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default CheckOut;
