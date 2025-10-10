import { useState, type FC } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";

const Tab: FC = () => {
  const [tab, setTab] = useState<"about" | "participants">("about");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <nav className="md:w-48 border border-gray-200 rounded-md overflow-hidden">
        <button
          onClick={() => setTab("participants")}
          className={`w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer uppercase text-xs ${
            tab === "participants" ? "bg-white font-semibold text-yellow-500" : "bg-gray-50"
          }`}
        >
          Participants
        </button>

        <button
          onClick={() => setTab("about")}
          className={`w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer uppercase text-xs ${
            tab === "about" ? "bg-white font-semibold text-yellow-500" : "bg-gray-50"
          }`}
        >
          Discuss About
        </button>
        
      </nav>

      <div className="flex-1 border border-gray-200 rounded-md p-6 bg-white">

{tab === "participants" && (
          <div className="text-gray-700">
            <p className="mb-2 uppercase text-teal-500 text-sm">Participants :</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <IoLocationSharp className="text-yellow-500 text-xl" />
                            <span>Dhaka, Bangladesh</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MdOutlineWatchLater className="text-yellow-500 text-xl" />
                            <span>25th December 2025, 10:00 AM</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaUserGraduate className="text-yellow-500 text-xl" />
                            <span>Instructor: Jharna Khatun</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <p>Seats Available: <span className="font-semibold text-yellow-500 text-2xl">40</span></p>
                          </div>
                        </div>
          </div>
        )}

        {tab === "about" && (
          <ul className="list-disc marker:text-yellow-400 pl-5 space-y-2 text-zinc-500 font-Ubuntu ">
            <li>Thomas Edison may have been behind the invention.</li>
            <li>
              Edison worked alongside partners, both financial and commercial,
              to get his best inventions off the ground.
            </li>
            <li>Battling challenging cost targets and the need to build.</li>
            <li>
              Partnership with a supplier or original equipment manufacturer.
            </li>
          </ul>
        )}

        
      </div>
    </div>
  );
};

export default Tab;
