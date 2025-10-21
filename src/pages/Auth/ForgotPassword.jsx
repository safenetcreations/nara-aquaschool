import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, ArrowBack } from '@mui/icons-material';
import { resetPassword } from '../../services/authService';

/**
 * ForgotPassword Component
 * Allows users to reset their password via email
 */
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
      setEmail('');
    } catch (error) {
      console.error('Password reset error:', error);

      // Handle Firebase error codes
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later');
          break;
        default:
          setError(error.message || 'Failed to send password reset email');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 3
      }}
    >
      <Container maxWidth="sm">
        {/* Back to Login Link */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            component={Link}
            to="/login"
            startIcon={<ArrowBack />}
            sx={{ color: 'white' }}
          >
            Back to Login
          </Button>
        </Box>

        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3
          }}
        >
          {/* Header */}
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: 3
            }}
          >
            <Email
              sx={{
                fontSize: 60,
                color: 'primary.main',
                marginBottom: 2
              }}
            />
            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              color="primary"
            >
              Forgot Password?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No worries! Enter your email and we'll send you reset instructions.
            </Typography>
          </Box>

          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ marginBottom: 3 }}>
              <Typography variant="body2" fontWeight="bold">
                Password Reset Email Sent!
              </Typography>
              <Typography variant="body2">
                Check your inbox and spam folder for a link to reset your password.
                If you don't receive an email within a few minutes, try again.
              </Typography>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  padding: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  marginTop: 1
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Box>
          </form>

          {/* Divider */}
          <Box sx={{ marginY: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>

          {/* Help Text */}
          <Box
            sx={{
              marginTop: 3,
              padding: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: 2
            }}
          >
            <Typography variant="body2" color="text.secondary" gutterBottom fontWeight="bold">
              Having trouble?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Make sure you're using the email you registered with
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Check your spam/junk folder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Contact support at{' '}
              <MuiLink href="mailto:aquaschool@nara.ac.lk" color="primary">
                aquaschool@nara.ac.lk
              </MuiLink>
            </Typography>
          </Box>
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
            NARA AquaSchool - Making ocean learning accessible to everyone
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
