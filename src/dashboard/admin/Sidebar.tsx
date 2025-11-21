import { type FC } from "react";
import { NavLink } from "react-router";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

const Sidebar: FC = () => {

   const currentYear = new Date().getFullYear();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 flex items-center gap-2 cursor-pointer transition-smooth ${
      isActive ? "text-yellow-500 font-bold" : "hover:bg-gray-700/10"
    }`;

  return (
    <div className="h-screen w-64 bg-white shadow-sm text-zinc-600 flex flex-col">
      <div className="text-lg uppercase p-4 shadow font-semibold shadow">Admin Dashboard</div>
      <nav className="flex-1 text-sm">
        <ul>
          <li>
            <NavLink to="/admin" end className={linkClasses}>
              <FiHome /> Dashboard
            </NavLink>
          </li>
          <li className="h-[1px] w-full bg-gray-500/20" />
          <li>
            <NavLink to="/admin/instructor-course" end className={linkClasses}>
              <FaBookOpen /> Course
            </NavLink>
          </li>
          <li className="h-[1px] w-full bg-gray-500/20" />
          <li>
            <NavLink to="/admin/users" className={linkClasses}>
              <FiUsers /> Users
            </NavLink>
          </li>
          <li className="h-[1px] w-full bg-gray-500/20" />
          <li>
            <NavLink to="/admin/settings" className={linkClasses}>
              <FiSettings /> Settings
            </NavLink>
          </li>
           <li className="h-[1px] w-full bg-gray-500/20" />
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100 text-zinc-400 text-sm">© {currentYear} CourseDeep</div>
    </div>
  );
};

export default Sidebar;
