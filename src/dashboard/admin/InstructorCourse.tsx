import { useSearchParams } from "react-router";
import type { Course } from "../../ult/types/types";
import CourseList from "../../components/courses/courses/CourseList";
import Pagination from "../../ult/pegination/Pagination";
import Loader from "../../ult/loader/Loader";
import { usePagination } from "../../ult/pegination/usePagination";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";
import { useGetInstructorCoursesQuery } from "../../features/instructor-course/instructorCourseApi";

const breadcrumbItems = [{ label: "Instructor's All Courses" }];

const InstructorCourse = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetInstructorCoursesQuery();
  const [searchParams] = useSearchParams();
  
  // Get search parameters
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";

  // Filter by category + search
  const filteredCourses: Course[] =
    courses
      ?.filter((course: Course) =>
        category ? course.category === category : true
      )
      .filter((course: Course) => {
        const query = searchQuery.toLowerCase();
        return (
          course.name?.toLowerCase().includes(query) ||
          course.shortDes?.toLowerCase().includes(query)
        );
      }) ?? [];

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
    <div className="grid grid-cols-1">
      {/* Left content */}
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
            <Breadcrumb items={breadcrumbItems} />
            {/* Title */}
            <h2 className="text-zinc-700 font-semibold text-sm sm:text-base">
              {category ? (
                <>
                  <span className="font-light">Courses in</span> {category}
                </>
              ) : (
                "All Courses"
              )}
            </h2>
          </div>

          {/* total course */}
          <p className="text-xs sm:text-sm text-zinc-600">
            Showing{" "}
            <span className="font-bold px-1">
              {startIndex + 1}–
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </span>{" "}
            of <span className="px-1 sm:px-2 font-bold">{totalItems}</span> results
          </p>
        </div>
        <div className="h-[1px] w-full bg-gray-500/20 -mt-1 my-4"></div>

        {/* Course List */}
        {filteredCourses.length === 0 ? (
          <p className="text-center text-red-500 py-10 text-lg sm:text-2xl">
            Not Found!
          </p>
        ) : (
          <CourseList courses={currentCourses} />
        )}

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default InstructorCourse;