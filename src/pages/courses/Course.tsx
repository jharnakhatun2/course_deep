// src/pages/course/CourseSinglePage.tsx
import { useState } from "react";
import { useParams } from "react-router";
import { useGetCourseByIdQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";
import SingleCourseSidebar from "../../components/courses/courses/SingleCourseSidebar";
import CourseInfo from "../../components/courses/courses/CourseInfo";
import { MdPlayArrow } from "react-icons/md";
import Modal from "../../components/courses/courses/Modal";
import CourseTab from "../../components/courses/courses/CourseTab";
import InstructorProfile from "../../components/courses/courses/InstructorProfile";
import Reviews from "../../components/courses/review/Review";
import ReviewForm from "../../components/courses/review/ReviewForm";
import InfoCard from "../../components/courses/courses/InfoCard";

//for breadcrumb
const breadcrumbItems = [
  { label: "Courses", href: "/courses" },
  { label: "Course" },
];

const CourseSinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: course, isLoading, isError } = useGetCourseByIdQuery(id!, { skip: !id });

  // Open modal
  const handlePlayClick = () => setIsModalOpen(true);

  // Close modal
  const handleModalClose = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;
  if (isError || !course)
    return (
      <p className="text-center py-10 text-red-500">Failed to load course!</p>
    ); 

    console.log(course)
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
            <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-zinc-600">
              {course.name}
            </h1>
            {/* course info */}
            <CourseInfo course={course} />

            {/* Course image with play button */}
            <div className="relative my-5 w-full">
              <img
                src={course.image}
                alt={course.name}
                className="w-full border border-white"
              />
              {/* Play button overlay */}
              <button
                onClick={handlePlayClick}
                className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center  text-7xl "
              >
                <MdPlayArrow className="text-white hover:text-yellow-400 backdrop-blur-lg bg-yellow-500/70 hover:bg-white/50 shadow-[0_0_15px_#ffffff] rounded-full transition-smooth" />
              </button>
              <InfoCard />
            </div>

            {/* Course Tab */}
            <CourseTab course={course}/>

            {/* Instructor Profile */}
            <InstructorProfile teacher={course.teacher}/>

            {/* Display Review */}
            <Reviews />

            {/* Add Review */}
            <ReviewForm />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <SingleCourseSidebar course={course}/>
        </aside>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          promoVideo={course.promoVideo}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default CourseSinglePage;
