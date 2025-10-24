import React from "react";
import type { Teacher } from "../../../ult/types/types";
import { Link } from "react-router";


interface InstructorProfileProps {
  teacher: Teacher;
}

const InstructorProfile: React.FC<InstructorProfileProps> = ({teacher}) => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl text-zinc-700 font-semibold mb-2 mt-12">
        About Instructor
      </h2>

      <div className="border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img src={teacher.image} alt={teacher.name} className="w-20 h-20 object-cover rounded-full border border-white shadow-[0_0_5px_#ffffff]" />
          </div>

          {/* Profile Information */}
          <div className="flex-1">
            <h3 className="text-[17px] font-semibold text-zinc-600">{teacher.name}</h3>
            <p className="text-zinc-500 mb-4">{teacher.profession}</p>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">{teacher.biography}</p>

            {/* View Profile Button */}
            <Link to={`/instructor/${encodeURIComponent(teacher.name)}`} className="py-2 px-5 text-center bg-zinc-100 hover:bg-yellow-500 text-zinc-800 hover:text-white border border-gray-300 hover:border-yellow-500 transition-smooth cursor-pointer text-sm">
              VIEW PROFILE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
