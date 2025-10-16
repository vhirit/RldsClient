import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/features/auth/authSlice";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Shield,
  CreditCard,
  Building,
  Users,
  FileText,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Prevent page scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: name === "rememberMe" ? checked : value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
    setLocalError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate individual field on blur
    if (!value.trim()) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: true,
      }));
    }
  };

  const validateForm = () => {
    const errors = {
      email: !credentials.email.trim(),
      password: !credentials.password.trim(),
    };

    setFieldErrors(errors);
    setTouched({
      email: true,
      password: true,
    });

    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setLocalError("Please fill in all required fields");
      return;
    }

    try {
      const result = await dispatch(
        loginUser({
          email: credentials.email,
          password: credentials.password,
        })
      ).unwrap();

      if (result && result.user && result.token) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  // Helper function to determine input border color
  const getInputBorderColor = (fieldName) => {
    if (touched[fieldName] && fieldErrors[fieldName]) {
      return "border-red-500 focus:border-red-500 focus:ring-red-500";
    }
    return "border-gray-300 focus:ring-blue-500 focus:border-blue-500";
  };

  // Mock data for dashboard preview
  const stats = [
    { label: "Total Verifications", value: "1,247", color: "text-blue-600" },
    { label: "Pending Reviews", value: "23", color: "text-yellow-600" },
    { label: "Completed Today", value: "89", color: "text-green-600" },
    { label: "Success Rate", value: "98.5%", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
        {/* Vertical Divider Line - Only visible on large screens */}

        <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex flex-col items-center">
            {/* Top ornament */}
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-2 shadow-md"></div>

            {/* Main line */}
            <div className="w-px h-80 bg-gradient-to-b from-blue-400/50 via-purple-500/50 to-blue-400/50"></div>

            {/* Bottom ornament */}
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-400 rounded-full mt-2 shadow-md"></div>

            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-80 bg-gradient-to-b from-blue-200/20 to-purple-200/20 blur-sm -z-10"></div>
          </div>
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Secure Access to Financial Verification Hub
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Messages */}
            {(isError || localError) && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    {localError || message}
                  </p>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail
                    className={`h-5 w-5 ${
                      fieldErrors.email ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  placeholder="Enter your email address"
                  className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${getInputBorderColor(
                    "email"
                  )}`}
                  required
                />
                {fieldErrors.email && touched.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {fieldErrors.email && touched.email && (
                <p className="mt-1 text-sm text-red-600">Email is required</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 ${
                      fieldErrors.password ? "text-red-500" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${getInputBorderColor(
                    "password"
                  )}`}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  {fieldErrors.password && touched.password && (
                    <div className="pr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {fieldErrors.password && touched.password && (
                <p className="mt-1 text-sm text-red-600">
                  Password is required
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={isLoading}
              className="
    w-full
    bg-gradient-to-r from-blue-600 to-indigo-600
    hover:from-blue-700 hover:to-indigo-700
    text-white px-6 py-3 rounded-xl font-semibold
    flex items-center justify-center gap-2
    shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
  "
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Copyright */}
            <div className="pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-xs">
                © 2025 RLDS Pvt Limited. All rights reserved.
              </p>
            </div>
          </form>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div className="hidden lg:block relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl p-6 min-h-[600px]">
          {/* Background Decorations */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>

          {/* Dashboard Preview Container - Shadow Removed */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 ">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Verification Hub
                  </h3>
                  <p className="text-gray-500 text-sm">RLDS Dashboard v2.1</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  RR
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Welcome Back</h4>
                  <p className="text-gray-600 text-sm">
                    Ready to continue your work
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-blue-50`}>
                      {index === 0 && (
                        <Users className="w-4 h-4 text-blue-600" />
                      )}
                      {index === 1 && (
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      )}
                      {index === 2 && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                      {index === 3 && (
                        <BarChart3 className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <p className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-gray-600 text-xs font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                Quick Actions
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {["Verify Document", "New Scan", "Generate Report"].map(
                  (action, index) => (
                    <button
                      key={index}
                      className="bg-white text-blue-600 text-xs font-semibold py-2 px-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                    >
                      {action}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Recent Activity Preview */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">
                  Recent Activity
                </h4>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                {[
                  "Document #INV-001 verified",
                  "New verification request received",
                  "Report generated for Client A",
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-xs text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-300 rounded-full"></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce animation-delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
