// src/components/GitHub/RepositoryViewer.jsx - Component to display GitHub repositories
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  GitHub,
  Star,
  ForkRight,
  Code,
  Folder,
  InsertDriveFile,
  Search,
  Refresh
} from '@mui/icons-material';
import {
  getUserRepositories,
  getRepository,
  getRepositoryContents,
  getFileContent
} from '../../services/githubService';
import CodeViewer from './CodeViewer';

/**
 * RepositoryViewer Component
 * Displays GitHub repositories and allows browsing their contents
 */
const RepositoryViewer = ({ username = 'octocat', initialRepo = null }) => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(initialRepo);
  const [repoDetails, setRepoDetails] = useState(null);
  const [contents, setContents] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [pathHistory, setPathHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load repositories on mount
  useEffect(() => {
    loadRepositories();
  }, [username]);

  // Load repository details when selected
  useEffect(() => {
    if (selectedRepo) {
      loadRepositoryDetails();
      loadRepositoryContents('');
    }
  }, [selectedRepo]);

  const loadRepositories = async () => {
    try {
      setLoading(true);
      setError(null);
      const repos = await getUserRepositories(username);
      setRepositories(repos);
    } catch (err) {
      setError('Failed to load repositories: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRepositoryDetails = async () => {
    try {
      const details = await getRepository(username, selectedRepo);
      setRepoDetails(details);
    } catch (err) {
      setError('Failed to load repository details: ' + err.message);
    }
  };

  const loadRepositoryContents = async (path) => {
    try {
      setLoading(true);
      setError(null);
      setFileContent(null);
      const items = await getRepositoryContents(username, selectedRepo, path);
      setContents(Array.isArray(items) ? items : [items]);
      setCurrentPath(path);
    } catch (err) {
      setError('Failed to load contents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = async (item) => {
    if (item.type === 'dir') {
      setPathHistory([...pathHistory, currentPath]);
      loadRepositoryContents(item.path);
    } else if (item.type === 'file') {
      try {
        setLoading(true);
        const content = await getFileContent(username, selectedRepo, item.path);
        setFileContent(content);
      } catch (err) {
        setError('Failed to load file: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (pathHistory.length > 0) {
      const previousPath = pathHistory[pathHistory.length - 1];
      setPathHistory(pathHistory.slice(0, -1));
      loadRepositoryContents(previousPath);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!selectedRepo) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <GitHub sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            GitHub Repositories
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse repositories for @{username}
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ marginRight: 1, color: 'text.secondary' }} />
          }}
          sx={{ marginBottom: 3 }}
        />

        {/* Error */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Repositories Grid */}
        <Grid container spacing={3}>
          {filteredRepos.map((repo) => (
            <Grid item xs={12} md={6} key={repo.id}>
              <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {repo.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {repo.description || 'No description available'}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    <Chip
                      icon={<Star />}
                      label={repo.stargazers_count}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<ForkRight />}
                      label={repo.forks_count}
                      size="small"
                      variant="outlined"
                    />
                    {repo.language && (
                      <Chip
                        label={repo.language}
                        size="small"
                        color="primary"
                      />
                    )}
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Code />}
                    onClick={() => setSelectedRepo(repo.name)}
                  >
                    Browse Code
                  </Button>
                  <Button
                    size="small"
                    startIcon={<GitHub />}
                    onClick={() => window.open(repo.html_url, '_blank')}
                  >
                    View on GitHub
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  // Repository Browser View
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {/* Header with Back Button */}
      <Box sx={{ marginBottom: 3 }}>
        <Button
          startIcon={<GitHub />}
          onClick={() => {
            setSelectedRepo(null);
            setRepoDetails(null);
            setContents([]);
            setFileContent(null);
            setCurrentPath('');
            setPathHistory([]);
          }}
          sx={{ marginBottom: 2 }}
        >
          Back to Repositories
        </Button>

        {repoDetails && (
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {repoDetails.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {repoDetails.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip icon={<Star />} label={`${repoDetails.stargazers_count} stars`} />
              <Chip icon={<ForkRight />} label={`${repoDetails.forks_count} forks`} />
              {repoDetails.language && <Chip label={repoDetails.language} color="primary" />}
            </Box>
          </Paper>
        )}
      </Box>

      {/* Breadcrumbs */}
      {currentPath && (
        <Breadcrumbs sx={{ marginBottom: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => loadRepositoryContents('')}
          >
            {selectedRepo}
          </Link>
          {currentPath.split('/').map((part, index, array) => {
            const path = array.slice(0, index + 1).join('/');
            return (
              <Link
                key={path}
                component="button"
                variant="body2"
                onClick={() => loadRepositoryContents(path)}
              >
                {part}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 3 }}>
          {error}
        </Alert>
      )}

      {/* File Content View */}
      {fileContent && (
        <Box sx={{ marginBottom: 3 }}>
          <Button onClick={() => setFileContent(null)} sx={{ marginBottom: 2 }}>
            Back to Files
          </Button>
          <CodeViewer
            code={fileContent.content}
            fileName={fileContent.name}
            language={fileContent.name.split('.').pop()}
            githubUrl={`https://github.com/${username}/${selectedRepo}/blob/main/${fileContent.path}`}
          />
        </Box>
      )}

      {/* Contents List */}
      {!fileContent && (
        <Paper elevation={3}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {contents.map((item) => (
                <Box
                  key={item.path}
                  onClick={() => handleItemClick(item)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  {item.type === 'dir' ? (
                    <Folder sx={{ marginRight: 2, color: 'primary.main' }} />
                  ) : (
                    <InsertDriveFile sx={{ marginRight: 2, color: 'text.secondary' }} />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    {item.size > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        {formatBytes(item.size)}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default RepositoryViewer;
