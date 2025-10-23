// Teacher Portfolio Page - Professional showcase for educators
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton
} from '@mui/material';
import {
  Edit,
  Share,
  Download,
  EmojiEvents,
  School,
  Groups,
  MenuBook,
  Assessment,
  TrendingUp,
  Star,
  WorkspacePremium,
  CameraAlt,
  LinkedIn,
  Twitter,
  Email,
  Language,
  LocationOn,
  CalendarToday,
  CheckCircle,
  AutoStories,
  Psychology,
  Science,
  PublishedWithChanges
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Bar, Doughnut } from 'react-chartjs-2';
import { auth } from '../../config/firebase';
import { getUserProfile } from '../../services/authService';
import toast from 'react-hot-toast';

const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

const TeacherPortfolio = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  // Sample teacher data
  const teacherData = {
    classes: [
      { grade: '10', subject: 'Marine Biology', students: 35, avgScore: 85, completion: 75 },
      { grade: '9', subject: 'Environmental Science', students: 40, avgScore: 82, completion: 80 },
      { grade: '8', subject: 'Water Conservation', students: 38, avgScore: 88, completion: 85 }
    ],
    materials: [
      { title: 'Blue Whale Migration Study Guide', type: 'Study Guide', downloads: 234, rating: 4.8, date: '2024-10-01' },
      { title: 'Ancient Irrigation Systems PPT', type: 'Presentation', downloads: 189, rating: 4.9, date: '2024-09-25' },
      { title: 'Coral Reef Ecosystem Quiz', type: 'Assessment', downloads: 312, rating: 4.7, date: '2024-10-10' },
      { title: 'Marine Species Identification Worksheet', type: 'Worksheet', downloads: 276, rating: 4.6, date: '2024-09-15' }
    ],
    achievements: [
      { icon: EmojiEvents, title: 'Top Educator 2024', description: 'Highest student engagement', color: '#FFD700', date: '2024-10-01' },
      { icon: Star, title: 'Innovation Award', description: 'Creative teaching methods', color: '#4ECDC4', date: '2024-09-15' },
      { icon: Groups, title: 'Mentor Excellence', description: 'Outstanding student mentorship', color: '#95E1D3', date: '2024-08-20' },
      { icon: MenuBook, title: 'Content Creator', description: 'Created 50+ learning resources', color: '#FFE66D', date: '2024-10-12' }
    ],
    professionalDev: [
      { title: 'Advanced Marine Biology Certification', institution: 'NARA', date: '2024-09-01', status: 'completed' },
      { title: 'Digital Teaching Methods', institution: 'EdTech Sri Lanka', date: '2024-08-15', status: 'completed' },
      { title: 'Environmental Education Workshop', institution: 'UNESCO', date: '2024-07-20', status: 'completed' }
    ],
    studentStats: {
      totalStudents: 113,
      activeStudents: 98,
      avgCompletion: 80,
      avgScore: 85,
      passRate: 92
    }
  };

  const expertise = [
    { area: 'Marine Biology', level: 95 },
    { area: 'Environmental Science', level: 90 },
    { area: 'Water Conservation', level: 88 },
    { area: 'Curriculum Development', level: 85 },
    { area: 'Digital Teaching', level: 80 }
  ];

  useEffect(() => {
    loadTeacherPortfolio();
  }, [teacherId]);

  const loadTeacherPortfolio = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      const targetTeacherId = teacherId || currentUser?.uid;

      if (targetTeacherId) {
        const profile = await getUserProfile(targetTeacherId);
        setTeacherProfile(profile);
        setIsOwnProfile(currentUser?.uid === targetTeacherId);
      }
    } catch (error) {
      console.error('Error loading teacher portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/teacher/portfolio/${teacherProfile?.uid}`;
    navigator.clipboard.writeText(url);
    toast.success('Portfolio link copied to clipboard!');
  };

  const classPerformanceData = {
    labels: teacherData.classes.map(c => `Grade ${c.grade}`),
    datasets: [{
      label: 'Average Score',
      data: teacherData.classes.map(c => c.avgScore),
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    }]
  };

  const studentEngagementData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      data: [teacherData.studentStats.activeStudents, teacherData.studentStats.totalStudents - teacherData.studentStats.activeStudents],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)']
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
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            p: 4,
            mt: 3,
            mb: 3,
            borderRadius: 3
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
                  src={teacherProfile?.photoURL}
                  alt={teacherProfile?.firstName}
                  sx={{
                    width: 150,
                    height: 150,
                    border: '4px solid white',
                    boxShadow: 3
                  }}
                >
                  {teacherProfile?.firstName?.[0]}{teacherProfile?.lastName?.[0]}
                </Avatar>
              </Badge>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                {teacherProfile?.firstName || 'Ms. Sarah'} {teacherProfile?.lastName || 'Fernando'}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                🧬 Marine Biology & Environmental Science Educator
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Chip icon={<School />} label={`${teacherData.classes.length} Classes`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<Groups />} label={`${teacherData.studentStats.totalStudents} Students`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<MenuBook />} label={`${teacherData.materials.length} Resources`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip icon={<Star />} label="4.8★ Rating" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 18 }} />
                <Typography variant="body2">{teacherProfile?.school?.name || 'Royal College, Colombo'}</Typography>
                <Typography variant="body2" sx={{ mx: 1 }}>•</Typography>
                <CalendarToday sx={{ fontSize: 18 }} />
                <Typography variant="body2">Teaching since 2018</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {isOwnProfile && (
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => navigate('/teacher/profile')}
                    sx={{ bgcolor: 'white', color: '#11998e', '&:hover': { bgcolor: '#f5f5f5' } }}
                  >
                    Edit Profile
                  </Button>
                )}
                <Button
                  variant="outlined"
                  startIcon={<Share />}
                  onClick={handleShare}
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Share Portfolio
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Download CV
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
          >
            <Tab icon={<Assessment />} label="Overview" iconPosition="start" />
            <Tab icon={<School />} label="Classes" iconPosition="start" />
            <Tab icon={<MenuBook />} label="Resources" iconPosition="start" />
            <Tab icon={<EmojiEvents />} label="Achievements" iconPosition="start" />
          </Tabs>
        </Paper>

        {/* Overview Tab */}
        {activeTab === 0 && (
          <Grid container spacing={3}>
            {/* Impact Stats */}
            <Grid item xs={12} md={3}>
              <MotionCard initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Groups sx={{ fontSize: 48, color: '#11998e', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>{teacherData.studentStats.totalStudents}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Students</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionCard initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <TrendingUp sx={{ fontSize: 48, color: '#4ECDC4', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>{teacherData.studentStats.avgScore}%</Typography>
                  <Typography variant="body2" color="text.secondary">Avg. Student Score</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionCard initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <CheckCircle sx={{ fontSize: 48, color: '#95E1D3', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>{teacherData.studentStats.passRate}%</Typography>
                  <Typography variant="body2" color="text.secondary">Pass Rate</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <MotionCard initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AutoStories sx={{ fontSize: 48, color: '#FFE66D', mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>{teacherData.studentStats.avgCompletion}%</Typography>
                  <Typography variant="body2" color="text.secondary">Completion Rate</Typography>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Class Performance */}
            <Grid item xs={12} md={8}>
              <MotionCard initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    📊 Class Performance
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <Bar data={classPerformanceData} options={{ maintainAspectRatio: false }} />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Student Engagement */}
            <Grid item xs={12} md={4}>
              <MotionCard initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    👥 Student Engagement
                  </Typography>
                  <Box sx={{ height: 250, display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Doughnut data={studentEngagementData} />
                  </Box>
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {teacherData.studentStats.activeStudents} active out of {teacherData.studentStats.totalStudents} students
                    </Typography>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>

            {/* Expertise Areas */}
            <Grid item xs={12}>
              <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    🎯 Areas of Expertise
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expertise.map((area, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>{area.area}</Typography>
                            <Typography variant="body2" color="text.secondary">{area.level}%</Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={area.level} sx={{ height: 8, borderRadius: 4 }} />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>
        )}

        {/* Classes Tab */}
        {activeTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell><strong>Grade</strong></TableCell>
                  <TableCell><strong>Subject</strong></TableCell>
                  <TableCell align="center"><strong>Students</strong></TableCell>
                  <TableCell align="center"><strong>Avg. Score</strong></TableCell>
                  <TableCell align="center"><strong>Completion</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teacherData.classes.map((classItem, index) => (
                  <TableRow key={index} hover>
                    <TableCell>Grade {classItem.grade}</TableCell>
                    <TableCell>{classItem.subject}</TableCell>
                    <TableCell align="center">{classItem.students}</TableCell>
                    <TableCell align="center">
                      <Chip label={`${classItem.avgScore}%`} color="primary" size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <LinearProgress variant="determinate" value={classItem.completion} sx={{ width: 100 }} />
                        <Typography variant="body2">{classItem.completion}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" variant="outlined">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Resources Tab */}
        {activeTab === 2 && (
          <Grid container spacing={3}>
            {teacherData.materials.map((material, index) => (
              <Grid item xs={12} md={6} key={index}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                        <MenuBook sx={{ fontSize: 40, color: '#11998e' }} />
                        <Box>
                          <Typography variant="h6" fontWeight={700}>
                            {material.title}
                          </Typography>
                          <Chip label={material.type} size="small" sx={{ mt: 0.5 }} />
                        </Box>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          📥 {material.downloads} downloads
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                          ⭐ {material.rating}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {material.date}
                      </Typography>
                    </Box>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Achievements Tab */}
        {activeTab === 3 && (
          <Grid container spacing={3}>
            {/* Awards & Recognition */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    🏆 Awards & Recognition
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {teacherData.achievements.map((achievement, index) => (
                      <Grid item xs={12} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: achievement.color + '20', borderRadius: 2, border: `2px solid ${achievement.color}40` }}>
                          <Avatar sx={{ bgcolor: achievement.color, mr: 2, width: 56, height: 56 }}>
                            <achievement.icon sx={{ fontSize: 32 }} />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight={700}>
                              {achievement.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {achievement.date}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Professional Development */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    📚 Professional Development
                  </Typography>
                  <List>
                    {teacherData.professionalDev.map((course, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <WorkspacePremium color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary={course.title}
                            secondary={`${course.institution} • ${course.date}`}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                          <Chip label="Completed" color="success" size="small" />
                        </ListItem>
                        {index < teacherData.professionalDev.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TeacherPortfolio;
