import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { ThreeDRotation, PlayArrow, Explore, Visibility } from '@mui/icons-material';

const VirtualDive = () => {
  const [selectedScene, setSelectedScene] = useState(null);

  const diveScenes = [
    { id: 1, title: 'Hikkaduwa Coral Gardens', depth: '5-15m', difficulty: 'Beginner', image: 'https://source.unsplash.com/800x600/?coral,reef', description: 'Colorful coral reef teeming with tropical fish' },
    { id: 2, title: 'Pigeon Island Sanctuary', depth: '3-12m', difficulty: 'Beginner', image: 'https://source.unsplash.com/800x600/?underwater,reef', description: 'Protected marine sanctuary with pristine reefs' },
    { id: 3, title: 'Bar Reef Marine Park', depth: '10-25m', difficulty: 'Intermediate', image: 'https://source.unsplash.com/800x600/?ocean,fish', description: 'Sri Lanka\'s largest coral reef system' },
    { id: 4, title: 'Great Basses Wreck', depth: '30-40m', difficulty: 'Advanced', image: 'https://source.unsplash.com/800x600/?shipwreck,diving', description: 'Historic shipwreck with diverse marine life' }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 4, padding: 4, background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)', borderRadius: 3, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <ThreeDRotation sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Virtual Dive Experience
          </Typography>
          <Typography variant="h6">Explore Sri Lanka's underwater wonders in immersive 360° virtual reality</Typography>
        </Box>

        {!selectedScene ? (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>Choose Your Dive Site</Typography>
            <Grid container spacing={3}>
              {diveScenes.map(scene => (
                <Grid item xs={12} md={6} key={scene.id}>
                  <Card elevation={3} sx={{ borderRadius: 3, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardMedia component="img" height="250" image={scene.image} alt={scene.title} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{scene.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                        <Chip label={scene.depth} size="small" color="primary" />
                        <Chip label={scene.difficulty} size="small" color={scene.difficulty === 'Beginner' ? 'success' : scene.difficulty === 'Intermediate' ? 'warning' : 'error'} />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>{scene.description}</Typography>
                      <Button variant="contained" fullWidth startIcon={<PlayArrow />} onClick={() => setSelectedScene(scene)}>
                        Start Virtual Dive
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box>
            <Button onClick={() => setSelectedScene(null)} sx={{ marginBottom: 2 }}>← Back to Dive Sites</Button>
            <Paper elevation={3} sx={{ padding: 0, borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ height: '70vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Typography variant="h4" color="white">360° Virtual Dive View</Typography>
                <Typography variant="body1" color="white" sx={{ position: 'absolute', bottom: 20 }}>
                  🎮 Use mouse/touch to look around | {selectedScene.title}
                </Typography>
              </Box>
            </Paper>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<Visibility />}>Species Guide</Button></Grid>
              <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<Explore />}>Interactive Map</Button></Grid>
              <Grid item xs={4}><Button fullWidth variant="outlined" startIcon={<ThreeDRotation />}>VR Mode</Button></Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VirtualDive;
