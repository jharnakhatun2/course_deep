import type { FC } from "react";
import type { Course } from "../../../ult/types/types";
import CourseContent from "./CourseContent";

interface CourseTabProp {
  course: Course;
}

const CourseTab: FC<CourseTabProp> = ({ course }) => {
  return (
    <div>
      {/* name of each tab group should be unique */}
      <div className="tabs tabs-lift">
        {/* Course Description */}
        <label className="tab text-zinc-700 text-lg font-semibold">
          <input type="radio" name="my_tabs_4" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Course Description
        </label>
        <div className="tab-content bg-base-100 border-base-300 px-6 py-10">
          {course.description && <p className="mb-3 text-justify ">{course.description}</p>}
        </div>

        {/* What You Will Learn */}
        <label className="tab text-zinc-700 text-lg font-semibold">
          <input type="radio" name="my_tabs_4" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          What You Will Learn
        </label>
        <div className="tab-content bg-base-100 border-base-300 px-6 py-10">
          <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
            {course.whatYouWillLearn?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <label className="tab text-zinc-700 text-lg font-semibold">
          <input type="radio" name="my_tabs_4" defaultChecked />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4 me-2 text-yellow-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
          Course content
        </label>
        <div className="tab-content bg-base-100 border-base-300 px-6 py-10">
          <CourseContent course={course}/>
        </div>
      </div>
    </div>
  );
};

export default CourseTab;
