import React from "react";

type CourseCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  lessons: number;
  students: number;
};

const Card: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
  lessons,
  students,
}) => {
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto cursor-pointer group">
      {/* Image Wrapper with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay slides down */}
        <div
          className="absolute top-0 left-0 w-full h-0 bg-yellow-100/70 
          group-hover:h-full transition-smooth"
        />
      </div>

      {/* Course Content */}
      <div className="p-5 relative z-10">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>

        <div className="flex justify-between text-gray-500 text-sm mb-4">
          <span>{lessons} Lessons</span>
          <span>{students} Students</span>
        </div>

        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default Card;
