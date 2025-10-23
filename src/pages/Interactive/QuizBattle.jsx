// Real-Time Quiz Battle Arena
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Avatar,
  Chip,
  Stack,
  Paper,
  Divider,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Badge
} from '@mui/material';
import {
  EmojiEvents,
  Timer,
  Check,
  Close,
  Star,
  Bolt,
  TrendingUp,
  Groups,
  Psychology
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const QuizBattle = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState('lobby'); // lobby, playing, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    correctAnswers: 0,
    totalAnswers: 0,
    points: 0,
    avgTime: 0
  });
  const [opponents, setOpponents] = useState([
    { id: 1, name: 'Saman', avatar: '👨', score: 0, level: 5 },
    { id: 2, name: 'Kumari', avatar: '👩', score: 0, level: 7 },
    { id: 3, name: 'Nimal', avatar: '🧑', score: 0, level: 3 }
  ]);

  // Marine Biology Quiz Questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the largest animal on Earth?",
      options: ["African Elephant", "Blue Whale", "Great White Shark", "Giant Squid"],
      correct: 1,
      difficulty: "easy",
      points: 100,
      category: "Marine Mammals"
    },
    {
      id: 2,
      question: "How many hearts does an octopus have?",
      options: ["1", "2", "3", "4"],
      correct: 2,
      difficulty: "medium",
      points: 200,
      category: "Marine Invertebrates"
    },
    {
      id: 3,
      question: "What percentage of Earth's oxygen is produced by the ocean?",
      options: ["20%", "50%", "70%", "90%"],
      correct: 2,
      difficulty: "hard",
      points: 300,
      category: "Ocean Science"
    },
    {
      id: 4,
      question: "Which fish can swim backwards?",
      options: ["Eel", "Tuna", "Salmon", "Goldfish"],
      correct: 0,
      difficulty: "medium",
      points: 200,
      category: "Marine Fish"
    },
    {
      id: 5,
      question: "What color is coral when it bleaches?",
      options: ["Red", "Blue", "White", "Yellow"],
      correct: 2,
      difficulty: "easy",
      points: 100,
      category: "Coral Reefs"
    },
    {
      id: 6,
      question: "How fast can a sailfish swim?",
      options: ["50 km/h", "68 km/h", "110 km/h", "150 km/h"],
      correct: 2,
      difficulty: "hard",
      points: 300,
      category: "Marine Speed Records"
    },
    {
      id: 7,
      question: "What do sea turtles use to navigate?",
      options: ["Stars", "Magnetic fields", "Sound waves", "Smell"],
      correct: 1,
      difficulty: "medium",
      points: 200,
      category: "Marine Navigation"
    },
    {
      id: 8,
      question: "Which ocean is the deepest?",
      options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correct: 1,
      difficulty: "easy",
      points: 100,
      category: "Oceanography"
    }
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeout();
    }
  }, [timeLeft, gameState, showResult]);

  // Simulate opponent answers
  useEffect(() => {
    if (gameState === 'playing' && showResult) {
      const timeout = setTimeout(() => {
        const updatedOpponents = opponents.map(opp => ({
          ...opp,
          score: opp.score + Math.floor(Math.random() * 300)
        }));
        setOpponents(updatedOpponents);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showResult, gameState]);

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setPlayerStats({
      correctAnswers: 0,
      totalAnswers: 0,
      points: 0,
      avgTime: 0
    });
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;

    // Calculate points based on time and streak
    const timeBonus = Math.floor(timeLeft * 10);
    const streakBonus = streak * 50;
    const questionPoints = isCorrect ? question.points + timeBonus + streakBonus : 0;

    if (isCorrect) {
      setScore(score + questionPoints);
      setStreak(streak + 1);
      setPlayerStats(prev => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        totalAnswers: prev.totalAnswers + 1,
        points: prev.points + questionPoints
      }));
    } else {
      setStreak(0);
      setPlayerStats(prev => ({
        ...prev,
        totalAnswers: prev.totalAnswers + 1
      }));
    }

    setShowResult(true);

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  const handleTimeout = () => {
    setShowResult(true);
    setStreak(0);
    setPlayerStats(prev => ({
      ...prev,
      totalAnswers: prev.totalAnswers + 1
    }));

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#2196F3';
    }
  };

  // Lobby Screen
  if (gameState === 'lobby') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              color: 'white',
              borderRadius: 4
            }}
          >
            <EmojiEvents sx={{ fontSize: 100, mb: 3, color: '#FFD700' }} />
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
              🌊 Marine Quiz Battle Arena
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Test your ocean knowledge against other students!
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  <CardContent>
                    <Psychology sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>8 Questions</Typography>
                    <Typography variant="body2">Marine Biology Topics</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  <CardContent>
                    <Timer sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>30 Seconds</Typography>
                    <Typography variant="body2">Per Question</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  <CardContent>
                    <Groups sx={{ fontSize: 48, mb: 1 }} />
                    <Typography variant="h6" fontWeight={600}>Multiplayer</Typography>
                    <Typography variant="body2">Compete with Others</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={handleStartGame}
              sx={{
                bgcolor: '#FFD700',
                color: '#0D47A1',
                px: 8,
                py: 2,
                fontSize: '1.5rem',
                fontWeight: 700,
                borderRadius: 3,
                '&:hover': {
                  bgcolor: '#FFC700',
                  transform: 'scale(1.05)'
                },
                transition: 'all 0.3s'
              }}
            >
              🚀 START BATTLE!
            </Button>
          </Paper>

          {/* Waiting Players */}
          <Paper sx={{ mt: 4, p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              👥 Players in Lobby ({opponents.length + 1})
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ bgcolor: '#E3F2FD' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1, bgcolor: '#1565C0' }}>
                      👤
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>You</Typography>
                    <Chip label="Level 4" size="small" color="primary" />
                  </CardContent>
                </Card>
              </Grid>
              {opponents.map((opp) => (
                <Grid item xs={12} sm={6} md={3} key={opp.id}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1, bgcolor: '#2196F3' }}>
                        {opp.avatar}
                      </Avatar>
                      <Typography variant="h6" fontWeight={600}>{opp.name}</Typography>
                      <Chip label={`Level ${opp.level}`} size="small" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </MotionBox>
      </Container>
    );
  }

  // Playing Screen
  if (gameState === 'playing') {
    const question = quizQuestions[currentQuestion];

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header with Score and Streak */}
        <Paper elevation={4} sx={{ p: 2, mb: 3, bgcolor: '#1565C0', color: 'white' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Star sx={{ color: '#FFD700' }} />
                <Typography variant="h5" fontWeight={700}>{score} Points</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              {streak > 0 && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Bolt sx={{ color: '#FF9800' }} />
                  <Typography variant="h6">🔥 {streak}x Streak!</Typography>
                </Stack>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Timer />
                <Box sx={{ flexGrow: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(timeLeft / 30) * 100}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: 'rgba(255,255,255,0.3)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: timeLeft < 10 ? '#F44336' : '#4CAF50'
                      }
                    }}
                  />
                </Box>
                <Typography variant="h5" fontWeight={700}>{timeLeft}s</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <MotionCard
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            elevation={8}
            sx={{ mb: 3 }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Chip
                    label={`Question ${currentQuestion + 1}/${quizQuestions.length}`}
                    color="primary"
                  />
                  <Chip
                    label={question.category}
                    sx={{ bgcolor: '#E3F2FD' }}
                  />
                  <Chip
                    label={question.difficulty.toUpperCase()}
                    sx={{
                      bgcolor: getDifficultyColor(question.difficulty),
                      color: 'white',
                      fontWeight: 700
                    }}
                  />
                  <Chip
                    label={`${question.points} pts`}
                    color="success"
                  />
                </Stack>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  mb: 4,
                  color: '#1565C0'
                }}
              >
                {question.question}
              </Typography>

              <Grid container spacing={2}>
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correct;
                  const showCorrectAnswer = showResult && isCorrect;
                  const showWrongAnswer = showResult && isSelected && !isCorrect;

                  return (
                    <Grid item xs={12} sm={6} key={index}>
                      <MotionPaper
                        whileHover={{ scale: !showResult ? 1.02 : 1 }}
                        whileTap={{ scale: !showResult ? 0.98 : 1 }}
                        onClick={() => handleAnswerSelect(index)}
                        elevation={isSelected ? 8 : 2}
                        sx={{
                          p: 3,
                          cursor: showResult ? 'default' : 'pointer',
                          bgcolor: showCorrectAnswer
                            ? '#4CAF50'
                            : showWrongAnswer
                            ? '#F44336'
                            : isSelected
                            ? '#E3F2FD'
                            : 'white',
                          color: showCorrectAnswer || showWrongAnswer ? 'white' : 'inherit',
                          border: `3px solid ${
                            showCorrectAnswer
                              ? '#2E7D32'
                              : showWrongAnswer
                              ? '#C62828'
                              : isSelected
                              ? '#1565C0'
                              : 'transparent'
                          }`,
                          transition: 'all 0.3s',
                          position: 'relative'
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              bgcolor: showCorrectAnswer || showWrongAnswer ? 'rgba(255,255,255,0.3)' : '#1565C0',
                              color: showCorrectAnswer || showWrongAnswer ? 'white' : 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '1.2rem'
                            }}
                          >
                            {String.fromCharCode(65 + index)}
                          </Box>
                          <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {option}
                          </Typography>
                          {showCorrectAnswer && <Check sx={{ fontSize: 32 }} />}
                          {showWrongAnswer && <Close sx={{ fontSize: 32 }} />}
                        </Stack>
                      </MotionPaper>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </MotionCard>
        </AnimatePresence>

        {/* Live Leaderboard */}
        <Paper elevation={4} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            🏆 Live Rankings
          </Typography>
          <List>
            {[{ name: 'You', score, avatar: '👤' }, ...opponents]
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <ListItem
                  key={player.name}
                  sx={{
                    bgcolor: player.name === 'You' ? '#E3F2FD' : 'transparent',
                    borderRadius: 2,
                    mb: 1
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      badgeContent={index + 1}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#2196F3',
                          color: 'white'
                        }
                      }}
                    >
                      <Avatar>{player.avatar}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name}
                    secondary={`${player.score} points`}
                    primaryTypographyProps={{ fontWeight: 600 }}
                  />
                  {index < 3 && (
                    <TrendingUp sx={{ color: '#4CAF50' }} />
                  )}
                </ListItem>
              ))}
          </List>
        </Paper>
      </Container>
    );
  }

  // Results Screen
  if (gameState === 'results') {
    const finalRankings = [{ name: 'You', score, avatar: '👤' }, ...opponents]
      .sort((a, b) => b.score - a.score);
    const yourRank = finalRankings.findIndex(p => p.name === 'You') + 1;
    const accuracy = Math.round((playerStats.correctAnswers / playerStats.totalAnswers) * 100);

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 6,
              textAlign: 'center',
              background: yourRank === 1
                ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
                : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              color: 'white',
              mb: 4
            }}
          >
            <MotionBox
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              <EmojiEvents sx={{ fontSize: 120, mb: 2 }} />
            </MotionBox>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
              {yourRank === 1 ? '🏆 VICTORY!' : yourRank <= 3 ? '🎉 GREAT JOB!' : '💪 KEEP LEARNING!'}
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
              {yourRank === 1 ? '1st Place!' : yourRank === 2 ? '2nd Place!' : yourRank === 3 ? '3rd Place!' : `${yourRank}th Place`}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {score} Points
            </Typography>
          </Paper>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Check sx={{ fontSize: 48, color: '#4CAF50', mb: 1 }} />
                <Typography variant="h3" fontWeight={700}>{playerStats.correctAnswers}</Typography>
                <Typography color="text.secondary">Correct Answers</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Star sx={{ fontSize: 48, color: '#FFD700', mb: 1 }} />
                <Typography variant="h3" fontWeight={700}>{accuracy}%</Typography>
                <Typography color="text.secondary">Accuracy</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Bolt sx={{ fontSize: 48, color: '#FF9800', mb: 1 }} />
                <Typography variant="h3" fontWeight={700}>{streak}</Typography>
                <Typography color="text.secondary">Best Streak</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <TrendingUp sx={{ fontSize: 48, color: '#2196F3', mb: 1 }} />
                <Typography variant="h3" fontWeight={700}>+{score}</Typography>
                <Typography color="text.secondary">XP Earned</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Final Rankings */}
          <Paper elevation={4} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
              🏅 Final Rankings
            </Typography>
            <List>
              {finalRankings.map((player, index) => (
                <ListItem
                  key={player.name}
                  sx={{
                    bgcolor: player.name === 'You'
                      ? index === 0
                        ? '#FFF9C4'
                        : '#E3F2FD'
                      : 'transparent',
                    borderRadius: 2,
                    mb: 1,
                    border: player.name === 'You' ? '2px solid #1565C0' : 'none'
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      bgcolor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#E0E0E0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      color: index < 3 ? 'white' : '#666'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 50, height: 50 }}>{player.avatar}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={player.name}
                    secondary={`${player.score} points`}
                    primaryTypographyProps={{
                      fontWeight: 700,
                      fontSize: '1.2rem'
                    }}
                    secondaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  />
                  {index === 0 && <EmojiEvents sx={{ fontSize: 40, color: '#FFD700' }} />}
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Action Buttons */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={handleStartGame}
              startIcon={<EmojiEvents />}
              sx={{
                bgcolor: '#1565C0',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Play Again
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => setGameState('lobby')}
              sx={{
                borderColor: '#1565C0',
                color: '#1565C0',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Back to Lobby
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    );
  }
};

export default QuizBattle;
