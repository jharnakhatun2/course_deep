import type { FC } from "react";
import type { CartItem } from "../../ult/types/types";

interface ProductListProps {
  cartItems: CartItem[];
}

const ProductList: FC<ProductListProps> = ({ cartItems = [] }) => {
  return (
    <div className="overflow-x-auto">
      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b border-gray-300 space-y-5 "
        >
          <div className="font-medium relative">
            <img
              src={item.image}
              alt="course"
              className="w-20 object-cover mx-auto my-2"
            />
            <span className="absolute top-0 -right-6 border w-4 h-4 sm:w-5 sm:h-5  rounded-full flex items-center justify-center text-black">
              {item.quantity}
            </span>
          </div>
          <div className="px-3 py-2">
            <p>{item.name}</p>
          </div>

          <div>
            <p>${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
