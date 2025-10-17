import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Card, CardContent, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Videocam, Favorite, FavoriteBorder, Share, PhotoCamera, Refresh } from '@mui/icons-material';

const UnderwaterCams = () => {
  const [view, setView] = useState('grid');
  const [favorited, setFavorited] = useState([]);

  const cameras = [
    { id: 1, name: 'Hikkaduwa Reef', location: 'Southern Coast', status: 'live', viewers: 1247, image: 'https://source.unsplash.com/800x600/?coral,reef,underwater' },
    { id: 2, name: 'Pigeon Island', location: 'Eastern Coast', status: 'live', viewers: 892, image: 'https://source.unsplash.com/800x600/?tropical,fish,underwater' },
    { id: 3, name: 'Bar Reef', location: 'Northwestern Coast', status: 'live', viewers: 645, image: 'https://source.unsplash.com/800x600/?reef,ocean,underwater' },
    { id: 4, name: 'Trincomalee Harbor', location: 'Eastern Coast', status: 'offline', viewers: 0, image: 'https://source.unsplash.com/800x600/?underwater,diving' }
  ];

  const toggleFavorite = (id) => {
    setFavorited(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 4, padding: 4, background: 'linear-gradient(135deg, #5e35b1 0%, #512da8 100%)', borderRadius: 3, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Videocam sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Live Underwater Cameras
          </Typography>
          <Typography variant="h6">Watch marine life in real-time from coral reefs around Sri Lanka</Typography>
          <Chip label="🔴 4 cameras online" sx={{ marginTop: 2, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
        </Box>

        <Grid container spacing={3}>
          {cameras.map(camera => (
            <Grid item xs={12} md={6} key={camera.id}>
              <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      height: 300,
                      backgroundImage: `url(${camera.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {camera.status === 'live' && (
                      <Chip label="🔴 LIVE" color="error" sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }} />
                    )}
                    {camera.status === 'offline' && (
                      <Box sx={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 2, borderRadius: 2 }}>
                        <Typography variant="h6" color="white">Camera Offline</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{camera.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>📍 {camera.location}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <Typography variant="body2" color="text.secondary">👁️ {camera.viewers.toLocaleString()} watching</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" startIcon={favorited.includes(camera.id) ? <Favorite /> : <FavoriteBorder />} onClick={() => toggleFavorite(camera.id)}>
                        {favorited.includes(camera.id) ? 'Saved' : 'Save'}
                      </Button>
                      <Button size="small" startIcon={<PhotoCamera />}>Capture</Button>
                      <Button size="small" startIcon={<Share />}>Share</Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>🌊 Recent Sightings</Typography>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={6} md={3}><Chip label="🐢 Sea Turtle - 12:34 PM" color="success" sx={{ width: '100%' }} /></Grid>
            <Grid item xs={6} md={3}><Chip label="🦈 Reef Shark - 11:58 AM" color="primary" sx={{ width: '100%' }} /></Grid>
            <Grid item xs={6} md={3}><Chip label="🐙 Octopus - 11:22 AM" color="secondary" sx={{ width: '100%' }} /></Grid>
            <Grid item xs={6} md={3}><Chip label="🐠 Parrotfish - 10:45 AM" color="info" sx={{ width: '100%' }} /></Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} sx={{ padding: 3, marginTop: 3, borderRadius: 3, backgroundColor: '#f3e5f5' }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>💡 Did you know?</Typography>
          <Typography variant="body2">
            These underwater cameras help scientists monitor coral health, track marine species, and study ocean conditions.
            By watching, you're contributing to citizen science by reporting interesting sightings!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default UnderwaterCams;
