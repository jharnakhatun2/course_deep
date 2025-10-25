import React, { useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { useAddCourseReviewMutation } from "../../../features/reviews/reviewsApi";
import { showErrorToast, showSuccessToast } from "../../../ult/toast/toast";
import { useAuth } from "../../../hook/useAuth";
import { useNavigate } from "react-router";

interface ReviewFormProps {
  courseId: string;
}

interface FormData {
  rating: number;
  hoverRating: number;
  reviewText: string;
  name: string;
  email: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ courseId }) => {
   const [addCourseReview, { isLoading }] = useAddCourseReviewMutation();
   const { user, isAuthenticated  } = useAuth();
   const navigate = useNavigate();

  // Local form state
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    hoverRating: 0,
    reviewText: "",
    name: "",
    email: "",
  });

  // Auto-fill form when user is authenticated
    useEffect(() => {
      if (isAuthenticated && user) {
        setFormData(prev => ({
          ...prev,
          name: user.name || "",
          email: user.email || ""
        }));
      }
    }, [isAuthenticated, user]);
 

  // Destructure form data for easier access
  const { rating, hoverRating, reviewText, name, email } = formData;

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isAuthenticated) {
      // Save form data in sessionStorage to use after login
      sessionStorage.setItem("pendingReview", JSON.stringify({ courseId, ...formData }));
      navigate("/login", { state: { from: `/course/${courseId}`, message: "Please login to submit your review" } });
      return;
    }

    if (!reviewText || !name || !email || rating === 0) return;

    try {
      const reviewData = {
        name,
        email,
        review: reviewText,
        ratings: rating,
      };

      // Send data to backend
      await addCourseReview({ courseId, data: reviewData }).unwrap();

      showSuccessToast("🎉 Review submitted successfully!");
      
      // Reset form
      setFormData({
        rating: 0,
        hoverRating: 0,
        reviewText: "",
        name: "",
        email: "",
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
      showErrorToast("❌ Failed to submit review. Please try again later.");
    }
  };

  // Handle restoring pending comment after login
    useEffect(() => {
      if (isAuthenticated) {
        const pendingReview = sessionStorage.getItem("pendingReview");
        
        if (pendingReview) {
          const { courseId: pendingCourseId, ...savedFormData } = JSON.parse(pendingReview);
          
          // Only restore if it's for the current course
          if (pendingCourseId === courseId) {
            setFormData(prev => ({
              ...prev,
              ...savedFormData,
              // Keep user's name/email if they're logged in now
              name: user?.name || prev.name,
              email: user?.email || prev.email
            }));
            
            // Clear the pending comment
            sessionStorage.removeItem("pendingReview");
          }
        }
      }
    }, [isAuthenticated, courseId, user]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Add a Review Form */}
      <div className="">
        <h2 className="text-2xl text-zinc-700 font-semibold">Add a Review</h2>

        <p className="text-zinc-500 text-sm mb-6">
          Your email address will not be published. Required fields are marked{" "}
          <span className="text-red-500">*</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-6">
            <label className="block text-zinc-600 mb-2">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleInputChange("rating", star)}
                  onMouseEnter={() => handleInputChange("hoverRating", star)}
                  onMouseLeave={() => handleInputChange("hoverRating", 0)}
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
              onChange={(e) => handleInputChange("reviewText", e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"
              required
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
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 border ${isAuthenticated ? "text-zinc-400 border-gray-200 cursor-not-allowed": " border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"}`}
              required
              disabled={isAuthenticated}
              placeholder={isAuthenticated ? "" : "Enter your name"}
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
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 border ${isAuthenticated ? "text-zinc-400 border-gray-200 cursor-not-allowed": " border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-transparent"}`}
              required
              disabled={isAuthenticated}
              placeholder={isAuthenticated ? "" : "Enter your email"}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 px-8.5 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold transition-smooth uppercase cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;