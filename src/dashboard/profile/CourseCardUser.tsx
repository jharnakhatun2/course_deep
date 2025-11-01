import type { FC } from "react";
import type { Enrollment } from "../../ult/types/types";
import { Link } from "react-router";

interface CourseCardUserProps {
  course: Enrollment;
}

const CourseCardUser: FC<CourseCardUserProps> = ({ course }) => {

  // Calculate real progress
  const calculateProgress = (enrollment: Enrollment): number => {
    if (!enrollment.allLessons || enrollment.allLessons.length === 0) {
      return enrollment.progress || 0;
    }

    const completedCount = enrollment.completedLessons?.length || 0;
    const totalLessons = enrollment.allLessons.length;

    return Math.round((completedCount / totalLessons) * 100);
  };

  const progress = calculateProgress(course);

  return (
    <div
      key={course._id}
      className="bg-white/30 grid grid-cols-1 sm:grid-cols-3 gap-5 rounded p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow"
    >
      <div className="sm:col-span-1">
        <img src={course.courseImage} alt={course.courseTitle} className="rounded" />
      </div>
      <div className="sm:col-span-2 space-y-5">
        {/* course content */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-zinc-600 font-semibold text-sm sm:text-xl truncate">
              {course.courseTitle}
            </h3>
            <p className="text-zinc-500 text-sm sm:text-lg truncate">
              {course.instructorName}
            </p>
          </div>
        </div>
        {/* progress bar */}
        <div className="relative w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-100 to-yellow-300 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute right-0 -top-6 text-sm text-zinc-700 font-semibold">
            {progress}%
          </span>
        </div>
        {/* buttons */}
        <Link
          to="/lesson"
          className="py-1.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-white shadow-[0_0_15px_rgba(255,221,51,0.3)]
 hover:shadow-[0_0_25px_rgba(255,221,51,0.5)] border border-yellow-400 transition-smooth rounded text-center "
        >
          Start Course
        </Link>
      </div>
    </div>
  );
};

export default CourseCardUser;
