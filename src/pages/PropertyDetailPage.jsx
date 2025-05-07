import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRupeeSign,
  FaPhone,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import PropertyBadge from "../components/property/PropertyBadge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        if (res.data.success && res.data.data) {
          const raw = res.data.data;

          // Normalize structure for compatibility
          const formatted = {
            id: raw._id,
            title: raw.title,
            description: raw.description,
            location: `${raw.address}, ${raw.city}, ${raw.state}`,
            price: raw.rent,
            isRent: true,
            badges: [raw.type, raw.badge || raw.uploadedBy?.badge].filter(
              Boolean
            ),
            bedrooms: raw.bedrooms || 1,
            bathrooms: raw.bathrooms || 1,
            sqft: raw.sqft || 500,
            availableFrom: raw.createdAt,
            furnished: raw.furnished || "Unfurnished",
            amenities: raw.amenities || [],
            images: raw.images.map((img) => img.url),
            owner: {
              name: raw.uploadedBy?.name || "Owner",
              contact: raw.uploadedBy?.email || "N/A",
              responseTime: "1–2 hours",
            },
          };

          setProperty(formatted);
        } else {
          throw new Error("Invalid property data.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load property. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleContact = () => setIsContactVisible(!isContactVisible);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-64 bg-neutral-200 rounded mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
          {error}
        </h2>
        <p className="text-neutral-600 mb-6">
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/properties" className="btn btn-primary">
          Browse Properties
        </Link>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="text-sm text-neutral-500 mb-4">
          <Link to="/" className="hover:text-primary-500">
            Home
          </Link>
          {" > "}
          <Link to="/properties" className="hover:text-primary-500">
            Properties
          </Link>
          {" > "}
          <span className="text-neutral-700">{property.title}</span>
        </div>

        {/* Title + Price */}
        <div className="flex flex-wrap justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-neutral-600 mb-2">
              <FaMapMarkerAlt className="mr-1" />
              <span>{property.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {property.badges.map((badge, i) => (
                <PropertyBadge key={i} type={badge} />
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0 text-xl md:text-2xl font-bold text-primary-600 flex items-center">
            <FaRupeeSign className="mr-1" />
            {property.price.toLocaleString()}
            {property.isRent && (
              <span className="text-neutral-500 font-normal text-base ml-1">
                /month
              </span>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="mb-8">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="rounded-lg overflow-hidden aspect-[9/16] md:aspect-auto h-auto md:h-[500px]"
          >
            {property.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  src={img}
                  alt={`Image ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Quick Info */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: FaBed, label: "Bedrooms", value: property.bedrooms },
                  {
                    icon: FaBath,
                    label: "Bathrooms",
                    value: property.bathrooms,
                  },
                  {
                    icon: FaRulerCombined,
                    label: "Sq. Ft.",
                    value: property.sqft,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center p-4 border-r last:border-r-0 border-neutral-200"
                  >
                    <div className="flex flex-col items-center">
                      <item.icon className="text-2xl text-primary-500 mb-2" />
                      <div>
                        <div className="font-semibold text-lg">
                          {item.value}
                        </div>
                        <div className="text-neutral-500 text-sm">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">
                Description
              </h2>
              <p className="text-neutral-700 mb-4">{property.description}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-primary-500 mr-2" />
                  <div>
                    <div className="text-sm text-neutral-500">
                      Available From
                    </div>
                    <div className="font-medium">
                      {new Date(property.availableFrom).toLocaleDateString(
                        "en-IN"
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-primary-500 mr-2" />
                  <div>
                    <div className="text-sm text-neutral-500">Furnishing</div>
                    <div className="font-medium">{property.furnished}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-secondary-800 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">
                Contact Owner
              </h3>
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mr-3">
                  {property.owner.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{property.owner.name}</div>
                  <div className="text-sm text-neutral-500">Property Owner</div>
                </div>
              </div>
              <div className="text-sm text-neutral-600 mt-2">
                <span>Response Time: </span>
                <span className="text-green-600 font-medium">
                  {property.owner.responseTime}
                </span>
              </div>

              {isContactVisible ? (
                <div className="animate-fade-in mt-4">
                  <div className="bg-neutral-50 p-3 rounded-md mb-4">
                    <div className="text-sm text-neutral-500 mb-1">
                      Contact Email
                    </div>
                    <div className="font-medium text-secondary-800 flex items-center">
                      <FaPhone className="mr-2 text-primary-500" />
                      <a href={`mailto:${property.owner.contact}`}>
                        {property.owner.contact}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={toggleContact}
                    className="btn btn-outline w-full"
                  >
                    Hide Contact
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleContact}
                  className="btn btn-primary w-full mb-4 flex items-center justify-center"
                >
                  <FaPhone className="mr-2" /> Show Contact
                </button>
              )}

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={toggleFavorite}
                  className="flex-1 flex items-center justify-center p-2 border border-primary-200 rounded-md text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  {isFavorite ? (
                    <FaHeart className="mr-2" />
                  ) : (
                    <FaRegHeart className="mr-2" />
                  )}
                  {isFavorite ? "Saved" : "Save"}
                </button>
                <button className="flex-1 flex items-center justify-center p-2 border border-primary-200 rounded-md text-primary-600 hover:bg-primary-50 transition-colors">
                  <FaShareAlt className="mr-2" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
