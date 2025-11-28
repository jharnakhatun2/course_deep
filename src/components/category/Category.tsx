import type { FC, ReactNode } from "react";
import {
  FiBookOpen,
  FiServer,
  FiLayers,
  FiDatabase,
  FiCpu,
  FiCode,
} from "react-icons/fi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import type { Course } from "../../ult/types/types";
import { useNavigate } from "react-router";

// Mapping react-icons to each category
const iconMap: Record<string, ReactNode> = {
  Frontend: <FiBookOpen className="w-10 h-10 text-yellow-500" />,
  Backend: <FiServer className="w-10 h-10 text-yellow-500" />,
  "Full Stack": <FiLayers className="w-10 h-10 text-yellow-500" />,
  Database: <FiDatabase className="w-10 h-10 text-yellow-500" />,
  "AI & ML": <FiCpu className="w-10 h-10 text-yellow-500" />,
  "Programming Fundamentals": <FiCode className="w-10 h-10 text-yellow-500" />,
};

interface CategoryProps {
  courses: Course[];
}

const Category: FC<CategoryProps> = ({ courses }) => {
  const navigate = useNavigate();

  courses.forEach((course, index) => {
    if (!course.category || !course.shortDes) {
      console.warn(`Course ${index} is missing category or description`, course);
    }
  });

  // same category name use one one
  const uniqueCategories = Array.from(
    new Map(courses
      .filter(course => course.category && course.shortDes)
      .map((course: Course) => [course.category, course.shortDes])
    ).entries()
  ).map(([category, shortDes]) => ({ category, shortDes }));


  return (
    <section className="text-zinc-800 bg-gray-100 py-8 lg:py-12">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 ">
          {/* Left text area */}
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-xs uppercase text-teal-500 tracking-wider">
              Explore, Learn & Grow
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold mt-2 text-zinc-600 uppercase">
              Featured Categories
            </h3>
            <p className="my-4 sm:my-6 text-gray-400 leading-relaxed">
              Course Deep is your gateway to mastering in-demand skills. Whether
              you’re a beginner starting your coding journey, a professional
              upgrading your expertise, or someone exploring cutting-edge fields
              like AI & Machine Learning — we’ve got you covered.
            </p>
          </div>

          {/* Category cards */}
          <div className="flex-2 flex flex-wrap justify-center gap-5 py-8 lg:py-12">
            {uniqueCategories.map((cat, index) => (
              <div
                key={index}
                className="aspect-auto w-full sm:w-[48%] md:w-[30%] lg:w-[45%] xl:w-[30%] flex flex-col items-center text-center p-4 rounded-2xl 
             border border-white backdrop-blur-lg bg-white/10 shadow-2xl shadow-gray-600/10
             transform transition-smooth hover:scale-105 hover:shadow-gray-500/15"
              >
                {iconMap[cat.category]}
                <h3 className="mt-4 text-md font-semibold text-zinc-600 uppercase">
                  {cat.category}
                </h3>
                <div className="w-12 h-[2px] bg-gray-200 my-2"></div>
                <p className="text-sm text-zinc-400">{cat.shortDes}</p>
                <button
                  onClick={() =>
                    navigate(
                      `/courses?category=${encodeURIComponent(cat.category)}`
                    )
                  }
                  className="flex gap-1 items-center text-teal-500 hover:text-yellow-500 uppercase text-xs pt-3 cursor-pointer"
                >
                  View More <FaArrowUpRightFromSquare />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;

