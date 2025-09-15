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

type Category = {
  name: string;
  description: string;
};

const categories: Category[] = [
  {
    name: "Frontend",
    description:
      "Learn to build interactive and visually appealing websites using HTML, CSS, JavaScript, React, Angular, and Vue.",
  },
  {
    name: "Backend",
    description:
      "Master server-side programming, RESTful APIs, databases, and frameworks like Node.js, Express, Django, and Flask.",
  },
  {
    name: "Full Stack",
    description:
      "Become a full-stack developer and learn to build end-to-end web applications combining frontend and backend skills.",
  },
  {
    name: "Database",
    description:
      "Learn relational and non-relational databases, SQL queries, data modeling, and database management.",
  },
  {
    name: "AI & ML",
    description:
      "Explore artificial intelligence, machine learning, and neural networks to build intelligent applications.",
  },
  {
    name: "Programming Fundamentals",
    description:
      "Master problem-solving, algorithms, and data structures using programming languages like JavaScript, Python, and Java.",
  },
];

// Mapping react-icons to each category
const iconMap: Record<string, ReactNode> = {
  Frontend: <FiBookOpen className="w-10 h-10 text-yellow-500" />,
  Backend: <FiServer className="w-10 h-10 text-yellow-500" />,
  "Full Stack": <FiLayers className="w-10 h-10 text-yellow-500" />,
  Database: <FiDatabase className="w-10 h-10 text-yellow-500" />,
  "AI & ML": <FiCpu className="w-10 h-10 text-yellow-500" />,
  "Programming Fundamentals": <FiCode className="w-10 h-10 text-yellow-500" />,
};

const Category: FC = () => {
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
          <div className="flex-2 flex flex-wrap justify-center  gap-5 sm:gap-7 py-8 lg:py-12">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="aspect-auto w-full sm:w-[48%] md:w-[30%] lg:w-[45%] xl:w-[30%] flex flex-col items-center text-center p-4 rounded-2xl 
             border border-white backdrop-blur-lg bg-white/10 shadow-2xl shadow-gray-600/10
             transform transition-transform duration-300 hover:scale-105 hover:shadow-gray-500/15 cursor-pointer"
              >
                {iconMap[cat.name]}
                <h3 className="mt-4 text-md font-semibold text-zinc-600 uppercase">
                  {cat.name}
                </h3>
                <div className="w-12 h-[2px] bg-gray-200 my-2"></div>
                <p className="text-sm text-gray-400">{cat.description}</p>
                <button className="flex gap-1 items-center text-teal-500 hover:text-yellow-500 uppercase text-xs pt-3 cursor-pointer">
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
