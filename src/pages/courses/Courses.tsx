import Search from "../../components/navigation/Search";
import { useSearchFilter } from "../../ult/search/useSearchFilter";


const courses = [
  { id: 1, name: "React Basics" },
  { id: 2, name: "Node.js Advanced" },
  { id: 3, name: "JavaScript Fundamentals" },
  { id: 4, name: "CSS Animations" },
];

const Courses = () => {
  const { query, setQuery, filteredItems } = useSearchFilter(courses, ["name"]);

  return (
    <div>
      <Search onSearch={setQuery} />

      <ul className="mt-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((course) => (
            <li key={course.id} className="p-2 border-b">
              {course.name}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No results found for "{query}"</li>
        )}
      </ul>
    </div>
  );
};

export default Courses;
