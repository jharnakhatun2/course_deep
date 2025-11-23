import type { FC } from "react";
import { MdWorkspacePremium } from "react-icons/md";
import type { Course } from "../../../ult/types/types";

interface CourseProps {
  course: Course;
}

const InfoCard: FC<CourseProps> = ({ course }) => {
  const lebelStyle = "text-sm text-gray-400";
  const lebelDataStyle = "text-zinc-600";
  return (
    <div className="hidden absolute left-1/2 -bottom-10 -translate-x-1/2 h-24 w-11/12 sm:w-11/12 rounded-xl shadow-lg sm:flex items-center justify-between overflow-hidden bg-white/30 backdrop-blur-lg shadow-[0_0_5px_#ffffff]">
      {/* Premium Badge (first card start) */}
      <div className="bg-yellow-500 px-5 py-3 text-white flex flex-col items-center justify-center h-full w-28 rounded-l-lg">
        <MdWorkspacePremium className="text-3xl" />
        <p className="text-lg font-semibold">{course.price > 0 ? "Premium" : "Free"}</p>
      </div>

      {/* Course Info Section */}
      <div className="flex-1 flex justify-around items-center text-gray-700 text-center px-4">
        <div>
          <p className={lebelDataStyle}>{course.level}</p>
          <p className={lebelStyle}>Level</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className={lebelDataStyle}>{course.language}</p>
          <p className={lebelStyle}>Language</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className={lebelDataStyle}>
            {course.lastUpdated
              ? new Date(course.lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              : "Not updated"}
          </p>
          <p className={lebelStyle}>Last Updated</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className={lebelDataStyle}>
            {course.prerequisites?.length
              ? course.prerequisites.join(", ")
              : "No prerequisites"}
          </p>
          <p className={lebelStyle}>Prerequisites</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
