import { useState } from "react";
import { useParams } from "react-router";
import { useGetInstructorCourseByIdQuery } from "../../features/instructor-course/instructorCourseApi";
import Loader from "../../ult/loader/Loader";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";
import CourseInfo from "../../components/courses/courses/CourseInfo";
import { MdPlayArrow } from "react-icons/md";
import CourseTab from "../../components/courses/courses/CourseTab";
import SingleCourseSidebar from "../../components/courses/courses/SingleCourseSidebar";
import Modal from "../../components/courses/courses/Modal";
import InstructorInfoCard from "./InstructorInfoCard";


//for breadcrumb
const breadcrumbItems = [
  { label: "Instructor's All Courses", href: "/admin/instructor-course" },
  { label: "Instructor's Course" },
];

const InstructorSingleCourse= () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: instructorCourse, isLoading, isError } = useGetInstructorCourseByIdQuery(id!, { skip: !id });

  // Open modal
  const handlePlayClick = () => setIsModalOpen(true);

  // Close modal
  const handleModalClose = () => setIsModalOpen(false);

  if (isLoading) return <Loader />;
  if (isError || !instructorCourse)
    return (
      <p className="text-center py-10 text-red-500">Failed to load course!</p>
    );

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
              {instructorCourse.name}
            </h1>
            {/* course info */}
            <CourseInfo course={instructorCourse} />

            {/* Course image with play button */}
            <div className="relative my-5 w-full">
              <img
                src={instructorCourse.image}
                alt={instructorCourse.name}
                className="w-full h-[300px] lg:h-[500px] border border-white"
              />
              {/* Play button overlay */}
              <button
                type="button"
                onClick={handlePlayClick}
                className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center  text-7xl "
              >
                <MdPlayArrow className="text-white hover:text-yellow-400 backdrop-blur-lg bg-yellow-500/70 hover:bg-white/50 shadow-[0_0_15px_#ffffff] rounded-full transition-smooth" />
              </button>
              <InstructorInfoCard instructorCourse={instructorCourse}/>
            </div>

            {/* Course Tab */}
            <CourseTab course={instructorCourse} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <SingleCourseSidebar course={instructorCourse} />
        </aside>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          promoVideo={instructorCourse.promoVideo}
          onClose={handleModalClose}
        />
      )}
    </section>
  );
};

export default InstructorSingleCourse;
