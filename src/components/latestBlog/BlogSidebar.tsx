import { useMemo, type FC } from "react";
import Search from "../../ult/search/Search";
import { Link } from "react-router";
import type { BlogPost } from "../../ult/types/types";

interface BlogSidebarProps {
  setSearchQuery: (query: string) => void;
  blogs: BlogPost[];
}

const BlogSidebar: FC<BlogSidebarProps> = ({ setSearchQuery, blogs }) => {
  // Compute latest blogs safely using useMemo
  const latestPost = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];
    return Array.from(blogs)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3); // top 3 latest blogs
  }, [blogs]);

  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <aside className="space-y-10 sm:mt-9">
      {/* Search bar */}
      <Search placeholder="Search blogs..." onSearch={setSearchQuery} />

      {/* Latest Blogs */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Latest Blogs
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-4">
          {latestPost.length > 0 ? (
            latestPost.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                className="flex items-center gap-2"
                key={blog._id}
              >
                <img
                  src={blog.image}
                  className="w-24 rounded"
                  alt={blog.title}
                />
                <div>
                  <p className="text-sm hover:text-yellow-500">{blog.title}</p>
                  <span className="text-sm font-semibold">
                    {formatDate(blog.date)}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No latest blogs found.</p>
          )}
        </ul>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Categories
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
          {["Business", "Design", "Programming", "Photography"].map((cat) => (
            <li key={cat} className="hover:text-blue-600 cursor-pointer">
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Intro / Video Placeholder */}
      <div>
        <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
          Course Intro
        </h4>
        <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
        <div className="relative w-full h-40 sm:h-52 bg-gray-200 rounded-lg flex items-center justify-center">
          <button className="bg-white text-black rounded-full p-4 shadow">
            ▶
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
