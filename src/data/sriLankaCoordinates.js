// Sri Lankan District Coordinates for Interactive Map
// GPS coordinates of major cities in each district

export const DISTRICT_COORDINATES = {
  // Western Province
  'COL': { lat: 6.9271, lng: 79.8612, name: 'Colombo' },
  'GAM': { lat: 7.0840, lng: 80.0098, name: 'Gampaha' },
  'KAL': { lat: 6.5854, lng: 79.9607, name: 'Kalutara' },
  
  // Central Province
  'KAN': { lat: 7.2906, lng: 80.6337, name: 'Kandy' },
  'MAT': { lat: 7.4675, lng: 80.6234, name: 'Matale' },
  'NUE': { lat: 6.9497, lng: 80.7891, name: 'Nuwara Eliya' },
  
  // Southern Province
  'GAL': { lat: 6.0535, lng: 80.2210, name: 'Galle' },
  'MAT': { lat: 5.9485, lng: 80.5353, name: 'Matara' },
  'HAM': { lat: 6.1429, lng: 81.1212, name: 'Hambantota' },
  
  // Northern Province
  'JAF': { lat: 9.6615, lng: 80.0255, name: 'Jaffna' },
  'KIL': { lat: 9.5967, lng: 80.4236, name: 'Kilinochchi' },
  'MAN': { lat: 8.9806, lng: 80.4133, name: 'Mannar' },
  'MUL': { lat: 9.2683, lng: 80.8139, name: 'Mullaitivu' },
  'VAV': { lat: 8.7542, lng: 80.4982, name: 'Vavuniya' },
  
  // Eastern Province
  'TRI': { lat: 8.5874, lng: 81.2152, name: 'Trincomalee' },
  'BAT': { lat: 7.7307, lng: 81.7008, name: 'Batticaloa' },
  'AMP': { lat: 7.2906, lng: 81.8681, name: 'Ampara' },
  
  // North Western Province
  'KUR': { lat: 7.4818, lng: 80.3609, name: 'Kurunegala' },
  'PUT': { lat: 8.0362, lng: 79.8283, name: 'Puttalam' },
  
  // North Central Province
  'ANU': { lat: 8.3114, lng: 80.4037, name: 'Anuradhapura' },
  'POL': { lat: 7.9403, lng: 81.0188, name: 'Polonnaruwa' },
  
  // Uva Province
  'BAD': { lat: 6.9895, lng: 81.0557, name: 'Badulla' },
  'MON': { lat: 6.8773, lng: 81.2683, name: 'Monaragala' },
  
  // Sabaragamuwa Province
  'RAT': { lat: 6.7056, lng: 80.3847, name: 'Ratnapura' },
  'KEG': { lat: 6.9397, lng: 80.3397, name: 'Kegalle' }
};

// Province center coordinates
export const PROVINCE_COORDINATES = {
  'WP': { lat: 6.9271, lng: 79.8612, name: 'Western Province' },
  'CP': { lat: 7.2906, lng: 80.6337, name: 'Central Province' },
  'SP': { lat: 6.0535, lng: 80.2210, name: 'Southern Province' },
  'NP': { lat: 9.6615, lng: 80.0255, name: 'Northern Province' },
  'EP': { lat: 8.5874, lng: 81.2152, name: 'Eastern Province' },
  'NWP': { lat: 7.4818, lng: 80.3609, name: 'North Western Province' },
  'NCP': { lat: 8.3114, lng: 80.4037, name: 'North Central Province' },
  'UP': { lat: 6.9895, lng: 81.0557, name: 'Uva Province' },
  'SGP': { lat: 6.7056, lng: 80.3847, name: 'Sabaragamuwa Province' }
};

// Sri Lanka country bounds
export const SRI_LANKA_BOUNDS = {
  north: 9.8350,
  south: 5.9168,
  east: 81.8812,
  west: 79.6951,
  center: { lat: 7.8731, lng: 80.7718 }
};

// School type colors for map markers
export const SCHOOL_TYPE_COLORS = {
  'National': '#1976d2',     // Blue
  '1AB': '#2e7d32',          // Green
  '1C': '#ed6c02',           // Orange
  'Private': '#9c27b0',      // Purple
  'default': '#757575'       // Grey
};

// Generate random offset for schools in same district (to prevent overlap)
export const getSchoolCoordinates = (district) => {
  const base = DISTRICT_COORDINATES[district];
  if (!base) {
    // Default to Sri Lanka center if district not found
    return { ...SRI_LANKA_BOUNDS.center };
  }
  
  // Add small random offset (±0.02 degrees, ~2km)
  return {
    lat: base.lat + (Math.random() - 0.5) * 0.04,
    lng: base.lng + (Math.random() - 0.5) * 0.04
  };
};

export default {
  DISTRICT_COORDINATES,
  PROVINCE_COORDINATES,
  SRI_LANKA_BOUNDS,
  SCHOOL_TYPE_COLORS,
  getSchoolCoordinates
};
