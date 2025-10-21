import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import {
  School,
  People,
  Assignment,
  TrendingUp,
  Add,
  Visibility,
  Edit,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * TeacherDashboard Component
 * Main dashboard for teachers to manage classes and students
 */
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Mock data
    setStats({
      totalStudents: 156,
      activeClasses: 5,
      pendingAssignments: 12,
      averageProgress: 78
    });

    setRecentActivities([
      {
        id: 1,
        student: 'Sarah Johnson',
        activity: 'Completed Marine Life Quiz',
        score: 95,
        time: '2 hours ago',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 2,
        student: 'Michael Chen',
        activity: 'Submitted Coral Reef Project',
        score: 88,
        time: '4 hours ago',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 3,
        student: 'Emma Williams',
        activity: 'Completed Freshwater Module',
        score: 92,
        time: '1 day ago',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    ]);

    setUpcomingAssignments([
      {
        id: 1,
        title: 'Marine Biodiversity Report',
        class: 'Grade 10A',
        dueDate: '2024-03-20',
        submitted: 18,
        total: 25,
        status: 'active'
      },
      {
        id: 2,
        title: 'Ocean Conservation Quiz',
        class: 'Grade 11B',
        dueDate: '2024-03-22',
        submitted: 22,
        total: 30,
        status: 'active'
      },
      {
        id: 3,
        title: 'Freshwater Ecosystem Project',
        class: 'Grade 9C',
        dueDate: '2024-03-25',
        submitted: 5,
        total: 28,
        status: 'pending'
      }
    ]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Teacher Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your classes, students, and assignments
        </Typography>
      </Box>

      {/* Stats Overview */}
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
                      {stats.totalStudents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Students
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
                      {stats.activeClasses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Classes
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
                    <Assignment />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.pendingAssignments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pending Review
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
                    <TrendingUp />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight={700}>
                      {stats.averageProgress}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Progress
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Recent Activities
                </Typography>
                <Button size="small">View All</Button>
              </Box>

              {recentActivities.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Avatar src={activity.avatar} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.student}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {activity.activity}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={`${activity.score}%`}
                    color={activity.score >= 90 ? 'success' : activity.score >= 70 ? 'warning' : 'error'}
                    size="small"
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Assignments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>
                  Upcoming Assignments
                </Typography>
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  size="small"
                  onClick={() => navigate('/teacher/lessons')}
                >
                  New
                </Button>
              </Box>

              {upcomingAssignments.map((assignment) => (
                <Box
                  key={assignment.id}
                  sx={{
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>
                        {assignment.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {assignment.class} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={assignment.status}
                      size="small"
                      color={assignment.status === 'active' ? 'success' : 'warning'}
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Submissions
                      </Typography>
                      <Typography variant="caption" fontWeight={600}>
                        {assignment.submitted}/{assignment.total}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(assignment.submitted / assignment.total) * 100}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<Visibility />}>
                      View
                    </Button>
                    <Button size="small" startIcon={<Edit />}>
                      Edit
                    </Button>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<School />}
                    onClick={() => navigate('/teacher/class')}
                  >
                    Manage Classes
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Assignment />}
                    onClick={() => navigate('/teacher/lessons')}
                  >
                    Create Assignment
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<TrendingUp />}
                    onClick={() => navigate('/teacher/progress')}
                  >
                    View Progress
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<People />}
                  >
                    Student Reports
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherDashboard;
