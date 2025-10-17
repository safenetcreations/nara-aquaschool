import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Water,
  Waves,
  Terrain,
  ExpandMore,
  PlayArrow,
  MenuBook,
  EmojiNature
} from '@mui/icons-material';

/**
 * FreshwaterFrontiers Component
 * Educational content about rivers, lakes, wetlands in Sri Lanka
 */
const FreshwaterFrontiers = () => {
  const [activeTab, setActiveTab] = useState(0);

  const rivers = [
    {
      name: 'Mahaweli River',
      length: '335 km',
      description: 'Sri Lanka\'s longest river, vital for irrigation and hydroelectric power',
      image: 'https://source.unsplash.com/800x600/?river,sri-lanka',
      species: ['Freshwater fish', 'Crocodiles', 'Water birds'],
      importance: 'Powers 40% of Sri Lanka\'s electricity'
    },
    {
      name: 'Kelani River',
      length: '145 km',
      description: 'Main water source for Colombo and surrounding areas',
      image: 'https://source.unsplash.com/800x600/?river,forest',
      species: ['Endemic fish', 'Otters', 'Kingfishers'],
      importance: 'Supplies water to 2.5 million people'
    },
    {
      name: 'Kalu River',
      length: '129 km',
      description: 'Known for white water rafting and biodiversity',
      image: 'https://source.unsplash.com/800x600/?river,rapid',
      species: ['Rare amphibians', 'Freshwater crabs', 'Endemic fish'],
      importance: 'Part of UNESCO Biosphere Reserve'
    }
  ];

  const lakes = [
    {
      name: 'Beira Lake',
      location: 'Colombo',
      description: 'Historic urban lake in the heart of Colombo',
      image: 'https://source.unsplash.com/800x600/?lake,city',
      area: '65 hectares',
      activities: ['Boat rides', 'Bird watching', 'Parks']
    },
    {
      name: 'Gregory Lake',
      location: 'Nuwara Eliya',
      description: 'Popular tourist destination in the hill country',
      image: 'https://source.unsplash.com/800x600/?lake,mountain',
      area: '91.2 hectares',
      activities: ['Boating', 'Fishing', 'Cycling']
    },
    {
      name: 'Kandy Lake',
      location: 'Kandy',
      description: 'Artificial lake near the Temple of the Tooth',
      image: 'https://source.unsplash.com/800x600/?lake,temple',
      area: '18 hectares',
      activities: ['Walking', 'Photography', 'Cultural tours']
    }
  ];

  const wetlands = [
    {
      name: 'Muthurajawela Wetland',
      location: 'Western Province',
      description: 'Coastal peat bog ecosystem, vital for flood control',
      image: 'https://source.unsplash.com/800x600/?wetland,mangrove',
      biodiversity: '194 species of flora, 209 species of fauna',
      threats: ['Urban development', 'Pollution', 'Land reclamation']
    },
    {
      name: 'Bundala Wetland',
      location: 'Southern Province',
      description: 'Ramsar wetland site, important for migratory birds',
      image: 'https://source.unsplash.com/800x600/?wetland,birds',
      biodiversity: '197 bird species including flamingos',
      threats: ['Drought', 'Invasive species', 'Human disturbance']
    },
    {
      name: 'Annaiwilundawa Wetland',
      location: 'North Western Province',
      description: 'Ancient tank system supporting diverse wildlife',
      image: 'https://source.unsplash.com/800x600/?wetland,wildlife',
      biodiversity: '150+ bird species, rare reptiles',
      threats: ['Agricultural runoff', 'Habitat loss', 'Water extraction']
    }
  ];

  const conservationTips = [
    'Reduce water usage at home to protect freshwater sources',
    'Never dump waste in rivers, lakes, or wetlands',
    'Participate in local river cleanup campaigns',
    'Support wetland conservation organizations',
    'Learn about and report illegal sand mining',
    'Plant native trees along riverbanks'
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            marginBottom: 4,
            padding: 4,
            background: 'linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%)',
            borderRadius: 3,
            color: 'white'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Water sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Freshwater Frontiers
          </Typography>
          <Typography variant="h6">
            Explore Sri Lanka's rivers, lakes, and wetlands - the lifelines of our nation
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <Waves sx={{ fontSize: 48, color: 'primary.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">103</Typography>
              <Typography variant="body2" color="text.secondary">Rivers in Sri Lanka</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <Water sx={{ fontSize: 48, color: 'info.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">40+</Typography>
              <Typography variant="body2" color="text.secondary">Major Wetland Areas</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <EmojiNature sx={{ fontSize: 48, color: 'success.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">300+</Typography>
              <Typography variant="body2" color="text.secondary">Freshwater Species</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper elevation={3} sx={{ marginBottom: 3, borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab label="Rivers" icon={<Waves />} iconPosition="start" />
            <Tab label="Lakes" icon={<Water />} iconPosition="start" />
            <Tab label="Wetlands" icon={<Terrain />} iconPosition="start" />
            <Tab label="Conservation" icon={<EmojiNature />} iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Rivers Tab */}
        {activeTab === 0 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
              Major Rivers of Sri Lanka
            </Typography>
            <Grid container spacing={3}>
              {rivers.map((river, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={river.image}
                      alt={river.name}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {river.name}
                      </Typography>
                      <Chip label={river.length} color="primary" size="small" sx={{ marginBottom: 2 }} />
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {river.description}
                      </Typography>

                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Key Species:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, marginBottom: 2 }}>
                        {river.species.map((species, idx) => (
                          <Chip key={idx} label={species} size="small" variant="outlined" />
                        ))}
                      </Box>

                      <Typography variant="body2" color="info.main" fontWeight="medium">
                        💡 {river.importance}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Lakes Tab */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
              Beautiful Lakes of Sri Lanka
            </Typography>
            <Grid container spacing={3}>
              {lakes.map((lake, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={lake.image}
                      alt={lake.name}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {lake.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        📍 {lake.location}
                      </Typography>
                      <Chip label={lake.area} color="info" size="small" sx={{ marginBottom: 2 }} />

                      <Typography variant="body2" paragraph>
                        {lake.description}
                      </Typography>

                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Popular Activities:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {lake.activities.map((activity, idx) => (
                          <Chip key={idx} label={activity} size="small" variant="outlined" color="secondary" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Wetlands Tab */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
              Critical Wetland Ecosystems
            </Typography>

            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, borderRadius: 3, backgroundColor: '#e8f5e9' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                🌿 Why Wetlands Matter
              </Typography>
              <Typography variant="body2" paragraph>
                Wetlands are nature's water filters, flood protectors, and biodiversity hotspots. They provide critical
                ecosystem services including water purification, flood control, carbon storage, and habitat for countless species.
              </Typography>
            </Paper>

            <Grid container spacing={3}>
              {wetlands.map((wetland, index) => (
                <Grid item xs={12} key={index}>
                  <Card elevation={3} sx={{ borderRadius: 3 }}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={wetland.image}
                          alt={wetland.name}
                          sx={{ minHeight: 250 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {wetland.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            📍 {wetland.location}
                          </Typography>

                          <Typography variant="body1" paragraph sx={{ marginTop: 2 }}>
                            {wetland.description}
                          </Typography>

                          <Box sx={{ marginY: 2 }}>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                              🦋 Biodiversity:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {wetland.biodiversity}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography variant="body2" fontWeight="bold" gutterBottom>
                              ⚠️ Major Threats:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {wetland.threats.map((threat, idx) => (
                                <Chip key={idx} label={threat} size="small" color="error" variant="outlined" />
                              ))}
                            </Box>
                          </Box>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Conservation Tab */}
        {activeTab === 3 && (
          <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
              Freshwater Conservation
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                    💧 How You Can Help
                  </Typography>
                  <Box component="ul" sx={{ paddingLeft: 2 }}>
                    {conservationTips.map((tip, index) => (
                      <Typography component="li" key={index} variant="body2" paragraph>
                        {tip}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="secondary">
                    🎓 Learn More
                  </Typography>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight="medium">Water Cycle & Freshwater Systems</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Learn how water moves through rivers, lakes, and wetlands, and why this cycle is essential for all life.
                      </Typography>
                      <Button startIcon={<MenuBook />} sx={{ marginTop: 1 }} size="small">
                        Start Lesson
                      </Button>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight="medium">Endemic Freshwater Species</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Discover unique fish, amphibians, and other species found only in Sri Lanka's freshwater habitats.
                      </Typography>
                      <Button startIcon={<PlayArrow />} sx={{ marginTop: 1 }} size="small">
                        Watch Video
                      </Button>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight="medium">Threats to Freshwater Ecosystems</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Understand pollution, habitat destruction, and climate change impacts on our freshwater resources.
                      </Typography>
                      <Button startIcon={<MenuBook />} sx={{ marginTop: 1 }} size="small">
                        Read More
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FreshwaterFrontiers;
