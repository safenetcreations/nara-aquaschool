import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
  Tooltip
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  LocalFireDepartment,
  School,
  Waves,
  Science,
  PhotoCamera,
  Groups,
  Timer,
  CheckCircle,
  Lock
} from '@mui/icons-material';
import { motion } from 'framer-motion';

/**
 * Achievements Component
 * Displays user achievements, badges, and progress
 */
const Achievements = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadAchievements();
    loadStats();
  }, []);

  const loadAchievements = () => {
    // Mock achievements data
    const mockAchievements = [
      {
        id: 1,
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: <School />,
        category: 'learning',
        rarity: 'common',
        points: 10,
        unlocked: true,
        unlockedDate: '2024-01-15',
        progress: 1,
        total: 1
      },
      {
        id: 2,
        title: 'Marine Explorer',
        description: 'Explore 50 marine species',
        icon: <Waves />,
        category: 'exploration',
        rarity: 'rare',
        points: 100,
        unlocked: true,
        unlockedDate: '2024-02-20',
        progress: 50,
        total: 50
      },
      {
        id: 3,
        title: 'Quiz Master',
        description: 'Score 100% on 10 quizzes',
        icon: <Star />,
        category: 'knowledge',
        rarity: 'epic',
        points: 250,
        unlocked: false,
        progress: 6,
        total: 10
      },
      {
        id: 4,
        title: 'Citizen Scientist',
        description: 'Submit 100 observations',
        icon: <PhotoCamera />,
        category: 'contribution',
        rarity: 'legendary',
        points: 500,
        unlocked: false,
        progress: 45,
        total: 100
      },
      {
        id: 5,
        title: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: <LocalFireDepartment />,
        category: 'engagement',
        rarity: 'rare',
        points: 150,
        unlocked: true,
        unlockedDate: '2024-03-01',
        progress: 7,
        total: 7
      },
      {
        id: 6,
        title: 'Team Player',
        description: 'Help 25 other students',
        icon: <Groups />,
        category: 'social',
        rarity: 'epic',
        points: 200,
        unlocked: false,
        progress: 12,
        total: 25
      },
      {
        id: 7,
        title: 'Speed Learner',
        description: 'Complete 5 lessons in one day',
        icon: <Timer />,
        category: 'learning',
        rarity: 'rare',
        points: 100,
        unlocked: true,
        unlockedDate: '2024-02-10',
        progress: 5,
        total: 5
      },
      {
        id: 8,
        title: 'Research Pioneer',
        description: 'Read 100 scientific articles',
        icon: <Science />,
        category: 'knowledge',
        rarity: 'legendary',
        points: 500,
        unlocked: false,
        progress: 67,
        total: 100
      },
      {
        id: 9,
        title: 'Perfect Score',
        description: 'Get 100% on your first quiz',
        icon: <CheckCircle />,
        category: 'knowledge',
        rarity: 'common',
        points: 25,
        unlocked: true,
        unlockedDate: '2024-01-20',
        progress: 1,
        total: 1
      },
      {
        id: 10,
        title: 'Ocean Guardian',
        description: 'Complete all conservation challenges',
        icon: <EmojiEvents />,
        category: 'contribution',
        rarity: 'legendary',
        points: 1000,
        unlocked: false,
        progress: 3,
        total: 10
      }
    ];
    setAchievements(mockAchievements);
  };

  const loadStats = () => {
    setStats({
      totalAchievements: 10,
      unlockedAchievements: 5,
      totalPoints: 635,
      rareUnlocked: 2,
      epicUnlocked: 0,
      legendaryUnlocked: 0
    });
  };

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#9e9e9e',
      rare: '#2196f3',
      epic: '#9c27b0',
      legendary: '#ff9800'
    };
    return colors[rarity] || '#9e9e9e';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      learning: <School />,
      exploration: <Waves />,
      knowledge: <Star />,
      contribution: <PhotoCamera />,
      engagement: <LocalFireDepartment />,
      social: <Groups />
    };
    return icons[category] || <EmojiEvents />;
  };

  const filterAchievements = (filter) => {
    switch (filter) {
      case 0: // All
        return achievements;
      case 1: // Unlocked
        return achievements.filter(a => a.unlocked);
      case 2: // In Progress
        return achievements.filter(a => !a.unlocked && a.progress > 0);
      case 3: // Locked
        return achievements.filter(a => !a.unlocked && a.progress === 0);
      default:
        return achievements;
    }
  };

  const renderAchievementCard = (achievement) => (
    <Grid item xs={12} sm={6} md={4} key={achievement.id}>
      <motion.div
        whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card
          sx={{
            height: '100%',
            position: 'relative',
            opacity: achievement.unlocked ? 1 : 0.6,
            border: achievement.unlocked ? `2px solid ${getRarityColor(achievement.rarity)}` : 'none',
            '&:hover': {
              boxShadow: achievement.unlocked ? 8 : 2
            }
          }}
        >
          {!achievement.unlocked && (
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
              }}
            >
              <Lock color="disabled" />
            </Box>
          )}

          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Badge
                badgeContent={achievement.unlocked ? <CheckCircle sx={{ fontSize: 20 }} /> : null}
                color="success"
                overlap="circular"
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: achievement.unlocked ? getRarityColor(achievement.rarity) : 'grey.400',
                    mb: 2
                  }}
                >
                  {achievement.icon}
                </Avatar>
              </Badge>

              <Typography variant="h6" align="center" gutterBottom>
                {achievement.title}
              </Typography>

              <Chip
                label={achievement.rarity}
                size="small"
                sx={{
                  bgcolor: getRarityColor(achievement.rarity),
                  color: 'white',
                  fontWeight: 600,
                  mb: 1
                }}
              />

              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                {achievement.description}
              </Typography>

              {!achievement.unlocked && (
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Progress
                    </Typography>
                    <Typography variant="caption" fontWeight={600}>
                      {achievement.progress}/{achievement.total}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(achievement.progress / achievement.total) * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getRarityColor(achievement.rarity)
                      }
                    }}
                  />
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star sx={{ fontSize: 20, color: 'warning.main' }} />
                <Typography variant="body1" fontWeight={600}>
                  {achievement.points} points
                </Typography>
              </Box>

              {achievement.unlocked && achievement.unlockedDate && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Achievements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your progress and unlock badges
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <EmojiEvents />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.unlockedAchievements}/{stats.totalAchievements}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unlocked
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <Star />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.totalPoints}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Points
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#2196f3' }}>
                  <EmojiEvents />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.rareUnlocked}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rare Badges
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#ff9800' }}>
                  <EmojiEvents />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.legendaryUnlocked}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Legendary
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="All Achievements" />
          <Tab label="Unlocked" />
          <Tab label="In Progress" />
          <Tab label="Locked" />
        </Tabs>
      </Box>

      {/* Achievements Grid */}
      <Grid container spacing={3}>
        {filterAchievements(activeTab).map(renderAchievementCard)}
      </Grid>

      {filterAchievements(activeTab).length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No achievements in this category
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Achievements;
