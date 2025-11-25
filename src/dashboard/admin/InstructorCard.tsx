import { Link } from "react-router";
import type { FC } from "react";
import type { Teacher } from "../../ult/types/types";
import TeacherCard from "../../ult/cards/courseCard/TeacherCard";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { showErrorToast, showSuccessToast } from "../../ult/toast/toast";
import { useAddCourseMutation } from "../../features/course/courseApi";
import { useDeleteInstructorCourseMutation } from "../../features/instructor-course/instructorCourseApi";

type CourseCardProps = {
    _id: string;
    title: string;
    shortDes: string;
    ratings: number;
    time: string;
    teacher: Teacher;
    imageUrl: string;
    lessons: string;
    students: number;
    price: number;
};

const InstructorCard: FC<CourseCardProps> = ({
    _id,
    title,
    shortDes,
    imageUrl,
    lessons,
    students,
    time,
    price,
    ratings,
    teacher,
}) => {
    
    // Mutations with loading states
    const [addCourse, { isLoading: isAddingCourse }] = useAddCourseMutation();
    const [deleteInstructorCourse, { isLoading: isDeletingInstructorCourse }] = useDeleteInstructorCourseMutation();

    // Calculate combined loading states
    const isApproving = isAddingCourse || isDeletingInstructorCourse;
    const isDeleting = isDeletingInstructorCourse;


    // Approve and move course
    const handleApproveCourse = async () => {
        try {
            // Prepare course data for the main courses collection
            const courseData = {
                name: title,
                price: price,
                ratings: ratings,
                time: time,
                teacher: teacher,
                shortDes: shortDes,
                description: [shortDes],
                image: imageUrl,
                category: "General",
                level: "Intermediate",
                language: "English",
                studentsEnrolled: students,
                certificate: true,
                lastUpdated: new Date().toISOString().split('T')[0],
                courseURL: `/courses/${_id}`,
                prerequisites: [],
                promoVideo: "",
                teacherProfession: teacher.profession,
                lessons: lessons,
                whatYouWillLearn: [],
                curriculum: [],
                totalDays: "30",
                totalDurationLength: time,
                totalLectures: lessons,
                totalSection: "1"
            };

            // Step 1: Add to main courses collection
            await addCourse(courseData).unwrap();

            // Step 2: Delete from instructor courses collection
            await deleteInstructorCourse(_id).unwrap();

            showSuccessToast("Course approved and published successfully!");

        } catch (error) {
            console.error("Error approving course:", error);
            showErrorToast("Failed to approve course. Please try again.");
        }
    };

    // Remove from instructor courses
    const handleDeleteCourse = async () => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            try {
                await deleteInstructorCourse(_id).unwrap();
                showSuccessToast("Course deleted successfully!");
            } catch (error) {
                console.error("Error deleting course:", error);
                showErrorToast("Failed to delete course. Please try again.");
            }
        }
    };

    return (
        <div className="backdrop-blur-lg bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition w-full max-w-sm mx-auto group">

            <div className="relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-0 left-0 w-full h-0 bg-gray-100/70 flex items-center justify-center overflow-hidden group-hover:h-full transition-all duration-500">
                    <Link
                        to={`/admin/instructor-course/${_id}`}
                        className="text-sm uppercase bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded"
                    >
                        View More
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between">
                    <h3 className="font-semibold mb-2">
                        {price > 0 ? (
                            <span className="bg-yellow-500 text-white px-3 py-[2px]">${price}</span>
                        ) : (
                            <span className="bg-teal-500 text-white px-3 py-[2px]">Free</span>
                        )}
                    </h3>
                    <div className="flex items-center gap-2 bg-white shadow-lg px-3">
                        <button
                            disabled={isApproving}
                            onClick={handleApproveCourse}
                            className={`cursor-pointer ${isApproving ? 'text-gray-400' : 'text-green-500 hover:text-green-300'} transition-smooth`}
                            title="Approve and publish course"
                        >
                            {isApproving ? (
                                <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <IoMdCheckmarkCircle size={23} />
                            )}
                        </button>

                        <button
                            disabled={isDeleting}
                            onClick={handleDeleteCourse}
                            className={`cursor-pointer ${isDeleting ? 'text-gray-400' : 'text-red-500 hover:text-red-300'} transition-smooth`}
                            title="Delete course"
                        >
                            {isDeleting ? (
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <RiDeleteBin2Line size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <Link to={`/admin/instructor-course/${_id}`}>
                    <h3 className="hover:text-yellow-500 transition font-bold mb-2 text-zinc-700 uppercase">
                        {title.slice(0, 23)}...
                    </h3>
                </Link>

                <p className="text-zinc-400 mb-2">{shortDes.slice(0, 50)}...</p>

                <div className="h-[1px] w-full bg-zinc-400/30 my-4" />

                <TeacherCard time={time} ratings={ratings} lessons={lessons} students={students} />

                <div className="h-[1px] w-full bg-zinc-400/30 my-4" />

                <div className="flex items-center gap-2">
                    <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full border border-dashed border-yellow-600"
                    />

                    <div>
                        <h4 className="text-sm font-semibold text-zinc-400">{teacher.name}</h4>
                        <p className="text-xs text-teal-600">{teacher.profession}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
