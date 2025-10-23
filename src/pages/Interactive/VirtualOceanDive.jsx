// Virtual Ocean Dive Experience with Interactive Elements
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Slider,
  IconButton,
  Paper,
  Chip,
  Stack,
  LinearProgress,
  Dialog,
  DialogContent,
  Grid,
  Avatar,
  Tooltip
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  CameraAlt,
  Explore,
  Waves,
  WbSunny,
  Brightness3,
  Thermostat,
  Speed,
  EmojiEvents,
  Close,
  Favorite,
  ViewInAr,
  PhotoCamera,
  Check
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const VirtualOceanDive = () => {
  const { t } = useTranslation();
  const [depth, setDepth] = useState(0);
  const [discoveredCreatures, setDiscoveredCreatures] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [points, setPoints] = useState(0);
  const [oxygen, setOxygen] = useState(100);
  const [isDiving, setIsDiving] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);

  // Ocean zones with creatures
  const oceanZones = [
    {
      name: 'Sunlight Zone',
      depth: 0,
      depthRange: [0, 200],
      color: '#00BCD4',
      lightLevel: 100,
      temperature: '20-28°C',
      creatures: [
        { id: 1, name: 'Clownfish', emoji: '🐠', size: 'Small', rarity: 'Common', points: 10 },
        { id: 2, name: 'Sea Turtle', emoji: '🐢', size: 'Large', rarity: 'Uncommon', points: 25 },
        { id: 3, name: 'Dolphin', emoji: '🐬', size: 'Large', rarity: 'Uncommon', points: 30 },
        { id: 4, name: 'Manta Ray', emoji: '🦈', size: 'Large', rarity: 'Rare', points: 40 }
      ]
    },
    {
      name: 'Twilight Zone',
      depth: 200,
      depthRange: [200, 1000],
      color: '#1565C0',
      lightLevel: 50,
      temperature: '10-15°C',
      creatures: [
        { id: 5, name: 'Jellyfish', emoji: '🪼', size: 'Medium', rarity: 'Common', points: 15 },
        { id: 6, name: 'Squid', emoji: '🦑', size: 'Medium', rarity: 'Uncommon', points: 35 },
        { id: 7, name: 'Swordfish', emoji: '🐟', size: 'Large', rarity: 'Rare', points: 45 },
        { id: 8, name: 'Shark', emoji: '🦈', size: 'Large', rarity: 'Rare', points: 50 }
      ]
    },
    {
      name: 'Midnight Zone',
      depth: 1000,
      depthRange: [1000, 4000],
      color: '#0D47A1',
      lightLevel: 10,
      temperature: '4-10°C',
      creatures: [
        { id: 9, name: 'Anglerfish', emoji: '🐡', size: 'Small', rarity: 'Rare', points: 60 },
        { id: 10, name: 'Viperfish', emoji: '🐟', size: 'Small', rarity: 'Rare', points: 65 },
        { id: 11, name: 'Giant Squid', emoji: '🦑', size: 'Giant', rarity: 'Legendary', points: 100 },
        { id: 12, name: 'Goblin Shark', emoji: '🦈', size: 'Large', rarity: 'Legendary', points: 90 }
      ]
    },
    {
      name: 'Abyssal Zone',
      depth: 4000,
      depthRange: [4000, 6000],
      color: '#000051',
      lightLevel: 0,
      temperature: '2-4°C',
      creatures: [
        { id: 13, name: 'Vampire Squid', emoji: '🦑', size: 'Medium', rarity: 'Legendary', points: 120 },
        { id: 14, name: 'Gulper Eel', emoji: '🐍', size: 'Medium', rarity: 'Legendary', points: 110 },
        { id: 15, name: 'Dumbo Octopus', emoji: '🐙', size: 'Small', rarity: 'Legendary', points: 130 },
        { id: 16, name: 'Dragon Fish', emoji: '🐲', size: 'Small', rarity: 'Mythical', points: 200 }
      ]
    }
  ];

  // Get current zone based on depth
  const getCurrentZone = () => {
    return oceanZones.find(zone =>
      depth >= zone.depthRange[0] && depth < zone.depthRange[1]
    ) || oceanZones[0];
  };

  const currentZone = getCurrentZone();

  // Oxygen depletion
  useEffect(() => {
    if (isDiving && oxygen > 0) {
      const timer = setInterval(() => {
        setOxygen(prev => Math.max(0, prev - 0.5));
      }, 1000);
      return () => clearInterval(timer);
    }
    if (oxygen === 0) {
      setIsDiving(false);
    }
  }, [isDiving, oxygen]);

  // Random creature encounters
  useEffect(() => {
    if (isDiving) {
      const encounterChance = Math.random();
      if (encounterChance > 0.95) {
        const randomCreature = currentZone.creatures[
          Math.floor(Math.random() * currentZone.creatures.length)
        ];
        if (!discoveredCreatures.find(c => c.id === randomCreature.id)) {
          // Creature spotted notification
          setTimeout(() => {
            handleCreatureEncounter(randomCreature);
          }, 500);
        }
      }
    }
  }, [depth, isDiving]);

  const handleCreatureEncounter = (creature) => {
    setSelectedCreature(creature);
  };

  const handleCapturePhoto = () => {
    if (selectedCreature && !discoveredCreatures.find(c => c.id === selectedCreature.id)) {
      setDiscoveredCreatures([...discoveredCreatures, selectedCreature]);
      setPhotos([...photos, { ...selectedCreature, depth, zone: currentZone.name }]);
      setPoints(points + selectedCreature.points);
    }
    setSelectedCreature(null);
  };

  const handleDive = (direction) => {
    if (direction === 'down') {
      setDepth(Math.min(6000, depth + 100));
    } else {
      setDepth(Math.max(0, depth - 100));
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Common': return '#4CAF50';
      case 'Uncommon': return '#2196F3';
      case 'Rare': return '#9C27B0';
      case 'Legendary': return '#FFD700';
      case 'Mythical': return '#E91E63';
      default: return '#757575';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: '100vh' }}>
      {/* Header Stats */}
      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 3,
          background: `linear-gradient(135deg, ${currentZone.color} 0%, #0D47A1 100%)`,
          color: 'white'
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmojiEvents sx={{ color: '#FFD700' }} />
              <Typography variant="h6" fontWeight={700}>{points} Points</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhotoCamera />
              <Typography variant="h6">{discoveredCreatures.length} Discovered</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <Thermostat />
                <Typography variant="body2">Oxygen: {oxygen.toFixed(0)}%</Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={oxygen}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: oxygen < 30 ? '#F44336' : oxygen < 60 ? '#FF9800' : '#4CAF50'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Dive View */}
        <Grid item xs={12} md={8}>
          <MotionCard
            animate={{
              boxShadow: isDiving ? '0 20px 60px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)'
            }}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: '600px',
              background: `linear-gradient(180deg, ${currentZone.color} 0%, #000033 100%)`,
              border: '4px solid #1565C0'
            }}
          >
            {/* Water Surface Effect */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100px',
                background: 'linear-gradient(180deg, rgba(0,188,212,0.3) 0%, transparent 100%)',
                animation: depth < 50 ? 'waterSurface 3s ease-in-out infinite' : 'none',
                '@keyframes waterSurface': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-10px)' }
                }
              }}
            />

            {/* Floating Particles/Bubbles */}
            {isDiving && [...Array(15)].map((_, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: '100vh' }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [600, -100],
                  x: [0, Math.random() * 100 - 50, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                sx={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  fontSize: index % 3 === 0 ? '10px' : '6px',
                  color: 'rgba(255,255,255,0.6)'
                }}
              >
                ○
              </MotionBox>
            ))}

            {/* Creatures in Environment */}
            <AnimatePresence>
              {currentZone.creatures.slice(0, 3).map((creature, index) => (
                <MotionBox
                  key={creature.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    x: [0, Math.random() * 200 - 100, 0],
                    y: [100 + index * 150, 150 + index * 150, 100 + index * 150]
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  onClick={() => handleCreatureEncounter(creature)}
                  sx={{
                    position: 'absolute',
                    left: `${20 + index * 30}%`,
                    fontSize: '3rem',
                    cursor: 'pointer',
                    filter: `brightness(${currentZone.lightLevel}%)`,
                    '&:hover': {
                      transform: 'scale(1.3)',
                      filter: 'brightness(150%)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  {creature.emoji}
                </MotionBox>
              ))}
            </AnimatePresence>

            {/* Zone Info Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 20,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'white',
                p: 2,
                borderRadius: 2,
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography variant="h6" fontWeight={700}>{currentZone.name}</Typography>
              <Typography variant="body2">Depth: {depth}m</Typography>
              <Typography variant="body2">Light: {currentZone.lightLevel}%</Typography>
              <Typography variant="body2">Temp: {currentZone.temperature}</Typography>
            </Box>

            {/* Depth Gauge */}
            <Box
              sx={{
                position: 'absolute',
                right: 20,
                top: 20,
                bottom: 20,
                width: 60
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  height: '100%',
                  bgcolor: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Waves sx={{ color: 'white', mb: 2 }} />
                <Box sx={{ flexGrow: 1, width: '100%', position: 'relative' }}>
                  {oceanZones.map((zone, index) => {
                    const heightPercent = ((zone.depthRange[1] - zone.depthRange[0]) / 6000) * 100;
                    const topPercent = (zone.depthRange[0] / 6000) * 100;
                    return (
                      <Box
                        key={zone.name}
                        sx={{
                          position: 'absolute',
                          top: `${topPercent}%`,
                          left: 0,
                          right: 0,
                          height: `${heightPercent}%`,
                          bgcolor: zone.color,
                          borderTop: '1px solid rgba(255,255,255,0.2)',
                          opacity: 0.6
                        }}
                      />
                    );
                  })}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: `${(depth / 6000) * 100}%`,
                      left: -5,
                      right: -5,
                      height: 4,
                      bgcolor: '#FFD700',
                      boxShadow: '0 0 10px #FFD700',
                      borderRadius: 2,
                      transition: 'top 0.3s ease'
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: 'white', mt: 2 }}>
                  {depth}m
                </Typography>
              </Paper>
            </Box>

            {/* Dive Controls */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2
              }}
            >
              <Tooltip title="Surface">
                <IconButton
                  onClick={() => handleDive('up')}
                  disabled={depth === 0}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' },
                    width: 60,
                    height: 60
                  }}
                >
                  <ArrowUpward />
                </IconButton>
              </Tooltip>
              <Tooltip title={isDiving ? 'Stop Diving' : 'Start Diving'}>
                <Button
                  variant="contained"
                  onClick={() => setIsDiving(!isDiving)}
                  disabled={oxygen === 0}
                  sx={{
                    bgcolor: isDiving ? '#F44336' : '#4CAF50',
                    '&:hover': {
                      bgcolor: isDiving ? '#D32F2F' : '#388E3C'
                    },
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700
                  }}
                >
                  {isDiving ? 'STOP' : 'START DIVE'}
                </Button>
              </Tooltip>
              <Tooltip title="Dive Deeper">
                <IconButton
                  onClick={() => handleDive('down')}
                  disabled={depth >= 6000 || oxygen < 10}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'white' },
                    width: 60,
                    height: 60
                  }}
                >
                  <ArrowDownward />
                </IconButton>
              </Tooltip>
            </Box>
          </MotionCard>
        </Grid>

        {/* Side Panel - Discovered Creatures */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              📸 Photo Collection ({discoveredCreatures.length})
            </Typography>
            <Grid container spacing={2}>
              {discoveredCreatures.length > 0 ? (
                discoveredCreatures.map((creature) => (
                  <Grid item xs={6} key={creature.id}>
                    <MotionCard
                      whileHover={{ scale: 1.05 }}
                      sx={{
                        p: 2,
                        textAlign: 'center',
                        bgcolor: '#E3F2FD',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedCreature(creature)}
                    >
                      <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>
                        {creature.emoji}
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {creature.name}
                      </Typography>
                      <Chip
                        label={`+${creature.points}`}
                        size="small"
                        color="success"
                        sx={{ mt: 1 }}
                      />
                    </MotionCard>
                  </Grid>
                ))
              ) : (
                <Box sx={{ p: 3, textAlign: 'center', width: '100%' }}>
                  <Typography color="text.secondary">
                    No creatures discovered yet. Start diving!
                  </Typography>
                </Box>
              )}
            </Grid>
          </Paper>

          {/* Zone Creatures */}
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              🌊 Creatures in {currentZone.name}
            </Typography>
            <Stack spacing={1}>
              {currentZone.creatures.map((creature) => {
                const discovered = discoveredCreatures.find(c => c.id === creature.id);
                return (
                  <Paper
                    key={creature.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: discovered ? '#E8F5E9' : '#F5F5F5',
                      opacity: discovered ? 1 : 0.6
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem' }}>
                      {discovered ? creature.emoji : '❓'}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight={600}>
                        {discovered ? creature.name : '???'}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={creature.rarity}
                          size="small"
                          sx={{
                            bgcolor: getRarityColor(creature.rarity),
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                        <Chip
                          label={`${creature.points} pts`}
                          size="small"
                          color="success"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Stack>
                    </Box>
                    {discovered && <Check sx={{ color: '#4CAF50' }} />}
                  </Paper>
                );
              })}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Creature Encounter Dialog */}
      <Dialog
        open={Boolean(selectedCreature)}
        onClose={() => setSelectedCreature(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedCreature && (
          <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
            <IconButton
              onClick={() => setSelectedCreature(null)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
                bgcolor: 'white'
              }}
            >
              <Close />
            </IconButton>

            <Box
              sx={{
                height: 300,
                background: `linear-gradient(135deg, ${currentZone.color} 0%, #0D47A1 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <MotionBox
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [-5, 5, -5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                sx={{ fontSize: '8rem' }}
              >
                {selectedCreature.emoji}
              </MotionBox>
            </Box>

            <Box sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {selectedCreature.name}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Size</Typography>
                  <Typography variant="body1" fontWeight={600}>{selectedCreature.size}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Rarity</Typography>
                  <Chip
                    label={selectedCreature.rarity}
                    size="small"
                    sx={{
                      bgcolor: getRarityColor(selectedCreature.rarity),
                      color: 'white',
                      fontWeight: 700
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary">Points</Typography>
                  <Chip label={`+${selectedCreature.points}`} color="success" size="small" />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<CameraAlt />}
                onClick={handleCapturePhoto}
                disabled={discoveredCreatures.find(c => c.id === selectedCreature.id)}
                sx={{
                  bgcolor: '#1565C0',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700
                }}
              >
                {discoveredCreatures.find(c => c.id === selectedCreature.id)
                  ? '✅ Already Captured'
                  : '📸 Capture Photo'}
              </Button>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
};

export default VirtualOceanDive;
