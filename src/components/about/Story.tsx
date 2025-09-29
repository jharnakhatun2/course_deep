import AboutImage from "../../assets/img/about.webp";
const Story = () => {
  return (
    <section className="mb-20">
      <div className="flex flex-col-reverse lg:flex-row items-center md:gap-12 gap-5">
        <div className="lg:w-1/2">
          <span className="text-xs uppercase text-teal-500 tracking-wider">
            Explore, Learn & Grow
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold mb-7 text-zinc-600 uppercase">
            Our Story
          </h3>
          <p className="text-gray-700 mb-4">
            Course Deep LMS was born from a simple yet powerful idea: learning
            should be accessible, engaging, and tailored to every learner’s
            needs. Founded in 2022 by a group of passionate educators and
            developers, we set out to redefine how online education is
            delivered.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, Course Deep has grown into a comprehensive learning
            platform, empowering thousands of students and professionals to
            acquire new skills, track their progress, and achieve their goals
            with interactive courses, quizzes, and real-time feedback.
          </p>
          <p className="text-gray-700">
            Our mission is to bridge the gap between knowledge and opportunity
            by creating a platform that combines cutting-edge technology with
            educational best practices—making learning effective, enjoyable, and
            impactful for everyone.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img
            src={AboutImage}
            alt="Online Learning Illustration"
            className="shadow-2xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
