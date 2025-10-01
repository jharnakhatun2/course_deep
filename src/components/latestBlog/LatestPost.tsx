import { useMemo, type FC } from "react";
import { Link } from "react-router";
import { useGetBlogsQuery } from "../../features/blog/blogApi";



const LatestPost: FC = () => {
  const { data: blogs } = useGetBlogsQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });

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
    <ul className="space-y-4">
      {latestPost.length > 0 ? (
        latestPost.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            className="flex items-center gap-2"
            key={blog._id}
          >
            <img src={blog.image} className="w-24 rounded" alt={blog.title} />
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
  );
};

export default LatestPost;
