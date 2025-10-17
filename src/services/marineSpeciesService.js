// src/services/marineSpeciesService.js - Service for marine species data and interactions
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

// Species categories
export const SPECIES_CATEGORIES = {
  FISH: 'fish',
  MAMMALS: 'mammals',
  REPTILES: 'reptiles',
  INVERTEBRATES: 'invertebrates',
  CORAL: 'coral',
  PLANTS: 'plants',
  BIRDS: 'birds'
};

// Conservation status
export const CONSERVATION_STATUS = {
  EXTINCT: 'extinct',
  EXTINCT_IN_WILD: 'extinct_in_wild',
  CRITICALLY_ENDANGERED: 'critically_endangered',
  ENDANGERED: 'endangered',
  VULNERABLE: 'vulnerable',
  NEAR_THREATENED: 'near_threatened',
  LEAST_CONCERN: 'least_concern',
  DATA_DEFICIENT: 'data_deficient'
};

// Habitats
export const HABITATS = {
  CORAL_REEF: 'coral_reef',
  OPEN_OCEAN: 'open_ocean',
  DEEP_SEA: 'deep_sea',
  MANGROVE: 'mangrove',
  SEAGRASS: 'seagrass',
  ROCKY_SHORE: 'rocky_shore',
  SANDY_BEACH: 'sandy_beach',
  ESTUARY: 'estuary',
  FRESHWATER: 'freshwater',
  BRACKISH: 'brackish'
};

// Sample species data structure
const speciesTemplate = {
  id: '',
  scientificName: '',
  commonName: {
    en: '',
    si: '',
    ta: ''
  },
  localNames: [],
  category: '',
  family: '',
  genus: '',
  description: {
    en: '',
    si: '',
    ta: ''
  },
  habitat: [],
  distribution: {
    global: '',
    sriLanka: []
  },
  characteristics: {
    size: '',
    weight: '',
    lifespan: '',
    diet: '',
    reproduction: ''
  },
  behavior: '',
  conservationStatus: '',
  threats: [],
  conservationEfforts: '',
  funFacts: [],
  importance: {
    ecological: '',
    economic: '',
    cultural: ''
  },
  images: {
    main: '',
    gallery: [],
    illustration: ''
  },
  videos: [],
  audioGuide: {
    en: '',
    si: '',
    ta: ''
  },
  model3D: '',
  arEnabled: false,
  locations: {
    bestSpots: [],
    seasonality: ''
  },
  relatedSpecies: [],
  references: [],
  naraResearch: [],
  quizQuestions: [],
  identificationTips: [],
  viewCount: 0,
  favoriteCount: 0,
  createdAt: null,
  updatedAt: null
};

// Get all species with pagination
export const getSpecies = async (category = null, lastDoc = null, pageSize = 20) => {
  try {
    let q;
    
    if (category) {
      if (lastDoc) {
        q = query(
          collection(db, 'marineSpecies'),
          where('category', '==', category),
          orderBy('commonName.en'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, 'marineSpecies'),
          where('category', '==', category),
          orderBy('commonName.en'),
          limit(pageSize)
        );
      }
    } else {
      if (lastDoc) {
        q = query(
          collection(db, 'marineSpecies'),
          orderBy('commonName.en'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      } else {
        q = query(
          collection(db, 'marineSpecies'),
          orderBy('commonName.en'),
          limit(pageSize)
        );
      }
    }
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      species.push({ id: doc.id, ...doc.data() });
    });
    
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    
    return {
      species,
      lastDoc: lastVisible,
      hasMore: snapshot.docs.length === pageSize
    };
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

// Get single species by ID
export const getSpeciesById = async (speciesId) => {
  try {
    const speciesDoc = await getDoc(doc(db, 'marineSpecies', speciesId));
    
    if (speciesDoc.exists()) {
      // Increment view count
      await updateDoc(doc(db, 'marineSpecies', speciesId), {
        viewCount: increment(1)
      });
      
      return { id: speciesDoc.id, ...speciesDoc.data() };
    } else {
      throw new Error('Species not found');
    }
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

// Search species
export const searchSpecies = async (searchTerm, filters = {}) => {
  try {
    const searchLower = searchTerm.toLowerCase();
    
    // For now, we'll fetch all and filter client-side
    // In production, use Algolia or similar search service
    let q = collection(db, 'marineSpecies');
    
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters.conservationStatus) {
      q = query(q, where('conservationStatus', '==', filters.conservationStatus));
    }
    
    if (filters.habitat) {
      q = query(q, where('habitat', 'array-contains', filters.habitat));
    }
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const matchesSearch = 
        data.commonName.en.toLowerCase().includes(searchLower) ||
        data.commonName.si?.includes(searchTerm) ||
        data.commonName.ta?.includes(searchTerm) ||
        data.scientificName.toLowerCase().includes(searchLower) ||
        data.localNames?.some(name => name.toLowerCase().includes(searchLower));
      
      if (matchesSearch) {
        species.push({ id: doc.id, ...data });
      }
    });
    
    return species;
  } catch (error) {
    console.error('Error searching species:', error);
    throw error;
  }
};

// Get species by habitat
export const getSpeciesByHabitat = async (habitat) => {
  try {
    const q = query(
      collection(db, 'marineSpecies'),
      where('habitat', 'array-contains', habitat),
      orderBy('commonName.en')
    );
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      species.push({ id: doc.id, ...doc.data() });
    });
    
    return species;
  } catch (error) {
    console.error('Error fetching species by habitat:', error);
    throw error;
  }
};

// Get endangered species
export const getEndangeredSpecies = async () => {
  try {
    const statuses = [
      CONSERVATION_STATUS.CRITICALLY_ENDANGERED,
      CONSERVATION_STATUS.ENDANGERED,
      CONSERVATION_STATUS.VULNERABLE
    ];
    
    const q = query(
      collection(db, 'marineSpecies'),
      where('conservationStatus', 'in', statuses),
      orderBy('conservationStatus'),
      orderBy('commonName.en')
    );
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      species.push({ id: doc.id, ...doc.data() });
    });
    
    return species;
  } catch (error) {
    console.error('Error fetching endangered species:', error);
    throw error;
  }
};

// Get featured species
export const getFeaturedSpecies = async () => {
  try {
    const q = query(
      collection(db, 'marineSpecies'),
      where('featured', '==', true),
      limit(6)
    );
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      species.push({ id: doc.id, ...doc.data() });
    });
    
    return species;
  } catch (error) {
    console.error('Error fetching featured species:', error);
    throw error;
  }
};

// Add species to favorites
export const addToFavorites = async (userId, speciesId) => {
  try {
    await setDoc(
      doc(db, 'users', userId, 'favorites', speciesId),
      {
        speciesId,
        addedAt: serverTimestamp()
      }
    );
    
    // Increment favorite count on species
    await updateDoc(doc(db, 'marineSpecies', speciesId), {
      favoriteCount: increment(1)
    });
    
    return {
      success: true,
      message: 'Added to favorites!'
    };
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

// Remove from favorites
export const removeFromFavorites = async (userId, speciesId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'favorites', speciesId));
    
    // Decrement favorite count on species
    await updateDoc(doc(db, 'marineSpecies', speciesId), {
      favoriteCount: increment(-1)
    });
    
    return {
      success: true,
      message: 'Removed from favorites'
    };
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

// Get user's favorite species
export const getUserFavorites = async (userId) => {
  try {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const snapshot = await getDocs(favoritesRef);
    const favoriteIds = [];
    
    snapshot.forEach((doc) => {
      favoriteIds.push(doc.data().speciesId);
    });
    
    if (favoriteIds.length === 0) {
      return [];
    }
    
    // Fetch species details
    const species = [];
    for (const id of favoriteIds) {
      const speciesData = await getSpeciesById(id);
      if (speciesData) {
        species.push(speciesData);
      }
    }
    
    return species;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    throw error;
  }
};

// Record species identification (for gamification)
export const recordSpeciesIdentification = async (userId, speciesId, method = 'manual') => {
  try {
    // Record in user's identification history
    await setDoc(
      doc(collection(db, 'users', userId, 'identifications')),
      {
        speciesId,
        method, // 'manual', 'camera', 'quiz'
        identifiedAt: serverTimestamp()
      }
    );
    
    // Update user stats
    await updateDoc(doc(db, 'users', userId), {
      'stats.speciesIdentified': increment(1),
      updatedAt: serverTimestamp()
    });
    
    // Add points for identification
    const gamificationModule = await import('./gamificationService');
    await gamificationModule.addPoints(userId, gamificationModule.POINT_VALUES.SPECIES_IDENTIFY, 'Species identification');
    
    // Check for badges
    const userDoc = await getDoc(doc(db, 'users', userId));
    const speciesCount = userDoc.data()?.stats?.speciesIdentified || 0;
    
    if (speciesCount === 10 || speciesCount === 25 || speciesCount === 50 || speciesCount === 100) {
      const level = speciesCount === 10 ? 'bronze' :
                   speciesCount === 25 ? 'silver' :
                   speciesCount === 50 ? 'gold' : 'platinum';
      await gamificationModule.awardBadge(userId, 'MARINE_BIOLOGIST', level);
    }
    
    return {
      success: true,
      message: 'Species identified successfully!',
      speciesCount
    };
  } catch (error) {
    console.error('Error recording species identification:', error);
    throw error;
  }
};

// Get species quiz questions
export const getSpeciesQuiz = async (speciesId = null, difficulty = 'medium') => {
  try {
    let questions = [];
    
    if (speciesId) {
      // Get questions for specific species
      const speciesDoc = await getDoc(doc(db, 'marineSpecies', speciesId));
      if (speciesDoc.exists()) {
        questions = speciesDoc.data().quizQuestions || [];
      }
    } else {
      // Get random questions from multiple species
      const q = query(
        collection(db, 'marineSpecies'),
        where('quizQuestions', '!=', null),
        limit(10)
      );
      
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => {
        const speciesQuestions = doc.data().quizQuestions || [];
        questions = questions.concat(
          speciesQuestions.map(q => ({ ...q, speciesId: doc.id }))
        );
      });
    }
    
    // Filter by difficulty if specified
    if (difficulty && difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Shuffle and limit to 10 questions
    questions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
    
    return questions;
  } catch (error) {
    console.error('Error fetching species quiz:', error);
    throw error;
  }
};

// Get species for AR view
export const getARSpecies = async () => {
  try {
    const q = query(
      collection(db, 'marineSpecies'),
      where('arEnabled', '==', true),
      where('model3D', '!=', null)
    );
    
    const snapshot = await getDocs(q);
    const species = [];
    
    snapshot.forEach((doc) => {
      species.push({ id: doc.id, ...doc.data() });
    });
    
    return species;
  } catch (error) {
    console.error('Error fetching AR species:', error);
    throw error;
  }
};

// Admin functions - Add new species
export const addSpecies = async (speciesData) => {
  try {
    const newSpecies = {
      ...speciesTemplate,
      ...speciesData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await setDoc(doc(collection(db, 'marineSpecies')), newSpecies);
    
    return {
      success: true,
      id: docRef.id,
      message: 'Species added successfully!'
    };
  } catch (error) {
    console.error('Error adding species:', error);
    throw error;
  }
};

// Admin functions - Update species
export const updateSpecies = async (speciesId, updates) => {
  try {
    await updateDoc(doc(db, 'marineSpecies', speciesId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Species updated successfully!'
    };
  } catch (error) {
    console.error('Error updating species:', error);
    throw error;
  }
};

// Upload species image
export const uploadSpeciesImage = async (speciesId, file, imageType = 'gallery') => {
  try {
    const fileName = `species/${speciesId}/${imageType}_${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Update species document with image URL
    if (imageType === 'main') {
      await updateDoc(doc(db, 'marineSpecies', speciesId), {
        'images.main': downloadURL,
        updatedAt: serverTimestamp()
      });
    } else if (imageType === 'gallery') {
      const speciesDoc = await getDoc(doc(db, 'marineSpecies', speciesId));
      const currentGallery = speciesDoc.data()?.images?.gallery || [];
      
      await updateDoc(doc(db, 'marineSpecies', speciesId), {
        'images.gallery': [...currentGallery, downloadURL],
        updatedAt: serverTimestamp()
      });
    }
    
    return {
      success: true,
      url: downloadURL,
      message: 'Image uploaded successfully!'
    };
  } catch (error) {
    console.error('Error uploading species image:', error);
    throw error;
  }
};

export default {
  SPECIES_CATEGORIES,
  CONSERVATION_STATUS,
  HABITATS,
  getSpecies,
  getSpeciesById,
  searchSpecies,
  getSpeciesByHabitat,
  getEndangeredSpecies,
  getFeaturedSpecies,
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  recordSpeciesIdentification,
  getSpeciesQuiz,
  getARSpecies,
  addSpecies,
  updateSpecies,
  uploadSpeciesImage
};
