import { useParams } from "react-router";
import HandleTopics from "../../components/instructor/HandleTopics";
import InstructorHeader from "../../components/instructor/InstructorHeader";
import InstructorInfo from "../../components/instructor/InstructorInfo";
import MessageForm from "../../components/instructor/MessageForm";
import { useGetCoursesQuery } from "../../features/course/courseApi";
import Loader from "../../ult/loader/Loader";

const InstructorProfilePage: React.FC = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");

  // Fetch all courses
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-20">Failed to load data.</p>
    );

  // Find the course with matching teacher name
  const course = courses?.find(
    (c) => c.teacher?.name?.toLowerCase() === decodedName.toLowerCase()
  );

  if (!course) {
    return (
      <p className="text-center text-gray-500 py-20">Instructor not found!</p>
    );
  }

  const teacher = course.teacher;

  return (
    <section className="py-12 lg:py-20 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          {/* Profile Card */}
          <InstructorInfo teacher={teacher} />

          {/* Send Message Form */}
          <MessageForm />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <InstructorHeader teacher={teacher} />

          {/* Biography */}
          <div className="mb-8">
            <h2 className="text-xl text-zinc-700 mb-4">Biography</h2>
            <p className="text-zinc-500 mb-4">{teacher.biography}</p>
          </div>

          {/* Topics Handling */}
          <HandleTopics topicsHandling={teacher.topicsHandling} />
        </div>
      </div>
    </section>
  );
};

export default InstructorProfilePage;
