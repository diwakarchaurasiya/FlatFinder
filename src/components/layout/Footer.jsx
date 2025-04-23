import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-primary-400">
              FlatFinder
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base mb-4">
              <span className="block sm:hidden">
                Simple home rentals for tier 3 cities.
              </span>
              <span className="hidden sm:block">
                Finding your perfect home in tier 3 cities made simple,
                transparent, and hassle-free.
              </span>
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-primary-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                { label: "Home", path: "/" },
                { label: "Properties", path: "/properties" },
                { label: "Favorites", path: "/favorites" },
                { label: "Contact Us", path: "/contact" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-primary-400">
              Property Types
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                ["Apartments", "apartment"],
                ["Houses", "house"],
                ["Villas", "villa"],
                ["PG Accommodations", "pg"],
              ].map(([label, type]) => (
                <li key={type}>
                  <Link
                    to={`/properties?type=${type}`}
                    className="text-neutral-300 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-primary-400">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-300 mt-1 mr-3" />
                <span className="text-neutral-300">
                  <span className="block sm:hidden">Jaipur, RJ</span>
                  <span className="hidden sm:block">
                    123 Main Street, Jaipur, Rajasthan 302001
                  </span>
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary-300 mr-3" />
                <span className="text-neutral-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-300 mr-3" />
                <span className="text-neutral-300">info@flatfinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-primary-800" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-xs sm:text-sm mb-4 md:mb-0">
            &copy; {currentYear} FlatFinder. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs sm:text-sm">
            {["terms", "privacy", "faq"].map((route) => (
              <Link
                key={route}
                to={`/${route}`}
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                {route.charAt(0).toUpperCase() +
                  route.slice(1).replace("-", " ")}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
