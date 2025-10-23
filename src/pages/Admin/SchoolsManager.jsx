// Admin Schools Manager - Initialize and manage schools database
import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle,
  Error,
  School,
  Public,
  LocationCity,
  TrendingUp
} from '@mui/icons-material';
import { syncSchoolsToFirebase, getProvinceStatistics, getAllSchools } from '../../services/schoolService';
import toast from 'react-hot-toast';

const SchoolsManager = () => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [schools, setSchools] = useState([]);

  const handleSyncSchools = async () => {
    try {
      setLoading(true);
      setSyncStatus({ type: 'info', message: 'Syncing schools to Firebase...' });

      const result = await syncSchoolsToFirebase();

      if (result.success) {
        setSyncStatus({
          type: 'success',
          message: `✅ Successfully synced ${result.count} schools to Firebase!`
        });
        toast.success('Schools database initialized!');

        // Load statistics
        await loadStatistics();
      }
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus({
        type: 'error',
        message: `❌ Error syncing schools: ${error.message}`
      });
      toast.error('Failed to sync schools');
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const stats = await getProvinceStatistics();
      const allSchools = await getAllSchools();

      setStatistics(stats);
      setSchools(allSchools);
    } catch (error) {
      console.error('Error loading statistics:', error);
    }
  };

  const getTotalStats = () => {
    if (!statistics) return { schools: 0, students: 0, teachers: 0, bookings: 0 };

    return Object.values(statistics).reduce(
      (acc, stat) => ({
        schools: acc.schools + stat.schoolCount,
        students: acc.students + stat.studentCount,
        teachers: acc.teachers + stat.teacherCount,
        bookings: acc.bookings + stat.fieldVisitBookings
      }),
      { schools: 0, students: 0, teachers: 0, bookings: 0 }
    );
  };

  const totalStats = getTotalStats();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🏫 Schools Database Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Initialize and manage the Sri Lankan schools database
        </Typography>
      </Paper>

      {/* Sync Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          📤 Initialize Schools Database
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This will sync all 120+ Sri Lankan schools to Firebase. Run this once to populate the database.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUpload />}
            onClick={handleSyncSchools}
            disabled={loading}
          >
            Sync Schools to Firebase
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<TrendingUp />}
            onClick={loadStatistics}
            disabled={loading}
          >
            Load Statistics
          </Button>
        </Box>

        {loading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Syncing schools to Firebase...
            </Typography>
          </Box>
        )}

        {syncStatus && (
          <Alert
            severity={syncStatus.type}
            icon={syncStatus.type === 'success' ? <CheckCircle /> : <Error />}
            sx={{ mt: 2 }}
          >
            {syncStatus.message}
          </Alert>
        )}
      </Paper>

      {/* Statistics Overview */}
      {statistics && (
        <>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              📊 Overview Statistics
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <School sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {totalStats.schools}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Schools
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <TrendingUp sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {totalStats.students}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Registered Students
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <School sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {totalStats.teachers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Registered Teachers
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <LocationCity sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                    <Typography variant="h4" fontWeight={700}>
                      {totalStats.bookings}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Field Visit Bookings
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          {/* Province Breakdown */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              🗺️ Province Breakdown
            </Typography>
            <List>
              {Object.entries(statistics).map(([code, stat], index) => (
                <React.Fragment key={code}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Public color="primary" />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {stat.provinceName.en}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
                          <Chip
                            size="small"
                            label={`${stat.schoolCount} Schools`}
                            color="primary"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`${stat.studentCount} Students`}
                            color="success"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`${stat.teacherCount} Teachers`}
                            color="warning"
                            variant="outlined"
                          />
                          <Chip
                            size="small"
                            label={`${stat.fieldVisitBookings} Bookings`}
                            color="info"
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < Object.keys(statistics).length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </>
      )}

      {/* Instructions */}
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.light' }}>
        <Typography variant="h6" gutterBottom>
          ℹ️ How to Use
        </Typography>
        <Typography variant="body2" component="div">
          <ol>
            <li><strong>Click "Sync Schools to Firebase"</strong> - This uploads all 120+ schools to your Firebase database</li>
            <li><strong>Wait for completion</strong> - The process takes about 10-30 seconds</li>
            <li><strong>Verify</strong> - Click "Load Statistics" to see the schools in your database</li>
            <li><strong>Done!</strong> - Schools are now available for:
              <ul>
                <li>Student Registration</li>
                <li>Teacher Registration</li>
                <li>Field Visit Bookings</li>
                <li>Leaderboards & Analytics</li>
              </ul>
            </li>
          </ol>
        </Typography>
      </Paper>

      {/* Database Structure Info */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          🗂️ Database Structure
        </Typography>
        <Typography variant="body2" component="div">
          <strong>Collection:</strong> <code>schools</code>
          <br /><br />
          <strong>Fields per school:</strong>
          <ul>
            <li>id, name, type, grades, medium</li>
            <li>province, provinceName (en/si/ta)</li>
            <li>district, districtName (en/si/ta)</li>
            <li>studentCount, teacherCount, fieldVisitBookings</li>
            <li>status, createdAt, updatedAt</li>
          </ul>
        </Typography>
      </Paper>
    </Container>
  );
};

export default SchoolsManager;
