import { useParams, useLocation } from "react-router";
import Loader from "../../ult/loader/Loader";
import { useGetBlogByIdQuery } from "../../features/blog/blogApi";
import SingleBlogSidebar from "../../components/latestBlog/SingleBlogSidebar";
import SingleBlogInfo from "../../components/latestBlog/SingleBlogInfo";
import SingleAuthor from "../../components/latestBlog/SingleAuthor";
import CommentsSection from "../../components/latestBlog/CommentsSection";
import { useEffect } from "react";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";

const breadcrumbItems = [{ label: "Blogs", href: "/blogs" }, { label: "Blog" }];

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id!);

  // Extract focusCommentId from location state
  const focusCommentId = location.state?.focusCommentId;

  // Clear the state after using it to prevent reopening on refresh
  useEffect(() => {
    if (focusCommentId) {
      // Clear the state to avoid reopening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [focusCommentId]);

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
          <Breadcrumb items={breadcrumbItems} />
          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* Blog Info */}
          <SingleBlogInfo blog={blog} />
          <div className="h-[1px] w-full bg-gray-500/20 -mt-3"></div>
          <SingleAuthor blog={blog} />
          <div className="h-[1px] w-full bg-gray-500/20 my-6"></div>
          <CommentsSection blogId={blog._id} focusCommentId={focusCommentId} />
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
