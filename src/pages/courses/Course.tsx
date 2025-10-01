// src/pages/course/CourseSinglePage.tsx
import { useState } from "react";
import { useParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";
import type { Course, Video } from "../../ult/types/types";

const CourseSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [enrolled, setEnrolled] = useState(false);

  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading) return <Loader />;
  if (isError || !courses) return <p className="text-center py-10 text-red-500">Failed to load course!</p>;

  const course = courses.find((c: Course) => c._id === id);
  if (!course) return <p className="text-center py-10 text-red-500">Course not found!</p>;

  const handleEnroll = () => setEnrolled(true);

  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
        <p className="mb-6">{course.description}</p>

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
                !video.free && !enrolled ? "bg-gray-100 opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <h4 className="font-semibold">{video.title}</h4>
              {(video.free || enrolled) ? (
                <video src={video.url} controls className="w-full mt-2" />
              ) : (
                <p className="mt-2 text-sm text-gray-600">Enroll to watch this video</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CourseSinglePage;
