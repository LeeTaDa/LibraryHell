import "../style/searchResultList.css";
import { SearchResult } from "./searchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        return <SearchResult result={result.name} id={result.id} key={result.id} />;
      })}
    </div>
  );
};