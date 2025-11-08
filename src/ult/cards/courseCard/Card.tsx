import React from "react";
import { FiBookOpen, FiClock } from "react-icons/fi";
import { FaStar, FaUsers } from "react-icons/fa";
import TeacherCard from "./TeacherCard";
import { Link } from "react-router";
import type { Teacher } from "../../types/types";

type CourseCardProps = {
  _id: string;
  title: string;
  shortDes: string;
  ratings: number;
  time: string;
  teacher: Teacher;
  imageUrl: string;
  lessons: string;
  students: number;
  price: number;
};

const Card: React.FC<CourseCardProps> = ({
  _id,
  title,
  shortDes,
  imageUrl,
  lessons,
  students,
  time,
  price,
  ratings,
  teacher
}) => {
  return (
    <div className="backdrop-blur-lg bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto group">
      {/* Image Wrapper with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay slides down */}
        <div
          className="absolute top-0 left-0 w-full h-0 bg-gray-100/70 flex items-center justify-center overflow-hidden
          group-hover:h-full transition-smooth"
        >
          <Link
            to={`/course/${_id}`}
            className="cursor-pointer text-sm uppercase bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded transition-smooth"
          >
            View More
          </Link>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4 relative z-10">
        <h3 className="font-semibold mb-2">
          {price > 0 ? (
            <span className="bg-yellow-500 text-white px-3 py-[2px]">
              ${price}
            </span>
          ) : (
            <span className="bg-teal-500 text-white px-3 py-[2px]">Free</span>
          )}
        </h3>
        {/* title */}
        <Link to={`/course/${_id}`}>
          <h3 className="hover:text-yellow-500 transition-smooth font-bold mb-2 text-zinc-700 uppercase">
            {title?.slice(0, 23) + "..."}{" "}
          </h3>
        </Link>

        <p className="text-zinc-400 mb-2">
          {(shortDes ? shortDes.slice(0, 50) : "") + "..."}
        </p>

        {/* divider */}
        <div className="h-[1px] w-full bg-zinc-400/30 shadow my-4"/>

        {/* Info row with icons */}
        <div className="flex justify-between text-zinc-400 text-sm pt-1">
          <span className="flex items-center gap-1">
            <FiBookOpen className="text-teal-500" />{" "}
            <span className="font-bold text-zinc-500">{lessons}</span> Lessons
          </span>
          <span className="flex items-center gap-1">
            <FaUsers className="text-teal-500" />{" "}
            <span className="font-bold text-zinc-500">{students}</span> Students
          </span>
        </div>

        {/* Info row with icons */}
        <div className="flex justify-between text-zinc-400 text-sm pt-1">
          {/* course duration */}
          <p className="flex items-center gap-1">
                    <FiClock className="text-teal-500" />{" "}
                    <span className="text-zinc-600">{time}</span>
                  </p>
          {/* course ratings */}
          <div className="flex items-center gap-1 ml-auto">
                    {Array.from({ length: 1 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(ratings) ? "text-yellow-500" : "text-zinc-500"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-zinc-400">
                      (<span className="font-bold text-zinc-500">{ratings}</span> ratings)
                    </span>
                  </div>
        </div>

        {/* divider */}
        <div className="h-[1px] w-full bg-zinc-400/30 shadow my-4"></div>

        {/* Teacher + Rating */}
        <div className="flex items-center justify-between">
          <TeacherCard
            time={time}
            name={teacher.name}
            image={teacher.image}
            profession={teacher.profession}
            ratings={ratings}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
