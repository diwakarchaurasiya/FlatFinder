import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-secondary-800 mb-6">Page Not Found</h2>
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="btn btn-primary flex items-center justify-center">
              <FaHome className="mr-2" /> Go to Homepage
            </Link>
            <Link to="/properties" className="btn btn-outline flex items-center justify-center">
              <FaSearch className="mr-2" /> Search Properties
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;