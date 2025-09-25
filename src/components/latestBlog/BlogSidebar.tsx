import { type FC } from "react";
import Search from "../../ult/search/Search";

import type { BlogPost } from "../../ult/types/types";
import LatestPost from "./LatestPost";
import BlogCategory from "./BlogCategory";

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
        <LatestPost blogs={blogs} />
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
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Course Intro
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <div className="relative w-full h-40 sm:h-52 bg-gray-200 rounded-lg flex items-center justify-center">
          <button className="bg-white text-black rounded-full p-4 shadow">
            ▶
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
