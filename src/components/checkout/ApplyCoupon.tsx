import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ApplyCoupon = () => {
  const [showInput, setShowInput] = useState(false);
  const [coupon, setCoupon] = useState("");

  const toggleInput = () => setShowInput((prev) => !prev);

  const handleApply = () => {
    if (!coupon.trim()) {
      alert("Please enter a coupon code!");
      return;
    }
    alert(`Coupon "${coupon}" applied!`);
    setCoupon("");
  };

  return (
    <div className="mb-4">
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

      {/* Smooth height animation wrapper */}
      <div
        className={`overflow-hidden transition-smooth ${
          showInput ? "max-h-24 mt-3" : "max-h-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
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
      </div>
    </div>
  );
};

export default ApplyCoupon;
