// src/services/citizenScienceService.js - Service for citizen science projects and data collection
import { 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  updateDoc, 
  collection,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  arrayUnion,
  GeoPoint
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Project types
export const PROJECT_TYPES = {
  BEACH_MONITORING: 'beach_monitoring',
  WATER_QUALITY: 'water_quality',
  SPECIES_OBSERVATION: 'species_observation',
  CORAL_HEALTH: 'coral_health',
  MANGROVE_ASSESSMENT: 'mangrove_assessment',
  PLASTIC_POLLUTION: 'plastic_pollution',
  TURTLE_NESTING: 'turtle_nesting',
  BIRD_COUNT: 'bird_count',
  FISH_SURVEY: 'fish_survey'
};

// Data collection protocols
export const PROTOCOLS = {
  BEACH_MONITORING: {
    id: 'beach_monitoring',
    name: 'Beach Health Assessment',
    nameSi: 'වෙරළ සෞඛ්‍ය තක්සේරුව',
    nameTa: 'கடற்கரை சுகாதார மதிப்பீடு',
    description: 'Monitor beach conditions, erosion, and human impact',
    requirements: {
      tools: ['Camera', 'GPS device/phone', 'Measuring tape', 'Data sheet'],
      skills: ['Basic observation', 'Photo documentation'],
      minAge: 10
    },
    dataFields: [
      { id: 'beach_name', type: 'text', label: 'Beach Name', required: true },
      { id: 'location', type: 'location', label: 'GPS Coordinates', required: true },
      { id: 'date', type: 'date', label: 'Date', required: true },
      { id: 'time', type: 'time', label: 'Time', required: true },
      { id: 'weather', type: 'select', label: 'Weather', options: ['Sunny', 'Cloudy', 'Rainy', 'Windy'], required: true },
      { id: 'tide_level', type: 'select', label: 'Tide Level', options: ['High', 'Mid', 'Low'], required: true },
      { id: 'beach_width', type: 'number', label: 'Beach Width (m)', required: false },
      { id: 'erosion_signs', type: 'multiselect', label: 'Erosion Signs', options: ['Cliff collapse', 'Tree roots exposed', 'Beach narrowing', 'None'] },
      { id: 'debris_types', type: 'multiselect', label: 'Debris Types', options: ['Plastic', 'Glass', 'Metal', 'Fishing gear', 'Organic', 'None'] },
      { id: 'debris_amount', type: 'select', label: 'Debris Amount', options: ['None', 'Light', 'Moderate', 'Heavy'] },
      { id: 'wildlife_observed', type: 'text', label: 'Wildlife Observed', required: false },
      { id: 'human_activities', type: 'multiselect', label: 'Human Activities', options: ['Fishing', 'Swimming', 'Tourism', 'Construction', 'None'] },
      { id: 'photos', type: 'photos', label: 'Photos (min 3)', required: true, min: 3, max: 10 },
      { id: 'notes', type: 'textarea', label: 'Additional Notes', required: false }
    ],
    points: 100,
    badge: 'BEACH_GUARDIAN'
  },
  
  WATER_QUALITY: {
    id: 'water_quality',
    name: 'Water Quality Testing',
    nameSi: 'ජල ගුණාත්මක පරීක්ෂණ',
    nameTa: 'நீர் தர பரிசோதனை',
    description: 'Test and record water quality parameters',
    requirements: {
      tools: ['Water testing kit', 'Thermometer', 'pH strips', 'Sample containers'],
      skills: ['Basic chemistry', 'Data recording'],
      minAge: 12
    },
    dataFields: [
      { id: 'water_body', type: 'text', label: 'Water Body Name', required: true },
      { id: 'water_type', type: 'select', label: 'Water Type', options: ['River', 'Lake', 'Pond', 'Stream', 'Coastal', 'Well'], required: true },
      { id: 'location', type: 'location', label: 'GPS Coordinates', required: true },
      { id: 'date', type: 'date', label: 'Date', required: true },
      { id: 'time', type: 'time', label: 'Time', required: true },
      { id: 'temperature', type: 'number', label: 'Temperature (°C)', required: true, min: 0, max: 50 },
      { id: 'ph', type: 'number', label: 'pH Level', required: true, min: 0, max: 14, step: 0.1 },
      { id: 'dissolved_oxygen', type: 'number', label: 'Dissolved Oxygen (mg/L)', required: false, min: 0, max: 20 },
      { id: 'turbidity', type: 'select', label: 'Turbidity', options: ['Clear', 'Slightly cloudy', 'Cloudy', 'Very cloudy'] },
      { id: 'color', type: 'select', label: 'Water Color', options: ['Clear', 'Green', 'Brown', 'Yellow', 'Other'] },
      { id: 'odor', type: 'select', label: 'Odor', options: ['None', 'Fishy', 'Rotten eggs', 'Chemical', 'Other'] },
      { id: 'algae_presence', type: 'select', label: 'Algae Presence', options: ['None', 'Light', 'Moderate', 'Heavy'] },
      { id: 'pollution_sources', type: 'multiselect', label: 'Nearby Pollution Sources', options: ['Agriculture', 'Industry', 'Residential', 'None visible'] },
      { id: 'photos', type: 'photos', label: 'Photos', required: true, min: 2, max: 5 },
      { id: 'notes', type: 'textarea', label: 'Additional Observations', required: false }
    ],
    points: 75,
    badge: 'WATER_QUALITY_TESTER'
  },
  
  SPECIES_OBSERVATION: {
    id: 'species_observation',
    name: 'Wildlife Observation',
    nameSi: 'වන්ජීවී නිරීක්ෂණ',
    nameTa: 'வனவிலங்கு கண்காணிப்பு',
    description: 'Document marine and coastal wildlife sightings',
    requirements: {
      tools: ['Camera/phone', 'Binoculars (optional)', 'Field guide'],
      skills: ['Species identification', 'Photography'],
      minAge: 8
    },
    dataFields: [
      { id: 'species_type', type: 'select', label: 'Species Type', options: ['Fish', 'Bird', 'Mammal', 'Reptile', 'Invertebrate', 'Unknown'], required: true },
      { id: 'species_name', type: 'text', label: 'Species Name (if known)', required: false },
      { id: 'count', type: 'number', label: 'Number Observed', required: true, min: 1 },
      { id: 'location', type: 'location', label: 'Location', required: true },
      { id: 'habitat', type: 'select', label: 'Habitat', options: ['Beach', 'Reef', 'Mangrove', 'Open water', 'Rocky shore', 'Wetland'], required: true },
      { id: 'date', type: 'date', label: 'Date', required: true },
      { id: 'time', type: 'time', label: 'Time', required: true },
      { id: 'behavior', type: 'multiselect', label: 'Behavior Observed', options: ['Feeding', 'Resting', 'Swimming', 'Flying', 'Nesting', 'Mating', 'Other'] },
      { id: 'size_estimate', type: 'text', label: 'Size Estimate', required: false },
      { id: 'distinctive_features', type: 'textarea', label: 'Distinctive Features', required: false },
      { id: 'photos', type: 'photos', label: 'Photos', required: true, min: 1, max: 5 },
      { id: 'confidence', type: 'select', label: 'Identification Confidence', options: ['Certain', 'Fairly sure', 'Unsure'], required: true }
    ],
    points: 50,
    badge: 'SPECIES_SPOTTER'
  },
  
  PLASTIC_POLLUTION: {
    id: 'plastic_pollution',
    name: 'Plastic Pollution Survey',
    nameSi: 'ප්ලාස්ටික් දූෂණ සමීක්ෂණ',
    nameTa: 'பிளாஸ்டிக் மாசு கணக்கெடுப்பு',
    description: 'Document and collect data on plastic pollution',
    requirements: {
      tools: ['Gloves', 'Collection bags', 'Camera', 'Scale (optional)'],
      skills: ['Waste categorization', 'Data collection'],
      minAge: 10
    },
    dataFields: [
      { id: 'location_type', type: 'select', label: 'Location Type', options: ['Beach', 'River bank', 'Lake shore', 'Street drain', 'Other'], required: true },
      { id: 'location', type: 'location', label: 'GPS Location', required: true },
      { id: 'date', type: 'date', label: 'Date', required: true },
      { id: 'survey_area', type: 'number', label: 'Survey Area (m²)', required: true },
      { id: 'plastic_types', type: 'multiselect', label: 'Plastic Types Found', options: ['Bottles', 'Bags', 'Straws', 'Food containers', 'Fishing gear', 'Microplastics', 'Other'], required: true },
      { id: 'quantity', type: 'number', label: 'Total Items Collected', required: true },
      { id: 'weight', type: 'number', label: 'Total Weight (kg)', required: false },
      { id: 'brand_audit', type: 'text', label: 'Top 3 Brands (if identifiable)', required: false },
      { id: 'collected', type: 'boolean', label: 'Waste Collected for Disposal?', required: true },
      { id: 'photos', type: 'photos', label: 'Before/After Photos', required: true, min: 2, max: 6 },
      { id: 'notes', type: 'textarea', label: 'Additional Notes', required: false }
    ],
    points: 80,
    badge: 'POLLUTION_FIGHTER'
  }
};

// Get active citizen science projects
export const getActiveProjects = async () => {
  try {
    const q = query(
      collection(db, 'citizenScience'),
      where('status', '==', 'active'),
      orderBy('priority', 'desc'),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const projects = [];
    
    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    
    return projects;
  } catch (error) {
    console.error('Error fetching active projects:', error);
    throw error;
  }
};

// Get project details
export const getProjectById = async (projectId) => {
  try {
    const projectDoc = await getDoc(doc(db, 'citizenScience', projectId));
    
    if (projectDoc.exists()) {
      const project = { id: projectDoc.id, ...projectDoc.data() };
      
      // Get submission count
      const submissionsQuery = query(
        collection(db, 'citizenScience', projectId, 'submissions')
      );
      const submissionsSnapshot = await getDocs(submissionsQuery);
      project.submissionCount = submissionsSnapshot.size;
      
      return project;
    } else {
      throw new Error('Project not found');
    }
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Submit citizen science data
export const submitData = async (userId, projectId, data, photos = []) => {
  try {
    // Upload photos first
    const photoUrls = [];
    for (const photo of photos) {
      const photoUrl = await uploadPhoto(projectId, userId, photo);
      photoUrls.push(photoUrl);
    }
    
    // Create submission
    const submission = {
      userId,
      projectId,
      data: {
        ...data,
        photos: photoUrls
      },
      status: 'pending_review',
      validated: false,
      validatedBy: null,
      validationNotes: '',
      location: data.location ? new GeoPoint(data.location.lat, data.location.lng) : null,
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Save submission
    const submissionRef = await setDoc(
      doc(collection(db, 'citizenScience', projectId, 'submissions')),
      submission
    );
    
    // Update user stats
    await updateDoc(doc(db, 'users', userId), {
      'stats.citizenScienceContributions': increment(1),
      updatedAt: serverTimestamp()
    });
    
    // Award points based on project
    const protocol = PROTOCOLS[projectId] || PROTOCOLS[PROJECT_TYPES.SPECIES_OBSERVATION];
    const gamificationModule = await import('./gamificationService');
    await gamificationModule.addPoints(
      userId,
      protocol.points || gamificationModule.POINT_VALUES.CITIZEN_SCIENCE,
      `Citizen science contribution: ${protocol.name}`
    );
    
    // Check for badge eligibility
    if (protocol.badge) {
      const userDoc = await getDoc(doc(db, 'users', userId));
      const contributions = userDoc.data()?.stats?.citizenScienceContributions || 0;
      
      // Award badges at different contribution levels
      if (contributions === 1) {
        await gamificationModule.awardBadge(userId, protocol.badge, 'bronze');
      } else if (contributions === 5) {
        await gamificationModule.awardBadge(userId, protocol.badge, 'silver');
      } else if (contributions === 10) {
        await gamificationModule.awardBadge(userId, protocol.badge, 'gold');
      } else if (contributions === 25) {
        await gamificationModule.awardBadge(userId, protocol.badge, 'platinum');
      }
    }
    
    return {
      success: true,
      submissionId: submissionRef.id,
      points: protocol.points,
      message: 'Data submitted successfully! Thank you for contributing to science.'
    };
  } catch (error) {
    console.error('Error submitting data:', error);
    throw error;
  }
};

// Upload photo for submission
const uploadPhoto = async (projectId, userId, file) => {
  try {
    const fileName = `citizen-science/${projectId}/${userId}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};

// Get user's submissions
export const getUserSubmissions = async (userId, projectId = null) => {
  try {
    const submissions = [];
    
    if (projectId) {
      // Get submissions for specific project
      const q = query(
        collection(db, 'citizenScience', projectId, 'submissions'),
        where('userId', '==', userId),
        orderBy('submittedAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        submissions.push({ 
          id: doc.id, 
          projectId,
          ...doc.data() 
        });
      });
    } else {
      // Get all submissions across all projects
      const projectsSnapshot = await getDocs(collection(db, 'citizenScience'));
      
      for (const projectDoc of projectsSnapshot.docs) {
        const q = query(
          collection(db, 'citizenScience', projectDoc.id, 'submissions'),
          where('userId', '==', userId),
          orderBy('submittedAt', 'desc'),
          limit(10)
        );
        
        const submissionsSnapshot = await getDocs(q);
        submissionsSnapshot.forEach((doc) => {
          submissions.push({ 
            id: doc.id, 
            projectId: projectDoc.id,
            projectName: projectDoc.data().name,
            ...doc.data() 
          });
        });
      }
      
      // Sort all submissions by date
      submissions.sort((a, b) => b.submittedAt - a.submittedAt);
    }
    
    return submissions;
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    throw error;
  }
};

// Get project submissions (for viewing all data)
export const getProjectSubmissions = async (projectId, filters = {}) => {
  try {
    let q = collection(db, 'citizenScience', projectId, 'submissions');
    
    // Apply filters
    if (filters.validated !== undefined) {
      q = query(q, where('validated', '==', filters.validated));
    }
    
    if (filters.startDate && filters.endDate) {
      q = query(
        q,
        where('submittedAt', '>=', filters.startDate),
        where('submittedAt', '<=', filters.endDate)
      );
    }
    
    if (filters.location && filters.radius) {
      // For location-based filtering, would need geohashing
      // This is a simplified version
    }
    
    q = query(q, orderBy('submittedAt', 'desc'), limit(100));
    
    const snapshot = await getDocs(q);
    const submissions = [];
    
    snapshot.forEach((doc) => {
      submissions.push({ id: doc.id, ...doc.data() });
    });
    
    return submissions;
  } catch (error) {
    console.error('Error fetching project submissions:', error);
    throw error;
  }
};

// Get submission statistics
export const getSubmissionStats = async (projectId) => {
  try {
    const stats = {
      total: 0,
      validated: 0,
      pending: 0,
      contributors: new Set(),
      locations: [],
      recentSubmissions: []
    };
    
    const q = collection(db, 'citizenScience', projectId, 'submissions');
    const snapshot = await getDocs(q);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      stats.total++;
      
      if (data.validated) {
        stats.validated++;
      } else {
        stats.pending++;
      }
      
      stats.contributors.add(data.userId);
      
      if (data.location) {
        stats.locations.push({
          lat: data.location.latitude,
          lng: data.location.longitude
        });
      }
    });
    
    // Get recent submissions
    const recentQuery = query(
      collection(db, 'citizenScience', projectId, 'submissions'),
      orderBy('submittedAt', 'desc'),
      limit(5)
    );
    
    const recentSnapshot = await getDocs(recentQuery);
    recentSnapshot.forEach((doc) => {
      stats.recentSubmissions.push({ id: doc.id, ...doc.data() });
    });
    
    stats.contributors = stats.contributors.size;
    
    return stats;
  } catch (error) {
    console.error('Error fetching submission stats:', error);
    throw error;
  }
};

// Validate submission (for admins/scientists)
export const validateSubmission = async (projectId, submissionId, validatorId, isValid, notes = '') => {
  try {
    await updateDoc(
      doc(db, 'citizenScience', projectId, 'submissions', submissionId),
      {
        validated: isValid,
        validatedBy: validatorId,
        validationNotes: notes,
        validatedAt: serverTimestamp(),
        status: isValid ? 'validated' : 'rejected',
        updatedAt: serverTimestamp()
      }
    );
    
    // If validated, award bonus points to submitter
    if (isValid) {
      const submissionDoc = await getDoc(
        doc(db, 'citizenScience', projectId, 'submissions', submissionId)
      );
      
      if (submissionDoc.exists()) {
        const userId = submissionDoc.data().userId;
        const gamificationModule = await import('./gamificationService');
        await gamificationModule.addPoints(
          userId,
          25,
          'Citizen science data validated'
        );
      }
    }
    
    return {
      success: true,
      message: `Submission ${isValid ? 'validated' : 'rejected'} successfully`
    };
  } catch (error) {
    console.error('Error validating submission:', error);
    throw error;
  }
};

// Get data collection protocol
export const getProtocol = async (projectType) => {
  return PROTOCOLS[projectType] || null;
};

// Download data for analysis (CSV export)
export const exportProjectData = async (projectId, format = 'csv') => {
  try {
    const submissions = await getProjectSubmissions(projectId);
    
    if (format === 'csv') {
      // Convert to CSV format
      const csvData = convertToCSV(submissions);
      return {
        data: csvData,
        filename: `citizen_science_${projectId}_${Date.now()}.csv`,
        type: 'text/csv'
      };
    } else if (format === 'json') {
      return {
        data: JSON.stringify(submissions, null, 2),
        filename: `citizen_science_${projectId}_${Date.now()}.json`,
        type: 'application/json'
      };
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    throw error;
  }
};

// Helper function to convert data to CSV
const convertToCSV = (data) => {
  if (data.length === 0) return '';
  
  // Get all unique keys from data objects
  const keys = new Set();
  data.forEach(item => {
    Object.keys(item.data || item).forEach(key => keys.add(key));
  });
  
  const headers = Array.from(keys);
  const csvHeaders = headers.join(',');
  
  const csvRows = data.map(item => {
    const rowData = item.data || item;
    return headers.map(header => {
      const value = rowData[header];
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return value.toString().includes(',') ? `"${value}"` : value;
    }).join(',');
  });
  
  return `${csvHeaders}\n${csvRows.join('\n')}`;
};

export default {
  PROJECT_TYPES,
  PROTOCOLS,
  getActiveProjects,
  getProjectById,
  submitData,
  getUserSubmissions,
  getProjectSubmissions,
  getSubmissionStats,
  validateSubmission,
  getProtocol,
  exportProjectData
};
