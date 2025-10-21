import React from 'react';
import { Box, Container, Grid, Paper, Typography, Card, CardContent, LinearProgress, Chip } from '@mui/material';
import { ThermostatAuto, Waves, Speed, Opacity, Air, WbSunny } from '@mui/icons-material';

const LiveOceanData = () => {
  const stations = [
    { name: 'Colombo Harbor', temp: 28.5, salinity: 34.2, ph: 8.1, waveHeight: 1.2, status: 'online' },
    { name: 'Trincomalee Bay', temp: 29.1, salinity: 33.8, ph: 8.2, waveHeight: 0.8, status: 'online' },
    { name: 'Galle Coast', temp: 27.9, salinity: 34.5, ph: 8.0, waveHeight: 1.5, status: 'online' },
    { name: 'Jaffna Peninsula', temp: 30.2, salinity: 33.5, ph: 8.3, waveHeight: 0.6, status: 'maintenance' }
  ];

  const weatherData = {
    windSpeed: 12.5,
    windDirection: 'SW',
    airTemp: 32.1,
    humidity: 78,
    pressure: 1012,
    visibility: 10
  };

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh', paddingY: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ marginBottom: 4, padding: 4, background: 'linear-gradient(135deg, #43a047 0%, #388e3c 100%)', borderRadius: 3, color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            <Waves sx={{ fontSize: 40, verticalAlign: 'middle', marginRight: 2 }} />
            Live Ocean Data
          </Typography>
          <Typography variant="h6">Real-time monitoring of Sri Lanka's coastal waters</Typography>
          <Chip label="Updated: 2 minutes ago" sx={{ marginTop: 2, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
        </Box>

        {/* Weather Conditions */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>Current Weather Conditions</Typography>
        <Grid container spacing={3} sx={{ marginBottom: 4 }}>
          <Grid item xs={6} md={2}><DataCard icon={<Air />} label="Wind Speed" value={`${weatherData.windSpeed} km/h`} color="info" /></Grid>
          <Grid item xs={6} md={2}><DataCard icon={<ThermostatAuto />} label="Air Temp" value={`${weatherData.airTemp}°C`} color="error" /></Grid>
          <Grid item xs={6} md={2}><DataCard icon={<Opacity />} label="Humidity" value={`${weatherData.humidity}%`} color="primary" /></Grid>
          <Grid item xs={6} md={2}><DataCard icon={<Speed />} label="Pressure" value={`${weatherData.pressure} hPa`} color="secondary" /></Grid>
          <Grid item xs={6} md={2}><DataCard icon={<WbSunny />} label="Visibility" value={`${weatherData.visibility} km`} color="warning" /></Grid>
          <Grid item xs={6} md={2}><DataCard icon={<Air />} label="Direction" value={weatherData.windDirection} color="success" /></Grid>
        </Grid>

        {/* Monitoring Stations */}
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ marginBottom: 2 }}>Coastal Monitoring Stations</Typography>
        <Grid container spacing={3}>
          {stations.map((station, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <Typography variant="h6" fontWeight="bold">{station.name}</Typography>
                    <Chip label={station.status} color={station.status === 'online' ? 'success' : 'warning'} size="small" />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Temperature</Typography>
                      <Typography variant="h6" color="error.main">{station.temp}°C</Typography>
                      <LinearProgress variant="determinate" value={(station.temp / 35) * 100} sx={{ marginTop: 1 }} color="error" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Salinity</Typography>
                      <Typography variant="h6" color="primary.main">{station.salinity} ppt</Typography>
                      <LinearProgress variant="determinate" value={(station.salinity / 40) * 100} sx={{ marginTop: 1 }} color="primary" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">pH Level</Typography>
                      <Typography variant="h6" color="success.main">{station.ph}</Typography>
                      <LinearProgress variant="determinate" value={((station.ph - 7) / 2) * 100} sx={{ marginTop: 1 }} color="success" />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">Wave Height</Typography>
                      <Typography variant="h6" color="info.main">{station.waveHeight}m</Typography>
                      <LinearProgress variant="determinate" value={(station.waveHeight / 3) * 100} sx={{ marginTop: 1 }} color="info" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={3} sx={{ padding: 3, marginTop: 4, borderRadius: 3, backgroundColor: '#e8f5e9' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>📊 About This Data</Typography>
          <Typography variant="body2">
            NARA operates a network of automated monitoring buoys that collect real-time oceanographic data 24/7.
            This data helps scientists track ocean health, predict weather patterns, and protect marine ecosystems.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

const DataCard = ({ icon, label, value, color }) => (
  <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 3 }}>
    {React.cloneElement(icon, { sx: { fontSize: 40, color: `${color}.main`, marginBottom: 1 } })}
    <Typography variant="h6" fontWeight="bold">{value}</Typography>
    <Typography variant="caption" color="text.secondary">{label}</Typography>
  </Paper>
);

export default LiveOceanData;
