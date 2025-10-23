// Integrated School-Based Authentication & Data Management System
// Complete system for registration, login, and data management across the platform

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { getAllSchools } from './schoolService';
import toast from 'react-hot-toast';

// ==================== USER ROLES ====================
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  PARENT: 'parent',
  ADMIN: 'admin',
  SCHOOL_ADMIN: 'school_admin'
};

// ==================== GRADE LEVELS ====================
export const GRADE_LEVELS = [5, 6, 7, 8, 9, 10];

// ==================== REGISTRATION ====================

/**
 * Register a new user with school integration
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Created user data
 */
export const registerUser = async (userData) => {
  try {
    const {
      email,
      password,
      fullName,
      role,
      schoolId,
      grade,
      parentEmail,
      teacherSubject,
      phoneNumber
    } = userData;

    // Validate required fields
    if (!email || !password || !fullName || !role || !schoolId) {
      throw new Error('Missing required fields');
    }

    // Validate school exists
    const school = await getSchoolById(schoolId);
    if (!school) {
      throw new Error('Selected school not found');
    }

    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: fullName
    });

    // Create user profile in Firestore
    const userProfile = {
      uid: user.uid,
      email: email,
      displayName: fullName,
      role: role,
      
      // School Information
      schoolId: schoolId,
      schoolName: school.name,
      schoolDistrict: school.district,
      schoolProvince: school.province,
      
      // Role-specific data
      ...(role === USER_ROLES.STUDENT && {
        grade: grade || 5,
        parentEmail: parentEmail || '',
        points: 0,
        badges: [],
        completedModules: [],
        achievements: []
      }),
      
      ...(role === USER_ROLES.TEACHER && {
        subject: teacherSubject || '',
        students: [],
        classes: []
      }),
      
      ...(role === USER_ROLES.PARENT && {
        children: []
      }),
      
      // Contact
      phoneNumber: phoneNumber || '',
      
      // Metadata
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      emailVerified: false,
      isActive: true,
      
      // Statistics
      loginCount: 1,
      totalTimeSpent: 0
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);

    // Update school statistics
    await updateSchoolStats(schoolId, role);

    // Send verification email
    await sendEmailVerification(user);

    console.log('✅ User registered successfully:', user.uid);
    
    return {
      user,
      profile: userProfile
    };

  } catch (error) {
    console.error('❌ Registration error:', error);
    throw error;
  }
};

/**
 * Login user with school verification
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data with school info
 */
export const loginUser = async (email, password) => {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user profile from Firestore
    const userProfile = await getUserProfile(user.uid);

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Verify school still exists
    if (userProfile.schoolId) {
      const school = await getSchoolById(userProfile.schoolId);
      if (!school) {
        toast.error('Your school is no longer in the system. Please contact support.');
      }
    }

    // Update last login
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: serverTimestamp(),
      loginCount: increment(1)
    });

    console.log('✅ User logged in:', user.uid);

    return {
      user,
      profile: userProfile
    };

  } catch (error) {
    console.error('❌ Login error:', error);
    throw error;
  }
};

/**
 * Google Sign-In with school selection
 * @param {string} schoolId - Selected school ID
 * @returns {Promise<Object>} - User data
 */
export const signInWithGoogle = async (schoolId) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user profile exists
    let userProfile = await getUserProfile(user.uid);

    if (!userProfile) {
      // New user - create profile
      const school = await getSchoolById(schoolId);
      
      if (!school) {
        throw new Error('Please select a valid school');
      }

      userProfile = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: USER_ROLES.STUDENT,
        schoolId: schoolId,
        schoolName: school.name,
        schoolDistrict: school.district,
        schoolProvince: school.province,
        grade: 5,
        points: 0,
        badges: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        emailVerified: user.emailVerified,
        isActive: true,
        loginCount: 1
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      await updateSchoolStats(schoolId, USER_ROLES.STUDENT);
    } else {
      // Existing user - update last login
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
        loginCount: increment(1)
      });
    }

    return { user, profile: userProfile };

  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log('✅ User logged out');
  } catch (error) {
    console.error('❌ Logout error:', error);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('✅ Password reset email sent');
  } catch (error) {
    console.error('❌ Password reset error:', error);
    throw error;
  }
};

// ==================== USER PROFILE MANAGEMENT ====================

/**
 * Get user profile by UID
 * @param {string} uid - User ID
 * @returns {Promise<Object>} - User profile data
 */
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (!userDoc.exists()) {
      return null;
    }

    return {
      uid: userDoc.id,
      ...userDoc.data()
    };

  } catch (error) {
    console.error('❌ Error getting user profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {string} uid - User ID
 * @param {Object} updates - Profile updates
 */
export const updateUserProfile = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });

    console.log('✅ User profile updated');

  } catch (error) {
    console.error('❌ Error updating profile:', error);
    throw error;
  }
};

/**
 * Change user school
 * @param {string} uid - User ID
 * @param {string} newSchoolId - New school ID
 */
export const changeUserSchool = async (uid, newSchoolId) => {
  try {
    const school = await getSchoolById(newSchoolId);
    
    if (!school) {
      throw new Error('School not found');
    }

    const userProfile = await getUserProfile(uid);
    
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Update old school stats (decrement)
    if (userProfile.schoolId) {
      await updateSchoolStats(userProfile.schoolId, userProfile.role, -1);
    }

    // Update user profile
    await updateDoc(doc(db, 'users', uid), {
      schoolId: newSchoolId,
      schoolName: school.name,
      schoolDistrict: school.district,
      schoolProvince: school.province,
      updatedAt: serverTimestamp()
    });

    // Update new school stats (increment)
    await updateSchoolStats(newSchoolId, userProfile.role, 1);

    console.log('✅ User school changed');

  } catch (error) {
    console.error('❌ Error changing school:', error);
    throw error;
  }
};

// ==================== SCHOOL MANAGEMENT ====================

/**
 * Get school by ID
 * @param {string} schoolId - School ID
 * @returns {Promise<Object>} - School data
 */
export const getSchoolById = async (schoolId) => {
  try {
    const schools = await getAllSchools();
    return schools.find(s => s.id === schoolId) || null;
  } catch (error) {
    console.error('❌ Error getting school:', error);
    return null;
  }
};

/**
 * Get all schools (cached)
 */
export const getSchoolsList = async () => {
  try {
    return await getAllSchools();
  } catch (error) {
    console.error('❌ Error getting schools list:', error);
    return [];
  }
};

/**
 * Search schools by name or district
 * @param {string} searchTerm - Search query
 * @returns {Promise<Array>} - Matching schools
 */
export const searchSchools = async (searchTerm) => {
  try {
    const schools = await getAllSchools();
    const lowerSearch = searchTerm.toLowerCase();
    
    return schools.filter(school =>
      school.name.toLowerCase().includes(lowerSearch) ||
      school.district.toLowerCase().includes(lowerSearch) ||
      (school.districtName?.en || '').toLowerCase().includes(lowerSearch)
    );

  } catch (error) {
    console.error('❌ Error searching schools:', error);
    return [];
  }
};

/**
 * Update school statistics
 * @param {string} schoolId - School ID
 * @param {string} role - User role
 * @param {number} change - Change amount (default: 1)
 */
const updateSchoolStats = async (schoolId, role, change = 1) => {
  try {
    // This would update Firebase school document
    // For now, we'll just log it
    console.log(`📊 School ${schoolId} stats updated: ${role} ${change > 0 ? '+' : ''}${change}`);

    // TODO: Implement Firebase update when school collection is set up
    // const schoolRef = doc(db, 'schools', schoolId);
    // await updateDoc(schoolRef, {
    //   [`${role}Count`]: increment(change),
    //   updatedAt: serverTimestamp()
    // });

  } catch (error) {
    console.error('❌ Error updating school stats:', error);
  }
};

// ==================== USER QUERIES ====================

/**
 * Get all users from a specific school
 * @param {string} schoolId - School ID
 * @param {string} role - Optional role filter
 * @returns {Promise<Array>} - List of users
 */
export const getUsersBySchool = async (schoolId, role = null) => {
  try {
    let q = query(collection(db, 'users'), where('schoolId', '==', schoolId));
    
    if (role) {
      q = query(q, where('role', '==', role));
    }

    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    console.error('❌ Error getting users by school:', error);
    return [];
  }
};

/**
 * Get students by grade in a school
 * @param {string} schoolId - School ID
 * @param {number} grade - Grade level
 * @returns {Promise<Array>} - List of students
 */
export const getStudentsByGrade = async (schoolId, grade) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('schoolId', '==', schoolId),
      where('role', '==', USER_ROLES.STUDENT),
      where('grade', '==', grade)
    );

    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    console.error('❌ Error getting students by grade:', error);
    return [];
  }
};

/**
 * Get school statistics
 * @param {string} schoolId - School ID
 * @returns {Promise<Object>} - School statistics
 */
export const getSchoolStatistics = async (schoolId) => {
  try {
    const users = await getUsersBySchool(schoolId);
    
    const stats = {
      totalUsers: users.length,
      students: users.filter(u => u.role === USER_ROLES.STUDENT).length,
      teachers: users.filter(u => u.role === USER_ROLES.TEACHER).length,
      parents: users.filter(u => u.role === USER_ROLES.PARENT).length,
      byGrade: {}
    };

    // Count students by grade
    users.filter(u => u.role === USER_ROLES.STUDENT).forEach(student => {
      const grade = student.grade || 5;
      stats.byGrade[grade] = (stats.byGrade[grade] || 0) + 1;
    });

    return stats;

  } catch (error) {
    console.error('❌ Error getting school statistics:', error);
    return null;
  }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get user role display name
 * @param {string} role - User role
 * @param {string} lang - Language code
 * @returns {string} - Display name
 */
export const getRoleDisplayName = (role, lang = 'en') => {
  const roleNames = {
    en: {
      student: 'Student',
      teacher: 'Teacher',
      parent: 'Parent',
      admin: 'Administrator',
      school_admin: 'School Administrator'
    },
    si: {
      student: 'ශිෂ්‍යා',
      teacher: 'ගුරුවරයා',
      parent: 'දෙමාපිය',
      admin: 'පරිපාලක',
      school_admin: 'පාසල් පරිපාලක'
    },
    ta: {
      student: 'மாணவர்',
      teacher: 'ஆசிரியர்',
      parent: 'பெற்றோர்',
      admin: 'நிர்வாகி',
      school_admin: 'பள்ளி நிர்வாகி'
    }
  };

  return roleNames[lang]?.[role] || role;
};

/**
 * Check if user has access to feature
 * @param {Object} userProfile - User profile
 * @param {string} feature - Feature name
 * @returns {boolean} - Has access
 */
export const hasFeatureAccess = (userProfile, feature) => {
  const featureAccess = {
    dashboard: [USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.PARENT, USER_ROLES.ADMIN],
    admin: [USER_ROLES.ADMIN],
    teacher: [USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    parent: [USER_ROLES.PARENT, USER_ROLES.ADMIN],
    schoolDirectory: ['all'], // Everyone can access
    quiz: [USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN],
    games: [USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN]
  };

  const allowedRoles = featureAccess[feature] || [];
  
  if (allowedRoles.includes('all')) return true;
  
  return allowedRoles.includes(userProfile.role);
};

// Export all functions
export default {
  // Auth
  registerUser,
  loginUser,
  signInWithGoogle,
  logoutUser,
  resetPassword,
  
  // Profile
  getUserProfile,
  updateUserProfile,
  changeUserSchool,
  
  // Schools
  getSchoolById,
  getSchoolsList,
  searchSchools,
  
  // Queries
  getUsersBySchool,
  getStudentsByGrade,
  getSchoolStatistics,
  
  // Utilities
  isValidEmail,
  getRoleDisplayName,
  hasFeatureAccess,
  
  // Constants
  USER_ROLES,
  GRADE_LEVELS
};
