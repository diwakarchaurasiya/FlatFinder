import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import PropertyCard from "../property/PropertyCard";
import { mockProperties } from "../../data/mockData";

const PropertyHighlights = ({ title, description, category, limit = 4 }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(300); // default fallback

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 24); // include margin (space-x-6 = 1.5rem = 24px)
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const filteredProperties = category
    ? mockProperties
        .filter((prop) => prop.category === category)
        .slice(0, limit)
    : mockProperties.slice(0, limit);

  return (
    <div ref={ref} className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-secondary-800"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
              className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-600 transition-colors"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-100 hover:text-primary-600 transition-colors"
            >
              <FaArrowRight />
            </button>
            <Link
              to="/properties"
              className="hidden md:flex items-center text-primary-600 hover:text-primary-700 transition-colors ml-4"
            >
              View All <FaArrowRight className="ml-1" />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              ref={index === 0 ? cardRef : null}
              className="min-w-[300px] md:min-w-[320px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/properties"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All Properties <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyHighlights;
