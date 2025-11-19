import { type FC } from "react";
import { NavLink } from "react-router";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

const Sidebar: FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 flex items-center gap-2 cursor-pointer transition-smooth ${
      isActive ? "text-yellow-500 font-bold" : "hover:bg-gray-700/10"
    }`;

  return (
    <div className="h-screen w-64 bg-white shadow-sm text-zinc-600 flex flex-col">
      <div className="text-2xl font-bold p-4 border-b border-gray-100">Admin Dashboard</div>
      <nav className="flex-1">
        <ul>
          <li>
            <NavLink to="/admin" end className={linkClasses}>
              <FiHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/users" className={linkClasses}>
              <FiUsers /> Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={linkClasses}>
              <FiSettings /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100">© 2025 CourseDeep</div>
    </div>
  );
};

export default Sidebar;
