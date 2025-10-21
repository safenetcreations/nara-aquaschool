# 🚀 NARA Platform - Quick Start Guide

**5 Minutes to Get Started!**

---

## ⚡ Step 1: Install Firebase CLI (30 seconds)

```bash
npm install -g firebase-tools
```

---

## ⚡ Step 2: Run Setup Script (3-5 minutes)

```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main
./setup-firebase.sh
```

**The script will:**
1. Login to Firebase ✓
2. Create `.env` files from templates ✓
3. Set up Firebase project ✓
4. Configure hosting targets ✓
5. Deploy security rules ✓

---

## ⚡ Step 3: Configure Environment (2 minutes)

### Get Firebase Credentials:
1. Go to https://console.firebase.google.com
2. Select your project (or create `nara-platform`)
3. Click ⚙️ → Project Settings
4. Scroll to "Your apps" → Web app → Config
5. Copy the values

### Update .env files:
```bash
# Edit AquaSchool .env
nano .env

# Edit Nexus .env (use SAME values!)
nano nara-nexus/.env
```

**Replace these placeholders:**
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

---

## ⚡ Step 4: Enable Firebase Services (2 minutes)

Go to https://console.firebase.google.com/project/nara-platform

**Enable:**
1. **Authentication** → Email/Password + Google
2. **Firestore Database** → Production mode → asia-south1
3. **Cloud Storage** → Default bucket
4. **Hosting** → Get started

---

## ⚡ Step 5: Deploy! (2-3 minutes)

```bash
# Build both apps
npm run build
cd nara-nexus && npm run build && cd ..

# Deploy to Firebase
firebase deploy
```

---

## ✅ You're Done!

Your apps are live:
- **AquaSchool:** https://aquaschool-{project-id}.web.app
- **Nexus:** https://nexus-{project-id}.web.app

---

## 🧪 Quick Test

```bash
# Start locally
npm start                    # AquaSchool at http://localhost:3000

# In new terminal
cd nara-nexus
npm start                    # Nexus at http://localhost:3001
```

**Test SSO:**
1. Register in AquaSchool
2. Check Firebase Console → Authentication (user appears!)
3. Open Nexus → Login with same email
4. ✨ Automatically logged in!

---

## 📚 Full Documentation

- **Complete Guide:** `README_INTEGRATION.md`
- **Architecture:** `NARA_UNIFIED_ARCHITECTURE.md`
- **Setup Details:** `INTEGRATION_SETUP_GUIDE.md`
- **Implementation Report:** `IMPLEMENTATION_COMPLETE.md`

---

## 🆘 Common Issues

### Issue: "Missing Firebase credentials"
```bash
# Check if .env exists
ls -la .env
ls -la nara-nexus/.env

# Make sure you replaced the placeholder values!
cat .env | grep API_KEY
```

### Issue: "Permission denied" in Firestore
```bash
# Deploy security rules
firebase deploy --only firestore:rules
```

### Issue: "Apps not connected"
```bash
# Make sure both .env files have IDENTICAL Firebase credentials
diff .env nara-nexus/.env
```

---

## 💡 Useful Commands

```bash
# Deploy only AquaSchool
firebase deploy --only hosting:aquaschool

# Deploy only Nexus
firebase deploy --only hosting:nexus

# Deploy only security rules
firebase deploy --only firestore:rules

# View logs
firebase functions:log

# Open Firebase Console
open https://console.firebase.google.com/project/nara-platform
```

---

## 🎯 What's Working Now

✅ Single Sign-On (SSO) between apps
✅ Shared user authentication
✅ Type-based access control
✅ Multi-site hosting
✅ Unified security rules
✅ Graduation flow ready

---

## 🎓 Graduate a Student (Test)

After logging in to AquaSchool, open browser console:

```javascript
// Import graduation service
import { graduateStudent } from './services/graduationService';
import { auth } from './config/firebase';

// Graduate current user
await graduateStudent(auth.currentUser.uid);

// Result: User can now access Nexus!
```

---

## 📊 Architecture at a Glance

```
┌─────────────────────────────────────┐
│   Firebase: nara-platform           │
│   • Auth (SSO)                      │
│   • Firestore (Shared)              │
│   • Storage (Shared)                │
└─────────────────────────────────────┘
         ↓                    ↓

🏫 AquaSchool          🎓 Nexus
aquaschool.nara.ac.lk  nexus.nara.ac.lk

Users with type:
• 'school' → AquaSchool only
• 'graduate' → Nexus only
• 'both' → Both platforms! (graduated)
```

---

**Ready to go? Start with:** `./setup-firebase.sh`

Questions? Check `README_INTEGRATION.md` for full documentation!
