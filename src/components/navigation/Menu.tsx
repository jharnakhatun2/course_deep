import { useState } from "react";
import { Link } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import Search from "./Search";
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";

const menuList = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();

  // Filter menu items dynamically based on query
  const filteredMenu = menuList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  // logout function
  const logOut = async () => {
    try {
      await logoutApi().unwrap(); // call API logout
      dispatch(logout()); // clear user from state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <nav className="bg-yellow-400 py-3">
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
            {/* Search Icon on Menu Bar for Mobile */}
            <IoIosSearch
              onClick={() => setShowSearch(!showSearch)}
              className="w-5 h-5 text-white cursor-pointer hover:text-zinc-600 transition-smooth ml-4"
            />
          </div>

          <div className="flex space-x-10">
            {/* <!-- primary nav --> */}
            <div className="hidden md:flex items-center space-x-10 text-white">
              {filteredMenu.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="hover:text-zinc-600 transition-smooth uppercase text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Search Icon on Menu Bar for Desktop */}
            <IoIosSearch
              onClick={() => setShowSearch(!showSearch)}
              className="hidden sm:block w-5 h-5 text-white cursor-pointer hover:text-zinc-600 transition-smooth"
            />
          </div>
          {/* <!-- Login & Signup --> */}
          {user ? (
            <div className="flex items-center space-x-2 text-white bg-gray-500/30 px-3 h-8">
              <button
                className="cursor-pointer hover:text-black transition-smooth"
                onClick={logOut}
              >
                Logout
              </button>
              <span>|</span>
              <FaUserCircle className="cursor-pointer" />
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-white bg-gray-500/30 px-3 h-8">
              <Link
                to="/login"
                className="cursor-pointer hover:text-black transition-smooth"
              >
                Login | Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search input dropdown */}
      <div
        className={` w-60 absolute transform -translate-y-1/2 transition-smooth overflow-hidden left-1/4 top-32 sm:right-7/12 z-50 ${
          showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Search onSearch={setQuery} />
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
