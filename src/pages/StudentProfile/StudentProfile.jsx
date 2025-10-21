import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import {
  Edit,
  EmojiEvents,
  TrendingUp,
  School,
  Star,
  LocalFireDepartment,
  Science,
  MenuBook,
  Quiz,
  Waves,
  CameraAlt
} from '@mui/icons-material';
import { auth } from '../../config/firebase';
import { getUserProfile, updateUserProfile } from '../../services/authService';
import LoadingScreen from '../../components/Common/LoadingScreen';
import EmailVerificationBanner from '../../components/Auth/EmailVerificationBanner';

/**
 * StudentProfile Component
 * Displays and allows editing of student profile information
 * Shows gamification stats, badges, achievements, and progress
 */
const StudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
        setEditedProfile(profile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = () => {
    setEditedProfile(userProfile);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setMessage('');
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage('');

    try {
      await updateUserProfile(user.uid, {
        firstName: editedProfile.firstName,
        lastName: editedProfile.lastName,
        displayName: `${editedProfile.firstName} ${editedProfile.lastName}`,
        bio: editedProfile.bio,
        grade: editedProfile.grade,
        language: editedProfile.language
      });

      setUserProfile(editedProfile);
      setMessage('Profile updated successfully!');

      setTimeout(() => {
        setEditModalOpen(false);
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const calculateLevelProgress = () => {
    if (!userProfile) return 0;
    const currentLevel = userProfile.level || 1;
    const pointsForNextLevel = currentLevel * 1000; // 1000 points per level
    const pointsInCurrentLevel = userProfile.points % 1000;
    return (pointsInCurrentLevel / 1000) * 100;
  };

  if (loading) {
    return <LoadingScreen message="Loading your profile..." />;
  }

  if (!userProfile) {
    return (
      <Container>
        <Alert severity="error">Failed to load profile. Please try again.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Email Verification Banner */}
        {user && !user.emailVerified && (
          <EmailVerificationBanner user={user} />
        )}

        {/* Profile Header */}
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginBottom: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3
          }}
        >
          <Grid container spacing={3} alignItems="center">
            {/* Avatar and Basic Info */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={userProfile.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid white',
                      fontSize: '3rem'
                    }}
                  >
                    {userProfile.firstName?.charAt(0) || 'S'}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }}
                    size="small"
                  >
                    <CameraAlt color="primary" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {userProfile.displayName}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Grade {userProfile.grade || 'Not set'}
                  </Typography>
                  <Chip
                    label={userProfile.role || 'Student'}
                    size="small"
                    sx={{
                      marginTop: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white'
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* Level and Points */}
            <Grid item xs={12} md={5}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                  <Star sx={{ fontSize: 28 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Level {userProfile.level || 1}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, marginLeft: 'auto' }}>
                    {userProfile.points || 0} points
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={calculateLevelProgress()}
                  sx={{
                    height: 12,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ opacity: 0.8, marginTop: 0.5 }}>
                  {1000 - (userProfile.points % 1000)} points to next level
                </Typography>

                {/* Streak */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                  <LocalFireDepartment sx={{ fontSize: 24, color: '#ff9800' }} />
                  <Typography variant="body1">
                    {userProfile.streak || 0} day streak
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Edit Button */}
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Edit />}
                onClick={handleEditOpen}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#f5f5f5'
                  }
                }}
              >
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Bio */}
        {userProfile.bio && (
          <Paper elevation={3} sx={{ padding: 3, marginBottom: 3, borderRadius: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {userProfile.bio}
            </Typography>
          </Paper>
        )}

        {/* Stats Grid */}
        <Grid container spacing={3}>
          {/* Badges */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <EmojiEvents color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Badges ({userProfile.badges?.length || 0})
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: 2 }} />

              {userProfile.badges && userProfile.badges.length > 0 ? (
                <Grid container spacing={2}>
                  {userProfile.badges.map((badge, index) => (
                    <Grid item xs={4} key={index}>
                      <Card
                        elevation={2}
                        sx={{
                          textAlign: 'center',
                          padding: 2,
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 6 }
                        }}
                      >
                        <EmojiEvents sx={{ fontSize: 40, color: '#ffd700' }} />
                        <Typography variant="caption" display="block" marginTop={1}>
                          {badge.name}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No badges earned yet. Complete lessons and quizzes to earn badges!
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Stats */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <TrendingUp color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Statistics
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: 2 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <StatItem
                  icon={<MenuBook color="primary" />}
                  label="Lessons Completed"
                  value={userProfile.stats?.lessonsCompleted || 0}
                />
                <StatItem
                  icon={<Quiz color="secondary" />}
                  label="Quizzes Taken"
                  value={userProfile.stats?.quizzesTaken || 0}
                />
                <StatItem
                  icon={<Science color="success" />}
                  label="Citizen Science Contributions"
                  value={userProfile.stats?.citizenScienceContributions || 0}
                />
                <StatItem
                  icon={<Waves color="info" />}
                  label="Species Identified"
                  value={userProfile.stats?.speciesIdentified || 0}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Learning Progress */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                <School color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Learning Progress
                </Typography>
              </Box>
              <Divider sx={{ marginBottom: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ProgressBar label="Marine Life" value={userProfile.stats?.marineLife || 0} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ProgressBar label="Freshwater" value={userProfile.stats?.freshwater || 0} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ProgressBar label="Water Heritage" value={userProfile.stats?.heritage || 0} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ProgressBar label="NARA Science" value={userProfile.stats?.naraScience || 0} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Edit Profile Modal */}
        <Dialog
          open={editModalOpen}
          onClose={handleEditClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
              Edit Profile
            </Typography>
          </DialogTitle>
          <DialogContent>
            {message && (
              <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ marginBottom: 2 }}>
                {message}
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
              <TextField
                label="First Name"
                value={editedProfile.firstName || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={editedProfile.lastName || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                fullWidth
              />
              <TextField
                label="Bio"
                value={editedProfile.bio || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                fullWidth
                multiline
                rows={3}
                placeholder="Tell us about yourself..."
              />
              <TextField
                label="Grade"
                select
                value={editedProfile.grade || ''}
                onChange={(e) => setEditedProfile({ ...editedProfile, grade: e.target.value })}
                fullWidth
              >
                {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    Grade {grade}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Preferred Language"
                select
                value={editedProfile.language || 'en'}
                onChange={(e) => setEditedProfile({ ...editedProfile, language: e.target.value })}
                fullWidth
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="si">Sinhala</MenuItem>
                <MenuItem value="ta">Tamil</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} variant="contained" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

// Helper Components
const StatItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    {icon}
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
    <Typography variant="h6" fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

const ProgressBar = ({ label, value }) => (
  <Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 0.5 }}>
      <Typography variant="body2" fontWeight="medium">
        {label}
      </Typography>
      <Typography variant="body2" color="primary">
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 8,
        borderRadius: 1,
        backgroundColor: '#e0e0e0'
      }}
    />
  </Box>
);

export default StudentProfile;
