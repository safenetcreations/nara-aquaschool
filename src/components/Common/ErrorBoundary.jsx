import React, { Component } from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Logs errors and displays a fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, this could be sent to error tracking service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    // Reload the page
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
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
          <Container maxWidth="md">
            <Paper
              elevation={6}
              sx={{
                padding: 4,
                textAlign: 'center',
                borderRadius: 3
              }}
            >
              {/* Error Icon */}
              <ErrorOutline
                sx={{
                  fontSize: 80,
                  color: 'error.main',
                  marginBottom: 2
                }}
              />

              {/* Error Title */}
              <Typography
                variant="h4"
                color="error"
                gutterBottom
                fontWeight="bold"
              >
                Oops! Something went wrong
              </Typography>

              {/* Error Description */}
              <Typography
                variant="body1"
                color="text.secondary"
                paragraph
                sx={{ marginBottom: 3 }}
              >
                We encountered an unexpected error. Don't worry, your data is safe.
                Please try refreshing the page or contact support if the problem persists.
              </Typography>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <Box
                  sx={{
                    marginTop: 3,
                    marginBottom: 3,
                    padding: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2,
                    textAlign: 'left',
                    maxHeight: '300px',
                    overflow: 'auto'
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="error"
                    gutterBottom
                    fontWeight="bold"
                  >
                    Error Details (Development Mode):
                  </Typography>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem'
                    }}
                  >
                    {this.state.error.toString()}
                    {'\n\n'}
                    {this.state.errorInfo?.componentStack}
                  </Typography>
                </Box>
              )}

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={this.handleReset}
                  size="large"
                >
                  Try Again
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={this.handleReload}
                  size="large"
                >
                  Reload Page
                </Button>
              </Box>

              {/* Support Text */}
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ marginTop: 3 }}
              >
                If you continue to experience issues, please contact{' '}
                <a
                  href="mailto:aquaschool@nara.ac.lk"
                  style={{ color: '#667eea', textDecoration: 'none' }}
                >
                  aquaschool@nara.ac.lk
                </a>
              </Typography>
            </Paper>
          </Container>
        </Box>
      );
    }

    // No error, render children
    return this.props.children;
  }
}

export default ErrorBoundary;
