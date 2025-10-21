# ✅ NARA Platform - Deployment Checklist

**Use this checklist to track your deployment progress**

---

## 📋 Pre-Deployment Setup

### Prerequisites
- [ ] Node.js 16+ installed ✓ (v22.16.0 detected)
- [ ] npm installed ✓ (10.9.2 detected)
- [ ] Firebase CLI installed (run: `npm install -g firebase-tools`)
- [ ] Git repository clean

### File Structure
- [x] `.env.example` created
- [x] `nara-nexus/.env.example` created
- [x] `firebase.json` configured for multi-site
- [x] `firestore.unified.rules` created
- [x] `setup-firebase.sh` created
- [x] `src/services/graduationService.js` created

### Code Integration
- [x] AquaSchool auth service updated for unified model
- [x] Nexus auth context updated for unified model
- [x] Both apps use `nara-platform` project ID
- [x] Security rules include SSO functions
- [x] Graduation flow implemented

---

## 🔥 Firebase Project Setup

### Step 1: Create Firebase Project
- [ ] Go to https://console.firebase.google.com
- [ ] Click "Add project"
- [ ] Project name: `NARA Platform`
- [ ] Project ID: `nara-platform` (or note your ID: _____________)
- [ ] Enable/Skip Analytics (your choice)
- [ ] Click "Create project"

### Step 2: Enable Services

#### Authentication
- [ ] Go to Authentication → Get started
- [ ] Enable "Email/Password" sign-in method
- [ ] Enable "Google" sign-in method
- [ ] Settings → Authorized domains → Add:
  - [ ] `localhost`
  - [ ] `aquaschool.nara.ac.lk`
  - [ ] `nexus.nara.ac.lk`

#### Firestore Database
- [ ] Go to Firestore Database → Create database
- [ ] Select "Production mode"
- [ ] Choose location: **asia-south1** (Mumbai - closest to Sri Lanka)
- [ ] Click "Enable"

#### Cloud Storage
- [ ] Go to Storage → Get started
- [ ] Select "Production mode"
- [ ] Choose location: **asia-south1**
- [ ] Click "Done"

#### Hosting
- [ ] Go to Hosting → Get started
- [ ] Follow wizard steps
- [ ] Click "Finish"

### Step 3: Get Firebase Credentials
- [ ] Click ⚙️ (Settings) → Project settings
- [ ] Scroll to "Your apps"
- [ ] Click Web icon (</>) → Add app
- [ ] App nickname: `NARA Platform`
- [ ] Check "Also set up Firebase Hosting"
- [ ] Click "Register app"
- [ ] **Copy the configuration** ← IMPORTANT!

**Your Firebase Config:**
```javascript
apiKey: ___________________________
authDomain: nara-platform.firebaseapp.com
projectId: nara-platform
storageBucket: nara-platform.appspot.com
messagingSenderId: _______________
appId: ____________________________
measurementId: ____________________
```

---

## ⚙️ Environment Configuration

### Create .env for AquaSchool
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main
cp .env.example .env
nano .env
```

- [ ] File created
- [ ] `REACT_APP_FIREBASE_API_KEY` set
- [ ] `REACT_APP_FIREBASE_AUTH_DOMAIN` set
- [ ] `REACT_APP_FIREBASE_PROJECT_ID` set to `nara-platform`
- [ ] `REACT_APP_FIREBASE_STORAGE_BUCKET` set
- [ ] `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` set
- [ ] `REACT_APP_FIREBASE_APP_ID` set
- [ ] `REACT_APP_FIREBASE_MEASUREMENT_ID` set
- [ ] File saved

### Create .env for Nexus
```bash
cp nara-nexus/.env.example nara-nexus/.env
nano nara-nexus/.env
```

- [ ] File created
- [ ] **SAME credentials as AquaSchool** ← CRITICAL!
- [ ] All Firebase variables match AquaSchool
- [ ] File saved

### Verify Configuration
```bash
# Both should show same project ID
grep "PROJECT_ID" .env
grep "PROJECT_ID" nara-nexus/.env
```

- [ ] Both files have `nara-platform` as project ID

---

## 🚀 Local Testing

### Install Dependencies
```bash
# AquaSchool
npm install

# Nexus
cd nara-nexus
npm install --legacy-peer-deps
cd ..
```

- [ ] AquaSchool dependencies installed
- [ ] Nexus dependencies installed
- [ ] No errors during installation

### Deploy Security Rules
```bash
firebase login
firebase use nara-platform
firebase deploy --only firestore:rules
```

- [ ] Logged into Firebase
- [ ] Security rules deployed successfully
- [ ] No compilation errors

### Start Both Apps Locally

**Terminal 1 - AquaSchool:**
```bash
npm start
```
- [ ] Starts at http://localhost:3000
- [ ] No console errors
- [ ] App loads correctly

**Terminal 2 - Nexus:**
```bash
cd nara-nexus
PORT=3001 npm start
```
- [ ] Starts at http://localhost:3001
- [ ] No console errors
- [ ] App loads correctly

### Test SSO Locally

**Register in AquaSchool:**
- [ ] Go to http://localhost:3000
- [ ] Register new user: `test@test.com` / `Test123!`
- [ ] Registration successful
- [ ] User logged in

**Check Firebase:**
- [ ] Go to Firebase Console → Authentication
- [ ] User `test@test.com` appears
- [ ] Note UID: _____________________

**Check Firestore:**
- [ ] Go to Firebase Console → Firestore
- [ ] Collection `users/{uid}` exists
- [ ] Field `type` = `"school"`
- [ ] Collection `schoolProfiles/{uid}` exists

**Login to Nexus:**
- [ ] Go to http://localhost:3001
- [ ] Login with `test@test.com` / `Test123!`
- [ ] Login successful (SSO works!)
- [ ] User authenticated

**Test Cross-App Logout:**
- [ ] Logout from AquaSchool
- [ ] Refresh Nexus tab
- [ ] Also logged out (SSO works!)

---

## 📦 Production Build

### Build Both Applications
```bash
# Build AquaSchool
npm run build

# Build Nexus
cd nara-nexus
npm run build
cd ..
```

- [ ] AquaSchool build completed
- [ ] Folder `build/` created with files
- [ ] Nexus build completed
- [ ] Folder `nara-nexus/build/` created with files
- [ ] No build errors

---

## 🌐 Firebase Deployment

### Configure Hosting Targets
```bash
# Create .firebaserc
cat > .firebaserc << 'EOF'
{
  "projects": {
    "default": "nara-platform"
  },
  "targets": {
    "nara-platform": {
      "hosting": {
        "aquaschool": ["aquaschool"],
        "nexus": ["nexus"]
      }
    }
  }
}
EOF
```

- [ ] `.firebaserc` created
- [ ] Hosting targets configured

### Deploy to Firebase
```bash
firebase deploy --project nara-platform
```

- [ ] Firestore rules deployed
- [ ] AquaSchool hosting deployed
- [ ] Nexus hosting deployed
- [ ] No deployment errors

**Note your URLs:**
- AquaSchool: https://aquaschool-________________.web.app
- Nexus: https://nexus-________________.web.app

---

## ✅ Production Testing

### Test Production AquaSchool
- [ ] Visit production URL
- [ ] App loads without errors
- [ ] Register new user: `prod-test@test.com`
- [ ] Registration successful

### Test Production Nexus
- [ ] Visit production URL
- [ ] App loads without errors
- [ ] Login with `prod-test@test.com`
- [ ] Login successful (SSO works in production!)

### Test Graduation Flow

**Via Browser Console:**
```javascript
// On AquaSchool production site
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const db = getFirestore();
const userId = 'your-user-id-here';

// Update user to graduated
await updateDoc(doc(db, 'users', userId), {
  type: 'both',
  isGraduated: true
});
```

- [ ] User type updated to `"both"`
- [ ] Can now access Nexus features
- [ ] AquaSchool data retained

### Test Security Rules

**School user blocked from Nexus internships:**
- [ ] Login as school user
- [ ] Try to access Nexus internships
- [ ] Permission denied ✓

**Graduate blocked from school quizzes:**
- [ ] Login as graduate user
- [ ] Try to access AquaSchool quizzes
- [ ] Permission denied ✓

**Graduated user has full access:**
- [ ] Login as user with `type: "both"`
- [ ] Can access AquaSchool ✓
- [ ] Can access Nexus ✓

---

## 🎯 Post-Deployment

### Monitor Performance
- [ ] Check Firebase Console → Usage and billing
- [ ] Set budget alert at $10/month
- [ ] Enable Performance Monitoring
- [ ] Check Analytics dashboard

### Set Up Custom Domains (Optional)
- [ ] Firebase Console → Hosting → Add custom domain
- [ ] Add `aquaschool.nara.ac.lk`
- [ ] Add `nexus.nara.ac.lk`
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (up to 24 hours)

### Create Admin User
- [ ] Go to Firestore → users collection
- [ ] Find your user document
- [ ] Add field: `role: "admin"`
- [ ] Add field: `type: "both"`

### Documentation
- [ ] Share deployment URLs with team
- [ ] Document any custom configurations
- [ ] Create user guide for graduates
- [ ] Create admin guide for managing users

---

## 🎉 Deployment Complete!

**Your NARA Platform is LIVE!**

- ✅ Single Sign-On working
- ✅ Type-based access control enforced
- ✅ Multi-site hosting deployed
- ✅ Security rules protecting data
- ✅ Graduation flow ready

**Next Steps:**
1. Create UI for graduation banner (Grade 12 students)
2. Build onboarding flow for graduates
3. Implement automated graduation
4. Add analytics tracking
5. Create admin dashboard

---

## 📊 Deployment Statistics

| Metric | Value |
|--------|-------|
| Setup Time | ~30-45 minutes |
| Build Time | ~5 minutes |
| Deploy Time | ~5 minutes |
| Total Time | ~45-60 minutes |

---

## 📞 Support

**If you encounter issues:**
- Check `TESTING_DEPLOYMENT_GUIDE.md` for detailed troubleshooting
- Review `INTEGRATION_SETUP_GUIDE.md` for step-by-step instructions
- See `QUICK_START.md` for quick reference

**Firebase Support:**
- Console: https://console.firebase.google.com
- Documentation: https://firebase.google.com/docs
- Community: https://stackoverflow.com/questions/tagged/firebase

---

**Happy Deploying! 🚀🌊**

Last Updated: October 18, 2025
