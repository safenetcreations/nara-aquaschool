# 🌊 NARA Platform - Integration Complete!

Welcome to the unified NARA Platform connecting **AquaSchool** (K-12 Education) and **Nexus** (Graduate Career Platform) through a shared Firebase backend with Single Sign-On!

---

## ✅ What's Been Set Up

### 1. Shared Firebase Configuration
- ✅ Both apps configured to use the same Firebase project (`nara-platform`)
- ✅ Environment variable validation added to both apps
- ✅ `.env.example` templates created for easy setup
- ✅ `.gitignore` updated to protect credentials

### 2. Multi-Site Hosting
- ✅ `firebase.json` configured for two hosting targets:
  - `aquaschool` → Deploys from `build/`
  - `nexus` → Deploys from `nara-nexus/build/`
- ✅ Both apps will be accessible on separate URLs but share authentication

### 3. Unified Security Rules
- ✅ `firestore.unified.rules` created (550+ lines)
- ✅ Role-based access control implemented
- ✅ Type-based access (`school`, `graduate`, `both`)
- ✅ Separate collections for each app with shared users

### 4. Documentation
- ✅ `NARA_UNIFIED_ARCHITECTURE.md` - Complete architecture (850+ lines)
- ✅ `INTEGRATION_SETUP_GUIDE.md` - Step-by-step setup (400+ lines)
- ✅ `IMPLEMENTATION_SUMMARY.md` - Overview and timeline (500+ lines)
- ✅ `firestore.unified.rules` - Security rules (550+ lines)

---

## 🚀 Quick Start (15 Minutes)

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Run Setup Script
```bash
./setup-firebase.sh
```

The script will:
1. Log you into Firebase
2. Create `.env` files from templates
3. Set up Firebase project
4. Configure hosting targets
5. Deploy security rules
6. Build and deploy both apps

### Step 3: Configure Firebase Services

Go to [Firebase Console](https://console.firebase.google.com) and enable:

**Authentication:**
- Email/Password
- Google Sign-In
- Add authorized domains: `aquaschool.nara.ac.lk`, `nexus.nara.ac.lk`

**Firestore Database:**
- Create in production mode
- Location: `asia-south1` (Mumbai - closest to Sri Lanka)

**Cloud Storage:**
- Enable default bucket
- Location: `asia-south1`

---

## 📁 Project Structure

```
nara-aquaschool-main/
├── .env                          # AquaSchool credentials (create from .env.example)
├── .env.example                  # Template for AquaSchool
├── firebase.json                 # Multi-site hosting config ✅
├── firestore.unified.rules       # Shared security rules ✅
├── src/
│   └── config/
│       └── firebase.js           # Updated to use nara-platform ✅
│
├── nara-nexus/
│   ├── .env                      # Nexus credentials (create from .env.example)
│   ├── .env.example              # Template for Nexus ✅
│   └── src/
│       └── config/
│           └── firebase.ts       # Updated to use nara-platform ✅
│
├── NARA_UNIFIED_ARCHITECTURE.md  # Complete architecture guide
├── INTEGRATION_SETUP_GUIDE.md    # Detailed setup instructions
├── IMPLEMENTATION_SUMMARY.md     # Overview and timeline
└── README_INTEGRATION.md         # This file
```

---

## 🔐 Environment Variables Setup

### For AquaSchool (`.env`)
```bash
# Copy from .env.example
cp .env.example .env

# Edit and add your Firebase credentials
nano .env
```

### For Nexus (`nara-nexus/.env`)
```bash
# Copy from template
cp nara-nexus/.env.example nara-nexus/.env

# IMPORTANT: Use SAME credentials as AquaSchool!
nano nara-nexus/.env
```

**Get Firebase Credentials:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select `nara-platform` project (or create it)
3. Click ⚙️ → Project Settings
4. Scroll to "Your apps" → Web app → Config
5. Copy values to both `.env` files

---

## 🏗️ How the Integration Works

### Single Sign-On (SSO)
```
User logs in at AquaSchool
    ↓
Firebase creates auth token
    ↓
User clicks "Explore Nexus"
    ↓
Opens Nexus with same auth token
    ↓
Automatically logged in! ✨
```

### User Types
- **`school`** - Can only access AquaSchool (K-12 students)
- **`graduate`** - Can only access Nexus (career platform)
- **`both`** - Can access BOTH (graduated students!)

### Graduation Flow
```
Grade 12 Student completes school
    ↓
Update user.type: 'school' → 'both'
    ↓
Create nexusProfile document
    ↓
Student can now access Nexus while retaining AquaSchool history!
```

---

## 🛠️ Development

### Run AquaSchool Locally
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main
npm install
npm start
# Opens at http://localhost:3000
```

### Run Nexus Locally
```bash
cd /Users/nanthan/Desktop/nara-aquaschool-main/nara-nexus
npm install --legacy-peer-deps
npm start
# Opens at http://localhost:3000 (use different port if AquaSchool is running)
```

### Test SSO Locally
1. Start both apps on different ports
2. Register user in AquaSchool
3. Check Firebase Console → Authentication (user should appear)
4. Login to Nexus with same credentials
5. Should auto-login! ✨

---

## 🚢 Deployment

### Deploy Both Apps
```bash
# Build AquaSchool
npm run build

# Build Nexus
cd nara-nexus && npm run build && cd ..

# Deploy both to Firebase
firebase deploy --only hosting
```

### Deploy Separately
```bash
# Deploy only AquaSchool
firebase deploy --only hosting:aquaschool

# Deploy only Nexus
firebase deploy --only hosting:nexus
```

### Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```

---

## 🧪 Testing Checklist

### Authentication Tests
- [ ] Register new student in AquaSchool
- [ ] Register new graduate in Nexus
- [ ] Login to AquaSchool, then open Nexus (SSO)
- [ ] Logout from one app, verify logged out of both

### Data Access Tests
- [ ] Student can see quizzes (AquaSchool only)
- [ ] Graduate cannot see quizzes (blocked by rules)
- [ ] Graduate can see internships (Nexus only)
- [ ] Student cannot see internships (blocked by rules)

### Graduation Flow Test
- [ ] Manually update student `user.type` to `"both"`
- [ ] Verify student can now access Nexus
- [ ] Verify school data is retained

---

## 📊 Firebase Console Monitoring

### Check Authentication
https://console.firebase.google.com/project/nara-platform/authentication/users

### Check Firestore Data
https://console.firebase.google.com/project/nara-platform/firestore/data

### Check Hosting Status
https://console.firebase.google.com/project/nara-platform/hosting/sites

### View Analytics
https://console.firebase.google.com/project/nara-platform/analytics/overview

---

## 🐛 Troubleshooting

### Issue: "Firebase config not found"
**Solution:** Create `.env` file from `.env.example` and add credentials

### Issue: "Permission denied" in Firestore
**Solution:** Deploy security rules with `firebase deploy --only firestore:rules`

### Issue: "User can login to AquaSchool but not Nexus"
**Solution:** Check `user.type` field in Firestore. Should be `'graduate'` or `'both'`

### Issue: "Apps using different Firebase projects"
**Solution:** Both `.env` files MUST have identical Firebase credentials!

---

## 💰 Cost Estimate

### Firebase Free Tier (Monthly)
- Authentication: 10k verifications
- Firestore: 50k reads, 20k writes
- Storage: 5 GB
- Hosting: 10 GB

### Expected Cost
- **100 users**: FREE
- **1,000 users**: $5-10/month
- **10,000 users**: $50-100/month

**Recommendation:** Start with Blaze plan, set budget alert at $10/month

---

## 📚 Additional Documentation

### Architecture & Planning
- `NARA_UNIFIED_ARCHITECTURE.md` - Complete technical architecture
- `INTEGRATION_SETUP_GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Overview, timeline, and next steps
- `CODEBASE_AUDIT_REPORT.md` - Pre-integration audit results

### Firebase Documentation
- Setup: https://firebase.google.com/docs/web/setup
- Auth: https://firebase.google.com/docs/auth
- Firestore: https://firebase.google.com/docs/firestore
- Security Rules: https://firebase.google.com/docs/firestore/security/get-started

---

## 🎯 Next Steps

### Immediate (Required for Launch)
1. [ ] Create Firebase project `nara-platform`
2. [ ] Configure `.env` files with real credentials
3. [ ] Enable Firebase services (Auth, Firestore, Storage)
4. [ ] Deploy security rules
5. [ ] Test SSO locally
6. [ ] Deploy to production

### Soon (Enhance User Experience)
7. [ ] Implement graduation flow UI (banner in AquaSchool)
8. [ ] Create onboarding flow for new graduates (Nexus)
9. [ ] Add cross-app navigation links
10. [ ] Set up custom domains (aquaschool.nara.ac.lk, nexus.nara.ac.lk)

### Later (Advanced Features)
11. [ ] Create admin dashboard for managing users
12. [ ] Implement automated graduation (Firebase Function)
13. [ ] Add analytics tracking
14. [ ] Set up error monitoring (Sentry)
15. [ ] Create CI/CD pipeline

---

## ✨ What Changed

### Files Modified
1. `src/config/firebase.js` - Updated to use nara-platform, added validation
2. `nara-nexus/src/config/firebase.ts` - Updated to use nara-platform, added validation
3. `firebase.json` - Configured multi-site hosting
4. `.gitignore` - Added `.env` protection
5. `nara-nexus/.gitignore` - Added `.env` protection

### Files Created
6. `.env.example` - AquaSchool environment template
7. `nara-nexus/.env.example` - Nexus environment template (updated)
8. `firestore.unified.rules` - Unified security rules
9. `setup-firebase.sh` - Automated setup script
10. `README_INTEGRATION.md` - This file

### Documentation Created
11. `NARA_UNIFIED_ARCHITECTURE.md` - Complete architecture guide
12. `INTEGRATION_SETUP_GUIDE.md` - Step-by-step setup
13. `IMPLEMENTATION_SUMMARY.md` - Overview and timeline

---

## 🤝 Support

### Need Help?
- Check the troubleshooting section above
- Review documentation files
- Check Firebase Console for errors
- Verify `.env` configuration

### Resources
- Firebase Console: https://console.firebase.google.com
- Firebase Docs: https://firebase.google.com/docs
- React Docs: https://react.dev

---

## 🎉 Success Metrics

### Week 1
- Both apps deployed and accessible
- SSO working
- 10+ test users created

### Month 1
- 100+ students registered
- 5+ graduates registered
- First graduation completed

### Month 3
- 500+ students
- 50+ graduates
- Active community engagement

---

**Ready to launch? Run `./setup-firebase.sh` to get started!** 🚀

For detailed instructions, see `INTEGRATION_SETUP_GUIDE.md`
