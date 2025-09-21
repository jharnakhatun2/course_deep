import { useSearchParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import type { Course } from "../../ult/types/types";
import CourseSidebar from "../../components/courses/courses/CourseSidebar";
import CourseList from "../../components/courses/courses/CourseList";
import Pagination from "../../ult/pegination/Pagination";
import Loader from "../../ult/loader/Loader";
import { usePagination } from "../../ult/pegination/usePagination";

const Courses = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Filter by category
  const filteredCourses: Course[] = category
    ? courses?.filter((course: Course) => course.category === category) ?? []
    : courses ?? [];

  // Use pagination hook
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentCourses,
    totalItems,
    startIndex,
    itemsPerPage,
  } = usePagination(filteredCourses, 6);

  // Loading & Error for Data
  if (isLoading) return <Loader />;
  if (isError || !currentCourses)
    return (
      <p className="text-center py-10 text-red-500">Failed to load courses!</p>
    );

  return (
    <section className="py-10 bg-gray-50">
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
          <CourseList courses={currentCourses} category={category || ""} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Sidebar */}
        <CourseSidebar />
      </div>
    </section>
  );
};

export default Courses;
