import { useState } from "react";
import BlogsCard from "../../components/latestBlog/BlogsCard";
import BlogSidebar from "../../components/latestBlog/BlogSidebar";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import Loader from "../../ult/loader/Loader";
import Pagination from "../../ult/pegination/Pagination";
import { usePagination } from "../../ult/pegination/usePagination";

const Blogs = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useGetBlogsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  //search query
  const [searchQuery, setSearchQuery] = useState("");

  //search filter
  const filteredBlogs =
    blogs?.filter((blog) => {
      const query = searchQuery.toLowerCase();
      return (
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
      );
    }) ?? [];

  // Always call hook (even if events is undefined, fallback to [])
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentBlogs,
    totalItems,
    startIndex,
    itemsPerPage,
  } = usePagination(filteredBlogs ?? [], 3);

  // Handle loading/error AFTER hooks
  if (isLoading) return <Loader />;
  if (isError || !currentBlogs) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load Blogs!</p>
    );
  }

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left content */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          {/* title */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
              results
            </p>
          </div>

          {/* Blogs List */}
          {filteredBlogs.length === 0 ? (
            <p className="text-center text-red-500 py-10 text-2xl">
              Not Found!
            </p>
          ) : (
            <BlogsCard blogs={currentBlogs} />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Sidebar */}
        <div className="order-1 lg:order-2">
          <BlogSidebar setSearchQuery={setSearchQuery} />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
