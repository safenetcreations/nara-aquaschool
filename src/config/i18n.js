// src/config/i18n.js - Internationalization configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        dashboard: 'Dashboard',
        marineLife: 'Marine Life',
        freshwater: 'Freshwater',
        heritage: 'Water Heritage',
        naraScience: 'NARA Science',
        games: 'Games',
        quiz: 'Quiz',
        challenges: 'Challenges',
        citizenScience: 'Citizen Science',
        liveData: 'Live Data',
        fieldVisits: 'Field Visits',
        resources: 'Resources',
        leaderboard: 'Leaderboard',
        profile: 'Profile',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out'
      },
      
      // Common
      common: {
        welcome: 'Welcome',
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        submit: 'Submit',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        viewAll: 'View All',
        viewMore: 'View More',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        close: 'Close',
        share: 'Share',
        download: 'Download',
        upload: 'Upload',
        points: 'Points',
        level: 'Level',
        badges: 'Badges',
        achievements: 'Achievements',
        language: 'Language',
        settings: 'Settings',
        help: 'Help'
      },
      
      // Auth
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        school: 'School',
        grade: 'Grade',
        role: 'I am a...',
        student: 'Student',
        teacher: 'Teacher',
        parent: 'Parent',
        forgotPassword: 'Forgot Password?',
        rememberMe: 'Remember me',
        continueWithGoogle: 'Continue with Google',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: "Don't have an account?",
        createAccount: 'Create Account',
        resetPassword: 'Reset Password'
      },
      
      // Dashboard
      dashboard: {
        title: 'Dashboard',
        welcomeBack: 'Welcome back',
        yourProgress: 'Your Progress',
        recentActivity: 'Recent Activity',
        upcomingEvents: 'Upcoming Events',
        recommendations: 'Recommended for You',
        continueLearning: 'Continue Learning',
        streak: 'Day Streak',
        lessonsCompleted: 'Lessons Completed',
        quizzesTaken: 'Quizzes Taken',
        speciesIdentified: 'Species Identified',
        contributions: 'Contributions'
      },
      
      // Marine Life
      marine: {
        title: 'Marine Life',
        species: 'Species',
        habitat: 'Habitat',
        conservation: 'Conservation Status',
        characteristics: 'Characteristics',
        behavior: 'Behavior',
        distribution: 'Distribution',
        threats: 'Threats',
        funFacts: 'Fun Facts',
        virtualDive: 'Virtual Dive',
        exploreSpecies: 'Explore Species',
        searchSpecies: 'Search species...',
        categories: {
          fish: 'Fish',
          mammals: 'Marine Mammals',
          reptiles: 'Reptiles',
          invertebrates: 'Invertebrates',
          coral: 'Coral',
          plants: 'Marine Plants',
          birds: 'Seabirds'
        }
      },
      
      // Games & Activities
      games: {
        title: 'Games Hub',
        oceanExplorer: 'Ocean Explorer',
        speciesIdentifier: 'Species Identifier',
        coralReefBuilder: 'Coral Reef Builder',
        fishingSimulator: 'Sustainable Fishing',
        waterCycleJourney: 'Water Cycle Journey',
        ancientEngineer: 'Ancient Engineer',
        playNow: 'Play Now',
        highScore: 'High Score',
        yourScore: 'Your Score',
        newGame: 'New Game',
        instructions: 'Instructions'
      },
      
      // Citizen Science
      citizen: {
        title: 'Citizen Science',
        activeProjects: 'Active Projects',
        contribute: 'Contribute Data',
        mySubmissions: 'My Submissions',
        dataCollection: 'Data Collection',
        protocols: 'Protocols',
        beachMonitoring: 'Beach Monitoring',
        waterQuality: 'Water Quality Testing',
        speciesObservation: 'Species Observation',
        plasticPollution: 'Plastic Pollution Survey',
        submitData: 'Submit Data',
        viewProtocol: 'View Protocol',
        requiredTools: 'Required Tools',
        dataFields: 'Data Fields'
      },
      
      // Messages
      messages: {
        success: {
          saved: 'Successfully saved!',
          submitted: 'Successfully submitted!',
          updated: 'Successfully updated!',
          deleted: 'Successfully deleted!',
          signedIn: 'Welcome back!',
          signedUp: 'Welcome to NARA AquaSchool!',
          badgeEarned: 'Congratulations! You earned a new badge!'
        },
        error: {
          general: 'Something went wrong. Please try again.',
          network: 'Network error. Please check your connection.',
          notFound: 'Content not found.',
          unauthorized: 'You are not authorized to perform this action.',
          validation: 'Please check your input and try again.'
        }
      }
    }
  },
  
  si: {
    translation: {
      // Navigation
      nav: {
        home: 'මුල් පිටුව',
        dashboard: 'උපකරණ පුවරුව',
        marineLife: 'සමුද්‍ර ජීවීන්',
        freshwater: 'මිරිදිය',
        heritage: 'ජල උරුමය',
        naraScience: 'නාරා විද්‍යාව',
        games: 'ක්‍රීඩා',
        quiz: 'ප්‍රශ්නාවලි',
        challenges: 'අභියෝග',
        citizenScience: 'පුරවැසි විද්‍යාව',
        liveData: 'සජීවී දත්ත',
        fieldVisits: 'ක්ෂේත්‍ර චාරිකා',
        resources: 'සම්පත්',
        leaderboard: 'ප්‍රමුඛ පුවරුව',
        profile: 'පැතිකඩ',
        signIn: 'පිවිසෙන්න',
        signUp: 'ලියාපදිංචි වන්න',
        signOut: 'පිටවන්න'
      },
      
      // Common
      common: {
        welcome: 'සාදරයෙන් පිළිගනිමු',
        loading: 'පූරණය වෙමින්...',
        save: 'සුරකින්න',
        cancel: 'අවලංගු කරන්න',
        delete: 'මකන්න',
        edit: 'සංස්කරණය',
        submit: 'යොමු කරන්න',
        search: 'සොයන්න',
        filter: 'පෙරහන',
        sort: 'වර්ග කරන්න',
        viewAll: 'සියල්ල බලන්න',
        viewMore: 'තවත් බලන්න',
        back: 'ආපසු',
        next: 'ඊළඟ',
        previous: 'පෙර',
        close: 'වසන්න',
        share: 'බෙදාගන්න',
        download: 'බාගන්න',
        upload: 'උඩුගත කරන්න',
        points: 'ලකුණු',
        level: 'මට්ටම',
        badges: 'ලාංඡන',
        achievements: 'ජයග්‍රහණ',
        language: 'භාෂාව',
        settings: 'සැකසුම්',
        help: 'උදව්'
      },
      
      // Auth
      auth: {
        signIn: 'පිවිසෙන්න',
        signUp: 'ලියාපදිංචි වන්න',
        email: 'විද්‍යුත් තැපෑල',
        password: 'මුරපදය',
        confirmPassword: 'මුරපදය තහවුරු කරන්න',
        firstName: 'මුල් නම',
        lastName: 'අග නම',
        school: 'පාසල',
        grade: 'ශ්‍රේණිය',
        role: 'මම...',
        student: 'ශිෂ්‍යයෙක්',
        teacher: 'ගුරුවරයෙක්',
        parent: 'දෙමාපියෙක්',
        forgotPassword: 'මුරපදය අමතක වුණාද?',
        rememberMe: 'මතක තබාගන්න',
        continueWithGoogle: 'Google සමඟ පිවිසෙන්න',
        alreadyHaveAccount: 'දැනටමත් ගිණුමක් තිබේද?',
        dontHaveAccount: 'ගිණුමක් නැද්ද?',
        createAccount: 'ගිණුම සාදන්න',
        resetPassword: 'මුරපදය යළි සකසන්න'
      },
      
      // Dashboard
      dashboard: {
        title: 'උපකරණ පුවරුව',
        welcomeBack: 'නැවත සාදරයෙන් පිළිගනිමු',
        yourProgress: 'ඔබේ ප්‍රගතිය',
        recentActivity: 'මෑත ක්‍රියාකාරකම්',
        upcomingEvents: 'ඉදිරි සිදුවීම්',
        recommendations: 'ඔබට නිර්දේශිත',
        continueLearning: 'ඉගෙනීම දිගටම කරගෙන යන්න',
        streak: 'දින අඛණ්ඩතාව',
        lessonsCompleted: 'සම්පූර්ණ කළ පාඩම්',
        quizzesTaken: 'ගත් ප්‍රශ්නාවලි',
        speciesIdentified: 'හඳුනාගත් විශේෂ',
        contributions: 'දායකත්වයන්'
      },
      
      // Marine Life
      marine: {
        title: 'සමුද්‍ර ජීවීන්',
        species: 'විශේෂ',
        habitat: 'වාසස්ථාන',
        conservation: 'සංරක්ෂණ තත්ත්වය',
        characteristics: 'ලක්ෂණ',
        behavior: 'හැසිරීම',
        distribution: 'ව්‍යාප්තිය',
        threats: 'තර්ජන',
        funFacts: 'රසවත් කරුණු',
        virtualDive: 'අතථ්‍ය කිමිදුම',
        exploreSpecies: 'විශේෂ ගවේෂණය',
        searchSpecies: 'විශේෂ සොයන්න...',
        categories: {
          fish: 'මාළු',
          mammals: 'සමුද්‍ර ක්ෂීරපායීන්',
          reptiles: 'උරගයින්',
          invertebrates: 'අපෘෂ්ඨවංශීන්',
          coral: 'කොරල්',
          plants: 'සමුද්‍ර ශාක',
          birds: 'මුහුදු කුරුල්ලන්'
        }
      }
    }
  },
  
  ta: {
    translation: {
      // Navigation
      nav: {
        home: 'முகப்பு',
        dashboard: 'கட்டுப்பாட்டு பலகை',
        marineLife: 'கடல் வாழ்க்கை',
        freshwater: 'நன்னீர்',
        heritage: 'நீர் பாரம்பரியம்',
        naraScience: 'நாரா அறிவியல்',
        games: 'விளையாட்டுகள்',
        quiz: 'வினாடி வினா',
        challenges: 'சவால்கள்',
        citizenScience: 'குடிமக்கள் அறிவியல்',
        liveData: 'நேரடி தரவு',
        fieldVisits: 'கள வருகைகள்',
        resources: 'வளங்கள்',
        leaderboard: 'தலைவர் பலகை',
        profile: 'சுயவிவரம்',
        signIn: 'உள்நுழை',
        signUp: 'பதிவு செய்',
        signOut: 'வெளியேறு'
      },
      
      // Common
      common: {
        welcome: 'வரவேற்கிறோம்',
        loading: 'ஏற்றுகிறது...',
        save: 'சேமி',
        cancel: 'ரத்து',
        delete: 'நீக்கு',
        edit: 'திருத்து',
        submit: 'சமர்ப்பி',
        search: 'தேடு',
        filter: 'வடிகட்டி',
        sort: 'வரிசைப்படுத்து',
        viewAll: 'அனைத்தையும் காண்',
        viewMore: 'மேலும் காண்',
        back: 'பின்',
        next: 'அடுத்து',
        previous: 'முந்தைய',
        close: 'மூடு',
        share: 'பகிர்',
        download: 'பதிவிறக்கு',
        upload: 'பதிவேற்று',
        points: 'புள்ளிகள்',
        level: 'நிலை',
        badges: 'பதக்கங்கள்',
        achievements: 'சாதனைகள்',
        language: 'மொழி',
        settings: 'அமைப்புகள்',
        help: 'உதவி'
      },
      
      // Auth
      auth: {
        signIn: 'உள்நுழை',
        signUp: 'பதிவு செய்',
        email: 'மின்னஞ்சல் முகவரி',
        password: 'கடவுச்சொல்',
        confirmPassword: 'கடவுச்சொல்லை உறுதிப்படுத்து',
        firstName: 'முதல் பெயர்',
        lastName: 'கடைசி பெயர்',
        school: 'பள்ளி',
        grade: 'வகுப்பு',
        role: 'நான்...',
        student: 'மாணவர்',
        teacher: 'ஆசிரியர்',
        parent: 'பெற்றோர்',
        forgotPassword: 'கடவுச்சொல் மறந்துவிட்டதா?',
        rememberMe: 'என்னை நினைவில் கொள்',
        continueWithGoogle: 'Google உடன் தொடரவும்',
        alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
        dontHaveAccount: 'கணக்கு இல்லையா?',
        createAccount: 'கணக்கை உருவாக்கு',
        resetPassword: 'கடவுச்சொல்லை மீட்டமை'
      },
      
      // Dashboard
      dashboard: {
        title: 'கட்டுப்பாட்டு பலகை',
        welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
        yourProgress: 'உங்கள் முன்னேற்றம்',
        recentActivity: 'சமீபத்திய செயல்பாடு',
        upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
        recommendations: 'உங்களுக்கு பரிந்துரைக்கப்பட்டது',
        continueLearning: 'கற்றலை தொடரவும்',
        streak: 'நாள் தொடர்ச்சி',
        lessonsCompleted: 'முடிக்கப்பட்ட பாடங்கள்',
        quizzesTaken: 'எடுக்கப்பட்ட வினாடி வினாக்கள்',
        speciesIdentified: 'அடையாளம் காணப்பட்ட இனங்கள்',
        contributions: 'பங்களிப்புகள்'
      },
      
      // Marine Life
      marine: {
        title: 'கடல் வாழ்க்கை',
        species: 'இனங்கள்',
        habitat: 'வாழ்விடம்',
        conservation: 'பாதுகாப்பு நிலை',
        characteristics: 'பண்புகள்',
        behavior: 'நடத்தை',
        distribution: 'பரவல்',
        threats: 'அச்சுறுத்தல்கள்',
        funFacts: 'சுவாரஸ்ய உண்மைகள்',
        virtualDive: 'மெய்நிகர் மூழ்கல்',
        exploreSpecies: 'இனங்களை ஆராயுங்கள்',
        searchSpecies: 'இனங்களைத் தேடு...',
        categories: {
          fish: 'மீன்',
          mammals: 'கடல் பாலூட்டிகள்',
          reptiles: 'ஊர்வன',
          invertebrates: 'முதுகெலும்பில்லாதவை',
          coral: 'பவளம்',
          plants: 'கடல் தாவரங்கள்',
          birds: 'கடல் பறவைகள்'
        }
      }
    }
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
