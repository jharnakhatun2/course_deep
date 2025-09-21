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

    // Always call hook (even if events is undefined, fallback to [])
      const {
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems: currentBlogs,
        totalItems,
        startIndex,
        itemsPerPage,
      } = usePagination(blogs ?? [], 3);
    
      // Handle loading/error AFTER hooks
      if (isLoading) return <Loader />;
      if (isError || !currentBlogs) {
        return (
          <p className="text-center py-10 text-red-500">Failed to load Blogs!</p>
        );
      }

  return (
    <section className="py-10 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-8">
            {/* Left content */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1}–
                  {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
                  results
                </p>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>All Courses</option>
                  <option>Business</option>
                  <option>Design</option>
                </select>
              </div>
    
              {/* Course List */}
              <BlogsCard blogs={currentBlogs}  />
    
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
    
            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </section>
  )
}

export default Blogs