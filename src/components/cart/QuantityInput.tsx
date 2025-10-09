import { useState } from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";

interface QuantityInputProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  min = 1,
  max = 99,
  initial = 1,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initial);

  const updateQuantity = (value: number) => {
    if (value < min || value > max) return;
    setQuantity(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center border border-gray-200 w-fit">
      <button
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
        className="cursor-pointer px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        disabled={quantity <= min}
      >
        <HiMinusSmall />
      </button>

      <input
        type="text"
        value={quantity}
        onChange={(e) => updateQuantity(Number(e.target.value))}
        className="w-10 text-center outline-none border-x border-gray-200 text-gray-800 font-medium"
        min={min}
        max={max}
      />

      <button
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
        className="cursor-pointer px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 "
        disabled={quantity >= max}
      >
        <GoPlus />
      </button>
    </div>
  );
};

export default QuantityInput;
