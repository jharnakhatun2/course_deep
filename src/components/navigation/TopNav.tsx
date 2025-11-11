import { FaBookReader } from "react-icons/fa";
import { FiPhoneCall, FiMail, FiMapPin } from "react-icons/fi";
import { Link } from "react-router";

const TopNav = () => {
  const infoStyle= "text-xs text-zinc-500";
  const subInfo = "text-zinc-800";
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 ">
        {/* Logo */}

        <Link to="/" className="flex items-center space-x-2 border-none">
          <FaBookReader className="text-yellow-500 w-6 h-6" />
          <span className="font-lobster font-bold text-2xl text-zinc-800">
            Course Deep
          </span>
        </Link>

        {/* Contact Info */}
        <div className="hidden sm:flex flex-col sm:flex-row sm:space-x-8 mt-2 sm:mt-0 text-gray-600 text-sm">
          <div className="flex items-center space-x-2">
            <FiPhoneCall className="w-6 h-6 text-gray-400" />
            <div>
              <p className={infoStyle}>Call Us:</p>
              <p className={subInfo}>(+88) 123-456-7890</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FiMail className="w-6 h-6 text-zinc-400" />
            <div>
              <p className={infoStyle}>Email Us:</p>
              <p className={subInfo}>info@coursedeep.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FiMapPin className="w-6 h-6 text-gray-400" />
            <div>
              <p className={infoStyle}>Location</p>
              <p className={subInfo}>1000 Mirpur, Dhaka, BD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
