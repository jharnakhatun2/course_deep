import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// Define props interface
interface ApplyCouponProps {
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  couponApplied: boolean;
  couponCode: string;
}

const ApplyCoupon: React.FC<ApplyCouponProps> = ({ 
  onApplyCoupon, 
  onRemoveCoupon, 
  couponApplied, 
  couponCode 
}) => {
  const [showInput, setShowInput] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const toggleInput = () => setShowInput((prev) => !prev);

  const handleApply = () => {
    if (!inputCode.trim()) {
      alert("Please enter a coupon code!");
      return;
    }
    
    if (onApplyCoupon(inputCode.trim())) {
      setInputCode("");
      setShowInput(false);
    } else {
      alert("Invalid coupon code. Try 'SAVE10' for 10% off!");
    }
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setInputCode("");
  };

  return (
    <div className="mb-4">
      {/* Header with toggle */}
      <button
        type="button"
        onClick={toggleInput}
        className="flex items-center justify-between w-full"
      >
        <span>Coupon code?</span>
        {showInput ? (
          <FaChevronUp className="text-gray-500 cursor-pointer" />
        ) : (
          <FaChevronDown className="text-gray-500 cursor-pointer" />
        )}
      </button>

      {/* Applied coupon display */}
      {couponApplied && (
        <div className="flex items-center justify-between bg-green-50 p-3 rounded mt-3">
          <span className="text-green-600 font-medium">
            Coupon applied: {couponCode} (10% off)
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Remove
          </button>
        </div>
      )}

      {/* Coupon input field with smooth animation */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showInput ? "max-h-24 mt-3" : "max-h-0"
        }`}
      >
        {!couponApplied && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleApply}
              className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Hint text */}
      <p className="text-sm text-gray-500 mt-2">
        Use code <strong>SAVE10</strong> for 10% off your order
      </p>
    </div>
  );
};

export default ApplyCoupon;