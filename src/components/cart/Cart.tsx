import { useGetCartQuery } from "../../features/cart/cartApi";
import Loader from "../../ult/loader/Loader";
import ApplyCoupon from "../checkout/ApplyCoupon";
import CartItem from "./CartItem";

const Cart = () => {
  const { data: cartItems = [], isLoading, error } = useGetCartQuery();

  if (isLoading) return <Loader />

  if (error) {
    return (
      <section className="py-20 bg-gray-100">
        <div className="lg:max-w-7xl mx-auto px-4">
          <div className="text-center text-red-600">Error loading cart</div>
        </div>
      </section>
    );
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <section className="py-20 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 sm:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-3">
          <h2 className="mb-8 text-xl font-semibold text-zinc-600">
            Your cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h2>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button 
                onClick={() => window.history.back()}
                className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <CartItem />
          )}
        </div>

        {/* Cart Total */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-2">
            <div className="billDetailsCard bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-zinc-600 mb-6">Cart Total</h2>
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between pt-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="h-[1px] w-full bg-gray-500/20 my-3" />

                {/* Apply Coupon */}
                <ApplyCoupon />
                <div className="h-[1px] w-full bg-gray-500/20 my-3" />

                <div className="flex items-center justify-between pb-4">
                  <p className="font-bold">TOTAL</p>
                  <p className="font-bold">${subtotal.toFixed(2)}</p>
                </div>
                <button className="cursor-pointer w-full bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-600 transition-smooth">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;