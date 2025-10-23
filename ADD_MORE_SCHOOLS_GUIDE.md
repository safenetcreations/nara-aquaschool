# 📚 **How to Add More Schools to the Directory**

## 📊 **Current Status**

- **Loaded Schools**: 95 schools
- **Data Source**: Static data (`src/data/sriLankanSchools.js`)
- **Coverage**: 9 provinces, 25+ districts

---

## 🎯 **3 Methods to Add More Schools**

### **Method 1: Edit Static Data File** ⭐ (Easiest & Fastest)

**Best for**: Adding 5-100 schools quickly

#### **File Location**:
```
src/data/sriLankanSchools.js
```

#### **Steps**:

1. **Open the file** in your editor

2. **Find the district** where you want to add schools

3. **Add school entries** in this format:
```javascript
{
  id: 'province-district-###',  // Unique ID
  name: 'School Full Name',     // Official school name
  type: 'National',              // National, 1AB, 1C, Type 2, Private
  grades: '1-13',                // Grade range
  medium: ['Sinhala', 'English'] // Teaching languages
}
```

#### **Example - Adding schools to Colombo**:

```javascript
{
  code: 'COL',
  name: { en: 'Colombo', si: 'කොළඹ', ta: 'கொழும்பு' },
  schools: [
    // Existing schools...
    { id: 'wp-col-095', name: 'Royal College', type: 'National', grades: '1-13', medium: ['Sinhala', 'English'] },
    
    // ADD NEW SCHOOLS HERE:
    { id: 'wp-col-096', name: 'Devi Balika Vidyalaya', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
    { id: 'wp-col-097', name: 'Mahanama College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
    { id: 'wp-col-098', name: 'Zahira College', type: '1AB', grades: '1-13', medium: ['Sinhala', 'English'] },
    { id: 'wp-col-099', name: 'Isipathana College', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
    { id: 'wp-col-100', name: 'St. Thomas\' College', type: 'National', grades: '1-13', medium: ['English'] }
  ]
}
```

4. **Save the file**

5. **Refresh browser** - Changes appear immediately!

#### **School Types**:
- `National` - National schools (top tier)
- `1AB` - Type 1AB schools
- `1C` - Type 1C schools
- `Type 2` - Type 2 schools
- `Private` - Private schools

#### **ID Format**:
- `{province}-{district}-{number}`
- Example: `wp-col-096` = Western Province, Colombo, School #96

---

### **Method 2: Upload Excel File** 📊

**Best for**: Bulk uploads of 100+ schools from existing data

#### **Requirements**:
- Excel file (.xlsx format)
- Specific column headers

#### **Excel Format**:

| School ID | School Name | Type | Province | District | Grades | Medium | Students | Address | Phone |
|-----------|-------------|------|----------|----------|--------|--------|----------|---------|-------|
| wp-col-096 | Devi Balika | 1AB | Western | Colombo | 1-13 | Sinhala | 1500 | Colombo 8 | 011-234-5678 |

#### **Steps**:

1. **Prepare Excel file**:
   - Name: `Tbl20200101.xlsx`
   - Add all required columns
   - Fill in school data

2. **Upload to Firebase Storage**:
   ```
   Firebase Console → Storage → Upload File
   ```

3. **Set Storage Rules** (Firebase Console → Storage → Rules):
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /Tbl20200101.xlsx {
         allow read: if request.auth != null;
       }
     }
   }
   ```

4. **Restart your app** - It will automatically load from Excel!

#### **Expected Log Output**:
```
✅ Successfully loaded schools from Excel: 250 schools
```

---

### **Method 3: Upload to Firebase Firestore** 🔥

**Best for**: Dynamic school management, real-time updates

#### **Steps**:

1. **Get Firebase Admin SDK credentials**:
   - Go to: https://console.firebase.google.com/
   - Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `scripts/serviceAccountKey.json`

2. **Install Firebase Admin**:
   ```bash
   npm install firebase-admin --save-dev
   ```

3. **Run upload script**:
   ```bash
   node scripts/uploadSchoolsToFirestore.js
   ```

4. **Expected output**:
   ```
   📤 Starting school upload to Firestore...
   📍 Processing province: WP
     📍 District: Colombo
       Uploaded: 95 schools
   ✅ Successfully uploaded 95 schools to Firestore!
   ```

5. **Update Firestore Rules** (Firebase Console → Firestore → Rules):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /schools/{schoolId} {
         allow read: if true; // Public read
         allow write: if request.auth != null; // Auth required for write
       }
     }
   }
   ```

6. **Schools now load from Firestore automatically!**

---

## 🔄 **Data Loading Priority**

The app tries to load schools in this order:

```
1. Excel File (Firebase Storage)
   ↓ (if fails)
2. Firebase Firestore
   ↓ (if empty)
3. Static Data (always available as fallback)
```

---

## 📝 **Adding a New District**

If you need to add schools from a district not in the list:

```javascript
{
  code: 'NEW',  // 3-letter district code
  name: { 
    en: 'New District', 
    si: 'නව දිස්ත්‍රික්කය', 
    ta: 'புதிய மாவட்டம்' 
  },
  schools: [
    { id: 'wp-new-001', name: 'School Name', type: '1AB', grades: '1-13', medium: ['Sinhala'] },
    { id: 'wp-new-002', name: 'School Name 2', type: '1C', grades: '1-11', medium: ['Tamil'] }
  ]
}
```

---

## 🗺️ **Adding GPS Coordinates**

To show schools at exact locations on the map:

1. **Find coordinates**: Use Google Maps
2. **Add to school object**:
```javascript
{
  id: 'wp-col-096',
  name: 'Devi Balika Vidyalaya',
  type: '1AB',
  grades: '1-13',
  medium: ['Sinhala'],
  coordinates: {
    lat: 6.8977,
    lng: 79.8627
  }
}
```

3. **Map will show exact pin** instead of district center!

---

## ✅ **Verification**

After adding schools, check browser console:

```
✅ Loaded 150 schools from static data
📚 Static schools loaded: 150 schools from 9 provinces
```

And in School Directory:
- Grid view should show new count
- Map should show all schools
- Filters should include new districts

---

## 📊 **Recommended Approach**

**For Sri Lankan Schools Directory**:

1. **Phase 1**: Add ~20-30 top schools per district to static data
   - Quick and immediate
   - Total: 500-750 schools

2. **Phase 2**: Prepare complete Excel file
   - All government schools (~10,000)
   - Upload to Firebase Storage

3. **Phase 3**: Enable Firestore for dynamic updates
   - Admin can add/edit schools
   - Real-time sync

---

## 🎯 **Quick Start: Add 100 More Schools**

```bash
# 1. Open static data file
code src/data/sriLankanSchools.js

# 2. Add schools to each district
# - Colombo: Add 20 more (currently 15)
# - Gampaha: Add 15 more
# - Kandy: Add 20 more
# - Galle: Add 15 more
# - Jaffna: Add 15 more
# - Batticaloa: Add 15 more

# 3. Save and refresh browser
# Total: ~195 schools!
```

---

## 🆘 **Need School Data?**

**Sources for Sri Lankan school information**:
- Ministry of Education: https://www.moe.gov.lk/
- Provincial Education Departments
- School Census Data
- Educational Publications Bureau

---

## 📞 **Support**

If you need help adding schools:
1. Check console for errors
2. Verify ID format is unique
3. Ensure required fields are filled
4. Test with 1-2 schools first

---

**File**: `ADD_MORE_SCHOOLS_GUIDE.md`  
**Version**: 1.0.0  
**Updated**: 2025-01-22
