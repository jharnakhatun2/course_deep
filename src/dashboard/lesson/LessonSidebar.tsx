import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { HiMiniChevronUp } from "react-icons/hi2";
import { BiChevronDown } from "react-icons/bi";

interface LessonSidebarProps {
  courseVideos: { id: string; title: string }[];
  currentVideoIndex: number;
  goToVideo: (index: number) => void;
}

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div
      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export const LessonSidebar = ({
  courseVideos,
  currentVideoIndex,
  goToVideo,
}: LessonSidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Organize videos into modules (4 videos per module)
  const modules = [];
  for (let i = 0; i < courseVideos.length; i += 4) {
    modules.push({
      id: Math.floor(i / 4),
      title: `Module ${Math.floor(i / 4) + 1}`,
      videos: courseVideos.slice(i, i + 4),
      startIndex: i,
    });
  }

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Filter modules based on search
  const filteredModules = modules.map((module) => ({
    ...module,
    videos: module.videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  // Auto-expand modules that have matching search results
  const modulesWithResults = filteredModules
    .filter((module) => module.videos.length > 0)
    .map((module) => module.id);

  // Update expanded modules when search changes
  const displayExpandedModules = searchQuery
    ? modulesWithResults
    : expandedModules;

  // Calculate progress
  const completedLessons = currentVideoIndex + 1;
  const totalLessons = courseVideos.length;
  const progress = (completedLessons / totalLessons) * 100;

  // Find which module contains the current video
  const currentModule = Math.floor(currentVideoIndex / 4);

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Course Progress</span>
        <span className="text-sm text-gray-400">
          {completedLessons}/{totalLessons}
        </span>
      </div>
      <ProgressBar progress={progress} />

      {/* Search */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search Lesson"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#1e1e2f] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-500"
        />
      </div>

      {/* Modules */}
      <div className="mt-4 space-y-2">
        {filteredModules.map((module) => {
          const isExpanded = displayExpandedModules.includes(module.id);
          const hasVideos = module.videos.length > 0;
          const moduleCompleted = module.startIndex + 3 < currentVideoIndex;
          const moduleInProgress =
            currentVideoIndex >= module.startIndex &&
            currentVideoIndex < module.startIndex + 4;

          if (!hasVideos) return null;

          return (
            <div key={module.id} className="border border-gray-700 rounded-lg overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-[#1e1e2f] transition-colors rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                      moduleCompleted
                        ? "bg-green-500 text-white"
                        : moduleInProgress
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {module.id + 1}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{module.title}</div>
                    <div className="text-xs text-gray-400">
                      {module.videos.length} lessons
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <HiMiniChevronUp  className="w-4 h-4 text-gray-400" />
                ) : (
                  <BiChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </button>

              {/* Module Lessons with smooth height transition */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{
                  overflow: isExpanded ? "visible" : "hidden",
                }}
              >
                <div className="px-2 pb-2 space-y-1">
                  {module.videos.map((video, idx) => {
                    const videoIndex = module.startIndex + idx;
                    const isCurrentVideo = videoIndex === currentVideoIndex;
                    const isCompleted = videoIndex < currentVideoIndex;

                    return (
                      <div
                        key={video.id}
                        onClick={() => goToVideo(videoIndex)}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          isCurrentVideo
                            ? "bg-yellow-500 text-black"
                            : isCompleted
                            ? "bg-[#1e1e2f] text-gray-300"
                            : "hover:bg-[#1e1e2f] text-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 ${
                              isCurrentVideo
                                ? "bg-black text-yellow-500 font-bold"
                                : isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </span>
                          <span 
                            className="text-xs flex-1 line-clamp-2"
                            dangerouslySetInnerHTML={{
                              __html: searchQuery
                                ? video.title.replace(
                                    new RegExp(`(${searchQuery})`, "gi"),
                                    '<mark class="bg-yellow-500 text-black">$1</mark>'
                                  )
                                : video.title,
                            }}
                          />
                          {isCurrentVideo && (
                            <IoPlayCircleOutline   className="w-4 h-4 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Example courseVideos data
const courseVideos = [
  { id: "ODKIxaSMgpU", title: "A complete roadmap to learn Reactjs" },
  { id: "N_Lfqk6oQ7o", title: "React Fundamentals - Why React is a Declarative" },
  { id: "f3dfaXM33Pg", title: "How to do Development Setup for ReactJS" },
  { id: "D_cUdRtPG-M", title: "Deep Understanding of JSX" },
  { id: "GgurJ_3y0Jg", title: "Understanding React Components,State vs. Props" },
  { id: "CvNvRaS3u60", title: "An Introduction to React Hooks - Functional Components" },
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
  { id: "XKfep8AlOz8", title: "What is Code Splitting? How does Code Splitting Work Under the Hood?" },
];

// Demo Component
export default function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto bg-[#151526] rounded-lg shadow-xl">
        <LessonSidebar
          courseVideos={courseVideos}
          currentVideoIndex={currentVideoIndex}
          goToVideo={setCurrentVideoIndex}
        />
      </div>
    </div>
  );
}