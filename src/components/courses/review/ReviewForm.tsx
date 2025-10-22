import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    if (!reviewText || !name || !email) {
      alert("Please fill in all required fields");
      return;
    }
    console.log({ rating, reviewText, name, email });
    alert("Review submitted!");
    // Reset form
    setRating(0);
    setReviewText("");
    setName("");
    setEmail("");
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Add a Review Form */}
      <div className="">
        <h2 className="text-2xl text-zinc-700 font-semibold">Add a Review</h2>

        <p className="text-zinc-500 text-sm mb-6">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>

        <div>
          {/* Rating */}
          <div className="mb-6">
            <label className="block text-zinc-600 mb-2">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-colors cursor-pointer"
                >
                  <IoMdStar
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Your Review <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-8 py-3 transition-colors uppercase cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
