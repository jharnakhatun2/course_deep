import { type FC, useState } from "react";
import { NavLink } from "react-router";
import { FiHome, FiUsers, FiSettings, FiMenu, FiX } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 flex items-center gap-2 cursor-pointer transition-smooth ${isActive ? "text-yellow-500 font-bold bg-gradient-to-br from-indigo-100 via-white to-purple-100" : "hover:bg-gray-700/10"
    }`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-zinc-600 hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-lg text-zinc-600 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:h-screen
        `}
      >
        <div className="text-base sm:text-lg uppercase p-4 shadow font-semibold mt-12 lg:mt-0">
          Admin Dashboard
        </div>
        <nav className="flex-1 text-sm overflow-y-auto">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FiHome /> Dashboard
              </NavLink>
            </li>
            <li className="h-[1px] w-full bg-gray-500/20" />
            <li>
              <NavLink
                to="/admin/instructor-course"
                end
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FaBookOpen /> Course
              </NavLink>
            </li>
            <li className="h-[1px] w-full bg-gray-500/20" />
            <li>
              <NavLink
                to="/admin/users"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FiUsers /> Users
              </NavLink>
            </li>
            <li className="h-[1px] w-full bg-gray-500/20" />
            <li>
              <NavLink
                to="/admin/settings"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FiSettings /> Settings
              </NavLink>
            </li>
            <li className="h-[1px] w-full bg-gray-500/20" />
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-100 text-zinc-400 text-xs sm:text-sm">
          © {currentYear} CourseDeep
        </div>
      </div>
    </>
  );
};

export default Sidebar;