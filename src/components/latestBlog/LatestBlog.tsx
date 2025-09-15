import React from "react";
import { Link } from "react-router";
import img1 from "../../assets/img/portfolio/1.webp";
import img2 from "../../assets/img/portfolio/2.webp";
import img3 from "../../assets/img/portfolio/3.webp";
import SectionTitle from "../../ult/title/SectionTitle";

interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
}

// Static blog data
const blogData: BlogPost[] = [
  {
    id: 1,
    image: img1,
    category: "React",
    title: "Getting Started with React 18: A Beginner's Guide",
    content:
      "Learn the fundamentals of React 18, including hooks, component structure, and building your first app step by step.",
    author: "Jharna Khatun",
    date: "Sep 14, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: img2,
    category: "JavaScript",
    title: "10 Advanced JavaScript Concepts Every Developer Should Know",
    content:
      "Deep dive into closures, async/await, event loop, and other advanced JavaScript concepts to level up your coding skills.",
    author: "Samiha Rahman",
    date: "Sep 10, 2025",
    readTime: "7 min read",
  },
  {
    id: 3,
    image: img3,
    category: "Web Development",
    title: "How to Build Responsive Websites with Tailwind CSS",
    content:
      "Learn how to use Tailwind CSS utility classes to create modern, responsive websites quickly and efficiently.",
    author: "Arif Hasan",
    date: "Sep 5, 2025",
    readTime: "6 min read",
  },
];

const LatestBlog: React.FC = () => {
  const latestBlogs = blogData.slice(0, 3); // first 3 blogs

  return (
    <section className="py-8 lg:py-12 bg-gray-100">
      <div className="container mx-auto px-5">
        {/* Section Title */}
        <SectionTitle title="Latest Blogs" className="text-zinc-700"/>
        

        {/* Blog Cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-8 sm:py-10">
          {latestBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image with overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-0 bg-gray-100/70 
  flex items-center justify-center group-hover:h-full overflow-hidden transition-smooth"
                >
                  <Link
                    to="/blog"
                    className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400 transition-colors duration-300"
                  >
                    View More
                  </Link>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <span className="inline-block bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {post.category}
                </span>
                <Link to="/blog" className="block">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-yellow-400 transition-colors duration-300">
                    {post.title.length > 47
                      ? post.title.slice(0, 47) + "..."
                      : post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm">
                  {post.content.length > 82
                    ? post.content.slice(0, 82) + "..."
                    : post.content}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center">
                <img
                  src="https://i.ibb.co/D9dYdq7/user.png"
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="text-gray-600 text-sm">
                  <p className="font-semibold text-gray-800">{post.author}</p>
                  <p>
                    {post.date} &middot; {post.readTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
