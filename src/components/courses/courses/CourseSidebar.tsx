import { type FC } from "react";
import Search from "../../../ult/search/Search";


interface CourseSidebarProps {
  setSearchQuery: (query: string) => void;
}

const CourseSidebar: FC<CourseSidebarProps> = ({setSearchQuery}) => {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Course Search</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <Search placeholder="Search courses..." onSearch={setSearchQuery}/>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Course Categories</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-2 text-gray-600">
          {[
            "Business",
            "Design",
            "Programming Language",
            "Photography",
            "Language",
            "Life Style",
            "IT & Software",
          ].map((cat) => (
            <li key={cat} className="hover:text-blue-600 cursor-pointer">
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Intro */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Course Intro</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <div className="relative w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          <button className="bg-white text-black rounded-full p-4 shadow">
            ▶
          </button>
        </div>
      </div>

      {/* Popular Courses */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">Popular Courses</h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <img src="https://via.placeholder.com/60" className="rounded" />
            <div>
              <p className="text-sm font-medium">Intro to Mobile Apps</p>
              <span className="text-xs text-blue-600">$99.00</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <img src="https://via.placeholder.com/60" className="rounded" />
            <div>
              <p className="text-sm font-medium">Become a Film Maker</p>
              <span className="text-xs text-green-600">FREE</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CourseSidebar;
