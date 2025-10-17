// src/pages/Auth/Register.jsx - Registration page component
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Autocomplete
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google,
  Email,
  Lock,
  Person,
  School,
  Grade,
  Language,
  ArrowBack,
  ArrowForward,
  Check,
  Waves
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { registerUser, signInWithGoogle, USER_ROLES } from '../../services/authService';
import toast from 'react-hot-toast';

// Sri Lankan schools list (sample)
const SCHOOLS = [
  'Royal College, Colombo',
  'Ananda College, Colombo',
  'Nalanda College, Colombo',
  'Visaka Vidyalaya, Colombo',
  'Ladies College, Colombo',
  'Trinity College, Kandy',
  'St. Anthony\'s College, Kandy',
  'Dharmaraja College, Kandy',
  'Mahinda College, Galle',
  'Richmond College, Galle',
  'St. Peter\'s College, Colombo',
  'Wesley College, Colombo',
  'Zahira College, Colombo',
  'Isipathana College, Colombo',
  'Thurstan College, Colombo',
  'Other'
];

const steps = ['Account Details', 'Personal Info', 'School Info'];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState(USER_ROLES.STUDENT);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    getValues,
    setValue
  } = useForm();

  const password = watch('password');

  const handleNext = async () => {
    // Validate current step fields
    let fieldsToValidate = [];
    
    if (activeStep === 0) {
      fieldsToValidate = ['email', 'password', 'confirmPassword'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'language'];
    } else if (activeStep === 2) {
      if (role === USER_ROLES.STUDENT) {
        fieldsToValidate = ['grade'];
      }
    }
    
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      const currentData = getValues();
      setFormData({ ...formData, ...currentData });
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const registrationData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: role,
        schoolId: selectedSchool,
        grade: data.grade || null,
        language: data.language,
        parentEmail: data.parentEmail || null
      };
      
      const result = await registerUser(registrationData);
      
      if (result.success) {
        toast.success('Registration successful! Please verify your email.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password');
      } else {
        setError('Failed to create account. Please try again');
      }
      
      // Go back to first step if there's an error
      setActiveStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        if (result.isNewUser) {
          toast.success('Welcome to NARA AquaSchool! Please complete your profile');
          navigate('/profile/setup');
        } else {
          toast.success('Welcome back!');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Google sign-up error:', error);
      setError('Failed to sign up with Google');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain uppercase, lowercase, and number'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />
            
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">I am a...</FormLabel>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel 
                  value={USER_ROLES.STUDENT} 
                  control={<Radio />} 
                  label="Student" 
                />
                <FormControlLabel 
                  value={USER_ROLES.TEACHER} 
                  control={<Radio />} 
                  label="Teacher" 
                />
                <FormControlLabel 
                  value={USER_ROLES.PARENT} 
                  control={<Radio />} 
                  label="Parent" 
                />
              </RadioGroup>
            </FormControl>
          </>
        );
        
      case 1:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  {...register('firstName', {
                    required: 'First name is required',
                    minLength: {
                      value: 2,
                      message: 'First name must be at least 2 characters'
                    }
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  {...register('lastName', {
                    required: 'Last name is required',
                    minLength: {
                      value: 2,
                      message: 'Last name must be at least 2 characters'
                    }
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            </Grid>
            
            <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
              <InputLabel>Preferred Language</InputLabel>
              <Select
                defaultValue="en"
                {...register('language', {
                  required: 'Language is required'
                })}
                startAdornment={
                  <InputAdornment position="start">
                    <Language />
                  </InputAdornment>
                }
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="si">සිංහල (Sinhala)</MenuItem>
                <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
              </Select>
            </FormControl>
            
            {role === USER_ROLES.STUDENT && (
              <TextField
                fullWidth
                label="Parent/Guardian Email (Optional)"
                type="email"
                {...register('parentEmail', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!errors.parentEmail}
                helperText={errors.parentEmail?.message || 'Parents can track your progress'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  )
                }}
              />
            )}
          </>
        );
        
      case 2:
        return (
          <>
            <Autocomplete
              fullWidth
              options={SCHOOLS}
              value={selectedSchool}
              onChange={(event, newValue) => setSelectedSchool(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="School"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <School />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    )
                  }}
                />
              )}
              sx={{ mb: 3 }}
            />
            
            {selectedSchool === 'Other' && (
              <TextField
                fullWidth
                label="Enter School Name"
                {...register('customSchool')}
                sx={{ mb: 3 }}
              />
            )}
            
            {role === USER_ROLES.STUDENT && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Grade</InputLabel>
                <Select
                  defaultValue=""
                  {...register('grade', {
                    required: 'Grade is required for students'
                  })}
                  startAdornment={
                    <InputAdornment position="start">
                      <Grade />
                    </InputAdornment>
                  }
                  error={!!errors.grade}
                >
                  <MenuItem value="">Select Grade</MenuItem>
                  <MenuItem value="5">Grade 5</MenuItem>
                  <MenuItem value="6">Grade 6</MenuItem>
                  <MenuItem value="7">Grade 7</MenuItem>
                  <MenuItem value="8">Grade 8</MenuItem>
                  <MenuItem value="9">Grade 9</MenuItem>
                  <MenuItem value="10">Grade 10</MenuItem>
                  <MenuItem value="11">Grade 11</MenuItem>
                  <MenuItem value="12">Grade 12 (A/L)</MenuItem>
                  <MenuItem value="13">Grade 13 (A/L)</MenuItem>
                </Select>
              </FormControl>
            )}
            
            {role === USER_ROLES.TEACHER && (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Teacher accounts require verification by school administration.
                  You will receive an email once verified.
                </Typography>
                <TextField
                  fullWidth
                  label="Subject(s) Teaching"
                  placeholder="e.g., Science, Biology, Environmental Studies"
                  {...register('subjects')}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Teacher ID (Optional)"
                  {...register('teacherId')}
                  helperText="Your school-issued teacher ID for faster verification"
                />
              </>
            )}
          </>
        );
        
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 4
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
          backgroundImage: 'url(/ocean-pattern.svg)',
          backgroundRepeat: 'repeat',
          animation: 'wave 10s linear infinite'
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 5,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Logo and Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Waves sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Join NARA AquaSchool
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Start your journey in marine education
              </Typography>
            </Box>
            
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}
            
            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {getStepContent(activeStep)}
              
              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={20} /> : <Check />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6edb 0%, #6b4293 100%)'
                      }
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6edb 0%, #6b4293 100%)'
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
            
            {activeStep === 0 && (
              <>
                <Divider sx={{ my: 3 }}>OR</Divider>
                
                {/* Social Sign Up */}
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={handleGoogleSignUp}
                  disabled={loading}
                  startIcon={<Google />}
                  sx={{ mb: 2 }}
                >
                  Sign up with Google
                </Button>
              </>
            )}
            
            {/* Sign In Link */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#667eea',
                    fontWeight: 600
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
