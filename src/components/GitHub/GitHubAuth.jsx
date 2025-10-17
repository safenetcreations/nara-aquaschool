// src/components/GitHub/GitHubAuth.jsx - GitHub OAuth Authentication Component
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material';
import { GitHub, Check, Error as ErrorIcon } from '@mui/icons-material';
import {
  setGithubToken,
  getGithubToken,
  removeGithubToken,
  getAuthenticatedUser
} from '../../services/githubService';

/**
 * GitHubAuth Component
 * Handles GitHub authentication and displays user status
 */
const GitHubAuth = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    const existingToken = getGithubToken();
    if (existingToken) {
      try {
        const userData = await getAuthenticatedUser();
        setUser(userData);
      } catch (err) {
        // Token might be invalid, remove it
        removeGithubToken();
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
    setToken('');
    setError(null);
    setSuccess(false);
  };

  const handleConnect = async () => {
    if (!token.trim()) {
      setError('Please enter a GitHub token');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Set the token
      setGithubToken(token.trim());

      // Verify by fetching user data
      const userData = await getAuthenticatedUser();
      setUser(userData);
      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError('Invalid token. Please check and try again.');
      removeGithubToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    removeGithubToken();
    setUser(null);
    setSuccess(false);
  };

  const openGitHubTokenPage = () => {
    window.open('https://github.com/settings/tokens/new', '_blank');
  };

  if (user) {
    return (
      <Paper elevation={2} sx={{ padding: 2, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              {user.name || user.login}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{user.login}
            </Typography>
          </Box>
        </Box>
        <Chip
          label="Connected"
          color="success"
          size="small"
          icon={<Check />}
        />
        <Button
          size="small"
          variant="outlined"
          onClick={handleDisconnect}
        >
          Disconnect
        </Button>
      </Paper>
    );
  }

  return (
    <>
      <Button
        variant="contained"
        startIcon={<GitHub />}
        onClick={handleOpen}
        sx={{
          backgroundColor: '#24292e',
          '&:hover': {
            backgroundColor: '#1a1e22'
          }
        }}
      >
        Connect GitHub
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GitHub />
            Connect GitHub Account
          </Box>
        </DialogTitle>

        <DialogContent>
          <Alert severity="info" sx={{ marginBottom: 2 }}>
            Connect your GitHub account to access private repositories and increase API rate limits (from 60 to 5,000 requests per hour).
          </Alert>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }} icon={<Check />}>
              Successfully connected to GitHub!
            </Alert>
          )}

          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Steps to Connect:
          </Typography>

          <Box component="ol" sx={{ paddingLeft: 3 }}>
            <Typography component="li" variant="body2" paragraph>
              Click "Generate Token" below to open GitHub settings
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Set token name (e.g., "NARA AquaSchool")
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Select scopes: <strong>public_repo</strong>, <strong>read:user</strong>
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Click "Generate token" at the bottom
            </Typography>
            <Typography component="li" variant="body2" paragraph>
              Copy the token and paste it below
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<GitHub />}
            onClick={openGitHubTokenPage}
            fullWidth
            sx={{ marginY: 2 }}
          >
            Generate Token on GitHub
          </Button>

          <TextField
            fullWidth
            label="GitHub Personal Access Token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            disabled={loading || success}
            onKeyPress={(e) => e.key === 'Enter' && handleConnect()}
            helperText="Your token is stored locally and never sent to our servers"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleConnect}
            variant="contained"
            disabled={loading || success}
            startIcon={loading ? <CircularProgress size={20} /> : <GitHub />}
          >
            {loading ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GitHubAuth;
