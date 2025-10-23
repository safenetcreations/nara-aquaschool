// NARA AquaSchool - Redesigned Landing Page
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Stack,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Waves,
  Water,
  AccountBalance,
  Science,
  Games,
  Quiz,
  School,
  Groups,
  ArrowForward,
  Explore,
  Language
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HERO_STATS } from '../../data/verifiedStats';
import { useEffect } from 'react';
import { getAllSchools } from '../../services/schoolService';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Home = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [schoolStats, setSchoolStats] = useState({
    totalSchools: 0,
    totalStudents: 0,
    uniqueDistricts: 0,
    avgStudents: 0
  });

  useEffect(() => {
    loadSchoolStats();
  }, []);

  const loadSchoolStats = async () => {
    try {
      const schools = await getAllSchools();
      const totalSchools = schools.length;
      const totalStudents = schools.reduce((sum, s) => sum + (s.studentCount || 0), 0);
      const uniqueDistricts = new Set(schools.map(s => s.district)).size;
      const avgStudents = totalSchools > 0 ? Math.round(totalStudents / totalSchools) : 0;
      
      setSchoolStats({
        totalSchools,
        totalStudents,
        uniqueDistricts,
        avgStudents
      });
    } catch (error) {
      console.error('Error loading school stats:', error);
    }
  };

  const LANGUAGE_OPTIONS = [
    { code: 'en', label: 'English', translationKey: 'common.languages.english' },
    { code: 'si', label: 'සිංහල', translationKey: 'common.languages.sinhala' },
    { code: 'ta', label: 'தமிழ்', translationKey: 'common.languages.tamil' }
  ];

  const currentLanguage = LANGUAGE_OPTIONS.find(lang => lang.code === i18n.language)?.code.toUpperCase() || 'EN';

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setLanguageAnchor(null);
  };

  const features = [
    {
      icon: <Waves sx={{ fontSize: 48 }} />,
      title: 'Marine Life',
      description: 'Explore 500+ marine species found in Sri Lankan waters',
      color: '#1565C0',
      path: '/marine-life'
    },
    {
      icon: <Water sx={{ fontSize: 48 }} />,
      title: 'Freshwater Frontiers',
      description: 'Discover ancient irrigation systems and freshwater ecosystems',
      color: '#1976D2',
      path: '/freshwater'
    },
    {
      icon: <AccountBalance sx={{ fontSize: 48 }} />,
      title: 'Water Heritage',
      description: 'Learn about Sri Lanka\'s 30,000+ ancient water tanks',
      color: '#1E88E5',
      path: '/heritage'
    },
    {
      icon: <Science sx={{ fontSize: 48 }} />,
      title: 'NARA Research',
      description: 'Real-time ocean data and scientific research',
      color: '#2196F3',
      path: '/nara'
    },
    {
      icon: <Games sx={{ fontSize: 48 }} />,
      title: 'Interactive Learning',
      description: 'Engage with games, quizzes, and virtual dives',
      color: '#42A5F5',
      path: '/games'
    },
    {
      icon: <Groups sx={{ fontSize: 48 }} />,
      title: 'Citizen Science',
      description: 'Contribute to real marine research projects',
      color: '#0D47A1',
      path: '/citizen-science'
    }
  ];


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      {/* Floating Language Selector */}
      <Box
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000
        }}
      >
        <Tooltip title={t('common.changeLanguage')}>
          <Button
            onClick={(e) => setLanguageAnchor(e.currentTarget)}
            startIcon={<Language />}
            variant="contained"
            size="small"
            sx={{
              textTransform: 'uppercase',
              minWidth: '80px',
              borderRadius: 2,
              fontWeight: 600,
              bgcolor: 'rgba(255,255,255,0.95)',
              color: '#1565C0',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'white',
                boxShadow: 6
              }
            }}
          >
            {currentLanguage}
          </Button>
        </Tooltip>
        <Menu
          anchorEl={languageAnchor}
          open={Boolean(languageAnchor)}
          onClose={() => setLanguageAnchor(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {LANGUAGE_OPTIONS.map(({ code, translationKey }) => (
            <MenuItem
              key={code}
              selected={currentLanguage === code.toUpperCase()}
              onClick={() => handleLanguageChange(code)}
              sx={{
                fontWeight: currentLanguage === code.toUpperCase() ? 600 : 400,
                backgroundColor: currentLanguage === code.toUpperCase() ? 'action.selected' : 'transparent'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
                  {code}
                </Typography>
                <Typography>-</Typography>
                <Typography>{t(translationKey)}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Animated Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 30%, #1976D2 60%, #42A5F5 100%)',
          color: 'white',
          py: { xs: 10, md: 18 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '90vh', md: '85vh' }
        }}
      >
        {/* Animated Wave Background */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '150px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 100%)',
            animation: 'wave 10s ease-in-out infinite',
            '@keyframes wave': {
              '0%, 100%': { transform: 'translateX(0) scaleY(1)' },
              '50%': { transform: 'translateX(-25%) scaleY(1.2)' }
            }
          }}
        />

        {/* Floating Marine Elements */}
        {[...Array(6)].map((_, index) => (
          <MotionBox
            key={index}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -30, 0],
              x: [0, index % 2 === 0 ? 20 : -20, 0]
            }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
              delay: index * 0.5
            }}
            sx={{
              position: 'absolute',
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'rgba(255,255,255,0.2)',
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 3) * 20}%`,
              display: { xs: index < 3 ? 'block' : 'none', md: 'block' }
            }}
          >
            {index % 3 === 0 ? '🐠' : index % 3 === 1 ? '🐟' : '🦈'}
          </MotionBox>
        ))}

        {/* Bubble Animations */}
        {[...Array(8)].map((_, index) => (
          <MotionBox
            key={`bubble-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
              y: [-100, -400]
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              delay: index * 0.7
            }}
            sx={{
              position: 'absolute',
              width: { xs: '20px', md: '30px' },
              height: { xs: '20px', md: '30px' },
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              left: `${5 + index * 12}%`,
              bottom: 0,
              display: { xs: index < 4 ? 'block' : 'none', md: 'block' }
            }}
          />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            {/* Animated Title */}
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.8rem', sm: '3.5rem', md: '5rem' },
                  fontWeight: 900,
                  mb: 2,
                  background: 'linear-gradient(45deg, #FFFFFF 30%, #B3E5FC 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255,255,255,0.3)',
                  letterSpacing: { xs: '0', md: '2px' }
                }}
              >
                🌊 NARA AquaSchool
              </Typography>
            </MotionBox>

            {/* Subtitle with Animation */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.3rem', md: '2rem' },
                  mb: 3,
                  fontWeight: 600,
                  opacity: 0.95,
                  textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                🎓 Learn • Explore • Discover 🔬
              </Typography>
            </MotionBox>

            {/* Description */}
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  mb: 2,
                  maxWidth: '900px',
                  mx: 'auto',
                  opacity: 0.9,
                  lineHeight: 1.6,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
                }}
              >
                Dive into Sri Lanka's amazing underwater world! 🐠
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 5,
                  maxWidth: '800px',
                  mx: 'auto',
                  opacity: 0.85,
                  textShadow: '1px 1px 4px rgba(0,0,0,0.2)'
                }}
              >
                3,300+ Marine Species • 30,000+ Ancient Tanks • 12 Fun Games • Virtual Reality Dives
              </Typography>
            </MotionBox>

            {/* Animated Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              <MotionBox
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#0D47A1',
                    px: 5,
                    py: 2,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 700,
                    borderRadius: 5,
                    boxShadow: '0 8px 24px rgba(255,215,0,0.4)',
                    '&:hover': {
                      bgcolor: '#FFC700',
                      boxShadow: '0 12px 32px rgba(255,215,0,0.6)',
                      transform: 'translateY(-4px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  🚀 Start Learning Now!
                </Button>
              </MotionBox>

              <MotionBox
                whileHover={{ scale: 1.1, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<Explore />}
                  onClick={() => navigate('/marine-life')}
                  sx={{
                    borderColor: 'white',
                    borderWidth: 3,
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 700,
                    borderRadius: 5,
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.2)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
                      transform: 'translateY(-4px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  🌊 Explore Marine Life
                </Button>
              </MotionBox>
            </Stack>

            {/* Stats Cards - Animated */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                {HERO_STATS.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <MotionBox
                      whileHover={{ scale: 1.1, y: -10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={() => navigate(stat.link)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Paper
                        elevation={6}
                        sx={{
                          p: 2,
                          bgcolor: 'rgba(255,255,255,0.95)',
                          borderRadius: 3,
                          textAlign: 'center',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255,255,255,0.3)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'white',
                            border: '2px solid #1565C0',
                            boxShadow: '0 12px 40px rgba(21,101,192,0.3)'
                          }
                        }}
                      >
                        <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>
                          {stat.icon}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: '#1565C0',
                            mb: 0.5
                          }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#666',
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </Paper>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </MotionBox>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              color: '#1565C0',
              mb: 2
            }}
          >
            Explore Our Platform
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
            Discover the fascinating world of marine life and water heritage through
            interactive learning experiences
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionCard
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: 8
                  }
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: feature.color + '20',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      color: feature.color
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* NARA Academy Section with Live School Stats */}
      <Box sx={{ bgcolor: '#f5f9ff', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: '#1565C0',
                mb: 2
              }}
            >
              🎓 NARA Academy Network
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}>
              Connecting schools across Sri Lanka with ocean education
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center" sx={{ mb: 4 }}>
            <Grid item xs={6} md={3}>
              <MotionCard
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <School sx={{ fontSize: 48, color: '#1565C0', mb: 2 }} />
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {schoolStats.totalSchools}+
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Partner Schools
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <MotionCard
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Groups sx={{ fontSize: 48, color: '#1565C0', mb: 2 }} />
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {schoolStats.totalStudents > 0 ? `${(schoolStats.totalStudents / 1000).toFixed(1)}K+` : '5K+'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Students Reached
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <MotionCard
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Explore sx={{ fontSize: 48, color: '#1565C0', mb: 2 }} />
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {schoolStats.uniqueDistricts}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Districts
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
            <Grid item xs={6} md={3}>
              <MotionCard
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <AccountBalance sx={{ fontSize: 48, color: '#1565C0', mb: 2 }} />
                  <Typography variant="h3" fontWeight={700} color="primary">
                    {schoolStats.avgStudents}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Avg Students
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          </Grid>

          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/school-directory')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: 3
              }}
            >
              View School Directory
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: '#1565C0',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Dive In?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of students exploring Sri Lanka's marine and water heritage
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<School />}
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: '#1565C0',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#F5F5F5'
                }
              }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              endIcon={<Quiz />}
              onClick={() => navigate('/login')}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#0D47A1', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8 }}>
            © 2025 NARA AquaSchool | National Aquatic Resources Research and Development Agency
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
