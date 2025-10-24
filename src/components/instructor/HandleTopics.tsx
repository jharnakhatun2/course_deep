import type { FC } from "react";
import type { TopicsHandle } from "../../ult/types/types";

interface HandleTopicsProps {
  topicsHandling: TopicsHandle[];
}

const HandleTopics:FC<HandleTopicsProps> = ({topicsHandling}) => {
  
  const tableHeaderStyle =
    "px-6 py-4 text-left text-xs text-zinc-600 font-normal";
  const tableContentStyle =
    "px-6 py-4 text-zinc-400 hover:text-zinc-500 text-sm transition-smooth";

  return (
    <div>
      <h2 className="text-xl text-zinc-700 mb-4">Topics Handling</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-400">
              <th className={tableHeaderStyle}>COURSE NAME</th>
              <th className={tableHeaderStyle}>LESSON NAME</th>
              <th className={tableHeaderStyle}>COMPLEXITY</th>
              <th className={tableHeaderStyle}>LENGTH</th>
            </tr>
          </thead>
          <tbody>
            {topicsHandling.map((course, index) => (
              <tr
                key={index}
                className="border border-gray-200 hover:bg-gray-50  transition-smooth"
              >
                <td className={tableContentStyle}>{course.courseName}</td>
                <td className={tableContentStyle}>{course.lessonName}</td>
                <td className={tableContentStyle}>{course.complexity}</td>
                <td className={tableContentStyle}>{course.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HandleTopics;
