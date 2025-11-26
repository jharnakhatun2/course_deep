import { type FC, useState } from "react";
import { NavLink } from "react-router";
import { FiHome, FiSettings } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-3 text-white lg:text-zinc-400 flex items-center gap-3 cursor-pointer transition-all group
     ${isActive
        ? "text-yellow-500 font-bold lg:bg-gradient-to-br from-indigo-100 via-white to-purple-100"
        : "hover:bg-gray-700/10"
      }`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-40 right-4 z-50 px-2 py-1 bg-yellow-500 text-sm shadow-lg text-white hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        {isOpen ? "Menu Close" :  "Menu Open"}
      </button>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          group fixed lg:h-screen lg:static inset-y-0 mt-16 lg:mt-0 left-0 z-40
          lg:bg-white lg:shadow-lg text-zinc-600 flex flex-col
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}

          /* Collapsed width mobile & tablet, expanded on desktop */
          w-16 lg:w-56
        `}
      >
        {/* Header */}
        <div className="text-base sm:text-lg uppercase p-4 lg:shadow font-semibold mt-12 lg:mt-0 flex items-center">
          <span className="hidden lg:inline-block">Admin Dashboard</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 text-sm overflow-y-auto">
          <ul>

            {/* Dashboard */}
            <li className="relative group/item">
              <NavLink
                to="/admin"
                end
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FiHome size={18} className="min-w-5" />

                {/* Text only on large screens */}
                <span className="hidden lg:inline-block">
                  Dashboard
                </span>
              </NavLink>

              {/* Tooltip only when sidebar collapsed (small screens or hover) */}
              <span className="
                lg:hidden
                pointer-events-none absolute left-16 top-1/2 -translate-y-1/2
                opacity-0 group-hover/item:opacity-100
                bg-zinc-900 text-white text-xs px-2 py-1 rounded lg:shadow
                transition-all whitespace-nowrap
              ">
                Dashboard
              </span>
            </li>

            <li className="h-[1px] w-full bg-gray-500/20 hidden lg:block" />

            {/* Courses */}
            <li className="relative group/item">
              <NavLink
                to="/admin/instructor-course"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FaBookOpen size={18} />
                <span className="hidden lg:inline-block">
                  Course
                </span>
              </NavLink>

              <span className="
                lg:hidden
                pointer-events-none absolute left-16 top-1/2 -translate-y-1/2
                opacity-0 group-hover/item:opacity-100
                bg-zinc-900 text-white text-xs px-2 py-1 rounded shadow
              ">
                Course
              </span>
            </li>

            <li className="h-[1px] w-full bg-gray-500/20 hidden lg:block" />

            <li className="h-[1px] w-full bg-gray-500/20 hidden lg:block" />

            {/* Settings */}
            <li className="relative group/item">
              <NavLink
                to="/admin/settings"
                className={linkClasses}
                onClick={() => setIsOpen(false)}
              >
                <FiSettings size={18} />
                <span className="hidden lg:inline-block">
                  Settings
                </span>
              </NavLink>

              <span className="
                lg:hidden
                pointer-events-none absolute left-16 top-1/2 -translate-y-1/2
                opacity-0 group-hover/item:opacity-100
                bg-zinc-900 text-white text-xs px-2 py-1 rounded shadow
              ">
                Settings
              </span>
            </li>

            <li className="h-[1px] w-full bg-gray-500/20 hidden lg:block" />

          </ul>
        </nav>

        {/* Footer */}
        <div className="hidden lg:inline-block p-4 border-t border-gray-100 text-zinc-400 text-xs sm:text-sm">
          <span>
            © {currentYear} CourseDeep
          </span>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
