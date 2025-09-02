import { Link } from "react-router";

const menuList = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/" },
  { name: "Events", path: "/" },
  { name: "Blog", path: "/" },
  { name: "Contact", path: "/" },
];

const Menu = () => {
  return (
    <nav className="bg-yellow-400 py-3 sm:py-0">
      <div className="lg:max-w-7xl mx-auto px-4 ">
        <div className="flex justify-between items-center">
          {/* <!-- mobile button goes here --> */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button cursor-pointer">
              <svg
                className="w-8 h-8 border p-1 rounded text-zinc-700 border-zinc-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
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

      {/* <!-- mobile menu --> */}
      <div className="mobile-menu md:hidden space-y-3 pl-4 text-zinc-700 pt-5 pb-3">
        {menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex hover:font-bold transition-smooth uppercase text-[12px] "
                >
                  {item.name}
                </Link>
              ))}
      </div>
    </nav>
  );
};

export default Menu;
