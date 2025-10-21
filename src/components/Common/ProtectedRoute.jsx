import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthChange, getUserProfile, USER_ROLES } from '../../services/authService';
import LoadingScreen from './LoadingScreen';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Lock } from '@mui/icons-material';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Supports role-based access control
 */
const ProtectedRoute = ({
  children,
  requiredRole = null,
  requiredRoles = [],
  requireEmailVerification = false,
  requireSchoolVerification = false
}) => {
  const location = useLocation();
  const [authState, setAuthState] = useState({
    loading: true,
    authenticated: false,
    user: null,
    userProfile: null
  });

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        try {
          // Get user profile from Firestore
          const userProfile = await getUserProfile(user.uid);

          setAuthState({
            loading: false,
            authenticated: true,
            user,
            userProfile
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setAuthState({
            loading: false,
            authenticated: false,
            user: null,
            userProfile: null
          });
        }
      } else {
        setAuthState({
          loading: false,
          authenticated: false,
          user: null,
          userProfile: null
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Show loading screen while checking authentication
  if (authState.loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!authState.authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check email verification if required
  if (requireEmailVerification && !authState.user.emailVerified) {
    return (
      <EmailVerificationRequired
        user={authState.user}
        userProfile={authState.userProfile}
      />
    );
  }

  // Check school verification if required (for teachers)
  if (requireSchoolVerification && !authState.userProfile.schoolVerified) {
    return (
      <SchoolVerificationRequired
        user={authState.user}
        userProfile={authState.userProfile}
      />
    );
  }

  // Check role-based access
  const userRole = authState.userProfile?.role;
  const allowedRoles = requiredRole ? [requiredRole] : requiredRoles;

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <AccessDenied
        requiredRoles={allowedRoles}
        userRole={userRole}
      />
    );
  }

  // User is authenticated and authorized, render children
  return children;
};

/**
 * EmailVerificationRequired Component
 * Shown when user needs to verify their email
 */
const EmailVerificationRequired = ({ user }) => {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    setResending(true);
    try {
      await user.reload();
      if (user.emailVerified) {
        window.location.reload();
      } else {
        // Note: sendEmailVerification is already called during registration
        setMessage('Please check your email inbox and spam folder.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setResending(false);
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
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <Lock sx={{ fontSize: 60, color: 'warning.main', marginBottom: 2 }} />

          <Typography variant="h4" gutterBottom fontWeight="bold">
            Email Verification Required
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Please verify your email address to access this feature.
            We've sent a verification email to:
          </Typography>

          <Typography variant="body1" fontWeight="bold" color="primary" paragraph>
            {user.email}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            After verifying your email, refresh this page to continue.
          </Typography>

          {message && (
            <Typography variant="body2" color="info.main" paragraph>
              {message}
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleResendEmail}
              disabled={resending}
            >
              {resending ? 'Checking...' : 'I\'ve Verified'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              href="/dashboard"
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

/**
 * SchoolVerificationRequired Component
 * Shown when teacher needs school verification
 */
const SchoolVerificationRequired = ({ userProfile }) => {
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
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <Lock sx={{ fontSize: 60, color: 'warning.main', marginBottom: 2 }} />

          <Typography variant="h4" gutterBottom fontWeight="bold">
            School Verification Pending
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Your teacher account is pending school verification.
            Our team will review your application and notify you via email.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            This usually takes 1-2 business days.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/dashboard"
            sx={{ marginTop: 2 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

/**
 * AccessDenied Component
 * Shown when user doesn't have required role
 */
const AccessDenied = ({ requiredRoles, userRole }) => {
  const getRoleDisplayName = (role) => {
    const roleNames = {
      [USER_ROLES.STUDENT]: 'Student',
      [USER_ROLES.TEACHER]: 'Teacher',
      [USER_ROLES.ADMIN]: 'Administrator',
      [USER_ROLES.PARENT]: 'Parent',
      [USER_ROLES.SCIENTIST]: 'Scientist'
    };
    return roleNames[role] || role;
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
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            textAlign: 'center',
            borderRadius: 3
          }}
        >
          <Lock sx={{ fontSize: 60, color: 'error.main', marginBottom: 2 }} />

          <Typography variant="h4" gutterBottom fontWeight="bold" color="error">
            Access Denied
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have permission to access this page.
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            Your role: <strong>{getRoleDisplayName(userRole)}</strong>
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            Required role(s): <strong>
              {requiredRoles.map(getRoleDisplayName).join(', ')}
            </strong>
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/dashboard"
            sx={{ marginTop: 2 }}
          >
            Back to Dashboard
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProtectedRoute;
