// src/pages/CitizenScience/CitizenScience.jsx - Citizen Science data collection page
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormLabel,
  InputAdornment
} from '@mui/material';
import {
  Science,
  LocationOn,
  PhotoCamera,
  CheckCircle,
  Timer,
  Groups,
  TrendingUp,
  CloudUpload,
  Description,
  Water,
  BeachAccess,
  Visibility,
  Delete,
  Add,
  Edit,
  Map,
  Assessment,
  EmojiEvents,
  Warning,
  Info,
  CalendarToday,
  AccessTime
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  getActiveProjects,
  submitData,
  getUserSubmissions,
  PROTOCOLS,
  PROJECT_TYPES
} from '../../services/citizenScienceService';
import { addPoints } from '../../services/gamificationService';
import toast from 'react-hot-toast';

const CitizenScience = () => {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState([]);
  const [userSubmissions, setUserSubmissions] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [dataDialogOpen, setDataDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  const [protocolDialogOpen, setProtocolDialogOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);

  useEffect(() => {
    loadProjects();
    loadUserSubmissions();
    getCurrentLocation();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const projects = await getActiveProjects();
      
      // If no projects, use mock data
      if (!projects.length) {
        setActiveProjects(generateMockProjects());
      } else {
        setActiveProjects(projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setActiveProjects(generateMockProjects());
    } finally {
      setLoading(false);
    }
  };

  const generateMockProjects = () => {
    return Object.entries(PROJECT_TYPES).map(([key, value]) => ({
      id: value,
      name: PROTOCOLS[value]?.name || value.replace('_', ' '),
      description: PROTOCOLS[value]?.description || '',
      icon: getProjectIcon(value),
      participantCount: Math.floor(Math.random() * 500) + 50,
      dataPoints: Math.floor(Math.random() * 1000) + 100,
      status: 'active',
      priority: Math.floor(Math.random() * 5) + 1
    }));
  };

  const loadUserSubmissions = async () => {
    try {
      const submissions = await getUserSubmissions('current-user-id');
      setUserSubmissions(submissions);
    } catch (error) {
      console.error('Error loading submissions:', error);
      setUserSubmissions(generateMockSubmissions());
    }
  };

  const generateMockSubmissions = () => {
    return [
      {
        id: '1',
        projectId: 'beach_monitoring',
        projectName: 'Beach Health Assessment',
        submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'validated',
        points: 100
      },
      {
        id: '2',
        projectId: 'water_quality',
        projectName: 'Water Quality Testing',
        submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'pending_review',
        points: 75
      }
    ];
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const getProjectIcon = (projectType) => {
    const icons = {
      beach_monitoring: <BeachAccess />,
      water_quality: <Water />,
      species_observation: <Visibility />,
      coral_health: '🪸',
      mangrove_assessment: '🌿',
      plastic_pollution: '♻️',
      turtle_nesting: '🐢',
      bird_count: '🦜',
      fish_survey: '🐠'
    };
    return icons[projectType] || <Science />;
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    const protocol = PROTOCOLS[project.id];
    setSelectedProtocol(protocol);
    setDataDialogOpen(true);
    setActiveStep(0);
    setFormData({});
    setPhotos([]);
  };

  const handleDataSubmit = async () => {
    setSubmitting(true);
    try {
      // Validate required fields
      const protocol = PROTOCOLS[selectedProject.id];
      const requiredFields = protocol.dataFields.filter(f => f.required);
      
      for (const field of requiredFields) {
        if (!formData[field.id]) {
          toast.error(`Please fill in ${field.label}`);
          setSubmitting(false);
          return;
        }
      }
      
      // Submit data
      const result = await submitData(
        'current-user-id',
        selectedProject.id,
        {
          ...formData,
          location
        },
        photos
      );
      
      if (result.success) {
        toast.success(`Data submitted! +${result.points} points earned!`);
        setDataDialogOpen(false);
        loadUserSubmissions();
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Failed to submit data');
    } finally {
      setSubmitting(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 10,
    onDrop: (acceptedFiles) => {
      setPhotos([...photos, ...acceptedFiles]);
    }
  });

  const renderDataField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            required={field.required}
            helperText={field.helperText}
          />
        );
        
      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            required={field.required}
            InputProps={{
              inputProps: {
                min: field.min,
                max: field.max,
                step: field.step
              }
            }}
          />
        );
        
      case 'select':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={formData[field.id] || ''}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            >
              {field.options?.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
        
      case 'multiselect':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              multiple
              value={formData[field.id] || []}
              onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {field.options?.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
        
      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={field.label}
              value={formData[field.id] || null}
              onChange={(newValue) => setFormData({ ...formData, [field.id]: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth required={field.required} />}
            />
          </LocalizationProvider>
        );
        
      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={field.label}
              value={formData[field.id] || null}
              onChange={(newValue) => setFormData({ ...formData, [field.id]: newValue })}
              renderInput={(params) => <TextField {...params} fullWidth required={field.required} />}
            />
          </LocalizationProvider>
        );
        
      case 'location':
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              {field.label}
            </Typography>
            {location ? (
              <Paper sx={{ p: 2 }}>
                <Typography variant="body2">
                  Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                </Typography>
                <Button
                  size="small"
                  startIcon={<LocationOn />}
                  onClick={getCurrentLocation}
                  sx={{ mt: 1 }}
                >
                  Update Location
                </Button>
              </Paper>
            ) : (
              <Button
                variant="outlined"
                startIcon={<LocationOn />}
                onClick={getCurrentLocation}
              >
                Get Current Location
              </Button>
            )}
          </Box>
        );
        
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={field.label}
            value={formData[field.id] || ''}
            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
            required={field.required}
          />
        );
        
      case 'photos':
        return (
          <Box>
            <Typography variant="body2" gutterBottom>
              {field.label}
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #ccc',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f5f5f5' }
              }}
            >
              <input {...getInputProps()} />
              <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
              <Typography variant="body2">
                Drag & drop photos here, or click to select
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {field.min && `Minimum ${field.min} photos`}
                {field.max && ` • Maximum ${field.max} photos`}
              </Typography>
            </Box>
            {photos.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" gutterBottom>
                  {photos.length} photo(s) selected
                </Typography>
                <Grid container spacing={1}>
                  {photos.map((photo, index) => (
                    <Grid item xs={4} key={index}>
                      <Paper
                        sx={{
                          position: 'relative',
                          paddingTop: '100%',
                          backgroundImage: `url(${URL.createObjectURL(photo)})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(255,255,255,0.8)'
                          }}
                          onClick={() => setPhotos(photos.filter((_, i) => i !== index))}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Box>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #00a86b 0%, #006994 100%)',
          color: 'white',
          py: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Citizen Science
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Contribute to real marine research and conservation
            </Typography>
            
            {/* Stats */}
            <Grid container spacing={3}>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {activeProjects.length}
                  </Typography>
                  <Typography variant="body2">Active Projects</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Typography variant="h4" fontWeight={700}>
                    2,456
                  </Typography>
                  <Typography variant="body2">Contributors</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Typography variant="h4" fontWeight={700}>
                    12,345
                  </Typography>
                  <Typography variant="body2">Data Points</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={3}>
                <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  <Typography variant="h4" fontWeight={700}>
                    {userSubmissions.length}
                  </Typography>
                  <Typography variant="body2">Your Contributions</Typography>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            variant="fullWidth"
          >
            <Tab label="Active Projects" icon={<Science />} />
            <Tab label="My Contributions" icon={<Assessment />} />
            <Tab label="Protocols" icon={<Description />} />
            <Tab label="Impact" icon={<TrendingUp />} />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            {activeProjects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                >
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {getProjectIcon(project.id)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {project.name}
                          </Typography>
                          <Chip
                            size="small"
                            label="Active"
                            color="success"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Contributors
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            <Groups sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                            {project.participantCount}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Data Points
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            <Assessment sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                            {project.dataPoints}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <LinearProgress
                        variant="determinate"
                        value={Math.random() * 100}
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Monthly goal: 65% complete
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleProjectSelect(project)}
                      >
                        Contribute Data
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Your Recent Contributions
                </Typography>
                <List>
                  {userSubmissions.length > 0 ? userSubmissions.map(submission => (
                    <ListItem key={submission.id} divider>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: submission.status === 'validated' ? 'success.main' : 'warning.main' }}>
                          {submission.status === 'validated' ? <CheckCircle /> : <Timer />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={submission.projectName}
                        secondary={
                          <>
                            Submitted: {submission.submittedAt?.toLocaleDateString()}
                            {' • '}
                            Status: {submission.status.replace('_', ' ')}
                            {submission.points && ` • ${submission.points} points`}
                          </>
                        }
                      />
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    </ListItem>
                  )) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Science sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary">
                        No contributions yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Start contributing to citizen science projects
                      </Typography>
                      <Button variant="contained" onClick={() => setTabValue(0)}>
                        View Projects
                      </Button>
                    </Box>
                  )}
                </List>
              </Paper>
            </Grid>
            
            {userSubmissions.length > 0 && (
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Your Impact
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEvents color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total Points Earned"
                        secondary="450 points"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Badge color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Badges Earned"
                        secondary="Beach Guardian • Water Tester"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <TrendingUp color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Contribution Rank"
                        secondary="#23 in your school"
                      />
                    </ListItem>
                  </List>
                </Paper>
              </Grid>
            )}
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={3}>
            {Object.entries(PROTOCOLS).map(([key, protocol]) => (
              <Grid item xs={12} md={6} key={key}>
                <Paper sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                      {getProjectIcon(key)}
                    </Avatar>
                    <Typography variant="h6" fontWeight={600}>
                      {protocol.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {protocol.description}
                  </Typography>
                  
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Requirements:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Tools Needed"
                        secondary={protocol.requirements.tools.join(', ')}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Skills Required"
                        secondary={protocol.requirements.skills.join(', ')}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Minimum Age"
                        secondary={`${protocol.requirements.minAge} years`}
                      />
                    </ListItem>
                  </List>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSelectedProtocol(protocol);
                        setProtocolDialogOpen(true);
                      }}
                    >
                      View Protocol
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleProjectSelect({ id: key, name: protocol.name })}
                    >
                      Start Collection
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 3 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Collective Impact
                </Typography>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Your contributions are helping NARA scientists understand and protect Sri Lanka's aquatic resources
                </Alert>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Recent Discoveries
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="New coral species identified"
                          secondary="Thanks to 234 observations from citizen scientists"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Plastic pollution hotspots mapped"
                          secondary="Using data from 1,234 beach surveys"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Turtle nesting sites protected"
                          secondary="Based on 567 nesting observations"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Research Publications
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Description />
                        </ListItemIcon>
                        <ListItemText
                          primary="Coastal Erosion Patterns in Sri Lanka"
                          secondary="Published using citizen science data"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Description />
                        </ListItemIcon>
                        <ListItemText
                          primary="Microplastic Distribution Study"
                          secondary="Citizen scientists acknowledged"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Data Collection Dialog */}
      <Dialog
        open={dataDialogOpen}
        onClose={() => setDataDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProject?.name} - Data Collection
        </DialogTitle>
        <DialogContent>
          {selectedProtocol && (
            <Stepper activeStep={activeStep} orientation="vertical">
              {selectedProtocol.dataFields
                .reduce((acc, field, index) => {
                  const stepIndex = Math.floor(index / 3);
                  if (!acc[stepIndex]) acc[stepIndex] = [];
                  acc[stepIndex].push(field);
                  return acc;
                }, [])
                .map((fields, index) => (
                  <Step key={index}>
                    <StepLabel>
                      Step {index + 1}
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {fields.map(field => (
                          <Box key={field.id}>
                            {renderDataField(field)}
                          </Box>
                        ))}
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={() => setActiveStep(index + 1)}
                          disabled={index === Math.ceil(selectedProtocol.dataFields.length / 3) - 1}
                        >
                          Continue
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={() => setActiveStep(index - 1)}
                          sx={{ ml: 1 }}
                        >
                          Back
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
            </Stepper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDataDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDataSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Data'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Protocol Details Dialog */}
      <Dialog
        open={protocolDialogOpen}
        onClose={() => setProtocolDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedProtocol?.name} - Protocol Details
        </DialogTitle>
        <DialogContent>
          {selectedProtocol && (
            <Box>
              <Typography variant="body1" paragraph>
                {selectedProtocol.description}
              </Typography>
              
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Data Fields
              </Typography>
              <List>
                {selectedProtocol.dataFields.map(field => (
                  <ListItem key={field.id}>
                    <ListItemText
                      primary={field.label}
                      secondary={`Type: ${field.type} ${field.required ? '(Required)' : '(Optional)'}`}
                    />
                  </ListItem>
                ))}
              </List>
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Points:</strong> {selectedProtocol.points} points per submission
                </Typography>
                {selectedProtocol.badge && (
                  <Typography variant="body2">
                    <strong>Badge:</strong> Earn the {selectedProtocol.badge} badge
                  </Typography>
                )}
              </Alert>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProtocolDialogOpen(false)}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setProtocolDialogOpen(false);
              handleProjectSelect({
                id: selectedProtocol.id,
                name: selectedProtocol.name
              });
            }}
          >
            Start Data Collection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitizenScience;
