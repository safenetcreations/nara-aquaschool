// Species Image Service - Manage species images in Firestore
import { db } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

const COLLECTION_NAME = 'species-images';

/**
 * Save uploaded image URL to Firestore linked to species
 * @param {string} speciesName - Name of the marine species
 * @param {string} firebaseUrl - Firebase Storage URL
 * @param {Object} metadata - Additional metadata (provider, prompt, etc.)
 * @returns {Promise<string>} Document ID
 */
export const saveSpeciesImage = async (speciesName, firebaseUrl, metadata = {}) => {
  try {
    // Create a document ID from species name
    const docId = speciesName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const imageData = {
      speciesName,
      imageUrl: firebaseUrl,
      provider: metadata.provider || 'unknown',
      prompt: metadata.prompt || '',
      uploadedAt: new Date().toISOString(),
      uploadedBy: metadata.uploadedBy || 'admin',
      active: true,
      ...metadata
    };

    const docRef = doc(db, COLLECTION_NAME, docId);
    await setDoc(docRef, imageData, { merge: true });

    console.log('✅ Species image saved to Firestore:', docId);
    return docId;
  } catch (error) {
    console.error('❌ Error saving species image:', error);
    throw error;
  }
};

/**
 * Get image URL for a specific species
 * @param {string} speciesName - Name of the marine species
 * @returns {Promise<Object|null>} Image data or null
 */
export const getSpeciesImage = async (speciesName) => {
  try {
    const docId = speciesName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const docRef = doc(db, COLLECTION_NAME, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().active) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting species image:', error);
    return null;
  }
};

/**
 * Get all species images
 * @returns {Promise<Array>} Array of image data objects
 */
export const getAllSpeciesImages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const images = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().active) {
        images.push({
          id: doc.id,
          ...doc.data()
        });
      }
    });

    return images;
  } catch (error) {
    console.error('❌ Error getting all species images:', error);
    return [];
  }
};

/**
 * Update species image
 * @param {string} speciesName - Name of the marine species
 * @param {Object} updates - Fields to update
 * @returns {Promise<void>}
 */
export const updateSpeciesImage = async (speciesName, updates) => {
  try {
    const docId = speciesName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const docRef = doc(db, COLLECTION_NAME, docId);

    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    console.log('✅ Species image updated:', docId);
  } catch (error) {
    console.error('❌ Error updating species image:', error);
    throw error;
  }
};

/**
 * Delete (deactivate) species image
 * @param {string} speciesName - Name of the marine species
 * @returns {Promise<void>}
 */
export const deleteSpeciesImage = async (speciesName) => {
  try {
    const docId = speciesName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const docRef = doc(db, COLLECTION_NAME, docId);

    // Soft delete - mark as inactive instead of actually deleting
    await updateDoc(docRef, {
      active: false,
      deletedAt: new Date().toISOString()
    });

    console.log('✅ Species image deleted:', docId);
  } catch (error) {
    console.error('❌ Error deleting species image:', error);
    throw error;
  }
};

/**
 * Get images by provider
 * @param {string} provider - Provider name (gemini, pollinations, etc.)
 * @returns {Promise<Array>} Array of image data objects
 */
export const getImagesByProvider = async (provider) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('provider', '==', provider),
      where('active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const images = [];

    querySnapshot.forEach((doc) => {
      images.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return images;
  } catch (error) {
    console.error('❌ Error getting images by provider:', error);
    return [];
  }
};

export default {
  saveSpeciesImage,
  getSpeciesImage,
  getAllSpeciesImages,
  updateSpeciesImage,
  deleteSpeciesImage,
  getImagesByProvider
};
