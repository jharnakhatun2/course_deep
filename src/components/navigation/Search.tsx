import { IoIosSearch } from "react-icons/io";

interface SearchProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  return (
    <div className="relative mr-6 my-1">
      <input
        type="text"
         onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-white shadow-2xl rounded border border-gray-300 p-2 pl-5 pr-10 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        placeholder="Search by name..."
      />
      <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer">
        <IoIosSearch className="w-6 h-6"/>
      </div>
    </div>
  );
};

export default Search;
