import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  Rating
} from '@mui/material';
import {
  EmojiEvents,
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  Visibility,
  Star
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * StudentShowcase Component
 * Display student projects, artwork, and achievements
 */
const StudentShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [likes, setLikes] = useState({});

  const projects = [
    {
      id: 1,
      title: 'Marine Biodiversity Research',
      description: 'A comprehensive study on marine biodiversity in coastal areas',
      student: 'Sarah Johnson',
      grade: '10th Grade',
      avatar: 'https://i.pravatar.cc/150?img=1',
      category: 'research',
      image: 'https://source.unsplash.com/800x600/?marine,research',
      likes: 45,
      comments: 12,
      views: 234,
      rating: 4.5,
      date: '2024-03-15',
      tags: ['Marine Biology', 'Research', 'Conservation']
    },
    {
      id: 2,
      title: 'Coral Reef Restoration Project',
      description: 'Documentation of a coral reef restoration initiative',
      student: 'Michael Chen',
      grade: '11th Grade',
      avatar: 'https://i.pravatar.cc/150?img=2',
      category: 'project',
      image: 'https://source.unsplash.com/800x600/?coral,restoration',
      likes: 67,
      comments: 18,
      views: 456,
      rating: 5.0,
      date: '2024-03-10',
      tags: ['Conservation', 'Coral Reefs', 'Sustainability']
    },
    {
      id: 3,
      title: 'Ocean Pollution Awareness Poster',
      description: 'Creative poster design highlighting ocean pollution issues',
      student: 'Emma Williams',
      grade: '9th Grade',
      avatar: 'https://i.pravatar.cc/150?img=3',
      category: 'artwork',
      image: 'https://source.unsplash.com/800x600/?ocean,pollution',
      likes: 89,
      comments: 23,
      views: 567,
      rating: 4.8,
      date: '2024-03-08',
      tags: ['Art', 'Awareness', 'Pollution']
    },
    {
      id: 4,
      title: 'Freshwater Ecosystem Model',
      description: '3D model demonstrating freshwater ecosystem dynamics',
      student: 'David Kumar',
      grade: '10th Grade',
      avatar: 'https://i.pravatar.cc/150?img=4',
      category: 'model',
      image: 'https://source.unsplash.com/800x600/?freshwater,ecosystem',
      likes: 34,
      comments: 8,
      views: 189,
      rating: 4.3,
      date: '2024-03-05',
      tags: ['Freshwater', 'Ecosystem', '3D Model']
    },
    {
      id: 5,
      title: 'Marine Life Photography Collection',
      description: 'Stunning underwater photography of local marine species',
      student: 'Olivia Brown',
      grade: '12th Grade',
      avatar: 'https://i.pravatar.cc/150?img=5',
      category: 'photography',
      image: 'https://source.unsplash.com/800x600/?underwater,photography',
      likes: 123,
      comments: 34,
      views: 789,
      rating: 4.9,
      date: '2024-03-01',
      tags: ['Photography', 'Marine Life', 'Art']
    },
    {
      id: 6,
      title: 'Water Conservation Campaign',
      description: 'Social media campaign promoting water conservation',
      student: 'James Wilson',
      grade: '11th Grade',
      avatar: 'https://i.pravatar.cc/150?img=6',
      category: 'campaign',
      image: 'https://source.unsplash.com/800x600/?water,conservation',
      likes: 56,
      comments: 15,
      views: 345,
      rating: 4.6,
      date: '2024-02-28',
      tags: ['Conservation', 'Campaign', 'Social Media']
    },
    {
      id: 7,
      title: 'Aquatic Species Identification App',
      description: 'Mobile app prototype for identifying aquatic species',
      student: 'Sophia Martinez',
      grade: '12th Grade',
      avatar: 'https://i.pravatar.cc/150?img=7',
      category: 'technology',
      image: 'https://source.unsplash.com/800x600/?app,technology',
      likes: 98,
      comments: 27,
      views: 612,
      rating: 4.7,
      date: '2024-02-25',
      tags: ['Technology', 'App Development', 'Innovation']
    },
    {
      id: 8,
      title: 'Ocean Acidification Experiment',
      description: 'Scientific experiment demonstrating ocean acidification effects',
      student: 'Liam Anderson',
      grade: '10th Grade',
      avatar: 'https://i.pravatar.cc/150?img=8',
      category: 'experiment',
      image: 'https://source.unsplash.com/800x600/?science,experiment',
      likes: 42,
      comments: 11,
      views: 267,
      rating: 4.4,
      date: '2024-02-20',
      tags: ['Science', 'Experiment', 'Climate Change']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'research', label: 'Research' },
    { value: 'project', label: 'Projects' },
    { value: 'artwork', label: 'Artwork' },
    { value: 'photography', label: 'Photography' },
    { value: 'technology', label: 'Technology' },
    { value: 'experiment', label: 'Experiments' }
  ];

  const filterProjects = () => {
    if (activeTab === 0) return projects;
    const category = categories[activeTab].value;
    return projects.filter(p => p.category === category);
  };

  const handleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    toast.success(likes[id] ? 'Removed like' : 'Liked!');
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Student Showcase
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore amazing projects and work by fellow students
        </Typography>
      </Box>

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

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filterProjects().map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => handleProjectClick(project)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar src={project.avatar} sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Typography variant="body2" fontWeight={600}>
                        {project.student}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {project.grade}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
                    {project.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(project.id);
                          }}
                        >
                          {likes[project.id] ? (
                            <Favorite color="error" fontSize="small" />
                          ) : (
                            <FavoriteBorder fontSize="small" />
                          )}
                        </IconButton>
                        <Typography variant="caption">{project.likes}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Comment fontSize="small" color="action" />
                        <Typography variant="caption">{project.comments}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Visibility fontSize="small" color="action" />
                        <Typography variant="caption">{project.views}</Typography>
                      </Box>
                    </Box>
                    <Rating value={project.rating} precision={0.5} size="small" readOnly />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Project Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <Box>
            <CardMedia
              component="img"
              image={selectedProject.image}
              alt={selectedProject.title}
              sx={{ maxHeight: 400, objectFit: 'cover' }}
            />
            <DialogContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={selectedProject.avatar} sx={{ width: 48, height: 48 }} />
                  <Box>
                    <Typography variant="h6">{selectedProject.student}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedProject.grade}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={<EmojiEvents />}
                  label={selectedProject.category}
                  color="primary"
                />
              </Box>

              <Typography variant="h5" gutterBottom fontWeight={600}>
                {selectedProject.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating value={selectedProject.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  {selectedProject.rating} / 5.0
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {selectedProject.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                {selectedProject.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Favorite color="error" />
                    <Typography>{selectedProject.likes} likes</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Comment color="action" />
                    <Typography>{selectedProject.comments} comments</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Visibility color="action" />
                    <Typography>{selectedProject.views} views</Typography>
                  </Box>
                </Box>
                <IconButton onClick={() => toast.success('Shared!')}>
                  <Share />
                </IconButton>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Published on {new Date(selectedProject.date).toLocaleDateString()}
              </Typography>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default StudentShowcase;
