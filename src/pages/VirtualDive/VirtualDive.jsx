import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { ThreeDRotation, PlayArrow, Explore, Visibility } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const VirtualDive = () => {
  const { t } = useTranslation();
  const [selectedSceneId, setSelectedSceneId] = useState(null);

  const sceneMedia = {
    hikkaduwa: 'https://source.unsplash.com/800x600/?coral,reef',
    pigeon: 'https://source.unsplash.com/800x600/?underwater,reef',
    barReef: 'https://source.unsplash.com/800x600/?ocean,fish',
    greatBasses: 'https://source.unsplash.com/800x600/?shipwreck,diving'
  };

  const scenes =
    (t('virtualDive.cards', { returnObjects: true }) || []).map((scene) => ({
      ...scene,
      image: sceneMedia[scene.id]
    })) || [];

  const difficultyLabels = t('virtualDive.difficultyLabels', { returnObjects: true }) || {};
  const viewerText = t('virtualDive.viewer', { returnObjects: true }) || {};
  const actionLabels = t('virtualDive.actions', { returnObjects: true }) || {};

  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  };

  const selectedScene = scenes.find((scene) => scene.id === selectedSceneId) || null;

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 4, padding: 4, background: 'linear-gradient(135deg, #00acc1 0%, #0097a7 100%)', borderRadius: 3, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <ThreeDRotation sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            {t('virtualDive.title')}
          </Typography>
          <Typography variant="h6">{t('virtualDive.subtitle')}</Typography>
        </Box>

        {!selectedScene ? (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 3 }}>
              {t('virtualDive.choosePrompt')}
            </Typography>
            <Grid container spacing={3}>
              {scenes.map((scene) => (
                <Grid item xs={12} md={6} key={scene.id}>
                  <Card elevation={3} sx={{ borderRadius: 3, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                    <CardMedia component="img" height="250" image={scene.image} alt={scene.title} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{scene.title}</Typography>
                      <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                        <Chip label={scene.depth} size="small" color="primary" />
                        <Chip
                          label={difficultyLabels[scene.difficulty] || scene.difficulty}
                          size="small"
                          color={difficultyColors[scene.difficulty] || 'primary'}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" paragraph>{scene.description}</Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PlayArrow />}
                        onClick={() => setSelectedSceneId(scene.id)}
                      >
                        {t('virtualDive.startButton')}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Box>
            <Button onClick={() => setSelectedSceneId(null)} sx={{ marginBottom: 2 }}>
              {viewerText.back || '← Back to Dive Sites'}
            </Button>
            <Paper elevation={3} sx={{ padding: 0, borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ height: '70vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Typography variant="h4" color="white">{viewerText.heading || '360° Virtual Dive View'}</Typography>
                {selectedScene && (
                  <Typography variant="body1" color="white" sx={{ position: 'absolute', bottom: 20 }}>
                    {t('virtualDive.viewer.hint', { site: selectedScene.title })}
                  </Typography>
                )}
              </Box>
            </Paper>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={4}>
                <Button fullWidth variant="outlined" startIcon={<Visibility />}>
                  {actionLabels.speciesGuide || t('virtualDive.actions.speciesGuide')}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant="outlined" startIcon={<Explore />}>
                  {actionLabels.map || t('virtualDive.actions.map')}
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button fullWidth variant="outlined" startIcon={<ThreeDRotation />}>
                  {actionLabels.vrMode || t('virtualDive.actions.vrMode')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VirtualDive;
