import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import PropertyCard from "../property/PropertyCard";
import { mockProperties } from "../../data/mockData";
import axios from "axios";

const PropertyHighlights = ({ title, description, category, limit = 4 }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300); // default card width
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties?limit=5"
        );

        if (res.data?.success && Array.isArray(res.data.data)) {
          setProperties(res.data.data);
        } else {
          throw new Error("Unexpected API response structure");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Could not load property highlights.");
        setProperties(mockProperties); // fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Determine card width for scroll
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 24); // 24px margin
    }
  }, []);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -cardWidth, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: cardWidth, behavior: "smooth" });

  const filtered = category
    ? properties.filter((p) => p.category === category).slice(0, limit)
    : properties.slice(0, limit);

  return (
    <div ref={ref} className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-secondary-800"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-neutral-600 mt-2"
              >
                {description}
              </motion.p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-neutral-100 hover:bg-primary-100 text-neutral-700 hover:text-primary-600"
            >
              <FaArrowRight />
            </button>
            <Link
              to="/properties"
              className="hidden md:flex items-center text-primary-600 hover:text-primary-700 ml-4"
            >
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        {/* Property Cards */}
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : (
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((property, index) => (
              <div
                key={property._id || index}
                ref={index === 0 ? cardRef : null}
                className="min-w-[300px] md:min-w-[320px]"
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile "View All" link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/properties"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            View All Properties <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyHighlights;
