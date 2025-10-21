// src/pages/MarineLife/MarineLife.jsx - Marine Life exploration page
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Paper,
  Skeleton,
  Fab,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  LinearProgress,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  Search,
  FilterList,
  ViewModule,
  ViewList,
  Favorite,
  Share,
  PhotoCamera,
  LocationOn,
  Info,
  PlayCircle,
  ThreeDRotation,
  Star,
  Warning,
  Waves,
  TrendingUp
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  getSpecies,
  searchSpecies,
  getSpeciesByHabitat,
  getEndangeredSpecies,
  SPECIES_CATEGORIES,
  CONSERVATION_STATUS,
  HABITATS
} from '../../services/marineSpeciesService';
import toast from 'react-hot-toast';

const MarineLife = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedHabitat, setSelectedHabitat] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredSpecies, setFeaturedSpecies] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    loadSpecies();
    loadFeaturedSpecies();
  }, [selectedCategory, selectedHabitat, page]);

  const loadSpecies = async () => {
    try {
      setLoading(true);
      
      let result;
      if (selectedHabitat !== 'all') {
        result = await getSpeciesByHabitat(selectedHabitat);
        setSpecies(result);
        setTotalPages(Math.ceil(result.length / 12));
      } else if (selectedCategory !== 'all') {
        result = await getSpecies(selectedCategory, null, 12);
        setSpecies(result.species);
        setTotalPages(5); // Mock pagination
      } else {
        result = await getSpecies(null, null, 12);
        setSpecies(result.species || []);
        setTotalPages(5); // Mock pagination
      }
      
      // If no real data, create mock data
      if (!species.length) {
        setSpecies(generateMockSpecies());
      }
    } catch (error) {
      console.error('Error loading species:', error);
      toast.error('Failed to load species data');
      setSpecies(generateMockSpecies());
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedSpecies = () => {
    // Mock featured species
    setFeaturedSpecies({
      id: 'blue-whale',
      scientificName: 'Balaenoptera musculus',
      commonName: {
        en: 'Blue Whale',
        si: 'නිල් තිමිංගලා',
        ta: 'நீல திமிங்கலம்'
      },
      description: 'The largest animal ever known to have lived on Earth. Sri Lankan waters are one of the best places in the world to see blue whales.',
      conservationStatus: 'endangered',
      image: '/images/blue-whale.jpg',
      funFact: 'A blue whale\'s heart alone can weigh as much as an automobile!'
    });
  };

  const generateMockSpecies = () => {
    // Generate mock species for demonstration
    const mockSpecies = [
      {
        id: 'clownfish',
        commonName: { en: 'Clownfish', si: 'විහිළු මාළුවා', ta: 'கோமாளி மீன்' },
        scientificName: 'Amphiprioninae',
        category: 'fish',
        habitat: ['coral_reef'],
        conservationStatus: 'least_concern',
        image: '/images/clownfish.jpg',
        description: 'Famous for their symbiotic relationship with sea anemones'
      },
      {
        id: 'sea-turtle',
        commonName: { en: 'Green Sea Turtle', si: 'කොළ මුහුදු කැස්බෑවා', ta: 'பச்சை கடல் ஆமை' },
        scientificName: 'Chelonia mydas',
        category: 'reptiles',
        habitat: ['coral_reef', 'seagrass'],
        conservationStatus: 'endangered',
        image: '/images/sea-turtle.jpg',
        description: 'Five species of sea turtles nest on Sri Lankan beaches'
      },
      {
        id: 'spinner-dolphin',
        commonName: { en: 'Spinner Dolphin', si: 'කැරකෙන ඩොල්ෆින්', ta: 'சுழலும் டால்பின்' },
        scientificName: 'Stenella longirostris',
        category: 'mammals',
        habitat: ['open_ocean'],
        conservationStatus: 'least_concern',
        image: '/images/spinner-dolphin.jpg',
        description: 'Known for their acrobatic displays and spinning leaps'
      },
      {
        id: 'lionfish',
        commonName: { en: 'Lionfish', si: 'සිංහ මාළුවා', ta: 'சிங்க மீன்' },
        scientificName: 'Pterois',
        category: 'fish',
        habitat: ['coral_reef', 'rocky_shore'],
        conservationStatus: 'least_concern',
        image: '/images/lionfish.jpg',
        description: 'Venomous fish with distinctive warning coloration'
      },
      {
        id: 'manta-ray',
        commonName: { en: 'Manta Ray', si: 'මැන්ටා වදුරා', ta: 'மாண்டா ரே' },
        scientificName: 'Mobula birostris',
        category: 'fish',
        habitat: ['open_ocean'],
        conservationStatus: 'vulnerable',
        image: '/images/manta-ray.jpg',
        description: 'Gentle giants that feed on plankton'
      },
      {
        id: 'whale-shark',
        commonName: { en: 'Whale Shark', si: 'තල්මහ මෝරා', ta: 'திமிங்கல சுறா' },
        scientificName: 'Rhincodon typus',
        category: 'fish',
        habitat: ['open_ocean'],
        conservationStatus: 'endangered',
        image: '/images/whale-shark.jpg',
        description: 'The largest fish in the ocean, completely harmless to humans'
      }
    ];
    
    return mockSpecies;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      try {
        const results = await searchSpecies(searchTerm);
        setSpecies(results.length ? results : generateMockSpecies());
        if (!results.length) {
          toast.info('No species found. Showing suggestions.');
        }
      } catch (error) {
        console.error('Search error:', error);
        toast.error('Search failed');
      } finally {
        setLoading(false);
      }
    } else {
      loadSpecies();
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      fish: '🐠',
      mammals: '🐋',
      reptiles: '🐢',
      invertebrates: '🦀',
      coral: '🪸',
      plants: '🌿',
      birds: '🦜'
    };
    return icons[category] || '🌊';
  };

  const getConservationColor = (status) => {
    const colors = {
      extinct: '#000000',
      extinct_in_wild: '#3f000f',
      critically_endangered: '#cc0000',
      endangered: '#ff6600',
      vulnerable: '#ffaa00',
      near_threatened: '#ffff00',
      least_concern: '#00ff00',
      data_deficient: '#808080'
    };
    return colors[status] || '#808080';
  };

  const getHabitatIcon = (habitat) => {
    const icons = {
      coral_reef: '🪸',
      open_ocean: '🌊',
      deep_sea: '🌑',
      mangrove: '🌿',
      seagrass: '🌱',
      rocky_shore: '🪨',
      sandy_beach: '🏖️',
      estuary: '🏞️'
    };
    return icons[habitat] || '💧';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f8ff' }}>
      {/* Hero Section with Featured Species */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #006994 0%, #0084b8 100%)',
          color: 'white',
          pt: 4,
          pb: 8,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" fontWeight={700} gutterBottom>
                  {t('marine.title')}
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
                  Explore Sri Lanka's Marine Biodiversity
                </Typography>
                
                {/* Search Bar */}
                <Paper
                  component="form"
                  onSubmit={handleSearch}
                  sx={{
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: 2,
                    mb: 3
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder={t('marine.searchSpecies')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      )
                    }}
                    variant="standard"
                  />
                  <IconButton type="submit">
                    <Search />
                  </IconButton>
                </Paper>
                
                {/* Quick Stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <Typography variant="h4" fontWeight={700}>500+</Typography>
                      <Typography variant="body2">Marine Species</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <Typography variant="h4" fontWeight={700}>5</Typography>
                      <Typography variant="body2">Sea Turtle Species</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              {featuredSpecies && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      cursor: 'pointer',
                      '&:hover': { transform: 'scale(1.02)' },
                      transition: 'transform 0.3s'
                    }}
                    onClick={() => navigate(`/marine-life/species/${featuredSpecies.id}`)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={featuredSpecies.image || '/images/placeholder-ocean.jpg'}
                      alt={featuredSpecies.commonName.en}
                    />
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h5" fontWeight={600}>
                          {featuredSpecies.commonName[i18n.language] || featuredSpecies.commonName.en}
                        </Typography>
                        <Chip
                          size="small"
                          label={featuredSpecies.conservationStatus}
                          sx={{
                            backgroundColor: getConservationColor(featuredSpecies.conservationStatus),
                            color: 'white'
                          }}
                        />
                      </Box>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        <em>{featuredSpecies.scientificName}</em>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {featuredSpecies.description}
                      </Typography>
                      {featuredSpecies.funFact && (
                        <Box sx={{ mt: 2, p: 1, backgroundColor: '#f0f8ff', borderRadius: 1 }}>
                          <Typography variant="body2">
                            <strong>Fun Fact:</strong> {featuredSpecies.funFact}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </Grid>
          </Grid>
        </Container>
        
        {/* Wave decoration */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: 60,
            backgroundImage: 'url(/images/wave.svg)',
            backgroundRepeat: 'repeat-x'
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Filters and View Controls */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {/* Category Tabs */}
                <Tabs
                  value={selectedCategory}
                  onChange={(e, newValue) => setSelectedCategory(newValue)}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab value="all" label="All Species" />
                  {Object.entries(SPECIES_CATEGORIES).map(([key, value]) => (
                    <Tab
                      key={key}
                      value={value}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <span>{getCategoryIcon(value)}</span>
                          <span>{t(`marine.categories.${value}`)}</span>
                        </Box>
                      }
                    />
                  ))}
                </Tabs>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button
                  startIcon={<FilterList />}
                  onClick={(e) => setFilterAnchor(e.currentTarget)}
                  variant="outlined"
                >
                  Filters
                </Button>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(e, newMode) => newMode && setViewMode(newMode)}
                >
                  <ToggleButton value="grid">
                    <ViewModule />
                  </ToggleButton>
                  <ToggleButton value="list">
                    <ViewList />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
        >
          <MenuItem>
            <Typography variant="subtitle2" fontWeight={600}>
              Habitat
            </Typography>
          </MenuItem>
          {Object.entries(HABITATS).map(([key, value]) => (
            <MenuItem
              key={key}
              onClick={() => {
                setSelectedHabitat(value);
                setFilterAnchor(null);
              }}
            >
              {getHabitatIcon(value)} {value.replace('_', ' ')}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              setSelectedHabitat('all');
              setFilterAnchor(null);
            }}
          >
            Clear Filter
          </MenuItem>
        </Menu>

        {/* Quick Action Buttons */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }
              }}
              onClick={() => navigate('/marine-life/virtual-dive')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <ThreeDRotation />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Virtual Dive
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    360° underwater experience
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }
              }}
              onClick={() => {
                setLoading(true);
                getEndangeredSpecies().then(data => {
                  setSpecies(data);
                  setLoading(false);
                });
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'error.main' }}>
                  <Warning />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Endangered Species
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Species needing protection
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }
              }}
              onClick={() => navigate('/citizen-science')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <PhotoCamera />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Report Sighting
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Contribute to research
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 3, transform: 'translateY(-4px)' }
              }}
              onClick={() => navigate('/quiz')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  <Star />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Species Quiz
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Test your knowledge
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Species Grid/List */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <Grid container spacing={3}>
                <AnimatePresence>
                  {species.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 4
                            },
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate(`/marine-life/species/${item.id}`)}
                        >
                          <CardMedia
                            component="img"
                            height="200"
                            image={item.image || '/images/placeholder-ocean.jpg'}
                            alt={item.commonName.en}
                            sx={{ objectFit: 'cover' }}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="h6" fontWeight={600}>
                                {item.commonName[i18n.language] || item.commonName.en}
                              </Typography>
                              <Typography variant="h5">
                                {getCategoryIcon(item.category)}
                              </Typography>
                            </Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              <em>{item.scientificName}</em>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {item.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {item.habitat?.map(h => (
                                <Chip
                                  key={h}
                                  size="small"
                                  label={h.replace('_', ' ')}
                                  icon={<LocationOn fontSize="small" />}
                                />
                              ))}
                              <Chip
                                size="small"
                                label={item.conservationStatus?.replace('_', ' ')}
                                sx={{
                                  backgroundColor: getConservationColor(item.conservationStatus),
                                  color: 'white'
                                }}
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </AnimatePresence>
              </Grid>
            ) : (
              <List>
                {species.map((item) => (
                  <Paper key={item.id} sx={{ mb: 2 }}>
                    <ListItem
                      button
                      onClick={() => navigate(`/marine-life/species/${item.id}`)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 80, height: 80, mr: 2 }}
                          src={item.image || '/images/placeholder-ocean.jpg'}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6">
                              {item.commonName[i18n.language] || item.commonName.en}
                            </Typography>
                            <Typography variant="h5">
                              {getCategoryIcon(item.category)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="subtitle2" component="span">
                              <em>{item.scientificName}</em>
                            </Typography>
                            <br />
                            {item.description}
                            <Box sx={{ mt: 1 }}>
                              {item.habitat?.map(h => (
                                <Chip
                                  key={h}
                                  size="small"
                                  label={h.replace('_', ' ')}
                                  sx={{ mr: 1 }}
                                />
                              ))}
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  </Paper>
                ))}
              </List>
            )}

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
      </Container>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => navigate('/marine-life/virtual-dive')}
      >
        <Tooltip title="Take a Virtual Dive">
          <Waves />
        </Tooltip>
      </Fab>
    </Box>
  );
};

export default MarineLife;
