// src/pages/MarineLife/MarineLife.jsx - Marine Life exploration page
import React, { useState, useEffect, useMemo } from 'react';
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
import { REAL_SL_MARINE_SPECIES, getSpeciesByCategory } from '../../data/realMarineSpecies';
import { GRADE_SPECIFIC_MARINE_SPECIES, getSpeciesContentByGrade, getAllSpeciesForGrade } from '../../data/gradeSpecificMarineContent';
import { getGradeLevel, getDifficultyLevel, getGradeAppropriateText } from '../../utils/gradeContentAdapter';
import { auth } from '../../config/firebase';
import { getUserProfile } from '../../services/authService';
import toast from 'react-hot-toast';
import { MARINE_GRADE_MODULES, getGradeBandByGrade } from '../../data/marineLearningModules';
import { VERIFIED_SL_STATS } from '../../data/verifiedStats';
import { getAllSpeciesImages, getSpeciesImage } from '../../services/speciesImageService';

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
  const [userGrade, setUserGrade] = useState(7); // Default to grade 7
  const [gradeLevel, setGradeLevel] = useState(null);
  const [selectedGradeBand, setSelectedGradeBand] = useState('grade56');
  const [speciesImages, setSpeciesImages] = useState({}); // Store uploaded images
  const [imagesLoading, setImagesLoading] = useState(false);
  const marineStats = VERIFIED_SL_STATS.marine;

  const heroStats = useMemo(
    () => [
      { key: 'total', value: marineStats.totalSpecies, label: t('marine.stats.totalSpecies') },
      { key: 'coral', value: marineStats.coral, label: t('marine.stats.coralSpecies') },
      { key: 'mammals', value: marineStats.mammals, label: t('marine.stats.marineMammals') }
    ],
    [t]
  );

  const localize = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    const lang = i18n.language || 'en';
    return value[lang] || value.en || Object.values(value)[0] || '';
  };

  const gradeModule = useMemo(
    () => MARINE_GRADE_MODULES.find((module) => module.id === selectedGradeBand) || MARINE_GRADE_MODULES[0],
    [selectedGradeBand]
  );

  const spotlightSpecies = useMemo(
    () =>
      (gradeModule?.spotlightSpecies || [])
        .map((id) => REAL_SL_MARINE_SPECIES.find((item) => item.id === id))
        .filter(Boolean),
    [gradeModule]
  );

  useEffect(() => {
    loadUserGrade();
    loadSpeciesImages();
  }, []);

  useEffect(() => {
    loadSpecies();
    loadFeaturedSpecies();
  }, [selectedCategory, selectedHabitat, page, userGrade]);

  useEffect(() => {
    if (userGrade) {
      setGradeLevel(getGradeLevel(userGrade));
      setSelectedGradeBand(getGradeBandByGrade(userGrade));
    }
  }, [userGrade]);

  const loadUserGrade = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const profile = await getUserProfile(user.uid);
        if (profile && profile.grade) {
          setUserGrade(parseInt(profile.grade));
        }
      }
    } catch (error) {
      console.log('Using default grade');
    }
  };

  const loadSpeciesImages = async () => {
    try {
      setImagesLoading(true);
      console.log('🖼️ Loading species images from Firestore...');

      const allImages = await getAllSpeciesImages();
      console.log('✅ Loaded species images:', allImages);

      // Create a map of species name -> image data
      const imageMap = {};
      allImages.forEach(imageData => {
        if (imageData.speciesName && imageData.imageUrl) {
          imageMap[imageData.speciesName] = imageData;
        }
      });

      setSpeciesImages(imageMap);
      console.log('📊 Species images map:', imageMap);

      if (allImages.length > 0) {
        toast.success(`Loaded ${allImages.length} AI-generated images!`);
      }
    } catch (error) {
      console.error('❌ Error loading species images:', error);
      toast.error('Failed to load species images');
    } finally {
      setImagesLoading(false);
    }
  };

  const loadSpecies = async () => {
    try {
      setLoading(true);
      
      // Use real verified species data
      let filteredSpecies = [...REAL_SL_MARINE_SPECIES];
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filteredSpecies = getSpeciesByCategory(selectedCategory);
      }
      
      // Filter by habitat
      if (selectedHabitat !== 'all') {
        filteredSpecies = filteredSpecies.filter(s => 
          s.habitat && s.habitat.includes(selectedHabitat)
        );
      }
      
      setSpecies(filteredSpecies);
      setTotalPages(Math.ceil(filteredSpecies.length / 12));
    } catch (error) {
      console.error('Error loading species:', error);
      toast.error('Failed to load species data');
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedSpecies = () => {
    // Use real Blue Whale data - the flagship species
    const blueWhale = REAL_SL_MARINE_SPECIES.find(s => s.id === 'blue-whale');
    if (blueWhale) {
      setFeaturedSpecies(blueWhale);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setLoading(true);
      try {
        const searchLower = searchTerm.toLowerCase();
        // Search through real species data
        const results = REAL_SL_MARINE_SPECIES.filter(species => 
          species.commonName.en.toLowerCase().includes(searchLower) ||
          species.commonName.si?.includes(searchTerm) ||
          species.commonName.ta?.includes(searchTerm) ||
          species.scientificName.toLowerCase().includes(searchLower) ||
          species.description[i18n.language]?.toLowerCase().includes(searchLower) ||
          species.description.en.toLowerCase().includes(searchLower)
        );
        
        setSpecies(results);
        if (results.length === 0) {
          toast.info(t('marine.noResults') || 'No species found matching your search.');
        } else {
          toast.success(`Found ${results.length} species`);
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

  const formatStatus = (status) => {
    if (!status) return '';
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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

  // Get AI-generated image for a species, or use default
  const getSpeciesImageUrl = (species) => {
    const commonName = species.commonName?.en || species.commonName;
    const imageData = speciesImages[commonName];

    if (imageData && imageData.imageUrl) {
      console.log(`🖼️ Using AI-generated image for ${commonName}:`, imageData.imageUrl);
      return imageData.imageUrl;
    }

    // Fallback to species.image or placeholder
    return species.image || '/images/placeholder-ocean.jpg';
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
                  {t('marine.subtitle')}
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
                  {heroStats.map((stat) => (
                    <Grid item xs={12} sm={4} key={stat.key}>
                      <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.12)' }}>
                        <Typography variant="h4" fontWeight={700}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2">{stat.label}</Typography>
                      </Paper>
                    </Grid>
                  ))}
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
                      image={getSpeciesImageUrl(featuredSpecies)}
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
                        {featuredSpecies.description[i18n.language] || featuredSpecies.description.en}
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
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                {/* Grade Level Selector */}
                {gradeLevel && (
                  <Chip
                    label={`${gradeLevel.icon} ${gradeLevel.label}`}
                    color="primary"
                    variant="outlined"
                    onClick={() => setSelectedGradeBand(getGradeBandByGrade(userGrade))}
                    sx={{ fontWeight: 600 }}
                  />
                )}
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

        {gradeModule && (
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                gap: 2,
                mb: 3
              }}
            >
              <Box sx={{ maxWidth: { md: '60%' } }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {t('marine.gradeExplorer.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {localize(gradeModule.summary)}
                </Typography>
              </Box>
              <ToggleButtonGroup
                size="small"
                exclusive
                value={selectedGradeBand}
                onChange={(_, value) => value && setSelectedGradeBand(value)}
              >
                {MARINE_GRADE_MODULES.map((module) => (
                  <ToggleButton key={module.id} value={module.id}>
                    {localize(module.label)}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              {t('marine.gradeExplorer.focusHeading')}
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {gradeModule.focusAreas.map((area, idx) => (
                <Grid item xs={12} md={4} key={`${gradeModule.id}-focus-${idx}`}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: '100%',
                      backgroundColor: '#f0f8ff',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h3" sx={{ mb: 1 }}>
                      {area.icon}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      {localize(area.title)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {localize(area.description)}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t('marine.gradeExplorer.goalsHeading')}
                </Typography>
                <List dense>
                  {gradeModule.learningGoals.map((goal, idx) => (
                    <ListItem key={`${gradeModule.id}-goal-${idx}`}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: 'primary.main',
                            width: 32,
                            height: 32,
                            fontSize: 16
                          }}
                        >
                          ⭐
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={localize(goal)} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t('marine.gradeExplorer.activityHeading')}
                </Typography>
                <List dense>
                  {gradeModule.activities.map((activity, idx) => (
                    <ListItem key={`${gradeModule.id}-activity-${idx}`}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: 'secondary.main',
                            width: 32,
                            height: 32,
                            fontSize: 16
                          }}
                        >
                          🌊
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={localize(activity)} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>

            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              {t('marine.gradeExplorer.speciesHeading')}
            </Typography>
            <Grid container spacing={2}>
              {spotlightSpecies.map((sp) => (
                <Grid item xs={12} sm={6} md={4} key={`${gradeModule.id}-${sp.id}`}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }
                    }}
                    onClick={() => navigate(`/marine-life/species/${sp.id}`)}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      <em>{sp.scientificName}</em>
                    </Typography>
                    <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                      {sp.commonName[i18n.language] || sp.commonName.en}
                    </Typography>
                    <Chip
                      size="small"
                      label={formatStatus(sp.conservationStatus)}
                      sx={{
                        backgroundColor: getConservationColor(sp.conservationStatus),
                        color: 'white',
                        mb: 1
                      }}
                    />
                    {(() => {
                      const description = sp.description[i18n.language] || sp.description.en || '';
                      const truncated = description.length > 180 ? `${description.slice(0, 180)}…` : description;
                      return (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {truncated}
                        </Typography>
                      );
                    })()}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {sp.habitat?.slice(0, 3).map((habitat) => (
                        <Chip
                          key={`${sp.id}-${habitat}`}
                          size="small"
                          label={habitat.replace('_', ' ')}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

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
                            image={getSpeciesImageUrl(item)}
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
                              {item.description[i18n.language] || item.description.en}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                              {/* Difficulty Badge based on grade */}
                              {gradeLevel && (
                                <Chip
                                  size="small"
                                  label={`${gradeLevel.icon} ${gradeLevel.difficulty.toUpperCase()}`}
                                  color="info"
                                  variant="filled"
                                  sx={{ fontWeight: 600 }}
                                />
                              )}
                            </Box>
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
                          src={getSpeciesImageUrl(item)}
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
                            {item.description[i18n.language] || item.description.en}
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
