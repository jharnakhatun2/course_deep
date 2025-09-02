import { useState } from "react";
import { Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";

const menuList = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/" },
  { name: "Events", path: "/" },
  { name: "Blog", path: "/" },
  { name: "Contact", path: "/" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="bg-yellow-400 py-3 sm:py-0">
      <div className="lg:max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">
          {/* <!-- mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button cursor-pointer"
            >
              {isOpen ? (
                <FiX className="w-8 h-8 border p-1 rounded text-zinc-700 border-zinc-700" />
              ) : (
                <FiMenu className="w-8 h-8 border p-1 rounded text-zinc-700 border-zinc-700" />
              )}
            </button>
          </div>

          <div className="flex space-x-4">
            {/* <!-- primary nav --> */}
            <div className="hidden md:flex items-center space-x-10 text-white">
              {menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="hover:text-zinc-600 transition-smooth uppercase text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* <!-- Login & Signup --> */}
          <div className="flex items-center space-x-1 text-white bg-gray-500/30 px-3 h-8 rounded">
            <Link
              to="/login"
              className="cursor-pointer hover:text-black transition-smooth"
            >
              Login
            </Link>
            <span>|</span>
            <Link
              to="/signup"
              className="cursor-pointer hover:text-black transition-smooth"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu --> */}
      <div
        className={`md:hidden overflow-hidden transition-smooth ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="space-y-3 pl-4 text-zinc-700 pt-5 pb-3">
          {menuList.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex hover:font-bold transition-smooth uppercase text-[12px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
