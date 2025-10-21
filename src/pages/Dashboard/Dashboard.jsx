// src/pages/Dashboard/Dashboard.jsx - User dashboard with personalized content
import React, { useState, useEffect, useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';

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

const MODULE_KEYS = ['marineLife', 'freshwater', 'heritage', 'naraScience'];

const CONTINUE_LEARNING_CARDS = [
  {
    id: 'blueWhale',
    icon: Waves,
    avatarColor: 'info.main',
    progressColor: 'primary',
    titleKey: 'dashboard.continue.cards.blueWhale.title',
    categoryKey: 'dashboard.continue.categories.marine',
    percent: 65,
    path: '/marine-life/species/blue-whale'
  },
  {
    id: 'ancientIrrigation',
    icon: AccountBalance,
    avatarColor: 'warning.main',
    progressColor: 'warning',
    titleKey: 'dashboard.continue.cards.ancientIrrigation.title',
    categoryKey: 'dashboard.continue.categories.heritage',
    percent: 30,
    path: '/heritage'
  }
];

const RECOMMENDATION_DEFS = [
  {
    id: 'marine_basics',
    type: 'lesson',
    icon: Waves,
    path: '/marine-life',
    titleKey: 'dashboard.recommendations.marineBasics.title',
    descriptionKey: 'dashboard.recommendations.marineBasics.description',
    condition: (profile) => profile.level < 5
  },
  {
    id: 'first_quiz',
    type: 'quiz',
    icon: Quiz,
    path: '/quiz',
    titleKey: 'dashboard.recommendations.firstQuiz.title',
    descriptionKey: 'dashboard.recommendations.firstQuiz.description',
    condition: (profile) => !profile.stats?.quizzesTaken || profile.stats.quizzesTaken < 3
  },
  {
    id: 'citizen_science',
    type: 'activity',
    icon: Groups,
    path: '/citizen-science',
    titleKey: 'dashboard.recommendations.citizenScience.title',
    descriptionKey: 'dashboard.recommendations.citizenScience.description',
    condition: (profile) => !profile.stats?.citizenScienceContributions
  },
  {
    id: 'live_cameras',
    type: 'explore',
    icon: LiveTv,
    path: '/live-data/cameras',
    titleKey: 'dashboard.recommendations.liveCameras.title',
    descriptionKey: 'dashboard.recommendations.liveCameras.description',
    condition: () => true
  }
];

const UPCOMING_EVENT_DEFS = [
  { id: 1, titleKey: 'dashboard.events.beachCleanup', offsetDays: 3, type: 'challenge' },
  { id: 2, titleKey: 'dashboard.events.photographyContest', offsetDays: 7, type: 'competition' },
  { id: 3, titleKey: 'dashboard.events.facilityVisit', offsetDays: 14, type: 'fieldVisit' }
];

const WEEKDAY_KEYS = [
  'dashboard.weekly.days.mon',
  'dashboard.weekly.days.tue',
  'dashboard.weekly.days.wed',
  'dashboard.weekly.days.thu',
  'dashboard.weekly.days.fri',
  'dashboard.weekly.days.sat',
  'dashboard.weekly.days.sun'
];

const DEFAULT_WEEKLY_POINTS = [50, 120, 80, 150, 200, 100, 180];

const Dashboard = ({ userProfile }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [oceanData, setOceanData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState(DEFAULT_WEEKLY_POINTS);

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
      toast.error(t('dashboard.messages.loadError'));
    } finally {
      setLoading(false);
  }
};

  const weeklyChartData = useMemo(() => {
    if (!weeklyProgress) {
      return null;
    }

    return {
      labels: WEEKDAY_KEYS.map((key) => t(key)),
      datasets: [
        {
          label: t('dashboard.weekly.datasetLabel'),
          data: weeklyProgress,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3
        }
      ]
    };
  }, [weeklyProgress, t, i18n.language]);

  const weeklyPointsTotal = useMemo(
    () => weeklyProgress?.reduce((sum, value) => sum + value, 0) ?? 0,
    [weeklyProgress]
  );

  const updateUserStreak = async () => {
    try {
      const result = await updateStreak(userProfile.uid);
      if (result.streak > 1) {
        toast.success(t('dashboard.messages.streak', { count: result.streak }), {
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const generateRecommendations = () => {
    if (!userProfile) {
      setRecommendations([]);
      return;
    }

    const recs = RECOMMENDATION_DEFS.filter((def) => def.condition(userProfile)).map((def) => ({
      id: def.id,
      type: def.type,
      icon: def.icon,
      path: def.path,
      titleKey: def.titleKey,
      descriptionKey: def.descriptionKey
    }));

    setRecommendations(recs);
  };

  const loadUpcomingEvents = () => {
    const events = UPCOMING_EVENT_DEFS.map((event) => ({
      ...event,
      date: new Date(Date.now() + event.offsetDays * 24 * 60 * 60 * 1000)
    }));
    setUpcomingEvents(events);
  };

  const calculateWeeklyProgress = () => {
    setWeeklyProgress(DEFAULT_WEEKLY_POINTS);
  };

  const progressChartData = useMemo(() => {
    const values = [
      userProfile?.progressTracking?.marineLife ?? 25,
      userProfile?.progressTracking?.freshwater ?? 15,
      userProfile?.progressTracking?.heritage ?? 10,
      userProfile?.progressTracking?.naraScience ?? 5
    ];

    return {
      labels: MODULE_KEYS.map((key) => t(`dashboard.modules.${key}`)),
      datasets: [
        {
          data: values,
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ]
        }
      ]
    };
  }, [
    userProfile?.progressTracking?.marineLife,
    userProfile?.progressTracking?.freshwater,
    userProfile?.progressTracking?.heritage,
    userProfile?.progressTracking?.naraScience,
    t,
    i18n.language
  ]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  const firstName = userProfile?.firstName || userProfile?.displayName || '';

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
                {t('dashboard.welcome.title', { name: firstName })}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {userProfile?.streak > 0
                  ? t('dashboard.welcome.streakMessage', { count: userProfile.streak })
                  : t('dashboard.welcome.startMessage')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Chip
                  icon={<Star />}
                  label={t('layout.levelLabel', { level: userProfile?.level || 1 })}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<EmojiEvents />}
                  label={t('dashboard.stats.pointsChip', { points: userProfile?.points || 0 })}
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<LocalFireDepartment />}
                  label={t('dashboard.stats.streakChip', { count: userProfile?.streak || 0 })}
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
                {t('dashboard.actions.continueLearning')}
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
                    {t('dashboard.stats.lessonsCompleted')}
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
                    {t('dashboard.stats.quizzesTaken')}
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
                    {t('dashboard.stats.speciesIdentified')}
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
                    {t('dashboard.stats.contributions')}
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
                {t('dashboard.progress.heading')}
              </Typography>
              
              <Grid container spacing={3}>
                {/* Progress Chart */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {t('dashboard.progress.moduleProgress')}
                  </Typography>
                  <Box sx={{ height: 200, position: 'relative' }}>
                    <Doughnut data={progressChartData} options={chartOptions} />
                  </Box>
                  <List dense>
                    {MODULE_KEYS.map((key, index) => {
                      const color = progressChartData.datasets[0].backgroundColor[index];
                      const percent = progressChartData.datasets[0].data[index];

                      return (
                        <ListItem key={key}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: color,
                              mr: 1
                            }}
                          />
                          <ListItemText
                            primary={t(`dashboard.modules.${key}`)}
                            secondary={t('dashboard.progress.percentComplete', { percent })}
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>

                {/* Weekly Activity */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {t('dashboard.weekly.title')}
                  </Typography>
                  <Box sx={{ height: 200 }}>
                    {weeklyChartData && (
                      <Line 
                        data={weeklyChartData} 
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
                      {weeklyPointsTotal}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t('dashboard.weekly.pointsLabel')}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Continue Learning Section */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {t('dashboard.continue.heading')}
                </Typography>
                <Grid container spacing={2}>
                  {CONTINUE_LEARNING_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <Grid item xs={12} sm={6} key={card.id}>
                        <Paper
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 3 }
                          }}
                          onClick={() => navigate(card.path)}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: card.avatarColor, mr: 2 }}>
                              <Icon />
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {t(card.titleKey)}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {t('dashboard.continue.status', {
                                  category: t(card.categoryKey),
                                  percent: card.percent
                                })}
                              </Typography>
                            </Box>
                            <IconButton size="small">
                              <PlayCircle />
                            </IconButton>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={card.percent}
                            sx={{ mt: 1 }}
                            color={card.progressColor}
                          />
                        </Paper>
                      </Grid>
                    );
                  })}
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
                      {t('dashboard.badges.heading')}
                    </Typography>
                    <Button size="small" onClick={() => navigate('/profile/achievements')}>
                      {t('common.viewAll')}
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
                        {t('dashboard.badges.empty')}
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
                      {t('dashboard.ocean.title')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {oceanData.name}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          {t('dashboard.ocean.temperature')}
                        </Typography>
                        <Typography variant="h6">
                          {oceanData.data?.temperature?.toFixed(1) || '--'}°C
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="textSecondary">
                          {t('dashboard.ocean.waveHeight')}
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
                      {t('dashboard.ocean.viewStations')}
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
                    {t('dashboard.events.heading')}
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
                          primary={t(event.titleKey)}
                          secondary={event.date.toLocaleDateString()}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button fullWidth onClick={() => navigate('/challenges')}>
                    {t('dashboard.events.viewAll')}
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
                {t('dashboard.recommendations.heading')}
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map(rec => {
                  const Icon = rec.icon;
                  return (
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
                            <Icon />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {t(rec.titleKey)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {t(rec.descriptionKey)}
                            </Typography>
                            <Chip 
                              label={t(`dashboard.recommendations.types.${rec.type}`)} 
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
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
