import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaRupeeSign,
} from "react-icons/fa";
import PropertyBadge from "./PropertyBadge";
import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card rounded-md"
    >
      <div className="relative">
        <Link to={`/property/${property.id}`}>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        </Link>
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-md shadow-sm hover:shadow-md transition-shadow"
        >
          {isFavorite ? (
            <FaHeart className="text-accent-500 text-xl" />
          ) : (
            <FaRegHeart className="text-neutral-500 text-xl" />
          )}
        </button>
        {property.badges && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {property.badges.map((badge, index) => (
              <PropertyBadge key={index} type={badge} />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold text-secondary-800 mb-1 hover:text-primary-500 transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center text-neutral-500 text-sm mb-3">
          <span>{property.location}</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex items-center text-primary-600 font-semibold">
            <FaRupeeSign className="mr-1" />
            <span>{property.price.toLocaleString()}</span>
            {property.isRent && (
              <span className="text-neutral-500 font-normal text-sm ml-1">
                /month
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-between text-sm text-neutral-600">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-1" />
            <span>{property.sqft} sq.ft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
