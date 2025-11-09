import React from "react";
import { AiFillStar } from "react-icons/ai";
import { useGetCourseReviewsQuery } from "../../../features/reviews/reviewsApi";
import Loader from "../../../ult/loader/Loader";
import type { Review } from "../../../ult/types/types";

interface ReviewFormProps {
  courseId: string;
}

const Reviews: React.FC<ReviewFormProps> = ({ courseId }) => {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useGetCourseReviewsQuery(courseId);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <AiFillStar
            key={index}
            className={`w-4 h-4 ${
            index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"
          }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <p className="text-center text-red-500 py-8">Failed to load reviews.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-3">
        <h2 className="text-2xl text-zinc-700 font-semibold">Reviews</h2>
        <p className="text-zinc-600 text-sm">
          There Are <span className="w-5 h-5 bg-yellow-100/30 px-2 rounded">{reviews.length}</span> {reviews.length > 1 ? "Reviews" : "Review"} On This Course
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <div
            key={review._id}
            className="bg-white/60 backdrop-blur-lg border border-gray-200 p-6 sm:flex gap-4"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 object-cover border border-yellow-400/20 p-1"
            />

            <div className="flex-1">
              <div className="sm:flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-zinc-900">
                    {review.name}
                    <span className="text-gray-500 font-normal"> – </span>
                    <span className="text-gray-500 font-normal text-sm">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </h3>
                </div>
                {renderStars(review.ratings)}
              </div>

              <p className="text-gray-400 text-sm"><span className="text-xl text-yellow-400">❛</span> {review.review} <span className="text-xl text-yellow-400">❜</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
