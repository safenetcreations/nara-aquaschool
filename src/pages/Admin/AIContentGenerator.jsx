// AI Content Generator Admin Panel - Powered by Gemini 2.5 Flash
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import {
  AutoAwesome,
  Image,
  Quiz,
  School,
  Refresh,
  Save,
  Download,
  ContentCopy,
  CheckCircle,
  Language,
  Psychology
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  generateMarineSpeciesContent,
  generateImagePrompt,
  generateQuizQuestions,
  generateLessonPlan,
  generateFunFact,
  generateMultilingualContent,
  generateBatchContent
} from '../../services/geminiAIService';

const MotionCard = motion(Card);

const AIContentGenerator = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  // Species Content Generation
  const [speciesName, setSpeciesName] = useState('');
  const [language, setLanguage] = useState('en');

  // Quiz Generation
  const [quizTopic, setQuizTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');

  // Lesson Plan Generation
  const [lessonTopic, setLessonTopic] = useState('');
  const [gradeLevel, setGradeLevel] = useState('8-10');

  // Batch Generation
  const [batchSpecies, setBatchSpecies] = useState('');
  const [batchResults, setBatchResults] = useState([]);

  const handleGenerateSpeciesContent = async () => {
    if (!speciesName.trim()) {
      toast.error('Please enter a species name');
      return;
    }

    setLoading(true);
    try {
      const content = await generateMarineSpeciesContent(speciesName, language);
      setGeneratedContent(content);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMultilingual = async () => {
    if (!speciesName.trim()) {
      toast.error('Please enter a species name');
      return;
    }

    setLoading(true);
    try {
      const content = await generateMultilingualContent(speciesName);
      setGeneratedContent(content);
      toast.success('Multilingual content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImagePrompt = async () => {
    if (!speciesName.trim()) {
      toast.error('Please enter a species name');
      return;
    }

    setLoading(true);
    try {
      const prompt = await generateImagePrompt(speciesName);
      setGeneratedContent({ imagePrompt: prompt });
      toast.success('Image prompt generated!');
    } catch (error) {
      toast.error('Failed to generate image prompt: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!quizTopic.trim()) {
      toast.error('Please enter a quiz topic');
      return;
    }

    setLoading(true);
    try {
      const questions = await generateQuizQuestions(quizTopic, questionCount, difficulty);
      setGeneratedContent({ quizQuestions: questions });
      toast.success(`${questions.length} questions generated!`);
    } catch (error) {
      toast.error('Failed to generate quiz: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLessonPlan = async () => {
    if (!lessonTopic.trim()) {
      toast.error('Please enter a lesson topic');
      return;
    }

    setLoading(true);
    try {
      const lessonPlan = await generateLessonPlan(lessonTopic, gradeLevel, language);
      setGeneratedContent({ lessonPlan });
      toast.success('Lesson plan generated!');
    } catch (error) {
      toast.error('Failed to generate lesson plan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFunFact = async () => {
    if (!speciesName.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setLoading(true);
    try {
      const funFact = await generateFunFact(speciesName);
      setGeneratedContent({ funFact });
      toast.success('Fun fact generated!');
    } catch (error) {
      toast.error('Failed to generate fun fact: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBatchGenerate = async () => {
    const speciesList = batchSpecies.split('\n').filter(s => s.trim());

    if (speciesList.length === 0) {
      toast.error('Please enter species names (one per line)');
      return;
    }

    setLoading(true);
    setBatchResults([]);

    try {
      const results = await generateBatchContent(speciesList);
      setBatchResults(results);
      toast.success(`Generated content for ${results.length} species!`);
    } catch (error) {
      toast.error('Failed to generate batch content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    toast.success('Copied to clipboard!');
  };

  const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    toast.success('Downloaded!');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#1565C0', mb: 1 }}>
          <AutoAwesome sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
          AI Content Generator
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Powered by Gemini 2.5 Flash - Automatic Marine Education Content Creation
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Note:</strong> Make sure to set your REACT_APP_GEMINI_API_KEY in .env file
        </Alert>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} variant="scrollable">
          <Tab label="Species Content" icon={<Psychology />} />
          <Tab label="Image Prompts" icon={<Image />} />
          <Tab label="Quiz Questions" icon={<Quiz />} />
          <Tab label="Lesson Plans" icon={<School />} />
          <Tab label="Batch Generation" icon={<AutoAwesome />} />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            elevation={4}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Input Parameters
              </Typography>

              {/* Species Content Tab */}
              {activeTab === 0 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Species Name"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    placeholder="e.g., Blue Whale, Clownfish"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Language</InputLabel>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="si">Sinhala (සිංහල)</MenuItem>
                      <MenuItem value="ta">Tamil (தமிழ்)</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<AutoAwesome />}
                        onClick={handleGenerateSpeciesContent}
                        disabled={loading}
                      >
                        Generate Single Language
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<Language />}
                        onClick={handleGenerateMultilingual}
                        disabled={loading}
                        color="secondary"
                      >
                        Generate All 3 Languages
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AutoAwesome />}
                        onClick={handleGenerateFunFact}
                        disabled={loading}
                      >
                        Generate Fun Fact Only
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Image Prompts Tab */}
              {activeTab === 1 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Species or Scene"
                    value={speciesName}
                    onChange={(e) => setSpeciesName(e.target.value)}
                    placeholder="e.g., Dolphin jumping, Coral reef"
                    sx={{ mb: 2 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Image />}
                    onClick={handleGenerateImagePrompt}
                    disabled={loading}
                  >
                    Generate Image Prompt
                  </Button>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    Use generated prompts with DALL-E, Midjourney, or Stable Diffusion
                  </Alert>
                </Box>
              )}

              {/* Quiz Tab */}
              {activeTab === 2 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Quiz Topic"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    placeholder="e.g., Ocean Conservation, Marine Mammals"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    type="number"
                    label="Number of Questions"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                    inputProps={{ min: 1, max: 20 }}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Quiz />}
                    onClick={handleGenerateQuiz}
                    disabled={loading}
                  >
                    Generate Quiz Questions
                  </Button>
                </Box>
              )}

              {/* Lesson Plan Tab */}
              {activeTab === 3 && (
                <Box>
                  <TextField
                    fullWidth
                    label="Lesson Topic"
                    value={lessonTopic}
                    onChange={(e) => setLessonTopic(e.target.value)}
                    placeholder="e.g., Ocean Pollution, Marine Food Chains"
                    sx={{ mb: 2 }}
                  />

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Grade Level</InputLabel>
                    <Select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
                      <MenuItem value="5-7">Grades 5-7</MenuItem>
                      <MenuItem value="8-10">Grades 8-10</MenuItem>
                      <MenuItem value="11-13">Grades 11-13 (A/L)</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Language</InputLabel>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="si">Sinhala</MenuItem>
                      <MenuItem value="ta">Tamil</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<School />}
                    onClick={handleGenerateLessonPlan}
                    disabled={loading}
                  >
                    Generate Lesson Plan
                  </Button>
                </Box>
              )}

              {/* Batch Generation Tab */}
              {activeTab === 4 && (
                <Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Enter multiple species names (one per line):
                  </Typography>

                  <TextField
                    fullWidth
                    multiline
                    rows={10}
                    value={batchSpecies}
                    onChange={(e) => setBatchSpecies(e.target.value)}
                    placeholder="Blue Whale&#10;Clownfish&#10;Sea Turtle&#10;Dolphin&#10;Coral"
                    sx={{ mb: 2 }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<AutoAwesome />}
                    onClick={handleBatchGenerate}
                    disabled={loading}
                  >
                    Generate All Content
                  </Button>

                  {loading && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress />
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        Generating content for multiple species... This may take a minute.
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {loading && activeTab !== 4 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <CircularProgress />
                </Box>
              )}
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            elevation={4}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Generated Content
                </Typography>
                {generatedContent && (
                  <Box>
                    <IconButton onClick={() => copyToClipboard(generatedContent)} color="primary">
                      <ContentCopy />
                    </IconButton>
                    <IconButton onClick={() => downloadJSON(generatedContent, 'generated-content.json')} color="primary">
                      <Download />
                    </IconButton>
                  </Box>
                )}
              </Box>

              {!generatedContent && !loading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <AutoAwesome sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
                  <Typography color="text.secondary">
                    Generated content will appear here
                  </Typography>
                </Box>
              )}

              {generatedContent && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: '#f5f5f5',
                    maxHeight: '600px',
                    overflow: 'auto',
                    borderRadius: 2
                  }}
                >
                  <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
                    {JSON.stringify(generatedContent, null, 2)}
                  </pre>
                </Paper>
              )}

              {/* Batch Results */}
              {batchResults.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Batch Results ({batchResults.length} species)
                  </Typography>
                  <List>
                    {batchResults.map((result, index) => (
                      <ListItem
                        key={index}
                        sx={{ bgcolor: 'white', mb: 1, borderRadius: 1 }}
                        secondaryAction={
                          <IconButton onClick={() => downloadJSON(result, `species-${index + 1}.json`)}>
                            <Download />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={result.commonName?.en || `Species ${index + 1}`}
                          secondary={result.scientificName}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Download />}
                    onClick={() => downloadJSON(batchResults, 'batch-content-all.json')}
                    sx={{ mt: 2 }}
                  >
                    Download All as Single File
                  </Button>
                </Box>
              )}
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AIContentGenerator;
