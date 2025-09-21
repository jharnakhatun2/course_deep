import type { FC } from "react";
import type { BlogPost } from "../../ult/types/types";
import DateCard from "./DateCard";
import Button from "../../ult/button/Button";
import { FaComments, FaReadme, FaUserCheck } from "react-icons/fa";

interface BlogsCardProps {
  blogs: BlogPost[];
}

const BlogsCard: FC<BlogsCardProps> = ({ blogs }) => {
  return (
    <div className="text-zinc-500">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="relative border border-white/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 my-10"
        >
          {/* Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full sm:h-82 object-cover"
          />

          {/* Content */}
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              {/* Date */}
              <DateCard date={blog.date} />

              {/* Title & author */}
              <div className="flex-1">
                <h2 className="text-xl sm:text-3xl font-semibold text-zinc-800">
                  {blog.title}
                </h2>
                <div className="flex items-center gap-7 pt-1">
                  <p className="flex items-center gap-2">
                    <FaUserCheck className="text-yellow-500" />
                    By <span>{blog.author}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaReadme className="text-yellow-500" />
                    <span>{blog.readTime}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaComments className="text-yellow-500" />
                    <span>{blog.comments}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Short description */}
            <p>{blog.content}</p>

            {/* Read More Button */}
            <Button
              url={`/${blog._id}`}
              className="w-full sm:w-1/6 text-center bg-zinc-100 hover:bg-yellow-500 text-zinc-800 hover:text-white border border-gray-300 hover:border-yellow-500"
            >
              Read More
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsCard;
