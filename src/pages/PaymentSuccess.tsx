import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useClearCartMutation } from "../features/cart/cartApi";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clearCart] = useClearCartMutation();
  
  const { success, cartItems = [], warning, paymentIntent } = location.state || {};

  useEffect(() => {
    // Ensure cart is cleared on this page load as backup
    const clearUserCart = async () => {
      const userEmail = localStorage.getItem('userEmail'); // Or get from your auth context
      if (userEmail) {
        try {
          await clearCart({ userEmail }).unwrap();
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      }
    };

    if (success) {
      clearUserCart();
    }
  }, [success, clearCart]);

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
          <p className="text-gray-600 mb-4">There was an issue with your payment.</p>
          <button 
            onClick={() => navigate('/cart')}
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
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
          <p className="text-gray-600 mb-6">Your booking has been confirmed and payment processed successfully.</p>

          {warning && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
              <p className="text-yellow-800">{warning}</p>
            </div>
          )}

          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
            {cartItems.map((item: any) => (
              <div key={item.productId} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.type === 'event' ? 'Event' : 'Course'} • Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            {paymentIntent && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Payment ID: {paymentIntent.id}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/bookings')}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition-colors"
            >
              View My Bookings
            </button>
            <button 
              onClick={() => navigate('/events')}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
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