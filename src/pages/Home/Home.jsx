// src/pages/Home/Home.jsx - Landing page for NARA AquaSchool
import React, { useState, useEffect, useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = useMemo(() => [
    {
      icon: <Waves />,
      title: t('home.features.marineLife.title'),
      description: t('home.features.marineLife.description'),
      color: '#006994'
    },
    {
      icon: <AccountBalance />,
      title: t('home.features.waterHeritage.title'),
      description: t('home.features.waterHeritage.description'),
      color: '#00a86b'
    },
    {
      icon: <LiveTv />,
      title: t('home.features.liveData.title'),
      description: t('home.features.liveData.description'),
      color: '#ff6b6b'
    },
    {
      icon: <Groups />,
      title: t('home.features.citizenScience.title'),
      description: t('home.features.citizenScience.description'),
      color: '#4ecdc4'
    },
    {
      icon: <EmojiEvents />,
      title: t('home.features.gamification.title'),
      description: t('home.features.gamification.description'),
      color: '#f7b731'
    },
    {
      icon: <Map />,
      title: t('home.features.fieldVisits.title'),
      description: t('home.features.fieldVisits.description'),
      color: '#5f27cd'
    }
  ], [t]);

  const stats = [
    { value: 30000, labelKey: 'home.stats.ancientTanks', suffix: '+' },
    { value: 500, labelKey: 'home.stats.marineSpecies', suffix: '+' },
    { value: 1350, labelKey: 'home.stats.coastline', suffix: '' },
    { value: 50000, labelKey: 'home.stats.students', suffix: '+' }
  ];

  const contentPillars = useMemo(() => [
    {
      id: 'marine',
      title: t('home.pillars.marine.title'),
      subtitle: t('home.pillars.marine.subtitle'),
      description: t('home.pillars.marine.description'),
      image: '/images/marine-life.jpg',
      topics: t('home.pillars.marine.topics', { returnObjects: true }),
      path: '/marine-life'
    },
    {
      id: 'freshwater',
      title: t('home.pillars.freshwater.title'),
      subtitle: t('home.pillars.freshwater.subtitle'),
      description: t('home.pillars.freshwater.description'),
      image: '/images/freshwater.jpg',
      topics: t('home.pillars.freshwater.topics', { returnObjects: true }),
      path: '/freshwater'
    },
    {
      id: 'heritage',
      title: t('home.pillars.heritage.title'),
      subtitle: t('home.pillars.heritage.subtitle'),
      description: t('home.pillars.heritage.description'),
      image: '/images/heritage.jpg',
      topics: t('home.pillars.heritage.topics', { returnObjects: true }),
      path: '/heritage'
    },
    {
      id: 'nara',
      title: t('home.pillars.nara.title'),
      subtitle: t('home.pillars.nara.subtitle'),
      description: t('home.pillars.nara.description'),
      image: '/images/nara-research.jpg',
      topics: t('home.pillars.nara.topics', { returnObjects: true }),
      path: '/nara'
    }
  ], [t]);

  const faqs = useMemo(() => [
    {
      question: t('home.faqs.whatIs.question'),
      answer: t('home.faqs.whatIs.answer')
    },
    {
      question: t('home.faqs.whoCanUse.question'),
      answer: t('home.faqs.whoCanUse.answer')
    },
    {
      question: t('home.faqs.isFree.question'),
      answer: t('home.faqs.isFree.answer')
    },
    {
      question: t('home.faqs.fieldVisits.question'),
      answer: t('home.faqs.fieldVisits.answer')
    },
    {
      question: t('home.faqs.gamification.question'),
      answer: t('home.faqs.gamification.answer')
    },
    {
      question: t('home.faqs.contributeResearch.question'),
      answer: t('home.faqs.contributeResearch.answer')
    }
  ], [t]);

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
                {t('home.brand')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
              >
                {t('auth.signIn')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
              >
                {t('home.actions.getStarted')}
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
                  {t('home.hero.title')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 3,
                  fontWeight: 300
                }}
              >
                  {t('home.hero.subtitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  fontSize: '1.1rem'
                }}
              >
                  {t('home.hero.description')}
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
                {t('home.actions.startLearning')}
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
                {t('home.actions.watchDemo')}
              </Button>
                </Box>
                
                {/* Language Options */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<Language />}
                    label={t('languages.en')}
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip
                    label={t('languages.si')}
                    sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip
                    label={t('languages.ta')}
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
                      {t(stat.labelKey)}
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
            {t('home.features.heading')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            {t('home.features.subheading')}
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
            {t('home.pillars.heading')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            {t('home.pillars.subheading')}
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
                      {t('home.pillars.topicsTitle')}
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
                      {t('home.pillars.explore', { pillar: pillar.title })}
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
            {t('home.interactive.heading')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            {t('home.interactive.subheading')}
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
                  {t('home.interactive.quizzes.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('home.interactive.quizzes.description')}
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
                  {t('home.interactive.games.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('home.interactive.games.description')}
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
                  {t('home.interactive.cameras.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('home.interactive.cameras.description')}
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
                  {t('home.interactive.dives.title')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {t('home.interactive.dives.description')}
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
            {t('home.faqs.heading')}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            sx={{ mb: 6 }}
          >
            {t('home.faqs.subheading')}
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
              {t('home.cta.title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {t('home.cta.subtitle')}
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
                {t('home.actions.createAccount')}
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
              {t('auth.signIn')}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
