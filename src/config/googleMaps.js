// Google Maps Configuration
// Securely access Google Maps API key from environment variables

/**
 * Get Google Maps API Key
 * @returns {string} API key from environment variables
 */
export const getGoogleMapsApiKey = () => {
  return process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
};

/**
 * Check if Google Maps API key is configured
 * @returns {boolean} True if API key exists
 */
export const isGoogleMapsConfigured = () => {
  const apiKey = getGoogleMapsApiKey();
  return apiKey && apiKey.length > 0 && apiKey !== 'your_google_maps_api_key_here';
};

/**
 * Build Google Maps URL for directions
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} placeName - Optional place name
 * @returns {string} Google Maps directions URL
 */
export const buildDirectionsUrl = (lat, lng, placeName = '') => {
  const baseUrl = 'https://www.google.com/maps/dir/';
  const params = new URLSearchParams({
    api: '1',
    destination: `${lat},${lng}`
  });
  
  if (placeName) {
    params.append('destination_place_id', placeName);
  }
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Build Google Maps URL for viewing location
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} placeName - Optional place name
 * @returns {string} Google Maps view URL
 */
export const buildViewUrl = (lat, lng, placeName = '') => {
  const baseUrl = 'https://www.google.com/maps/search/';
  const params = new URLSearchParams({
    api: '1',
    query: `${lat},${lng}`
  });
  
  if (placeName) {
    params.append('query_place_id', placeName);
  }
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Build Google Maps Static Image URL
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} zoom - Zoom level (1-20)
 * @param {string} size - Image size (e.g., '600x400')
 * @returns {string} Static map image URL
 */
export const buildStaticMapUrl = (lat, lng, zoom = 15, size = '600x400') => {
  const apiKey = getGoogleMapsApiKey();
  
  if (!isGoogleMapsConfigured()) {
    console.warn('Google Maps API key not configured. Static maps will not work.');
    return '';
  }
  
  const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
  const params = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: zoom.toString(),
    size: size,
    maptype: 'roadmap',
    markers: `color:red|${lat},${lng}`,
    key: apiKey
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Build Google Maps Embed URL
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} zoom - Zoom level
 * @returns {string} Google Maps embed URL
 */
export const buildEmbedUrl = (lat, lng, zoom = 15) => {
  const apiKey = getGoogleMapsApiKey();
  
  if (!isGoogleMapsConfigured()) {
    console.warn('Google Maps API key not configured. Embed will not work.');
    return '';
  }
  
  const baseUrl = 'https://www.google.com/maps/embed/v1/place';
  const params = new URLSearchParams({
    key: apiKey,
    q: `${lat},${lng}`,
    zoom: zoom.toString()
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Build Street View URL
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} heading - Camera heading (0-360)
 * @param {number} pitch - Camera pitch (-90 to 90)
 * @param {number} fov - Field of view (10-100)
 * @returns {string} Street View URL
 */
export const buildStreetViewUrl = (lat, lng, heading = 0, pitch = 0, fov = 90) => {
  const apiKey = getGoogleMapsApiKey();
  
  if (!isGoogleMapsConfigured()) {
    console.warn('Google Maps API key not configured. Street View will not work.');
    return '';
  }
  
  const baseUrl = 'https://maps.googleapis.com/maps/api/streetview';
  const params = new URLSearchParams({
    size: '600x400',
    location: `${lat},${lng}`,
    heading: heading.toString(),
    pitch: pitch.toString(),
    fov: fov.toString(),
    key: apiKey
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Log Google Maps configuration status
 */
export const logGoogleMapsStatus = () => {
  if (isGoogleMapsConfigured()) {
    console.log('✅ Google Maps API key is configured');
    console.log('🗺️ Enhanced features available: Static Maps, Embed, Street View');
  } else {
    console.log('ℹ️ Google Maps API key not configured');
    console.log('🗺️ Basic features still work: Directions, View on Maps');
    console.log('💡 Add REACT_APP_GOOGLE_MAPS_API_KEY to .env.local for enhanced features');
  }
};

export default {
  getGoogleMapsApiKey,
  isGoogleMapsConfigured,
  buildDirectionsUrl,
  buildViewUrl,
  buildStaticMapUrl,
  buildEmbedUrl,
  buildStreetViewUrl,
  logGoogleMapsStatus
};
