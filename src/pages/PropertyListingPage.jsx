import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaFilter, FaMap, FaList } from "react-icons/fa";
import { motion } from "framer-motion";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilters from "../components/property/PropertyFilters";
import { mockProperties } from "../data/mockData";
import axios from "axios";

const PropertyListingPage = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");

  const locationParam = searchParams.get("location");
  const propertyTypeParam = searchParams.get("type");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchAndProcessProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/properties?limit=5"
        );
        let fetchedProps = res.data.data || [];

        // Apply filters
        if (locationParam) {
          fetchedProps = fetchedProps.filter((prop) =>
            `${prop.city}, ${prop.state}`
              .toLowerCase()
              .includes(locationParam.toLowerCase())
          );
        }

        if (propertyTypeParam) {
          fetchedProps = fetchedProps.filter(
            (prop) => prop.type === propertyTypeParam
          );
        }

        // Apply sorting
        const sortedProps = sortProperties(fetchedProps, sortBy);
        setProperties(sortedProps);
      } catch (err) {
        setError("Failed to fetch properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessProperties();
  }, [locationParam, propertyTypeParam, sortBy]);

  const sortProperties = (props, sortKey) => {
    switch (sortKey) {
      case "lowToHigh":
        return [...props].sort((a, b) => a.rent - b.rent);
      case "highToLow":
        return [...props].sort((a, b) => b.rent - a.rent);
      case "newest":
        return [...props].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "recommended":
      default:
        return props; // or some other logic
    }
  };

  const handleApplyFilters = (filters) => {
    let filteredProps = [...mockProperties];

    const location = filters.location || locationParam;
    if (location) {
      filteredProps = filteredProps.filter((prop) =>
        prop.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (filters.propertyType) {
      filteredProps = filteredProps.filter(
        (prop) => prop.category === filters.propertyType
      );
    }

    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      filteredProps = filteredProps.filter((prop) => {
        if (filters.bedrooms === "4+") {
          return prop.bedrooms >= 4;
        }
        return prop.bedrooms === bedroomCount;
      });
    }

    if (filters.bathrooms) {
      const bathroomCount = parseInt(filters.bathrooms);
      filteredProps = filteredProps.filter((prop) => {
        if (filters.bathrooms === "4+") {
          return prop.bathrooms >= 4;
        }
        return prop.bathrooms === bathroomCount;
      });
    }

    if (filters.priceRange) {
      filteredProps = filteredProps.filter(
        (prop) =>
          prop.price >= filters.priceRange[0] &&
          prop.price <= filters.priceRange[1]
      );
    }

    sortProperties(filteredProps, sortBy);
  };

  useEffect(() => {
    handleApplyFilters({
      location: locationParam,
      propertyType: propertyTypeParam,
    });
  }, [locationParam, propertyTypeParam]);

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-secondary-800 mb-2">
            {locationParam
              ? `Properties in ${locationParam}`
              : propertyTypeParam
              ? `${
                  propertyTypeParam.charAt(0).toUpperCase() +
                  propertyTypeParam.slice(1)
                }s for Rent`
              : "All Properties"}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-neutral-600">
              {properties.length} properties available
            </p>
            <div className="flex items-center gap-3 text-sm">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select py-2  "
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>

        <PropertyFilters onApplyFilters={handleApplyFilters} />

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div key={property.id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">
              No properties found
            </h3>
            <p className="text-neutral-600 mb-4">
              Try adjusting your search filters to find more properties.
            </p>
            <Link to="/properties" className="btn btn-primary">
              View All Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingPage;
