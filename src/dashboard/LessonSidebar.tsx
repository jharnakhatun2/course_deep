import React from "react";
import { ProgressBar } from "./ProgressBar";

export const LessonSidebar: React.FC = () => {
  const milestones = [
    "Welcome To The Web Course",
    "Orientation - What Matters In This Course?",
    "HTML, CSS And GitHub As A Beginner",
    "Responsive Web Layout",
    "CSS Frameworks",
  ];

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
        {milestones.map((title, i) => (
          <div
            key={i}
            className="bg-[#222237] hover:bg-[#2c2c49] p-3 rounded-lg transition-all cursor-pointer"
          >
            <p className="text-purple-400 text-sm font-semibold">
              Milestone {i}: {title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
