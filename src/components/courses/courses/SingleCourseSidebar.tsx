import type { FC } from "react";
import type { Course } from "../../../ult/types/types";
import PopularCourse from "../../footer/PopularCourse";
import CourseEnroll from "./CourseEnroll";
import CourseIntro from "./CourseIntro";

interface CourseEnrollProps {
  course: Course;
}

const SingleCourseSidebar: FC<CourseEnrollProps> = ({ course }) => {
  return (
    <div className="space-y-10">
      {/* Course Enroll */}
      <CourseEnroll course={course} />

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

export default SingleCourseSidebar;
