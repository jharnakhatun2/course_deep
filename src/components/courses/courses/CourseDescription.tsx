import type { FC } from "react";
import type { Course } from "../../../ult/types/types";

interface CourseInfoProp {
  course: Course;
}

const CourseDescription: FC<CourseInfoProp> = ({ course }) => {
  return (
    <div className="space-y-6 text-zinc-500 leading-relaxed text-justify">
      {/* Course Description */}
      <div>
        <h3 className="font-semibold text-xl mb-2 text-zinc-700">Course Description</h3>
        {course.description && (
          <p className="mb-3">{course.description}</p>
        )}
        {course.learnSummery && (
          <p className="mb-3">{course.learnSummery}</p>
        )}
      </div>

      {/* What You Will Learn */}
      <div>
        <h3 className="font-semibold text-xl mb-2 text-zinc-700">What You Will Learn</h3>
        {course.learnSummery && (
          <p className="mb-3">{course.learnSummery}</p>
        )}
        <ul className="list-disc pl-5 space-y-2 marker:text-yellow-400">
          {course.whatYouWillLearn?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {course.closingNote && (
          <p className="mt-4">{course.closingNote}</p>
        )}
      </div>
    </div>
  );
};

export default CourseDescription;
