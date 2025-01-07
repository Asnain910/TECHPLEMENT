import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State for storing quotes and search results
  const [quote, setQuote] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);

  // Fetch random quote when the component is mounted
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  // Function to fetch a random quote
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/quotes/random`
      );
      setQuote(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching random quote.");
      console.error("Error fetching random quote:", error);
    }
  };

  // Function to search for quotes by author
  const searchQuotes = async (authorName) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/quotes/search?author=${authorName}`
      );
      setSearchResults(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error searching for quotes.");
      console.error("Error searching for quotes:", error);
    }
  };

  // Handle form submission for searching quotes
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (author.trim()) {
      searchQuotes(author);
    }
  };

  return (
    <div className="App">
      <h1>Quote of the Day</h1>

      {/* Display Random Quote */}
      <div className="quote-container">
        {quote ? (
          <div>
            <p>"{quote.text}"</p>
            <p>- {quote.author}</p>
          </div>
        ) : (
          <p>Loading random quote...</p>
        )}
      </div>

      {/* Button to fetch a new random quote */}
      <button onClick={fetchRandomQuote}>Get Another Quote</button>

      {/* Error Handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Display Search Results */}
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((quote, index) => (
            <div key={index}>
              <p>"{quote.text}"</p>
              <p>- {quote.author}</p>
            </div>
          ))
        ) : (
          <p>No quotes found for "{author}"</p>
        )}
      </div>
    </div>
  );
}

export default App;
