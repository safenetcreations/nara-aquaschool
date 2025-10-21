import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Assignment,
  Quiz,
  VideoLibrary,
  Description,
  Schedule,
  Visibility
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * LessonPlans Component
 * Create and manage lesson plans and assignments
 */
const LessonPlans = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'assignment',
    class: '',
    dueDate: '',
    description: '',
    points: 100
  });

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Marine Biodiversity Report',
      type: 'assignment',
      class: 'Grade 10A',
      dueDate: '2024-03-20',
      status: 'active',
      submissions: 18,
      total: 25,
      points: 100
    },
    {
      id: 2,
      title: 'Ocean Conservation Quiz',
      type: 'quiz',
      class: 'Grade 11B',
      dueDate: '2024-03-22',
      status: 'active',
      submissions: 22,
      total: 30,
      points: 50
    },
    {
      id: 3,
      title: 'Coral Reef Ecosystem Video',
      type: 'video',
      class: 'Grade 9C',
      dueDate: '2024-03-25',
      status: 'draft',
      submissions: 0,
      total: 28,
      points: 75
    },
    {
      id: 4,
      title: 'Freshwater Species Research',
      type: 'assignment',
      class: 'Grade 10A',
      dueDate: '2024-03-18',
      status: 'completed',
      submissions: 25,
      total: 25,
      points: 100
    }
  ]);

  const handleCreateLesson = () => {
    setSelectedLesson(null);
    setFormData({
      title: '',
      type: 'assignment',
      class: '',
      dueDate: '',
      description: '',
      points: 100
    });
    setDialogOpen(true);
  };

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson);
    setFormData({
      title: lesson.title,
      type: lesson.type,
      class: lesson.class,
      dueDate: lesson.dueDate,
      description: lesson.description || '',
      points: lesson.points
    });
    setDialogOpen(true);
  };

  const handleDeleteLesson = (lessonId) => {
    setLessons(lessons.filter(l => l.id !== lessonId));
    toast.success('Lesson deleted successfully');
  };

  const handleSaveLesson = () => {
    if (selectedLesson) {
      setLessons(lessons.map(l =>
        l.id === selectedLesson.id
          ? { ...l, ...formData }
          : l
      ));
      toast.success('Lesson updated successfully');
    } else {
      const newLesson = {
        id: lessons.length + 1,
        ...formData,
        status: 'draft',
        submissions: 0,
        total: 0
      };
      setLessons([...lessons, newLesson]);
      toast.success('Lesson created successfully');
    }
    setDialogOpen(false);
  };

  const filterLessons = () => {
    switch (activeTab) {
      case 0: // All
        return lessons;
      case 1: // Active
        return lessons.filter(l => l.status === 'active');
      case 2: // Draft
        return lessons.filter(l => l.status === 'draft');
      case 3: // Completed
        return lessons.filter(l => l.status === 'completed');
      default:
        return lessons;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'assignment':
        return <Assignment />;
      case 'quiz':
        return <Quiz />;
      case 'video':
        return <VideoLibrary />;
      default:
        return <Description />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'assignment':
        return 'primary';
      case 'quiz':
        return 'secondary';
      case 'video':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Lesson Plans & Assignments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage your lesson plans and assignments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateLesson}
        >
          Create Lesson
        </Button>
      </Box>

      {/* Filter Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="All Lessons" />
          <Tab label="Active" />
          <Tab label="Draft" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      {/* Lessons Grid */}
      <Grid container spacing={3}>
        {filterLessons().map((lesson) => (
          <Grid item xs={12} md={6} key={lesson.id}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                      <Box
                        sx={{
                          bgcolor: 'primary.light',
                          p: 1,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {getTypeIcon(lesson.type)}
                      </Box>
                      <Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                          {lesson.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                          <Chip
                            label={lesson.type}
                            size="small"
                            color={getTypeColor(lesson.type)}
                          />
                          <Chip
                            label={lesson.status}
                            size="small"
                            color={getStatusColor(lesson.status)}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditLesson(lesson)}>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteLesson(lesson.id)}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Class"
                        secondary={lesson.class}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Due Date"
                        secondary={new Date(lesson.dueDate).toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Submissions"
                        secondary={`${lesson.submissions}/${lesson.total}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Points"
                        secondary={lesson.points}
                      />
                    </ListItem>
                  </List>

                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Visibility />}
                    >
                      View Details
                    </Button>
                    {lesson.status === 'draft' && (
                      <Button
                        fullWidth
                        variant="contained"
                      >
                        Publish
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filterLessons().length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No lessons found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first lesson to get started
          </Typography>
        </Box>
      )}

      {/* Create/Edit Lesson Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedLesson ? 'Edit Lesson' : 'Create New Lesson'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Lesson Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <MenuItem value="assignment">Assignment</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                  <MenuItem value="video">Video Lesson</MenuItem>
                  <MenuItem value="reading">Reading Material</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={formData.class}
                  label="Class"
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                >
                  <MenuItem value="Grade 10A">Grade 10A</MenuItem>
                  <MenuItem value="Grade 11B">Grade 11B</MenuItem>
                  <MenuItem value="Grade 9C">Grade 9C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Points"
                type="number"
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveLesson}>
            {selectedLesson ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LessonPlans;
