import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?location=${encodeURIComponent(searchTerm)}`);
    }
  };

  const popularLocations = ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"];

  return (
    <div className="relative h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/7031595/pexels-photo-7031595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Modern apartment building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-secondary-900/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Perfect Home in Tier 3 Cities
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover affordable, quality homes with verified owners and
            transparent listings
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center bg-white p-1 rounded-lg shadow-lg">
              <div className="flex-grow flex items-center p-2 ">
                <FaMapMarkerAlt className="text-primary-500 mr-2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by city, locality or landmark"
                  className="w-full focus:outline-none text-neutral-800"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-500 text-white p-3 rounded-md hover:bg-primary-600 transition-colors"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Popular Locations */}
          <div className="flex flex-wrap items-center">
            <span className="text-white mr-2">Popular:</span>
            {popularLocations.map((location, index) => (
              <button
                key={index}
                onClick={() =>
                  navigate(
                    `/properties?location=${encodeURIComponent(location)}`
                  )
                }
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 hover:bg-white/30 transition-colors"
              >
                {location}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
