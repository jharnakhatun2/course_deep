// src/pages/course/CourseSinglePage.tsx
import { useState } from "react";
import { useParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";
import type { Course, Video } from "../../ult/types/types";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";
import SingleCourseSidebar from "../../components/courses/courses/SingleCourseSidebar";
import CourseInfo from "../../components/courses/courses/CourseInfo";
import CourseDescription from "../../components/courses/courses/CourseDescription";

//for breadcrumb
const breadcrumbItems = [
  { label: "Courses", href: "/courses" },
  { label: "Course" },
];

const CourseSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [enrolled, setEnrolled] = useState(false);

  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading) return <Loader />;
  if (isError || !courses)
    return (
      <p className="text-center py-10 text-red-500">Failed to load course!</p>
    );

  const course = courses.find((c: Course) => c._id === id);
  if (!course)
    return <p className="text-center py-10 text-red-500">Course not found!</p>;

  const handleEnroll = () => setEnrolled(true);

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          {/* breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />
          <div className="h-[1px] w-full bg-gray-500/20 my-3" />
          {/* course content */}
          <div>
            {/* title */}
            <h1 className="text-3xl font-bold mb-4 text-zinc-600">
              {course.name}
            </h1>
            {/* course info */}
            <CourseInfo course={course} />
            {/* course image */}
            <div className="my-5 w-full">
              <img src={course.image} alt={course.name} className="w-full border border-white"/>
            </div>

            {/* description */}
            <CourseDescription course={course}/>
          </div>

          {!enrolled && (
            <button
              onClick={handleEnroll}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-6"
            >
              Enroll to Unlock All Videos
            </button>
          )}

          <div className="space-y-4">
            {course.videos?.map((video: Video) => (
              <div
                key={video.id}
                className={`p-4 border rounded ${
                  !video.free && !enrolled
                    ? "bg-gray-100 opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <h4 className="font-semibold">{video.title}</h4>
                {video.free || enrolled ? (
                  <video src={video.url} controls className="w-full mt-2" />
                ) : (
                  <p className="mt-2 text-sm text-gray-600">
                    Enroll to watch this video
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <SingleCourseSidebar />
        </aside>
      </div>
    </section>
  );
};

export default CourseSinglePage;
