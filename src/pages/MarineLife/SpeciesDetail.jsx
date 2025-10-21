import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Button,
  Card,
  CardMedia,
  Divider,
  Alert,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Info,
  Park,
  Restaurant,
  Timeline,
  Warning,
  EmojiEvents
} from '@mui/icons-material';
import LoadingScreen from '../../components/Common/LoadingScreen';

/**
 * SpeciesDetail Component
 * Displays comprehensive information about a specific marine species
 * Includes images, facts, habitat, conservation status, and more
 */
const SpeciesDetail = () => {
  const { speciesId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [species, setSpecies] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadSpeciesData();
  }, [speciesId]);

  const loadSpeciesData = async () => {
    try {
      // TODO: Fetch from Firebase
      // const speciesData = await getSpeciesById(speciesId);

      // Sample data for testing
      const sampleSpecies = {
        id: speciesId,
        scientificName: 'Balaenoptera musculus',
        commonName: {
          en: 'Blue Whale',
          si: 'නිල් තල්මස්සා',
          ta: 'நீல திமிங்கலம்'
        },
        localNames: ['Maha Thel Massa', 'Neel Thalassa'],
        category: 'mammals',
        family: 'Balaenopteridae',
        genus: 'Balaenoptera',
        description: {
          en: 'The Blue Whale is the largest animal ever known to have lived on Earth. These magnificent marine mammals can reach lengths of up to 30 meters and weigh as much as 200 tons.',
          si: 'නිල් තල්මස්සා මෙතෙක් පෘථිවියේ ජීවත් වූ විශාලතම සත්වයා වේ.',
          ta: 'நீல திமிங்கலம் உலகில் வாழ்ந்த மிகப்பெரிய விலங்காகும்.'
        },
        habitat: ['open_ocean', 'deep_sea'],
        distribution: {
          global: 'Found in all major oceans',
          sriLanka: ['Southern Coast', 'Eastern Coast', 'Trincomalee Waters']
        },
        characteristics: {
          size: '25-30 meters',
          weight: '100-200 tons',
          lifespan: '80-90 years',
          diet: 'Krill (small crustaceans)',
          reproduction: 'One calf every 2-3 years'
        },
        behavior: 'Blue whales are typically solitary or travel in small groups. They communicate using low-frequency sounds.',
        conservationStatus: 'endangered',
        threats: ['Ship strikes', 'Ocean noise pollution', 'Climate change', 'Entanglement in fishing gear'],
        conservationEfforts: 'Protected under international law, whale watching regulations, research and monitoring programs.',
        funFacts: [
          'A Blue Whale\'s heart is the size of a small car',
          'They can eat up to 4 tons of krill per day',
          'Their calls are the loudest sounds made by any animal',
          'Newborn calves are already 7 meters long'
        ],
        importance: {
          ecological: 'Top predator that maintains ecosystem balance',
          economic: 'Eco-tourism and whale watching',
          cultural: 'Featured in Sri Lankan maritime folklore'
        },
        images: [
          'https://source.unsplash.com/800x600/?blue-whale,ocean',
          'https://source.unsplash.com/800x600/?whale,underwater'
        ],
        videos: [],
        relatedSpecies: [],
        references: [],
        sightings: 245,
        views: 1542,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setSpecies(sampleSpecies);
    } catch (error) {
      console.error('Error loading species:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // TODO: Save to Firebase
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: species.commonName.en,
        text: species.description.en.substring(0, 100) + '...',
        url: window.location.href
      });
    }
  };

  const getConservationColor = (status) => {
    const colors = {
      critically_endangered: '#d32f2f',
      endangered: '#f57c00',
      vulnerable: '#fbc02d',
      near_threatened: '#afb42b',
      least_concern: '#388e3c',
      data_deficient: '#757575'
    };
    return colors[status] || '#757575';
  };

  const getConservationLabel = (status) => {
    const labels = {
      critically_endangered: 'Critically Endangered',
      endangered: 'Endangered',
      vulnerable: 'Vulnerable',
      near_threatened: 'Near Threatened',
      least_concern: 'Least Concern',
      data_deficient: 'Data Deficient'
    };
    return labels[status] || 'Unknown';
  };

  if (loading) {
    return <LoadingScreen message="Loading species information..." />;
  }

  if (!species) {
    return (
      <Container>
        <Alert severity="error">Species not found.</Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/marine-life')}>
          Back to Marine Life
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/marine-life')}
          sx={{ marginBottom: 2 }}
        >
          Back to Marine Life
        </Button>

        {/* Header with Image */}
        <Paper elevation={3} sx={{ marginBottom: 3, overflow: 'hidden', borderRadius: 3 }}>
          {species.images && species.images.length > 0 && (
            <CardMedia
              component="img"
              height="400"
              image={species.images[0]}
              alt={species.commonName.en}
              sx={{ objectFit: 'cover' }}
            />
          )}

          <Box sx={{ padding: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {species.commonName.en}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  <em>{species.scientificName}</em>
                </Typography>

                {/* Local Names */}
                {species.localNames && species.localNames.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginTop: 1 }}>
                    {species.localNames.map((name, index) => (
                      <Chip key={index} label={name} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={handleFavoriteToggle}
                    color={isFavorite ? 'error' : 'default'}
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                  >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton
                    onClick={handleShare}
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                  >
                    <Share />
                  </IconButton>
                </Box>

                {/* Conservation Status */}
                <Chip
                  label={getConservationLabel(species.conservationStatus)}
                  sx={{
                    marginTop: 2,
                    backgroundColor: getConservationColor(species.conservationStatus),
                    color: 'white',
                    fontWeight: 'bold',
                    width: '100%'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper elevation={3} sx={{ marginBottom: 3, borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Overview" icon={<Info />} iconPosition="start" />
            <Tab label="Habitat & Distribution" icon={<LocationOn />} iconPosition="start" />
            <Tab label="Characteristics" icon={<Timeline />} iconPosition="start" />
            <Tab label="Conservation" icon={<Park />} iconPosition="start" />
            <Tab label="Fun Facts" icon={<EmojiEvents />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box>
          {/* Overview Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {species.description.en}
                  </Typography>

                  <Divider sx={{ marginY: 2 }} />

                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Behavior
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {species.behavior}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Quick Facts
                  </Typography>
                  <QuickFact icon={<Restaurant />} label="Diet" value={species.characteristics.diet} />
                  <QuickFact icon={<Timeline />} label="Lifespan" value={species.characteristics.lifespan} />
                  <QuickFact icon={<Info />} label="Size" value={species.characteristics.size} />
                  <QuickFact icon={<Info />} label="Weight" value={species.characteristics.weight} />
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Habitat & Distribution Tab */}
          {activeTab === 1 && (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                <LocationOn sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                Habitat & Distribution
              </Typography>

              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Habitat Types
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {species.habitat.map((hab, index) => (
                    <Chip key={index} label={hab.replace('_', ' ')} color="primary" />
                  ))}
                </Box>
              </Box>

              <Divider sx={{ marginY: 3 }} />

              <Box>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Global Distribution
                </Typography>
                <Typography variant="body1" paragraph>
                  {species.distribution.global}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Sri Lankan Waters
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {species.distribution.sriLanka.map((location, index) => (
                    <Chip key={index} label={location} variant="outlined" color="secondary" />
                  ))}
                </Box>
              </Box>
            </Paper>
          )}

          {/* Characteristics Tab */}
          {activeTab === 2 && (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Physical Characteristics
              </Typography>

              <Grid container spacing={3} sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6}>
                  <CharacteristicCard label="Size" value={species.characteristics.size} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CharacteristicCard label="Weight" value={species.characteristics.weight} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CharacteristicCard label="Lifespan" value={species.characteristics.lifespan} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CharacteristicCard label="Diet" value={species.characteristics.diet} />
                </Grid>
                <Grid item xs={12}>
                  <CharacteristicCard label="Reproduction" value={species.characteristics.reproduction} />
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* Conservation Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Alert
                  severity="warning"
                  icon={<Warning />}
                  sx={{ marginBottom: 2 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Conservation Status: {getConservationLabel(species.conservationStatus)}
                  </Typography>
                </Alert>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    <Warning sx={{ verticalAlign: 'middle', marginRight: 1, color: 'error.main' }} />
                    Threats
                  </Typography>
                  <Box component="ul" sx={{ paddingLeft: 2 }}>
                    {species.threats.map((threat, index) => (
                      <Typography component="li" key={index} variant="body1" paragraph>
                        {threat}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    <Park sx={{ verticalAlign: 'middle', marginRight: 1, color: 'success.main' }} />
                    Conservation Efforts
                  </Typography>
                  <Typography variant="body1">
                    {species.conservationEfforts}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Fun Facts Tab */}
          {activeTab === 4 && (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                <EmojiEvents sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                Fun Facts
              </Typography>

              <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {species.funFacts.map((fact, index) => (
                  <Grid item xs={12} key={index}>
                    <Card elevation={2} sx={{ padding: 2 }}>
                      <Typography variant="body1">
                        <strong>{index + 1}.</strong> {fact}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

// Helper Components
const QuickFact = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
    {icon}
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight="medium">
        {value}
      </Typography>
    </Box>
  </Box>
);

const CharacteristicCard = ({ label, value }) => (
  <Card elevation={2} sx={{ padding: 2 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h6" fontWeight="bold">
      {value}
    </Typography>
  </Card>
);

export default SpeciesDetail;
