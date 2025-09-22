import { useState, type FC } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const Search: FC<SearchProps> = ({ placeholder = "Search...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white/10 focus:shadow-xl border border-gray-300 p-2 pl-5 pr-10 focus:outline-none focus:ring-1 focus:ring-zinc-300"
      />

      <div className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer">
              <IoIosSearch className="w-6 h-6"/>
            </div>

      
    </div>
  );
};

export default Search;
