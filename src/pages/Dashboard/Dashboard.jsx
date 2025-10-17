// src/pages/Dashboard/Dashboard.jsx - User dashboard with personalized content
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Tooltip,
  Badge,
  Skeleton
} from '@mui/material';
import {
  TrendingUp,
  EmojiEvents,
  Science,
  Quiz,
  School,
  Timer,
  CalendarToday,
  ArrowForward,
  Star,
  LocalFireDepartment,
  Waves,
  Water,
  AccountBalance,
  LiveTv,
  Groups,
  Notifications,
  PlayCircle,
  CheckCircle,
  Lock
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { getUserBadges, updateStreak } from '../../services/gamificationService';
import { getUserSubmissions } from '../../services/citizenScienceService';
import { getCurrentOceanData } from '../../services/oceanDataService';
import toast from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend
);

const Dashboard = ({ userProfile }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [oceanData, setOceanData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState(null);

  useEffect(() => {
    if (userProfile) {
      loadDashboardData();
      updateUserStreak();
    }
  }, [userProfile]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load user badges
      const userBadges = await getUserBadges(userProfile.uid);
      setBadges(userBadges.slice(0, 4)); // Show latest 4 badges
      
      // Load citizen science submissions
      const submissions = await getUserSubmissions(userProfile.uid);
      
      // Load ocean data
      const currentOceanData = await getCurrentOceanData();
      setOceanData(currentOceanData[0]); // Show first station data
      
      // Generate recommendations based on user progress
      generateRecommendations();
      
      // Load upcoming events
      loadUpcomingEvents();
      
      // Calculate weekly progress
      calculateWeeklyProgress();
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load some dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStreak = async () => {
    try {
      const result = await updateStreak(userProfile.uid);
      if (result.streak > 1) {
        toast.success(`🔥 ${result.streak} day streak!`, {
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const generateRecommendations = () => {
    const recs = [];
    
    // Based on user level and progress
    if (userProfile.level < 5) {
      recs.push({
        id: 'marine_basics',
        title: 'Marine Life Basics',
        description: 'Start with foundational marine biology',
        icon: <Waves />,
        path: '/marine-life',
        type: 'lesson'
      });
    }
    
    if (!userProfile.stats?.quizzesTaken || userProfile.stats.quizzesTaken < 3) {
      recs.push({
        id: 'first_quiz',
        title: 'Take Your First Quiz',
        description: 'Test your knowledge and earn points',
        icon: <Quiz />,
        path: '/quiz',
        type: 'quiz'
      });
    }
    
    if (!userProfile.stats?.citizenScienceContributions) {
      recs.push({
        id: 'citizen_science',
        title: 'Join Citizen Science',
        description: 'Contribute to real research',
        icon: <Groups />,
        path: '/citizen-science',
        type: 'activity'
      });
    }
    
    recs.push({
      id: 'live_cameras',
      title: 'Watch Live Underwater',
      description: 'See coral reefs in real-time',
      icon: <LiveTv />,
      path: '/live-data/cameras',
      type: 'explore'
    });
    
    setRecommendations(recs);
  };

  const loadUpcomingEvents = () => {
    // Mock upcoming events
    setUpcomingEvents([
      {
        id: 1,
        title: 'Beach Cleanup Challenge',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        type: 'challenge'
      },
      {
        id: 2,
        title: 'Marine Photography Contest',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: 'competition'
      },
      {
        id: 3,
        title: 'NARA Facility Visit - Colombo',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        type: 'field_visit'
      }
    ]);
  };

  const calculateWeeklyProgress = () => {
    // Mock weekly progress data
    setWeeklyProgress({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Points Earned',
        data: [50, 120, 80, 150, 200, 100, 180],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3
      }]
    });
  };

  const progressData = {
    labels: ['Marine Life', 'Freshwater', 'Heritage', 'NARA Science'],
    datasets: [{
      data: [
        userProfile?.progressTracking?.marineLife || 25,
        userProfile?.progressTracking?.freshwater || 15,
        userProfile?.progressTracking?.heritage || 10,
        userProfile?.progressTracking?.naraScience || 5
      ],
      backgroundColor: [
        'rgba(54, 162, 235, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ]
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map(i => (
          <Grid item xs={12} md={6} lg={3} key={i}>
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          sx={{ 
            p: 3, 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                Welcome back, {userProfile?.firstName}! 👋
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {userProfile?.streak > 0 
                  ? `You're on a ${userProfile.streak} day learning streak! Keep it up!`
                  : 'Start your learning journey today!'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Chip
                  icon={<Star />}
                  label={`Level ${userProfile?.level || 1}`}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<EmojiEvents />}
                  label={`${userProfile?.points || 0} Points`}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<LocalFireDepartment />}
                  label={`${userProfile?.streak || 0} Day Streak`}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/marine-life')}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Continue Learning
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <School />
                  </Avatar>
                  <Typography color="textSecondary" variant="body2">
                    Lessons Completed
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {userProfile?.stats?.lessonsCompleted || 0}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userProfile?.stats?.lessonsCompleted || 0) * 10} 
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                    <Quiz />
                  </Avatar>
                  <Typography color="textSecondary" variant="body2">
                    Quizzes Taken
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {userProfile?.stats?.quizzesTaken || 0}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userProfile?.stats?.quizzesTaken || 0) * 5} 
                  sx={{ mt: 2 }}
                  color="secondary"
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                    <Science />
                  </Avatar>
                  <Typography color="textSecondary" variant="body2">
                    Species Identified
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {userProfile?.stats?.speciesIdentified || 0}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userProfile?.stats?.speciesIdentified || 0) * 2} 
                  sx={{ mt: 2 }}
                  color="warning"
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 2 }}>
                    <Groups />
                  </Avatar>
                  <Typography color="textSecondary" variant="body2">
                    Contributions
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {userProfile?.stats?.citizenScienceContributions || 0}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(userProfile?.stats?.citizenScienceContributions || 0) * 10} 
                  sx={{ mt: 2 }}
                  color="error"
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Learning Progress */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Your Learning Journey
              </Typography>
              
              <Grid container spacing={3}>
                {/* Progress Chart */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Module Progress
                  </Typography>
                  <Box sx={{ height: 200, position: 'relative' }}>
                    <Doughnut data={progressData} options={chartOptions} />
                  </Box>
                  <List dense>
                    {['Marine Life', 'Freshwater', 'Heritage', 'NARA Science'].map((label, index) => (
                      <ListItem key={label}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%',
                            backgroundColor: progressData.datasets[0].backgroundColor[index],
                            mr: 1
                          }}
                        />
                        <ListItemText 
                          primary={label} 
                          secondary={`${progressData.datasets[0].data[index]}% complete`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Weekly Activity */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    This Week's Activity
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    {weeklyProgress && (
                      <Line 
                        data={weeklyProgress} 
                        options={{
                          ...chartOptions,
                          scales: {
                            y: {
                              beginAtZero: true
                            }
                          }
                        }} 
                      />
                    )}
                  </Box>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="h5" fontWeight={700}>
                      850
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Points this week
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Continue Learning Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Continue Where You Left Off
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      sx={{ 
                        p: 2, 
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 3 }
                      }}
                      onClick={() => navigate('/marine-life/species/blue-whale')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                          <Waves />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Blue Whales of Sri Lanka
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Marine Life • 65% complete
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <PlayCircle />
                        </IconButton>
                      </Box>
                      <LinearProgress variant="determinate" value={65} sx={{ mt: 1 }} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper 
                      sx={{ 
                        p: 2,
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 3 }
                      }}
                      onClick={() => navigate('/heritage')}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                          <AccountBalance />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Ancient Irrigation Systems
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Heritage • 30% complete
                          </Typography>
                        </Box>
                        <IconButton size="small">
                          <PlayCircle />
                        </IconButton>
                      </Box>
                      <LinearProgress variant="determinate" value={30} sx={{ mt: 1 }} color="warning" />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Recent Badges */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Recent Badges
                    </Typography>
                    <Button size="small" onClick={() => navigate('/profile/achievements')}>
                      View All
                    </Button>
                  </Box>
                  <Grid container spacing={1}>
                    {badges.length > 0 ? badges.map(badge => (
                      <Grid item xs={3} key={badge.id}>
                        <Tooltip title={badge.name}>
                          <Paper 
                            sx={{ 
                              p: 1, 
                              textAlign: 'center',
                              cursor: 'pointer',
                              '&:hover': { transform: 'scale(1.1)' }
                            }}
                          >
                            <Typography variant="h4">🏆</Typography>
                          </Paper>
                        </Tooltip>
                      </Grid>
                    )) : (
                      <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                        Complete activities to earn badges!
                      </Typography>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Live Ocean Data */}
            {oceanData && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Live Ocean Data
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {oceanData.name}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Temperature
                        </Typography>
                        <Typography variant="h6">
                          {oceanData.data?.temperature?.toFixed(1) || '--'}°C
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          Wave Height
                        </Typography>
                        <Typography variant="h6">
                          {oceanData.data?.wave_height?.toFixed(1) || '--'}m
                        </Typography>
                      </Grid>
                    </Grid>
                    <Button 
                      fullWidth 
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/live-data')}
                    >
                      View All Stations
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Upcoming Events */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Upcoming Events
                  </Typography>
                  <List dense>
                    {upcomingEvents.map(event => (
                      <ListItem key={event.id}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light' }}>
                            <CalendarToday fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={event.title}
                          secondary={event.date.toLocaleDateString()}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button fullWidth onClick={() => navigate('/challenges')}>
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recommended for You
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map(rec => (
                  <Grid item xs={12} sm={6} md={3} key={rec.id}>
                    <Paper 
                      sx={{ 
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': { 
                          boxShadow: 3,
                          transform: 'translateY(-4px)'
                        }
                      }}
                      onClick={() => navigate(rec.path)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Avatar sx={{ bgcolor: 'primary.light', mr: 2 }}>
                          {rec.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {rec.title}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {rec.description}
                          </Typography>
                          <Chip 
                            label={rec.type} 
                            size="small" 
                            sx={{ mt: 1 }}
                            color={
                              rec.type === 'lesson' ? 'primary' :
                              rec.type === 'quiz' ? 'secondary' :
                              rec.type === 'activity' ? 'success' : 'default'
                            }
                          />
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
