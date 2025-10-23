// Script to upload schools from static data to Firebase Firestore
// Run: node scripts/uploadSchoolsToFirestore.js

const admin = require('firebase-admin');
const { SL_SCHOOLS_BY_PROVINCE } = require('../src/data/sriLankanSchools');

// Initialize Firebase Admin (you'll need to add your service account key)
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'nara-aquaschool'
});

const db = admin.firestore();

async function uploadSchools() {
  console.log('📤 Starting school upload to Firestore...');
  
  let totalUploaded = 0;
  const batch = db.batch();

  // Iterate through provinces
  for (const [provinceCode, provinceData] of Object.entries(SL_SCHOOLS_BY_PROVINCE)) {
    console.log(`\n📍 Processing province: ${provinceCode}`);
    
    // Iterate through districts
    for (const district of provinceData.districts) {
      console.log(`  📍 District: ${district.name.en}`);
      
      // Iterate through schools
      for (const school of district.schools) {
        const schoolData = {
          id: school.id,
          name: school.name,
          type: school.type,
          province: provinceCode,
          district: district.code,
          districtName: district.name.en,
          grades: school.grades,
          medium: school.medium,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };

        const schoolRef = db.collection('schools').doc(school.id);
        batch.set(schoolRef, schoolData);
        totalUploaded++;
        
        process.stdout.write(`\r    Uploaded: ${totalUploaded} schools`);
      }
    }
  }

  // Commit the batch
  console.log('\n\n⏳ Committing batch to Firestore...');
  await batch.commit();
  
  console.log(`\n✅ Successfully uploaded ${totalUploaded} schools to Firestore!`);
  console.log('🎉 School directory is now live in Firebase!');
  
  process.exit(0);
}

// Run the upload
uploadSchools().catch(error => {
  console.error('❌ Error uploading schools:', error);
  process.exit(1);
});
