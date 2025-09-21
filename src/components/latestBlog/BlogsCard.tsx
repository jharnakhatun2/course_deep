import type { FC } from "react";
import type { BlogPost } from "../../ult/types/types";
import DateCard from "./DateCard";


interface BlogsCardProps {
  blogs: BlogPost[];
}

const BlogsCard: FC<BlogsCardProps> = ({ blogs }) => {
  return (
    <div className="gap-20">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          {/* Image */}
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />

          {/* Content */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              {/* Date */}
              <DateCard date={blog.date} />

              {/* Title & author */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500">by {blog.author}</p>
              </div>
            </div>

            {/* Short description */}
            <p className="text-gray-700 text-sm">{blog.shortDes}</p>

            {/* Tags & read time */}
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{blog.tags.join(", ")}</span>
              <span>{blog.readTime ?? "5 min read"}</span>
              <span>{blog.comments} comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsCard;
