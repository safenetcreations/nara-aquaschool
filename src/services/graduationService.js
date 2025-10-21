// src/services/graduationService.js
// Handles graduation flow: transitioning students from AquaSchool to NARA Nexus
// Part of NARA Unified Platform integration

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Graduate a student - Update their type from 'school' to 'both'
 * This allows them to access both AquaSchool (historical data) and Nexus (career platform)
 *
 * @param {string} userId - The UID of the student to graduate
 * @param {Object} additionalData - Optional additional data (grade, year, etc.)
 * @returns {Promise<Object>} Result of graduation
 */
export const graduateStudent = async (userId, additionalData = {}) => {
  try {
    // 1. Get user profile
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    // 2. Check if user is eligible for graduation
    if (userData.type !== 'school') {
      throw new Error(`User type is '${userData.type}'. Can only graduate users with type 'school'`);
    }

    if (userData.isGraduated) {
      throw new Error('User has already graduated');
    }

    // 3. Get school profile to preserve data
    const schoolProfileRef = doc(db, 'schoolProfiles', userId);
    const schoolProfile = await getDoc(schoolProfileRef);

    if (!schoolProfile.exists()) {
      throw new Error('School profile not found');
    }

    const schoolData = schoolProfile.data();

    // 4. Update user to 'both' type (can access both platforms)
    await updateDoc(userRef, {
      type: 'both',
      isGraduated: true,
      graduationDate: serverTimestamp(),
      graduationData: {
        grade: schoolData.grade,
        points: schoolData.points,
        level: schoolData.level,
        badges: schoolData.badges,
        achievements: schoolData.achievements,
        ...additionalData
      },
      updatedAt: serverTimestamp()
    });

    // 5. Create Nexus profile for the graduated student
    const nexusProfileRef = doc(db, 'nexusProfiles', userId);

    const nexusProfile = {
      uid: userId,

      // Carry over relevant data from school
      grade: schoolData.grade,
      interests: schoolData.favoriteTopics || [],
      skills: [],

      // Nexus-specific fields
      university: '',
      department: '',
      phoneNumber: '',
      linkedin: '',
      orcid: '',
      bio: '',

      // Course tracking
      completedCourses: [],
      currentCourses: [],

      // Mentorship
      mentorId: null,
      menteeIds: [],

      // Onboarding
      onboardingComplete: false,

      // Transfer school achievements
      transferredFromSchool: {
        points: schoolData.points,
        level: schoolData.level,
        badges: schoolData.badges,
        achievements: schoolData.achievements,
        stats: schoolData.stats
      },

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(nexusProfileRef, nexusProfile);

    // 6. Update user with reference to nexusProfile
    await updateDoc(userRef, {
      nexusProfile: nexusProfileRef
    });

    // 7. Return success
    return {
      success: true,
      message: 'Student graduated successfully! They can now access NARA Nexus.',
      userId,
      userType: 'both',
      nexusProfileCreated: true,
      graduationDate: new Date(),
      nexusUrl: process.env.REACT_APP_NEXUS_URL || 'https://nexus.nara.ac.lk'
    };
  } catch (error) {
    console.error('Graduation error:', error);
    throw error;
  }
};

/**
 * Check if a student is eligible for graduation
 * Criteria: Grade 12 and completed required modules
 *
 * @param {string} userId - The UID of the student
 * @returns {Promise<Object>} Eligibility status
 */
export const checkGraduationEligibility = async (userId) => {
  try {
    const schoolProfileRef = doc(db, 'schoolProfiles', userId);
    const schoolProfile = await getDoc(schoolProfileRef);

    if (!schoolProfile.exists()) {
      return {
        eligible: false,
        reason: 'School profile not found'
      };
    }

    const data = schoolProfile.data();

    // Check criteria
    const isGrade12 = data.grade === 12 || data.grade === '12';
    const hasMinimumProgress = data.stats?.lessonsCompleted >= 10; // Example criteria

    if (!isGrade12) {
      return {
        eligible: false,
        reason: 'Student must be in Grade 12 to graduate',
        currentGrade: data.grade
      };
    }

    if (!hasMinimumProgress) {
      return {
        eligible: false,
        reason: 'Student has not completed minimum required lessons',
        lessonsCompleted: data.stats?.lessonsCompleted || 0,
        requiredLessons: 10
      };
    }

    return {
      eligible: true,
      message: 'Student is eligible for graduation!',
      grade: data.grade,
      stats: data.stats
    };
  } catch (error) {
    console.error('Error checking graduation eligibility:', error);
    throw error;
  }
};

/**
 * Get graduation status for a user
 *
 * @param {string} userId - The UID of the user
 * @returns {Promise<Object>} Graduation status
 */
export const getGraduationStatus = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();

    return {
      isGraduated: userData.isGraduated || false,
      graduationDate: userData.graduationDate,
      userType: userData.type,
      canAccessNexus: ['graduate', 'both'].includes(userData.type),
      canAccessSchool: ['school', 'both'].includes(userData.type),
      nexusProfile: userData.nexusProfile ? true : false
    };
  } catch (error) {
    console.error('Error getting graduation status:', error);
    throw error;
  }
};

/**
 * Bulk graduate multiple students
 * Useful for graduating entire classes at once
 *
 * @param {Array<string>} userIds - Array of user IDs to graduate
 * @returns {Promise<Object>} Results of bulk graduation
 */
export const bulkGraduateStudents = async (userIds) => {
  const results = {
    successful: [],
    failed: [],
    total: userIds.length
  };

  for (const userId of userIds) {
    try {
      const result = await graduateStudent(userId);
      results.successful.push({
        userId,
        ...result
      });
    } catch (error) {
      results.failed.push({
        userId,
        error: error.message
      });
    }
  }

  return results;
};

export default {
  graduateStudent,
  checkGraduationEligibility,
  getGraduationStatus,
  bulkGraduateStudents
};
