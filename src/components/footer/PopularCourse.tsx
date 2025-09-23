import { Link } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";

const PopularCourse = () => {
  const { data: courses = [], isLoading } = useGetCoursesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  //filter popular courses
  const popularCourses = courses
    .filter((course) => course.ratings >= 4.9 && course.studentsEnrolled > 500)
    .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
    .slice(0, 5);

  // Loading & Error for Data
  if (isLoading) return <Loader />;
  return (
    <ul className="space-y-4 pt-3">
      {popularCourses.map((course) => (
        <Link
          to={`/course/${course._id}`}
          className="flex items-center gap-2"
          key={course._id}
        >
          <img src={course.image} className="w-24" />
          <div>
            <p className="text-xs font-medium hover:text-yellow-500">
              {course.name}
            </p>
            <span className="text-sm text-teal-600 font-semibold">{course.price}</span>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default PopularCourse;
