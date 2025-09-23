import type { FC } from "react";
import Search from "../../ult/search/Search";

interface CourseSidebarProps {
  setSearchQuery: (query: string) => void;
}

const BlogSidebar: FC<CourseSidebarProps> = ({ setSearchQuery }) => {
  return (
    <aside className="space-y-10">
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Blogs Search</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <Search placeholder="Search blogs..." onSearch={setSearchQuery} />
      </div>

      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Categories</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
          {["Business", "Design", "Programming", "Photography"].map((cat) => (
            <li key={cat} className="hover:text-blue-600 cursor-pointer">
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Course Intro</h4>
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
