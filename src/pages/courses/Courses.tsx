import { useSearchParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import type { Course } from "../../ult/types/types";


const Courses = () => {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  if (isLoading) return <p className="text-center py-10">Loading courses...</p>;
  if (isError || !courses) return <p className="text-center py-10 text-red-500">Failed to load courses.</p>;

  const filteredCourses = category
    ? courses.filter((course: Course) => course.category === category)
    : courses;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-zinc-700 mb-6">
          {category ? `Courses in ${category}` : "All Courses"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="p-5 rounded-xl shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-zinc-700">{course.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{course.shortDes}</p>
              <span className="text-xs text-teal-500 mt-3 inline-block uppercase">
                {course.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
