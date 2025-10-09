import ApplyCoupon from "../checkout/ApplyCoupon";
import CartItem from "./CartItem";

const Cart = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 sm:gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-3">
          <h2 className="mb-8 text-xl font-semibold text-zinc-600">Your cart (3 items)</h2>
          <CartItem />
        </div>

        {/* Cart Total */}
        <div className="lg:col-span-2">
          <div className="billDetailsCard">
            <h2 className="mt-13 text-xl font-semibold text-zinc-600">Cart Total</h2>
            <div className="space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between pt-4">
                <span>Subtotal</span>
                <span>$20</span>
              </div>
              <div className="h-[1px] w-full bg-gray-500/20 my-3" />

              {/* Apply Coupon */}
              <ApplyCoupon />
              <div className="h-[1px] w-full bg-gray-500/20 my-3" />

              <div className="flex items-center justify-between pb-4">
                <p className="font-bold">TOTAL</p>
                <p className="font-bold">$20</p>
              </div>
              <button className="cursor-pointer w-full bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-600 transition-smooth"
            >Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
