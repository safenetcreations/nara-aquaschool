import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  TrendingUp,
  People,
  Visibility,
  Timer
} from '@mui/icons-material';
import { Line, Bar } from 'react-chartjs-2';

/**
 * Analytics Component
 * System analytics and reporting
 */
const Analytics = () => {
  const stats = {
    totalViews: 45678,
    avgSessionTime: '12m 34s',
    activeUsers: 856,
    engagementRate: 78
  };

  const pageViewsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Views',
        data: [1200, 1900, 1500, 2100, 1800, 900, 700],
        borderColor: 'rgb(0, 105, 148)',
        backgroundColor: 'rgba(0, 105, 148, 0.1)',
        tension: 0.4
      }
    ]
  };

  const contentEngagementData = {
    labels: ['Marine Life', 'Freshwater', 'Heritage', 'NARA', 'Games'],
    datasets: [
      {
        label: 'Engagement',
        data: [85, 72, 68, 55, 90],
        backgroundColor: 'rgba(0, 105, 148, 0.6)'
      }
    ]
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          System analytics and performance metrics
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Visibility color="primary" />
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.totalViews.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Views
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
                <Timer color="success" />
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.avgSessionTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Session
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
                <People color="info" />
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.activeUsers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Users
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
                <TrendingUp color="warning" />
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {stats.engagementRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Engagement
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Page Views (Last 7 Days)
              </Typography>
              <Line data={pageViewsData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Content Engagement
              </Typography>
              <Bar data={contentEngagementData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
