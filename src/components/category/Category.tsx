import type { FC, ReactNode } from "react";
import {
  FiBookOpen,
  FiServer,
  FiLayers,
  FiDatabase,
  FiCpu,
  FiCode,
} from "react-icons/fi"; 
import SectionTitle from "../../ult/title/SectionTitle";

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
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="lg:max-w-7xl mx-auto px-4">
        <SectionTitle title="All Categories"/>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 py-8 sm:py-10">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow"
            >
              {iconMap[cat.name]}
              <h3 className="mt-4 text-md font-semibold text-gray-900 uppercase">
                {cat.name}
              </h3>
              <div className="w-12 h-[2px] bg-gray-200 my-2"></div>
              <p className="text-sm text-gray-500 font-poppins">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
