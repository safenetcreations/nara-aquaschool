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

/**
 * QuizCenter Component
 * Hub for all quizzes - browse, take, and view results
 */
const QuizCenter = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    quizzesTaken: 12,
    averageScore: 85,
    perfectScores: 3,
    totalPoints: 360
  });

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = () => {
    // Sample quiz data
    const sampleQuizzes = [
      {
        id: 1,
        title: 'Marine Mammals of Sri Lanka',
        description: 'Test your knowledge about whales, dolphins, and other marine mammals',
        category: 'Marine Life',
        difficulty: 'Medium',
        questions: 15,
        duration: 20,
        points: 150,
        completed: true,
        score: 90,
        image: 'https://source.unsplash.com/400x300/?whale,ocean'
      },
      {
        id: 2,
        title: 'Coral Reef Ecosystems',
        description: 'Learn about the diverse life in coral reefs',
        category: 'Marine Life',
        difficulty: 'Easy',
        questions: 10,
        duration: 15,
        points: 100,
        completed: false,
        image: 'https://source.unsplash.com/400x300/?coral,reef'
      },
      {
        id: 3,
        title: 'Sri Lankan Water Heritage',
        description: 'Ancient irrigation systems and water management',
        category: 'Heritage',
        difficulty: 'Hard',
        questions: 20,
        duration: 30,
        points: 200,
        completed: false,
        image: 'https://source.unsplash.com/400x300/?sri-lanka,water'
      },
      {
        id: 4,
        title: 'Freshwater Fish Species',
        description: 'Identify fish species in Sri Lankan rivers and lakes',
        category: 'Freshwater',
        difficulty: 'Medium',
        questions: 12,
        duration: 18,
        points: 120,
        completed: true,
        score: 75,
        image: 'https://source.unsplash.com/400x300/?freshwater,fish'
      },
      {
        id: 5,
        title: 'Ocean Conservation',
        description: 'Understanding threats and conservation efforts',
        category: 'Conservation',
        difficulty: 'Easy',
        questions: 10,
        duration: 15,
        points: 100,
        completed: false,
        image: 'https://source.unsplash.com/400x300/?ocean,conservation'
      },
      {
        id: 6,
        title: 'NARA Research Projects',
        description: 'Learn about ongoing research at NARA',
        category: 'Science',
        difficulty: 'Hard',
        questions: 15,
        duration: 25,
        points: 150,
        completed: false,
        image: 'https://source.unsplash.com/400x300/?research,laboratory'
      }
    ];

    setQuizzes(sampleQuizzes);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'success',
      Medium: 'warning',
      Hard: 'error'
    };
    return colors[difficulty] || 'default';
  };

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
            Quiz Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Test your knowledge and earn points by completing quizzes
          </Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<Quiz />} label="Quizzes Taken" value={stats.quizzesTaken} color="primary" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<TrendingUp />} label="Average Score" value={`${stats.averageScore}%`} color="secondary" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<CheckCircle />} label="Perfect Scores" value={stats.perfectScores} color="success" />
          </Grid>
          <Grid item xs={6} md={3}>
            <StatsCard icon={<EmojiEvents />} label="Total Points" value={stats.totalPoints} color="warning" />
          </Grid>
        </Grid>

        {/* Quiz Grid */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>
          Available Quizzes
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
                      label={`${quiz.score}%`}
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
                    label={quiz.difficulty}
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
                      label={quiz.category}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Quiz />}
                      label={`${quiz.questions} questions`}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Timer />}
                      label={`${quiz.duration} min`}
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
                    {quiz.completed ? 'Retake Quiz' : 'Start Quiz'} (+{quiz.points} pts)
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
