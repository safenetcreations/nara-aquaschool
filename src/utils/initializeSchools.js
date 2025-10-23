// Utility to Initialize Schools in Firebase
// Run this once to populate Firebase with all Sri Lankan schools data

import { syncSchoolsToFirebase } from '../services/schoolService';

/**
 * Initialize schools in Firebase
 * Call this function from your app initialization or admin panel
 */
export const initializeSchoolsDatabase = async () => {
  console.log('🚀 Starting school database initialization...');
  
  try {
    const result = await syncSchoolsToFirebase();
    
    if (result.success) {
      console.log(`✅ Successfully initialized ${result.count} schools in Firebase!`);
      console.log('📊 Schools are organized by:');
      console.log('   - 9 Provinces');
      console.log('   - 25 Districts');
      console.log('   - 120+ Schools (Grades 5-10)');
      console.log('');
      console.log('🎓 School types included:');
      console.log('   - National Schools');
      console.log('   - Type 1AB Schools');
      console.log('   - Type 1C Schools');
      console.log('   - Private/International Schools');
      console.log('');
      console.log('✨ Features enabled:');
      console.log('   ✓ Student Registration with School Selection');
      console.log('   ✓ Teacher Registration with School Assignment');
      console.log('   ✓ Field Visit Booking by School');
      console.log('   ✓ School-based Leaderboards');
      console.log('   ✓ District & Province Statistics');
      
      return result;
    }
  } catch (error) {
    console.error('❌ Error initializing schools:', error);
    throw error;
  }
};

/**
 * Quick test to verify schools are in Firebase
 */
export const verifySchoolsDatabase = async () => {
  try {
    const { getAllSchools, getProvinceStatistics } = await import('../services/schoolService');
    
    console.log('🔍 Verifying schools database...');
    
    const schools = await getAllSchools();
    const provinceStats = await getProvinceStatistics();
    
    console.log(`✅ Found ${schools.length} schools in Firebase`);
    console.log('📊 Province breakdown:');
    
    Object.entries(provinceStats).forEach(([code, stats]) => {
      console.log(`   ${stats.provinceName.en}: ${stats.schoolCount} schools, ${stats.studentCount} students`);
    });
    
    return { success: true, schoolCount: schools.length };
  } catch (error) {
    console.error('❌ Verification failed:', error);
    return { success: false, error: error.message };
  }
};

// Export for easy import
export default {
  initializeSchoolsDatabase,
  verifySchoolsDatabase
};
