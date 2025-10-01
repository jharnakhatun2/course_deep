import { type FC } from "react";
import Search from "../../ult/search/Search";
import type { BlogPost } from "../../ult/types/types";
import LatestPost from "./LatestPost";
import BlogCategory from "./BlogCategory";
import CourseIntro from "../courses/courses/CourseIntro";
import PopularCourse from "../footer/PopularCourse";

interface BlogSidebarProps {
  setSearchQuery: (query: string) => void;
  blogs: BlogPost[];
  selectedCategory?: string | null;
  setSelectedCategory?: (cat: string | null) => void;
}

const BlogSidebar: FC<BlogSidebarProps> = ({
  setSearchQuery,
  blogs,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <aside className="space-y-10 sm:mt-9">
      {/* Search bar */}
      <Search placeholder="Search blogs..." onSearch={setSearchQuery} />

      {/* Latest Blogs */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Latest Blogs
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <LatestPost  />
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Categories
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <BlogCategory
          blogs={blogs}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Course Intro / Video Placeholder */}
      <CourseIntro />

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

export default BlogSidebar;
