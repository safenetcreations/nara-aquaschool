import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import { Science, Work, School, Article, PersonAdd } from '@mui/icons-material';

const NARAInAction = () => {
  const researchAreas = [
    { title: 'Marine Biodiversity', projects: 12, icon: '🐠' },
    { title: 'Climate Change Impact', projects: 8, icon: '🌡️' },
    { title: 'Sustainable Fisheries', projects: 15, icon: '🎣' },
    { title: 'Coastal Conservation', projects: 10, icon: '🏖️' }
  ];

  const careers = [
    { title: 'Marine Biologist', education: 'BSc in Marine Biology', salary: 'LKR 80K-150K' },
    { title: 'Oceanographer', education: 'BSc in Oceanography', salary: 'LKR 90K-180K' },
    { title: 'Fisheries Officer', education: 'BSc in Fisheries Science', salary: 'LKR 70K-130K' },
    { title: 'Research Scientist', education: 'PhD in Marine Sciences', salary: 'LKR 120K-250K' }
  ];

  const scientists = [
    { name: 'Dr. Arjuna Athukorala', field: 'Marine Biology', achievement: 'Discovered 5 new species' },
    { name: 'Dr. Shalini Fernando', field: 'Oceanography', achievement: 'Climate research pioneer' },
    { name: 'Dr. Kasun Perera', field: 'Fisheries', achievement: 'Sustainable practices advocate' }
  ];

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 4, padding: 4, background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)', borderRadius: 3, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Science sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            NARA in Action
          </Typography>
          <Typography variant="h6">Discover cutting-edge research and exciting careers in marine science</Typography>
        </Box>

        {/* Research Areas */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>Research Focus Areas</Typography>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {researchAreas.map((area, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={3} sx={{ textAlign: 'center', padding: 3, borderRadius: 3 }}>
                <Typography variant="h2">{area.icon}</Typography>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{area.title}</Typography>
                <Chip label={`${area.projects} projects`} color="primary" size="small" />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Careers */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>Career Opportunities</Typography>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          {careers.map((career, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Work color="primary" sx={{ fontSize: 40 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{career.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{career.education}</Typography>
                    <Chip label={career.salary} color="success" size="small" sx={{ marginTop: 1 }} />
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Scientists */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>Meet Our Scientists</Typography>
        <Grid container spacing={3}>
          {scientists.map((scientist, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card elevation={3} sx={{ padding: 3, textAlign: 'center', borderRadius: 3 }}>
                <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px', backgroundColor: 'primary.main', fontSize: '2rem' }}>
                  {scientist.name.charAt(3)}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">{scientist.name}</Typography>
                <Typography variant="body2" color="primary" gutterBottom>{scientist.field}</Typography>
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body2" color="text.secondary">🏆 {scientist.achievement}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ padding: 4, marginTop: 4, textAlign: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>Join NARA's Research Community!</Typography>
          <Typography variant="body1" paragraph>Internships, scholarships, and research opportunities available for students</Typography>
          <Button variant="contained" size="large" startIcon={<PersonAdd />}>Apply Now</Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NARAInAction;
