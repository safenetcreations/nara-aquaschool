import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  Quiz,
  EmojiEvents,
  Timer,
  CheckCircle,
  TrendingUp,
  School
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * QuizCenter Component
 * Hub for all quizzes - browse, take, and view results
 */
const QuizCenter = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    quizzesTaken: 12,
    averageScore: 85,
    perfectScores: 3,
    totalPoints: 360
  });

  const baseQuizzes = [
    {
      id: 'marineMammals',
      questions: 15,
      duration: 20,
      points: 150,
      completed: true,
      score: 90,
      image: 'https://source.unsplash.com/400x300/?whale,ocean'
    },
    {
      id: 'coralReefs',
      questions: 10,
      duration: 15,
      points: 100,
      completed: false,
      image: 'https://source.unsplash.com/400x300/?coral,reef'
    },
    {
      id: 'waterHeritage',
      questions: 20,
      duration: 30,
      points: 200,
      completed: false,
      image: 'https://source.unsplash.com/400x300/?sri-lanka,water'
    },
    {
      id: 'freshwaterFish',
      questions: 12,
      duration: 18,
      points: 120,
      completed: true,
      score: 75,
      image: 'https://source.unsplash.com/400x300/?freshwater,fish'
    },
    {
      id: 'oceanConservation',
      questions: 10,
      duration: 15,
      points: 100,
      completed: false,
      image: 'https://source.unsplash.com/400x300/?ocean,conservation'
    },
    {
      id: 'naraResearch',
      questions: 15,
      duration: 25,
      points: 150,
      completed: false,
      image: 'https://source.unsplash.com/400x300/?research,laboratory'
    }
  ];

  const categories = t('quiz.categories', { returnObjects: true }) || {};
  const difficultyLabels = t('quiz.difficultyLabels', { returnObjects: true }) || {};
  const difficultyColors = {
    easy: 'success',
    medium: 'warning',
    hard: 'error'
  };

  useEffect(() => {
    const cardText = t('quiz.cards', { returnObjects: true }) || {};
    const mapped = baseQuizzes.map((quiz) => ({
      ...quiz,
      ...(cardText[quiz.id] || {})
    }));
    setQuizzes(mapped);
  }, [i18n.language, t]);

  const getDifficultyColor = (difficulty) => difficultyColors[difficulty] || 'default';

  const handleStartQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Quiz sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            {t('quiz.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('quiz.subtitle')}
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<Quiz />} label={t('quiz.stats.quizzesTaken')} value={stats.quizzesTaken} color="primary" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<TrendingUp />} label={t('quiz.stats.averageScore')} value={`${stats.averageScore}%`} color="secondary" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<CheckCircle />} label={t('quiz.stats.perfectScores')} value={stats.perfectScores} color="success" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<EmojiEvents />} label={t('quiz.stats.totalPoints')} value={stats.totalPoints} color="warning" />
          </Grid>
        </Grid>

        {/* Quiz Grid */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>
          {t('quiz.listTitle')}
        </Typography>

        <Grid container spacing={3}>
          {quizzes.map((quiz) => (
            <Grid item xs={12} sm={6} md={4} key={quiz.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box
                  sx={{
                    height: 140,
                    backgroundImage: `url(${quiz.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  {quiz.completed && (
                    <Chip
                      label={t('quiz.chips.score', { score: quiz.score ?? 0 })}
                      color="success"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                  <Chip
                    label={difficultyLabels[quiz.difficulty] || quiz.difficulty}
                    color={getDifficultyColor(quiz.difficulty)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      left: 10,
                      fontWeight: 'bold'
                    }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {quiz.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginBottom: 1 }}>
                    <Chip
                      icon={<School />}
                      label={categories[quiz.category] || quiz.category}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Quiz />}
                      label={t('quiz.meta.questions', { count: quiz.questions })}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Timer />}
                      label={t('quiz.meta.duration', { minutes: quiz.duration })}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>

                <CardActions sx={{ padding: 2, paddingTop: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleStartQuiz(quiz.id)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {`${quiz.completed ? t('quiz.buttons.retake') : t('quiz.buttons.start')} (+${quiz.points} ${t('common.points')})`}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Helper Component
const StatsCard = ({ icon, label, value, color }) => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      borderRadius: 3,
      textAlign: 'center'
    }}
  >
    <Box sx={{ color: `${color}.main`, marginBottom: 1 }}>
      {React.cloneElement(icon, { sx: { fontSize: 40 } })}
    </Box>
    <Typography variant="h4" fontWeight="bold">
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Paper>
);

export default QuizCenter;
