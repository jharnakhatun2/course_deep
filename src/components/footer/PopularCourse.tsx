import { Link } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";

const PopularCourse = () => {
  const { data: courses = [] } = useGetCoursesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  //filter popular courses
  const popularCourses =
    courses
      ?.filter(
        (course) => course.ratings >= 4.9 && course.studentsEnrolled > 500
      )
      .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
      .slice(0, 5) || [];

  return (
    <ul className="space-y-4 pt-3">
      {popularCourses.map((course) => (
        <Link
          to={`/course/${course._id}`}
          className="flex items-center gap-2 group"
          key={course._id}
        >
          <div className="relative overflow-hidden group">
            <img src={course.image} className="w-24" />
            <div className="absolute inset-0 bg-yellow-500/50 transform -translate-x-full group-hover:translate-x-0 transition-smooth" />
          </div>
          <div>
            <p className="text-xs font-medium hover:text-yellow-500">
              {course.name}
            </p>
            <span className="text-sm text-yellow-500">{course.price}</span>
          </div>
        </Link>
      ))}
    </ul>
  );
};

export default PopularCourse;
