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
  Chip
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

/**
 * AdminDashboard Component
 * Main admin dashboard with system overview and analytics
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1245,
    totalTeachers: 45,
    totalStudents: 1200,
    totalContent: 350,
    activeUsers: 856,
    systemHealth: 98
  });

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
                      {stats.totalTeachers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Teachers
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
