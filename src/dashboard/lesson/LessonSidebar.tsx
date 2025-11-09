import { useState } from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { HiMiniChevronUp } from "react-icons/hi2";
import { BiChevronDown } from "react-icons/bi";
import type { Enrollment } from "../../ult/types/types";

interface LessonSidebarProps {
  courseVideos: Array<{
    id: string;
    title: string;
    duration?: string;
    type?: string;
    isCompleted?: boolean;
  }>;
  currentVideoIndex: number;
  goToVideo: (index: number) => void;
  enrollment?: Enrollment;
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
          className="w-full border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 text-white placeholder-gray-500 bg-white/5 backdrop-blur-lg shadow-[inset_2px_2px_1px_rgba(0,0,0,0.3)]"
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
            <div key={module.id} className="border border-zinc-700 overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-zinc-800 transition-smooth bg-white/10 backdrop-blur-lg shadow-[0_0_5px_#ffffff] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
                      moduleCompleted
                        ? "bg-green-500 text-white"
                        : moduleInProgress
                        ? "bg-yellow-500 text-zinc-800"
                        : "bg-zinc-500 text-gray-300"
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
                className={`transition-smooth ${
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{
                  overflow: isExpanded ? "visible" : "hidden",
                }}
              >
                <div className="px-2 pb-2 space-y-1 my-2">
                  {module.videos.map((video, idx) => {
                    const videoIndex = module.startIndex + idx;
                    const isCurrentVideo = videoIndex === currentVideoIndex;
                    const isCompleted = videoIndex < currentVideoIndex;

                    return (
                      <div
                        key={idx}
                        onClick={() => goToVideo(videoIndex)}
                        className={`p-2 rounded cursor-pointer transition-smooth hover:bg-white/10 ${
                          isCurrentVideo
                            ? "bg-yellow-500 text-black hover:bg-yellow-500"
                            : isCompleted
                            ? "text-gray-300"
                            : "text-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs flex-shrink-0 ${
                              isCurrentVideo
                                ? "bg-black text-yellow-500 font-bold"
                                : isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-zinc-600 text-gray-400"
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
