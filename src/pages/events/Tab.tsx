import { useState, type FC } from "react";

const Tab: FC = () => {
  const [tab, setTab] = useState<"about" | "participants">("about");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <nav className="md:w-48 border border-gray-200 rounded-md overflow-hidden">
        <button
          onClick={() => setTab("about")}
          className={`w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer uppercase text-xs ${
            tab === "about" ? "bg-white font-semibold text-yellow-500" : "bg-gray-50"
          }`}
        >
          Discuss About
        </button>
        <button
          onClick={() => setTab("participants")}
          className={`w-full text-left px-4 py-3 hover:bg-gray-50 cursor-pointer uppercase text-xs ${
            tab === "participants" ? "bg-white font-semibold text-yellow-500" : "bg-gray-50"
          }`}
        >
          Participants
        </button>
      </nav>

      <div className="flex-1 border border-gray-200 rounded-md p-6 bg-white">
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

        {tab === "participants" && (
          <div className="text-gray-700">
            <p className="mb-2 uppercase text-teal-500 text-sm">Participants :</p>
            <ol className="list-disc marker:text-yellow-400 pl-5 text-zinc-500 font-Ubuntu">
              <li>John Doe — Lead Instructor</li>
              <li>Jane Smith — Frontend Engineer</li>
              <li>Ali Ahmed — Guest Speaker</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tab;
