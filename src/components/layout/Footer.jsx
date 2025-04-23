import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">FlatFinder</h3>
            <p className="text-neutral-300 mb-4">
              Finding your perfect home in tier 3 cities made simple, transparent, and hassle-free.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-neutral-300 hover:text-primary-400 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=pg" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  PG Accommodations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary-400 mt-1 mr-3" />
                <span className="text-neutral-300">123 Main Street, Jaipur, Rajasthan 302001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary-400 mr-3" />
                <span className="text-neutral-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary-400 mr-3" />
                <span className="text-neutral-300">info@flatfinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-neutral-700" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} FlatFinder. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-neutral-400 hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-neutral-400 hover:text-primary-400 transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;