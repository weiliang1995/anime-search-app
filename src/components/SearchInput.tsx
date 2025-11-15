import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="search mt-10 max-w-3xl mx-auto">
      <div>
        <Search className="text-gray-200" />
        <input
          type="text"
          placeholder="Search through thousands of anime"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInput;
