import InstructorInfo from '../../components/instructor/InstructorInfo';
import MessageForm from '../../components/instructor/MessageForm';

interface Course {
  name: string;
  lesson: string;
  complexity: string;
  length: string;
}

const InstructorProfilePage: React.FC = () => {
  

  const courses: Course[] = [
    { name: 'Information Technology', lesson: 'Software testing', complexity: 'Easy', length: '90 mins' },
    { name: 'Fashion Technolgy', lesson: 'Designing', complexity: 'standard', length: '60 mins' },
    { name: 'photography', lesson: 'Animation', complexity: 'standard', length: '60 mins' },
    { name: 'Electronics', lesson: 'Hardware process', complexity: 'Hard', length: '90 mins' },
    { name: 'Computer Application', lesson: 'Micro Processor', complexity: 'Hard', length: '70 mins' },
    { name: 'IT&Software', lesson: 'Opearating System', complexity: 'Standard', length: '60 mins' },
    { name: 'Bussiness Law', lesson: 'Principles', complexity: 'Easy', length: '60 mins' }
  ];

  

  return (
    <section className="py-20 bg-gray-100">
      <div className='lg:max-w-7xl mx-auto px-4'>
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0">
          {/* Profile Card */}
          <InstructorInfo/>

          {/* Send Message Form */}
          <MessageForm />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white shadow-lg p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Lospher Cook</h1>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">●</span>
                <span>Role: Front End Developer</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">●</span>
                <span>Experience: 12 years</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">●</span>
                <span>Specialist In: Digital Media</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">●</span>
                <span>Current work: Good Studio</span>
              </li>
            </ul>
          </div>

          {/* Biography */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Biography</h2>
            <p className="text-gray-600 mb-4">
              Fusce eleifend donec sapien sed phase lusa. Pellentesque lacus vamus lorem arcu semper duiacCras ornare arcu avamus nda leo. 
              Etiam ind arcu morbi us iusto mauris tempus pharetra interdum at congue semper purus. acus vamu lorem arcu semper 
              duiacCras ornare arcu
            </p>
            <h3 className="text-xl font-bold mb-3">Biography</h3>
            <p className="text-gray-600">
              Fusce eleifend donec sapien sed phase lusa. Pellentesque lacus vamus lorem arcu semper duiacCras ornare arcu avamus nda leo. 
              Etiam ind arcu morbi us justo mauris tempus pharetra interdum at congue semper purus. acus vamu lorem arcu semper 
              duiacCras ornare arcu
            </p>
          </div>

          {/* Topics Handling */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Topics Handling</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-yellow-400">
                    <th className="px-6 py-4 text-left font-semibold">COURSE NAME</th>
                    <th className="px-6 py-4 text-left font-semibold">LESSON NAME</th>
                    <th className="px-6 py-4 text-left font-semibold">COMPLEXITY</th>
                    <th className="px-6 py-4 text-left font-semibold">LENGTH</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">{course.name}</td>
                      <td className="px-6 py-4 text-gray-700">{course.lesson}</td>
                      <td className="px-6 py-4 text-gray-700">{course.complexity}</td>
                      <td className="px-6 py-4 text-gray-700">{course.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>     
      </div>
    </section>
  );
};

export default InstructorProfilePage;