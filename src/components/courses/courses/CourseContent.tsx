import { useState, type FC } from "react";
import type { Course } from "../../../ult/types/types";

interface CourseContentProp {
  course: Course;
}

const CourseContent: FC<CourseContentProp> = ({ course }) => {
  const [openItems, setOpenItems] = useState<number[]>([1]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenItems(course.curriculum.map((item) => item.id));
  };

  const collapseAll = () => {
    setOpenItems([]);
  };

  const allExpanded = openItems.length === course.curriculum.length;

  return (
    <div className="min-h-screen lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className=" mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-gray-700">
            <span className="font-semibold">{course.totalSection}</span> sections •{" "}
            <span className="font-semibold">{course.totalLectures}</span> lectures •{" "}
            <span className="font-semibold">{course.totalDurationLength}</span> total length
          </div>
          <button
            onClick={allExpanded ? collapseAll : expandAll}
            className="text-yellow-400 font-semibold text-sm hover:text-yellow-500 self-start sm:self-auto"
          >
            {allExpanded ? "Collapse all sections" : "Expand all sections"}
          </button>
        </div>

        {/* Accordion */}
        <div className="bg-white/80 backdrop-blur-lg shadow-[0_0_1px_#ffffff] border border-gray-100">
          {course.curriculum.map((item, index) => {
            const isOpen = openItems.includes(item.id);

            return (
              <div
                key={item.id}
                className={`${index !== 0 ? "border-t border-gray-200" : ""}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-3 sm:px-6 py-3 sm:py-4 flex items-start gap-2 sm:gap-3 text-left transition-colors duration-200 hover:bg-gray-50"
                >
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0 transition-transform duration-300 mt-1 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>

                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-700">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 flex-shrink-0">
                      <span>{item.lectures}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </button>

                <div
                  className="grid transition-all duration-300 ease-in-out overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0">
                    {item.lessons.length > 0 && (
                      <div className="px-3 sm:px-6 pb-3 sm:pb-4 pl-8 sm:pl-14">
                        <div className="space-y-1">
                          {item.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between py-2 px-2 sm:px-3 rounded hover:bg-gray-50 group cursor-pointer"
                            >
                              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                                {lesson.type === "video" && (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      fill="none"
                                    />
                                    <path d="M10 8l6 4-6 4V8z" />
                                  </svg>
                                )}
                                {lesson.type === "quiz" && (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      strokeWidth="2"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M12 8v4m0 4h.01"
                                    />
                                  </svg>
                                )}
                                {lesson.type === "exercise" && (
                                  <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                )}
                                <span className="text-xs sm:text-sm text-zinc-500 truncate">
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
