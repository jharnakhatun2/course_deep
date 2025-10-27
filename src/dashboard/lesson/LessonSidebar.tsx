import  { type FC } from "react";
import { ProgressBar } from "./ProgressBar";
interface LessonSidebarProps {
  courseVideos: { id: string; title: string }[];
  currentVideoIndex: number;
  goToVideo: (index: number) => void;
}

export const LessonSidebar: FC<LessonSidebarProps> = ({courseVideos, currentVideoIndex, goToVideo}) => {

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Running Module : 80</span>
        <span className="text-sm text-gray-400">6/6</span>
      </div>
      <ProgressBar progress={100} />

      {/* Search */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search Lesson"
          className="w-full bg-[#1e1e2f] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Lessons */}
      <div className="mt-4 space-y-3">
        <div className="space-y-2">
            {courseVideos.map((video, index) => (
              <div
                key={video.id}
                onClick={() => goToVideo(index)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? "bg-blue-100 border-l-4 border-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-sm mr-3">
                    {index + 1}
                  </span>
                  <span
                    className={
                      index === currentVideoIndex
                        ? "font-semibold text-blue-600"
                        : ""
                    }
                  >
                    {video.title}
                  </span>
                  {index === currentVideoIndex && (
                    <span className="ml-auto text-sm text-blue-600">
                      ▶️ Playing
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};
