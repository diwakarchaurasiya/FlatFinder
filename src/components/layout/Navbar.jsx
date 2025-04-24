import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const tenantToken = localStorage.getItem("tenant_token");
    const ownerToken = localStorage.getItem("owner_token");
    setIsAuthenticated(!!tenantToken || !!ownerToken);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("tenant_token");
    localStorage.removeItem("owner_token");
    setIsAuthenticated(false);
    alert("Logged out successfully!");
    // Optional: navigate to login page or home
    // window.location.href = "/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-secondary-700 text-2xl font-heading font-bold">
            Flat<span className="text-primary-500">Finder</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-neutral-800 hover:text-primary-500 ${
              location.pathname === "/" ? "font-medium text-primary-500" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={`text-neutral-800 hover:text-primary-500 ${
              location.pathname === "/properties"
                ? "font-medium text-primary-500"
                : ""
            }`}
          >
            Properties
          </Link>
          <Link
            to="/contact"
            className={`text-neutral-800 hover:text-primary-500 ${
              location.pathname === "/contact"
                ? "font-medium text-primary-500"
                : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Side for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/properties"
            className="text-neutral-800 hover:text-primary-500"
          >
            <FaSearch className="text-lg" />
          </Link>
          <Link
            to="/favorites"
            className="text-neutral-800 hover:text-primary-500"
          >
            <FaHeart className="text-lg" />
          </Link>
          {isAuthenticated ? (
            <button className="btn btn-primary w-full" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary w-full">Sign In</button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-neutral-800 focus:outline-none z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pt-24 flex flex-col space-y-5">
          <Link
            to="/"
            className={`text-neutral-800 py-2 text-lg ${
              location.pathname === "/" ? "font-medium text-primary-500" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/properties"
            className={`text-neutral-800 py-2 text-lg ${
              location.pathname === "/properties"
                ? "font-medium text-primary-500"
                : ""
            }`}
          >
            Properties
          </Link>
          <Link
            to="/contact"
            className={`text-neutral-800 py-2 text-lg ${
              location.pathname === "/contact"
                ? "font-medium text-primary-500"
                : ""
            }`}
          >
            Contact
          </Link>
          <Link
            to="/favorites"
            className={`text-neutral-800 py-2 text-lg ${
              location.pathname === "/favorites"
                ? "font-medium text-primary-500"
                : ""
            }`}
          >
            Favorites
          </Link>
          {isAuthenticated ? (
            <button className="btn btn-primary w-full" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-primary w-full">Sign In</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
