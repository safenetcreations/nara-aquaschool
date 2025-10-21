import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  CloudUpload,
  Image,
  VideoLibrary
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * ContentManager Component
 * Manage all educational content in the system
 */
const ContentManager = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const [content, setContent] = useState([
    {
      id: 1,
      title: 'Introduction to Marine Biology',
      type: 'article',
      category: 'marine',
      status: 'published',
      author: 'Dr. Smith',
      views: 1234,
      image: 'https://source.unsplash.com/400x300/?marine,biology'
    },
    {
      id: 2,
      title: 'Coral Reef Ecosystems',
      type: 'video',
      category: 'marine',
      status: 'published',
      author: 'NARA Team',
      views: 856,
      image: 'https://source.unsplash.com/400x300/?coral,reef'
    },
    {
      id: 3,
      title: 'Freshwater Conservation',
      type: 'article',
      category: 'freshwater',
      status: 'draft',
      author: 'Dr. Johnson',
      views: 0,
      image: 'https://source.unsplash.com/400x300/?freshwater,lake'
    }
  ]);

  const handleCreateContent = () => {
    setSelectedContent(null);
    setDialogOpen(true);
  };

  const handleEditContent = (item) => {
    setSelectedContent(item);
    setDialogOpen(true);
  };

  const handleDeleteContent = (id) => {
    setContent(content.filter(c => c.id !== id));
    toast.success('Content deleted successfully');
  };

  const handlePublish = (id) => {
    setContent(content.map(c =>
      c.id === id ? { ...c, status: 'published' } : c
    ));
    toast.success('Content published successfully');
  };

  const filterContent = () => {
    switch (activeTab) {
      case 0:
        return content;
      case 1:
        return content.filter(c => c.status === 'published');
      case 2:
        return content.filter(c => c.status === 'draft');
      default:
        return content;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Content Manager
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage educational content and resources
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateContent}
        >
          Create Content
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="All Content" />
          <Tab label="Published" />
          <Tab label="Draft" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filterContent().map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="160"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={item.type}
                      size="small"
                      color="primary"
                      icon={item.type === 'video' ? <VideoLibrary /> : <Image />}
                    />
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'published' ? 'success' : 'warning'}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    By {item.author} • {item.views} views
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <IconButton size="small" onClick={() => handleEditContent(item)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteContent(item.id)}>
                      <Delete fontSize="small" />
                    </IconButton>
                    {item.status === 'draft' && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handlePublish(item.id)}
                      >
                        Publish
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedContent ? 'Edit Content' : 'Create New Content'}
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Title" sx={{ mt: 2, mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type</InputLabel>
            <Select label="Type">
              <MenuItem value="article">Article</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="quiz">Quiz</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select label="Category">
              <MenuItem value="marine">Marine Life</MenuItem>
              <MenuItem value="freshwater">Freshwater</MenuItem>
              <MenuItem value="heritage">Heritage</MenuItem>
              <MenuItem value="nara">NARA Science</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth label="Description" multiline rows={4} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContentManager;
