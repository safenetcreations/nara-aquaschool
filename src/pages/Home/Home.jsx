// src/pages/Home/Home.jsx - Landing page for NARA AquaSchool
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Paper,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs,
  Divider
} from '@mui/material';
import {
  PlayCircle,
  School,
  Science,
  Waves,
  Water,
  AccountBalance,
  Groups,
  EmojiEvents,
  LiveTv,
  Map,
  ExpandMore,
  Check,
  Star,
  TrendingUp,
  Language,
  Quiz,
  Games,
  PhotoCamera,
  MenuBook,
  Explore,
  ArrowForward
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Waves />,
      title: 'Marine Life Explorer',
      description: 'Discover 500+ species found in Sri Lankan waters with interactive 3D models',
      color: '#006994'
    },
    {
      icon: <AccountBalance />,
      title: 'Water Heritage',
      description: 'Explore 2000+ years of hydraulic civilization and ancient irrigation systems',
      color: '#00a86b'
    },
    {
      icon: <LiveTv />,
      title: 'Live Ocean Data',
      description: 'Real-time oceanographic data and underwater camera feeds from research stations',
      color: '#ff6b6b'
    },
    {
      icon: <Groups />,
      title: 'Citizen Science',
      description: 'Contribute to real marine research and conservation projects',
      color: '#4ecdc4'
    },
    {
      icon: <EmojiEvents />,
      title: 'Gamified Learning',
      description: 'Earn badges, compete in challenges, and track your progress',
      color: '#f7b731'
    },
    {
      icon: <Map />,
      title: 'Field Visits',
      description: 'Book educational visits to NARA facilities and research centers',
      color: '#5f27cd'
    }
  ];

  const stats = [
    { value: 30000, label: 'Ancient Tanks', suffix: '+' },
    { value: 500, label: 'Marine Species', suffix: '+' },
    { value: 1350, label: 'Coastline (km)', suffix: '' },
    { value: 50000, label: 'Students', suffix: '+' }
  ];

  const contentPillars = [
    {
      id: 'marine',
      title: 'The Living Ocean',
      subtitle: 'Marine Biology & Oceanography',
      description: 'Dive into Sri Lanka\'s marine biodiversity, from coral reefs to blue whales',
      image: '/images/marine-life.jpg',
      topics: ['Coral Reefs', 'Marine Mammals', 'Fish Species', 'Ocean Currents'],
      path: '/marine-life'
    },
    {
      id: 'freshwater',
      title: 'Freshwater Frontiers',
      subtitle: 'Rivers, Lakes & Wetlands',
      description: 'Explore inland water ecosystems and their importance',
      image: '/images/freshwater.jpg',
      topics: ['River Systems', 'Wetland Ecology', 'Water Quality', 'Aquaculture'],
      path: '/freshwater'
    },
    {
      id: 'heritage',
      title: 'Water Heritage',
      subtitle: 'Ancient Hydraulic Civilization',
      description: 'Discover Sri Lanka\'s remarkable water engineering legacy',
      image: '/images/heritage.jpg',
      topics: ['Ancient Tanks', 'Irrigation Systems', 'Hydraulic Technology', 'Cultural Impact'],
      path: '/heritage'
    },
    {
      id: 'nara',
      title: 'NARA in Action',
      subtitle: 'Research & Conservation',
      description: 'Learn about cutting-edge marine research and conservation efforts',
      image: '/images/nara-research.jpg',
      topics: ['Research Projects', 'Conservation', 'Technology', 'Career Paths'],
      path: '/nara'
    }
  ];

  const faqs = [
    {
      question: 'What is NARA AquaSchool?',
      answer: 'NARA AquaSchool is an interactive educational platform developed by the National Aquatic Resources Research and Development Agency (NARA) to engage Sri Lankan students in marine science, freshwater ecology, and water heritage education.'
    },
    {
      question: 'Who can use this platform?',
      answer: 'The platform is designed for students from Grade 5 to Grade 12, but it\'s also valuable for teachers, parents, and anyone interested in aquatic sciences. Content is available in Sinhala, Tamil, and English.'
    },
    {
      question: 'Is it free to use?',
      answer: 'Yes! NARA AquaSchool is completely free for all Sri Lankan students and educators. Simply create an account to access all features and content.'
    },
    {
      question: 'Can schools organize field visits to NARA?',
      answer: 'Absolutely! Schools can book educational visits to NARA research centers in Colombo, Kadolkele (Negombo), Rekawa, Kalpitiya, and Trincomalee through our platform.'
    },
    {
      question: 'How does the gamification system work?',
      answer: 'Students earn points and badges by completing lessons, taking quizzes, participating in citizen science projects, and contributing to challenges. Progress is tracked with levels and leaderboards.'
    },
    {
      question: 'Can students contribute to real research?',
      answer: 'Yes! Through our Citizen Science program, students can collect data on beach health, water quality, species observations, and more, contributing to actual NARA research projects.'
    }
  ];

  return (
    <Box>
      {/* Top Navigation Bar */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Waves sx={{ fontSize: 40, color: '#667eea' }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                NARA AquaSchool
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          paddingTop: '80px' // Add padding for fixed navbar
        }}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            backgroundImage: 'url(/ocean-pattern.svg)',
            backgroundSize: 'cover',
            animation: 'wave 20s linear infinite'
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Explore Sri Lanka's Waters
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 3,
                    fontWeight: 300
                  }}
                >
                  From Ancient Tanks to Modern Reefs
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    mb: 4,
                    fontSize: '1.1rem'
                  }}
                >
                  Join NARA AquaSchool - Sri Lanka's premier marine education platform. 
                  Discover ocean wonders, explore freshwater ecosystems, and learn about 
                  our remarkable water heritage through interactive lessons, real-time data, 
                  and hands-on citizen science.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#667eea',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)'
                      }
                    }}
                  >
                    Start Learning Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayCircle />}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    Watch Demo
                  </Button>
                </Box>
                
                {/* Language Options */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<Language />}
                    label="English"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip
                    label="සිංහල"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip
                    label="தமிழ்"
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 300, md: 500 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Waves sx={{ fontSize: 300, color: 'rgba(255,255,255,0.2)' }} />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: 'white'
                    }}
                    elevation={0}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: '#667eea',
                        mb: 1
                      }}
                    >
                      {isVisible && (
                        <CountUp
                          end={stat.value}
                          duration={2}
                          separator=","
                          suffix={stat.suffix}
                        />
                      )}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Why Choose AquaSchool?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            Engaging features designed for effective learning
          </Typography>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          margin: '0 auto 20px',
                          backgroundColor: feature.color
                        }}
                      >
                        {React.cloneElement(feature.icon, { 
                          sx: { fontSize: 40, color: 'white' } 
                        })}
                      </Avatar>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Content Pillars Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Explore Four Learning Pillars
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            Comprehensive aquatic education covering all aspects
          </Typography>
          
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            centered
            sx={{ mb: 4 }}
          >
            {contentPillars.map((pillar, index) => (
              <Tab key={pillar.id} label={pillar.title} />
            ))}
          </Tabs>
          
          {contentPillars.map((pillar, index) => (
            <Box
              key={pillar.id}
              hidden={tabValue !== index}
              sx={{ mt: 4 }}
            >
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: tabValue === index ? 1 : 0, x: tabValue === index ? 0 : -30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: 300,
                        borderRadius: 2,
                        boxShadow: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Waves sx={{ fontSize: 120, color: 'rgba(255,255,255,0.3)' }} />
                    </Box>
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: tabValue === index ? 1 : 0, x: tabValue === index ? 0 : 30 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography variant="overline" color="primary">
                      {pillar.subtitle}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body1" paragraph color="textSecondary">
                      {pillar.description}
                    </Typography>
                    
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Topics Covered:
                    </Typography>
                    <List dense>
                      {pillar.topics.map(topic => (
                        <ListItem key={topic}>
                          <ListItemIcon>
                            <Check color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={topic} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={() => navigate(pillar.path)}
                      sx={{ mt: 2 }}
                    >
                      Explore {pillar.title}
                    </Button>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>

      {/* Interactive Features */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Interactive Learning Tools
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            Engage with content through various interactive features
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sm={6}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate('/quiz')}
              >
                <Quiz sx={{ fontSize: 48, color: '#667eea', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Interactive Quizzes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Test knowledge with adaptive quizzes
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={3} sm={6}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate('/games')}
              >
                <Games sx={{ fontSize: 48, color: '#00a86b', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Educational Games
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Learn through fun simulations
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={3} sm={6}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate('/live-data/cameras')}
              >
                <LiveTv sx={{ fontSize: 48, color: '#ff6b6b', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Live Cameras
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Watch underwater feeds in real-time
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={3} sm={6}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 4
                  }
                }}
                onClick={() => navigate('/marine-life/virtual-dive')}
              >
                <Explore sx={{ fontSize: 48, color: '#4ecdc4', mb: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Virtual Dives
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  360° underwater experiences
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQs Section */}
      <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            Everything you need to know about AquaSchool
          </Typography>
          
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="textSecondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Ready to Dive In?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of students exploring Sri Lanka's aquatic wonders
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  backgroundColor: 'white',
                  color: '#667eea',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Create Free Account
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Sign In
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
