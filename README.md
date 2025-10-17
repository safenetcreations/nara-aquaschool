# NARA AquaSchool - Educational Portal Codebase

## 🌊 Project Overview

NARA AquaSchool is a comprehensive educational platform developed for the National Aquatic Resources Research and Development Agency (NARA) of Sri Lanka. This React + Firebase application provides an engaging, gamified learning experience for students (Grade 5-12) to explore marine life, freshwater ecosystems, water heritage, and participate in citizen science.

## 🚀 Features

### Core Features
- **Multilingual Support**: Sinhala, Tamil, and English
- **Four Content Pillars**:
  - Marine Life Explorer (500+ species database)
  - Freshwater Frontiers (Rivers, lakes, wetlands)
  - Water Heritage (Ancient irrigation systems)
  - NARA in Action (Research & careers)
- **Gamification System**: Points, badges, levels, leaderboards
- **Citizen Science**: Real data collection for research
- **Live Ocean Data**: Real-time oceanographic information
- **Virtual Experiences**: 360° underwater tours, AR features
- **Field Visit Booking**: Schedule visits to NARA facilities

### Technical Features
- Progressive Web App (PWA)
- Offline capability
- Real-time data streaming
- Responsive design
- Firebase Authentication & Firestore
- Cloud Functions for backend logic
- Firebase Storage for media

## 📁 Project Structure

```
nara-aquaschool/
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Layout/         # Main app layout
│   │   ├── Common/         # Shared components
│   │   └── Auth/           # Authentication components
│   ├── pages/              # Page components
│   │   ├── Auth/           # Login, Register, etc.
│   │   ├── Dashboard/      # User dashboard
│   │   ├── MarineLife/     # Marine species explorer
│   │   ├── CitizenScience/ # Citizen science portal
│   │   ├── Quiz/           # Quiz center
│   │   ├── Games/          # Educational games
│   │   ├── LiveData/       # Real-time ocean data
│   │   └── ...
│   ├── services/           # Business logic & API calls
│   │   ├── authService.js
│   │   ├── gamificationService.js
│   │   ├── marineSpeciesService.js
│   │   ├── citizenScienceService.js
│   │   └── oceanDataService.js
│   ├── config/             # Configuration files
│   │   ├── firebase.js     # Firebase setup
│   │   └── i18n.js         # Internationalization
│   └── App.js              # Main app component
├── public/                 # Static assets
├── functions/              # Firebase Cloud Functions
├── firebase.json           # Firebase configuration
├── firestore.rules         # Security rules
├── package.json            # Dependencies
└── README.md              # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- Firebase CLI (`npm install -g firebase-tools`)
- Git

### Installation

1. **Extract the codebase**:
```bash
tar -xzf nara-aquaschool-codebase.tar.gz
cd nara-aquaschool
```

2. **Install dependencies**:
```bash
npm install
```

3. **Firebase Setup**:

Create a new Firebase project at https://console.firebase.google.com

Enable the following Firebase services:
- Authentication (Email/Password and Google providers)
- Firestore Database
- Storage
- Hosting
- Functions (Blaze plan required for external API calls)

4. **Configure Firebase**:
```bash
firebase login
firebase init
# Select: Firestore, Functions, Hosting, Storage
# Choose your Firebase project
# Use existing configuration files when prompted
```

5. **Environment Variables**:

Create a `.env` file in the root directory:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_FIREBASE_DATABASE_URL=your_database_url
REACT_APP_USE_EMULATORS=false
```

6. **Initialize Database**:
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules  
firebase deploy --only storage:rules
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start the React development server
npm start

# In another terminal, start Firebase emulators (optional)
firebase emulators:start
```

The app will be available at http://localhost:3000

### Production Build
```bash
# Build the React app
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

## 📊 Database Structure

### Main Collections

1. **users** - User profiles and authentication data
2. **students** - Student-specific data and progress
3. **teachers** - Teacher accounts and class management
4. **schools** - School information
5. **marineSpecies** - Marine life database
6. **lessons** - Educational content
7. **quizzes** - Quiz questions and attempts
8. **citizenScience** - Citizen science projects and submissions
9. **oceanData** - Real-time oceanographic data
10. **fieldVisits** - Field visit bookings
11. **challenges** - Competitions and challenges
12. **badges** - Badge definitions and awards

## 🎮 Gamification System

### Points System
- Lesson completion: 50 points
- Quiz completion: 30 points
- Perfect quiz score: +50 bonus
- Challenge submission: 100 points
- Citizen science contribution: 75 points
- Daily login: 10 points

### Badge Categories
- **Exploration**: Reef Explorer, Mangrove Navigator, Deep Sea Diver
- **Knowledge**: Marine Biologist, Quiz Master, Ocean Scholar
- **Heritage**: Wewa Expert, Hydraulic Historian
- **Conservation**: Beach Guardian, Water Quality Tester, Turtle Protector
- **Skill**: Photographer, Storyteller, Data Analyst
- **Special**: NARA Visitor, Streak Master, Blue Champion

### Levels
20 levels based on accumulated points, with increasing thresholds.

## 🌐 Deployment

### Firebase Hosting
```bash
# Build and deploy
npm run build
firebase deploy --only hosting
```

### Custom Domain
1. Go to Firebase Console > Hosting
2. Add custom domain (e.g., aquaschool.nara.ac.lk)
3. Follow DNS configuration instructions

## 🔐 Security

### Authentication
- Firebase Authentication with email verification
- Role-based access control (Student, Teacher, Admin, Parent)
- School verification for teacher accounts

### Data Security
- Firestore security rules enforce data access policies
- User data encryption
- GDPR/privacy compliance
- Child safety measures

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# End-to-end tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📱 Mobile App (Future)

The codebase is PWA-ready and can be:
1. Installed as a web app on mobile devices
2. Wrapped in Capacitor/Ionic for app stores
3. Built with React Native (separate codebase)

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

### Code Style
- ESLint configuration included
- Prettier for formatting
- Follow React best practices

## 📚 Documentation

### API Documentation
See `/docs/api.md` for service methods

### Component Documentation
See `/docs/components.md` for component props

### Deployment Guide
See `/docs/deployment.md` for detailed deployment steps

## 🆘 Troubleshooting

### Common Issues

**Firebase connection errors**:
- Check Firebase configuration in `.env`
- Verify Firebase project settings
- Ensure services are enabled

**Build errors**:
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Deployment issues**:
- Check Firebase CLI version: `firebase --version`
- Verify billing account for Functions (Blaze plan)

## 📈 Performance Optimization

- Lazy loading for routes
- Image optimization with WebP
- Code splitting
- Firebase caching rules
- CDN for static assets

## 🌟 Future Enhancements

### Planned Features
- AI-powered learning recommendations
- Voice navigation
- Offline data sync
- Advanced AR experiences
- Video streaming for lessons
- Parent dashboard
- SMS notifications
- Integration with school management systems
- API for third-party apps

## 📞 Support

For technical support or questions:
- Email: aquaschool@nara.ac.lk
- Documentation: https://docs.nara.ac.lk/aquaschool
- Issue Tracker: GitHub Issues

## 📜 License

Copyright © 2024 National Aquatic Resources Research and Development Agency (NARA)
All rights reserved.

## 👥 Credits

Developed for NARA by the AquaSchool Development Team
Special thanks to all contributors and marine science educators.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: Production Ready

# nara-aquaschool
