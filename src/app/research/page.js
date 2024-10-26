"use client";

import { useState } from "react";
import axios from "axios"; // Import Axios

import "../style/research.css";
import NavBar from "../components/NavBar";
import SearchResult from "../components/searchResult";

function Research() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setData] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' + searchQuery +
            '&key=AIzaSyAKoKeJxRYcPHaBfDSojVDf_zrRQ5L7dh8'
        ).then(response => setData(response.data.items));
    } catch (error) {
      console.error("Error fetching works:", error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="works-container">
        <h2>RESEARCH</h2>
        <input
          type="text"
          placeholder="Search for books..."
          onChange={setSearchQuery}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <div>
          <SearchResult book={bookData} />
        </div>
      </div>
    </div>
  );
}

export default Research;
