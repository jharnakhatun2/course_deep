import React from "react";
import type { Course } from "../../../ult/types/types";

interface CourseListProps {
  courses: Course[];
  category?: string;
}

const CourseList: React.FC<CourseListProps> = ({ courses, category }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-zinc-700 mb-6">
        {category ? `Courses in ${category}` : "All Courses"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-zinc-700">
              {course.name}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{course.shortDes}</p>
            <span className="text-xs text-teal-500 mt-3 inline-block uppercase">
              {course.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
