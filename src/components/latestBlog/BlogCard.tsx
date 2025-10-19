import React from "react";
import { Link } from "react-router";
import { FaReadme, FaUserEdit } from "react-icons/fa";
import type { Comment } from "../../ult/types/types";

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  date: string;
  shortDes: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  readTime?: string;
  comments?: Comment[];
}

const BlogCard: React.FC<BlogPost> = ({
  _id,
  image,
  category,
  title,
  content,
  author,
  date,
  readTime,
}) => {
  return (
    <div className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
      {/* Image with overlay */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay slides up */}
        <div
          className="absolute bottom-0 left-0 w-full h-0 bg-gray-100/70
  flex items-center justify-center group-hover:h-full overflow-hidden transition-smooth"
        >
          <Link
            to={`/blog/${_id}`}
            className="px-4 py-2 bg-yellow-400 text-zinc-700 hover:text-white font-semibold rounded hover:bg-yellow-500 transition-colors duration-300 uppercase text-xs transition-smooth"
          >
            View More
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <span className="inline-block bg-yellow-500 text-white text-xs px-3 py-1">
          {category}
        </span>
        <Link to={`/blog/${_id}`} className="block pt-2">
          <h3 className="text-sm  text-zinc-600 font-bold mb-2 hover:text-yellow-500 transition-colors duration-300 uppercase">
            {title.length > 38 ? title.slice(0, 33) + "..." : title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm">
          {content.length > 82 ? content.slice(0, 82) + "..." : content}
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center">
        <div className="w-10 h-10 rounded-full mr-3 shadow-2xl bg-white flex items-center justify-center">
          <FaUserEdit className="w-5 h-5 text-teal-500" />
        </div>

        <div className="text-gray-600 text-sm">
          <p className="font-semibold text-gray-800 uppercase text-xs">
            {author}
          </p>
          <div className="space-x-5 flex">
            {date} <span className="text-gray-400 px-3">|</span>
            <span className="flex items-center gap-1">
              <FaReadme className="text-teal-500" /> {readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
