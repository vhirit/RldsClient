
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/features/auth/authSlice';
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
  Card,
  CardContent,
  LinearProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  VerifiedUser,
  Warning,
  CheckCircle,
  BarChart,
  TrendingUp,
  PieChart,
  Notifications
} from '@mui/icons-material';



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      setLocalError('Please enter both email and password');
      return;
    }

    try {
      const result = await dispatch(loginUser({
        email: credentials.email,
        password: credentials.password
      })).unwrap();

      if (result && result.user && result.token) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  // Color palette
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

  const chartData = [
    { name: 'Verified', value: 75, color: colors.primary },
    { name: 'Pending', value: 15, color: colors.secondary },
    { name: 'Rejected', value: 10, color: '#dc2626' } // Keeping red for rejected status
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: colors.white,
      background: `linear-gradient(135deg, ${colors.lightBg} 0%, #e2e8f0 100%)`,
      position: 'relative'
    }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left Side - Login Form */}
        <Grid item xs={12} md={6} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: { xs: 2, sm: 3, md: 4 },
          position: 'relative'
        }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: 450
          }}>
            
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
                  fontSize: { xs: '1.75rem', sm: '2rem' },
                  mb: 1,
                  fontFamily: '"Poppins", sans-serif'
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body1" sx={{ 
                color: colors.textLight, 
                textAlign: 'center',
                fontFamily: '"Poppins", sans-serif',
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                Secure Access to Financial Verification Hub
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {/* Error Messages */}
              {(isError || localError) && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {localError || message}
                </Alert>
              )}

              {/* Email Field */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: '600', 
                  color: colors.textDark, 
                  mb: 1,
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: colors.textLight }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 50,
                      backgroundColor: colors.white,
                      borderRadius: 2,
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

              {/* Password Field */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: '600', 
                  color: colors.textDark, 
                  mb: 1,
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: colors.textLight }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: colors.textLight }}
                          disabled={isLoading}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: 50,
                      backgroundColor: colors.white,
                      borderRadius: 2,
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

              {/* Forgot Password Link */}
              <Box sx={{ textAlign: 'right', mb: 3 }}>
                <Link 
                  component="button" 
                  type="button"
                  onClick={handleForgotPasswordClick}
                  disabled={isLoading}
                  sx={{ 
                    color: colors.primary, 
                    textDecoration: 'none', 
                    fontSize: '0.875rem', 
                    fontWeight: '500',
                    fontFamily: '"Poppins", sans-serif',
                    '&:hover': { 
                      textDecoration: 'underline',
                      cursor: 'pointer'
                    },
                    '&:disabled': {
                      color: colors.textLight,
                      cursor: 'not-allowed'
                    }
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  backgroundColor: colors.primary,
                  height: 50,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  fontSize: '1rem',
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
                  mb: 3,
                  transition: 'all 0.3s ease',
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              {/* Don't have an account? Sign up */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight,
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: '0.9rem'
                }}>
                  Don't have an account?{' '}
                  <Link 
                    component="button" 
                    type="button"
                    onClick={handleRegisterClick}
                    disabled={isLoading}
                    sx={{ 
                      color: colors.primary, 
                      fontWeight: '600',
                      textDecoration: 'none',
                      '&:hover': { 
                        textDecoration: 'underline',
                        cursor: 'pointer'
                      },
                      '&:disabled': {
                        color: colors.textLight,
                        cursor: 'not-allowed'
                      }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>

              {/* Copyright Footer */}
              <Box sx={{ 
                textAlign: 'center', 
                mt: 4,
                pt: 3,
                borderTop: `1px solid ${colors.border}`
              }}>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight,
                  fontSize: '0.75rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  © 2025 RLDS Pvt Limited. All rights reserved.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Side - Desktop Template with Dashboard */}
        <Grid item xs={12} md={6} sx={{ 
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
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            zIndex: 1,
          }} />
          
          <Box sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
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
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h2" sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                fontSize: '2rem',
                lineHeight: 1.2,
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                Beyond investigations, we build assurance.
              </Typography>
              <Typography variant="h4" sx={{ 
                opacity: 0.9,
                fontSize: '1rem',
                lineHeight: 1.4,
                fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 300
              }}>
                Your security is our highest priority.
              </Typography>
            </Box>

            {/* Dashboard Preview */}
            <Box sx={{
              backgroundColor: colors.white,
              borderRadius: 2,
              padding: 1.5,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              border: `2px solid ${colors.border}`,
              maxWidth: 450,
              margin: '0 auto',
              position: 'relative',
              transform: 'scale(0.9)'
            }}>
              
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
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.primary }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.secondary }} />
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
                </Box>
                <Typography variant="body2" sx={{ 
                  color: colors.textLight, 
                  fontWeight: 'medium',
                  mx: 'auto',
                  fontSize: '0.6rem',
                  fontFamily: '"Poppins", sans-serif'
                }}>
                  RLDS Pvt Limited Dashboard v2.1
                </Typography>
              </Box>

              <Box sx={{ 
                backgroundColor: colors.lightBg,
                borderRadius: 1,
                p: 1,
                minHeight: 250
              }}>
                
                {/* Profile Container */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '6px 8px',
                  backgroundColor: colors.white,
                  borderRadius: '6px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '8px'
                }}>
                  <Box sx={{ 
                    width: 28, 
                    height: 28, 
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
                    RR
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ 
                      fontSize: '11px',
                      fontWeight: '600',
                      color: colors.textDark,
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontSize: '9px',
                      color: colors.textLight,
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      Ready to continue your work
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%',
                    background: colors.primary,
                    marginLeft: '3px'
                  }} />
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={0.5} sx={{ mb: 1.5 }}>
                  {verificationStats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Card sx={{ 
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 1,
                        p: 0.3,
                        height: '100%',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                      }}>
                        <CardContent sx={{ p: '2px !important', display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ 
                            backgroundColor: `${stat.color}15`, 
                            borderRadius: 0.5, 
                            p: 0.3,
                            mr: 0.5 
                          }}>
                            {React.cloneElement(stat.icon, { sx: { color: stat.color, fontSize: 12 } })}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 'bold', 
                              color: stat.color,
                              fontSize: '0.8rem',
                              lineHeight: 1,
                              fontFamily: '"Poppins", sans-serif'
                            }}>
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: colors.textLight, 
                              fontSize: '0.55rem',
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
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
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

              <Box sx={{
                width: 60,
                height: 10,
                backgroundColor: colors.border,
                margin: '0 auto',
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
              }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;