
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
      isValid = false;
    }
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate all required fields
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // Additional validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setFieldErrors(prev => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setFieldErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters'
      }));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/customer/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Registration successful! Please check your email for verification instructions.');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
        setFieldErrors({});
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  // Helper function to get input border color based on validation
  const getInputBorderColor = (fieldName) => {
    return fieldErrors[fieldName] 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-xl scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-50">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex bg-gradient-to-br from-blue-600 to-indigo-700 p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col justify-center w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                  Join SecureVerify
                </h1>
                <p className="text-blue-100 text-lg">
                  Enterprise-grade security for your digital identity
                </p>
              </div>

              {/* Dashboard Illustration */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="bg-white rounded-lg p-4">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">SV</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">New Registration</h3>
                        <p className="text-xs text-gray-500">Account setup in progress</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: 'Total Users', value: '12.4K', color: 'bg-blue-500' },
                      { label: 'Active Now', value: '1.2K', color: 'bg-green-500' },
                      { label: 'Verified', value: '98.5%', color: 'bg-indigo-500' },
                      { label: 'Security', value: '100%', color: 'bg-emerald-500' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            <p className="text-xs text-gray-600">{stat.label}</p>
                          </div>
                          <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white text-xs">✓</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Profile Completion</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full w-3/5"></div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-2">
                    {['Verify Identity', 'Security Setup', 'Complete Profile'].map((action, index) => (
                      <button
                        key={index}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all duration-200"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-white">
                {[
                  { icon: '🔒', text: 'Bank-level Security' },
                  { icon: '⚡', text: 'Instant Verification' },
                  { icon: '🌐', text: 'Global Access' },
                  { icon: '📱', text: 'Mobile Friendly' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-lg">{feature.icon}</span>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="p-8 lg:p-12 flex items-center justify-center">
            <div className="w-full max-w-sm">
              {/* Logo and Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">SV</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of secure users worldwide
                </p>
              </div>

              {/* Alert Messages */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-sm">!</span>
                  </div>
                  <p className="text-red-700 text-sm flex-1">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                  <p className="text-green-700 text-sm flex-1">{success}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">👤</span>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('firstName')}`}
                        placeholder="First name"
                      />
                    </div>
                    {fieldErrors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">👤</span>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('lastName')}`}
                        placeholder="Last name"
                      />
                    </div>
                    {fieldErrors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📧</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('email')}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">📱</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('phone')}`}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🔒</span>
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('password')}`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <span className="text-gray-400 hover:text-gray-600">
                          {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">🔒</span>
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 ${getInputBorderColor('confirmPassword')}`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <span className="text-gray-400 hover:text-gray-600">
                          {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={handleLoginClick}
                      className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  © 2025 SecureVerify. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;