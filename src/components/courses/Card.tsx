import React from "react";
import { FiBookOpen } from "react-icons/fi";
import TeacherCard from "./TeacherCard";
import { FaUsers } from "react-icons/fa";

type CourseCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  lessons: number;
  students: number;
  price: number;
  time: string;
  teacherName: string;
  teacherProfession: string;
  rating: number;
};

const Card: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
  lessons,
  students,
  time,
  price,
  teacherName,
  teacherProfession,
  rating,
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
      <div className="p-4 relative z-10">
        <h3 className="text-lg font-bold mb-2 text-gray-800 uppercase">
          {title}
        </h3>
        <p className="text-gray-500">{description}</p>

        {/* Info row with icons */}
        <div className="flex gap-3 text-gray-500 text-sm pt-1">
          <span className="flex items-center gap-1">
            <FiBookOpen className="text-teal-500" /> <span className="font-bold text-gray-600">{lessons}</span> Lessons
          </span>
          <span className="flex items-center gap-1">
            <FaUsers className="text-teal-500" /> <span className="font-bold text-gray-600">{students}</span> Students
          </span>
        </div>

         {/* divider */}
        <div className="h-[1px] w-full bg-zinc-400/30 shadow my-4"></div>

        {/* Teacher + Rating */}
        <div className="flex items-center justify-between">
          <TeacherCard
            time={time}
            name={teacherName}
            profession={teacherProfession}
            rating={rating}
          />
        </div>
        {/* divider */}
        <div className="h-[1px] w-full bg-zinc-400/30 shadow my-4"></div>
        {/* footer */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl">$<span className="text-zinc-800 font-bold">{price}.00</span></h3>
          <button className="cursor-pointer text-sm uppercase bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
