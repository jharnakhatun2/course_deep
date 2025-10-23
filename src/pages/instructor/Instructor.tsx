import HandleTopics from "../../components/instructor/HandleTopics";
import InstructorHeader from "../../components/instructor/InstructorHeader";
import InstructorInfo from "../../components/instructor/InstructorInfo";
import MessageForm from "../../components/instructor/MessageForm";

const InstructorProfilePage: React.FC = () => {
  return (
    <section className="py-12 lg:py-20 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Left Sidebar */}
        <div className="lg:col-span-1">
          {/* Profile Card */}
          <InstructorInfo />

          {/* Send Message Form */}
          <MessageForm />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <InstructorHeader />

          {/* Biography */}
          <div className="mb-8">
            <h2 className="text-xl text-zinc-700 mb-4">Biography</h2>
            <p className="text-zinc-500 mb-4">
              Fusce eleifend donec sapien sed phase lusa. Pellentesque lacus
              vamus lorem arcu semper duiacCras ornare arcu avamus nda leo.
              Etiam ind arcu morbi us iusto mauris tempus pharetra interdum at
              congue semper purus. acus vamu lorem arcu semper duiacCras ornare
              arcu
            </p>
          </div>

          {/* Topics Handling */}
          <HandleTopics />
        </div>
      </div>
    </section>
  );
};

export default InstructorProfilePage;
