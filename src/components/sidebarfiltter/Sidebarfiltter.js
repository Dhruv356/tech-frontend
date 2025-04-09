import React, { useState } from "react";
import "./sidebarfiltter.css"; // ✅ Make sure you have this CSS file
import { FaFilter } from "react-icons/fa"; // Import filter icon
const SidebarFilter = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [inStock, setInStock] = useState(false);

  const handleApplyFilters = () => {
    onFilterChange({ priceRange, brand, rating, inStock });
    setShowFilters(false); // ✅ Close filter modal after applying
  };

  return (
    <>
      {/* Filter Button */}
      <button className="filter-button" onClick={() => setShowFilters(true)}>
      <FaFilter size={18} /> Filter
      </button>

      {/* Filter Sidebar (Modal Style) */}
      {showFilters && (
        <div className="filter-overlay">
          <div className="filter-sidebar">
            <button className="close-btn" onClick={() => setShowFilters(false)}>
              ✖
            </button>
            <h3>Filters</h3>

            {/* Price Range */}
            <div className="filter-group">
              <label>Price Range</label>
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              />
              <p>₹{priceRange[0]} - ₹{priceRange[1]}</p>
            </div>

            {/* Brand */}
            {/* <div className="filter-group">
              <label>Brand</label>
              <input
                type="text"
                placeholder="Enter brand name"
                onChange={(e) => setBrand(e.target.value)}
              />
            </div> */}

            {/* Rating */}
            <div className="filter-group">
              <label>Minimum Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
              </select>
            </div>

            {/* Stock Availability */}
            <div className="filter-group">
              <label>
                <input type="checkbox" onChange={(e) => setInStock(e.target.checked)} />
                Only show in-stock items
              </label>
            </div>

            <button className="apply-filters-btn" onClick={handleApplyFilters}>Apply Filters</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarFilter;
