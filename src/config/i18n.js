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
        contentPillars: 'Content Pillars',
        marineLife: 'Marine Life',
        freshwater: 'Freshwater',
        heritage: 'Water Heritage',
        naraScience: 'NARA Science',
        interactive: 'Interactive',
        games: 'Games',
        gamesHub: 'Games Hub',
        quiz: 'Quiz',
        quizCenter: 'Quiz Center',
        challenges: 'Challenges',
        citizenScience: 'Citizen Science',
        liveData: 'Live Data',
        oceanData: 'Ocean Data',
        liveCameras: 'Live Cameras',
        fieldVisits: 'Field Visits',
        resources: 'Resources',
        downloads: 'Downloads',
        gallery: 'Gallery',
        showcase: 'Showcase',
        leaderboard: 'Leaderboard',
        profile: 'Profile',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        teacherPortal: 'Teacher Portal',
        teacherDashboard: 'Teacher Dashboard',
        classManagement: 'Class Management',
        lessonPlans: 'Lesson Plans',
        studentProgress: 'Student Progress',
        admin: 'Admin',
        adminDashboard: 'Admin Dashboard',
        contentManager: 'Content Manager',
        userManagement: 'User Management',
        analytics: 'Analytics'
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
        changeLanguage: 'Change Language',
        toggleTheme: 'Toggle Theme',
        notifications: 'Notifications',
        settings: 'Settings',
        help: 'Help'
      },

      languages: {
        en: 'English',
        si: 'Sinhala',
        ta: 'Tamil'
      },

      layout: {
        welcomeMessage: 'Welcome to NARA AquaSchool',
        levelLabel: 'Level {{level}}',
        pointsLabel: '{{points}} pts'
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
        continueLearning: 'Continue Learning',
        streak: 'Day Streak',
        lessonsCompleted: 'Lessons Completed',
        quizzesTaken: 'Quizzes Taken',
        speciesIdentified: 'Species Identified',
        contributions: 'Contributions',
        welcome: {
          title: 'Welcome back, {{name}}! 👋',
          streakMessage: "You're on a {{count}} day learning streak! Keep it up!",
          startMessage: 'Start your learning journey today!'
        },
        actions: {
          continueLearning: 'Continue Learning'
        },
        stats: {
          lessonsCompleted: 'Lessons Completed',
          quizzesTaken: 'Quizzes Taken',
          speciesIdentified: 'Species Identified',
          contributions: 'Contributions',
          pointsChip: '{{points}} Points',
          streakChip: '{{count}} Day Streak'
        },
        modules: {
          marineLife: 'Marine Life',
          freshwater: 'Freshwater',
          heritage: 'Heritage',
          naraScience: 'NARA Science'
        },
        progress: {
          heading: 'Your Learning Journey',
          moduleProgress: 'Module Progress',
          percentComplete: '{{percent}}% complete'
        },
        weekly: {
          title: "This Week's Activity",
          datasetLabel: 'Points Earned',
          pointsLabel: 'Points this week',
          days: {
            mon: 'Mon',
            tue: 'Tue',
            wed: 'Wed',
            thu: 'Thu',
            fri: 'Fri',
            sat: 'Sat',
            sun: 'Sun'
          }
        },
        continue: {
          heading: 'Continue Where You Left Off',
          status: '{{category}} • {{percent}}% complete',
          categories: {
            marine: 'Marine Life',
            heritage: 'Heritage'
          },
          cards: {
            blueWhale: {
              title: 'Blue Whales of Sri Lanka'
            },
            ancientIrrigation: {
              title: 'Ancient Irrigation Systems'
            }
          }
        },
        badges: {
          heading: 'Recent Badges',
          empty: 'Complete activities to earn badges!'
        },
        ocean: {
          title: 'Live Ocean Data',
          temperature: 'Temperature',
          waveHeight: 'Wave Height',
          viewStations: 'View All Stations'
        },
        events: {
          heading: 'Upcoming Events',
          viewAll: 'View All Events',
          beachCleanup: 'Beach Cleanup Challenge',
          photographyContest: 'Marine Photography Contest',
          facilityVisit: 'NARA Facility Visit - Colombo'
        },
        recommendations: {
          heading: 'Recommended for You',
          types: {
            lesson: 'Lesson',
            quiz: 'Quiz',
            activity: 'Activity',
            explore: 'Explore'
          },
          marineBasics: {
            title: 'Marine Life Basics',
            description: 'Start with foundational marine biology'
          },
          firstQuiz: {
            title: 'Take Your First Quiz',
            description: 'Test your knowledge and earn points'
          },
          citizenScience: {
            title: 'Join Citizen Science',
            description: 'Contribute to real research'
          },
          liveCameras: {
            title: 'Watch Live Underwater',
            description: 'See coral reefs in real-time'
          }
        },
        messages: {
          loadError: 'Failed to load some dashboard data',
          streak: '🔥 {{count}} day streak! Keep it up!'
        }
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
      
      home: {
        brand: 'NARA AquaSchool',
        hero: {
          title: "Explore Sri Lanka's Waters",
          subtitle: 'From Ancient Tanks to Modern Reefs',
          description:
            "Join NARA AquaSchool - Sri Lanka's premier marine education platform. Discover ocean wonders, explore freshwater ecosystems, and learn about our remarkable water heritage through interactive lessons, real-time data, and hands-on citizen science."
        },
        actions: {
          getStarted: 'Get Started',
          startLearning: 'Start Learning Free',
          watchDemo: 'Watch Demo',
          createAccount: 'Create Free Account'
        },
        stats: {
          ancientTanks: 'Ancient Tanks',
          marineSpecies: 'Marine Species',
          coastline: 'Coastline (km)',
          students: 'Students'
        },
        features: {
          heading: 'Why Choose AquaSchool?',
          subheading: 'Engaging features designed for effective learning',
          marineLife: {
            title: 'Marine Life Explorer',
            description: 'Discover 500+ species found in Sri Lankan waters with interactive 3D models'
          },
          waterHeritage: {
            title: 'Water Heritage',
            description: 'Explore 2000+ years of hydraulic civilization and ancient irrigation systems'
          },
          liveData: {
            title: 'Live Ocean Data',
            description: 'Real-time oceanographic data and underwater camera feeds from research stations'
          },
          citizenScience: {
            title: 'Citizen Science',
            description: 'Contribute to real marine research and conservation projects'
          },
          gamification: {
            title: 'Gamified Learning',
            description: 'Earn badges, compete in challenges, and track your progress'
          },
          fieldVisits: {
            title: 'Field Visits',
            description: 'Book educational visits to NARA facilities and research centers'
          }
        },
        pillars: {
          heading: 'Explore Four Learning Pillars',
          subheading: 'Comprehensive aquatic education covering all aspects',
          topicsTitle: 'Topics Covered:',
          explore: 'Explore {{pillar}}',
          marine: {
            title: 'The Living Ocean',
            subtitle: 'Marine Biology & Oceanography',
            description: "Dive into Sri Lanka's marine biodiversity, from coral reefs to blue whales",
            topics: ['Coral Reefs', 'Marine Mammals', 'Fish Species', 'Ocean Currents']
          },
          freshwater: {
            title: 'Freshwater Frontiers',
            subtitle: 'Rivers, Lakes & Wetlands',
            description: 'Explore inland water ecosystems and their importance',
            topics: ['River Systems', 'Wetland Ecology', 'Water Quality', 'Aquaculture']
          },
          heritage: {
            title: 'Water Heritage',
            subtitle: 'Ancient Hydraulic Civilization',
            description: "Discover Sri Lanka's remarkable water engineering legacy",
            topics: ['Ancient Tanks', 'Irrigation Systems', 'Hydraulic Technology', 'Cultural Impact']
          },
          nara: {
            title: 'NARA in Action',
            subtitle: 'Research & Conservation',
            description: 'Learn about cutting-edge marine research and conservation efforts',
            topics: ['Research Projects', 'Conservation', 'Technology', 'Career Paths']
          }
        },
        interactive: {
          heading: 'Interactive Learning Tools',
          subheading: 'Engage with content through various interactive features',
          quizzes: {
            title: 'Interactive Quizzes',
            description: 'Test knowledge with adaptive quizzes'
          },
          games: {
            title: 'Educational Games',
            description: 'Learn through fun simulations'
          },
          cameras: {
            title: 'Live Cameras',
            description: 'Watch underwater feeds in real-time'
          },
          dives: {
            title: 'Virtual Dives',
            description: '360° underwater experiences'
          }
        },
        faqs: {
          heading: 'Frequently Asked Questions',
          subheading: 'Everything you need to know about AquaSchool',
          whatIs: {
            question: 'What is NARA AquaSchool?',
            answer:
              'NARA AquaSchool is an interactive educational platform developed by the National Aquatic Resources Research and Development Agency (NARA) to engage Sri Lankan students in marine science, freshwater ecology, and water heritage education.'
          },
          whoCanUse: {
            question: 'Who can use this platform?',
            answer: "The platform is designed for students from Grade 5 to Grade 12, but it's also valuable for teachers, parents, and anyone interested in aquatic sciences. Content is available in Sinhala, Tamil, and English."
          },
          isFree: {
            question: 'Is it free to use?',
            answer: 'Yes! NARA AquaSchool is completely free for all Sri Lankan students and educators. Simply create an account to access all features and content.'
          },
          fieldVisits: {
            question: 'Can schools organize field visits to NARA?',
            answer:
              'Absolutely! Schools can book educational visits to NARA research centers in Colombo, Kadolkele (Negombo), Rekawa, Kalpitiya, and Trincomalee through our platform.'
          },
          gamification: {
            question: 'How does the gamification system work?',
            answer:
              'Students earn points and badges by completing lessons, taking quizzes, participating in citizen science projects, and contributing to challenges. Progress is tracked with levels and leaderboards.'
          },
          contributeResearch: {
            question: 'Can students contribute to real research?',
            answer:
              'Yes! Through our Citizen Science program, students can collect data on beach health, water quality, species observations, and more, contributing to actual NARA research projects.'
          }
        },
        cta: {
          title: 'Ready to Dive In?',
          subtitle: "Join thousands of students exploring Sri Lanka's aquatic wonders"
        }
      },
      
      settings: {
        header: {
          title: 'Settings',
          subtitle: 'Manage your account and preferences'
        },
        profile: {
          title: 'Profile Settings',
          displayName: 'Display Name',
          email: 'Email',
          emailHelper: 'Contact support to change email',
          bio: 'Bio',
          saveButton: 'Save Profile'
        },
        security: {
          title: 'Security',
          password: {
            title: 'Password',
            subtitle: 'Last changed 30 days ago'
          },
          actions: {
            change: 'Change'
          },
          twoFactor: {
            title: 'Two-Factor Authentication',
            subtitle: 'Add an extra layer of security'
          },
          delete: {
            title: 'Delete Account',
            subtitle: 'Permanently delete your account',
            dialogTitle: 'Delete Account',
            warning: 'This action cannot be undone. All your data will be permanently deleted.',
            description: 'Are you sure you want to delete your account? This will remove all your progress, achievements, and data.',
            confirm: 'Delete Account'
          },
          changePassword: {
            title: 'Change Password',
            current: 'Current Password',
            new: 'New Password',
            confirm: 'Confirm New Password',
            submit: 'Change Password'
          }
        },
        preferences: {
          title: 'Preferences',
          language: {
            label: 'Language'
          },
          theme: {
            label: 'Theme',
            options: {
              light: 'Light',
              dark: 'Dark',
              auto: 'Auto'
            }
          },
          visibility: {
            label: 'Profile Visibility',
            options: {
              public: 'Public',
              friends: 'Friends Only',
              private: 'Private'
            }
          }
        },
        notifications: {
          title: 'Notifications',
          items: {
            email: {
              title: 'Email Notifications',
              subtitle: 'Receive updates via email'
            },
            push: {
              title: 'Push Notifications',
              subtitle: 'Browser push notifications'
            },
            weekly: {
              title: 'Weekly Digest',
              subtitle: 'Summary of your weekly activity'
            },
            achievements: {
              title: 'Achievement Alerts',
              subtitle: 'Get notified when you unlock achievements'
            },
            challenges: {
              title: 'Challenge Reminders',
              subtitle: 'Reminders for active challenges'
            }
          }
        },
        privacy: {
          title: 'Privacy Settings',
          items: {
            showProgress: 'Show Progress to Others',
            showAchievements: 'Show Achievements',
            allowMessages: 'Allow Messages'
          }
        }
      },

      leaderboard: {
        header: {
          title: 'Leaderboard',
          subtitle: 'Compete with students across Sri Lanka and climb the ranks!'
        },
        stats: {
          totalStudents: 'Total Students',
          schoolsParticipating: 'Schools Participating',
          activeThisWeek: 'Active This Week'
        },
        tabs: {
          global: 'Global Top 10',
          school: 'My School',
          week: 'This Week'
        },
        columns: {
          rank: 'Rank',
          student: 'Student',
          school: 'School',
          level: 'Level',
          points: 'Points',
          grade: 'Grade',
          thisWeek: 'This Week',
          totalPoints: 'Total Points'
        },
        level: 'Level {{level}}',
        grade: 'Grade {{grade}}',
        weekly: {
          pointsGain: '+{{points}}'
        }
      },
      
      home: {
        brand: 'නාරා ආකුවාපාසැල',
        hero: {
          title: 'ශ්‍රී ලංකාවේ ජල සම්පත් සොයා බලන්න',
          subtitle: 'පැරණි වැව්වලින් නවීන පවල් පර්වතා වෙත',
          description:
            'ශ්‍රී ලංකාවේ ප්‍රමුඛ ජල අධ්‍යාපන වේදිකාව වන නාරා ආකුවාපාසැලට එක්වන්න. අන්තර්ක්‍රියාකාරී පාඩම්, සජීවී දත්ත සහ ප්‍රායෝගික පුරවැසි විද්‍යාව මඟින් මුහුදු අද්භූතයන්, මිරිදිය පරිසර සහ අපගේ විශිෂ්ට ජල උරුමය සොයාගන්න.'
        },
        actions: {
          getStarted: 'ආරම්භ කරන්න',
          startLearning: 'නිදහස්ව ඉගෙනීම ආරම්භ කරන්න',
          watchDemo: 'ඩෙමෝව බලන්න',
          createAccount: 'නිදහස් ගිණුමක් සාදන්න'
        },
        stats: {
          ancientTanks: 'පැරණි වැව්',
          marineSpecies: 'සමුද්‍ර විශේෂ',
          coastline: 'තීර රේඛාව (කි.මී.)',
          students: 'ශිෂ්‍යයන්'
        },
        features: {
          heading: 'ආකුවාපාසැල තෝරාගැනීමට හේතුව?',
          subheading: 'ඵලදායී ඉගෙනුම සඳහා නිර්මාණය කළ ආකර්ෂණීය විශේෂාංග',
          marineLife: {
            title: 'සමුද්‍ර ජීවී ගවේෂකයා',
            description: 'අන්තර්ක්‍රියාකාරී 3D ආකෘති සමඟ ශ්‍රී ලංකා ජලවල සොයාගත් විශේෂ 500කට වැඩි සංඛ්‍යාව සොයන්න'
          },
          waterHeritage: {
            title: 'ජල උරුමය',
            description: 'අවසන් වසර 2000කට වැඩි ජලාභියෝග උරුමය හා පුරාණ සෙච්චය පද්ධති අත්විඳින්න'
          },
          liveData: {
            title: 'සජීවී මුහුදු දත්ත',
            description: 'පර්යේෂණ මධ්‍යස්ථාන වලින් ලැබෙන සජීවී මුහුදු දත්ත සහ යටින් කැමරා විකාශන'
          },
          citizenScience: {
            title: 'පුරවැසි විද්‍යාව',
            description: 'සත්‍ය මුහුදු පර්යේෂණ හා සංරක්ෂණ ව්‍යාපෘති සඳහා දායක වන්න'
          },
          gamification: {
            title: 'ක්‍රීඩාකරණ අධ්‍යාපනය',
            description: 'ලාංඡන ලබාගෙන, අභියෝගවලට එක්වී, ඔබේ ප්‍රගතිය නිරීක්ෂණය කරන්න'
          },
          fieldVisits: {
            title: 'ක්ෂේත්‍ර චාරිකා',
            description: 'නාරා පහසුකම් හා පර්යේෂණ මධ්‍යස්ථාන වෙත අධ්‍යාපනික චාරිකා بک කරන්න'
          }
        },
        pillars: {
          heading: 'ඉගෙනුම් තීරු හතර සොයාගන්න',
          subheading: 'ජල සම්පත් සියල්ල ආවරණය කරන සම්පූර්ණ අධ්‍යාපනය',
          topicsTitle: 'ආවරණය වන මාතෘකා:',
          explore: '{{pillar}} සොයා බලන්න',
          marine: {
            title: 'ජීවවත් මුහුද',
            subtitle: 'සමුද්‍ර ජීව විද්‍යාව සහ මුහුදු විද්‍යාව',
            description: 'පවල් පර්වතවල සිට නීල තරණුවන් දක්වා ශ්‍රී ලංකාවේ මුහුදු ජීව විවිධත්වය තුළ ගමන් කරන්න',
            topics: ['පවල් පර්වත', 'සමුද්‍ර ක්ෂීරපායීන්', 'මාළු විශේෂ', 'මුහුදු ධාරා']
          },
          freshwater: {
            title: 'මිරිදිය ඉදිරි පෙරමුණු',
            subtitle: 'නදී, වැව සහ තෙත් භූමිය',
            description: 'මිරිදිය පරිසර හා ඒවායේ වැදගත්කම සොයාගන්න',
            topics: ['ගංගා පද්ධති', 'වැලිබඩ පරිසර විද්‍යාව', 'ජල තත්ත්වය', 'මත්ස්‍ය කෘෂිකර්ම']
          },
          heritage: {
            title: 'ජල උරුමය',
            subtitle: 'පුරාණ ජලාභියෝග නාගරිකත්වය',
            description: 'ශ්‍රී ලංකාවේ විශිෂ්ට ජලාභියෝග ඉංජිනේරු උරුමය සොයාගන්න',
            topics: ['පැරණි වැව්', 'සෙච්චය පද්ධති', 'ජලාභියෝග තාක්ෂණය', 'සංස්කෘතික බලපෑම්']
          },
          nara: {
            title: 'නාරා ක්‍රියාකාරීත්වය',
            subtitle: 'පර්යේෂණය සහ සංරක්ෂණය',
            description: 'අලුත්ම මුහුදු පර්යේෂණ හා සංරක්ෂණ කටයුතු පිළිබඳ ඉගෙනගන්න',
            topics: ['පර්යේෂණ ව්‍යාපෘති', 'සංරක්ෂණය', 'තාක්ෂණය', 'වෘත්තීය මාර්ග']
          }
        },
        interactive: {
          heading: 'අන්තර්ක්‍රියාකාරී ඉගෙනුම් මෙවලම්',
          subheading: 'අන්තර්ක්‍රියාකාරී විශේෂාංග හරහා අන්තර්ගතය සමඟ සම්බන්ධ වන්න',
          quizzes: {
            title: 'අන්තර්ක්‍රියාකාරී ප්‍රශ්නාවලි',
            description: 'අනුවර්තන ප්‍රශ්නාවලි සමඟ දැනුම පරීක්ෂා කරන්න'
          },
          games: {
            title: 'අධ්‍යාපන ක්‍රීඩා',
            description: 'සතුටුදායක අනුහුරුකිරීම් හරහා ඉගෙනගන්න'
          },
          cameras: {
            title: 'සජීවී කැමරා',
            description: 'සජීවී යටින් කැමරා විකාශන බලන්න'
          },
          dives: {
            title: 'අතථ්‍ය කිමිදුම්',
            description: '360° යටින් අත්දැකීම්'
          }
        },
        faqs: {
          heading: 'නිතර අසන ප්‍රශ්න',
          subheading: 'ආකුවාපාසැල පිළිබඳ දැනගත යුතු සියල්ල',
          whatIs: {
            question: 'නාරා ආකුවාපාසැල කියන්නේ මොකක්ද?',
            answer:
              'නාරා ආකුවාපාසැල යනු ශ්‍රී ලංකා ජල සම්පත් පර්යේෂණ හා සංවර්ධන ආයතනය (නාරා) විසින් සංවර්ධනය කළ, ශ්‍රී ලාංකීය ශිෂ්‍යයන්ට සමුද්‍ර විද්‍යාව, මිරිදිය පරිසර විද්‍යාව සහ ජල උරුම අධ්‍යාපනයේ නිරතකරවන අන්තර්ක්‍රියාකාරී අධ්‍යාපනික වේදිකාවකි.'
          },
          whoCanUse: {
            question: 'මේ වේදිකාව භාවිතා කළ හැක්කේ කවුද?',
            answer:
              'මෙය 5 සිට 12 වන ශ්‍රේණිය දක්වා ශිෂ්‍යයන් සඳහා නිර්මාණය කළද, ගුරු, දෙමාපියන් සහ ජල විද්‍යාවට උනන්දු ඕනෑම අයෙකුට වටිනා වේ. අන්තර්ගතය සිංහල, දෙමළ සහ ඉංග්‍රීසි භාෂාවලින් ලබාගත හැක.'
          },
          isFree: {
            question: 'මෙය නොමිලේද?',
            answer:
              'ඔව්! නාරා ආකුවාපාසැල ශ්‍රී ලංකා ශිෂ්‍යයන් සහ ගුරුවරුන්ට හා අධ්‍යාපනිකයින්ට සම්පූර්ණයෙන්ම නොමිලේය. සියලු විශේෂාංග භාවිතා කිරීමට ගිණුමක් සාදන්න.'
          },
          fieldVisits: {
            question: 'පාසල් වලට නාරා වෙත ක්ෂේත්‍ර චාරිකා සංවිධානය කළ හැකිද?',
            answer:
              'ඇත්තටම! කොළඹ, කඩොල්කැලේ (නෙගොම්බෝ), රේකවා, කල්පිටිය සහ ත්‍රිකුණාමලය යන නාරා පර්යේෂණ මධ්‍යස්ථාන වෙත අධ්‍යාපනික චාරිකා අපගේ වේදිකාව හරහා بک කළ හැක.'
          },
          gamification: {
            question: 'ක්‍රීඩාකරණ පද්ධතිය කෙසේ ක්‍රියා කරයි?',
            answer:
              'පාඩම් අවසන් කිරීම, ප්‍රශ්නාවලි Attempts කිරීම, පුරවැසි විද්‍යා ව්‍යාපෘතිවලට හා අභියෝගවලට එක්වීම හරහා ශිෂ්‍යයන් ලකුණු සහ ලාංඡන ලබාගනී. ප්‍රගතිය මට්ටම් හා ප්‍රමුඛ පුවරු හරහා නිරීක්ෂණය කරයි.'
          },
          contributeResearch: {
            question: 'ශිෂ්‍යයන්ට සැබෑ පර්යේෂණවලට දායක විය හැකිද?',
            answer:
              'ඔව්! පුරවැසි විද්‍යා වැඩසටහන මඟින් ශිෂ්‍යයන්ට වෙරළ සෞම්‍යතාව, ජල තත්ත්වය, විශේෂ නිරීක්ෂණ වැනි දත්ත රැස් කර සැබෑ නාරා පර්යේෂණවලට දායක විය හැක.'
          }
        },
        cta: {
          title: 'මුහුදට මුහුණ දෙන්න සූදානම්ද?',
          subtitle: 'ශ්‍රී ලංකාවේ ජල අද්භූතයන් සොයා බලන දහස් ගණනක් ශිෂ්‍යයන්ට එක්වන්න'
        }
      },
      
      settings: {
        header: {
          title: 'සැකසුම්',
          subtitle: 'ඔබේ ගිණුම සහ මනාපයන් කළමනාකරණය කරන්න'
        },
        profile: {
          title: 'පැතිකඩ සැකසුම්',
          displayName: 'පෙන්වන නම',
          email: 'ඊමේල්',
          emailHelper: 'ඊමේල් වෙනස් කිරීමට සහය ලබාගන්න',
          bio: 'අප ගැන',
          saveButton: 'පැතිකඩ සුරකින්න'
        },
        security: {
          title: 'ආරක්ෂාව',
          password: {
            title: 'මුරපදය',
            subtitle: 'දින 30කට පෙර යාවත්කාලීන කළා'
          },
          actions: {
            change: 'වෙනස් කරන්න'
          },
          twoFactor: {
            title: 'යුගල සාධක සත්‍යාපනය',
            subtitle: 'අමතර ආරක්ෂණ පියවරක් එක් කරන්න'
          },
          delete: {
            title: 'ගිණුම මකන්න',
            subtitle: 'ඔබේ ගිණුම සදාකාලිකව මකන්න',
            dialogTitle: 'ගිණුම මකන්න',
            warning: 'මෙම ක්‍රියාව නැවත කළ නොහැක. ඔබගේ සියලුම දත්ත සදාකාලිකව මකා දමනු ඇත.',
            description: 'ඔබට ඔබේ ගිණුම මකාදැමීමට අවශ්‍යද? මෙය ඔබේ සියලු ප්‍රගතිය, ජයග්‍රහණ සහ දත්ත ඉවත් කරයි.',
            confirm: 'ගිණුම මකන්න'
          },
          changePassword: {
            title: 'මුරපදය වෙනස් කරන්න',
            current: 'වත්මන් මුරපදය',
            new: 'නව මුරපදය',
            confirm: 'නව මුරපදය තහවුරු කරන්න',
            submit: 'මුරපදය වෙනස් කරන්න'
          }
        },
        preferences: {
          title: 'මනාප',
          language: {
            label: 'භාෂාව'
          },
          theme: {
            label: 'තේමාව',
            options: {
              light: 'ආලෝකමත්',
              dark: 'අඳුරු',
              auto: 'ස්වයංක්‍රීය'
            }
          },
          visibility: {
            label: 'පැතිකඩ දිස්වීම',
            options: {
              public: 'සාමාන්‍ය',
              friends: 'මිත්‍රයන්ට පමණි',
              private: 'පුද්ගලික'
            }
          }
        },
        notifications: {
          title: 'දැනුම්දීම්',
          items: {
            email: {
              title: 'ඊමේල් දැනුම්දීම්',
              subtitle: 'ඊමේල් හරහා යාවත්කාලීන ලබාගන්න'
            },
            push: {
              title: 'පුෂ් දැනුම්දීම්',
              subtitle: 'බ්‍රව්සර පණිවිඩ ලබාගන්න'
            },
            weekly: {
              title: 'සතිපතා සාරාංශය',
              subtitle: 'ඔබේ සතිපතා ක්‍රියාකාරකම් සාරාංශය'
            },
            achievements: {
              title: 'ජයග්‍රහණ දැනුම්දීම්',
              subtitle: 'නව ජයග්‍රහණ ලබාගත් විට දැනුම්දීම් ලබාගන්න'
            },
            challenges: {
              title: 'අභියෝග සිහිකැඳවීම්',
              subtitle: 'ක්‍රියාත්මක අභියෝග සඳහා සිහිකැඳවීම්'
            }
          }
        },
        privacy: {
          title: 'පුද්ගලිකත්ව සැකසුම්',
          items: {
            showProgress: 'මගේ ප්‍රගතිය අනෙකුත් අයට පෙන්වන්න',
            showAchievements: 'ජයග්‍රහණ පෙන්වන්න',
            allowMessages: 'පණිවිඩ සඳහා අවසර දෙන්න'
          }
        }
      },

      leaderboard: {
        header: {
          title: 'ප්‍රමුඛ පුවරුව',
          subtitle: 'ශ්‍රී ලංකා පුරා ශිෂ්‍යයන් සමඟ තරඟ වී ශ්‍රේණිගත වන්න!'
        },
        stats: {
          totalStudents: 'සම්පූර්ණ ශිෂ්‍යයන්',
          schoolsParticipating: 'සහභාගී පාසල්',
          activeThisWeek: 'මෙම සතියේ සක්‍රීය'
        },
        tabs: {
          global: 'ගෝලීය ප්‍රමුඛ 10',
          school: 'මගේ පාසල',
          week: 'මෙම සතිය'
        },
        columns: {
          rank: 'අනුපිළිවෙල',
          student: 'ශිෂ්‍යයා',
          school: 'පාසල',
          level: 'මට්ටම',
          points: 'ලකුණු',
          grade: 'පන්තිය',
          thisWeek: 'මෙම සතිය',
          totalPoints: 'මුළු ලකුණු'
        },
        level: '{{level}} වන මට්ටම',
        grade: '{{grade}} ශ්‍රේණිය',
        weekly: {
          pointsGain: '+{{points}}'
        }
      },

      home: {
        brand: 'நாரா அக்வாஸ்கூல்',
        hero: {
          title: 'இலங்கையின் நீர்களை ஆராயுங்கள்',
          subtitle: 'பண்டைய குளங்களிலிருந்து நவீன பவளப் பாறைகள் வரை',
          description:
            'இலங்கையின் முதன்மை கடல் கல்வித் தளமான நாரா அக்வாஸ்கூலோடு சேருங்கள். இணையாடல் பாடங்கள், நேரடி தரவு மற்றும் செயல்முறை குடிமக்கள் அறிவியல் மூலம் கடலின் அதிசயங்கள், நன்னீர் சூழல்கள் மற்றும் எங்கள் சிறப்பான நீர் பாரம்பரியம் பற்றி கற்றுக்கொள்ளுங்கள்.'
        },
        actions: {
          getStarted: 'தொடங்கவும்',
          startLearning: 'இலவசமாக கற்றலைத் தொடங்குங்கள்',
          watchDemo: 'டெமோவை பார்க்கவும்',
          createAccount: 'இலவச கணக்கை உருவாக்குங்கள்'
        },
        stats: {
          ancientTanks: 'பண்டைய குளங்கள்',
          marineSpecies: 'கடல் இனங்கள்',
          coastline: 'கடற்கரை (கிமீ)',
          students: 'மாணவர்கள்'
        },
        features: {
          heading: 'அக்வாஸ்கூலை ஏன் தேர்ந்தெடுக்க வேண்டும்?',
          subheading: 'திறன் வாய்ந்த கற்றலுக்காக வடிவமைக்கப்பட்ட ஈர்க்கும் அம்சங்கள்',
          marineLife: {
            title: 'கடல் வாழ்க்கை ஆராய்ச்சி',
            description: 'இணையாடல் 3D மாதிரிகளுடன் இலங்கை நீர்களில் காணப்படும் 500+ இனங்களை கண்டறியுங்கள்'
          },
          waterHeritage: {
            title: 'நீர் பாரம்பரியம்',
            description: '2000+ ஆண்டுகளாகிய நீரியல் நாகரிகமும் பாசன அமைப்புகளும் ஆராயுங்கள்'
          },
          liveData: {
            title: 'நேரடி கடல் தரவு',
            description: 'ஆராய்ச்சி நிலையங்களிலிருந்து நேரடி கடல் தரவுகளையும் நீரடிக் கேமரா ஒளிபரப்புகளையும் காணுங்கள்'
          },
          citizenScience: {
            title: 'குடிமக்கள் அறிவியல்',
            description: 'உண்மையான கடல் ஆராய்ச்சி மற்றும் பாதுகாப்புத் திட்டங்களுக்கு பங்களிக்கவும்'
          },
          gamification: {
            title: 'விளையாட்டுவழங்கிய கற்றல்',
            description: 'அங்கீகாரங்களைப் பெறுங்கள், சவால்களில் போட்டியிடுங்கள், உங்கள் முன்னேற்றத்தை கவனியுங்கள்'
          },
          fieldVisits: {
            title: 'கள வருகைகள்',
            description: 'நாரா வசதிகள் மற்றும் ஆராய்ச்சி மையங்களுக்கு கல்வி பயணங்களை முன்பதிவு செய்யுங்கள்'
          }
        },
        pillars: {
          heading: 'நான்கு கற்றல் தூண்களை ஆராயுங்கள்',
          subheading: 'அனைத்து நீரியல் அம்சங்களையும் உள்ளடக்கும் முழுமையான கல்வி',
          topicsTitle: 'கவுரவிக்கப்பட்ட தலைப்புகள்:',
          explore: '{{pillar}} ஐ ஆராயுங்கள்',
          marine: {
            title: 'உயிரோடும் கடல்',
            subtitle: 'கடல் உயிரியல் & கடலியல்',
            description: 'பவளப் பாறைகளிலிருந்து நீலத் திமிங்கில்கள் வரை இலங்கையின் கடல் உயிரியல் பல்வகைமையை அனுபவிக்கவும்',
            topics: ['பவளப் பாறைகள்', 'கடல் பாலூட்டிகள்', 'மீன் இனங்கள்', 'கடல் ஓட்டங்கள்']
          },
          freshwater: {
            title: 'நன்னீர் எல்லைகள்',
            subtitle: 'ஆறுகள், ஏரிகள் & சதுப்புநிலங்கள்',
            description: 'நிலத்தடி நீரியல் சூழல் மற்றும் அதன் முக்கியத்துவத்தை ஆராயுங்கள்',
            topics: ['ஆறு அமைப்புகள்', 'சதுப்புநில சூழலியல்', 'நீர் தரம்', 'குளமீன் வளர்ப்பு']
          },
          heritage: {
            title: 'நீர் பாரம்பரியம்',
            subtitle: 'பண்டைய நீரியல் நாகரிகம்',
            description: 'இலங்கையின் சிறப்பான நீரியல் பொறியியல் பாரம்பரியத்தை அறியுங்கள்',
            topics: ['பண்டைய குளங்கள்', 'பாசன அமைப்புகள்', 'நீரியல் தொழில்நுட்பம்', 'கலாச்சார தாக்கங்கள்']
          },
          nara: {
            title: 'செயலில் நாரா',
            subtitle: 'ஆராய்ச்சி & பாதுகாப்பு',
            description: 'அதிநவீன கடல் ஆராய்ச்சி மற்றும் பாதுகாப்புத் திட்டங்களைப் பற்றி அறிக',
            topics: ['ஆராய்ச்சி திட்டங்கள்', 'பாதுகாப்பு', 'தொழில்நுட்பம்', 'தொழில் வழிகள்']
          }
        },
        interactive: {
          heading: 'இணையாடல் கற்றல் கருவிகள்',
          subheading: 'பல இணையாடல் அம்சங்கள் மூலம் உள்ளடக்கத்தை அனுபவிக்கவும்',
          quizzes: {
            title: 'இணையாடல் வினாடி வினாக்கள்',
            description: 'தனிப்பயன் வினாடி வினாக்கள் மூலம் அறிவைச் சோதிக்கவும்'
          },
          games: {
            title: 'கல்வி விளையாட்டுகள்',
            description: 'வேடிக்கையான எதிர்வினைகளின் மூலம் கற்றுக்கொள்ளுங்கள்'
          },
          cameras: {
            title: 'நேரடி கேமராக்கள்',
            description: 'நேரடியாக நீரடிப் பார்வைகளை காணுங்கள்'
          },
          dives: {
            title: 'மெய்நிகர் மூழ்கல்கள்',
            description: '360° நீரடிக் அனுபவங்கள்'
          }
        },
        faqs: {
          heading: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
          subheading: 'அக்வாஸ்கூல் பற்றிய அனைத்தும் இங்கே',
          whatIs: {
            question: 'நாரா அக்வாஸ்கூல் என்பது என்ன?',
            answer:
              'தேசிய நீர்வள ஆராய்ச்சி மற்றும் மேம்பாட்டுக் கழகம் (நாரா) உருவாக்கிய, இலங்கை மாணவர்களை கடல் அறிவியல், நன்னீர் சூழல் மற்றும் நீர் பாரம்பரியக் கல்வியில் ஈடுபடுத்தும் இணையாடல் கல்வி தளம் இது.'
          },
          whoCanUse: {
            question: 'இத்தளத்தை பயன்படுத்த முடிவது யார்?',
            answer:
              'இந்த தளம் 5 ஆம் வகுப்பு முதல் 12 ஆம் வகுப்பு வரை உள்ள மாணவர்களை நினைவில் கொண்டு வடிவமைக்கப்பட்டாலும், ஆசிரியர்கள், பெற்றோர் மற்றும் நீரியல் அறிவில் ஆர்வமுள்ள யாருக்கும் இது பயனுள்ளது. உள்ளடக்கம் தமிழில், சிங்களத்தில் மற்றும் ஆங்கிலத்தில் கிடைக்கிறது.'
          },
          isFree: {
            question: 'இது இலவசமா?',
            answer:
              'ஆம்! நாரா அக்வாஸ்கூல் அனைத்து இலங்கை மாணவர்களுக்கும் மற்றும் கல்வியாளர்களுக்கும் முற்றிலும் இலவசம். அனைத்து அம்சங்களையும் பயன்படுத்த கணக்கை உருவாக்கினால் போதும்.'
          },
          fieldVisits: {
            question: 'பள்ளிகள் நாரா நிலையங்களுக்கு களப் பயணங்களை ஏற்பாடு செய்ய முடியுமா?',
            answer:
              'கண்டிப்பாக! கொழும்பு, கடல்கொலை (நெகோம்போ), ரேகவா, கற்பிட்டி மற்றும் திருக்கோணமலை ஆகிய இடங்களில் உள்ள நாரா ஆராய்ச்சி மையங்களுக்கு எங்கள் தளத்தின் மூலம் கல்விப் பயணங்களை முன்பதிவு செய்யலாம்.'
          },
          gamification: {
            question: 'விளையாட்டுவழங்கிய அமைப்பு எப்படி செயல்படுகிறது?',
            answer:
              'பாடங்களை முடித்தல், வினாடி வினாக்களைத் தீர்த்தல், குடிமக்கள் அறிவியல் திட்டங்களில் பங்கேற்பது மற்றும் சவால்களில் ஈடுபடுவது மூலம் மாணவர்கள் புள்ளிகளையும் பதக்கங்களையும் பெறுகிறார்கள். முன்னேற்றம் நிலைகள் மற்றும் முன்னணி பலகைகள் மூலம் கண்காணிக்கப்படுகிறது.'
          },
          contributeResearch: {
            question: 'மாணவர்கள் உண்மையான ஆராய்ச்சியில் பங்கேற்க முடியுமா?',
            answer:
              'ஆம்! எங்கள் குடிமக்கள் அறிவியல் திட்டத்தின் மூலம் மாணவர்கள் கடற்கரை ஆரோக்கியம், நீர் தரம், இனக் கண்காணிப்பு போன்ற தரவுகளை சேகரித்து, உண்மையான நாரா ஆராய்ச்சியில் பங்காற்ற முடியும்.'
          }
        },
        cta: {
          title: 'மூழ்கத் தயாரா?',
          subtitle: 'இலங்கையின் நீரியல் அதிசயங்களை ஆராயும் ஆயிரக்கணக்கான மாணவர்களுடன் சேருங்கள்'
        }
      },
      
      settings: {
        header: {
          title: 'அமைப்புகள்',
          subtitle: 'உங்கள் கணக்கு மற்றும் விருப்பங்களை நிர்வகிக்கவும்'
        },
        profile: {
          title: 'சுயவிவர அமைப்புகள்',
          displayName: 'காணும் பெயர்',
          email: 'மின்னஞ்சல்',
          emailHelper: 'மின்னஞ்சலை மாற்ற ஆதரவை தொடர்புகொள்ளவும்',
          bio: 'சுயவிவர அறிமுகம்',
          saveButton: 'சுயவிவரம் சேமிக்கவும்'
        },
        security: {
          title: 'பாதுகாப்பு',
          password: {
            title: 'கடவுச்சொல்',
            subtitle: '30 நாட்களுக்கு முன் மாற்றப்பட்டது'
          },
          actions: {
            change: 'மாற்றவும்'
          },
          twoFactor: {
            title: 'இரட்டை காரணி அங்கீகாரம்',
            subtitle: 'கூடுதல் பாதுகாப்பு அடுக்கு சேர்க்கவும்'
          },
          delete: {
            title: 'கணக்கை நீக்கு',
            subtitle: 'உங்கள் கணக்கை நிரந்தரமாக நீக்கவும்',
            dialogTitle: 'கணக்கை நீக்கு',
            warning: 'இந்த நடவடிக்கை மீளச் செய்ய முடியாது. உங்கள் அனைத்து தரவும் நிரந்தரமாக நீக்கப்படும்.',
            description: 'உங்கள் கணக்கை நீக்க விரும்புகிறீர்களா? இதனால் உங்கள் முன்னேற்றம், சாதனைகள் மற்றும் தரவு 모두 நீக்கப்படும்.',
            confirm: 'கணக்கை நீக்கு'
          },
          changePassword: {
            title: 'கடவுச்சொல்லை மாற்றவும்',
            current: 'தற்போதைய கடவுச்சொல்',
            new: 'புதிய கடவுச்சொல்',
            confirm: 'புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்',
            submit: 'கடவுச்சொல்லை மாற்றவும்'
          }
        },
        preferences: {
          title: 'விருப்பங்கள்',
          language: {
            label: 'மொழி'
          },
          theme: {
            label: 'தோற்றம்',
            options: {
              light: 'ஒளி',
              dark: 'கருப்பு',
              auto: 'தானியங்கி'
            }
          },
          visibility: {
            label: 'சுயவிவர காட்சி',
            options: {
              public: 'பொது',
              friends: 'நண்பர்களுக்கு மட்டும்',
              private: 'தனியார்'
            }
          }
        },
        notifications: {
          title: 'அறிவிப்புகள்',
          items: {
            email: {
              title: 'மின்னஞ்சல் அறிவிப்புகள்',
              subtitle: 'மின்னஞ்சல் மூலம் புதுப்பிப்புகளைப் பெறுங்கள்'
            },
            push: {
              title: 'புஷ் அறிவிப்புகள்',
              subtitle: 'உலாவி புஷ் அறிவிப்புகள்'
            },
            weekly: {
              title: 'வார சுருக்கம்',
              subtitle: 'உங்கள் வார செயல்பாடுகளின் சுருக்கம்'
            },
            achievements: {
              title: 'சாதனை எச்சரிக்கைகள்',
              subtitle: 'சாதனைகள் கிடைக்கும் போது அறிவிக்கவும்'
            },
            challenges: {
              title: 'சவால் நினைவூட்டல்கள்',
              subtitle: 'செயலில் உள்ள சவால்களுக்கு நினைவூட்டல்கள்'
            }
          }
        },
        privacy: {
          title: 'தனியுரிமை அமைப்புகள்',
          items: {
            showProgress: 'மற்றவர்களுக்கு முன்னேற்றத்தை காட்டவும்',
            showAchievements: 'சாதனைகளை காட்டவும்',
            allowMessages: 'செய்திகளை அனுமதிக்கவும்'
          }
        }
      },

      leaderboard: {
        header: {
          title: 'தலைவர் பலகை',
          subtitle: 'இலங்கையின் மாணவர்களுடன் போட்டியிட்டு தரவரிசையில் முன்னேறுங்கள்!'
        },
        stats: {
          totalStudents: 'மொத்த மாணவர்கள்',
          schoolsParticipating: 'பங்கேற்கும் பள்ளிகள்',
          activeThisWeek: 'இந்த வாரம் செயலில்'
        },
        tabs: {
          global: 'உலக முன்னணி 10',
          school: 'என் பள்ளி',
          week: 'இந்த வாரம்'
        },
        columns: {
          rank: 'தரவரிசை',
          student: 'மாணவர்',
          school: 'பள்ளி',
          level: 'நிலை',
          points: 'புள்ளிகள்',
          grade: 'வகுப்பு',
          thisWeek: 'இந்த வாரம்',
          totalPoints: 'மொத்த புள்ளிகள்'
        },
        level: 'நிலை {{level}}',
        grade: 'வகுப்பு {{grade}}',
        weekly: {
          pointsGain: '+{{points}}'
        }
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
          signedOut: 'Signed out successfully!',
          languageUpdated: 'Language updated',
          profileUpdated: 'Profile updated successfully',
          passwordChanged: 'Password changed successfully',
          accountDeletionRequested: 'Account deletion requested',
          badgeEarned: 'Congratulations! You earned a new badge!'
        },
        error: {
          general: 'Something went wrong. Please try again.',
          network: 'Network error. Please check your connection.',
          notFound: 'Content not found.',
          unauthorized: 'You are not authorized to perform this action.',
          validation: 'Please check your input and try again.',
          signOut: 'Error signing out.',
          passwordMismatch: 'Passwords do not match.',
          passwordLength: 'Password must be at least 6 characters.'
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
        contentPillars: 'අන්තර්ගත තීරු',
        marineLife: 'සමුද්‍ර ජීවීන්',
        freshwater: 'මිරිදිය',
        heritage: 'ජල උරුමය',
        naraScience: 'නාරා විද්‍යාව',
        interactive: 'අන්තර්ක්‍රියාකාරී',
        games: 'ක්‍රීඩා',
        gamesHub: 'ක්‍රීඩා මධ්‍යස්ථානය',
        quiz: 'ප්‍රශ්නාවලි',
        quizCenter: 'ප්‍රශ්නාවලි මධ්‍යස්ථානය',
        challenges: 'අභියෝග',
        citizenScience: 'පුරවැසි විද්‍යාව',
        liveData: 'සජීවී දත්ත',
        oceanData: 'මුහුදු දත්ත',
        liveCameras: 'සජීවී කැමරා',
        fieldVisits: 'ක්ෂේත්‍ර චාරිකා',
        resources: 'සම්පත්',
        downloads: 'බාගැනීම්',
        gallery: 'ගැලරි',
        showcase: 'ප්‍රදර්ශනය',
        leaderboard: 'ප්‍රමුඛ පුවරුව',
        profile: 'පැතිකඩ',
        signIn: 'පිවිසෙන්න',
        signUp: 'ලියාපදිංචි වන්න',
        signOut: 'පිටවන්න',
        teacherPortal: 'ගුරු ද්වාරය',
        teacherDashboard: 'ගුරු පුවරුව',
        classManagement: 'පන්ති කළමනාකරණය',
        lessonPlans: 'පාඩම් සැලසුම්',
        studentProgress: 'ශිෂ්‍ය ප්‍රගතිය',
        admin: 'පරිපාලක',
        adminDashboard: 'පරිපාලන පුවරුව',
        contentManager: 'අන්තර්ගත කළමනාකරු',
        userManagement: 'පරිශීලක කළමනාකරණය',
        analytics: 'විශ්ලේෂණය'
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
        changeLanguage: 'භාෂාව වෙනස් කරන්න',
        toggleTheme: 'තීම් වෙනස් කරන්න',
        notifications: 'දැනුම්දීම්',
        settings: 'සැකසුම්',
        help: 'උදව්'
      },

      languages: {
        en: 'ඉංග්‍රීසි',
        si: 'සිංහල',
        ta: 'දෙමළ'
      },

      layout: {
        welcomeMessage: 'නාරා ආකුවාපාසැලට සාදරයෙන් පිළිගනිමු',
        levelLabel: '{{level}} වන මට්ටම',
        pointsLabel: '{{points}} ලකුණු'
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
        continueLearning: 'ඉගෙනීම දිගටම කරගෙන යන්න',
        streak: 'දින අඛණ්ඩතාව',
        lessonsCompleted: 'සම්පූර්ණ කළ පාඩම්',
        quizzesTaken: 'ගත් ප්‍රශ්නාවලි',
        speciesIdentified: 'හඳුනාගත් විශේෂ',
        contributions: 'දායකත්වයන්',
        welcome: {
          title: '{{name}}ට නැවත සාදරයෙන් පිළිගනිමු! 👋',
          streakMessage: 'ඔබ දින {{count}}ක් අඛණ්ඩව ඉගෙනුමට සහභාගී වෙයි! එය දිගටම තබාගන්න!',
          startMessage: 'අදම ඔබේ ඉගෙනුම් ගමන ආරම්භ කරන්න!'
        },
        actions: {
          continueLearning: 'ඉගෙනීම දිගටම කරගෙන යන්න'
        },
        stats: {
          lessonsCompleted: 'සම්පූර්ණ කළ පාඩම්',
          quizzesTaken: 'ගත් ප්‍රශ්නාවලි',
          speciesIdentified: 'හඳුනාගත් විශේෂ',
          contributions: 'දායකත්වයන්',
          pointsChip: '{{points}} ලකුණු',
          streakChip: '{{count}} දින අඛණ්ඩතාව'
        },
        modules: {
          marineLife: 'සමුද්‍ර ජීවීන්',
          freshwater: 'මිරිදිය',
          heritage: 'ජල උරුමය',
          naraScience: 'නාරා විද්‍යාව'
        },
        progress: {
          heading: 'ඔබේ ඉගෙනුම් ගමන',
          moduleProgress: 'මොඩියුල ප්‍රගතිය',
          percentComplete: '{{percent}}% සම්පූර්ණයි'
        },
        weekly: {
          title: 'මෙම සතියේ ක්‍රියාකාරකම්',
          datasetLabel: 'ලබාගත් ලකුණු',
          pointsLabel: 'මෙම සතියේ ලකුණු',
          days: {
            mon: 'සඳුදා',
            tue: 'අඟහරුවාදා',
            wed: 'බදාදා',
            thu: 'බ්‍රහස්පතින්දා',
            fri: 'සිකුරාදා',
            sat: 'සෙනසුරාදා',
            sun: 'ඉරිදා'
          }
        },
        continue: {
          heading: 'ඔබ නවතා තිබූ තැනින් පටන් ගන්න',
          status: '{{category}} • {{percent}}% සම්පූර්ණයි',
          categories: {
            marine: 'සමුද්‍ර ජීවීන්',
            heritage: 'ජල උරුමය'
          },
          cards: {
            blueWhale: {
              title: 'ශ්‍රී ලංකාවේ නීල තරණුවන්'
            },
            ancientIrrigation: {
              title: 'පැරණි සෙච්චය පද්ධති'
            }
          }
        },
        badges: {
          heading: 'මෑත ලාංඡන',
          empty: 'ලාංඡන ලබා ගැනීමට ක්‍රියාකාරකම් සම්පූර්ණ කරන්න!'
        },
        ocean: {
          title: 'සජීවී මුහුදු දත්ත',
          temperature: 'තාපමානය',
          waveHeight: 'තරංග උස',
          viewStations: 'සියලුම ස්ථාන බලන්න'
        },
        events: {
          heading: 'ඉදිරි සිදුවීම්',
          viewAll: 'සියලු සිදුවීම් බලන්න',
          beachCleanup: 'මුහුදු තීර පිරිසිදු කිරීමේ අභියෝගය',
          photographyContest: 'සමුද්‍ර ඡායාරූප තරඟය',
          facilityVisit: 'නාරා පහසුකම් සංචාරය - කොළඹ'
        },
        recommendations: {
          heading: 'ඔබට නිර්දේශිත',
          types: {
            lesson: 'පාඩම',
            quiz: 'ප්‍රශ්නාවලිය',
            activity: 'ක්‍රියාකාරකම',
            explore: 'ගවේෂණය'
          },
          marineBasics: {
            title: 'සමුද්‍ර ජීව විද්‍යා මූලධර්ම',
            description: 'මූලික සමුද්‍ර ජීව විද්‍යාවෙන් ආරම්භ කරන්න'
          },
          firstQuiz: {
            title: 'ඔබේ පළමු ප්‍රශ්නාවලියට එක්වන්න',
            description: 'ඔබේ දැනුම පරීක්ෂා කර ලකුණු රැස්කරන්න'
          },
          citizenScience: {
            title: 'පුරවැසි විද්‍යායට එක්වන්න',
            description: 'සැබෑ පර්යේෂණ ව්‍යාපෘතිවලට දායක වන්න'
          },
          liveCameras: {
            title: 'සජීවීව යටින් බලන්න',
            description: 'සජීවී පවල් පර්වත නිරීක්ෂණ කරන්න'
          }
        },
        messages: {
          loadError: 'උපකරණ පුවරුවේ දත්ත කිහිපයක් පූරණය වීම අසාර්ථක විය',
          streak: '🔥 දින {{count}}ක් අඛණ්ඩ ඉගෙනීම! එය දිගටම කරගෙන යන්න!'
        }
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
      },

      // Messages
      messages: {
        success: {
          saved: 'සාර්ථකව සුරකින ලදී!',
          submitted: 'සාර්ථකව යොමු කරන ලදී!',
          updated: 'සාර්ථකව යාවත්කාලීන කරන ලදී!',
          deleted: 'සාර්ථකව මකා දමන ලදී!',
          signedIn: 'නැවත සාදරයෙන් පිළිගනිමු!',
          signedUp: 'නාරා ආකුවාපාසැලට සාදරයෙන් පිළිගනිමු!',
          signedOut: 'සාර්ථකව පිටවුණා!',
          languageUpdated: 'භාෂාව යාවත්කාලීන විය',
          profileUpdated: 'පැතිකඩ සාර්ථකව යාවත්කාලීන විය',
          passwordChanged: 'මුරපදය සාර්ථකව වෙනස් විය',
          accountDeletionRequested: 'ගිණුම මකාදැමීමට ඉල්ලීමක් යොමු විය',
          badgeEarned: 'සුභ පැතුම්! ඔබට නව ලාංඡනයක් ලැබී ඇත!'
        },
        error: {
          general: 'ඇත්ත වශයෙන් වැරැද්දක් සිදුවිය. කරුණාකර නැවත උත්සාහ කරන්න.',
          network: 'ජාල දෝෂයක්. කරුණාකර ඔබගේ සම්බන්ධතාවය පරීක්ෂා කරන්න.',
          notFound: 'අන්තර්ගතය හමු නොවිනි.',
          unauthorized: 'මෙම ක්‍රියාව කිරීම සඳහා ඔබට අවසර නොමැත.',
          validation: 'කරුණාකර ඔබගේ දත්ත පරීක්ෂාකර නැවත උත්සාහ කරන්න.',
          signOut: 'පිටවීමේ දෝෂයක්.',
          passwordMismatch: 'මුරපද දෙක නොගැලපේ.',
          passwordLength: 'මුරපදය අවම වශයෙන් අකුරු 6ක් අවශ්‍යයි.'
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
        contentPillars: 'உள்ளடக்க தூண்கள்',
        marineLife: 'கடல் வாழ்க்கை',
        freshwater: 'நன்னீர்',
        heritage: 'நீர் பாரம்பரியம்',
        naraScience: 'நாரா அறிவியல்',
        interactive: 'இணையாடல்',
        games: 'விளையாட்டுகள்',
        gamesHub: 'விளையாட்டு மையம்',
        quiz: 'வினாடி வினா',
        quizCenter: 'வினாடி வினா மையம்',
        challenges: 'சவால்கள்',
        citizenScience: 'குடிமக்கள் அறிவியல்',
        liveData: 'நேரடி தரவு',
        oceanData: 'கடல் தரவு',
        liveCameras: 'நேரடி கேமராக்கள்',
        fieldVisits: 'கள வருகைகள்',
        resources: 'வளங்கள்',
        downloads: 'பதிவிறக்கங்கள்',
        gallery: 'காட்சியகம்',
        showcase: 'காட்சி',
        leaderboard: 'தலைவர் பலகை',
        profile: 'சுயவிவரம்',
        signIn: 'உள்நுழை',
        signUp: 'பதிவு செய்',
        signOut: 'வெளியேறு',
        teacherPortal: 'ஆசிரியர் வாயில்',
        teacherDashboard: 'ஆசிரியர் கட்டுப்பாட்டு பலகை',
        classManagement: 'வகுப்பு மேலாண்மை',
        lessonPlans: 'பாடத் திட்டங்கள்',
        studentProgress: 'மாணவர் முன்னேற்றம்',
        admin: 'நிர்வாகம்',
        adminDashboard: 'நிர்வாக கட்டுப்பாடு',
        contentManager: 'உள்ளடக்க மேலாளர்',
        userManagement: 'பயனர் மேலாண்மை',
        analytics: 'பகுப்பாய்வு'
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
        changeLanguage: 'மொழியை மாற்று',
        toggleTheme: 'தோற்றத்தை மாற்று',
        notifications: 'அறிவிப்புகள்',
        settings: 'அமைப்புகள்',
        help: 'உதவி'
      },

      languages: {
        en: 'ஆங்கிலம்',
        si: 'சிங்களம்',
        ta: 'தமிழ்'
      },

      layout: {
        welcomeMessage: 'நாரா அக்வாஸ்கூலுக்கு வரவேற்கிறோம்',
        levelLabel: 'நிலை {{level}}',
        pointsLabel: '{{points}} புள்ளிகள்'
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
        continueLearning: 'கற்றலை தொடரவும்',
        streak: 'நாள் தொடர்ச்சி',
        lessonsCompleted: 'முடிக்கப்பட்ட பாடங்கள்',
        quizzesTaken: 'எடுக்கப்பட்ட வினாடி வினாக்கள்',
        speciesIdentified: 'அடையாளம் காணப்பட்ட இனங்கள்',
        contributions: 'பங்களிப்புகள்',
        welcome: {
          title: '{{name}} மீண்டும் வரவேற்கிறோம்! 👋',
          streakMessage: 'நீங்கள் தொடர்ச்சியாக {{count}} நாட்கள் கற்றுக்கொண்டு வருகிறீர்கள்! இதேபோல் தொடருங்கள்!',
          startMessage: 'இன்றே உங்கள் கற்றல் பயணத்தைத் தொடங்குங்கள்!'
        },
        actions: {
          continueLearning: 'கற்றலை தொடரவும்'
        },
        stats: {
          lessonsCompleted: 'முடிக்கப்பட்ட பாடங்கள்',
          quizzesTaken: 'எடுக்கப்பட்ட வினாடி வினாக்கள்',
          speciesIdentified: 'அடையாளம் காணப்பட்ட இனங்கள்',
          contributions: 'பங்களிப்புகள்',
          pointsChip: '{{points}} புள்ளிகள்',
          streakChip: '{{count}} நாள் தொடர்ச்சி'
        },
        modules: {
          marineLife: 'கடல் வாழ்க்கை',
          freshwater: 'நன்னீர்',
          heritage: 'நீர் பாரம்பரியம்',
          naraScience: 'நாரா அறிவியல்'
        },
        progress: {
          heading: 'உங்கள் கற்றல் பயணம்',
          moduleProgress: 'தொகுதி முன்னேற்றம்',
          percentComplete: '{{percent}}% முடிந்தது'
        },
        weekly: {
          title: 'இந்த வார செயல்பாடு',
          datasetLabel: 'பெற்ற புள்ளிகள்',
          pointsLabel: 'இந்த வார புள்ளிகள்',
          days: {
            mon: 'திங்கள்',
            tue: 'செவ்வாய்',
            wed: 'புதன்',
            thu: 'வியாழன்',
            fri: 'வெள்ளி',
            sat: 'சனி',
            sun: 'ஞாயிறு'
          }
        },
        continue: {
          heading: 'நீங்கள் நிறுத்திய இடத்தில் தொடரவும்',
          status: '{{category}} • {{percent}}% முடிந்தது',
          categories: {
            marine: 'கடல் வாழ்க்கை',
            heritage: 'நீர் பாரம்பரியம்'
          },
          cards: {
            blueWhale: {
              title: 'இலங்கையின் நீலத் திமிங்கிலங்கள்'
            },
            ancientIrrigation: {
              title: 'பண்டைய பாசன அமைப்புகள்'
            }
          }
        },
        badges: {
          heading: 'சமீபத்திய பதக்கங்கள்',
          empty: 'பதக்கங்களைப் பெற செயல்பாடுகளை முடிக்கவும்!'
        },
        ocean: {
          title: 'நேரடி கடல் தரவு',
          temperature: 'வெப்பநிலை',
          waveHeight: 'அலை உயரம்',
          viewStations: 'அனைத்து நிலையங்களையும் காண்க'
        },
        events: {
          heading: 'வரவிருக்கும் நிகழ்வுகள்',
          viewAll: 'அனைத்து நிகழ்வுகளையும் காண்க',
          beachCleanup: 'கடற்கரை சுத்தப்படுத்தும் சவால்',
          photographyContest: 'கடல் புகைப்படப் போட்டி',
          facilityVisit: 'நாரா நிலைய வருகை - கொழும்பு'
        },
        recommendations: {
          heading: 'உங்களுக்கான பரிந்துரைகள்',
          types: {
            lesson: 'பாடம்',
            quiz: 'வினாடி வினா',
            activity: 'செயல்',
            explore: 'ஆராயுங்கள்'
          },
          marineBasics: {
            title: 'கடல் வாழ்க்கை அடிப்படைகள்',
            description: 'அடிப்படை கடல் உயிரியல் மூலம் தொடங்குங்கள்'
          },
          firstQuiz: {
            title: 'உங்கள் முதல் வினாடி வினாவை எடுத்துப் பாருங்கள்',
            description: 'உங்கள் அறிவைச் சோதித்து புள்ளிகளைப் பெறுங்கள்'
          },
          citizenScience: {
            title: 'குடிமக்கள் அறிவியலில் சேருங்கள்',
            description: 'உண்மையான ஆராய்ச்சியில் பங்களிக்கவும்'
          },
          liveCameras: {
            title: 'நேரடியாக நீரடியில் பார்க்கவும்',
            description: 'நேரடியாக பவளப் பாறைகளை காணுங்கள்'
          }
        },
        messages: {
          loadError: 'டாஷ்போರ್ಡ் தரவுகளை ஏற்றுவதில் சிக்கல் ஏற்பட்டது',
          streak: '🔥 {{count}} நாள் தொடர்ச்சியான கற்றல்! தொடருங்கள்!'
        }
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
      },

      // Messages
      messages: {
        success: {
          saved: 'வெற்றிகரமாக சேமிக்கப்பட்டது!',
          submitted: 'வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
          updated: 'வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
          deleted: 'வெற்றிகரமாக நீக்கப்பட்டது!',
          signedIn: 'மீண்டும் வரவேற்கிறோம்!',
          signedUp: 'நாரா அக்வாஸ்கூலுக்கு வரவேற்கிறோம்!',
          signedOut: 'வெற்றிகரமாக வெளியேறப்பட்டது!',
          languageUpdated: 'மொழி புதுப்பிக்கப்பட்டது',
          profileUpdated: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
          passwordChanged: 'கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது',
          accountDeletionRequested: 'கணக்கை நீக்கும் கோரிக்கை அனுப்பப்பட்டது',
          badgeEarned: 'வாழ்த்துகள்! புதிய பதக்கம் பெற்றுள்ளீர்கள்!'
        },
        error: {
          general: 'ஏதோ தவறு ஏற்பட்டது. தயவு செய்து மீண்டும் முயற்சிக்கவும்.',
          network: 'இணைய பிழை. உங்கள் இணைப்பை சரிபார்க்கவும்.',
          notFound: 'உள்ளடக்கம் கிடைக்கவில்லை.',
          unauthorized: 'இந்த செயலைச் செய்ய உங்களுக்கு அனுமதி இல்லை.',
          validation: 'உங்கள் தகவலை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.',
          signOut: 'வெளியேறுவதில் பிழை.',
          passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை.',
          passwordLength: 'கடவுச்சொல்லில் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.'
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
    lng: 'en', // Force English as default language
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      // Order of detection - only use localStorage, ignore browser language
      order: ['localStorage'],
      // Cache user language selection
      caches: ['localStorage'],
      // Don't detect from browser/navigator
      lookupLocalStorage: 'i18nextLng',
      // Exclude other detection methods
      excludeCacheFor: ['cimode']
    },
    
    interpolation: {
      escapeValue: false
    }
  });

// Force English on initialization and clear any stored Tamil/Sinhala preference
const storedLang = localStorage.getItem('i18nextLng');
if (!storedLang || storedLang === 'ta' || storedLang === 'si') {
  localStorage.setItem('i18nextLng', 'en');
  i18n.changeLanguage('en');
}

export default i18n;
