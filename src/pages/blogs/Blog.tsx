import { useParams, Link } from "react-router";
import Loader from "../../ult/loader/Loader";
import { useGetBlogByIdQuery } from "../../features/blog/blogApi";
import SingleBlogSidebar from "../../components/latestBlog/SingleBlogSidebar";

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id!);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load blog!</p>
    );
  if (!blog)
    return (
      <p className="text-center py-10 text-red-500 text-2xl">Blog not found!</p>
    );

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Blog Content */}
        <div className="lg:col-span-3">
          <Link
            to="/blogs"
            className="text-blue-500 hover:underline mb-4 inline-block"
          >
            &larr; Back to Blogs
          </Link>

          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-500 mb-6">Category: {blog.category}</p>
          <div className="prose max-w-none">{blog.content}</div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <SingleBlogSidebar />
        </aside>
      </div>
    </section>
  );
};

export default Blog;
