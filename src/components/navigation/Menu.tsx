
import { Link, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { authApi, useLogoutMutation } from "../../features/auth/authApi";
import { logout } from "../../features/auth/authSlice";
import { useAuth } from "../../hook/useAuth";
import { useEffect, useState } from "react";

const menuList = [
  {  path: "/", label: "Home" },
  {  path: "/courses", label: "Courses" },
  {  path: "/events", label: "Events" },
  {  path: "/blogs", label: "Blog" }
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // logout function
  const logOut = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      dispatch(authApi.util.resetApiState());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Scroll event to make menu sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`py-3 w-full z-50 transition-all duration-300 ${isSticky
        ? "fixed top-0 left-0 bg-yellow-400/40 backdrop-blur-lg shadow-[0_0_5px_#ffffff]"
        : "bg-yellow-400/90 relative"
      }`}>
      <div className="lg:max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">
          {/* <!-- mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-button cursor-pointer"
            >
              {isOpen ? (
                <FiX className="w-8 h-8 border p-1 rounded text-white border-white/60 shadow-lg" />
              ) : (
                <FiMenu className="w-8 h-8 border p-1 rounded text-white border-white/60 shadow-lg" />
              )}
            </button>
          </div>

          <div className="flex space-x-10">
            {/* <!-- primary nav --> */}
            <div className="hidden md:flex items-center space-x-10 text-white">
              {menuList.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className="hover:text-zinc-600 transition-smooth uppercase text-sm cursor-pointer"
                >
                  {label}
                </Link>
              ))}
            </div>

          </div>
          {/* <!-- Login & Signup --> */}
          {user ? (
            <div className="flex items-center space-x-2 text-white bg-gray-500/30 px-3 h-8 ">
              <button
                className="cursor-pointer hover:text-black transition-smooth"
                onClick={logOut}
              >
                Logout
              </button>
              <span>|</span>
              <Link
                to="/dashboard"
                className="cursor-pointer hover:text-black transition-smooth"
              >
                <FaUserCircle />
              </Link>

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

      {/* <!-- Mobile menu --> */}
      <div
        className={`md:hidden overflow-hidden transition-smooth ${isOpen ? "max-h-60" : "max-h-0"
          }`}
      >
        <div className="space-y-3 pl-4 text-zinc-700 pt-5 pb-3">
          {menuList.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="flex hover:font-bold transition-smooth uppercase text-[12px] cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
