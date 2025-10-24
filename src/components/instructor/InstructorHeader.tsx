import { FaUserTie, FaClock, FaStar, FaBuilding } from "react-icons/fa";
import type { Teacher } from "../../ult/types/types";
import type { FC } from "react";

interface InstructorProfileProps {
  teacher: Teacher;
}
const InstructorHeader:FC<InstructorProfileProps> = ({teacher}) => {
  return (
    <div className="mb-8 border border-gray-200 p-6">
      <h1 className="text-xl text-zinc-700 mb-4">{teacher.name}</h1>
      <ul className="space-y-3 text-zinc-500">
        <li className="flex items-center gap-3">
          <FaUserTie className="text-yellow-500 text-lg" />
          <span className="font-semibold">Role : </span><span>{teacher.role}</span>
        </li>
        <li className="flex items-center gap-3">
          <FaClock className="text-yellow-500 text-lg" />
          <span className="font-semibold">Experience : </span><span>{teacher.experience}</span>
        </li>
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-500 text-lg" />
          <span className="font-semibold">Specialist In : </span><span>{teacher.specialistIn}</span>
        </li>
        <li className="flex items-center gap-3">
          <FaBuilding className="text-yellow-500 text-lg" />
          <span className="font-semibold">Current work : </span><span>{teacher.currentWork}</span>
        </li>
      </ul>
    </div>
  );
};

export default InstructorHeader;
