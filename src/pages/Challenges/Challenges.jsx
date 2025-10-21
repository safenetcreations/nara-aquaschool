import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  EmojiEvents,
  Timer,
  People,
  Star,
  CheckCircle,
  Lock,
  TrendingUp,
  Waves,
  Science,
  PhotoCamera,
  Quiz
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * Challenges Component
 * Displays daily, weekly, and special challenges for users
 */
const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    loadChallenges();
    loadUserProgress();
  }, []);

  const loadChallenges = () => {
    // Mock data - replace with actual API call
    const mockChallenges = [
      {
        id: 1,
        title: 'Marine Explorer',
        description: 'Explore 5 different marine species today',
        type: 'daily',
        difficulty: 'Easy',
        points: 50,
        xp: 100,
        icon: <Waves />,
        progress: 3,
        total: 5,
        timeLeft: '8h 23m',
        status: 'active',
        requirements: [
          'View 5 marine species pages',
          'Read about their habitats',
          'Complete the species quiz'
        ]
      },
      {
        id: 2,
        title: 'Quiz Master',
        description: 'Complete 3 quizzes with 80% or higher score',
        type: 'weekly',
        difficulty: 'Medium',
        points: 150,
        xp: 300,
        icon: <Quiz />,
        progress: 1,
        total: 3,
        timeLeft: '3d 12h',
        status: 'active',
        requirements: [
          'Complete Marine Life quiz',
          'Complete Freshwater quiz',
          'Complete Heritage quiz',
          'Score at least 80% on each'
        ]
      },
      {
        id: 3,
        title: 'Citizen Scientist',
        description: 'Submit 10 observations to citizen science projects',
        type: 'weekly',
        difficulty: 'Hard',
        points: 300,
        xp: 500,
        icon: <PhotoCamera />,
        progress: 4,
        total: 10,
        timeLeft: '5d 8h',
        status: 'active',
        requirements: [
          'Take photos of aquatic life',
          'Submit observations with location',
          'Add detailed descriptions',
          'Get 5 observations verified'
        ]
      },
      {
        id: 4,
        title: 'Knowledge Seeker',
        description: 'Read 20 educational articles',
        type: 'monthly',
        difficulty: 'Medium',
        points: 200,
        xp: 400,
        icon: <Science />,
        progress: 12,
        total: 20,
        timeLeft: '18d',
        status: 'active',
        requirements: [
          'Read articles from different categories',
          'Spend at least 2 minutes per article',
          'Complete comprehension checks'
        ]
      },
      {
        id: 5,
        title: 'Community Leader',
        description: 'Help 5 other students with their questions',
        type: 'special',
        difficulty: 'Hard',
        points: 500,
        xp: 1000,
        icon: <People />,
        progress: 0,
        total: 5,
        timeLeft: '14d',
        status: 'locked',
        requirements: [
          'Reach Level 10 to unlock',
          'Answer questions in forums',
          'Receive positive feedback',
          'Maintain helpful rating above 90%'
        ]
      },
      {
        id: 6,
        title: 'Perfect Week',
        description: 'Complete all daily challenges for 7 consecutive days',
        type: 'special',
        difficulty: 'Hard',
        points: 1000,
        xp: 2000,
        icon: <EmojiEvents />,
        progress: 3,
        total: 7,
        timeLeft: '4d',
        status: 'active',
        requirements: [
          'Complete every daily challenge',
          'No missed days',
          'Maintain streak for 7 days',
          'Earn bonus multiplier'
        ]
      }
    ];
    setChallenges(mockChallenges);
  };

  const loadUserProgress = () => {
    // Mock user progress
    setUserProgress({
      dailyCompleted: 2,
      weeklyCompleted: 1,
      monthlyCompleted: 0,
      totalPoints: 850,
      currentStreak: 5
    });
  };

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setDialogOpen(true);
  };

  const handleStartChallenge = (challenge) => {
    if (challenge.status === 'locked') {
      toast.error('This challenge is locked. Complete requirements to unlock.');
      return;
    }
    toast.success(`Started challenge: ${challenge.title}`);
    setDialogOpen(false);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'success',
      Medium: 'warning',
      Hard: 'error'
    };
    return colors[difficulty] || 'default';
  };

  const getTypeColor = (type) => {
    const colors = {
      daily: 'primary',
      weekly: 'secondary',
      monthly: 'info',
      special: 'warning'
    };
    return colors[type] || 'default';
  };

  const renderChallengeCard = (challenge) => (
    <Grid item xs={12} sm={6} md={4} key={challenge.id}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            opacity: challenge.status === 'locked' ? 0.6 : 1,
            '&:hover': {
              boxShadow: 6
            }
          }}
          onClick={() => handleChallengeClick(challenge)}
        >
          {challenge.status === 'locked' && (
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
          
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: challenge.status === 'locked' ? 'grey.400' : 'primary.main',
                  mr: 2
                }}
              >
                {challenge.icon}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {challenge.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={challenge.type}
                    size="small"
                    color={getTypeColor(challenge.type)}
                  />
                  <Chip
                    label={challenge.difficulty}
                    size="small"
                    color={getDifficultyColor(challenge.difficulty)}
                  />
                </Box>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {challenge.description}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  {challenge.progress}/{challenge.total}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(challenge.progress / challenge.total) * 100}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                  <Typography variant="caption" fontWeight={600}>
                    {challenge.points} pts
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendingUp sx={{ fontSize: 16, color: 'info.main' }} />
                  <Typography variant="caption" fontWeight={600}>
                    {challenge.xp} XP
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Timer sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {challenge.timeLeft}
                </Typography>
              </Box>
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
          Challenges
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Complete challenges to earn points, XP, and unlock achievements
        </Typography>
      </Box>

      {/* Progress Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {userProgress.currentStreak}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Day Streak 🔥
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                {userProgress.dailyCompleted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Daily Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="secondary.main" fontWeight={700}>
                {userProgress.weeklyCompleted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weekly Completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight={700}>
                {userProgress.totalPoints}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Challenges Grid */}
      <Grid container spacing={3}>
        {challenges.map(renderChallengeCard)}
      </Grid>

      {/* Challenge Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedChallenge && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {selectedChallenge.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedChallenge.title}</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip
                      label={selectedChallenge.type}
                      size="small"
                      color={getTypeColor(selectedChallenge.type)}
                    />
                    <Chip
                      label={selectedChallenge.difficulty}
                      size="small"
                      color={getDifficultyColor(selectedChallenge.difficulty)}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedChallenge.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(selectedChallenge.progress / selectedChallenge.total) * 100}
                  sx={{ height: 10, borderRadius: 5, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {selectedChallenge.progress} of {selectedChallenge.total} completed
                </Typography>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Requirements
              </Typography>
              <List dense>
                {selectedChallenge.requirements.map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {index < selectedChallenge.progress ? (
                        <CheckCircle color="success" />
                      ) : (
                        <CheckCircle color="disabled" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Rewards
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedChallenge.points} points
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedChallenge.xp} XP
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Time Remaining
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {selectedChallenge.timeLeft}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => handleStartChallenge(selectedChallenge)}
                disabled={selectedChallenge.status === 'locked'}
              >
                {selectedChallenge.status === 'locked' ? 'Locked' : 'Continue Challenge'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Challenges;
