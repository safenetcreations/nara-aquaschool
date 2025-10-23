// src/config/firebase.js - Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { getDatabase } from 'firebase/database';

// NARA Unified Platform - AquaSchool Configuration
// Uses shared Firebase project 'nara-platform' for SSO with Nexus
//
// IMPORTANT: Create a .env file from .env.example before running
// Both AquaSchool and Nexus must use the SAME Firebase project!

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0 && process.env.NODE_ENV !== 'test') {
  console.error('Missing required Firebase environment variables:', missingVars);
  console.error('Please create a .env file from .env.example and add your Firebase credentials');
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

// Initialize Firebase
let app = null;
let auth = null;
let db = null;
let storage = null;
let functions = null;
let realtimeDb = null;

try {
  app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  auth = getAuth(app);

  // Use the 'aquaschool' database instead of default
  db = getFirestore(app, 'aquaschool');

  storage = getStorage(app);
  functions = getFunctions(app);
  realtimeDb = getDatabase(app);
} catch (error) {
  console.warn('Firebase initialization failed. Running in demo mode without authentication:', error.message);
  console.warn('To enable Firebase features, add your Firebase credentials to .env file');
}

export { auth, db, storage, functions, realtimeDb };

// Initialize Analytics and Performance Monitoring in production
if (app && process.env.NODE_ENV === 'production') {
  getAnalytics(app);
  getPerformance(app);
}

// Connect to emulators in development
if (app && process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

// Helper functions for Firestore operations
export const createTimestamp = () => {
  return new Date();
};

export const serverTimestamp = () => {
  return new Date();
};

export default app;
