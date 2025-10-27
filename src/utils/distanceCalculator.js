export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10;
};

const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const formatDistance = (distanceKm) => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm}km`;
};

export const estimateTravelTime = (distanceKm, mode = 'driving') => {
  let speedKmh;
  switch (mode) {
    case 'walking':
      speedKmh = 5;
      break;
    case 'transit':
      speedKmh = 30;
      break;
    case 'driving':
    default:
      speedKmh = 40;
  }
  
  const timeHours = distanceKm / speedKmh;
  const timeMinutes = Math.round(timeHours * 60);
  
  if (timeMinutes < 60) {
    return `${timeMinutes} min`;
  }
  const hours = Math.floor(timeMinutes / 60);
  const mins = timeMinutes % 60;
  return `${hours}h ${mins}m`;
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
};

export const addDistanceToSchools = (schools, userLocation) => {
  if (!userLocation || !userLocation.lat || !userLocation.lng) {
    return schools;
  }
  
  return schools.map(school => ({
    ...school,
    distance: school.coordinates ? 
      calculateDistance(
        userLocation.lat,
        userLocation.lng,
        school.coordinates.lat,
        school.coordinates.lng
      ) : null,
    distanceFormatted: school.coordinates ?
      formatDistance(calculateDistance(
        userLocation.lat,
        userLocation.lng,
        school.coordinates.lat,
        school.coordinates.lng
      )) : null
  }));
};