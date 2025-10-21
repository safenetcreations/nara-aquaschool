import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  School,
  LocalFireDepartment,
  Star
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

/**
 * Leaderboard Component
 * Displays rankings for students based on points, achievements, and progress
 */
const Leaderboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const globalLeaders = [
    { rank: 1, name: 'Saman Perera', school: 'Colombo International School', points: 5240, level: 18, avatar: null },
    { rank: 2, name: 'Nisha Fernando', school: 'Royal College', points: 4890, level: 17, avatar: null },
    { rank: 3, name: 'Kamal Silva', school: 'Ananda College', points: 4650, level: 16, avatar: null },
    { rank: 4, name: 'Amaya Jayawardena', school: 'Visakha Vidyalaya', points: 4320, level: 15, avatar: null },
    { rank: 5, name: 'Dinesh Wickramasinghe', school: 'Nalanda College', points: 4180, level: 15, avatar: null },
    { rank: 6, name: 'Thilini Rathnayake', school: 'Ladies College', points: 3950, level: 14, avatar: null },
    { rank: 7, name: 'Chamath De Silva', school: 'St. Thomas College', points: 3820, level: 14, avatar: null },
    { rank: 8, name: 'Hasini Wijesinghe', school: 'Methodist College', points: 3690, level: 13, avatar: null },
    { rank: 9, name: 'Lahiru Bandara', school: 'Mahinda College', points: 3540, level: 13, avatar: null },
    { rank: 10, name: 'Ishara Perera', school: 'Gateway College', points: 3420, level: 12, avatar: null }
  ];

  const schoolLeaders = [
    { rank: 1, name: 'Kamal Silva', grade: 11, points: 2840, level: 16, avatar: null },
    { rank: 2, name: 'Anjali Gunawardena', grade: 10, points: 2560, level: 15, avatar: null },
    { rank: 3, name: 'Tharindu Jayasuriya', grade: 12, points: 2340, level: 14, avatar: null },
    { rank: 4, name: 'Sanduni Wickrama', grade: 9, points: 2120, level: 13, avatar: null },
    { rank: 5, name: 'Ranidu Perera', grade: 11, points: 1980, level: 12, avatar: null }
  ];

  const weeklyTop = [
    { rank: 1, name: 'Nisha Fernando', pointsThisWeek: 420, totalPoints: 4890, avatar: null },
    { rank: 2, name: 'Amaya Jayawardena', pointsThisWeek: 380, totalPoints: 4320, avatar: null },
    { rank: 3, name: 'Saman Perera', pointsThisWeek: 350, totalPoints: 5240, avatar: null },
    { rank: 4, name: 'Thilini Rathnayake', pointsThisWeek: 320, totalPoints: 3950, avatar: null },
    { rank: 5, name: 'Dinesh Wickramasinghe', pointsThisWeek: 290, totalPoints: 4180, avatar: null }
  ];

  const getRankColor = (rank) => {
    if (rank === 1) return '#ffd700';
    if (rank === 2) return '#c0c0c0';
    if (rank === 3) return '#cd7f32';
    return '#757575';
  };

  const getRankIcon = (rank) => {
    if (rank <= 3) {
      return <EmojiEvents sx={{ color: getRankColor(rank), fontSize: 28 }} />;
    }
    return <Typography variant="h6" color="text.secondary">#{rank}</Typography>;
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <EmojiEvents sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2, color: '#ffd700' }} />
            {t('leaderboard.header.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('leaderboard.header.subtitle')}
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ marginBottom: 3 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 3 }}>
              <TrendingUp sx={{ fontSize: 40, color: 'primary.main', marginBottom: 1 }} />
              <Typography variant="h5" fontWeight="bold">2,847</Typography>
              <Typography variant="body2" color="text.secondary">{t('leaderboard.stats.totalStudents')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 3 }}>
              <School sx={{ fontSize: 40, color: 'secondary.main', marginBottom: 1 }} />
              <Typography variant="h5" fontWeight="bold">156</Typography>
              <Typography variant="body2" color="text.secondary">{t('leaderboard.stats.schoolsParticipating')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 3 }}>
              <LocalFireDepartment sx={{ fontSize: 40, color: 'error.main', marginBottom: 1 }} />
              <Typography variant="h5" fontWeight="bold">845</Typography>
              <Typography variant="body2" color="text.secondary">{t('leaderboard.stats.activeThisWeek')}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Paper elevation={3} sx={{ marginBottom: 3, borderRadius: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label={t('leaderboard.tabs.global')} />
            <Tab label={t('leaderboard.tabs.school')} />
            <Tab label={t('leaderboard.tabs.week')} />
          </Tabs>
        </Paper>

        {/* Leaderboard Content */}
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Global Leaderboard */}
          {activeTab === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>{t('leaderboard.columns.rank')}</strong></TableCell>
                    <TableCell><strong>{t('leaderboard.columns.student')}</strong></TableCell>
                    <TableCell><strong>{t('leaderboard.columns.school')}</strong></TableCell>
                    <TableCell align="center"><strong>{t('leaderboard.columns.level')}</strong></TableCell>
                    <TableCell align="right"><strong>{t('leaderboard.columns.points')}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {globalLeaders.map((leader) => (
                    <TableRow key={leader.rank} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48 }}>
                          {getRankIcon(leader.rank)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>{leader.name.charAt(0)}</Avatar>
                          <Typography variant="body1" fontWeight="medium">{leader.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{leader.school}</TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={<Star />}
                          label={t('leaderboard.level', { level: leader.level })}
                          size="small"
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold" color="primary">
                          {leader.points.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* School Leaderboard */}
          {activeTab === 1 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>{t('leaderboard.columns.rank')}</strong></TableCell>
                    <TableCell><strong>{t('leaderboard.columns.student')}</strong></TableCell>
                    <TableCell align="center"><strong>{t('leaderboard.columns.grade')}</strong></TableCell>
                    <TableCell align="center"><strong>{t('leaderboard.columns.level')}</strong></TableCell>
                    <TableCell align="right"><strong>{t('leaderboard.columns.points')}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schoolLeaders.map((leader) => (
                    <TableRow key={leader.rank} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48 }}>
                          {getRankIcon(leader.rank)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>{leader.name.charAt(0)}</Avatar>
                          <Typography variant="body1" fontWeight="medium">{leader.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{t('leaderboard.grade', { grade: leader.grade })}</TableCell>
                      <TableCell align="center">
                        <Chip
                          icon={<Star />}
                          label={t('leaderboard.level', { level: leader.level })}
                          size="small"
                          color="secondary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" fontWeight="bold" color="secondary">
                          {leader.points.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Weekly Top */}
          {activeTab === 2 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell><strong>{t('leaderboard.columns.rank')}</strong></TableCell>
                    <TableCell><strong>{t('leaderboard.columns.student')}</strong></TableCell>
                    <TableCell align="right"><strong>{t('leaderboard.columns.thisWeek')}</strong></TableCell>
                    <TableCell align="right"><strong>{t('leaderboard.columns.totalPoints')}</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {weeklyTop.map((leader) => (
                    <TableRow key={leader.rank} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48 }}>
                          {getRankIcon(leader.rank)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>{leader.name.charAt(0)}</Avatar>
                          <Typography variant="body1" fontWeight="medium">{leader.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          icon={<LocalFireDepartment />}
                          label={t('leaderboard.weekly.pointsGain', { points: leader.pointsThisWeek })}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body1" color="text.secondary">
                          {leader.totalPoints.toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Leaderboard;
