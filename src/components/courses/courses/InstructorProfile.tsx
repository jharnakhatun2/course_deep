import React from "react";
import type { Course } from "../../../ult/types/types";


interface InstructorProfileProps {
  name?: string;
  title?: string;
  bio?: string;
  imageUrl?: string;
  course: Course;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({
  course,
  name = "Merry Jhonson",
  title = "Back-End Developer",
  bio = "Encyclopaedia galactica Orion's sword explorations vanquish the impossible, astonishment radio telescope with pretty stories for which there's little good.",
  imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl text-zinc-700 font-semibold mb-2 mt-12">
        About Instructor
      </h2>

      <div className="border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img src={imageUrl} alt={course.teacher} className="w-20 h-20 object-cover" />
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <h3 className="text-[17px] font-semibold text-zinc-600">{course.teacher}</h3>
            <p className="text-zinc-500 mb-4">{course.teacherProfession}</p>
            <p className="text-zinc-500 leading-relaxed mb-6">{bio}</p>

            {/* View Profile Button */}
            <button className="w-full sm:w-2/7 px-4 py-2 text-center bg-zinc-100 hover:bg-yellow-500 text-zinc-800 hover:text-white border border-gray-300 hover:border-yellow-500 transition-smooth cursor-pointer text-sm">
              VIEW PROFILE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
