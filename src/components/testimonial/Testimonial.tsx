import React from "react";
import SectionTitle from "../../ult/title/SectionTitle";

const Testimonial: React.FC = () => {
  return (
    <section className="text-gray-300 bg-gray-900 py-8 lg:py-12" id="reviews">
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-4">
        <SectionTitle title="Success Stories" className="text-white" />
        <div className="md:columns-2 lg:columns-3 gap-4 space-y-4 py-8 sm:py-10">
          {/* Card 1 */}
          <div className="backdrop-blur-lg aspect-auto p-8 border rounded-3xl bg-gray-800 border-gray-700 shadow-2xl">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Samiha Rahman
                </h6>
                <p className="text-sm text-gray-300">Frontend Developer</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “The React.js course was a game-changer. The instructor explained
              complex concepts clearly and provided hands-on projects that
              boosted my confidence. Within two weeks of finishing, I landed my
              first freelance project. Highly recommended for anyone looking to
              master React and build real-world projects!”
            </p>
          </div>

          {/* Card 2 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Arif Hasan</h6>
                <p className="text-sm text-gray-300">JavaScript Learner</p>
                <p className="text-yellow-400">★★★★☆</p>
              </div>
            </div>
            <p className="mt-8">
              “I’ve tried other platforms before, but this LMS feels different.
              The projects are practical, and the feedback system really helped
              me improve my JavaScript skills.”
            </p>
          </div>

          {/* Card 3 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Farzana Ahmed
                </h6>
                <p className="text-sm text-gray-300">Junior Developer</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “Short, clear, and practical! The Git & GitHub crash course saved
              me hours of confusion. Now I finally collaborate with my teammates
              without messing up branches.”
            </p>
          </div>

          {/* Card 4 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/29.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Tanvir Alam</h6>
                <p className="text-sm text-gray-300">Full Stack Developer</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “The MERN stack bootcamp gave me confidence to apply for
              full-stack developer roles. The combination of tutorials, quizzes,
              and coding kept me motivated. The MongoDB section was super
              clear!”
            </p>
          </div>

          {/* Card 5 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Nusrat Jahan</h6>
                <p className="text-sm text-gray-300">UI Designer</p>
                <p className="text-yellow-400">★★★★☆</p>
              </div>
            </div>
            <p className="mt-8">
              “I joined the LMS to learn Tailwind CSS, and it was one of the
              best decisions I made this year. The UI projects were beautiful
              and became part of my portfolio.”
            </p>
          </div>

          {/* Card 6 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/22.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Shahriar Kabir
                </h6>
                <p className="text-sm text-gray-300">Backend Enthusiast</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “Honestly, I wasn’t sure at first, but the way this LMS combines
              video lessons with coding challenges is brilliant. I struggled
              with async JavaScript before, but now I write clean async/await
              code confidently.”
            </p>
          </div>

          {/* Card 7 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Ethan Carter</h6>
                <p className="text-sm text-gray-300">Data Analyst</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “The Data Science bootcamp transformed my career. The hands-on
              projects and expert instructors provided real-world skills that
              led me to a promotion within three months of completing the
              course.”
            </p>
          </div>

          {/* Card 8 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/50.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Olivia Martinez
                </h6>
                <p className="text-sm text-gray-300">UX/UI Designer</p>
                <p className="text-yellow-400">★★★★☆</p>
              </div>
            </div>
            <p className="mt-8">
              “The design principles and tools I learned in this course were
              immediately applicable in my job. I've since led several
              successful redesign projects that improved user engagement.”
            </p>
          </div>

          {/* Card 9 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/55.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Lucas Johnson
                </h6>
                <p className="text-sm text-gray-300">Full Stack Developer</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “This comprehensive course covered everything from front-end to
              back-end development. I now feel confident building complete
              applications and have secured a full-stack developer position.”
            </p>
          </div>

          {/* Card 10 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/55.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">Sophia Lee</h6>
                <p className="text-sm text-gray-300">Marketing Strategist</p>
                <p className="text-yellow-400">★★★★☆</p>
              </div>
            </div>
            <p className="mt-8">
              “The digital marketing strategies I learned helped me increase my
              company's online presence and sales. The course was
              well-structured and provided actionable insights.”
            </p>
          </div>

          {/* Card 11 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/60.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">James Smith</h6>
                <p className="text-sm text-gray-300">Cybersecurity Analyst</p>
                <p className="text-yellow-400">★★★★★</p>
              </div>
            </div>
            <p className="mt-8">
              “The cybersecurity course provided in-depth knowledge and
              practical skills that were directly applicable to my job. I now
              feel equipped to handle complex security challenges.”
            </p>
          </div>

          {/* Card 12 */}
          <div className="aspect-auto p-8 border border-gray-700 rounded-3xl bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
            <div className="flex gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/60.jpg"
                alt="user avatar"
                loading="lazy"
              />
              <div>
                <h6 className="text-lg font-medium text-white">
                  Isabella Davis
                </h6>
                <p className="text-sm text-gray-300">Project Manager</p>
                <p className="text-yellow-400">★★★★☆</p>
              </div>
            </div>
            <p className="mt-8">
              “The project management course enhanced my organizational skills
              and taught me effective team coordination techniques. I've since
              led multiple successful projects within my company.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
