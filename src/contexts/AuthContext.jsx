// Global Authentication Context
// Makes auth state and school data available throughout the entire app

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  getUserProfile,
  getSchoolById,
  USER_ROLES,
  hasFeatureAccess
} from '../services/integratedAuthService';

// Create context
const AuthContext = createContext({});

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log('🔐 User authenticated:', firebaseUser.uid);
          
          // Get user profile from Firestore
          const profile = await getUserProfile(firebaseUser.uid);
          
          if (profile) {
            setUserProfile(profile);
            
            // Get school data
            if (profile.schoolId) {
              const schoolData = await getSchoolById(profile.schoolId);
              setSchool(schoolData);
              
              console.log('🏫 School loaded:', schoolData?.name);
            }
            
            setUser(firebaseUser);
          } else {
            console.warn('⚠️ User profile not found');
            setUser(firebaseUser);
            setUserProfile(null);
            setSchool(null);
          }
        } else {
          console.log('👤 No user authenticated');
          setUser(null);
          setUserProfile(null);
          setSchool(null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('❌ Auth state change error:', err);
        setError(err.message);
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Refresh user profile (useful after updates)
  const refreshProfile = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        
        if (profile.schoolId) {
          const schoolData = await getSchoolById(profile.schoolId);
          setSchool(schoolData);
        }
        
        console.log('✅ Profile refreshed');
      } catch (err) {
        console.error('❌ Profile refresh error:', err);
      }
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  // Check if user is admin
  const isAdmin = () => {
    return userProfile?.role === USER_ROLES.ADMIN;
  };

  // Check if user is teacher
  const isTeacher = () => {
    return userProfile?.role === USER_ROLES.TEACHER;
  };

  // Check if user is student
  const isStudent = () => {
    return userProfile?.role === USER_ROLES.STUDENT;
  };

  // Check if user is parent
  const isParent = () => {
    return userProfile?.role === USER_ROLES.PARENT;
  };

  // Check if user has access to feature
  const canAccess = (feature) => {
    if (!userProfile) return false;
    return hasFeatureAccess(userProfile, feature);
  };

  // Get user display name
  const getDisplayName = () => {
    return userProfile?.displayName || user?.displayName || 'User';
  };

  // Get user initials for avatar
  const getInitials = () => {
    const name = getDisplayName();
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Context value
  const value = {
    // State
    user,
    userProfile,
    school,
    loading,
    error,
    
    // Functions
    refreshProfile,
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    isParent,
    canAccess,
    getDisplayName,
    getInitials,
    
    // Quick checks
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false,
    
    // User data
    uid: user?.uid,
    email: user?.email,
    role: userProfile?.role,
    grade: userProfile?.grade,
    schoolId: userProfile?.schoolId,
    schoolName: school?.name || userProfile?.schoolName,
    
    // School data
    schoolDistrict: school?.district || userProfile?.schoolDistrict,
    schoolProvince: school?.province || userProfile?.schoolProvince
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
