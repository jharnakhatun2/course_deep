import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import img1 from '../../assets/img/team/1.webp';
import img2 from '../../assets/img/team/2.webp';
import img3 from '../../assets/img/team/3.webp';
import SectionTitle from "../../ult/title/SectionTitle";

type InstructorType = {
  id: number;
  name: string;
  role: string;
  image: string;
  twitterProfile: string;
  facebookProfile: string;
  linkedinProfile: string;
};

const instructors: InstructorType[] = [
  {
    id: 1,
    name: "Parveen Anand",
    role: "Lead Designer",
    image: img1,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
  {
    id: 2,
    name: "Diana Petersen",
    role: "Lead Marketer",
    image: img2,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
  {
    id: 3,
    name: "Larry Parker",
    role: "Lead Developer",
    image: img3,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
];

const Instructor: React.FC = () => {
  return (
    <section className="bg-gray-100 py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle title="Best Instructors" className="text-zinc-700"/>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8 sm:py-10">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
            >
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-yellow-500 mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-800">{instructor.name}</h4>
              <p className="text-gray-500 mb-4">{instructor.role}</p>

              {/* Social Icons */}
              <div className="flex space-x-4">
                <a
                  href={instructor.twitterProfile}
                  aria-label={`${instructor.name} Twitter Profile`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href={instructor.facebookProfile}
                  aria-label={`${instructor.name} Facebook Profile`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={instructor.linkedinProfile}
                  aria-label={`${instructor.name} LinkedIn Profile`}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructor;
