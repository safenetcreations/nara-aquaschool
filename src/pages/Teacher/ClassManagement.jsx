import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  People,
  Email,
  School,
  TrendingUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/**
 * ClassManagement Component
 * Manage classes and student enrollments
 */
const ClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Grade 10A - Marine Biology',
      grade: '10',
      section: 'A',
      students: 25,
      subject: 'Marine Biology',
      schedule: 'Mon, Wed, Fri - 9:00 AM'
    },
    {
      id: 2,
      name: 'Grade 11B - Ocean Conservation',
      grade: '11',
      section: 'B',
      students: 30,
      subject: 'Ocean Conservation',
      schedule: 'Tue, Thu - 10:30 AM'
    },
    {
      id: 3,
      name: 'Grade 9C - Freshwater Ecosystems',
      grade: '9',
      section: 'C',
      students: 28,
      subject: 'Freshwater Ecosystems',
      schedule: 'Mon, Wed - 2:00 PM'
    }
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentsDialogOpen, setStudentsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    section: '',
    subject: '',
    schedule: ''
  });

  const students = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@school.com', progress: 85, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@school.com', progress: 92, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Emma Williams', email: 'emma.w@school.com', progress: 78, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'David Kumar', email: 'david.k@school.com', progress: 88, avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Olivia Brown', email: 'olivia.b@school.com', progress: 95, avatar: 'https://i.pravatar.cc/150?img=5' }
  ];

  const handleCreateClass = () => {
    setFormData({ name: '', grade: '', section: '', subject: '', schedule: '' });
    setSelectedClass(null);
    setDialogOpen(true);
  };

  const handleEditClass = (classItem) => {
    setSelectedClass(classItem);
    setFormData({
      name: classItem.name,
      grade: classItem.grade,
      section: classItem.section,
      subject: classItem.subject,
      schedule: classItem.schedule
    });
    setDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteClass = (classId) => {
    setClasses(classes.filter(c => c.id !== classId));
    toast.success('Class deleted successfully');
    setAnchorEl(null);
  };

  const handleSaveClass = () => {
    if (selectedClass) {
      // Update existing class
      setClasses(classes.map(c => 
        c.id === selectedClass.id 
          ? { ...c, ...formData }
          : c
      ));
      toast.success('Class updated successfully');
    } else {
      // Create new class
      const newClass = {
        id: classes.length + 1,
        ...formData,
        students: 0
      };
      setClasses([...classes, newClass]);
      toast.success('Class created successfully');
    }
    setDialogOpen(false);
  };

  const handleViewStudents = (classItem) => {
    setSelectedClass(classItem);
    setStudentsDialogOpen(true);
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Class Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your classes and student enrollments
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateClass}
        >
          Create Class
        </Button>
      </Box>

      {/* Classes Grid */}
      <Grid container spacing={3}>
        {classes.map((classItem) => (
          <Grid item xs={12} md={6} lg={4} key={classItem.id}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                      <School />
                    </Avatar>
                    <IconButton
                      onClick={(e) => {
                        setSelectedClass(classItem);
                        setAnchorEl(e.currentTarget);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {classItem.name}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip label={`Grade ${classItem.grade}${classItem.section}`} size="small" color="primary" />
                    <Chip label={classItem.subject} size="small" variant="outlined" />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {classItem.schedule}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2">
                      {classItem.students} students enrolled
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleViewStudents(classItem)}
                  >
                    View Students
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Class Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleEditClass(selectedClass)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit Class
        </MenuItem>
        <MenuItem onClick={() => handleViewStudents(selectedClass)}>
          <People fontSize="small" sx={{ mr: 1 }} />
          View Students
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClass(selectedClass?.id)}>
          <Delete fontSize="small" sx={{ mr: 1 }} color="error" />
          <Typography color="error">Delete Class</Typography>
        </MenuItem>
      </Menu>

      {/* Create/Edit Class Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedClass ? 'Edit Class' : 'Create New Class'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Class Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={formData.grade}
                  label="Grade"
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                  {[6, 7, 8, 9, 10, 11, 12].map(grade => (
                    <MenuItem key={grade} value={grade.toString()}>{grade}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Section"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Schedule"
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
            placeholder="e.g., Mon, Wed, Fri - 9:00 AM"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveClass}>
            {selectedClass ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Students Dialog */}
      <Dialog
        open={studentsDialogOpen}
        onClose={() => setStudentsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedClass?.name} - Students
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Progress</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={student.avatar} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2">{student.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {student.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`${student.progress}%`}
                          size="small"
                          color={student.progress >= 90 ? 'success' : student.progress >= 70 ? 'warning' : 'error'}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <TrendingUp fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <Email fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStudentsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassManagement;
