import CourseIntro from "../courses/courses/CourseIntro";
import PopularCourse from "../footer/PopularCourse";
import LatestPost from "./LatestPost";

const SingleBlogSidebar = () => {
  return (
    <aside className="space-y-10">
      {/* Course Intro / Video Placeholder */}
      <CourseIntro />

      {/* Latest Blogs */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Latest Blogs
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <LatestPost />
      </div>
      {/* Popular Courses */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Popular Courses
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <PopularCourse />
      </div>
    </aside>
  );
};

export default SingleBlogSidebar;
