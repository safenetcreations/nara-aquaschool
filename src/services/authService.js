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

    // Create user profile in Firestore
    const userProfile = {
      uid: user.uid,
      email: email.toLowerCase(),
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      role: role || USER_ROLES.STUDENT,
      schoolId: schoolId || null,
      grade: grade || null,
      language,
      parentEmail,
      avatar: null,
      bio: '',
      points: 0,
      level: 1,
      badges: [],
      achievements: [],
      streak: 0,
      lastActive: serverTimestamp(),
      emailVerified: false,
      schoolVerified: false,
      preferences: {
        notifications: true,
        publicProfile: true,
        shareProgress: true,
        language,
        theme: 'light'
      },
      stats: {
        lessonsCompleted: 0,
        quizzesTaken: 0,
        challengesCompleted: 0,
        citizenScienceContributions: 0,
        totalTimeSpent: 0,
        speciesIdentified: 0
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Save user profile to Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);

    // Send email verification
    await sendEmailVerification(user);

    // If student, create student-specific collection
    if (role === USER_ROLES.STUDENT) {
      await createStudentProfile(user.uid, { grade, schoolId });
    }

    // If teacher, create teacher-specific collection
    if (role === USER_ROLES.TEACHER) {
      await createTeacherProfile(user.uid, { schoolId });
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
      // Create new profile for Google users
      const names = user.displayName?.split(' ') || ['', ''];
      const userProfile = {
        uid: user.uid,
        email: user.email.toLowerCase(),
        firstName: names[0] || '',
        lastName: names[names.length - 1] || '',
        displayName: user.displayName || '',
        role: USER_ROLES.STUDENT,
        avatar: user.photoURL || null,
        points: 0,
        level: 1,
        badges: [],
        achievements: [],
        streak: 0,
        language: 'en',
        emailVerified: true,
        schoolVerified: false,
        lastActive: serverTimestamp(),
        preferences: {
          notifications: true,
          publicProfile: true,
          shareProgress: true,
          language: 'en',
          theme: 'light'
        },
        stats: {
          lessonsCompleted: 0,
          quizzesTaken: 0,
          challengesCompleted: 0,
          citizenScienceContributions: 0,
          totalTimeSpent: 0,
          speciesIdentified: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      
      // Create student profile
      await createStudentProfile(user.uid, {});
      
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

// Create student profile
const createStudentProfile = async (uid, data) => {
  try {
    const studentProfile = {
      uid,
      grade: data.grade || null,
      schoolId: data.schoolId || null,
      classId: null,
      subjects: [],
      completedModules: [],
      currentModules: [],
      favoriteTopics: [],
      learningPath: 'general',
      progressTracking: {
        marineLife: 0,
        freshwater: 0,
        heritage: 0,
        naraScience: 0
      },
      createdAt: serverTimestamp()
    };
    
    await setDoc(doc(db, 'students', uid), studentProfile);
    return studentProfile;
  } catch (error) {
    console.error('Error creating student profile:', error);
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
