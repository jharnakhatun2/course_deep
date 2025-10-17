import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useClearCartMutation } from "../features/cart/cartApi";
import { useAuth } from "../hook/useAuth";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clearCart] = useClearCartMutation();
  const { user } = useAuth();

  const {
    success,
    cartItems = [],
    warning,
    paymentIntent,
  } = location.state || {};

  useEffect(() => {
    // Use current authenticated user's email
    const clearUserCart = async () => {
      if (user?.email) {
        try {
          console.log("Clearing cart for:", user.email);
          await clearCart({ userEmail: user.email }).unwrap();
          console.log("Cart cleared successfully");
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      } else {
        console.log("No user email found, cannot clear cart");
      }
    };

    if (success) {
      clearUserCart();
    }
  }, [success, clearCart, user]);

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-3 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-4">
            There was an issue with your payment.
          </p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-3 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Your booking has been confirmed and payment processed successfully.
          </p>

          {warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
              <p className="text-yellow-800">{warning}</p>
            </div>
          )}

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-xl font-bold mb-4 text-yellow-500">
              Booking Summary :
            </h3>
            {cartItems.map((item: any) => (
              <div
                key={item.productId}
                className="sm:flex justify-between items-center py-2"
              >
                <div>
                  <p className="font-medium">Event : {item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.type === "event" ? "Event" : "Course"} Quantity:{" "}
                    <span className="font-bold">{item.quantity}</span>
                  </p>
                </div>
                <p>
                  Price :{" "}
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
            ))}
            {paymentIntent && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Payment ID: {paymentIntent.id}
                </p>
                <p className="text-sm text-gray-600">
                  Your Email ID : {user?.email}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition-colors">
              Download Ticket
            </button>
            <button
              onClick={() => navigate("/events")}
              className="cursor-pointer bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
            >
              Browse More Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
