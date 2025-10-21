// src/pages/Resources/CodeResources.jsx - Page to display code resources and GitHub integration
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { GitHub, Code } from '@mui/icons-material';
import RepositoryViewer from '../../components/GitHub/RepositoryViewer';
import CodeViewer from '../../components/GitHub/CodeViewer';
import GitHubAuth from '../../components/GitHub/GitHubAuth';

/**
 * CodeResources Component
 * Displays coding resources, tutorials, and GitHub integration for NARA AquaSchool
 */
const CodeResources = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [githubUsername, setGithubUsername] = useState('safenetcreations');
  const [customUsername, setCustomUsername] = useState('');

  const handleUsernameSubmit = () => {
    if (customUsername.trim()) {
      setGithubUsername(customUsername.trim());
    }
  };

  // Example code for marine data processing
  const exampleCode = `// Marine Species Data Processing Example
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Function to fetch endangered species
async function getEndangeredSpecies() {
  const speciesRef = collection(db, 'marineSpecies');
  const q = query(
    speciesRef,
    where('conservationStatus', 'in', ['endangered', 'critically_endangered'])
  );

  const snapshot = await getDocs(q);
  const species = [];

  snapshot.forEach(doc => {
    species.push({
      id: doc.id,
      ...doc.data()
    });
  });

  return species;
}

// Function to analyze species distribution
function analyzeDistribution(species) {
  const distribution = {};

  species.forEach(s => {
    const locations = s.distribution?.sriLanka || [];
    locations.forEach(location => {
      distribution[location] = (distribution[location] || 0) + 1;
    });
  });

  return Object.entries(distribution)
    .sort((a, b) => b[1] - a[1])
    .map(([location, count]) => ({ location, count }));
}

// Usage example
async function main() {
  try {
    const endangered = await getEndangeredSpecies();
    console.log(\`Found \${endangered.length} endangered species\`);

    const hotspots = analyzeDistribution(endangered);
    console.log('Conservation hotspots:', hotspots);
  } catch (error) {
    console.error('Error:', error);
  }
}

export { getEndangeredSpecies, analyzeDistribution };`;

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            marginBottom: 4,
            padding: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            color: 'white'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Code sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Code Resources & Examples
          </Typography>
          <Typography variant="h6">
            Explore code examples, tutorials, and GitHub repositories for marine science education
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper elevation={3} sx={{ marginBottom: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Example Code" icon={<Code />} iconPosition="start" />
            <Tab label="GitHub Integration" icon={<GitHub />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Example Code Tab */}
        {activeTab === 0 && (
          <Box>
            <Alert severity="info" sx={{ marginBottom: 3 }}>
              This example demonstrates how to fetch and analyze marine species data from Firebase.
              You can copy this code and use it in your own projects!
            </Alert>

            <CodeViewer
              code={exampleCode}
              language="javascript"
              fileName="marineSpeciesAnalysis.js"
            />

            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                About This Example
              </Typography>
              <Typography variant="body1" paragraph>
                This code demonstrates:
              </Typography>
              <Box component="ul" sx={{ paddingLeft: 3 }}>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Firebase Integration:</strong> Connecting to Firestore database
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Query Filtering:</strong> Fetching species by conservation status
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Data Analysis:</strong> Analyzing species distribution across Sri Lanka
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Error Handling:</strong> Proper error handling with try-catch
                </Typography>
                <Typography component="li" variant="body1" paragraph>
                  <strong>Async/Await:</strong> Modern JavaScript asynchronous programming
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}

        {/* GitHub Integration Tab */}
        {activeTab === 1 && (
          <Box>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Browse GitHub Repositories
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Connect your GitHub account for enhanced features
                  </Typography>
                </Box>
                <GitHubAuth />
              </Box>

              <Alert severity="info" sx={{ marginBottom: 3 }}>
                <Typography variant="body2">
                  <strong>Unauthenticated:</strong> 60 requests/hour | <strong>Authenticated:</strong> 5,000 requests/hour
                </Typography>
              </Alert>

              <Typography variant="h6" fontWeight="medium" gutterBottom>
                Browse Public Repositories
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter any GitHub username to browse their public repositories and code files.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                <TextField
                  fullWidth
                  label="GitHub Username"
                  placeholder="Enter username (e.g., octocat, safenetcreations)"
                  value={customUsername}
                  onChange={(e) => setCustomUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
                />
                <Button
                  variant="contained"
                  onClick={handleUsernameSubmit}
                  sx={{ minWidth: 120 }}
                >
                  Load
                </Button>
              </Box>

              <Alert severity="info" sx={{ marginTop: 2 }}>
                Currently viewing: <strong>@{githubUsername}</strong>
              </Alert>
            </Paper>

            <RepositoryViewer username={githubUsername} />
          </Box>
        )}

        {/* Additional Resources */}
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Learning Resources
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Firebase Documentation
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Learn how to integrate Firebase with your marine science projects
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open('https://firebase.google.com/docs', '_blank')}
              >
                Visit Firebase Docs
              </Button>
            </Paper>

            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                React Documentation
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Master React to build interactive marine education applications
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open('https://react.dev', '_blank')}
              >
                Visit React Docs
              </Button>
            </Paper>

            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Material-UI Components
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Explore Material-UI components used in this application
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open('https://mui.com', '_blank')}
              >
                Visit MUI Docs
              </Button>
            </Paper>

            <Paper elevation={1} sx={{ padding: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                GitHub API
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Learn how to integrate GitHub API in your applications
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => window.open('https://docs.github.com/en/rest', '_blank')}
              >
                Visit GitHub API Docs
              </Button>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CodeResources;
