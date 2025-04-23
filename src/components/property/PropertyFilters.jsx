import { useState } from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";

const PropertyFilters = ({ onApplyFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    priceRange: [5000, 50000],
    bedrooms: "",
    bathrooms: "",
    furnishing: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = newValue;

    setFilters((prev) => ({
      ...prev,
      priceRange: newPriceRange,
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      priceRange: [5000, 50000],
      bedrooms: "",
      bathrooms: "",
      furnishing: "",
    });
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-3 mb-4">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Search by location, area, or building"
            className="form-input w-full pl-10 py-2"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </div>

        {/* Property Type Dropdown */}
        <select
          value={filters.propertyType}
          onChange={handleInputChange}
          name="propertyType"
          className="form-select w-full sm:w-48 py-2 text-sm"
        >
          <option value="">All Types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="pg">PG Accommodation</option>
        </select>

        {/* Filter Toggle */}
        <button
          className="p-2 w-full sm:w-auto bg-primary-100 text-primary-600 rounded-md hover:bg-primary-200 transition-colors"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FaFilter className="mx-auto" />
        </button>
      </div>

      {/* Expanded Filters */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-neutral-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Bedrooms
              </label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleInputChange}
                className="form-select w-full py-2"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Bathrooms
              </label>
              <select
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleInputChange}
                className="form-select w-full py-2"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Furnishing */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Furnishing
              </label>
              <select
                name="furnishing"
                value={filters.furnishing}
                onChange={handleInputChange}
                className="form-select w-full py-2"
              >
                <option value="">Any</option>
                <option value="unfurnished">Unfurnished</option>
                <option value="semifurnished">Semi-Furnished</option>
                <option value="fullyfurnished">Fully Furnished</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹
              {filters.priceRange[1].toLocaleString()}
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full"
              />
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4 pt-4 border-t border-neutral-200">
            <button
              onClick={clearFilters}
              className="btn btn-outline flex items-center justify-center py-2"
            >
              <FaTimes className="mr-2" /> Clear
            </button>
            <button
              onClick={applyFilters}
              className="btn btn-primary py-2 w-full sm:w-auto"
            >
              Apply Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyFilters;
