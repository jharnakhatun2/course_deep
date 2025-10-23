import React from "react";
import type { Course } from "../../../ult/types/types";
import Card from "../../../ult/cards/courseCard/Card";

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id}>
          <Card
            _id={course._id}
            title={course.name}
            shortDes={course.shortDes}
            ratings={course.ratings}
            time={course.time}
            teacher={course.teacher}
            imageUrl={course.image}
            lessons={course.lessons}
            students={course.studentsEnrolled}
            price={course.price}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
