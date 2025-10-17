import React, { useState } from 'react';
import { Alert, AlertTitle, Button, Box, Collapse, IconButton } from '@mui/material';
import { Close, Email, Refresh } from '@mui/icons-material';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';

/**
 * EmailVerificationBanner Component
 * Shows a dismissible banner at the top of pages for unverified users
 * Can be used in Dashboard, Profile, or any protected page
 */
const EmailVerificationBanner = ({ user }) => {
  const [open, setOpen] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  // Don't show if user is already verified
  if (!user || user.emailVerified) {
    return null;
  }

  // Don't show if user dismissed the banner
  if (!open) {
    return null;
  }

  const handleResendEmail = async () => {
    setSending(true);
    setMessage('');

    try {
      // Reload user to check current verification status
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        setMessageType('success');
        setMessage('Your email is already verified! Refreshing page...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        return;
      }

      // Send verification email
      await sendEmailVerification(auth.currentUser);

      setMessageType('success');
      setMessage('Verification email sent! Please check your inbox and spam folder.');
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
    setSending(true);
    setMessage('');

    try {
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        setMessageType('success');
        setMessage('Email verified successfully! Refreshing page...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessageType('warning');
        setMessage('Email not yet verified. Please check your inbox and click the verification link.');
      }
    } catch (error) {
      console.error('Error checking verification:', error);
      setMessageType('error');
      setMessage('Failed to check verification status.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Collapse in={open}>
      <Alert
        severity="warning"
        icon={<Email />}
        sx={{
          marginBottom: 2,
          borderRadius: 2
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setOpen(false)}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle sx={{ fontWeight: 'bold' }}>
          Please Verify Your Email Address
        </AlertTitle>

        <Box sx={{ marginBottom: 1 }}>
          We sent a verification email to <strong>{user.email}</strong>.
          Please check your inbox and spam folder, then click the verification link.
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 2 }}>
          <Button
            variant="contained"
            size="small"
            onClick={handleCheckVerification}
            disabled={sending}
            startIcon={<Refresh />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            I've Verified
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={handleResendEmail}
            disabled={sending}
            startIcon={<Email />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Resend Email
          </Button>
        </Box>

        {/* Status Message */}
        {message && (
          <Alert
            severity={messageType}
            sx={{
              marginTop: 2,
              fontSize: '0.875rem'
            }}
          >
            {message}
          </Alert>
        )}
      </Alert>
    </Collapse>
  );
};

export default EmailVerificationBanner;
