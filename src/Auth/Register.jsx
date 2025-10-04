
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Phone,
  Person,
  VerifiedUser,
  Warning,
  CheckCircle,
  BarChart,
  PieChart,
  TrendingUp,
  Notifications
} from '@mui/icons-material';

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = 'http://localhost:8080';
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

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
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

  // Color palette using your specified colors
  const colors = {
    primary: '#2274A5',
    secondary: '#37AFE1',
    lightBg: '#f8fafc',
    white: '#ffffff',
    textDark: '#1a202c',
    textLight: '#718096',
    border: '#e2e8f0'
  };

  // Mock data for banking verification dashboard
  const verificationStats = [
    { label: 'Total Verifications', value: '1,247', icon: <VerifiedUser />, color: colors.primary },
    { label: 'Pending Reviews', value: '23', icon: <Warning />, color: colors.secondary },
    { label: 'Completed Today', value: '89', icon: <CheckCircle />, color: colors.primary },
    { label: 'Success Rate', value: '98.5%', icon: <BarChart />, color: colors.secondary }
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: colors.white,
      background: `linear-gradient(135deg, ${colors.lightBg} 0%, #e2e8f0 100%)`,
      position: 'relative'
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Side - Desktop Dashboard (Hidden on Mobile) */}
        <Grid item xs={12} md={7} sx={{ 
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.primary,
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          p: 3
        }}>
          
          {/* Background Elements */}
          <Box sx={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }} />
          
          <Box sx={{
            position: 'absolute',
            bottom: -150,
            right: -150,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            zIndex: 1,
          }} />

          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
            `,
            zIndex: 2,
          }} />

          {/* Main Content */}
          <Box sx={{ 
            position: 'relative', 
            zIndex: 3, 
            width: '100%', 
            maxWidth: 500,
            color: 'white',
            textAlign: 'center'
          }}>
            
            {/* Header with Catchy Lines */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: '2rem',
                lineHeight: 1.2,
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                Join Our Secure Platform
              </Typography>
              <Typography variant="h4" sx={{ 
                opacity: 0.9,
                fontSize: '1rem',
                lineHeight: 1.4,
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 300,
                mb: 2
              }}>
                Start your journey with enterprise-grade security
              </Typography>
            </Box>

            {/* Desktop/Monitor Card */}
            <Box sx={{
              backgroundColor: colors.white,
              borderRadius: 2,
              padding: 1.5,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              border: `2px solid ${colors.border}`,
              maxWidth: 450,
              margin: '0 auto',
              position: 'relative'
            }}>
              
              {/* Monitor Top Bar */}
              <Box sx={{
                height: 20,
                backgroundColor: colors.lightBg,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                display: 'flex',
                alignItems: 'center',
                px: 1.5,
                mb: 1.5
              }}>
                <Box sx={{ display: 'flex', gap: 0.4 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.primary }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.secondary }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
                </Box>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight, 
                  fontWeight: 'medium',
                  mx: 'auto',
                  fontSize: '0.7rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  RLDS Pvt Limited Dashboard v2.1
                </Typography>
              </Box>

              {/* Dashboard Content Inside Monitor */}
              <Box sx={{ 
                backgroundColor: colors.lightBg,
                borderRadius: 1.5,
                p: 1,
                minHeight: 250
              }}>
                
                {/* Profile Container */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '6px 10px',
                  backgroundColor: colors.white,
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '10px'
                }}>
                  <Box sx={{ 
                    width: 30, 
                    height: 30, 
                    borderRadius: '50%',
                    marginRight: '6px',
                    background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    NR
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '12px',
                      fontWeight: '600',
                      color: colors.textDark,
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      New Registration
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontSize: '10px',
                      color: colors.textLight,
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      Account Setup in Progress
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%',
                    background: colors.secondary,
                    marginLeft: '3px'
                  }} />
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={0.8} sx={{ mb: 1.5 }}>
                  {verificationStats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Card sx={{ 
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 1,
                        p: 0.4,
                        height: '100%',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                      }}>
                        <CardContent sx={{ p: '3px !important', display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            backgroundColor: `${stat.color}15`, 
                            borderRadius: 0.5, 
                            p: 0.4,
                            mr: 0.6 
                          }}>
                            {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 14 } })}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 'bold', 
                              color: stat.color,
                              fontSize: '0.9rem',
                              lineHeight: 1,
                              fontFamily: '"Poppins", sans-serif'
                            }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: colors.textLight, 
                              fontSize: '0.6rem',
                              lineHeight: 1,
                              fontFamily: '"Poppins", sans-serif'
                            }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* Quick Actions */}
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center', mt: 2 }}>
                  {['Verify', 'Scan', 'Report'].map((action) => (
                    <Button
                      key={action}
                      size="small"
                      sx={{
                        color: colors.primary,
                        backgroundColor: `${colors.primary}10`,
                        border: `1px solid ${colors.primary}30`,
                        borderRadius: 1,
                        p: 0.5,
                        minWidth: 'auto',
                        fontSize: '0.5rem',
                        fontWeight: '600',
                        '&:hover': {
                          backgroundColor: colors.primary,
                          color: colors.white
                        }
                      }}
                    >
                      {action}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Monitor Stand */}
              <Box sx={{
                width: 60,
                height: 12,
                backgroundColor: colors.border,
                margin: '0 auto',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                mt: 0.8
              }} />
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Register Form */}
        <Grid item xs={12} md={5} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 3 },
          position: 'relative'
        }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: 400
          }}>
            
            {/* Centered Logo */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 3,
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
                  height: { xs: 45, sm: 50 },
                  width: 'auto',
                  mb: 2
                }}
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="200" height="50" viewBox="0 0 200 50">
                      <rect width="200" height="50" fill="${colors.primary}" rx="8"/>
                      <text x="100" y="30" font-family="Poppins" font-size="18" fill="white" text-anchor="middle">SecureVerify</text>
                    </svg>
                  `)}`;
                }}
              />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: colors.textDark,
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  mb: 1,
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Create Account
              </Typography>
              <Typography variant="body1" sx={{ 
                color: colors.textLight, 
                textAlign: 'center',
                fontFamily: '"Poppins", sans-serif',
                mb: 2,
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Join our secure verification platform
              </Typography>
            </Box>

            {/* Register Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: '0.8rem' }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2, borderRadius: 2, fontSize: '0.8rem' }}>
                  {success}
                </Alert>
              )}

              {/* Name Fields */}
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: colors.textDark, 
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: colors.textLight, fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 42,
                        backgroundColor: colors.white,
                        borderRadius: 1.5,
                        fontSize: '0.9rem',
                        '& fieldset': {
                          borderColor: colors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: colors.textDark, 
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: colors.textLight, fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 42,
                        backgroundColor: colors.white,
                        borderRadius: 1.5,
                        fontSize: '0.9rem',
                        '& fieldset': {
                          borderColor: colors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Email Field */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: '600', 
                  color: colors.textDark, 
                  mb: 0.5,
                  fontSize: '0.8rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: colors.textLight, fontSize: '1rem' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 42,
                      backgroundColor: colors.white,
                      borderRadius: 1.5,
                      fontSize: '0.9rem',
                      '& fieldset': {
                        borderColor: colors.border,
                      },
                      '&:hover fieldset': {
                        borderColor: colors.secondary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.primary,
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </Box>

              {/* Phone Field */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: '600', 
                  color: colors.textDark, 
                  mb: 0.5,
                  fontSize: '0.8rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: colors.textLight, fontSize: '1rem' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 42,
                      backgroundColor: colors.white,
                      borderRadius: 1.5,
                      fontSize: '0.9rem',
                      '& fieldset': {
                        borderColor: colors.border,
                      },
                      '&:hover fieldset': {
                        borderColor: colors.secondary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.primary,
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </Box>

              {/* Password Fields */}
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: colors.textDark, 
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: colors.textLight, fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: colors.textLight, padding: '4px' }}
                          >
                            {showPassword ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 42,
                        backgroundColor: colors.white,
                        borderRadius: 1.5,
                        fontSize: '0.9rem',
                        '& fieldset': {
                          borderColor: colors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ 
                    fontWeight: '600', 
                    color: colors.textDark, 
                    mb: 0.5,
                    fontSize: '0.8rem',
                    fontFamily: '"Poppins", sans-serif'
                  }}>
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: colors.textLight, fontSize: '1rem' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: colors.textLight, padding: '4px' }}
                          >
                            {showConfirmPassword ? <VisibilityOff sx={{ fontSize: '1rem' }} /> : <Visibility sx={{ fontSize: '1rem' }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        height: 42,
                        backgroundColor: colors.white,
                        borderRadius: 1.5,
                        fontSize: '0.9rem',
                        '& fieldset': {
                          borderColor: colors.border,
                        },
                        '&:hover fieldset': {
                          borderColor: colors.secondary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.primary,
                          borderWidth: 2,
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Terms and Conditions */}
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      size="small"
                      sx={{
                        color: colors.primary,
                        '&.Mui-checked': {
                          color: colors.primary,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ 
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: '0.8rem'
                    }}>
                      I agree to the{' '}
                      <Link href="#" sx={{ color: colors.primary, textDecoration: 'none', fontSize: '0.8rem' }}>
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="#" sx={{ color: colors.primary, textDecoration: 'none', fontSize: '0.8rem' }}>
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                />
              </Box>

              {/* Register Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: colors.primary,
                  height: 42,
                  borderRadius: 1.5,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  boxShadow: `0 4px 12px ${colors.primary}40`,
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': {
                    backgroundColor: colors.primary,
                    filter: 'brightness(0.9)',
                    boxShadow: `0 6px 20px ${colors.primary}60`,
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    backgroundColor: colors.textLight,
                  },
                  mb: 2,
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Login Link */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight,
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '0.8rem'
                }}>
                  Already have an account?{' '}
                  <Link 
                    href="#" 
                    onClick={handleLoginClick}
                    sx={{ 
                      color: colors.primary, 
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.8rem',
                      '&:hover': { textDecoration: 'underline' } 
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>

              {/* Copyright Footer */}
              <Box sx={{ 
                textAlign: 'center', 
                mt: 3,
                pt: 2,
                borderTop: `1px solid ${colors.border}`
              }}>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight,
                  fontSize: '0.7rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  © 2025 RLDS Pvt Limited. All rights reserved.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;