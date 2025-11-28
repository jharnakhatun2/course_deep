import QuantityInput from "./QuantityInput";
import {
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation
} from "../../features/cart/cartApi";
import { showSuccessToast, showErrorToast } from "../../ult/toast/toast";
import type { CartItem as CartItemType } from "../../ult/types/types";
import type { FC } from "react";

interface CartItemProps {
  cartItems: CartItemType[];
  userEmail?: string;
}

const CartItem: FC<CartItemProps> = ({ cartItems, userEmail }) => {
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateCartQuantityMutation();
  const handleRemove = async (productId: string, type: string) => {
    try {
      await removeFromCart({ productId, type, userEmail }).unwrap();
      showSuccessToast("Item removed from cart");
    } catch (error) {
      showErrorToast("Failed to remove item");
    }
  };

  const handleQuantityChange = async (productId: string, type: string, newQuantity: number) => {
    try {
      await updateQuantity({
        productId,
        type,
        quantity: newQuantity,
        userEmail
      }).unwrap();
    } catch (error) {
      showErrorToast("Failed to update quantity");
    }
  };

  if (cartItems.length === 0) return null;


  return (
    <div>
      {cartItems.map((item) => (
        <div key={`${item.productId}-${item.type}`}>
          <div className="flex items-center justify-between py-3">
            <div className="sm:flex items-center col-span-6 space-x-6">
              <img
                className="w-20"
                src={item.image || "/placeholder-image.jpg"}
                alt={item.name}
              />
              <div>
                <h4 className="text-sm pt-1 font-medium">{item.name}</h4>
                <p className="text-xs text-gray-600">${item.price} each</p>
                {item.type === 'event' && item.date && (
                  <p className="text-xs text-gray-500">
                    📅 {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <div>
              <QuantityInput
                initial={item.quantity}
                onChange={(newQuantity) =>
                  handleQuantityChange(item.productId, item.type, newQuantity)
                }
              />
              <button
                onClick={() => handleRemove(item.productId, item.type)}
                disabled={isRemoving}
                className="underline text-sm cursor-pointer hover:text-yellow-500 transition-smooth disabled:opacity-50"
              >
                {isRemoving ? "Removing..." : "Remove item"}
              </button>
            </div>
            <div>
              <h3 className="font-semibold">${(item.price * item.quantity).toFixed(2)}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;