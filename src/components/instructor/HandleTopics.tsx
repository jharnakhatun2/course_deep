interface Course {
  name: string;
  lesson: string;
  complexity: string;
  length: string;
}

const HandleTopics = () => {
  const courses: Course[] = [
    {
      name: "Information Technology",
      lesson: "Software testing",
      complexity: "Easy",
      length: "90 mins",
    },
    {
      name: "Fashion Technolgy",
      lesson: "Designing",
      complexity: "standard",
      length: "60 mins",
    },
    {
      name: "photography",
      lesson: "Animation",
      complexity: "standard",
      length: "60 mins",
    },
    {
      name: "Electronics",
      lesson: "Hardware process",
      complexity: "Hard",
      length: "90 mins",
    },
    {
      name: "Computer Application",
      lesson: "Micro Processor",
      complexity: "Hard",
      length: "70 mins",
    },
    {
      name: "IT&Software",
      lesson: "Opearating System",
      complexity: "Standard",
      length: "60 mins",
    },
    {
      name: "Bussiness Law",
      lesson: "Principles",
      complexity: "Easy",
      length: "60 mins",
    },
  ];

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
            {courses.map((course, index) => (
              <tr
                key={index}
                className="border border-gray-200 hover:bg-gray-50  transition-smooth"
              >
                <td className={tableContentStyle}>{course.name}</td>
                <td className={tableContentStyle}>{course.lesson}</td>
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
