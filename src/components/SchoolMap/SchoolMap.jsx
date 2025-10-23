// Interactive School Map Component - Shows all Sri Lankan schools on Leaflet map
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import { Box, Typography, Chip, Avatar, Button, Paper, IconButton, Tooltip } from '@mui/material';
import { School, LocationOn, People, Phone, Directions, MyLocation, ZoomIn, Explore } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  DISTRICT_COORDINATES, 
  SRI_LANKA_BOUNDS, 
  SCHOOL_TYPE_COLORS,
  getSchoolCoordinates 
} from '../../data/sriLankaCoordinates';
import { buildDirectionsUrl, buildViewUrl, logGoogleMapsStatus } from '../../config/googleMaps';

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom school marker icon generator
const createSchoolIcon = (type) => {
  const color = SCHOOL_TYPE_COLORS[type] || SCHOOL_TYPE_COLORS.default;
  
  return L.divIcon({
    className: 'custom-school-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        border: 3px solid white;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          color: white;
          font-size: 16px;
          transform: rotate(45deg);
          margin-bottom: 4px;
        ">🏫</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Map bounds updater component with focus support
const MapBoundsUpdater = ({ schools, focusSchool }) => {
  const map = useMap();
  
  useEffect(() => {
    if (focusSchool && focusSchool.coordinates) {
      // Focus on single school
      map.setView([focusSchool.coordinates.lat, focusSchool.coordinates.lng], 15, {
        animate: true,
        duration: 1
      });
    } else if (schools && schools.length > 0) {
      // Get all valid coordinates
      const validSchools = schools.filter(s => s.coordinates);
      
      if (validSchools.length === 1) {
        // Single school - zoom close
        map.setView([validSchools[0].coordinates.lat, validSchools[0].coordinates.lng], 14, {
          animate: true
        });
      } else if (validSchools.length > 0) {
        const bounds = validSchools.map(s => [s.coordinates.lat, s.coordinates.lng]);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12, animate: true });
      } else {
        // Center on Sri Lanka
        map.setView([SRI_LANKA_BOUNDS.center.lat, SRI_LANKA_BOUNDS.center.lng], 8);
      }
    }
  }, [schools, focusSchool, map]);
  
  return null;
};

// Main School Map Component
const SchoolMap = ({ schools, t, i18n, focusSchoolId = null }) => {
  const [schoolsWithCoords, setSchoolsWithCoords] = useState([]);
  const [focusSchool, setFocusSchool] = useState(null);
  const mapRef = useRef(null);

  // Add coordinates to schools
  useEffect(() => {
    if (schools && schools.length > 0) {
      console.log('🗺️ Preparing', schools.length, 'schools for map');
      
      const schoolsWithPositions = schools.map(school => {
        const coords = getSchoolCoordinates(school.district);
        return {
          ...school,
          coordinates: coords
        };
      });
      
      setSchoolsWithCoords(schoolsWithPositions);
      console.log('✅ Map ready with', schoolsWithPositions.length, 'schools');
      
      // Log Google Maps configuration status
      logGoogleMapsStatus();
    }
  }, [schools]);

  // Handle focus on specific school
  useEffect(() => {
    if (focusSchoolId && schoolsWithCoords.length > 0) {
      const school = schoolsWithCoords.find(s => s.id === focusSchoolId);
      if (school) {
        setFocusSchool(school);
        console.log('🎯 Focusing on school:', school.name);
      }
    } else {
      setFocusSchool(null);
    }
  }, [focusSchoolId, schoolsWithCoords]);

  // Get directions to school using Google Maps
  const getDirections = (school) => {
    const { lat, lng } = school.coordinates;
    const url = buildDirectionsUrl(lat, lng, school.name);
    window.open(url, '_blank');
    console.log('🧭 Opening directions to:', school.name);
  };

  // View school on Google Maps
  const viewOnGoogleMaps = (school) => {
    const { lat, lng } = school.coordinates;
    const url = buildViewUrl(lat, lng, school.name);
    window.open(url, '_blank');
    console.log('🌍 Opening Google Maps for:', school.name);
  };

  // Loading state
  if (!schoolsWithCoords || schoolsWithCoords.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <LocationOn sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading map...
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ height: 600, width: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
      <MapContainer
        ref={mapRef}
        center={[SRI_LANKA_BOUNDS.center.lat, SRI_LANKA_BOUNDS.center.lng]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        {/* Map Tiles - OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Alternative: Satellite view 
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        */}

        {/* School Markers */}
        {schoolsWithCoords.map((school) => (
          <Marker
            key={school.id}
            position={[school.coordinates.lat, school.coordinates.lng]}
            icon={createSchoolIcon(school.type)}
          >
            <Popup maxWidth={300}>
              <Box sx={{ p: 1 }}>
                {/* School Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: SCHOOL_TYPE_COLORS[school.type] || '#757575', mr: 1 }}>
                    <School />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {school.name}
                    </Typography>
                    <Chip 
                      label={school.type} 
                      size="small" 
                      sx={{ mt: 0.5 }}
                      color={school.type === 'National' ? 'primary' : 'default'}
                    />
                  </Box>
                </Box>

                {/* School Details */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn fontSize="small" />
                    {school.districtName?.[i18n.language] || school.districtName?.en || school.district}
                    {', '}
                    {school.provinceName?.[i18n.language] || school.provinceName?.en}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2">
                    <strong>Grades:</strong> {school.grades}
                  </Typography>
                </Box>

                {school.medium && school.medium.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      <strong>Medium:</strong> {school.medium.join(', ')}
                    </Typography>
                  </Box>
                )}

                {school.studentCount > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                    <People fontSize="small" color="primary" />
                    <Typography variant="body2" color="primary" fontWeight={600}>
                      {school.studentCount.toLocaleString()} students
                    </Typography>
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    fullWidth 
                    startIcon={<Directions />}
                    onClick={() => getDirections(school)}
                    color="primary"
                  >
                    Directions
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    startIcon={<Explore />}
                    onClick={() => viewOnGoogleMaps(school)}
                  >
                    View
                  </Button>
                </Box>
                
                {/* Coordinates info */}
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1, textAlign: 'center' }}>
                  📍 {school.coordinates.lat.toFixed(4)}°N, {school.coordinates.lng.toFixed(4)}°E
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Auto-fit bounds to show all schools */}
        <MapBoundsUpdater schools={schoolsWithCoords} focusSchool={focusSchool} />
      </MapContainer>

      {/* Map Legend */}
      <Paper 
        sx={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20, 
          p: 2, 
          bgcolor: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: 3,
          zIndex: 1000
        }}
      >
        <Typography variant="caption" fontWeight={700} gutterBottom display="block">
          School Types
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {Object.entries(SCHOOL_TYPE_COLORS).filter(([key]) => key !== 'default').map(([type, color]) => (
            <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: '50%', 
                  bgcolor: color,
                  border: '2px solid white',
                  boxShadow: 1
                }} 
              />
              <Typography variant="caption">{type}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default SchoolMap;
