import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Remove,
  Visibility,
  Download,
  FilterList
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * StudentProgress Component
 * Track and analyze student progress and performance
 */
const StudentProgress = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const students = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@school.com',
      class: 'Grade 10A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      overallProgress: 85,
      trend: 'up',
      completedLessons: 24,
      totalLessons: 30,
      quizAverage: 88,
      assignmentAverage: 82,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@school.com',
      class: 'Grade 11B',
      avatar: 'https://i.pravatar.cc/150?img=2',
      overallProgress: 92,
      trend: 'up',
      completedLessons: 28,
      totalLessons: 30,
      quizAverage: 95,
      assignmentAverage: 89,
      lastActive: '1 hour ago'
    },
    {
      id: 3,
      name: 'Emma Williams',
      email: 'emma.w@school.com',
      class: 'Grade 9C',
      avatar: 'https://i.pravatar.cc/150?img=3',
      overallProgress: 78,
      trend: 'down',
      completedLessons: 20,
      totalLessons: 28,
      quizAverage: 75,
      assignmentAverage: 81,
      lastActive: '3 days ago'
    },
    {
      id: 4,
      name: 'David Kumar',
      email: 'david.k@school.com',
      class: 'Grade 10A',
      avatar: 'https://i.pravatar.cc/150?img=4',
      overallProgress: 88,
      trend: 'up',
      completedLessons: 26,
      totalLessons: 30,
      quizAverage: 90,
      assignmentAverage: 86,
      lastActive: '5 hours ago'
    },
    {
      id: 5,
      name: 'Olivia Brown',
      email: 'olivia.b@school.com',
      class: 'Grade 11B',
      avatar: 'https://i.pravatar.cc/150?img=5',
      overallProgress: 95,
      trend: 'stable',
      completedLessons: 29,
      totalLessons: 30,
      quizAverage: 97,
      assignmentAverage: 93,
      lastActive: '30 minutes ago'
    }
  ];

  const classStats = {
    averageProgress: 87.6,
    topPerformer: 'Olivia Brown',
    needsAttention: 1,
    completionRate: 82
  };

  const progressChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Class Average',
        data: [65, 72, 78, 82, 85, 87.6],
        borderColor: 'rgb(0, 105, 148)',
        backgroundColor: 'rgba(0, 105, 148, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Class Progress Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (selectedClass !== 'all') {
      filtered = filtered.filter(s => s.class === selectedClass);
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp color="success" />;
      case 'down':
        return <TrendingDown color="error" />;
      default:
        return <Remove color="action" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'success';
    if (progress >= 70) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Student Progress
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze student performance and progress
        </Typography>
      </Box>

      {/* Class Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary" fontWeight={700}>
                {classStats.averageProgress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} noWrap>
                {classStats.topPerformer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Top Performer
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="warning.main" fontWeight={700}>
                {classStats.needsAttention}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Needs Attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main" fontWeight={700}>
                {classStats.completionRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Line data={progressChartData} options={chartOptions} />
        </CardContent>
      </Card>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              value={selectedClass}
              label="Class"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <MenuItem value="all">All Classes</MenuItem>
              <MenuItem value="Grade 10A">Grade 10A</MenuItem>
              <MenuItem value="Grade 11B">Grade 11B</MenuItem>
              <MenuItem value="Grade 9C">Grade 9C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Student Progress Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Student Performance
            </Typography>
            <IconButton>
              <Download />
            </IconButton>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Lessons</TableCell>
                  <TableCell>Quiz Avg</TableCell>
                  <TableCell>Assignment Avg</TableCell>
                  <TableCell>Trend</TableCell>
                  <TableCell>Last Active</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterStudents().map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={student.avatar} sx={{ width: 40, height: 40 }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {student.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {student.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={student.class} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 100 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption">{student.overallProgress}%</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={student.overallProgress}
                          color={getProgressColor(student.overallProgress)}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {student.completedLessons}/{student.totalLessons}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${student.quizAverage}%`}
                        size="small"
                        color={getProgressColor(student.quizAverage)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${student.assignmentAverage}%`}
                        size="small"
                        color={getProgressColor(student.assignmentAverage)}
                      />
                    </TableCell>
                    <TableCell>
                      {getTrendIcon(student.trend)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary">
                        {student.lastActive}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StudentProgress;
