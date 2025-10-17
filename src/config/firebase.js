// src/config/firebase.js - Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getPerformance } from 'firebase/performance';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
// NARA AquaSchool Firebase Project
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBs98CV0NboouXg4E_OOVvIzsi9BTAVFZU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "nara-aquaschool.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "nara-aquaschool",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "nara-aquaschool.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "102222123439",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:102222123439:web:182421d45e472c53799f5a",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-BL8P6HX6F0",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://nara-aquaschool-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
export const realtimeDb = getDatabase(app);

// Initialize Analytics and Performance Monitoring in production
if (process.env.NODE_ENV === 'production') {
  getAnalytics(app);
  getPerformance(app);
}

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
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
