import { type FC } from "react";
import InstructorCard from "./InstructorCard";
import type { InstructorCourse } from "../../ult/types/types";



interface CourseListProps {
    courses: InstructorCourse[];
}

const CourseCard: FC<CourseListProps> = ({ courses }) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map((course) => (
                <InstructorCard
                    key={course._id}
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
            ))}
        </div>
    );
};

export default CourseCard;
