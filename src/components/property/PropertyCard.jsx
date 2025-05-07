import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaRupeeSign } from "react-icons/fa";
import PropertyBadge from "./PropertyBadge";
import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const firstImage =
    property.images?.[0]?.url || "https://via.placeholder.com/400x300";
  const badge = property.uploadedBy?.badge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card rounded-md shadow hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <Link to={`/property/${property._id}`}>
          <img
            src={firstImage}
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-md"
          />
        </Link>
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-md shadow-sm hover:shadow-md transition-shadow"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-neutral-500 text-xl" />
          )}
        </button>
        {badge && (
          <div className="absolute bottom-3 left-3">
            <PropertyBadge type={badge} />
          </div>
        )}
      </div>

      <div className="p-4">
        <Link to={`/property/${property._id}`}>
          <h3 className="text-lg font-semibold text-secondary-800 mb-1 hover:text-primary-500 transition-colors">
            {property.title}
          </h3>
        </Link>
        <p className="text-neutral-500 text-sm mb-1">
          {property.address}, {property.city}
        </p>
        <div className="text-primary-600 font-semibold text-md mb-2 flex items-center">
          <FaRupeeSign className="mr-1" />
          <span>{property.rent.toLocaleString()}</span>
          <span className="text-neutral-500 font-normal text-sm ml-1">
            /month
          </span>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2">
          {property.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-neutral-700">
          {property.amenities?.map((amenity, i) => (
            <span key={i} className="px-2 py-1 bg-neutral-100 rounded-full">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
