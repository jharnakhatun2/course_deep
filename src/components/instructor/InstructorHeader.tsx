import { FaUserTie, FaClock, FaStar, FaBuilding } from "react-icons/fa";

const DeveloperInfo = () => {
  return (
    <div className="mb-8 border border-gray-200 p-6">
      <h1 className="text-xl text-zinc-700 mb-4">Lospher Cook</h1>
      <ul className="space-y-3 text-zinc-500">
        <li className="flex items-center gap-3">
          <FaUserTie className="text-yellow-500 text-lg" />
          <span>Role : Front End Developer</span>
        </li>
        <li className="flex items-center gap-3">
          <FaClock className="text-yellow-500 text-lg" />
          <span>Experience : 12 years</span>
        </li>
        <li className="flex items-center gap-3">
          <FaStar className="text-yellow-500 text-lg" />
          <span>Specialist In : Digital Media</span>
        </li>
        <li className="flex items-center gap-3">
          <FaBuilding className="text-yellow-500 text-lg" />
          <span>Current work : Good Studio</span>
        </li>
      </ul>
    </div>
  );
};

export default DeveloperInfo;
