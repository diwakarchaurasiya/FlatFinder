import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("tenant");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, userType });
    // Handle authentication logic here
    reset();
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  const toggleUserType = () => {
    setUserType(userType === "tenant" ? "owner" : "tenant");
    reset();
  };

  return (
    <div className=" bg-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with tabs */}
        <div className="flex border-b border-neutral-200">
          <button
            onClick={toggleUserType}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              userType === "tenant"
                ? "bg-primary-500 text-white"
                : "bg-white text-primary-700 hover:bg-primary-50"
            }`}
          >
            Tenant
          </button>
          <button
            onClick={toggleUserType}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              userType === "owner"
                ? "bg-primary-500 text-white"
                : "bg-white text-primary-700 hover:bg-primary-50"
            }`}
          >
            Property Owner
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-primary-700 mb-6 text-center">
            {isLogin ? "Sign In" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Name
                </label>
                <input
                  {...register("name", { required: !isLogin })}
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">Name is required</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
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
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full border border-neutral-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  {isLogin
                    ? "New to our platform?"
                    : "Already have an account?"}
                </span>
              </div>
            </div>

            <button
              onClick={toggleAuthMode}
              className="mt-4 w-full bg-white border border-neutral-300 rounded-md py-2 px-4 text-primary-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              {isLogin ? "Create Account" : "Sign In Instead"}
            </button>

            {userType === "tenant" && isLogin && (
              <div className="mt-6 text-center text-sm text-neutral-600">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
