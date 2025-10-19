// src/pages/course/CourseSinglePage.tsx
import { useState } from "react";
import { useParams } from "react-router";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";
import type { Course, Video } from "../../ult/types/types";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";
import SingleCourseSidebar from "../../components/courses/courses/SingleCourseSidebar";

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
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
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
            <div className="flex justify-between">
              <div className="flex">
                {/* instructor */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                    {/* Teacher avatar */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <title>user</title>
                      <g fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z"
                          fill="url(#1752500502811-9294189_user_existing_0_t4csz04ye)"
                          data-glass="origin"
                          mask="url(#1752500502811-9294189_user_mask_s86i2afs5)"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 11C2 5.47723 6.47723 1 12 1C17.5228 1 22 5.47723 22 11C22 16.5228 17.5228 21 12 21C6.47723 21 2 16.5228 2 11Z"
                          fill="url(#1752500502811-9294189_user_existing_0_t4csz04ye)"
                          data-glass="clone"
                          filter="url(#1752500502811-9294189_user_filter_nsyh9isk4)"
                          clipPath="url(#1752500502811-9294189_user_clipPath_1jvvjoq1t)"
                        ></path>
                        <path
                          d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z"
                          fill="url(#1752500502811-9294189_user_existing_1_bnqb6d6gm)"
                          data-glass="blur"
                        ></path>
                        <path
                          d="M17.5586 22.25V23H6.44141V22.25H17.5586ZM18.75 21.0586C18.7499 17.5745 15.9255 14.7501 12.4414 14.75H11.5586C8.07451 14.7501 5.25012 17.5745 5.25 21.0586C5.25 21.7165 5.78354 22.25 6.44141 22.25V23L6.24316 22.9902C5.26408 22.891 4.5 22.0638 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414L12.8047 14.0088C16.5342 14.198 19.4999 17.2821 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23V22.25C18.2165 22.25 18.75 21.7165 18.75 21.0586Z"
                          fill="url(#1752500502811-9294189_user_existing_2_duz35xtpd)"
                        ></path>
                        <path
                          d="M14.75 8.5C14.75 6.98122 13.5188 5.75 12 5.75C10.4812 5.75 9.25 6.98122 9.25 8.5C9.25 10.0188 10.4812 11.25 12 11.25V12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12V11.25C13.5188 11.25 14.75 10.0188 14.75 8.5Z"
                          fill="url(#1752500502811-9294189_user_existing_3_x5xjz4yjs)"
                        ></path>
                        <defs>
                          <linearGradient
                            id="1752500502811-9294189_user_existing_0_t4csz04ye"
                            x1="12"
                            y1="1"
                            x2="12"
                            y2="21"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#575757"></stop>
                            <stop offset="1" stopColor="#151515"></stop>
                          </linearGradient>
                          <linearGradient
                            id="1752500502811-9294189_user_existing_1_bnqb6d6gm"
                            x1="12"
                            y1="5"
                            x2="12"
                            y2="23"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
                            <stop
                              offset="1"
                              stopColor="#BBBBC0"
                              stopOpacity=".6"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="1752500502811-9294189_user_existing_2_duz35xtpd"
                            x1="12"
                            y1="14"
                            x2="12"
                            y2="19.212"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#fff"></stop>
                            <stop
                              offset="1"
                              stopColor="#fff"
                              stopOpacity="0"
                            ></stop>
                          </linearGradient>
                          <linearGradient
                            id="1752500502811-9294189_user_existing_3_x5xjz4yjs"
                            x1="12"
                            y1="5"
                            x2="12"
                            y2="9.054"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#fff"></stop>
                            <stop
                              offset="1"
                              stopColor="#fff"
                              stopOpacity="0"
                            ></stop>
                          </linearGradient>
                          <filter
                            id="1752500502811-9294189_user_filter_nsyh9isk4"
                            x="-100%"
                            y="-100%"
                            width="400%"
                            height="400%"
                            filterUnits="objectBoundingBox"
                            primitiveUnits="userSpaceOnUse"
                          >
                            <feGaussianBlur
                              stdDeviation="2"
                              x="0%"
                              y="0%"
                              width="100%"
                              height="100%"
                              in="SourceGraphic"
                              edgeMode="none"
                              result="blur"
                            ></feGaussianBlur>
                          </filter>
                          <clipPath id="1752500502811-9294189_user_clipPath_1jvvjoq1t">
                            <path
                              d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z"
                              fill="url(#1752500502811-9294189_user_existing_1_bnqb6d6gm)"
                            ></path>
                          </clipPath>
                          <mask id="1752500502811-9294189_user_mask_s86i2afs5">
                            <rect width="100%" height="100%" fill="#FFF"></rect>
                            <path
                              d="M12.4414 14C16.3397 14.0001 19.4999 17.1603 19.5 21.0586C19.5 22.1307 18.6307 23 17.5586 23H6.44141C5.36932 23 4.5 22.1307 4.5 21.0586C4.50012 17.1603 7.6603 14.0001 11.5586 14H12.4414ZM12 5C13.933 5 15.5 6.567 15.5 8.5C15.5 10.433 13.933 12 12 12C10.067 12 8.5 10.433 8.5 8.5C8.5 6.567 10.067 5 12 5Z"
                              fill="#000"
                            ></path>
                          </mask>
                        </defs>
                      </g>
                    </svg>
                  </div>

                  {/* Teacher Details */}
                  <div>
                    <h4 className="text-sm text-zinc-400 hover:text-yellow-500">
                      Instructor
                    </h4>
                    <p className="text-sm text-zinc-600 font-bold"> {course.teacher}</p>
                  </div>
                </div>
                {/* category */}
                <div></div>
              </div>
              {/* review */}
              <div></div>
            </div>
            {/* description */}
            <p className="mb-6">{course.description}</p>
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
