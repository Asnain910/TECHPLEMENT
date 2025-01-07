import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(author);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
