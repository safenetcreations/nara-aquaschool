// src/services/authService.js - Authentication service
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// User roles
export const USER_ROLES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
  PARENT: 'parent',
  SCIENTIST: 'scientist'
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const { 
      email, 
      password, 
      firstName, 
      lastName, 
      role, 
      schoolId, 
      grade,
      language = 'en',
      parentEmail = null 
    } = userData;

    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });

    // Create unified user profile (shared with Nexus via SSO)
    const userProfile = {
      uid: user.uid,
      email: email.toLowerCase(),
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,

      // NARA Unified Platform: User type for SSO access control
      type: 'school', // Can be: 'school', 'graduate', or 'both' (after graduation)

      // App-specific role
      role: role || USER_ROLES.STUDENT,

      // Basic info
      language,
      avatar: null,
      bio: '',

      // Timestamps
      lastActive: serverTimestamp(),
      emailVerified: false,

      // Platform metadata
      isGraduated: false,
      graduationDate: null,

      // References to app-specific profiles
      schoolProfile: null, // Will be set after creating schoolProfile
      nexusProfile: null,  // Will be set when user graduates

      // Preferences
      preferences: {
        notifications: true,
        publicProfile: true,
        shareProgress: true,
        language,
        theme: 'light'
      },

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Save unified user profile to Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);

    // Send email verification
    await sendEmailVerification(user);

    // Create school-specific profile (for students and teachers)
    if (role === USER_ROLES.STUDENT) {
      const schoolProfileRef = await createSchoolProfile(user.uid, {
        grade,
        schoolId,
        role: USER_ROLES.STUDENT
      });

      // Update user document with reference to schoolProfile
      await updateDoc(doc(db, 'users', user.uid), {
        schoolProfile: schoolProfileRef
      });
    }

    // If teacher, create school profile for teachers
    if (role === USER_ROLES.TEACHER) {
      const schoolProfileRef = await createSchoolProfile(user.uid, {
        schoolId,
        role: USER_ROLES.TEACHER
      });

      await updateDoc(doc(db, 'users', user.uid), {
        schoolProfile: schoolProfileRef
      });
    }

    return {
      success: true,
      user,
      userProfile,
      message: 'Registration successful! Please verify your email.'
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Sign in user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update last active
    await updateDoc(doc(db, 'users', user.uid), {
      lastActive: serverTimestamp()
    });
    
    // Get user profile
    const userProfile = await getUserProfile(user.uid);
    
    return {
      success: true,
      user,
      userProfile,
      message: 'Login successful!'
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Google sign in
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user profile exists
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new unified profile for Google users
      const names = user.displayName?.split(' ') || ['', ''];
      const userProfile = {
        uid: user.uid,
        email: user.email.toLowerCase(),
        firstName: names[0] || '',
        lastName: names[names.length - 1] || '',
        displayName: user.displayName || '',

        // NARA Unified Platform: User type for SSO
        type: 'school',

        // App-specific role
        role: USER_ROLES.STUDENT,

        // Basic info
        avatar: user.photoURL || null,
        bio: '',
        language: 'en',

        // Timestamps
        lastActive: serverTimestamp(),
        emailVerified: true,

        // Platform metadata
        isGraduated: false,
        graduationDate: null,

        // References
        schoolProfile: null,
        nexusProfile: null,

        preferences: {
          notifications: true,
          publicProfile: true,
          shareProgress: true,
          language: 'en',
          theme: 'light'
        },

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);

      // Create school profile
      const schoolProfileRef = await createSchoolProfile(user.uid, {
        role: USER_ROLES.STUDENT
      });

      // Update user with profile reference
      await updateDoc(doc(db, 'users', user.uid), {
        schoolProfile: schoolProfileRef
      });
      
      return {
        success: true,
        user,
        userProfile,
        isNewUser: true,
        message: 'Welcome! Please complete your profile.'
      };
    } else {
      // Update last active for existing users
      await updateDoc(doc(db, 'users', user.uid), {
        lastActive: serverTimestamp()
      });
      
      const userProfile = userDoc.data();
      
      return {
        success: true,
        user,
        userProfile,
        isNewUser: false,
        message: 'Welcome back!'
      };
    }
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
};

// Sign out user
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Signed out successfully!'
    };
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent! Check your inbox.'
    };
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User profile not found');
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (uid, updates) => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Profile updated successfully!'
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Create school profile (unified for students and teachers)
// Uses 'schoolProfiles' collection for NARA unified architecture
const createSchoolProfile = async (uid, data) => {
  try {
    const schoolProfile = {
      uid,
      role: data.role,

      // Student-specific fields
      grade: data.grade || null,
      schoolId: data.schoolId || null,
      classId: null,
      subjects: [],
      completedModules: [],
      currentModules: [],
      favoriteTopics: [],
      learningPath: 'general',

      // Progress tracking
      points: 0,
      level: 1,
      badges: [],
      achievements: [],
      streak: 0,

      stats: {
        lessonsCompleted: 0,
        quizzesTaken: 0,
        challengesCompleted: 0,
        citizenScienceContributions: 0,
        totalTimeSpent: 0,
        speciesIdentified: 0
      },

      progressTracking: {
        marineLife: 0,
        freshwater: 0,
        heritage: 0,
        naraScience: 0
      },

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Save to schoolProfiles collection (not 'students')
    const profileRef = doc(db, 'schoolProfiles', uid);
    await setDoc(profileRef, schoolProfile);

    return profileRef; // Return reference for linking to user doc
  } catch (error) {
    console.error('Error creating school profile:', error);
    throw error;
  }
};

// Create teacher profile
const createTeacherProfile = async (uid, data) => {
  try {
    const teacherProfile = {
      uid,
      schoolId: data.schoolId || null,
      subjects: [],
      classes: [],
      students: [],
      resources: [],
      lessons: [],
      verified: false,
      specializations: [],
      createdAt: serverTimestamp()
    };
    
    await setDoc(doc(db, 'teachers', uid), teacherProfile);
    return teacherProfile;
  } catch (error) {
    console.error('Error creating teacher profile:', error);
    throw error;
  }
};

// Check if user is admin
export const isUserAdmin = async (uid) => {
  try {
    const userProfile = await getUserProfile(uid);
    return userProfile.role === USER_ROLES.ADMIN;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Check if user is teacher
export const isUserTeacher = async (uid) => {
  try {
    const userProfile = await getUserProfile(uid);
    return userProfile.role === USER_ROLES.TEACHER;
  } catch (error) {
    console.error('Error checking teacher status:', error);
    return false;
  }
};

// Get users by school
export const getUsersBySchool = async (schoolId) => {
  try {
    const q = query(collection(db, 'users'), where('schoolId', '==', schoolId));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  } catch (error) {
    console.error('Error fetching users by school:', error);
    throw error;
  }
};

// Auth state listener
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  registerUser,
  signInUser,
  signInWithGoogle,
  signOutUser,
  resetPassword,
  getUserProfile,
  updateUserProfile,
  isUserAdmin,
  isUserTeacher,
  getUsersBySchool,
  onAuthChange,
  USER_ROLES
};
