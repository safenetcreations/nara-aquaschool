import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  Chip,
  Tabs,
  Tab,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import {
  PhotoLibrary,
  VideoLibrary,
  Favorite,
  FavoriteBorder,
  ZoomIn,
  Download,
  Share
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * MediaGallery Component
 * Photo and video gallery of marine life and aquatic environments
 */
const MediaGallery = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const mediaItems = [
    {
      id: 1,
      type: 'image',
      title: 'Coral Reef Ecosystem',
      description: 'Vibrant coral reef teeming with marine life',
      url: 'https://source.unsplash.com/800x600/?coral,reef',
      category: 'marine',
      photographer: 'NARA Research Team',
      likes: 234
    },
    {
      id: 2,
      type: 'image',
      title: 'Sea Turtle',
      description: 'Green sea turtle swimming in coastal waters',
      url: 'https://source.unsplash.com/800x600/?sea,turtle',
      category: 'wildlife',
      photographer: 'Marine Biology Dept',
      likes: 456
    },
    {
      id: 3,
      type: 'video',
      title: 'Dolphin Pod',
      description: 'Pod of dolphins in Sri Lankan waters',
      url: 'https://source.unsplash.com/800x600/?dolphin',
      category: 'wildlife',
      photographer: 'Ocean Research',
      likes: 789
    },
    {
      id: 4,
      type: 'image',
      title: 'Mangrove Forest',
      description: 'Coastal mangrove ecosystem',
      url: 'https://source.unsplash.com/800x600/?mangrove',
      category: 'ecosystems',
      photographer: 'Conservation Team',
      likes: 123
    },
    {
      id: 5,
      type: 'image',
      title: 'Tropical Fish',
      description: 'Colorful tropical fish species',
      url: 'https://source.unsplash.com/800x600/?tropical,fish',
      category: 'marine',
      photographer: 'NARA Photography',
      likes: 567
    },
    {
      id: 6,
      type: 'image',
      title: 'Whale Shark',
      description: 'Majestic whale shark encounter',
      url: 'https://source.unsplash.com/800x600/?whale,shark',
      category: 'wildlife',
      photographer: 'Marine Expeditions',
      likes: 891
    },
    {
      id: 7,
      type: 'video',
      title: 'Underwater Cave',
      description: 'Exploring underwater cave systems',
      url: 'https://source.unsplash.com/800x600/?underwater,cave',
      category: 'exploration',
      photographer: 'Dive Team',
      likes: 345
    },
    {
      id: 8,
      type: 'image',
      title: 'Jellyfish',
      description: 'Bioluminescent jellyfish',
      url: 'https://source.unsplash.com/800x600/?jellyfish',
      category: 'marine',
      photographer: 'Night Dive Team',
      likes: 678
    },
    {
      id: 9,
      type: 'image',
      title: 'Freshwater Lake',
      description: 'Pristine freshwater lake ecosystem',
      url: 'https://source.unsplash.com/800x600/?lake,nature',
      category: 'freshwater',
      photographer: 'Field Research',
      likes: 234
    },
    {
      id: 10,
      type: 'image',
      title: 'Octopus',
      description: 'Camouflaged octopus on reef',
      url: 'https://source.unsplash.com/800x600/?octopus',
      category: 'wildlife',
      photographer: 'Marine Biology',
      likes: 456
    },
    {
      id: 11,
      type: 'video',
      title: 'Coral Spawning',
      description: 'Annual coral spawning event',
      url: 'https://source.unsplash.com/800x600/?coral,underwater',
      category: 'marine',
      photographer: 'Research Dive',
      likes: 789
    },
    {
      id: 12,
      type: 'image',
      title: 'River Ecosystem',
      description: 'Freshwater river biodiversity',
      url: 'https://source.unsplash.com/800x600/?river,nature',
      category: 'freshwater',
      photographer: 'Ecology Team',
      likes: 321
    }
  ];

  const categories = [
    { value: 'all', label: 'All Media' },
    { value: 'marine', label: 'Marine Life' },
    { value: 'wildlife', label: 'Wildlife' },
    { value: 'ecosystems', label: 'Ecosystems' },
    { value: 'freshwater', label: 'Freshwater' },
    { value: 'exploration', label: 'Exploration' }
  ];

  const filterMedia = () => {
    if (activeTab === 0) return mediaItems;
    const category = categories[activeTab].value;
    return mediaItems.filter(item => item.category === category);
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setDialogOpen(true);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
    toast.success(favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleDownload = (media) => {
    toast.success(`Downloading ${media.title}...`);
  };

  const handleShare = (media) => {
    toast.success('Link copied to clipboard');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Media Gallery
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore stunning photos and videos of aquatic life and environments
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

      {/* Media Grid */}
      <ImageList variant="masonry" cols={3} gap={16}>
        {filterMedia().map((item) => (
          <ImageListItem key={item.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  '&:hover .overlay': {
                    opacity: 1
                  }
                }}
                onClick={() => handleMediaClick(item)}
              >
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={item.title}
                  sx={{ height: 250, objectFit: 'cover' }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <ZoomIn sx={{ fontSize: 48, color: 'white' }} />
                </Box>
                <ImageListItemBar
                  title={item.title}
                  subtitle={item.photographer}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                    >
                      {favorites.includes(item.id) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  }
                />
                {item.type === 'video' && (
                  <Chip
                    icon={<VideoLibrary />}
                    label="Video"
                    size="small"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8
                    }}
                  />
                )}
              </Card>
            </motion.div>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Media Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedMedia && (
          <Box>
            <CardMedia
              component="img"
              image={selectedMedia.url}
              alt={selectedMedia.title}
              sx={{ maxHeight: 500, objectFit: 'contain', bgcolor: 'black' }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    {selectedMedia.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    By {selectedMedia.photographer}
                  </Typography>
                  <Chip
                    label={selectedMedia.category}
                    size="small"
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => toggleFavorite(selectedMedia.id)}>
                    {favorites.includes(selectedMedia.id) ? (
                      <Favorite color="error" />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                  <IconButton onClick={() => handleDownload(selectedMedia)}>
                    <Download />
                  </IconButton>
                  <IconButton onClick={() => handleShare(selectedMedia)}>
                    <Share />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1" paragraph>
                {selectedMedia.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {selectedMedia.likes} likes
              </Typography>
            </CardContent>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default MediaGallery;
