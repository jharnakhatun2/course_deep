import image1 from "../../assets/img/hero/hero-2.webp";
import QuantityInput from "./QuantityInput";

const CartItem = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center uppercase font-semibold text-sm">
        <span>Items</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>

      <div className="h-[1px] w-full bg-gray-500/20 my-3" />

      <div className="flex items-center justify-between py-1">
        <div className="flex items-center col-span-6 space-x-6">
          <img className="w-20" src={image1} alt="product" />
          <h4 className="lws-cartName">HTML CSS Course</h4>
        </div>
        <div>
        <QuantityInput />
        <p className="underline text-sm cursor-pointer hover:text-yellow-500 transition-smooth">Remove item</p>
        </div>
        <div>
          <h3>$30.00</h3>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gray-500/20 my-3" />
    </div>
  );
};

export default CartItem;
