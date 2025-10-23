// School Management Service with Firebase Integration
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { SL_PROVINCES, SL_SCHOOLS_BY_PROVINCE } from '../data/sriLankanSchools';
import { getSchoolsFromExcel, calculateSchoolStatistics } from './schoolExcelService';

// Cache for Excel data
let cachedSchools = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// ==================== SCHOOL SYNC TO FIREBASE ====================

/**
 * Sync all schools from local data to Firebase
 * Run this once to populate Firebase with school data
 */
export const syncSchoolsToFirebase = async () => {
  try {
    const batch = writeBatch(db);
    let schoolCount = 0;

    // Iterate through all provinces
    for (const province of SL_PROVINCES) {
      const provinceData = SL_SCHOOLS_BY_PROVINCE[province.code];
      
      if (!provinceData) continue;

      // Iterate through districts
      for (const district of provinceData.districts) {
        // Iterate through schools
        for (const school of district.schools) {
          const schoolRef = doc(db, 'schools', school.id);
          
          const schoolData = {
            ...school,
            province: province.code,
            provinceName: province.name,
            district: district.code,
            districtName: district.name,
            status: 'active',
            grades: school.grades || '5-10',
            studentCount: 0,
            teacherCount: 0,
            fieldVisitBookings: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          batch.set(schoolRef, schoolData);
          schoolCount++;
        }
      }
    }

    await batch.commit();
    console.log(`✅ Successfully synced ${schoolCount} schools to Firebase`);
    return { success: true, count: schoolCount };
  } catch (error) {
    console.error('Error syncing schools to Firebase:', error);
    throw error;
  }
};

// ==================== GET SCHOOLS ====================

/**
 * Get all schools - Primary source: Excel file, Fallback: Firebase, Final: Static
 */
export const getAllSchools = async () => {
  try {
    // Check cache first
    if (cachedSchools && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      console.log('📦 Using cached school data');
      return cachedSchools;
    }

    // Try to load from Excel file first
    try {
      console.log('📊 Attempting to load schools from Excel file...');
      const excelSchools = await getSchoolsFromExcel();
      
      if (excelSchools && excelSchools.length > 0) {
        console.log(`✅ Loaded ${excelSchools.length} schools from Excel`);
        
        // Cache the results
        cachedSchools = excelSchools;
        cacheTimestamp = Date.now();
        
        return excelSchools;
      }
    } catch (excelError) {
      console.warn('⚠️ Excel load failed:', excelError.message);
    }

    // Fallback to Firebase
    try {
      console.log('📱 Attempting to load schools from Firebase...');
      const schoolsRef = collection(db, 'schools');
      const snapshot = await getDocs(schoolsRef);
      
      if (snapshot && !snapshot.empty) {
        const firebaseSchools = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log(`✅ Loaded ${firebaseSchools.length} schools from Firebase`);

        // Cache Firebase results too
        cachedSchools = firebaseSchools;
        cacheTimestamp = Date.now();

        return firebaseSchools;
      }
    } catch (firebaseError) {
      console.warn('⚠️ Firebase load failed:', firebaseError.message);
    }

    // Last resort: use static data
    console.log('📚 Using static school data (150+ schools)');
    const staticSchools = getStaticSchools();
    
    // Cache static data too
    cachedSchools = staticSchools;
    cacheTimestamp = Date.now();
    
    console.log(`✅ Loaded ${staticSchools.length} schools from static data`);
    return staticSchools;
    
  } catch (error) {
    console.error('❌ Unexpected error getting schools:', error);
    
    // Emergency fallback
    const staticSchools = getStaticSchools();
    console.log(`🆘 Emergency fallback: ${staticSchools.length} static schools`);
    return staticSchools;
  }
};

/**
 * Get static schools from local data (last resort)
 */
const getStaticSchools = () => {
  const schools = [];
  
  for (const province of SL_PROVINCES) {
    const provinceData = SL_SCHOOLS_BY_PROVINCE[province.code];
    if (!provinceData) continue;

    for (const district of provinceData.districts) {
      for (const school of district.schools) {
        schools.push({
          ...school,
          province: province.code,
          provinceName: province.name,
          district: district.code,
          districtName: district.name,
          studentCount: school.studentCount || 0,
          teacherCount: school.teacherCount || 0
        });
      }
    }
  }
  
  console.log(`📚 Static schools loaded: ${schools.length} schools from ${SL_PROVINCES.length} provinces`);
  return schools;
};

/**
 * Get schools by province
 */
export const getSchoolsByProvince = async (provinceCode) => {
  try {
    const schoolsRef = collection(db, 'schools');
    const q = query(schoolsRef, where('province', '==', provinceCode));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting schools by province:', error);
    throw error;
  }
};

/**
 * Get schools by district
 */
export const getSchoolsByDistrict = async (districtCode) => {
  try {
    const schoolsRef = collection(db, 'schools');
    const q = query(schoolsRef, where('district', '==', districtCode));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting schools by district:', error);
    throw error;
  }
};

/**
 * Get school by ID
 */
export const getSchoolById = async (schoolId) => {
  try {
    const schoolRef = doc(db, 'schools', schoolId);
    const schoolDoc = await getDoc(schoolRef);
    
    if (schoolDoc.exists()) {
      return {
        id: schoolDoc.id,
        ...schoolDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting school:', error);
    throw error;
  }
};

/**
 * Search schools by name
 */
export const searchSchools = async (searchTerm) => {
  try {
    const schools = await getAllSchools();
    const lowerSearch = searchTerm.toLowerCase();
    
    return schools.filter(school => 
      school.name.toLowerCase().includes(lowerSearch) ||
      school.districtName.en.toLowerCase().includes(lowerSearch) ||
      school.provinceName.en.toLowerCase().includes(lowerSearch)
    );
  } catch (error) {
    console.error('Error searching schools:', error);
    throw error;
  }
};

/**
 * Clear the school data cache
 */
export const clearSchoolCache = () => {
  cachedSchools = null;
  cacheTimestamp = null;
  console.log('🗑️ School cache cleared');
};

/**
 * Get school statistics
 */
export const getSchoolStatistics = async () => {
  try {
    const schools = await getAllSchools();
    return calculateSchoolStatistics(schools);
  } catch (error) {
    console.error('Error calculating statistics:', error);
    throw error;
  }
};

// ==================== SCHOOL STATISTICS ====================

/**
 * Update school statistics
 */
export const updateSchoolStats = async (schoolId, updates) => {
  try {
    const schoolRef = doc(db, 'schools', schoolId);
    await updateDoc(schoolRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating school stats:', error);
    throw error;
  }
};

/**
 * Increment student count for a school
 */
export const incrementStudentCount = async (schoolId) => {
  try {
    const school = await getSchoolById(schoolId);
    if (school) {
      await updateSchoolStats(schoolId, {
        studentCount: (school.studentCount || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing student count:', error);
    throw error;
  }
};

/**
 * Increment teacher count for a school
 */
export const incrementTeacherCount = async (schoolId) => {
  try {
    const school = await getSchoolById(schoolId);
    if (school) {
      await updateSchoolStats(schoolId, {
        teacherCount: (school.teacherCount || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing teacher count:', error);
    throw error;
  }
};

/**
 * Increment field visit bookings for a school
 */
export const incrementFieldVisitBookings = async (schoolId) => {
  try {
    const school = await getSchoolById(schoolId);
    if (school) {
      await updateSchoolStats(schoolId, {
        fieldVisitBookings: (school.fieldVisitBookings || 0) + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing field visit bookings:', error);
    throw error;
  }
};

// ==================== SCHOOL LEADERBOARD ====================

/**
 * Get top schools by student engagement
 */
export const getTopSchoolsByEngagement = async (limit = 10) => {
  try {
    const schoolsRef = collection(db, 'schools');
    const q = query(
      schoolsRef, 
      orderBy('studentCount', 'desc'),
      limit(limit)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting top schools:', error);
    throw error;
  }
};

/**
 * Get school statistics by province
 */
export const getProvinceStatistics = async () => {
  try {
    const schools = await getAllSchools();
    const stats = {};

    schools.forEach(school => {
      if (!stats[school.province]) {
        stats[school.province] = {
          provinceName: school.provinceName,
          schoolCount: 0,
          studentCount: 0,
          teacherCount: 0,
          fieldVisitBookings: 0
        };
      }

      stats[school.province].schoolCount++;
      stats[school.province].studentCount += school.studentCount || 0;
      stats[school.province].teacherCount += school.teacherCount || 0;
      stats[school.province].fieldVisitBookings += school.fieldVisitBookings || 0;
    });

    return stats;
  } catch (error) {
    console.error('Error getting province statistics:', error);
    throw error;
  }
};

/**
 * Get school statistics by district
 */
export const getDistrictStatistics = async (provinceCode) => {
  try {
    const schools = await getSchoolsByProvince(provinceCode);
    const stats = {};

    schools.forEach(school => {
      if (!stats[school.district]) {
        stats[school.district] = {
          districtName: school.districtName,
          schoolCount: 0,
          studentCount: 0,
          teacherCount: 0,
          fieldVisitBookings: 0
        };
      }

      stats[school.district].schoolCount++;
      stats[school.district].studentCount += school.studentCount || 0;
      stats[school.district].teacherCount += school.teacherCount || 0;
      stats[school.district].fieldVisitBookings += school.fieldVisitBookings || 0;
    });

    return stats;
  } catch (error) {
    console.error('Error getting district statistics:', error);
    throw error;
  }
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Get provinces list
 */
export const getProvinces = () => {
  return SL_PROVINCES;
};

/**
 * Get districts by province
 */
export const getDistrictsByProvince = (provinceCode) => {
  const provinceData = SL_SCHOOLS_BY_PROVINCE[provinceCode];
  return provinceData ? provinceData.districts : [];
};

/**
 * Get schools for selector (formatted for dropdown)
 */
export const getSchoolsForSelector = async (districtCode = null) => {
  try {
    let schools;
    
    if (districtCode) {
      schools = await getSchoolsByDistrict(districtCode);
    } else {
      schools = await getAllSchools();
    }

    return schools.map(school => ({
      id: school.id,
      name: school.name,
      province: school.provinceName.en,
      district: school.districtName.en,
      type: school.type,
      medium: school.medium,
      grades: school.grades
    }));
  } catch (error) {
    console.error('Error getting schools for selector:', error);
    // Fallback to local data if Firebase fails
    return [];
  }
};

export default {
  syncSchoolsToFirebase,
  getAllSchools,
  getSchoolsByProvince,
  getSchoolsByDistrict,
  getSchoolById,
  searchSchools,
  updateSchoolStats,
  incrementStudentCount,
  incrementTeacherCount,
  incrementFieldVisitBookings,
  getTopSchoolsByEngagement,
  getProvinceStatistics,
  getDistrictStatistics,
  getProvinces,
  getDistrictsByProvince,
  getSchoolsForSelector
};
