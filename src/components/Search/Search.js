import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import "./search.css";

const Search = ({ setSearchText }) => {
  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="search-container">
      <SearchIcon />
      <input
        placeholder="search here..."
        type="text"
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default Search;
