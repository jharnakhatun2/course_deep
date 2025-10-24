import React from 'react';
import { AiFillStar } from 'react-icons/ai';

interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  content: string;
  avatar: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      author: 'Lavin Duster',
      date: 'March 7, 2016',
      rating: 5,
      content: 'Brunch fap cardigan, gentrify put a bird on it distillery mumblecore you probably haven\'t heard of them asymmetrical bushwick. Put a bird on it schlitz fashion.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      author: 'Tim Cook',
      date: 'March 5, 2016',
      rating: 5,
      content: 'Fixie sartorial cray flexitarian pop-up health goth single-origin coffee sriracha',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <AiFillStar
            key={index}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="mb-3">
        <h2 className="text-2xl text-zinc-700 font-semibold">Reviews</h2>
        <p className="text-zinc-600 text-sm">There Are {reviews.length} Reviews On This Course</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white/60 backdrop-blur-lg border border-gray-200 p-6 sm:flex gap-4"
          >
            <img
              src={review.avatar}
              alt={review.author}
              className="w-16 h-16 object-cover border border-yellow-400/20 p-1"
            />
            
            <div className="flex-1">
              <div className="sm:flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-zinc-900">
                    {review.author}
                    <span className="text-gray-500 font-normal"> – </span>
                    <span className="text-gray-500 font-normal text-sm">
                      {review.date}
                    </span>
                  </h3>
                </div>
                {renderStars(review.rating)}
              </div>
              
              <p className="text-zinc-500 leading-relaxed">
                "{review.content}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;