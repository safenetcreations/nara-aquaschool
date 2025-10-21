import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar
} from '@mui/material';
import {
  CloudDownload,
  PictureAsPdf,
  VideoLibrary,
  Image,
  Description,
  Search,
  GetApp,
  Folder,
  InsertDriveFile
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * Downloads Component
 * Educational resources and downloadable materials
 */
const Downloads = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const resources = [
    {
      id: 1,
      title: 'Marine Life Identification Guide',
      description: 'Comprehensive guide to identifying common marine species in Sri Lankan waters',
      type: 'pdf',
      category: 'guides',
      size: '12.5 MB',
      downloads: 1234,
      icon: <PictureAsPdf />,
      color: '#f44336'
    },
    {
      id: 2,
      title: 'Ocean Conservation Presentation',
      description: 'PowerPoint presentation on ocean conservation and sustainability',
      type: 'pptx',
      category: 'presentations',
      size: '8.3 MB',
      downloads: 856,
      icon: <Description />,
      color: '#ff9800'
    },
    {
      id: 3,
      title: 'Coral Reef Ecosystem Video',
      description: 'Educational video about coral reef ecosystems and biodiversity',
      type: 'video',
      category: 'videos',
      size: '145 MB',
      downloads: 2341,
      icon: <VideoLibrary />,
      color: '#2196f3'
    },
    {
      id: 4,
      title: 'Marine Species Posters',
      description: 'High-resolution posters of common marine species',
      type: 'zip',
      category: 'images',
      size: '25.7 MB',
      downloads: 567,
      icon: <Image />,
      color: '#4caf50'
    },
    {
      id: 5,
      title: 'Water Quality Testing Guide',
      description: 'Step-by-step guide for conducting water quality tests',
      type: 'pdf',
      category: 'guides',
      size: '5.2 MB',
      downloads: 432,
      icon: <PictureAsPdf />,
      color: '#f44336'
    },
    {
      id: 6,
      title: 'Freshwater Ecosystems Worksheet',
      description: 'Interactive worksheets for students about freshwater ecosystems',
      type: 'pdf',
      category: 'worksheets',
      size: '3.8 MB',
      downloads: 1876,
      icon: <Description />,
      color: '#9c27b0'
    },
    {
      id: 7,
      title: 'NARA Research Papers Collection',
      description: 'Collection of scientific research papers on aquatic research',
      type: 'zip',
      category: 'research',
      size: '67.4 MB',
      downloads: 234,
      icon: <Folder />,
      color: '#00bcd4'
    },
    {
      id: 8,
      title: 'Virtual Field Trip Guide',
      description: 'Guide for conducting virtual field trips to aquatic sites',
      type: 'pdf',
      category: 'guides',
      size: '9.1 MB',
      downloads: 678,
      icon: <PictureAsPdf />,
      color: '#f44336'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'guides', label: 'Guides' },
    { value: 'worksheets', label: 'Worksheets' },
    { value: 'videos', label: 'Videos' },
    { value: 'images', label: 'Images' },
    { value: 'presentations', label: 'Presentations' },
    { value: 'research', label: 'Research' }
  ];

  const filterResources = () => {
    let filtered = resources;

    // Filter by category
    if (activeTab > 0) {
      const category = categories[activeTab].value;
      filtered = filtered.filter(r => r.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleDownload = (resource) => {
    toast.success(`Downloading ${resource.title}...`);
    // Implement actual download logic
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Downloads
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Access educational resources, guides, and materials
        </Typography>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((cat, index) => (
            <Tab key={cat.value} label={cat.label} />
          ))}
        </Tabs>
      </Box>

      {/* Resources Grid */}
      <Grid container spacing={3}>
        {filterResources().map((resource) => (
          <Grid item xs={12} md={6} key={resource.id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: resource.color,
                        width: 56,
                        height: 56
                      }}
                    >
                      {resource.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {resource.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <Chip
                          label={resource.type.toUpperCase()}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={resource.size}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {resource.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {resource.downloads.toLocaleString()} downloads
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<GetApp />}
                      onClick={() => handleDownload(resource)}
                    >
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filterResources().length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CloudDownload sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No resources found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Downloads;
