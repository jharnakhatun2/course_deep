import React from "react";
import { NotesSection } from "./NotesSection";
import { LessonSidebar } from "./LessonSidebar";


const LessonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0c0c16] text-gray-100 flex flex-col">
      {/* Title */}
      <header className="border-b border-gray-700 px-6 py-4">
        <h1 className="text-lg font-semibold text-purple-400">🎥 80-6 Final Steps</h1>
      </header>

      {/* Content Area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Section */}
        <section className="w-full md:w-3/4 p-6 overflow-y-auto">
          {/* Video */}
          <div className="bg-black rounded-xl overflow-hidden mb-6">
            <video
              className="w-full rounded-lg"
              controls
              poster="/thumbnail.jpg"
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mb-6">
            <button className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-2 rounded-lg">
              Previous
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-sm px-4 py-2 rounded-lg">
              Next
            </button>
          </div>

          {/* Notes Section */}
          <NotesSection />
        </section>

        {/* Right Sidebar */}
        <aside className="hidden md:block w-1/4 bg-[#151526] border-l border-gray-800 overflow-y-auto">
          <LessonSidebar />
        </aside>
      </main>
    </div>
  );
};

export default LessonPage;
