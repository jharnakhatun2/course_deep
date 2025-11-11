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
import { useAuth } from "../hook/useAuth";
import { useCreateBookingMutation } from "../features/bookings/bookingsApi";
import { useClearCartMutation } from "../features/cart/cartApi";
import { showErrorToast, showSuccessToast } from "../ult/toast/toast";
import { useCreateEnrollmentMutation } from "../features/enrollments/enrollmentsApi";
import Loader from "../ult/loader/Loader";

interface LocationState {
  cartItems: CartItem[];
  subtotal: number;
}

const CheckOut = () => {
  const [shippingMethod, setShippingMethod] = useState<"flat" | "pickup">("flat");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Hooks with proper loading and error states
  const { user } = useAuth();
  const [createBooking, { isLoading: isBookingLoading, error: bookingError }] = useCreateBookingMutation();
  const [clearCart, { isLoading: isClearCartLoading }] = useClearCartMutation();
  const [createEnrollment, { isLoading: isEnrollmentLoading, error: enrollmentError }] = useCreateEnrollmentMutation();

  // Stripe payment state
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Get cart data from navigation state with proper typing
  const cartItems = (location.state as LocationState)?.cartItems || [];
  const cartSubtotal = (location.state as LocationState)?.subtotal || 0;
  const shippingCost = shippingMethod === "flat" ? 15 : 0;
  const discount = couponApplied ? cartSubtotal * 0.1 : 0;
  const total = cartSubtotal - discount + shippingCost;

  // Combined loading states
  const isProcessing = isLoading || isBookingLoading || isEnrollmentLoading || isClearCartLoading;

  // Handle coupon application with success toast
  const handleApplyCoupon = (code: string): boolean => {
    if (code.toLowerCase() === "save10") {
      setCouponApplied(true);
      setCouponCode(code);
      showSuccessToast("Coupon applied successfully! 10% discount added.");
      return true;
    }
    showErrorToast("Invalid coupon code. Please try 'SAVE10'.");
    return false;
  };

  // Handle coupon removal with success toast
  const handleRemoveCoupon = (): void => {
    setCouponApplied(false);
    setCouponCode("");
    showSuccessToast("Coupon removed successfully.");
  };

  // Handle successful payment with booking creation AND course enrollment
  const handleSuccessfulPayment = async (paymentIntent: any) => {
    try {
      const paidEventItems = cartItems.filter(item =>
        item.type === "event" && item.price > 0
      );

      const paidCourseItems = cartItems.filter(item =>
        item.type === "course" && item.price > 0
      );

      let hasErrors = false;
      const errors: string[] = [];

      // Create bookings for events
      const bookingPromises = paidEventItems.map(async (item) => {
        try {
          const bookingData = {
            userId: user?._id || "unknown",
            userEmail: user?.email || "unknown",
            userName: user?.name || "Customer",
            productId: item.productId,
            productType: item.type,
            productTitle: item.name,
            productPrice: item.price,
            quantity: item.quantity,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "succeeded" as const,
            paymentAmount: paymentIntent.amount / 100,
            paymentCurrency: paymentIntent.currency,
            ...(item.type === "event" && {
              eventDate: item.date,
              eventTime: item.time,
              eventLocation: item.location,
            }),
            status: "confirmed" as const,
          };

          const result = await createBooking(bookingData).unwrap();
          showSuccessToast(`Successfully booked: ${item.name}`); // ✅ Success toast for each booking
          return result;
        } catch (error: any) {
          hasErrors = true;
          const errorMsg = `Failed to book event: ${item.name}`;
          errors.push(errorMsg);
          showErrorToast(errorMsg); // ✅ Error toast
          console.error(`Booking error for ${item.name}:`, error);
          return null;
        }
      });

      // Create enrollments for courses
      const enrollmentPromises = paidCourseItems.map(async (item) => {
        try {
          const enrollmentData = {
            userId: user?._id || "unknown",
            userEmail: user?.email || "unknown",
            userName: user?.name || "Customer",
            courseId: item.productId,
            paymentIntentId: paymentIntent.id,
            paymentStatus: "succeeded" as const,
            paymentAmount: item.price,
            paymentCurrency: "USD"
          };

          const result = await createEnrollment(enrollmentData).unwrap();
          showSuccessToast(`Successfully enrolled in: ${item.name}`); // ✅ Success toast for each enrollment
          return result;
        } catch (error: any) {
          hasErrors = true;
          const errorMsg = `Failed to enroll in course: ${item.name}`;
          errors.push(errorMsg);
          showErrorToast(errorMsg); // ✅ Error toast
          console.error(`Enrollment error for ${item.name}:`, error);
          return null;
        }
      });

      // Wait for all operations to complete
      const results = await Promise.allSettled([...bookingPromises, ...enrollmentPromises]);

      // Check for any failed operations
      const failedResults = results.filter(result => result.status === 'rejected');
      if (failedResults.length > 0) {
        console.error('Some operations failed:', failedResults);
        hasErrors = true;
      }

      // Clear cart after successful payment (even if there were some errors)
      try {
        if (user?.email) {
          await clearCart({ userEmail: user.email }).unwrap();
          showSuccessToast("Cart cleared successfully"); // ✅ Success toast
        }
      } catch (clearError) {
        console.error('Error clearing cart:', clearError);
        showErrorToast("Failed to clear cart"); // ✅ Error toast
      }

      // Show overall success message
      if (!hasErrors) {
        showSuccessToast("Payment processed successfully! Redirecting to your dashboard..."); // ✅ Main success toast
      } else {
        showSuccessToast("Payment processed! Some items may need attention."); // ✅ Partial success toast
      }

      // Redirect to success page with appropriate state
      navigate("/payment-success", {
        state: {
          success: true,
          cartItems: cartItems,
          paymentIntent: paymentIntent,
          enrolledCourses: paidCourseItems.length > 0,
          warning: hasErrors ? `Payment succeeded but there were issues: ${errors.join(', ')}` : undefined
        },
      });
    } catch (err) {
      console.error("Error processing payment:", err);
      showErrorToast("Payment succeeded but there was an issue with processing your order.");

      // Still show success but with warning
      navigate("/payment-success", {
        state: {
          success: true,
          warning: "Payment succeeded but there was an issue with order processing.",
        },
      });
    }
  };

  // Handle payment submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("🔄 Submit clicked - Checking readiness:", {
      stripe: !!stripe,
      elements: !!elements,
      isPaymentElementReady,
      cartItems: cartItems.length
    });

    // Basic readiness check
    if (!stripe || !elements) {
      const errorMsg = "Payment system not ready. Please wait for initialization.";
      console.error("❌", errorMsg);
      setError(errorMsg);
      showErrorToast(errorMsg);
      return;
    }

    // Validate cart items
    if (cartItems.length === 0) {
      const errorMsg = "Your cart is empty. Please add items before proceeding.";
      setError(errorMsg);
      showErrorToast(errorMsg);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // DIRECT ELEMENT CHECK - This is the most reliable way
      console.log("🔍 Checking for PaymentElement...");
      const paymentElement = elements.getElement(PaymentElement);

      if (!paymentElement) {
        throw new Error("Payment element not found. The form may not be fully loaded.");
      }

      console.log("✅ PaymentElement found, proceeding with validation...");

      // Trigger form validation
      const { error: submitError } = await elements.submit();
      if (submitError) {
        const errorMsg = submitError.message || "Please check your payment information";
        console.error("❌ Form validation error:", submitError);
        setError(errorMsg);
        showErrorToast(errorMsg);
        setIsLoading(false);
        return;
      }

      // Show processing toast
      showSuccessToast("Processing your payment...");

      // Add a small delay to ensure everything is settled
      await new Promise(resolve => setTimeout(resolve, 300));

      console.log("💰 Calling stripe.confirmPayment...");

      // Confirm the payment
      const { error: confirmationError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (confirmationError) {
        console.error("❌ Payment confirmation error:", confirmationError);

        // Handle specific Stripe errors
        if (confirmationError.type === "validation_error") {
          const errorMsg = "Please check your payment details and try again.";
          setError(errorMsg);
          showErrorToast(errorMsg);
        } else if (confirmationError.code === "element_missing") {
          const errorMsg = "Payment form not ready. Please refresh the page and try again.";
          setError(errorMsg);
          showErrorToast(errorMsg);
        } else {
          const errorMsg = confirmationError.message || "Payment failed. Please try again.";
          setError(errorMsg);
          showErrorToast(errorMsg);
        }
      } else if (paymentIntent) {
        console.log("✅ Payment intent created with status:", paymentIntent.status);

        switch (paymentIntent.status) {
          case "succeeded":
            showSuccessToast("Payment successful! Processing your order...");
            await handleSuccessfulPayment(paymentIntent);
            break;
          case "processing":
            showSuccessToast("Payment processing...");
            navigate("/payment-success", {
              state: {
                success: true,
                cartItems: cartItems,
                paymentIntent: paymentIntent,
                processing: true,
              },
            });
            break;
          case "requires_action":
            showSuccessToast("Complete authentication to proceed with payment.");
            break;
          default:
            const errorMsg = `Payment status: ${paymentIntent.status}. Please check your email for confirmation.`;
            setError(errorMsg);
            showErrorToast(errorMsg);
        }
      } else {
        throw new Error("No payment intent returned from confirmation");
      }
    } catch (err: any) {
      console.error("💥 Payment submission error:", err);

      let errorMsg = err.message || "An unexpected error occurred. Please try again.";

      // Specific error handling
      if (err.message.includes("mounted") || err.message.includes("element")) {
        errorMsg = "Payment form not properly loaded. Please refresh the page and try again.";
        // Auto-refresh suggestion
        setTimeout(() => {
          if (window.confirm("Payment form issue detected. Would you like to refresh the page?")) {
            window.location.reload();
          }
        }, 2000);
      }

      setError(errorMsg);
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };



  // Show loader if processing
  if (isProcessing) {
    return <Loader />;
  }

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Order Summary */}
        {cartItems.length > 0 ? (
          <div className="p-6 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b border-gray-300 pb-4 mb-4">
              <ProductList cartItems={cartItems} />
              <div className="flex justify-between pt-4">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>

            <ApplyCoupon
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponApplied={couponApplied}
              couponCode={couponCode}
            />

            {couponApplied && (
              <div className="flex justify-between text-green-600 mb-2">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}

            <div className="h-[1px] w-full bg-gray-500/20 my-3" />

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

            <div className="h-[1px] w-full bg-gray-500/20 my-3" />

            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="p-6 lg:col-span-3">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>No Product</span> <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span> <span>$0</span>
              </div>
            </div>

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
          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* API Errors */}
          {bookingError && (
            <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-4">
              Booking error: Please check your event details.
            </div>
          )}

          {enrollmentError && (
            <div className="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded mb-4">
              Enrollment error: Please check your course details.
            </div>
          )}

          {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              <PaymentElement
                onReady={() => {
                  console.log("✅ PaymentElement fully ready and mounted");
                  setIsPaymentElementReady(true);
                }}
                onLoadError={(error) => {
                  console.error("❌ PaymentElement failed to load:", error);
                  setError("Payment form failed to load. Please refresh the page.");
                  setIsPaymentElementReady(false);
                }}
                options={{
                  layout: {
                    type: 'tabs',
                    defaultCollapsed: false,
                  }
                }}
              />

              <button
                type="submit"
                disabled={
                  isLoading ||
                  !stripe ||
                  !elements ||
                  cartItems.length === 0 ||
                  isProcessing
                }
                className="cursor-pointer w-2/4 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!stripe || !elements ? "Initializing Payment..." :
                  isLoading ? "Processing..." :
                    "Pay Now"}
              </button>
              

              {/* Loading indicator for individual operations */}
              {(isBookingLoading || isEnrollmentLoading || isClearCartLoading) && (
                <div className="text-sm text-gray-600 mt-2">
                  Processing your order...
                </div>
              )}
            </form>

        </div>
      </div>
    </section>
  );
};

export default CheckOut;