import type { FC } from "react";
import type { BlogPost } from "../../ult/types/types";
import DateCard from "./DateCard";
import Button from "../../ult/button/Button";
import { FaComments, FaReadme, FaUserCheck } from "react-icons/fa";
import { Link } from "react-router";

interface BlogsCardProps {
  blogs: BlogPost[];
}

const BlogsCard: FC<BlogsCardProps> = ({ blogs }) => {
  return (
    <div className="text-zinc-500">
      {blogs.map((blog) => (
        <div key={blog._id}>
          <div className="sm:relative">
            <div className="hidden sm:block">
              {/* Date */}
              <DateCard date={blog.date} />
            </div>
            <div className="sm:ml-20 relative sm:static border border-white/80 overflow-hidden shadow-sm hover:shadow-md transition duration-200 my-8">
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 sm:h-64 md:h-72 object-cover"
              />
              {/* Content */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Date */}
                  <div className="sm:hidden">
                    <DateCard date={blog.date} />
                  </div>
                  {/* Title & author */}
                  <div className="flex-1">
                    <Link to={`/blog/${blog._id}`} className="text-lg sm:text-2xl font-semibold text-zinc-800 leading-snug hover:text-yellow-500 transition-smooth cursor-pointer">
                      {blog.title}
                    </Link>
                    <div className="flex flex-wrap items-center gap-4 pt-2 text-sm">
                      <p className="flex items-center gap-1">
                        <FaUserCheck className="text-yellow-500" />{" "}
                        {blog.author}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaReadme className="text-yellow-500" /> {blog.readTime}
                      </p>
                      <p className="flex items-center gap-1">
                        <FaComments className="text-yellow-500" />{" "}
                        {blog.comments} Comments
                      </p>
                    </div>
                  </div>
                </div>

                {/* Short description */}
                <p className="text-sm sm:text-base">{blog.content}</p>

                {/* Read More Button */}
                <Button
                  url={`/blogs/${blog._id}`}
                  className="w-full sm:w-2/6 px-4 py-2 text-center bg-zinc-100 hover:bg-yellow-500 text-zinc-800 hover:text-white border border-gray-300 hover:border-yellow-500"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsCard;
