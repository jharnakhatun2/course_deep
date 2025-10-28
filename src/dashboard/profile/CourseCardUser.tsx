import type { FC } from "react";
import type { Course } from "../../ult/types/types";

interface CourseCardUserProps {
  course: Course;
}

const CourseCardUser: FC<CourseCardUserProps> = ({ course }) => {
  return (
    <div
      key={course._id}
      className="bg-white/30 grid grid-cols-1 sm:grid-cols-3 gap-5 rounded p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow"
    >
      <div className="sm:col-span-1">
        <img src={course.image} alt={course.name} className="rounded" />
      </div>
      <div className="sm:col-span-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-yellow-500 font-semibold text-sm sm:text-base truncate">
              {course.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm truncate">
              {course.teacher.name}
            </p>
          </div>
        </div>
          <div className="relative w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-100 to-yellow-300 h-2 rounded-full transition-all duration-500"
              style={{ width: `${course.progress || 70}%` }}
            ></div>
            <span className="absolute right-0 -top-6 text-sm text-zinc-700 font-semibold">
              {course.progress || 70}%
            </span>
        </div>
      </div>
    </div>
  );
};

export default CourseCardUser;
