import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbar.css";

const SearchBar = () => {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchWord.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchWord)}`);
    }
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <button type="submit">
        <ion-icon name="search-outline" className="search-icon"></ion-icon>
      </button>
    </form>
  );
};

export default SearchBar;
