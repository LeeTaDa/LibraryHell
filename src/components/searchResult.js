"use client";
import "../style/searchResult.css";

const SearchResult = ({ book }) => {
  return (
    <>
      {book.map((item) => {
        let thumbnail = item.volumeInfo.imageLinks.thumbnail;
        let title = item.volumeInfo.title;
        let authors = item.volumeInfo.authors;
        return (
            <div className="search-result">
              <div className="thumbnail-container">
                <img src={thumbnail} alt={title} className="thumbnail" />
              </div>
              <div className="info-container">
                <h3 className="book-title">{title}</h3>
                <p className="book-authors">{authors.join(', ')}</p>
              </div>
            </div>
          )
      })}
    </>
  );
};

export default SearchResult;
