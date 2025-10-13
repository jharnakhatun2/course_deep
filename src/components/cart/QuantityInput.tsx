import { useState, useEffect } from "react";
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

  // Sync with initial prop changes
  useEffect(() => {
    setQuantity(initial);
  }, [initial]);

  const updateQuantity = (value: number) => {
    if (value < min || value > max) return;
    setQuantity(value);
    onChange?.(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      updateQuantity(value);
    }
  };

  const handleBlur = () => {
    if (quantity < min) updateQuantity(min);
    if (quantity > max) updateQuantity(max);
  };

  return (
    <div className="flex items-center border border-gray-200 w-fit">
      <button
        type="button"
        onClick={() => updateQuantity(quantity - 1)}
        className="cursor-pointer px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={quantity <= min}
      >
        <HiMinusSmall size={16} />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-12 text-center outline-none border-x border-gray-200 text-gray-800 font-medium"
        min={min}
        max={max}
      />

      <button
        type="button"
        onClick={() => updateQuantity(quantity + 1)}
        className="cursor-pointer px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={quantity >= max}
      >
        <GoPlus size={16} />
      </button>
    </div>
  );
};

export default QuantityInput;