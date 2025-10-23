// src/App.js - Main application component with routing
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import { ReactPlugin } from '@21st-extension/react';
import { AuthProvider } from './contexts/AuthContext';

// Layout Components
import Layout from './components/Layout/Layout';
import LoadingScreen from './components/Common/LoadingScreen';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Auth Components
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyEmail from './pages/Auth/VerifyEmail';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Main Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

// Content Pillars
import MarineLife from './pages/MarineLife/MarineLife';
import SpeciesDetail from './pages/MarineLife/SpeciesDetail';
import VirtualDive from './pages/VirtualDive/VirtualDive';
import FreshwaterFrontiers from './pages/FreshwaterFrontiers/FreshwaterFrontiers';
import WaterHeritage from './pages/WaterHeritage/WaterHeritage';
import NARAInAction from './pages/NARAInAction/NARAInAction';

// Interactive Features
import GamesHub from './pages/Games/GamesHub';
import QuizCenter from './pages/Quiz/QuizCenter';
import CitizenScience from './pages/CitizenScience/CitizenScience';
import Challenges from './pages/Challenges/Challenges';

// Student Features
import StudentProfile from './pages/StudentProfile/StudentProfile';
import StudentPortfolio from './pages/StudentPortfolio/StudentPortfolio';
import Achievements from './pages/Profile/Achievements';
import Settings from './pages/Settings/Settings';
import Leaderboard from './pages/Leaderboard/Leaderboard';

// Teacher Portal
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherPortfolio from './pages/TeacherPortfolio/TeacherPortfolio';
import ClassManagement from './pages/Teacher/ClassManagement';
import LessonPlans from './pages/Teacher/LessonPlans';
import StudentProgress from './pages/Teacher/StudentProgress';

// Field Visits
import FieldVisits from './pages/FieldVisits/FieldVisits';
// import BookVisit from './pages/FieldVisits/BookVisit'; // TODO: Create this component

// Admin Panel
import AdminDashboard from './pages/Admin/AdminDashboard';
import ContentManager from './pages/Admin/ContentManager';
import UserManagement from './pages/Admin/UserManagement';
import Analytics from './pages/Admin/Analytics';
import AIContentGenerator from './pages/Admin/AIContentGenerator';
import ImageGenerator from './pages/Admin/ImageGenerator';
import SchoolsManager from './pages/Admin/SchoolsManager';

// School Directory
import SchoolDirectory from './pages/SchoolDirectory/SchoolDirectory';

// Real-time Features
import LiveOceanData from './pages/LiveOceanData/LiveOceanData';
import UnderwaterCams from './pages/UnderwaterCams/UnderwaterCams';

// Resources
import Downloads from './pages/Resources/Downloads';
import MediaGallery from './pages/Resources/MediaGallery';
import StudentShowcase from './pages/Resources/StudentShowcase';

// New Interactive Features
import SpeciesExplorer from './pages/Interactive/SpeciesExplorer';
import QuizBattle from './pages/Interactive/QuizBattle';
import VirtualOceanDive from './pages/Interactive/VirtualOceanDive';

// Create theme - Sri Lankan School Uniform Colors (Blue & White)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0', // School uniform blue
      light: '#1976D2',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#2196F3', // Light blue accent
      light: '#42A5F5',
      dark: '#1565C0',
    },
    background: {
      default: '#FFFFFF', // Pure white
      paper: '#FAFAFA',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

function App() {
  // Handle case where Firebase/auth is not initialized
  const [user, loading, error] = useAuthState(auth || null);
  const [userProfile, setUserProfile] = useState(null);
  
  // Skip auth state if Firebase is not configured
  if (!auth) {
    console.warn('⚠️ Firebase not configured. Running in demo mode without authentication.');
  }

  // Initialize language from storage or default to English
  useEffect(() => {
    const cachedLang = localStorage.getItem('i18nextLng');
    if (!cachedLang) {
      localStorage.setItem('i18nextLng', 'en');
      i18n.changeLanguage('en');
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Fetch user profile from Firestore
      fetchUserProfile(user.uid);
    }
  }, [user]);

  const fetchUserProfile = async (uid) => {
    try {
      // Implementation will be in userService.js
      // const profile = await getUserProfile(uid);
      // setUserProfile(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <TwentyFirstToolbar config={{ plugins: [ReactPlugin] }} />
      <AuthProvider>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '8px',
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
            <Routes>
              {/* Public Routes - No Layout */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Main App Routes with Layout (Sidebar) */}
              <Route element={<Layout user={user} userProfile={userProfile} />}>

                {/* Public Routes - All students can access */}
                <Route path="dashboard" element={<Dashboard userProfile={userProfile} />} />
                  
                  {/* Content Pillars */}
                  <Route path="marine-life">
                    <Route index element={<MarineLife />} />
                    <Route path="species/:id" element={<SpeciesDetail />} />
                  </Route>

                  <Route path="virtual-dive" element={<VirtualDive />} />
                  
                  <Route path="freshwater">
                    <Route index element={<FreshwaterFrontiers />} />
                  </Route>
                  
                  <Route path="heritage">
                    <Route index element={<WaterHeritage />} />
                  </Route>
                  
                  <Route path="nara">
                    <Route index element={<NARAInAction />} />
                  </Route>
                  
                  {/* School Directory */}
                  <Route path="school-directory" element={<SchoolDirectory />} />
                  
                  {/* Interactive Features */}
                  <Route path="games">
                    <Route index element={<GamesHub />} />
                  </Route>

                  <Route path="quiz">
                    <Route index element={<QuizCenter />} />
                  </Route>

                  <Route path="citizen-science">
                    <Route index element={<CitizenScience />} />
                  </Route>

                  <Route path="challenges">
                    <Route index element={<Challenges />} />
                  </Route>

                  {/* New Interactive Learning Features */}
                  <Route path="species-explorer" element={<SpeciesExplorer />} />
                  <Route path="quiz-battle" element={<QuizBattle />} />
                  <Route path="virtual-dive" element={<VirtualOceanDive />} />

                  {/* Profile & Achievements */}
                  <Route path="profile">
                    <Route index element={<StudentProfile />} />
                    <Route path="achievements" element={<Achievements />} />
                  </Route>
                  
                  {/* Portfolio Pages */}
                  <Route path="portfolio">
                    <Route index element={<StudentPortfolio />} />
                    <Route path=":userId" element={<StudentPortfolio />} />
                  </Route>
                  
                  <Route path="settings" element={<Settings />} />
                  
                  <Route path="leaderboard" element={<Leaderboard />} />
                  
                  {/* Field Visits */}
                  <Route path="field-visits">
                    <Route index element={<FieldVisits />} />
                    {/* <Route path="book" element={<BookVisit />} /> */}
                  </Route>

                  {/* Real-time Features */}
                  <Route path="live-data">
                    <Route index element={<LiveOceanData />} />
                    <Route path="cameras" element={<UnderwaterCams />} />
                  </Route>

                  {/* Resources */}
                  <Route path="resources">
                    <Route path="downloads" element={<Downloads />} />
                    <Route path="gallery" element={<MediaGallery />} />
                    <Route path="showcase" element={<StudentShowcase />} />
                  </Route>

                  {/* Teacher Portal */}
                  <Route path="teacher">
                    <Route index element={<TeacherDashboard />} />
                    <Route path="class" element={<ClassManagement />} />
                    <Route path="lessons" element={<LessonPlans />} />
                    <Route path="progress" element={<StudentProgress />} />
                    <Route path="portfolio">
                      <Route index element={<TeacherPortfolio />} />
                      <Route path=":teacherId" element={<TeacherPortfolio />} />
                    </Route>
                  </Route>

                  {/* Admin Panel */}
                  <Route path="admin">
                    <Route index element={<AdminDashboard />} />
                    <Route path="content" element={<ContentManager />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="schools" element={<SchoolsManager />} />
                    <Route path="ai-generator" element={<AIContentGenerator />} />
                    <Route path="image-generator" element={<ImageGenerator />} />
                  </Route>
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </I18nextProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
