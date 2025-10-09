import { useState } from "react";
import { useNavigate } from "react-router";
import image1 from "../assets/img/hero/hero-3.webp";
import ProductList from "../components/checkout/ProductList";
import ApplyCoupon from "../components/checkout/ApplyCoupon";

const cartItems = [
  { id: 1, name: "HTML & CSS Course", price: 10, quantity: 3, image: image1 },
];

const CheckOut = () => {
  const [shippingMethod, setShippingMethod] = useState("flat");
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [agreed, setAgreed] = useState(false);
  // const { cartItems } = useCart();
  const { name, quantity, price, image } = cartItems[0] || {};
  const navigate = useNavigate();

  const subtotal = price * quantity || 0;
  const shippingCost = shippingMethod === "flat" ? 15 : 0;
  const total = subtotal + shippingCost;

  const radioStyle = "cursor-pointer";
  const radioBgStyle = { accentColor: "yellow", backgroundColor: "white" };
  const labelStyle = "flex items-center gap-2";
  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Billing Details */}
        <div className="lg:col-span-3">
          {/* Form */}
          <form className="space-y-4">
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
            <p className="text-zinc-500">There are no payment methods available. This may be an error on our side. Please contact us if you need any help placing your order!</p>

            {/* place order button */}
            <button
              type="submit"
              className="cursor-pointer w-2/4 bg-yellow-500 text-white py-3 rounded hover:bg-yellow-600 transition-smooth"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 ? (
          <div className=" p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b border-gray-300 pb-4 mb-4">
              {/* Product List */}
              <ProductList />

              {/* Subtotal */}
              <div className="flex justify-between pt-4">
                <span>Subtotal</span>
                <span>${price * quantity}</span>
              </div>
            </div>

            {/* Apply Coupon */}
            <ApplyCoupon />

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

            <div className="h-[1px] w-full bg-gray-500/20 my-3" />
            {/* Total */}
            <div className="flex justify-between font-bold mb-4">
              <span>Total</span>
              <span>${total}.00</span>
            </div>
          </div>
        ) : (
          <div className=" p-6 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>No Product</span>
                <span>0</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$0</span>
              </div>
            </div>

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
              <span>Total</span>
              <span>$00.00</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckOut;
