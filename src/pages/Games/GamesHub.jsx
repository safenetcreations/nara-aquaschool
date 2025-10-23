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
import { useTranslation } from 'react-i18next';

/**
 * GamesHub Component
 * Central hub for all educational games
 */
const GamesHub = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const gameAssets = {
    memoryMatch: {
      icon: <Memory />,
      color: '#4caf50',
      image: 'https://source.unsplash.com/400x300/?fish,colorful'
    },
    oceanExplorer: {
      icon: <Explore />,
      color: '#2196f3',
      image: 'https://source.unsplash.com/400x300/?ocean,underwater'
    },
    biologistChallenge: {
      icon: <Psychology />,
      color: '#9c27b0',
      image: 'https://source.unsplash.com/400x300/?marine,biology'
    },
    waveRider: {
      icon: <Waves />,
      color: '#00bcd4',
      image: 'https://source.unsplash.com/400x300/?waves,surf'
    },
    coralBuilder: {
      icon: <SportsEsports />,
      color: '#ff9800',
      image: 'https://source.unsplash.com/400x300/?coral,reef'
    },
    conservationHero: {
      icon: <Psychology />,
      color: '#f44336',
      image: 'https://source.unsplash.com/400x300/?conservation,nature'
    }
  };

  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error'
  };

  const cardContent = t('games.cards', { returnObjects: true }) || [];
  const difficultyLabels = t('games.difficultyLabels', { returnObjects: true }) || {};
  const playButtonLabel = t('games.playButton');
  const comingSoon = t('games.comingSoon', { returnObjects: true }) || {};

  const games = cardContent.map((card) => ({
    ...card,
    ...(gameAssets[card.id] || {}),
    pointsLabel: t('games.pointsLabel', { points: card.points })
  }));

  const getDifficultyColor = (difficulty) => difficultyColors[difficulty] || 'default';

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <SportsEsports sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            {t('games.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('games.subtitle')}
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
                    label={difficultyLabels[game.difficulty] || game.difficulty}
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
                    label={game.pointsLabel}
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
                    {playButtonLabel}
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
            {comingSoon.title || ''}
          </Typography>
          <Typography variant="body1">
            {comingSoon.description || ''}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default GamesHub;
