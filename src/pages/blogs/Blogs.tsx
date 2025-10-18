import { useState } from "react";
import BlogsCard from "../../components/latestBlog/BlogsCard";
import BlogSidebar from "../../components/latestBlog/BlogSidebar";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import Loader from "../../ult/loader/Loader";
import Pagination from "../../ult/pegination/Pagination";
import { usePagination } from "../../ult/pegination/usePagination";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";

const breadcrumbItems = [
  { label: "Blogs" }
];

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
  // Selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter blogs by search and category
  const filteredBlogs =
    blogs?.filter((blog) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query);

      const matchesCategory = selectedCategory
        ? blog.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    }) ?? [];

  // Pagination
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentBlogs,
    totalItems,
    startIndex,
    itemsPerPage,
  } = usePagination(filteredBlogs, 3);

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
          {/* total blogs */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumb items={breadcrumbItems} />
            <p className="hidden sm:flex text-zinc-600">
              Showing{" "}
              <span className="font-bold px-1">
                {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="px-2 font-bold">{totalItems}</span> results
            </p>
          </div>
          <div className="h-[1px] w-full bg-gray-500/20 -mt-3"></div>

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
          <BlogSidebar
            setSearchQuery={setSearchQuery}
            blogs={blogs ?? []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </section>
  );
};

export default Blogs;
