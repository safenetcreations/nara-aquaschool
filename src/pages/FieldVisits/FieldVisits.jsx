import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  People,
  AccessTime,
  Info,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * FieldVisits Component
 * Browse and book field visits to NARA facilities
 */
const FieldVisits = () => {
  const navigate = useNavigate();
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    school: '',
    grade: '',
    students: '',
    date: '',
    time: ''
  });

  const visits = [
    {
      id: 1,
      title: 'Marine Research Laboratory Tour',
      location: 'NARA Headquarters, Colombo',
      description: 'Explore our marine research facilities and meet our scientists',
      duration: '2 hours',
      capacity: '30 students',
      ages: 'Grade 8-12',
      image: 'https://source.unsplash.com/800x600/?laboratory,marine',
      highlights: ['Lab equipment demonstration', 'Meet marine biologists', 'Specimen examination']
    },
    {
      id: 2,
      title: 'Coastal Ecosystem Field Study',
      location: 'Hikkaduwa Marine Sanctuary',
      description: 'Hands-on study of coral reefs, mangroves, and marine life',
      duration: '4 hours',
      capacity: '25 students',
      ages: 'Grade 9-12',
      image: 'https://source.unsplash.com/800x600/?reef,coral',
      highlights: ['Snorkeling experience', 'Species identification', 'Water quality testing']
    },
    {
      id: 3,
      title: 'Turtle Conservation Center',
      location: 'Kosgoda Turtle Hatchery',
      description: 'Learn about sea turtle conservation and rehabilitation',
      duration: '3 hours',
      capacity: '40 students',
      ages: 'Grade 5-10',
      image: 'https://source.unsplash.com/800x600/?turtle,sea',
      highlights: ['Baby turtle feeding', 'Conservation projects', 'Beach monitoring']
    },
    {
      id: 4,
      title: 'Aquaculture Research Station',
      location: 'Negombo Lagoon',
      description: 'Discover sustainable fish farming and aquaculture techniques',
      duration: '3 hours',
      capacity: '35 students',
      ages: 'Grade 10-12',
      image: 'https://source.unsplash.com/800x600/?fish,farm',
      highlights: ['Fish breeding demonstration', 'Feed preparation', 'Water management']
    },
    {
      id: 5,
      title: 'Ocean Data Collection Workshop',
      location: 'Trincomalee Research Center',
      description: 'Learn how scientists collect and analyze ocean data',
      duration: '2.5 hours',
      capacity: '20 students',
      ages: 'Grade 11-12',
      image: 'https://source.unsplash.com/800x600/?ocean,research',
      highlights: ['Real-time data monitoring', 'Research methods', 'Data analysis']
    },
    {
      id: 6,
      title: 'Mangrove Restoration Project',
      location: 'Puttalam Lagoon',
      description: 'Participate in mangrove planting and ecosystem restoration',
      duration: '3 hours',
      capacity: '30 students',
      ages: 'Grade 7-12',
      image: 'https://source.unsplash.com/800x600/?mangrove,lagoon',
      highlights: ['Tree planting', 'Ecosystem learning', 'Conservation action']
    }
  ];

  const handleBookVisit = (visit) => {
    setSelectedVisit(visit);
    setBookingModal(true);
  };

  const handleSubmitBooking = () => {
    // TODO: Submit to Firebase
    console.log('Booking submitted:', bookingForm, selectedVisit);
    setBookingModal(false);
    // Show success message or navigate to confirmation
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <LocationOn sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Field Visits
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Book educational field visits to NARA facilities and research centers
          </Typography>
        </Box>

        {/* Info Banner */}
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 4,
            borderRadius: 3,
            backgroundColor: '#e3f2fd'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Info color="primary" />
                <Typography variant="body2" fontWeight="bold">Free for Schools</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color="success" />
                <Typography variant="body2" fontWeight="bold">Expert Guides</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <People color="secondary" />
                <Typography variant="body2" fontWeight="bold">Group Discounts</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="warning" />
                <Typography variant="body2" fontWeight="bold">Book in Advance</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Visits Grid */}
        <Grid container spacing={3}>
          {visits.map((visit) => (
            <Grid item xs={12} md={6} key={visit.id}>
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
                <CardMedia
                  component="img"
                  height="200"
                  image={visit.image}
                  alt={visit.title}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {visit.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {visit.location}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {visit.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginY: 2 }}>
                    <Chip
                      icon={<AccessTime />}
                      label={visit.duration}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      icon={<People />}
                      label={visit.capacity}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={visit.ages}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body2" fontWeight="bold" gutterBottom>
                    Highlights:
                  </Typography>
                  <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                    {visit.highlights.map((highlight, index) => (
                      <Typography component="li" key={index} variant="body2" color="text.secondary">
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>

                <Box sx={{ padding: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleBookVisit(visit)}
                    sx={{ fontWeight: 'bold' }}
                  >
                    Book This Visit
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Booking Modal */}
        <Dialog
          open={bookingModal}
          onClose={() => setBookingModal(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h6" fontWeight="bold">
              Book Field Visit
            </Typography>
            {selectedVisit && (
              <Typography variant="body2" color="text.secondary">
                {selectedVisit.title}
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
              <TextField
                label="Contact Name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="School Name"
                value={bookingForm.school}
                onChange={(e) => setBookingForm({ ...bookingForm, school: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Grade"
                select
                value={bookingForm.grade}
                onChange={(e) => setBookingForm({ ...bookingForm, grade: e.target.value })}
                fullWidth
                required
              >
                {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    Grade {grade}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Number of Students"
                type="number"
                value={bookingForm.students}
                onChange={(e) => setBookingForm({ ...bookingForm, students: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Preferred Date"
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
              <TextField
                label="Preferred Time"
                select
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                fullWidth
                required
              >
                <MenuItem value="morning">Morning (9:00 AM - 12:00 PM)</MenuItem>
                <MenuItem value="afternoon">Afternoon (1:00 PM - 4:00 PM)</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingModal(false)}>Cancel</Button>
            <Button onClick={handleSubmitBooking} variant="contained">
              Submit Booking
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default FieldVisits;
