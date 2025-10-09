import CartItem from "./CartItem";

const Cart = () => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Billing Details */}
        <div className="lg:col-span-3">
          <h2 className="mb-8 text-xl font-semibold">Your cart (3 items)</h2>
              <CartItem />
          </div>

          {/* Bill Details */}
          <div>
            <div className="billDetailsCard">
              <h4 className="mt-2 mb-8 text-xl font-bold text-center">
                Bill Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p>
                    BDT <span className="lws-subtotal">0</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p>Discount</p>
                  <p>
                    BDT <span className="lws-discount">0</span>
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p>VAT</p>
                  <p>
                    BDT <span className="vat">0</span>
                  </p>
                </div>

                <div className="flex items-center justify-between pb-4">
                  <p className="font-bold">TOTAL</p>
                  <p className="font-bold">
                    BDT <span className="lws-total">0</span>
                  </p>
                </div>
                <button className="">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        
      </div>
    </section>
  );
};

export default Cart;
