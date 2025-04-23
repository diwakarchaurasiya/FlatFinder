import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaHome, FaUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [userType, setUserType] = useState('tenant');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="text-center mb-6">
            <Link to="/" className="flex items-center justify-center text-2xl font-bold text-secondary-700 mb-2">
              <FaHome className="text-primary-500 mr-2" />
              FlatFinder
            </Link>
            <h2 className="text-xl font-semibold text-secondary-800">Welcome Back</h2>
          </div>

          <div className="flex rounded-md overflow-hidden mb-6">
            <button
              onClick={() => setUserType('tenant')}
              className={`flex-1 py-2 text-sm font-medium ${
                userType === 'tenant'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Tenant
            </button>
            <button
              onClick={() => setUserType('owner')}
              className={`flex-1 py-2 text-sm font-medium ${
                userType === 'owner'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Property Owner
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-neutral-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="form-input pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-neutral-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="form-input pl-10"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 rounded border-neutral-300"
                  />
                  <label className="ml-2 text-neutral-600">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-full py-2">
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-neutral-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
              Sign up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;