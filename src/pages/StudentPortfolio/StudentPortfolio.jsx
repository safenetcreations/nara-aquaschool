// Student Portfolio Page - Comprehensive showcase of achievements and progress
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Skeleton
} from '@mui/material';
import {
  Edit,
  Share,
  Download,
  Print,
  EmojiEvents,
  Star,
  LocalFireDepartment,
  TrendingUp,
  School,
  Science,
  Quiz,
  Waves,
  MenuBook,
  CameraAlt,
  WorkspacePremium,
  Timeline,
  Code,
  CheckCircle,
  Lock,
  Public,
  LinkedIn,
  Twitter,
  Facebook,
  Link as LinkIcon,
  CalendarToday,
  LocationOn
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Radar } from 'react-chartjs-2';
import { auth } from '../../config/firebase';
import { getUserProfile } from '../../services/authService';
import { getUserBadges } from '../../services/gamificationService';
import toast from 'react-hot-toast';

const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

const StudentPortfolio = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [userProfile, setUserProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Sample data - Replace with real Firebase data
  const sampleProjects = [
    {
      id: 1,
      title: 'Blue Whale Research Project',
      description: 'Comprehensive study on blue whale migration patterns in Sri Lankan waters',
      image: '/images/projects/blue-whale.jpg',
      category: 'Marine Biology',
      date: '2024-09-15',
      grade: 'A+',
      views: 234,
      likes: 45
    },
    {
      id: 2,
      title: 'Ancient Tank System Documentation',
      description: 'Historical analysis of Parakrama Samudra irrigation system',
      image: '/images/projects/tank.jpg',
      category: 'Water Heritage',
      date: '2024-10-01',
      grade: 'A',
      views: 189,
      likes: 38
    },
    {
      id: 3,
      title: 'Coral Reef Health Assessment',
      description: 'Citizen science project documenting coral health at Hikkaduwa',
      image: '/images/projects/coral.jpg',
      category: 'Conservation',
      date: '2024-10-10',
      grade: 'A+',
      views: 312,
      likes: 67
    }
  ];

  const skills = [
    { name: 'Marine Biology', level: 85, category: 'Science' },
    { name: 'Water Conservation', level: 75, category: 'Environment' },
    { name: 'Research Skills', level: 70, category: 'Academic' },
    { name: 'Data Analysis', level: 65, category: 'Technical' },
    { name: 'Presentation', level: 80, category: 'Communication' },
    { name: 'Team Collaboration', level: 90, category: 'Soft Skills' }
  ];

  const achievements = [
    { icon: EmojiEvents, title: 'Marine Explorer', description: 'Discovered 25+ species', color: '#FFD700', date: '2024-09-20' },
    { icon: LocalFireDepartment, title: '30 Day Streak', description: 'Learned consecutively for 30 days', color: '#FF6B6B', date: '2024-10-15' },
    { icon: WorkspacePremium, title: 'Quiz Master', description: 'Scored 100% on 5 quizzes', color: '#4ECDC4', date: '2024-10-05' },
    { icon: Star, title: 'Top Contributor', description: 'Top 10 in citizen science', color: '#95E1D3', date: '2024-10-12' },
    { icon: Science, title: 'Research Scholar', description: 'Completed 3 research projects', color: '#A8E6CF', date: '2024-10-18' },
    { icon: School, title: 'Honor Roll', description: 'Maintained A+ average', color: '#FFE66D', date: '2024-10-20' }
  ];

  const timeline = [
    { date: '2024-10-20', event: 'Completed Coral Reef Assessment', type: 'project' },
    { date: '2024-10-18', event: 'Earned Research Scholar Badge', type: 'achievement' },
    { date: '2024-10-15', event: 'Reached 30-day learning streak', type: 'milestone' },
    { date: '2024-10-12', event: 'Submitted Citizen Science Report', type: 'submission' },
    { date: '2024-10-10', event: 'Started Coral Health Project', type: 'project' },
    { date: '2024-10-05', event: 'Scored 100% on Marine Quiz', type: 'quiz' }
  ];

  useEffect(() => {
    loadPortfolioData();
  }, [userId]);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      const targetUserId = userId || currentUser?.uid;

      if (targetUserId) {
        const profile = await getUserProfile(targetUserId);
        setUserProfile(profile);
        setIsOwnProfile(currentUser?.uid === targetUserId);

        const userBadges = await getUserBadges(targetUserId);
        setBadges(userBadges);

        setProjects(sampleProjects);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/portfolio/${userProfile?.uid}`;
    navigator.clipboard.writeText(url);
    toast.success('Portfolio link copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    toast.info('PDF download feature coming soon!');
  };

  const skillsRadarData = {
    labels: skills.map(s => s.name),
    datasets: [{
      label: 'Skill Level',
      data: skills.map(s => s.level),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };

  const progressLineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [{
      label: 'Learning Points',
      data: [120, 250, 180, 320, 450, 520],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4
    }]
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map(i => (
            <Grid item xs={12} md={6} key={i}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', pb: 6 }}>
      <Container maxWidth="lg">
        {/* Header Banner */}
        <MotionPaper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            p: 4,
            mt: 3,
            mb: 3,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  isOwnProfile && (
                    <IconButton size="small" sx={{ bgcolor: 'white', '&:hover': { bgcolor: '#f5f5f5' } }}>
                      <CameraAlt fontSize="small" color="primary" />
                    </IconButton>
                  )
                }
              >
                <Avatar
                  src={userProfile?.photoURL}
                  alt={userProfile?.firstName}
                  sx={{
                    width: 150,
                    height: 150,
                    border: '4px solid white',
                    boxShadow: 3
                  }}
                >
                  {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                </Avatar>
              </Badge>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {userProfile?.firstName} {userProfile?.lastName}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                Marine Science Enthusiast • Grade {userProfile?.grade || '10'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip icon={<Star />} label={`Level ${userProfile?.level || 1}`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<EmojiEvents />} label={`${userProfile?.points || 0} Points`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<LocalFireDepartment />} label={`${userProfile?.streak || 0} Day Streak`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<WorkspacePremium />} label={`${badges.length} Badges`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip icon={<LocationOn />} label={userProfile?.school?.district || 'Colombo'} size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} />
                <Chip icon={<School />} label={userProfile?.school?.name || 'Royal College'} size="small" variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }} />
              </Box>
            </Grid>

            <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {isOwnProfile && (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => navigate('/profile')}
                    sx={{ bgcolor: 'white', color: '#667eea', '&:hover': { bgcolor: '#f5f5f5' } }}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' } }}
                >
                  Share Portfolio
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  onClick={handleDownloadPDF}
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' } }}
                >
                  Download PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
        </MotionPaper>

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': { fontWeight: 600 }
            }}
          >
            <Tab icon={<TrendingUp />} label="Overview" iconPosition="start" />
            <Tab icon={<EmojiEvents />} label="Achievements" iconPosition="start" />
            <Tab icon={<MenuBook />} label="Projects" iconPosition="start" />
            <Tab icon={<Timeline />} label="Activity" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Learning Progress */}
            <Grid item xs={12} md={8}>
              <MotionCard
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    📈 Learning Progress
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <Line data={progressLineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Stats Summary */}
            <Grid item xs={12} md={4}>
              <MotionCard
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    📊 Stats Summary
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'between' }}>
                        <Typography variant="body2">Lessons Completed</Typography>
                        <Typography variant="body2" fontWeight={700}>{userProfile?.stats?.lessonsCompleted || 0}/50</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={((userProfile?.stats?.lessonsCompleted || 0) / 50) * 100} sx={{ mt: 1 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Quizzes Passed</Typography>
                        <Typography variant="body2" fontWeight={700}>{userProfile?.stats?.quizzesTaken || 0}/30</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={((userProfile?.stats?.quizzesTaken || 0) / 30) * 100} color="secondary" sx={{ mt: 1 }} />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Species Identified</Typography>
                        <Typography variant="body2" fontWeight={700}>{userProfile?.stats?.speciesIdentified || 0}/100</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={((userProfile?.stats?.speciesIdentified || 0) / 100) * 100} color="warning" sx={{ mt: 1 }} />
                    </Box>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Skills Radar Chart */}
            <Grid item xs={12} md={6}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    🎯 Skills & Competencies
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Radar data={skillsRadarData} options={{ maintainAspectRatio: false }} />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Top Achievements */}
            <Grid item xs={12} md={6}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    🏆 Top Achievements
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {achievements.slice(0, 6).map((achievement, index) => (
                      <Grid item xs={6} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: achievement.color + '20',
                            borderRadius: 2,
                            textAlign: 'center',
                            border: `2px solid ${achievement.color}40`,
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)' }
                          }}
                        >
                          <achievement.icon sx={{ fontSize: 40, color: achievement.color, mb: 1 }} />
                          <Typography variant="body2" fontWeight={600}>
                            {achievement.title}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        )}

        {/* Achievements Tab */}
        {activeTab === 1 && (
          <Grid container spacing={2}>
            {achievements.map((achievement, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionCard
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: achievement.color, width: 56, height: 56, mr: 2 }}>
                        <achievement.icon sx={{ fontSize: 32 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {achievement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          <CalendarToday sx={{ fontSize: 12, mr: 0.5 }} />
                          {achievement.date}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Projects Tab */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  sx={{ height: '100%' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      bgcolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h4" color="white">
                      {project.category}
                    </Typography>
                  </CardMedia>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                      <Typography variant="h6" fontWeight={700}>
                        {project.title}
                      </Typography>
                      <Chip label={project.grade} color="success" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {project.date}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Typography variant="caption">👁️ {project.views}</Typography>
                        <Typography variant="caption">❤️ {project.likes}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Activity Timeline Tab */}
        {activeTab === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                📅 Activity Timeline
              </Typography>
              <List>
                {timeline.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemIcon>
                        {item.type === 'project' && <MenuBook color="primary" />}
                        {item.type === 'achievement' && <EmojiEvents color="warning" />}
                        {item.type === 'milestone' && <LocalFireDepartment color="error" />}
                        {item.type === 'submission' && <CheckCircle color="success" />}
                        {item.type === 'quiz' && <Quiz color="secondary" />}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.event}
                        secondary={item.date}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                    {index < timeline.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default StudentPortfolio;
