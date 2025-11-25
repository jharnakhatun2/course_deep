import type { FC } from "react";
import CourseIntro from "../../components/courses/courses/CourseIntro";
import PopularCourse from "../../components/footer/PopularCourse";
import type { InstructorCourse } from "../../ult/types/types";


interface CourseEnrollProps {
  course: InstructorCourse;
}

const InstructorSingleSidebar: FC<CourseEnrollProps> = ({ course }) => {
  return (
    <div className="space-y-10">
      {/* Course Noted Data Show */}
      <div className="p-6 shadow-lg">
        {/* Price */}
        <div className="mb-6">
          <span className="text-gray-500 text-sm uppercase tracking-wide font-semibold">
            Price:
          </span>
          <span className="text-2xl sm:text-3xl font-bold text-yellow-500 ml-2">
            {course.price > 0 ? `$ ${course.price || "39.00"}` : "Free"}
          </span>
        </div>

        <div className="space-y-4">
          <div className="h-[1px] w-full bg-gray-500/20 my-3" />

          {/* Students */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm">
              {course.studentsEnrolled ?? 199} Students
            </span>
          </div>

          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* Duration */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">
              Duration : {course.totalDays ?? "30 Days"}
            </span>
          </div>

          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* Lectures */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-sm">Lectures: {course.totalLectures}</span>
          </div>

          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* videos */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path d="M10 8l6 4-6 4V8z" />
            </svg>
            <span className="text-sm">Video: {course.time}</span>
          </div>

          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* Certificate */}
          <div className="flex items-center text-gray-600">
            <svg
              className="w-5 h-5 mr-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">
              {course.certificate
                ? "Certificate of Completion"
                : "No Certificate"}
            </span>
          </div>
        </div>
      </div>

      {/* Course Intro */}
      <CourseIntro />
      {/* Popular Courses */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Popular Courses
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3" />
        <PopularCourse />
      </div>
    </div>
  );
};

export default InstructorSingleSidebar;
