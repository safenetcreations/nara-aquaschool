// src/services/oceanDataService.js - Service for real-time ocean and environmental data
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref as dbRef, 
  onValue, 
  set,
  push,
  serverTimestamp as rtdbTimestamp
} from 'firebase/database';
import { db, realtimeDb } from '../config/firebase';
import axios from 'axios';

// Data types
export const DATA_TYPES = {
  TEMPERATURE: 'temperature',
  SALINITY: 'salinity',
  PH: 'ph',
  DISSOLVED_OXYGEN: 'dissolved_oxygen',
  TURBIDITY: 'turbidity',
  WAVE_HEIGHT: 'wave_height',
  CURRENT_SPEED: 'current_speed',
  TIDE_LEVEL: 'tide_level',
  WIND_SPEED: 'wind_speed',
  RAINFALL: 'rainfall'
};

// Monitoring station locations around Sri Lanka
export const MONITORING_STATIONS = {
  COLOMBO: {
    id: 'colombo',
    name: 'Colombo Harbor',
    nameSi: 'කොළඹ වරාය',
    nameTa: 'கொழும்பு துறைமுகம்',
    coordinates: { lat: 6.9497, lng: 79.8547 },
    type: 'coastal',
    sensors: ['temperature', 'salinity', 'ph', 'tide_level', 'wave_height']
  },
  TRINCOMALEE: {
    id: 'trincomalee',
    name: 'Trincomalee Bay',
    nameSi: 'ත්‍රිකුණාමල බොක්ක',
    nameTa: 'திருகோணமலை வளைகுடா',
    coordinates: { lat: 8.5874, lng: 81.2152 },
    type: 'coastal',
    sensors: ['temperature', 'salinity', 'current_speed', 'wave_height']
  },
  KALPITIYA: {
    id: 'kalpitiya',
    name: 'Kalpitiya Reef',
    nameSi: 'කල්පිටිය ගල්පර',
    nameTa: 'கல்பிட்டி பவளப்பாறை',
    coordinates: { lat: 8.3367, lng: 79.7667 },
    type: 'reef',
    sensors: ['temperature', 'ph', 'dissolved_oxygen', 'turbidity']
  },
  MIRISSA: {
    id: 'mirissa',
    name: 'Mirissa Whale Point',
    nameSi: 'මිරිස්ස තල්මසුන් ස්ථානය',
    nameTa: 'மிரிஸ்ஸ திமிங்கல புள்ளி',
    coordinates: { lat: 5.9469, lng: 80.4588 },
    type: 'deep_water',
    sensors: ['temperature', 'salinity', 'current_speed']
  },
  NEGOMBO: {
    id: 'negombo',
    name: 'Negombo Lagoon',
    nameSi: 'මීගමුව කලපුව',
    nameTa: 'நீர்கொழும்பு குளம்',
    coordinates: { lat: 7.2094, lng: 79.8358 },
    type: 'lagoon',
    sensors: ['temperature', 'salinity', 'ph', 'dissolved_oxygen']
  },
  BATTICALOA: {
    id: 'batticaloa',
    name: 'Batticaloa Lagoon',
    nameSi: 'මඩකලපුව කලපුව',
    nameTa: 'மட்டக்களப்பு குளம்',
    coordinates: { lat: 7.7310, lng: 81.7012 },
    type: 'lagoon',
    sensors: ['temperature', 'salinity', 'ph', 'turbidity']
  }
};

// Underwater camera locations
export const CAMERA_LOCATIONS = {
  BAR_REEF: {
    id: 'bar_reef',
    name: 'Bar Reef Marine Sanctuary',
    nameSi: 'බාර් ගල්පර සමුද්‍ර අභයභූමිය',
    nameTa: 'பார் ரீஃப் கடல் சரணாலயம்',
    coordinates: { lat: 8.7000, lng: 79.7500 },
    depth: '5-10m',
    streamUrl: process.env.REACT_APP_BAR_REEF_STREAM || '',
    schedule: '08:00, 12:00, 16:00',
    features: ['Coral reef', 'Tropical fish', 'Sea turtles']
  },
  PIGEON_ISLAND: {
    id: 'pigeon_island',
    name: 'Pigeon Island National Park',
    nameSi: 'පරෙවි දූපත ජාතික උද්‍යානය',
    nameTa: 'புறா தீவு தேசிய பூங்கா',
    coordinates: { lat: 8.7197, lng: 81.1894 },
    depth: '3-8m',
    streamUrl: process.env.REACT_APP_PIGEON_ISLAND_STREAM || '',
    schedule: '09:00, 13:00, 17:00',
    features: ['Coral gardens', 'Blacktip sharks', 'Parrotfish']
  },
  MANGROVE_KADOLKELE: {
    id: 'kadolkele',
    name: 'Kadolkele Mangrove Research',
    nameSi: 'කඩොල්කැලේ කඩොලාන පර්යේෂණ',
    nameTa: 'கடொல்கெலே கடலோர காடு ஆராய்ச்சி',
    coordinates: { lat: 7.2500, lng: 79.8500 },
    depth: '1-3m',
    streamUrl: process.env.REACT_APP_KADOLKELE_STREAM || '',
    schedule: '07:00, 11:00, 15:00',
    features: ['Mangrove roots', 'Mudskippers', 'Crabs']
  }
};

// Get current ocean data from all stations
export const getCurrentOceanData = async () => {
  try {
    const dataPromises = Object.keys(MONITORING_STATIONS).map(async (stationId) => {
      const stationRef = doc(db, 'oceanData', stationId);
      const stationDoc = await getDoc(stationRef);
      
      if (stationDoc.exists()) {
        return {
          stationId,
          ...MONITORING_STATIONS[stationId],
          data: stationDoc.data(),
          lastUpdated: stationDoc.data()?.timestamp
        };
      }
      
      // If no real data, return mock data for demo
      return {
        stationId,
        ...MONITORING_STATIONS[stationId],
        data: generateMockOceanData(MONITORING_STATIONS[stationId]),
        lastUpdated: new Date()
      };
    });
    
    const stationData = await Promise.all(dataPromises);
    return stationData;
  } catch (error) {
    console.error('Error fetching ocean data:', error);
    throw error;
  }
};

// Get historical ocean data
export const getHistoricalOceanData = async (stationId, dataType, days = 7) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const q = query(
      collection(db, 'oceanData', stationId, 'historical'),
      where('type', '==', dataType),
      where('timestamp', '>=', startDate),
      where('timestamp', '<=', endDate),
      orderBy('timestamp', 'asc')
    );
    
    const snapshot = await getDocs(q);
    const data = [];
    
    snapshot.forEach((doc) => {
      data.push({
        timestamp: doc.data().timestamp.toDate(),
        value: doc.data().value
      });
    });
    
    // If no real data, generate mock historical data
    if (data.length === 0) {
      return generateMockHistoricalData(dataType, days);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

// Subscribe to real-time ocean data updates
export const subscribeToOceanData = (stationId, callback) => {
  try {
    // Using Realtime Database for live updates
    const stationRef = dbRef(realtimeDb, `liveOceanData/${stationId}`);
    
    const unsubscribe = onValue(stationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback({
          stationId,
          ...MONITORING_STATIONS[stationId],
          data,
          lastUpdated: new Date(data.timestamp)
        });
      } else {
        // Send mock data if no real data
        callback({
          stationId,
          ...MONITORING_STATIONS[stationId],
          data: generateMockOceanData(MONITORING_STATIONS[stationId]),
          lastUpdated: new Date()
        });
      }
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to ocean data:', error);
    throw error;
  }
};

// Get tide predictions
export const getTidePredictions = async (location, days = 7) => {
  try {
    const predictions = [];
    const now = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      // Mock tide data - in production, integrate with actual tide API
      predictions.push({
        date: date.toISOString().split('T')[0],
        tides: [
          {
            type: 'high',
            time: '06:23',
            height: 2.3
          },
          {
            type: 'low',
            time: '12:45',
            height: 0.5
          },
          {
            type: 'high',
            time: '18:56',
            height: 2.1
          }
        ]
      });
    }
    
    return predictions;
  } catch (error) {
    console.error('Error fetching tide predictions:', error);
    throw error;
  }
};

// Get weather and sea conditions
export const getSeaConditions = async (coordinates) => {
  try {
    // In production, integrate with weather API
    // For now, return mock data
    return {
      weather: {
        temperature: 28,
        humidity: 75,
        windSpeed: 15,
        windDirection: 'SW',
        conditions: 'Partly Cloudy',
        visibility: 10
      },
      sea: {
        waveHeight: 1.2,
        wavePeriod: 6,
        swellDirection: 'S',
        surfaceTemperature: 27,
        currentSpeed: 0.5,
        currentDirection: 'NE'
      },
      warnings: [],
      forecast: {
        today: 'Moderate seas with occasional showers',
        tomorrow: 'Calm seas with sunny intervals'
      },
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error fetching sea conditions:', error);
    throw error;
  }
};

// Get whale/dolphin sighting data
export const getWhaleSightings = async (days = 30) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const q = query(
      collection(db, 'whaleSightings'),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const sightings = [];
    
    snapshot.forEach((doc) => {
      sightings.push({ id: doc.id, ...doc.data() });
    });
    
    // Add some mock sightings for demo
    if (sightings.length === 0) {
      sightings.push(
        {
          id: '1',
          species: 'Blue Whale',
          count: 2,
          location: { lat: 6.0367, lng: 80.2170 },
          locationName: 'Mirissa',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          reportedBy: 'NARA Research Team'
        },
        {
          id: '2',
          species: 'Spinner Dolphins',
          count: 50,
          location: { lat: 8.7500, lng: 81.2000 },
          locationName: 'Trincomalee',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          reportedBy: 'Whale Watch Tour'
        }
      );
    }
    
    return sightings;
  } catch (error) {
    console.error('Error fetching whale sightings:', error);
    throw error;
  }
};

// Submit citizen science ocean observation
export const submitOceanObservation = async (userId, observation) => {
  try {
    const observationData = {
      userId,
      type: observation.type, // 'temperature', 'wildlife', 'pollution', etc.
      value: observation.value,
      location: observation.location,
      coordinates: observation.coordinates,
      photos: observation.photos || [],
      notes: observation.notes,
      deviceId: observation.deviceId,
      validated: false,
      timestamp: serverTimestamp()
    };
    
    const docRef = await setDoc(
      doc(collection(db, 'citizenOceanData')),
      observationData
    );
    
    // Award points for contribution
    const gamificationModule = await import('./gamificationService');
    await gamificationModule.addPoints(
      userId, 
      gamificationModule.POINT_VALUES.CITIZEN_SCIENCE,
      'Ocean data contribution'
    );
    
    return {
      success: true,
      id: docRef.id,
      message: 'Thank you for your contribution to ocean science!'
    };
  } catch (error) {
    console.error('Error submitting ocean observation:', error);
    throw error;
  }
};

// Get live camera stream info
export const getCameraStreams = async () => {
  try {
    const streams = Object.values(CAMERA_LOCATIONS).map(camera => ({
      ...camera,
      isLive: checkIfStreamIsLive(camera.schedule),
      nextStream: getNextStreamTime(camera.schedule)
    }));
    
    return streams;
  } catch (error) {
    console.error('Error fetching camera streams:', error);
    throw error;
  }
};

// Helper function to check if stream is currently live
const checkIfStreamIsLive = (schedule) => {
  if (!schedule) return false;
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const scheduleTimes = schedule.split(', ');
  
  return scheduleTimes.some(time => {
    const streamStart = time;
    const streamEnd = addMinutes(time, 30); // Assume 30-minute streams
    return currentTime >= streamStart && currentTime <= streamEnd;
  });
};

// Helper function to get next stream time
const getNextStreamTime = (schedule) => {
  if (!schedule) return null;
  
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const scheduleTimes = schedule.split(', ').sort();
  
  for (const time of scheduleTimes) {
    if (time > currentTime) {
      return time;
    }
  }
  
  // If no stream today, return first stream tomorrow
  return scheduleTimes[0] + ' (tomorrow)';
};

// Helper function to add minutes to time string
const addMinutes = (timeStr, minutes) => {
  const [hours, mins] = timeStr.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMins = totalMinutes % 60;
  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
};

// Generate mock ocean data for demo
const generateMockOceanData = (station) => {
  const data = {};
  
  if (station.sensors.includes('temperature')) {
    data.temperature = 26 + Math.random() * 4; // 26-30°C
  }
  if (station.sensors.includes('salinity')) {
    data.salinity = 34 + Math.random() * 2; // 34-36 ppt
  }
  if (station.sensors.includes('ph')) {
    data.ph = 7.8 + Math.random() * 0.4; // 7.8-8.2
  }
  if (station.sensors.includes('dissolved_oxygen')) {
    data.dissolved_oxygen = 6 + Math.random() * 2; // 6-8 mg/L
  }
  if (station.sensors.includes('turbidity')) {
    data.turbidity = 1 + Math.random() * 4; // 1-5 NTU
  }
  if (station.sensors.includes('wave_height')) {
    data.wave_height = 0.5 + Math.random() * 2; // 0.5-2.5m
  }
  if (station.sensors.includes('current_speed')) {
    data.current_speed = 0.1 + Math.random() * 0.5; // 0.1-0.6 m/s
  }
  if (station.sensors.includes('tide_level')) {
    data.tide_level = 0.5 + Math.random() * 2; // 0.5-2.5m
  }
  
  data.timestamp = Date.now();
  return data;
};

// Generate mock historical data
const generateMockHistoricalData = (dataType, days) => {
  const data = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate 4 data points per day
    for (let j = 0; j < 4; j++) {
      const timestamp = new Date(date);
      timestamp.setHours(j * 6); // Every 6 hours
      
      let value;
      switch (dataType) {
        case 'temperature':
          value = 26 + Math.random() * 4 + Math.sin(j / 4 * Math.PI) * 2;
          break;
        case 'salinity':
          value = 34 + Math.random() * 2;
          break;
        case 'ph':
          value = 7.8 + Math.random() * 0.4;
          break;
        case 'wave_height':
          value = 0.5 + Math.random() * 2 + Math.sin(j / 4 * Math.PI);
          break;
        default:
          value = Math.random() * 10;
      }
      
      data.push({ timestamp, value });
    }
  }
  
  return data;
};

export default {
  DATA_TYPES,
  MONITORING_STATIONS,
  CAMERA_LOCATIONS,
  getCurrentOceanData,
  getHistoricalOceanData,
  subscribeToOceanData,
  getTidePredictions,
  getSeaConditions,
  getWhaleSightings,
  submitOceanObservation,
  getCameraStreams
};
