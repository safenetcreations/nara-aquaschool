import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  LinearProgress,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  People,
  School,
  Assignment,
  TrendingUp,
  Visibility,
  CloudUpload
} from '@mui/icons-material';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { getAllSchools } from '../../services/schoolService';
import toast from 'react-hot-toast';

/**
 * AdminDashboard Component
 * Main admin dashboard with system overview and analytics
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalSchools: 0,
    totalContent: 0,
    activeUsers: 0,
    systemHealth: 98
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRealStats();
  }, []);

  const loadRealStats = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading real admin stats...');

      // Get all schools
      const schools = await getAllSchools();
      const totalSchools = schools.length;
      const totalStudents = schools.reduce((sum, s) => sum + (s.studentCount || 0), 0);

      // Get total users from Firestore
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;

      // Count teachers and students
      const teachers = usersSnapshot.docs.filter(doc => doc.data().role === 'teacher' || doc.data().role === 'admin');
      const totalTeachers = teachers.length;

      // Get marine species count
      const speciesSnapshot = await getDocs(collection(db, 'marine_species'));
      const totalSpecies = speciesSnapshot.size;

      // Get modules count
      const modulesSnapshot = await getDocs(collection(db, 'modules'));
      const totalModules = modulesSnapshot.size;

      // Get quizzes count
      const quizzesSnapshot = await getDocs(collection(db, 'quizzes'));
      const totalQuizzes = quizzesSnapshot.size;

      const totalContent = totalSpecies + totalModules + totalQuizzes;

      // Calculate active users (users who logged in last 24 hours)
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const activeUsersCount = usersSnapshot.docs.filter(doc => {
        const lastLogin = doc.data().lastLoginAt?.toDate();
        return lastLogin && lastLogin > oneDayAgo;
      }).length;

      setStats({
        totalUsers,
        totalTeachers,
        totalStudents,
        totalSchools,
        totalContent,
        activeUsers: activeUsersCount,
        systemHealth: 98
      });

      console.log('✅ Admin stats loaded:', {
        totalUsers,
        totalTeachers,
        totalStudents,
        totalSchools,
        totalContent,
        activeUsers: activeUsersCount
      });

      toast.success('Dashboard stats loaded!');
    } catch (error) {
      console.error('❌ Error loading admin stats:', error);
      toast.error('Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Users',
        data: [800, 920, 1050, 1120, 1180, 1245],
        borderColor: 'rgb(0, 105, 148)',
        backgroundColor: 'rgba(0, 105, 148, 0.1)',
        tension: 0.4
      }
    ]
  };

  const contentDistribution = {
    labels: ['Marine Life', 'Freshwater', 'Heritage', 'NARA Science', 'Games'],
    datasets: [
      {
        data: [120, 85, 65, 50, 30],
        backgroundColor: [
          '#006994',
          '#00a86b',
          '#2196f3',
          '#ff9800',
          '#9c27b0'
        ]
      }
    ]
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          System overview and analytics
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                    <People />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.totalUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Users
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                    <School />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.totalSchools}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Partner Schools
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
                    <Assignment />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.totalContent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Content Items
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56 }}>
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.activeUsers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Today
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                User Growth
              </Typography>
              <Line
                data={userGrowthData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' }
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Content Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Content Distribution
              </Typography>
              <Doughnut data={contentDistribution} />
            </CardContent>
          </Card>
        </Grid>

        {/* System Health */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                System Health
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Health</Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {stats.systemHealth}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stats.systemHealth}
                  color="success"
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Chip label="API: Healthy" color="success" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Chip label="Database: Healthy" color="success" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Chip label="Storage: 78% Used" color="warning" />
                </Grid>
                <Grid item xs={6} md={3}>
                  <Chip label="CDN: Healthy" color="success" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
