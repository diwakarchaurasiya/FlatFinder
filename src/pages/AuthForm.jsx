import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaHome,
  FaUser,
  FaPhone,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("tenant");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, userType };
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";
      const response = await axios.post(endpoint, payload);

      const tokenKey = userType === "tenant" ? "tenant_token" : "owner_token";
      localStorage.setItem(tokenKey, response.data.data.token);

      alert(`${isLogin ? "Login" : "Registration"} successful!`);
      reset();
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className=" bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="text-center mb-6">
            <Link
              to="/"
              className="flex items-center justify-center text-2xl font-bold text-secondary-700 mb-2"
            >
              <FaHome className="text-primary-500 mr-2" />
              FlatFinder
            </Link>
            <h2 className="text-xl font-semibold text-secondary-800">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          <div className="flex rounded-md overflow-hidden mb-6">
            <button
              onClick={() => setUserType("tenant")}
              type="button"
              className={`flex-1 py-2 text-sm font-medium ${
                userType === "tenant"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Tenant
            </button>
            <button
              onClick={() => setUserType("owner")}
              type="button"
              className={`flex-1 py-2 text-sm font-medium ${
                userType === "owner"
                  ? "bg-primary-500 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Property Owner
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-neutral-400" />
                  </div>
                  <input
                    {...register("name", { required: !isLogin })}
                    className="w-full border border-neutral-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">Name is required</p>
                )}
              </div>
            )}

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
                  {...register("email", { required: true })}
                  className="w-full border border-neutral-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">Email is required</p>
              )}
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
                  {...register("password", { required: true, minLength: 6 })}
                  className="w-full border border-neutral-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-neutral-400" />
                  </div>
                  <input
                    type="tel"
                    {...register("phone")}
                    className="w-full border border-neutral-300 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-neutral-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

          {userType === "tenant" && isLogin && (
            <div className="mt-4 text-center text-sm text-neutral-600">
              <p>
                Looking to list your property?{" "}
                <button
                  onClick={() => {
                    setUserType("owner");
                    setIsLogin(true);
                  }}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Owner login
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthForm;
