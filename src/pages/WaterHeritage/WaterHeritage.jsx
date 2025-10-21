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
  Chip
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  AccountBalance,
  Opacity,
  Engineering,
  History,
  EmojiEvents,
  Castle
} from '@mui/icons-material';

/**
 * WaterHeritage Component
 * Explores Sri Lanka's ancient irrigation systems and water heritage
 */
const WaterHeritage = () => {
  const ancientTanks = [
    {
      name: 'Parakrama Samudra',
      location: 'Polonnaruwa',
      built: '1153 CE',
      area: '2,400 hectares',
      king: 'King Parakramabahu I',
      description: 'The Sea of Parakrama - one of the largest ancient reservoirs in Asia',
      image: 'https://source.unsplash.com/800x600/?sri-lanka,ancient,water',
      significance: 'Still irrigates 18,200 acres of paddy fields today'
    },
    {
      name: 'Kala Wewa',
      location: 'Anuradhapura',
      built: '459 CE',
      area: '2,860 hectares',
      king: 'King Dhatusena',
      description: 'Connected to Tissa Wewa via 54-mile Yoda Ela canal',
      image: 'https://source.unsplash.com/800x600/?reservoir,ancient',
      significance: 'Engineering marvel of ancient hydraulics'
    },
    {
      name: 'Tissa Wewa',
      location: 'Anuradhapura',
      built: '3rd century BCE',
      area: '200 hectares',
      king: 'King Devanampiya Tissa',
      description: 'Sacred lake adjacent to ancient capital',
      image: 'https://source.unsplash.com/800x600/?lake,temple',
      significance: 'Over 2,200 years old and still functional'
    }
  ];

  const engineeringMarvels = [
    {
      title: 'Yoda Ela Canal',
      description: 'A 87 km canal with perfect gradient maintaining 6 inches per mile drop',
      icon: <Engineering />,
      period: '5th Century CE'
    },
    {
      title: 'Bisokotuwa',
      description: 'Ingenious valve pits for controlling water flow from tanks',
      icon: <Opacity />,
      period: 'Anuradhapura Period'
    },
    {
      title: 'Cascade Tank System',
      description: 'Series of interconnected tanks optimizing water use',
      icon: <AccountBalance />,
      period: 'Various Periods'
    }
  ];

  const timeline = [
    {
      year: '543 BCE',
      event: 'Arrival of Vijaya',
      description: 'Beginning of hydraulic civilization in Sri Lanka'
    },
    {
      year: '300 BCE',
      event: 'Basawakkulama Tank',
      description: 'First recorded irrigation tank built'
    },
    {
      year: '161 BCE',
      event: 'King Dutugemunu Era',
      description: 'Major expansion of irrigation networks'
    },
    {
      year: '459 CE',
      event: 'Kala Wewa',
      description: 'King Dhatusena builds largest reservoir of the era'
    },
    {
      year: '1153 CE',
      event: 'Parakrama Samudra',
      description: 'King Parakramabahu I creates the "Sea of Parakrama"'
    },
    {
      year: '1815-Present',
      event: 'Colonial to Modern',
      description: 'Restoration and modernization of ancient systems'
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          sx={{
            marginBottom: 4,
            padding: 4,
            background: 'linear-gradient(135deg, #6a1b9a 0%, #8e24aa 100%)',
            borderRadius: 3,
            color: 'white'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <AccountBalance sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Water Heritage of Sri Lanka
          </Typography>
          <Typography variant="h6">
            2,500 years of hydraulic engineering excellence - "Not even a drop of rain water should flow to the ocean without serving the people"
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1, opacity: 0.9 }}>
            - King Parakramabahu I
          </Typography>
        </Box>

        {/* Quick Facts */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <Opacity sx={{ fontSize: 48, color: 'primary.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">30,000+</Typography>
              <Typography variant="body2" color="text.secondary">Ancient Tanks</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <Engineering sx={{ fontSize: 48, color: 'secondary.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">2,500+</Typography>
              <Typography variant="body2" color="text.secondary">Years Old</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <Castle sx={{ fontSize: 48, color: 'warning.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">87 km</Typography>
              <Typography variant="body2" color="text.secondary">Longest Ancient Canal</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
              <EmojiEvents sx={{ fontSize: 48, color: 'success.main', marginBottom: 1 }} />
              <Typography variant="h4" fontWeight="bold">UNESCO</Typography>
              <Typography variant="body2" color="text.secondary">World Heritage</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Ancient Tanks Section */}
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
          <Opacity sx={{ verticalAlign: 'middle', marginRight: 1 }} />
          Great Ancient Reservoirs
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {ancientTanks.map((tank, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <CardMedia
                      component="img"
                      height="100%"
                      image={tank.image}
                      alt={tank.name}
                      sx={{ minHeight: 300 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <CardContent sx={{ padding: 3 }}>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {tank.name}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                        <Chip label={tank.location} color="primary" />
                        <Chip label={tank.built} color="secondary" />
                        <Chip label={tank.area} color="info" />
                      </Box>

                      <Typography variant="body1" paragraph sx={{ marginTop: 2 }}>
                        {tank.description}
                      </Typography>

                      <Paper elevation={1} sx={{ padding: 2, backgroundColor: '#f5f5f5', marginY: 2 }}>
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                          👑 Built by: {tank.king}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tank.significance}
                        </Typography>
                      </Paper>

                      <Typography variant="caption" color="text.secondary" fontStyle="italic">
                        💡 Many of these ancient tanks continue to irrigate farmlands today, testament to the brilliance of ancient Sri Lankan engineers
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Engineering Marvels */}
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
          <Engineering sx={{ verticalAlign: 'middle', marginRight: 1 }} />
          Engineering Innovations
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {engineeringMarvels.map((marvel, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3} sx={{ height: '100%', borderRadius: 3, padding: 2 }}>
                <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                  {React.cloneElement(marvel.icon, { sx: { fontSize: 60, color: 'primary.main' } })}
                </Box>
                <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
                  {marvel.title}
                </Typography>
                <Chip
                  label={marvel.period}
                  size="small"
                  color="secondary"
                  sx={{ display: 'block', margin: '0 auto 16px', width: 'fit-content' }}
                />
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  {marvel.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Historical Timeline */}
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
            <History sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Timeline of Hydraulic Civilization
          </Typography>

          <Timeline position="alternate">
            {timeline.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent color="text.secondary">
                  <Typography variant="h6" fontWeight="bold">
                    {item.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined">
                    <Opacity />
                  </TimelineDot>
                  {index < timeline.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.event}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Paper>

        {/* Cultural Significance */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            borderRadius: 3,
            background: 'linear-gradient(135deg, #e1bee7 0%, #ce93d8 100%)'
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            🏛️ UNESCO World Heritage Recognition
          </Typography>
          <Typography variant="body1" paragraph>
            The ancient cities of Anuradhapura and Polonnaruwa, with their magnificent irrigation systems,
            are UNESCO World Heritage Sites. These engineering marvels showcase the advanced hydraulic
            knowledge of ancient Sri Lankan civilization.
          </Typography>
          <Typography variant="body1">
            The cascade tank systems, still used today, demonstrate sustainable water management practices
            that modern engineers study and admire. This 2,500-year-old technology remains relevant in the 21st century.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default WaterHeritage;
