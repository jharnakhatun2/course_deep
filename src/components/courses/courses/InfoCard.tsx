import { MdWorkspacePremium } from "react-icons/md";

const InfoCard = () => {
  return (
    <div className="hidden absolute left-1/2 -bottom-10 -translate-x-1/2 h-24 w-11/12 sm:w-11/12 rounded-xl shadow-lg sm:flex items-center justify-between overflow-hidden bg-white/30 backdrop-blur-lg shadow-[0_0_5px_#ffffff]">
      {/* Premium Badge (first card start) */}
      <div className="bg-yellow-500 px-5 py-3 text-white flex flex-col items-center justify-center h-full w-28 rounded-l-lg">
        <MdWorkspacePremium className="text-3xl" />
        <p className="text-lg font-semibold">Premium</p>
      </div>

      {/* Course Info Section */}
      <div className="flex-1 flex justify-around items-center text-gray-700 text-center px-4">
        <div>
          <p className="font-semibold text-white text-lg">Intermediate</p>
          <p className="text-sm text-zinc-600">Level</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className="font-semibold text-white text-lg">English</p>
          <p className="text-sm text-zinc-600">Language</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className="font-semibold text-white text-lg">June 15, 2025</p>
          <p className="text-sm text-zinc-600">Last Updated</p>
        </div>
        {/* Divider */}
        <div className="h-16 w-px bg-gray-300"></div>
        <div>
          <p className="font-semibold text-white text-lg">HTML, CSS, JS</p>
          <p className="text-sm text-zinc-600">Prerequisites</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
