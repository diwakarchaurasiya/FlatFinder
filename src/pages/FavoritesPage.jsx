import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PropertyCard from '../components/property/PropertyCard';
import { mockProperties } from '../data/mockData';

const FavoritesPage = () => {
  // In a real app, this would come from a context or state management
  // For demo purposes, we'll use the first 3 mock properties as "favorites"
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Set some mock favorites
    const mockFavorites = mockProperties.slice(0, 3).map(prop => ({
      ...prop,
      isFavorite: true
    }));
    setFavorites(mockFavorites);
  }, []);
  
  const removeFavorite = (id) => {
    setFavorites(favorites.filter(property => property.id !== id));
  };
  
  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-800 mb-2">
              Your Favorite Properties
            </h1>
            <p className="text-neutral-600">
              {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
            </p>
          </div>
          
          {favorites.length > 0 && (
            <button 
              onClick={clearAllFavorites}
              className="btn btn-outline flex items-center"
            >
              <FaTrash className="mr-2" /> Clear All
            </button>
          )}
        </div>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <motion.div 
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <PropertyCard property={property} />
                  <button 
                    onClick={() => removeFavorite(property.id)}
                    className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full shadow-sm hover:shadow-md transition-shadow z-10"
                  >
                    <FaHeart className="text-accent-500 text-xl" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-4">
              <FaRegHeart className="text-5xl text-neutral-300" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No favorites yet</h3>
            <p className="text-neutral-600 mb-6">Start saving properties you like to view them later.</p>
            <Link to="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;