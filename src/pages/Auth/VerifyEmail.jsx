import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Email, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';

/**
 * VerifyEmail Component
 * Standalone page for email verification
 * Shows verification status and allows resending verification email
 */
const VerifyEmail = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Check authentication status
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);

        // If already verified, redirect to dashboard after 2 seconds
        if (currentUser.emailVerified) {
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } else {
        // Not logged in, redirect to login
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendEmail = async () => {
    setSending(true);
    setMessage('');

    try {
      // Reload user to check current status
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        setEmailVerified(true);
        setMessageType('success');
        setMessage('Your email is already verified! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        return;
      }

      // Send verification email
      await sendEmailVerification(auth.currentUser);

      setMessageType('success');
      setMessage('Verification email sent successfully! Please check your inbox and spam folder.');
    } catch (error) {
      console.error('Error sending verification email:', error);

      setMessageType('error');

      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/too-many-requests':
          setMessage('Too many requests. Please wait a few minutes before trying again.');
          break;
        default:
          setMessage('Failed to send verification email. Please try again later.');
      }
    } finally {
      setSending(false);
    }
  };

  const handleCheckVerification = async () => {
    setChecking(true);
    setMessage('');

    try {
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        setEmailVerified(true);
        setMessageType('success');
        setMessage('Email verified successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessageType('warning');
        setMessage('Email not yet verified. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      console.error('Error checking verification:', error);
      setMessageType('error');
      setMessage('Failed to check verification status.');
    } finally {
      setChecking(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white' }} />
      </Box>
    );
  }

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
            {emailVerified ? (
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: 'success.main',
                  marginBottom: 2
                }}
              />
            ) : (
              <Email
                sx={{
                  fontSize: 80,
                  color: 'primary.main',
                  marginBottom: 2
                }}
              />
            )}

            <Typography
              variant="h4"
              gutterBottom
              fontWeight="bold"
              color={emailVerified ? 'success.main' : 'primary'}
            >
              {emailVerified ? 'Email Verified!' : 'Verify Your Email'}
            </Typography>

            {emailVerified ? (
              <Typography variant="body1" color="text.secondary">
                Your email has been successfully verified.
                You're being redirected to the dashboard...
              </Typography>
            ) : (
              <Typography variant="body1" color="text.secondary">
                We sent a verification email to:
              </Typography>
            )}
          </Box>

          {/* User Email */}
          {!emailVerified && user && (
            <Box
              sx={{
                padding: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                textAlign: 'center',
                marginBottom: 3
              }}
            >
              <Typography variant="body1" fontWeight="bold" color="primary">
                {user.email}
              </Typography>
            </Box>
          )}

          {/* Status Message */}
          {message && (
            <Alert severity={messageType} sx={{ marginBottom: 3 }}>
              {message}
            </Alert>
          )}

          {/* Instructions (only if not verified) */}
          {!emailVerified && (
            <>
              <Box sx={{ marginBottom: 3 }}>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Follow these steps:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  1. Check your email inbox (and spam folder)
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  2. Open the email from NARA AquaSchool
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  3. Click the verification link in the email
                </Typography>
                <Typography variant="body2" color="text.secondary" component="div">
                  4. Return here and click "I've Verified"
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleCheckVerification}
                  disabled={checking || sending}
                  fullWidth
                  sx={{
                    padding: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                >
                  {checking ? (
                    <>
                      <CircularProgress size={20} sx={{ marginRight: 1, color: 'white' }} />
                      Checking...
                    </>
                  ) : (
                    "I've Verified My Email"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleResendEmail}
                  disabled={sending || checking}
                  fullWidth
                  sx={{
                    padding: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                >
                  {sending ? (
                    <>
                      <CircularProgress size={20} sx={{ marginRight: 1 }} />
                      Sending...
                    </>
                  ) : (
                    'Resend Verification Email'
                  )}
                </Button>

                <Button
                  variant="text"
                  size="large"
                  onClick={() => navigate('/dashboard')}
                  fullWidth
                  sx={{
                    textTransform: 'none'
                  }}
                >
                  Skip for Now
                </Button>
              </Box>
            </>
          )}

          {/* Help Section */}
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
              • Check your spam/junk folder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Wait a few minutes for the email to arrive
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Make sure {user?.email} is correct
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Contact us at aquaschool@nara.ac.lk
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default VerifyEmail;
