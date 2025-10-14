
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  Shield,
  ArrowLeft,
  Users,
  FileText,
  BarChart3,
  CheckCircle2 as CheckCircle
} from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8080';

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    newPassword: false,
    confirmPassword: false
  });
  const [touched, setTouched] = useState({
    email: false,
    newPassword: false,
    confirmPassword: false
  });

  // Prevent page scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (field, value) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'newPassword':
        setNewPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
    setError('');
    setSuccess('');
  };

  const handleBlur = (field, value) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate individual field on blur
    if (!value.trim()) {
      setFieldErrors(prev => ({
        ...prev,
        [field]: true
      }));
    }

    // Special validation for confirmPassword
    if (field === 'confirmPassword' || (field === 'newPassword' && confirmPassword)) {
      if (newPassword !== confirmPassword) {
        setFieldErrors(prev => ({
          ...prev,
          confirmPassword: true
        }));
      }
    }
  };

  const validateEmailStep = () => {
    const errors = {
      email: !email.trim()
    };
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    setTouched(prev => ({ ...prev, email: true }));

    return !errors.email;
  };

  const validatePasswordStep = () => {
    const errors = {
      newPassword: !newPassword.trim(),
      confirmPassword: !confirmPassword.trim() || newPassword !== confirmPassword
    };
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    setTouched(prev => ({ 
      ...prev, 
      newPassword: true, 
      confirmPassword: true 
    }));

    return !errors.newPassword && !errors.confirmPassword;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmailStep()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/customer/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setSuccess('Password reset instructions sent to your email!');
        // Store the reset token if provided in development mode
        if (data.resetToken) {
          setResetToken(data.resetToken);
        }
      } else {
        setError(data.error || 'Failed to send reset instructions');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordStep()) {
      setError('Please fill in all fields correctly');
      return;
    }

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/user/customer/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken, // This should come from the email link in production
          password: newPassword,
          email: email // Include email for additional verification
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleBackToEmail = (e) => {
    e.preventDefault();
    setStep(1);
    setError('');
    setSuccess('');
  };

  // Helper function to determine input border color
  const getInputBorderColor = (fieldName) => {
    if (touched[fieldName] && fieldErrors[fieldName]) {
      return 'border-red-500 focus:border-red-500 focus:ring-red-500';
    }
    return 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  };

  // Mock data for dashboard preview
  const stats = [
    { label: 'Secure Accounts', value: '15,247', color: 'text-blue-600' },
    { label: 'Recovery Success', value: '99.8%', color: 'text-green-600' },
    { label: 'Active Sessions', value: '2,489', color: 'text-yellow-600' },
    { label: 'Support Available', value: '24/7', color: 'text-purple-600' }
  ];

  const steps = ['Enter Email', 'Reset Password'];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
        
        {/* Vertical Divider Line - Only visible on large screens */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* Main divider line */}
            <div className="w-px h-96 bg-gradient-to-b from-transparent via-gray-300/40 to-transparent"></div>
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-96 bg-gradient-to-b from-transparent via-blue-200/20 to-transparent blur-sm"></div>
            {/* Center decorative dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-sm"></div>
          </div>
        </div>
        
        {/* Left Side - Forgot Password Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Secure Account Recovery
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 relative">
            {steps.map((stepLabel, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2 ${
                  step > index + 1 
                    ? 'bg-green-500 text-white' 
                    : step === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step > index + 1 ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  step === index + 1 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepLabel}
                </span>
              </div>
            ))}
            {/* Progress line */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-300 -z-10">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: step === 1 ? '0%' : '100%' }}
              ></div>
            </div>
          </div>

          {/* Forgot Password Form */}
          <form 
            onSubmit={step === 1 ? handleEmailSubmit : handlePasswordReset} 
            className="space-y-6" 
            noValidate
          >
            {/* Error Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Success Messages */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium text-sm">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* Step 1: Email Input */}
            {step === 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${fieldErrors.email ? 'text-red-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    disabled={loading}
                    placeholder="Enter your email address"
                    className={`block w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${getInputBorderColor('email')}`}
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
                
                <div className="mt-4 text-sm text-gray-600 bg-blue-50 rounded-lg p-3">
                  <p>We'll send a password reset link to your email address.</p>
                </div>
              </div>
            )}

            {/* Step 2: Password Reset */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${fieldErrors.newPassword ? 'text-red-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => handleChange('newPassword', e.target.value)}
                      onBlur={(e) => handleBlur('newPassword', e.target.value)}
                      disabled={loading}
                      placeholder="Enter your new password"
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${getInputBorderColor('newPassword')}`}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      {fieldErrors.newPassword && touched.newPassword && (
                        <div className="pr-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
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
                  {fieldErrors.newPassword && touched.newPassword && (
                    <p className="mt-1 text-sm text-red-600">Password is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${fieldErrors.confirmPassword ? 'text-red-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                      disabled={loading}
                      placeholder="Confirm your new password"
                      className={`block w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 bg-white transition-all duration-200 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed ${getInputBorderColor('confirmPassword')}`}
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      {fieldErrors.confirmPassword && touched.confirmPassword && (
                        <div className="pr-3">
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                        className="pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {fieldErrors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {confirmPassword ? 'Passwords do not match' : 'Please confirm your password'}
                    </p>
                  )}
                </div>

                <div className="text-sm text-gray-600 bg-yellow-50 rounded-lg p-3">
                  <p className="font-medium mb-1">Password Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>At least 6 characters long</li>
                    <li>Include letters and numbers</li>
                    <li>Use a combination of uppercase and lowercase</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {step === 1 ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Instructions...</span>
                    </div>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              )}

              {/* Back Button */}
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  disabled={loading}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Email</span>
                </button>
              )}
            </div>

            {/* Back to Login Link */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={handleBackToLogin}
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>
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
          
          {/* Dashboard Preview Container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8">
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Security Center</h3>
                  <p className="text-gray-500 text-sm">Account Recovery Portal</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border border-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Account Security</h4>
                  <p className="text-gray-600 text-sm">Secure password reset in progress</p>
                </div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
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
                      {index === 0 && <Shield className="w-4 h-4 text-blue-600" />}
                      {index === 1 && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {index === 2 && <Users className="w-4 h-4 text-yellow-600" />}
                      {index === 3 && <FileText className="w-4 h-4 text-purple-600" />}
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

            {/* Security Tips */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Security Tips</h4>
              <div className="space-y-2 text-sm text-gray-600">
                {[
                  'Use a strong, unique password',
                  'Enable two-factor authentication',
                  'Regularly update your password',
                  'Never share your credentials'
                ].map((tip, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recovery Status */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 text-sm">Recovery Status</h4>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                {[
                  'Identity verification required',
                  'Email confirmation sent',
                  'Password reset in progress',
                  'Security audit completed'
                ].map((status, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      index < step ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span className={index < step ? 'text-green-600 font-medium' : ''}>
                      {status}
                    </span>
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

export default ForgotPassword;