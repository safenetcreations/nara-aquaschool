# 🚀 NARA Platform Integration - Quick Setup Guide

**Goal:** Connect AquaSchool + Nexus to ONE Firebase project with Single Sign-On

---

## 📋 Prerequisites

- [ ] Node.js 16+ installed
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Git installed
- [ ] Firebase account

---

## ⚡ Quick Start (15 Minutes)

### Step 1: Create Firebase Project (5 min)

```bash
# 1. Login to Firebase
firebase login

# 2. Create new project
firebase projects:create nara-platform

# 3. Select the project
firebase use nara-platform

# 4. Open Firebase Console
# Go to: https://console.firebase.google.com
```

### Step 2: Enable Firebase Services (5 min)

In Firebase Console (https://console.firebase.google.com/project/nara-platform):

**Authentication:**
1. Click "Authentication" → "Get started"
2. Enable "Email/Password"
3. Enable "Google" (optional but recommended)
4. Go to "Settings" → "Authorized domains"
5. Add: `aquaschool.nara.ac.lk`, `nexus.nara.ac.lk`, `localhost`

**Firestore Database:**
1. Click "Firestore Database" → "Create database"
2. Select "Start in production mode"
3. Choose location: "asia-south1" (Mumbai - closest to Sri Lanka)
4. Click "Enable"

**Cloud Storage:**
1. Click "Storage" → "Get started"
2. Select "Start in production mode"
3. Location: "asia-south1"
4. Click "Done"

**Firebase Hosting:**
1. Click "Hosting" → "Get started"
2. Follow the wizard (we'll configure later)

### Step 3: Get Firebase Credentials (2 min)

1. In Firebase Console, click gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps"
3. Click "Web" icon (</>) → "Add app"
4. Register app name: "NARA Platform"
5. **Copy the configuration** - you'll need this!

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nara-platform.firebaseapp.com",
  projectId: "nara-platform",
  storageBucket: "nara-platform.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123...",
  measurementId: "G-..."
};
```

### Step 4: Configure AquaSchool (3 min)

```bash
# Navigate to AquaSchool
cd /Users/nanthan/Desktop/nara-aquaschool-main

# Create .env file
cat > .env << 'EOF'
# NARA Unified Platform - AquaSchool Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=nara-platform.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=nara-platform
REACT_APP_FIREBASE_STORAGE_BUCKET=nara-platform.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
REACT_APP_FIREBASE_DATABASE_URL=https://nara-platform-default-rtdb.firebaseio.com
REACT_APP_USE_EMULATORS=false

# Nexus URL (for cross-app links)
REACT_APP_NEXUS_URL=https://nexus.nara.ac.lk
EOF

# Replace the placeholder values with your actual Firebase config
```

### Step 5: Configure Nexus (3 min)

```bash
# Navigate to Nexus
cd /Users/nanthan/Desktop/nara-aquaschool-main/nara-nexus

# Create .env file
cat > .env << 'EOF'
# NARA Unified Platform - Nexus Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=nara-platform.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=nara-platform
REACT_APP_FIREBASE_STORAGE_BUCKET=nara-platform.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

# AquaSchool URL (for cross-app links)
REACT_APP_AQUASCHOOL_URL=https://aquaschool.nara.ac.lk
EOF

# Replace the placeholder values with your actual Firebase config
# NOTE: Use the SAME credentials as AquaSchool!
```

**CRITICAL:** Both apps MUST use the EXACT SAME Firebase config!

---

## 🔧 Detailed Setup

### Update Firebase Config Files

#### AquaSchool
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main
```

Edit `src/config/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

#### Nexus
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main/nara-nexus
```

Edit `src/config/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.REACT_APP_FIREBASE_APP_ID!,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

---

## 🗄️ Deploy Security Rules

```bash
# From project root
cd /Users/nanthan/Desktop/nara-aquaschool-main

# Deploy unified security rules
firebase deploy --only firestore:rules --project nara-platform

# You should see:
# ✔  Deploy complete!
```

---

## 🔥 Deploy to Firebase Hosting

### Option 1: Deploy Both Apps

```bash
# Build AquaSchool
cd /Users/nanthan/Desktop/nara-aquaschool-main
npm install
npm run build

# Build Nexus
cd nara-nexus
npm install --legacy-peer-deps
npm run build

# Deploy both
cd ..
firebase deploy --only hosting
```

### Option 2: Deploy Separately

```bash
# Deploy only AquaSchool
firebase deploy --only hosting:aquaschool

# Deploy only Nexus
firebase deploy --only hosting:nexus
```

---

## ✅ Verify Setup

### Test 1: AquaSchool Authentication
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main
npm start

# 1. Go to http://localhost:3000
# 2. Click Register
# 3. Create student account
# 4. Check Firebase Console → Authentication
# 5. User should appear!
```

### Test 2: Nexus Authentication
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main/nara-nexus
npm start

# 1. Go to http://localhost:3000
# 2. Use SAME login from AquaSchool
# 3. Should auto-login (SSO works!)
```

### Test 3: Firestore Rules
```bash
# In browser console (either app):
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

// This should work (user creating their own profile)
await addDoc(collection(db, 'users'), {
  uid: auth.currentUser.uid,
  email: auth.currentUser.email,
  type: 'school'
});

# Check Firebase Console → Firestore
# Document should be created!
```

---

## 🎓 Create Sample Users

### School Student
```javascript
// Register in AquaSchool at /register
{
  email: "student@test.com",
  password: "Test123!",
  firstName: "Saman",
  lastName: "Perera",
  grade: 10,
  role: "student"
}

// Firestore will create:
users/uid → { type: 'school', ... }
schoolProfiles/uid → { grade: 10, points: 0, ... }
```

### Graduate
```typescript
// Register in Nexus at /register
{
  email: "graduate@test.com",
  password: "Test123!",
  firstName: "Nimal",
  lastName: "Silva",
  accountType: "student" // Will become 'graduate'
}

// Firestore will create:
users/uid → { type: 'graduate', ... }
nexusProfiles/uid → { interests: [], ... }
```

---

## 🐛 Troubleshooting

### Issue: "Firebase config not found"
**Solution:** Make sure .env file exists and has correct values

```bash
# Check if .env exists
ls -la .env

# View contents (be careful - contains secrets!)
cat .env

# Make sure REACT_APP_FIREBASE_* variables are set
```

### Issue: "Permission denied" in Firestore
**Solution:** Check security rules are deployed

```bash
# Redeploy rules
firebase deploy --only firestore:rules

# Check rules in Firebase Console
# Firestore Database → Rules tab
```

### Issue: "User can login to AquaSchool but not Nexus"
**Solution:** Check user.type field

```javascript
// In Firebase Console → Firestore → users → {userId}
// Make sure 'type' field is:
// - 'school' (can access AquaSchool only)
// - 'graduate' (can access Nexus only)
// - 'both' (can access both!)

// Update manually:
{
  type: "both"  // Change this
}
```

### Issue: "Apps using different Firebase projects"
**Solution:** Both apps MUST use same config!

```bash
# Check AquaSchool
cat /Users/nanthan/Desktop/nara-aquaschool-main/.env | grep PROJECT_ID

# Check Nexus
cat /Users/nanthan/Desktop/nara-aquaschool-main/nara-nexus/.env | grep PROJECT_ID

# Both should show: nara-platform
```

---

## 📊 Monitoring

### Firebase Console
https://console.firebase.google.com/project/nara-platform

**Check:**
- Authentication → Users (see all users)
- Firestore Database → Data (see all collections)
- Storage → Files (see uploaded files)
- Hosting → Sites (see deployed apps)
- Analytics → Dashboard (see usage)

### Logs
```bash
# View Firebase logs
firebase functions:log

# View hosting logs
firebase hosting:channel:open <channel-name>
```

---

## 🎯 Next Steps

After basic setup works:

1. [ ] Add graduation flow (update user.type from 'school' to 'both')
2. [ ] Create landing page (nara.ac.lk)
3. [ ] Set up custom domains
4. [ ] Enable analytics
5. [ ] Add error monitoring (Sentry)
6. [ ] Set up CI/CD
7. [ ] Create admin dashboard
8. [ ] Populate initial data (species, courses, etc.)

---

## 📞 Need Help?

**Firebase Issues:**
- Docs: https://firebase.google.com/docs
- Console: https://console.firebase.google.com
- Support: https://firebase.google.com/support

**App Issues:**
- Check browser console for errors
- Check Network tab for failed requests
- Review Firestore rules
- Check .env file configuration

---

**Setup Time:** 15-30 minutes
**Status:** Ready to Deploy
**Last Updated:** October 18, 2025
