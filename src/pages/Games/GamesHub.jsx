import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip
} from '@mui/material';
import {
  SportsEsports,
  Memory,
  Explore,
  Psychology,
  Waves,
  PlayArrow
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * GamesHub Component
 * Central hub for all educational games
 */
const GamesHub = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      title: 'Species Memory Match',
      description: 'Match marine species with their names and characteristics',
      icon: <Memory />,
      difficulty: 'Easy',
      points: 50,
      color: '#4caf50',
      image: 'https://source.unsplash.com/400x300/?fish,colorful'
    },
    {
      id: 2,
      title: 'Ocean Explorer',
      description: 'Navigate through different ocean zones and discover species',
      icon: <Explore />,
      difficulty: 'Medium',
      points: 100,
      color: '#2196f3',
      image: 'https://source.unsplash.com/400x300/?ocean,underwater'
    },
    {
      id: 3,
      title: 'Marine Biologist Challenge',
      description: 'Identify species, habitats, and conservation status',
      icon: <Psychology />,
      difficulty: 'Hard',
      points: 150,
      color: '#9c27b0',
      image: 'https://source.unsplash.com/400x300/?marine,biology'
    },
    {
      id: 4,
      title: 'Wave Rider',
      description: 'Learn about ocean currents and tides through gameplay',
      icon: <Waves />,
      difficulty: 'Medium',
      points: 100,
      color: '#00bcd4',
      image: 'https://source.unsplash.com/400x300/?waves,surf'
    },
    {
      id: 5,
      title: 'Coral Reef Builder',
      description: 'Build and maintain a healthy coral reef ecosystem',
      icon: <SportsEsports />,
      difficulty: 'Medium',
      points: 100,
      color: '#ff9800',
      image: 'https://source.unsplash.com/400x300/?coral,reef'
    },
    {
      id: 6,
      title: 'Conservation Hero',
      description: 'Make decisions to protect marine life and habitats',
      icon: <Psychology />,
      difficulty: 'Hard',
      points: 150,
      color: '#f44336',
      image: 'https://source.unsplash.com/400x300/?conservation,nature'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'success',
      Medium: 'warning',
      Hard: 'error'
    };
    return colors[difficulty] || 'default';
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <SportsEsports sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Games Hub
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Learn through fun and interactive games - earn points while playing!
          </Typography>
        </Box>

        {/* Games Grid */}
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 160,
                    backgroundImage: `url(${game.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      backgroundColor: game.color,
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {game.icon}
                  </Box>
                  <Chip
                    label={game.difficulty}
                    color={getDifficultyColor(game.difficulty)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      fontWeight: 'bold'
                    }}
                  />
                </CardMedia>

                <CardContent sx={{ flexGrow: 1, paddingBottom: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {game.description}
                  </Typography>

                  <Chip
                    label={`+${game.points} points`}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  />
                </CardContent>

                <Box sx={{ padding: 2, paddingTop: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PlayArrow />}
                    onClick={() => navigate(`/games/${game.id}`)}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: game.color,
                      '&:hover': {
                        backgroundColor: game.color,
                        filter: 'brightness(0.9)'
                      }
                    }}
                  >
                    Play Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Coming Soon Section */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 4,
            textAlign: 'center',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            More Games Coming Soon!
          </Typography>
          <Typography variant="body1">
            We're constantly developing new educational games.
            Check back regularly for updates!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default GamesHub;
