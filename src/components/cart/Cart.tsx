import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAddToCartMutation, useGetCartQuery } from "../../features/cart/CartApi";
import { toggleCart } from "../../features/cart/cartSlice";



const Cart = () => {
  const { data: cart } = useGetCartQuery();
  const [addToCart] = useAddToCartMutation();
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cart);

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => dispatch(toggleCart())}
      >
        {isOpen ? "Close Cart" : "Open Cart"}
      </button>

      {isOpen && (
        <div className="p-4 border rounded shadow mt-4 bg-white">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <ul>
            {cart?.map((item) => (
              <li key={item.id} className="flex justify-between py-1">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => addToCart({ productId: "123", quantity: 1 })}
            className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
          >
            Add Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
