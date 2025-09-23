import { type FC, useMemo } from "react";
import Search from "../../../ult/search/Search";
import { Link, useSearchParams } from "react-router";
import type { Course } from "../../../ult/types/types";

interface CourseSidebarProps {
  setSearchQuery: (query: string) => void;
  courses: Course[];
}

const CourseSidebar: FC<CourseSidebarProps> = ({ setSearchQuery, courses }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  // Extract unique categories from course data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ["All Courses", ...unique];
  }, [courses]);

  // Handle category click (updates URL)
  const handleCategoryClick = (cat: string) => {
    if (cat === "All Courses") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  //filter popular courses
  const popularCourses = courses
    .filter((course) => course.ratings >= 4.9 && course.studentsEnrolled > 500)
    .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
    .slice(0, 5);

  return (
    <aside className="space-y-10">
      {/* Search */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Course Search
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <Search placeholder="Search courses..." onSearch={setSearchQuery} />
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Course Categories
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-1 text-zinc-500">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`cursor-pointer text-sm hover:shadow backdrop-blur bg-white/40 py-2 pl-3 transition-smooth hover:text-yellow-500 font-poppins ${
                activeCategory === cat ||
                (cat === "All Courses" && !activeCategory)
                  ? "text-yellow-500 font-semibold"
                  : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Intro */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Course Intro
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <iframe
          className="w-full h-full"
          src="https://www.youtube-nocookie.com/embed/7IgVGSaQPaw?si=YUIJfP4pMROE3zDE"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {/* Popular Courses */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Popular Courses
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-4">
          {popularCourses.map((course) => (
            <Link
              to={`/course/${course._id}`}
              className="flex items-center gap-2"
              key={course._id}
            >
              <img src={course.image} className="w-24" />
              <div>
                <p className="text-xs font-medium hover:text-yellow-500">
                  {course.name}
                </p>
                <span className="text-sm text-yellow-600 font-semibold">
                  {course.price}
                </span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default CourseSidebar;
