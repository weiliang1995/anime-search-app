import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="search">
      <div>
        <Search className="text-gray-200" />
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={""}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default SearchInput;
