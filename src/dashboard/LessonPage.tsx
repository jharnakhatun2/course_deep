import React, { useState } from "react";
import { LessonSidebar } from "./lesson/LessonSidebar";
import { LuNotebookPen } from "react-icons/lu";
import YouTube from "react-youtube";
import NotesSection from "./lesson/NotesSection";

const courseVideos = [
  { id: "ODKIxaSMgpU", title: "A complete roadmap to learn Reactjs" },
  {
    id: "N_Lfqk6oQ7o",
    title: "React Fundamentals - Why React is a Declarative",
  },
  { id: "f3dfaXM33Pg", title: "How to do Development Setup for ReactJS" },
  { id: "D_cUdRtPG-M", title: " Deep Understanding of JSX" },
  {
    id: "GgurJ_3y0Jg",
    title: "Understanding React Components,State vs. Props",
  },
  {
    id: "CvNvRaS3u60",
    title: "An Introduction to React Hooks - Functional Components",
  },
  { id: "IQjB-U9X680", title: "How to Manage State with useState React Hook" },
  { id: "M0yi7bdz-fA", title: "useEffect React Hook for Side Effects" },
  { id: "nt-TB3f5kp4", title: "How to write Custom Hooks in React" },
  { id: "LNwEpMLLFTw", title: "What is the useRef hook in React" },
  { id: "dtwVjJMnOsw", title: "React Higher-Order Components with Example" },
  { id: "rysTbzKOEO0", title: "ReactJS Virtual DOM" },
  { id: "qGGu46ZoMqQ", title: "What is React memo?" },
  { id: "QSLKhwYKBc4", title: "useCallback and useMemo React Hooks" },
  { id: "rpc3zYrYbTc", title: "What is Prop Drilling in React?" },
  { id: "yijn4ZIBxVA", title: "React Context API - What is Context" },
  { id: "ey0SYV-OBo4", title: "What is Redux - When to use Redux?" },
  { id: "PMyPyT8N4m8", title: "When to use useReducer?" },
  {
    id: "XKfep8AlOz8",
    title:
      "What is Code Splitting? How does Code Splitting Work Under the Hood?",
  },
];

const LessonPage: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = courseVideos[currentVideoIndex];

  // Next Navigation Handlers
  const goToNextVideo = () => {
    if (currentVideoIndex < courseVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Prev Navigation Handlers
  const goToPrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // Direct Video Selection Handler
  const goToVideo = (index: number) => {
    setCurrentVideoIndex(index);
  };

  // YouTube Player Options
  const youtubeOpts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <section className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="font-garamond text-2xl font-semibold text-zinc-600">
            {currentVideo.title}
          </h1>
        </div>
        <div className="h-[1px] w-full bg-gray-500/20 my-3" />

        {/* Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 mt-2">
          {/* Left Section */}
          <section className="lg:col-span-2">
            {/* Video */}
            <div className="bg-zinc-800 overflow-hidden mb-6 rounded">
              <div className="w-full rounded">
                <YouTube
                  videoId={currentVideo.id}
                  opts={youtubeOpts}
                  className="w-full rounded"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex mb-6 justify-end gap-4">
              <button
                onClick={goToPrevVideo}
                disabled={currentVideoIndex === 0}
                className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
                  currentVideoIndex === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "border border-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
                }`}
              >
                Previous
              </button>
              <button
                onClick={goToNextVideo}
                disabled={currentVideoIndex === courseVideos.length - 1}
                className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
                  currentVideoIndex === courseVideos.length - 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
                }`}
              >
                Next
              </button>
            </div>

            {/* Notes Section */}
            <div className="flex items-center gap-2 text-zinc-600 font-semibold text-lg mb-2">
              <LuNotebookPen className="text-teal-500" />
              <h3>Notes</h3>
            </div>
            <div className="h-[1px] w-full bg-gray-500/20 my-3" />
            <NotesSection />
          </section>

          {/* Right Sidebar */}
          <aside className="hidden md:block bg-zinc-800 border-l border-gray-300 overflow-y-auto lg:col-span-1 rounded">
            <LessonSidebar
              courseVideos={courseVideos}
              currentVideoIndex={currentVideoIndex}
              goToVideo={goToVideo}
            />
          </aside>
        </main>
      </div>
    </section>
  );
};

export default LessonPage;
