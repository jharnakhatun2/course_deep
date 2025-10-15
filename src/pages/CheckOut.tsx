import { useState, type FormEvent } from "react";
import ProductList from "../components/checkout/ProductList";
import ApplyCoupon from "../components/checkout/ApplyCoupon";
import { useLocation, useNavigate } from "react-router";
import type { CartItem } from "../ult/types/types";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

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
        navigate("/payment-success", { state: { success: true } });
      }
      // If no error, the payment is processing and user may be redirected
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Billing Details */}
        <div className="lg:col-span-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Contact information */}
            <h2 className="text-2xl font-semibold mb-6">Contact information</h2>
            <input
              type="email"
              placeholder="Email address *"
              className="input w-full bg-white"
            />
            <div className="h-[1px] w-full bg-gray-500/20 my-3" />
            {/* Shipping information */}
            <h2 className="text-2xl font-semibold mb-6">
              Shipping information
            </h2>
            {/* name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name *"
                className="input w-full bg-white"
              />
              <input
                type="text"
                placeholder="Last name *"
                className="input w-full bg-white"
              />
            </div>
            {/* company name */}
            <input
              type="text"
              placeholder="Company name (optional)"
              className="input w-full bg-white"
            />
            {/* Address */}
            <input
              type="text"
              placeholder="Address *"
              className="input w-full bg-white"
            />
            {/* City and Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City *"
                className="input w-full bg-white"
              />
              {/* Country */}
              <select
                className="input w-full text-zinc-400 bg-white"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Country *
                </option>
                <option value="BD">Bangladesh (BD)</option>
                <option value="US">United States (US)</option>
                <option value="UK">United Kingdom (UK)</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ZIP Code *"
                className="input w-full bg-white"
              />
              <input
                type="text"
                placeholder="Phone *"
                className="input w-full bg-white"
              />
            </div>
            <div className="h-[1px] w-full bg-gray-500/20 my-5" />
            {/* Payment Information */}
            <h2 className="text-2xl font-semibold mb-3">Payment Method</h2>
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
        {/* Order Summary */}
        {cartItems.length > 0 ? (
          <div className=" p-6 lg:col-span-2">
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
          <div className=" p-6 lg:col-span-2">
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
      </div>
    </section>
  );
};
export default CheckOut;
