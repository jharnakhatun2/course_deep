import PopularCourse from "../../footer/PopularCourse";
import CourseIntro from "./CourseIntro";

const SingleCourseSidebar = () => {
  return (
    <div className="space-y-10">
      {/* Course Intro */}
      <CourseIntro />
      {/* Popular Courses */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Popular Courses
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <PopularCourse />
      </div>
    </div>
  );
};

export default SingleCourseSidebar;
