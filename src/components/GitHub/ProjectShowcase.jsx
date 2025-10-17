// src/components/GitHub/ProjectShowcase.jsx - Showcase NARA AquaSchool project
import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  GitHub,
  Code,
  Star,
  ForkRight,
  OpenInNew,
  Description
} from '@mui/icons-material';

/**
 * ProjectShowcase Component
 * Displays NARA AquaSchool GitHub repository information
 */
const ProjectShowcase = () => {
  const projectInfo = {
    name: 'NARA AquaSchool',
    username: 'safenetcreations',
    repo: 'nara-aquaschool',
    description: "Sri Lanka's Premier Marine Education Portal - An interactive platform for marine science education featuring multilingual support (English, Sinhala, Tamil), species databases, conservation information, and educational resources.",
    url: 'https://github.com/safenetcreations/nara-aquaschool',
    liveUrl: 'https://nara-aquaschool.web.app',
    technologies: [
      'React 18.2',
      'Material-UI v5',
      'Firebase',
      'i18next',
      'Three.js',
      'Leaflet Maps'
    ],
    features: [
      'Trilingual Support (EN/SI/TA)',
      'Marine Species Database',
      'Interactive Learning Modules',
      'Conservation Information',
      'Virtual Library',
      'Water Heritage Content',
      'User Authentication',
      'Real-time Database'
    ]
  };

  return (
    <Box>
      {/* Main Project Card */}
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginBottom: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
          <GitHub sx={{ fontSize: 48 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {projectInfo.name}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              @{projectInfo.username}/{projectInfo.repo}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" paragraph sx={{ marginTop: 2 }}>
          {projectInfo.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<GitHub />}
            onClick={() => window.open(projectInfo.url, '_blank')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            View on GitHub
          </Button>
          <Button
            variant="contained"
            startIcon={<OpenInNew />}
            onClick={() => window.open(projectInfo.liveUrl, '_blank')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Live Demo
          </Button>
          <Button
            variant="contained"
            startIcon={<Code />}
            onClick={() => window.open(`${projectInfo.url}/blob/main/src`, '_blank')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Browse Source Code
          </Button>
          <Button
            variant="contained"
            startIcon={<Description />}
            onClick={() => window.open(`${projectInfo.url}/blob/main/README.md`, '_blank')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Documentation
          </Button>
        </Box>
      </Paper>

      {/* Technologies & Features Grid */}
      <Grid container spacing={3}>
        {/* Technologies */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Code sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                Technologies Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
                {projectInfo.technologies.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Features */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                <Star sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                Key Features
              </Typography>
              <Box component="ul" sx={{ paddingLeft: 3, marginTop: 2, marginBottom: 0 }}>
                {projectInfo.features.map((feature, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body2"
                    sx={{ marginBottom: 0.5 }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Links */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Quick Links
        </Typography>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => window.open(`${projectInfo.url}/issues`, '_blank')}
            >
              Issues
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => window.open(`${projectInfo.url}/pulls`, '_blank')}
            >
              Pull Requests
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => window.open(`${projectInfo.url}/commits/main`, '_blank')}
            >
              Commit History
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => window.open(`${projectInfo.url}/releases`, '_blank')}
            >
              Releases
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Clone Instructions */}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3, backgroundColor: '#f5f7fa' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Get Started
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Clone this repository and start contributing:
        </Typography>
        <Paper
          elevation={1}
          sx={{
            padding: 2,
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'monospace',
            overflow: 'auto'
          }}
        >
          <code>git clone {projectInfo.url}.git</code>
          <br />
          <code>cd {projectInfo.repo}</code>
          <br />
          <code>yarn install</code>
          <br />
          <code>yarn start</code>
        </Paper>
      </Paper>
    </Box>
  );
};

export default ProjectShowcase;
