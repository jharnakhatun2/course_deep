import React from 'react';
import { FiHome, FiUsers, FiSettings } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="text-2xl font-bold p-4">Admin Dashboard</div>
      <nav className="flex-1">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <FiHome /> Dashboard
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <FiUsers /> Users
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2">
            <FiSettings /> Settings
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">© 2025 MyApp</div>
    </div>
  );
};

export default Sidebar;
