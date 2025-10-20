import { useSearchParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import type { Course } from "../../ult/types/types";
import CourseSidebar from "../../components/courses/courses/CourseSidebar";
import CourseList from "../../components/courses/courses/CourseList";
import Pagination from "../../ult/pegination/Pagination";
import Loader from "../../ult/loader/Loader";
import { usePagination } from "../../ult/pegination/usePagination";
import { useState } from "react";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";

const breadcrumbItems = [{ label: "Courses" }];

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

  //search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by category + search
  const filteredCourses: Course[] =
    courses
      ?.filter((course: Course) =>
        category ? course.category === category : true
      )
      .filter((course: Course) => {
        const query = searchQuery.toLowerCase();
        return (
          course.name.toLowerCase().includes(query) ||
          course.shortDes.toLowerCase().includes(query)   
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
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-5 gap-8">
        {/* Left content */}
        <div className="lg:col-span-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-5">
              <Breadcrumb items={breadcrumbItems} />
              {/* Title */}
              <h2 className="text-zinc-700 font-bold">
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
            <p className="hidden sm:flex text-zinc-600">
              Showing{" "}
              <span className="font-bold px-1">
                {startIndex + 1}–
                {Math.min(startIndex + itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="px-2 font-bold">{totalItems}</span> results
            </p>
          </div>
          <div className="h-[1px] w-full bg-gray-500/20 -mt-1 my-4"></div>

          {/* Course List */}
          {filteredCourses.length === 0 ? (
            <p className="text-center text-red-500 py-10 text-2xl">
              Not Found!
            </p>
          ) : (
            <CourseList courses={currentCourses} />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Sidebar */}
        <CourseSidebar
          setSearchQuery={setSearchQuery}
          courses={courses ?? []}
        />
      </div>
    </section>
  );
};

export default Courses;
