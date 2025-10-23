// Interactive Species Explorer with 3D Cards and Gamification
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Stack,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import {
  Search,
  FilterList,
  Favorite,
  FavoriteBorder,
  Share,
  Close,
  ZoomIn,
  VolumeUp,
  CameraAlt,
  EmojiEvents,
  Star,
  Collections,
  ViewInAr,
  ThreeDRotation
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const SpeciesExplorer = () => {
  const { t } = useTranslation();
  const [species, setSpecies] = useState([]);
  const [filteredSpecies, setFilteredSpecies] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [habitatFilter, setHabitatFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [collected, setCollected] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  // Mock species data with rich information
  const mockSpecies = [
    {
      id: 1,
      name: 'Blue Whale',
      scientificName: 'Balaenoptera musculus',
      habitat: 'ocean',
      depth: '0-200m',
      rarity: 'legendary',
      points: 100,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
      sound: '🔊 Deep low-frequency calls',
      funFact: 'Largest animal ever known to have lived on Earth!',
      conservation: 'Endangered',
      diet: 'Krill',
      size: '25-30 meters',
      discovered: false,
      level: 5
    },
    {
      id: 2,
      name: 'Clownfish',
      scientificName: 'Amphiprioninae',
      habitat: 'reef',
      depth: '0-15m',
      rarity: 'common',
      points: 10,
      image: 'https://images.unsplash.com/photo-1520990421002-0eb23c7f0d7b?w=500',
      sound: '🔊 Popping sounds',
      funFact: 'Lives in a symbiotic relationship with sea anemones!',
      conservation: 'Least Concern',
      diet: 'Algae, plankton',
      size: '8-11 cm',
      discovered: false,
      level: 1
    },
    {
      id: 3,
      name: 'Great White Shark',
      scientificName: 'Carcharodon carcharias',
      habitat: 'ocean',
      depth: '0-1200m',
      rarity: 'rare',
      points: 50,
      image: 'https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=500',
      sound: '🔊 Silent hunter',
      funFact: 'Can detect a single drop of blood in 100 liters of water!',
      conservation: 'Vulnerable',
      diet: 'Fish, seals',
      size: '4-6 meters',
      discovered: false,
      level: 3
    },
    {
      id: 4,
      name: 'Sea Turtle',
      scientificName: 'Chelonioidea',
      habitat: 'reef',
      depth: '0-100m',
      rarity: 'uncommon',
      points: 30,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
      sound: '🔊 Gentle breathing',
      funFact: 'Can hold their breath for up to 7 hours when resting!',
      conservation: 'Endangered',
      diet: 'Jellyfish, seagrass',
      size: '0.6-1.2 meters',
      discovered: false,
      level: 2
    },
    {
      id: 5,
      name: 'Dolphin',
      scientificName: 'Delphinidae',
      habitat: 'ocean',
      depth: '0-300m',
      rarity: 'uncommon',
      points: 40,
      image: 'https://images.unsplash.com/photo-1607153333879-c174d265f1d2?w=500',
      sound: '🔊 Echolocation clicks',
      funFact: 'Dolphins sleep with one eye open and half their brain awake!',
      conservation: 'Least Concern',
      diet: 'Fish, squid',
      size: '2-4 meters',
      discovered: false,
      level: 2
    },
    {
      id: 6,
      name: 'Octopus',
      scientificName: 'Octopoda',
      habitat: 'reef',
      depth: '0-200m',
      rarity: 'rare',
      points: 45,
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
      sound: '🔊 Silent camouflage master',
      funFact: 'Has three hearts and blue blood!',
      conservation: 'Least Concern',
      diet: 'Crabs, shrimp',
      size: '30-90 cm',
      discovered: false,
      level: 3
    }
  ];

  useEffect(() => {
    setSpecies(mockSpecies);
    setFilteredSpecies(mockSpecies);
  }, []);

  useEffect(() => {
    let filtered = species;

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (habitatFilter !== 'all') {
      filtered = filtered.filter(s => s.habitat === habitatFilter);
    }

    setFilteredSpecies(filtered);
  }, [searchQuery, habitatFilter, species]);

  const handleDiscoverSpecies = (speciesItem) => {
    if (!collected.includes(speciesItem.id)) {
      setCollected([...collected, speciesItem.id]);
      setUserPoints(prev => prev + speciesItem.points);

      // Update species as discovered
      const updatedSpecies = species.map(s =>
        s.id === speciesItem.id ? { ...s, discovered: true } : s
      );
      setSpecies(updatedSpecies);
    }
    setSelectedSpecies(speciesItem);
  };

  const toggleFavorite = (speciesId) => {
    if (favorites.includes(speciesId)) {
      setFavorites(favorites.filter(id => id !== speciesId));
    } else {
      setFavorites([...favorites, speciesId]);
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'rare': return '#9C27B0';
      case 'uncommon': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'legendary': return '👑';
      case 'rare': return '💎';
      case 'uncommon': return '⭐';
      default: return '✨';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Stats */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 4 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1565C0', mb: 1 }}>
              🌊 Marine Species Explorer
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover and collect amazing marine species from Sri Lankan waters
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Card sx={{ p: 2, bgcolor: '#1565C0', color: 'white' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {userPoints}
              </Typography>
              <Typography variant="caption">Points</Typography>
            </Card>
            <Card sx={{ p: 2, bgcolor: '#2196F3', color: 'white' }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {collected.length}/{species.length}
              </Typography>
              <Typography variant="caption">Discovered</Typography>
            </Card>
          </Stack>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Collection Progress</Typography>
            <Typography variant="body2" color="primary">
              {Math.round((collected.length / species.length) * 100)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(collected.length / species.length) * 100}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        {/* Search and Filters */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search species by name or scientific name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />

          <ToggleButtonGroup
            value={habitatFilter}
            exclusive
            onChange={(e, value) => value && setHabitatFilter(value)}
            sx={{ bgcolor: 'white' }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="ocean">🌊 Ocean</ToggleButton>
            <ToggleButton value="reef">🪸 Reef</ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, value) => value && setViewMode(value)}
            sx={{ bgcolor: 'white' }}
          >
            <ToggleButton value="grid"><Collections /></ToggleButton>
            <ToggleButton value="3d"><ThreeDRotation /></ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </MotionBox>

      {/* Species Grid */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredSpecies.map((speciesItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={speciesItem.id}>
              <MotionCard
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: viewMode === '3d' ? 5 : 0,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'visible',
                  borderRadius: 3,
                  border: `3px solid ${getRarityColor(speciesItem.rarity)}`,
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleDiscoverSpecies(speciesItem)}
              >
                {/* Rarity Badge */}
                <Chip
                  label={`${getRarityIcon(speciesItem.rarity)} ${speciesItem.rarity.toUpperCase()}`}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 2,
                    bgcolor: getRarityColor(speciesItem.rarity),
                    color: 'white',
                    fontWeight: 700
                  }}
                />

                {/* Favorite Button */}
                <IconButton
                  sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2, bgcolor: 'white' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(speciesItem.id);
                  }}
                >
                  {favorites.includes(speciesItem.id) ? (
                    <Favorite sx={{ color: '#f44336' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>

                {/* Image */}
                <CardMedia
                  component="img"
                  height="200"
                  image={speciesItem.image}
                  alt={speciesItem.name}
                  sx={{
                    filter: collected.includes(speciesItem.id) ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s'
                  }}
                />

                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {speciesItem.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mb: 2 }}>
                    {speciesItem.scientificName}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={speciesItem.habitat} size="small" color="primary" />
                    <Chip label={speciesItem.depth} size="small" variant="outlined" />
                    <Chip label={`${speciesItem.points} pts`} size="small" color="success" />
                  </Stack>

                  {collected.includes(speciesItem.id) ? (
                    <Chip
                      label="✅ DISCOVERED"
                      color="success"
                      sx={{ width: '100%', fontWeight: 700 }}
                    />
                  ) : (
                    <Chip
                      label="🔒 LOCKED - Click to Discover!"
                      sx={{ width: '100%', bgcolor: '#e0e0e0' }}
                    />
                  )}
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {/* Species Detail Dialog */}
      <Dialog
        open={Boolean(selectedSpecies)}
        onClose={() => setSelectedSpecies(null)}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
      >
        {selectedSpecies && (
          <DialogContent sx={{ p: 0 }}>
            <IconButton
              sx={{ position: 'absolute', top: 10, right: 10, zIndex: 10, bgcolor: 'white' }}
              onClick={() => setSelectedSpecies(null)}
            >
              <Close />
            </IconButton>

            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="300"
                image={selectedSpecies.image}
                alt={selectedSpecies.name}
              />

              {/* New Discovery Animation */}
              {collected.includes(selectedSpecies.id) && (
                <MotionBox
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center'
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 60, color: '#FFD700' }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                    NEW DISCOVERY!
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                    +{selectedSpecies.points} Points
                  </Typography>
                </MotionBox>
              )}
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {selectedSpecies.name}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary', mb: 3 }}>
                {selectedSpecies.scientificName}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Size</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedSpecies.size}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Depth Range</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedSpecies.depth}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Diet</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedSpecies.diet}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Conservation</Typography>
                  <Chip
                    label={selectedSpecies.conservation}
                    size="small"
                    color={selectedSpecies.conservation === 'Endangered' ? 'error' : 'success'}
                  />
                </Grid>
              </Grid>

              <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  💡 Fun Fact
                </Typography>
                <Typography variant="body2">
                  {selectedSpecies.funFact}
                </Typography>
              </Box>

              <Box sx={{ bgcolor: '#E3F2FD', p: 2, borderRadius: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {selectedSpecies.sound}
                </Typography>
                <Button variant="contained" startIcon={<VolumeUp />} size="small">
                  Play Sound
                </Button>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" startIcon={<ViewInAr />} fullWidth>
                  View in AR
                </Button>
                <Button variant="outlined" startIcon={<Share />} fullWidth>
                  Share Discovery
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default SpeciesExplorer;
