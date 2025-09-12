import SectionTitle from "../../ult/title/SectionTitle";
import Card from "./Card";
import bgImage from "../../assets/img/coursebg.webp";

const courses = [
  {
    title: "React for Beginners",
    description: "Learn the fundamentals of React and build dynamic web apps.",
    imageUrl: "https://source.unsplash.com/400x300/?react,javascript",
    lessons: 20,
    students: 1200,
  },
  {
    title: "Tailwind CSS Mastery",
    description: "Master utility-first styling and build modern UI faster.",
    imageUrl: "https://source.unsplash.com/400x300/?tailwind,css",
    lessons: 15,
    students: 850,
  },
  {
    title: "Node.js & Express",
    description: "Build scalable backend APIs with Node.js and Express.",
    imageUrl: "https://source.unsplash.com/400x300/?node,backend",
    lessons: 18,
    students: 950,
  },
  {
    title: "Full Stack MERN",
    description: "Learn MongoDB, Express, React, and Node for full-stack apps.",
    imageUrl: "https://source.unsplash.com/400x300/?mern,stack",
    lessons: 25,
    students: 1500,
  },
];

const CourseCards = () => {
  return (
    <section
      className="py-8 lg:py-12 bg-fixed bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="lg:max-w-7xl mx-auto px-4 relative z-10">
        <SectionTitle title="Popular Courses" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              lessons={course.lessons}
              students={course.students}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
