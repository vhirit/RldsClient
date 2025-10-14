
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Grid,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Email,
  VerifiedUser,
  ArrowBack,
  Security,
  LockReset,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const ForgetPassword = ({ onBackToLogin, onResetSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // API base URL - adjust according to your backend
  const API_BASE_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8080';

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
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
    setLoading(true);
    setError('');

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

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
          onResetSuccess();
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

  // Alternative: Handle reset token from URL (for email links)
  const handleResetWithToken = async (token, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully! Redirecting to login...');
        setTimeout(() => {
          onResetSuccess();
        }, 2000);
        return true;
      } else {
        setError(data.error || 'Failed to reset password');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      return false;
    }
  };

  const steps = ['Enter Email', 'Reset Password'];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: 'white',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative'
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Side - Reset Password Form */}
        <Grid item xs={12} md={6} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 4 },
          position: 'relative'
        }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: 450,
            animation: 'slideIn 0.8s ease-out'
          }}>
            
            {/* Back to Login Button */}
            <Button
              startIcon={<ArrowBack />}
              onClick={onBackToLogin}
              sx={{
                color: '#2563eb',
                textTransform: 'none',
                fontWeight: '600',
                mb: 2,
                fontFamily: '"Poppins", sans-serif',
                '&:hover': {
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                }
              }}
            >
              Back to Login
            </Button>

            {/* Centered Logo */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 4,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <Box 
                component="img"
                src="/logo.svg" 
                alt="RLDS Pvt Limited Logo" 
                sx={{ 
                  height: { xs: 50, sm: 60 },
                  width: 'auto',
                  mb: 3
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjAwIDUwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMjU2M2ViIiByeD0iOCIvPjx0ZXh0IHg9IjEwMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJQb3BwaW5zIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2VjdXJlVmVyaWZ5PC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1a202c',
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  mb: 1,
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Reset Your Password
              </Typography>
              <Typography variant="body1" sx={{ 
                color: '#718096', 
                textAlign: 'center',
                fontFamily: '"Poppins", sans-serif',
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                {step === 1 && 'Enter your email to reset your password'}
                {step === 2 && 'Create your new password'}
              </Typography>
            </Box>

            {/* Progress Stepper */}
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{ 
                      '& .MuiStepLabel-label': {
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: '500'
                      }
                    }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Alerts */}
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {/* Step 1: Email Input */}
            {step === 1 && (
              <Box component="form" onSubmit={handleEmailSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: '#2d3748', 
                    mb: 1,
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#a0aec0' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 50,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={<VerifiedUser />}
                  sx={{
                    backgroundColor: '#2563eb',
                    height: 50,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                    fontFamily: '"Poppins", sans-serif',
                    '&:hover': {
                      backgroundColor: '#1d4ed8',
                      boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      backgroundColor: '#cbd5e0',
                    },
                    mb: 3,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </Box>
            )}

            {/* Step 2: Password Reset */}
            {step === 2 && (
              <Box component="form" onSubmit={handlePasswordReset}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: '#2d3748', 
                    mb: 1,
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockReset sx={{ color: '#a0aec0' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#a0aec0' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 50,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: '#2d3748', 
                    mb: 1,
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    Confirm New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockReset sx={{ color: '#a0aec0' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 50,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setStep(1)}
                    sx={{
                      height: 50,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      fontFamily: '"Poppins", sans-serif',
                      borderColor: '#e2e8f0',
                      color: '#4a5568',
                      '&:hover': {
                        borderColor: '#cbd5e0',
                        backgroundColor: '#f7fafc',
                      }
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: '#16a34a',
                      height: 50,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                      fontFamily: '"Poppins", sans-serif',
                      '&:hover': {
                        backgroundColor: '#15803d',
                        boxShadow: '0 6px 20px rgba(22, 163, 74, 0.4)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        backgroundColor: '#cbd5e0',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Box>
              </Box>
            )}

            {/* Help Text */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" sx={{ 
                color: '#64748b',
                fontSize: '0.875rem',
                fontFamily: '"Poppins", sans-serif'
              }}>
                Need help? {' '}
                <Link href="#" sx={{ 
                  color: '#2563eb', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  '&:hover': { textDecoration: 'underline' } 
                }}>
                  Contact Support
                </Link>
              </Typography>
            </Box>

            {/* Copyright Footer */}
            <Box sx={{ 
              textAlign: 'center', 
              mt: 4,
              pt: 3,
              borderTop: '1px solid #e2e8f0'
            }}>
              <Typography variant="body2" sx={{ 
                color: '#64748b',
                fontSize: '0.75rem',
                fontFamily: '"Poppins", sans-serif'
              }}>
                © 2025 RLDS Pvt Limited. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Desktop Template with Dashboard (Hidden on Mobile) */}
        <Grid item xs={12} md={6} sx={{ 
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e40af',
          background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
          position: 'relative',
          overflow: 'hidden',
          p: 3
        }}>
          {/* ... (rest of the right side content remains the same) ... */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;