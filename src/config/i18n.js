// src/config/i18n.js - Internationalization configuration
/* eslint-disable */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Supports English (default), Sinhala, and Tamil

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
        analytics: 'Analytics',
        schoolsManager: 'Schools Manager',
        aiContentGenerator: 'AI Content Generator',
        imageGenerator: 'Image Generator',
        schoolDirectory: 'School Directory'
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
      
      // School Directory
      schoolDirectory: {
        title: 'School Directory',
        subtitle: 'Discover NARA AquaSchool partner schools across Sri Lanka',
        searchPlaceholder: 'Search schools...',
        filters: {
          province: 'Province',
          district: 'District',
          allProvinces: 'All Provinces',
          allDistricts: 'All Districts'
        },
        sort: {
          label: 'Sort By',
          name: 'Name',
          students: 'Students',
          year: 'Year'
        },
        stats: {
          schools: 'Partner Schools',
          students: 'Students Reached',
          districts: 'Districts',
          avgStudents: 'Avg Students'
        },
        views: {
          grid: 'Grid View',
          list: 'List View',
          map: 'Map View'
        },
        table: {
          name: 'School Name',
          type: 'Type',
          district: 'District',
          grades: 'Grades',
          medium: 'Medium',
          students: 'Students'
        },
        card: {
          grades: 'Grades',
          students: 'students'
        },
        mapView: {
          title: 'Interactive School Map',
          description: 'View schools across Sri Lanka on an interactive map',
          comingSoon: 'Google Maps integration coming soon'
        },
        download: 'Download Excel',
        downloadSuccess: 'School directory downloaded successfully!',
        clearFilters: 'Clear',
        resultsCount: 'Showing {{count}} of {{total}} schools',
        noResults: 'No schools found matching your criteria',
        errors: {
          loadFailed: 'Failed to load schools',
          downloadFailed: 'Failed to download directory'
        }
      },
      
      // Marine Life
      marine: {
        title: 'Marine Life',
        subtitle: "Explore Sri Lanka's Marine Biodiversity",
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
          all: 'All Species',
          fish: 'Fish',
          mammals: 'Marine Mammals',
          reptiles: 'Reptiles',
          invertebrates: 'Invertebrates',
          coral: 'Coral',
          plants: 'Marine Plants',
          birds: 'Seabirds'
        },
        stats: {
          totalSpecies: 'Recorded marine species',
          coralSpecies: 'Coral species documented',
          marineMammals: 'Marine mammal species in Sri Lanka'
        },
        gradeExplorer: {
          title: 'Grade Explorer',
          description: 'Choose your class to unlock curated modules, activities, and Sri Lankan species spotlights.',
          focusHeading: 'Focus Topics',
          goalsHeading: 'Learning Goals',
          activityHeading: 'Hands-on Ideas',
          speciesHeading: 'Spotlight Species'
        }
      },
      
      // Freshwater
      freshwater: {
        title: 'Sri Lankan Freshwater Atlas',
        subtitle: 'Accurate field data on rivers, reservoirs, wetlands, and waterfalls for classroom explorers.',
        mapSection: {
          heading: 'Interactive Freshwater Map',
          description:
            'Toggle the data layers to view Sri Lanka’s rivers, reservoirs, lakes, wetlands, and waterfalls. Click markers for verified statistics.'
        },
        tabs: {
          rivers: 'River Systems',
          reservoirs: 'Reservoirs & Dams',
          lakes: 'Natural Lakes & Lagoons',
          waterfalls: 'Waterfalls',
          wetlands: 'Wetlands & Marshes'
        },
        labels: {
          provinces: 'Provinces',
          area: 'Area',
          designation: 'Designation',
          ecosystems: 'Ecosystems',
          length: 'Length',
          basinArea: 'Basin area',
          annualFlow: 'Annual flow',
          storage: 'Storage',
          surfaceArea: 'Surface area',
          maxDepth: 'Max depth',
          height: 'Height',
          commissioned: 'Commissioned',
          purpose: 'Purpose',
          infrastructure: 'Linked projects'
        },
        conservationSection: {
          heading: 'Freshwater Stewardship Actions',
          helpTitle: 'Water-smart habits for students',
          tips: [
            'Carry a reusable water bottle and track how much you save each week.',
            'Record rainfall at school and compare it with river levels reported in the news.',
            'Organise a field audit to map drains, canals, and wetland buffers around your community.',
            'Report illegal dumping, sand mining, or invasive plants to local authorities.',
            'Plant native trees or vetiver grass along eroding stream banks.',
            'Share your findings with other classes through posters or short videos.'
          ],
          learnTitle: 'Learn and investigate',
          accordions: [
            {
              id: 'waterCycle',
              title: 'Island water cycle & monsoon rains',
              description:
                'Track how inter-monsoon showers, catchment forests, and reservoirs secure water for the dry zone.',
              buttonText: 'View hydrology lesson'
            },
            {
              id: 'endemicSpecies',
              title: 'Endemic freshwater biodiversity',
              description:
                'Profile fish, amphibians, and aquatic plants that occur only in Sri Lankan rivers and tanks.',
              buttonText: 'Open species guide'
            },
            {
              id: 'freshwaterThreats',
              title: 'Managing pollution and floods',
              description:
                'Investigate how wastewater, riverbank erosion, and urban runoff are monitored and controlled.',
              buttonText: 'Explore case studies'
            }
          ]
        }
      },
      
      // Virtual Dive
      virtualDive: {
        title: 'Virtual Dive Adventure',
        subtitle: "Swim through Sri Lanka's underwater worlds without getting wet!",
        choosePrompt: 'Choose Your Dive Site',
        startButton: 'Start Virtual Dive',
        cards: [
          {
            id: 'hikkaduwa',
            title: 'Hikkaduwa Coral Gardens',
            depth: '5-15 m',
            difficulty: 'beginner',
            description: 'Colorful coral gardens bursting with clownfish and turtles.'
          },
          {
            id: 'pigeon',
            title: 'Pigeon Island Sanctuary',
            depth: '3-12 m',
            difficulty: 'beginner',
            description: 'Protected marine park with bright shallow reefs and baby sharks.'
          },
          {
            id: 'barReef',
            title: 'Bar Reef Marine Park',
            depth: '10-25 m',
            difficulty: 'intermediate',
            description: "Sri Lanka's largest coral reef with rays, reef sharks, and swaying corals."
          },
          {
            id: 'greatBasses',
            title: 'Great Basses Wreck',
            depth: '30-40 m',
            difficulty: 'advanced',
            description: 'A legendary shipwreck hiding glittering fish schools and treasure tales.'
          }
        ],
        difficultyLabels: {
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced'
        },
        viewer: {
          back: '← Back to Dive Sites',
          heading: '360° Virtual Dive View',
          hint: '🎮 Use your mouse or finger to look around | {{site}}'
        },
        actions: {
          speciesGuide: 'Species Guide',
          map: 'Interactive Map',
          vrMode: 'VR Mode'
        }
      },
      
      // Games & Activities
      games: {
        title: 'Games Hub',
        subtitle: 'Play, learn, and collect points with splashy adventures!',
        cards: [
          {
            id: 'memoryMatch',
            title: 'Species Memory Match',
            description: 'Match marine animals with their names and superpowers.',
            difficulty: 'easy',
            points: 50
          },
          {
            id: 'oceanExplorer',
            title: 'Ocean Explorer',
            description: 'Sail through ocean zones and discover amazing sea creatures.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'biologistChallenge',
            title: 'Marine Biologist Challenge',
            description: 'Investigate habitats, conservation, and ocean science mysteries.',
            difficulty: 'hard',
            points: 150
          },
          {
            id: 'waveRider',
            title: 'Wave Rider',
            description: 'Surf the tides while learning about currents and weather.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'coralBuilder',
            title: 'Coral Reef Builder',
            description: 'Grow a healthy reef by keeping water clean and fish happy.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'conservationHero',
            title: 'Conservation Hero',
            description: 'Make smart choices to protect marine life and habitats.',
            difficulty: 'hard',
            points: 150
          }
        ],
        difficultyLabels: {
          easy: 'Easy',
          medium: 'Medium',
          hard: 'Challenging'
        },
        pointsLabel: '+{{points}} points',
        playButton: 'Play Now',
        comingSoon: {
          title: 'More Games Coming Soon!',
          description: "We're constantly building new educational games. Check back for fresh adventures!"
        }
      },
      quiz: {
        title: 'Quiz Center',
        subtitle: 'Test your knowledge, earn badges, and climb the leaderboard!',
        stats: {
          quizzesTaken: 'Quizzes Completed',
          averageScore: 'Average Score',
          perfectScores: 'Perfect Scores',
          totalPoints: 'Total Points'
        },
        listTitle: 'Available Quizzes',
        categories: {
          marine: 'Marine Life',
          heritage: 'Water Heritage',
          freshwater: 'Freshwater',
          conservation: 'Conservation',
          science: 'Science'
        },
        difficultyLabels: {
          easy: 'Easy',
          medium: 'Medium',
          hard: 'Challenging'
        },
        meta: {
          questions: '{{count}} questions',
          duration: '{{minutes}} min'
        },
        chips: {
          completed: 'Completed',
          score: '{{score}}%'
        },
        buttons: {
          start: 'Start Quiz',
          retake: 'Retake Quiz'
        },
        cards: {
          marineMammals: {
            title: 'Marine Mammals of Sri Lanka',
            description: 'Test your knowledge about whales, dolphins, and sneaky marine mammals.',
            category: 'marine',
            difficulty: 'medium'
          },
          coralReefs: {
            title: 'Coral Reef Ecosystems',
            description: 'Explore the busy life inside coral reefs.',
            category: 'marine',
            difficulty: 'easy'
          },
          waterHeritage: {
            title: 'Sri Lankan Water Heritage',
            description: 'Discover ancient tanks and amazing water engineers.',
            category: 'heritage',
            difficulty: 'hard'
          },
          freshwaterFish: {
            title: 'Freshwater Fish Friends',
            description: 'Identify colorful fish living in rivers and lakes.',
            category: 'freshwater',
            difficulty: 'medium'
          },
          oceanConservation: {
            title: 'Ocean Conservation',
            description: 'Learn about threats and how to be a sea guardian.',
            category: 'conservation',
            difficulty: 'easy'
          },
          naraResearch: {
            title: 'NARA Research Projects',
            description: 'Peek into the latest science happening at NARA labs.',
            category: 'science',
            difficulty: 'hard'
          }
        }
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
        analytics: 'විශ්ලේෂණය',
        schoolsManager: 'පාසල් කළමනාකරු',
        aiContentGenerator: 'AI අන්තර්ගත උත්පාදක',
        imageGenerator: 'රුප ජනකය',
        schoolDirectory: 'පාසල් නාමාවලිය'
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
      
      // School Directory
      schoolDirectory: {
        title: 'පාසල් නාමාවලිය',
        subtitle: 'ශ්‍රී ලංකාව පුරා නාරා ජලපාසල් හවුල් පාසල් සොයා ගන්න',
        searchPlaceholder: 'පාසල් සොයන්න...',
        filters: {
          province: 'පළාත',
          district: 'දිස්ත්‍රික්කය',
          allProvinces: 'සියලු පළාත්',
          allDistricts: 'සියලු දිස්ත්‍රික්'
        },
        sort: {
          label: 'පිළිවෙළට කරන්න',
          name: 'නම',
          students: 'සිසුන්',
          year: 'වර්ෂය'
        },
        stats: {
          schools: 'හවුල් පාසල්',
          students: 'ළඟා වූ සිසුන්',
          districts: 'දිස්ත්‍රික්',
          avgStudents: 'සාමාන්‍ය සිසුන්'
        },
        views: {
          grid: 'ග්‍රිඩ් දසුන',
          list: 'ලැයිස්තු දසුන',
          map: 'සිතියම් දසුන'
        },
        table: {
          name: 'පාසලේ නම',
          type: 'වර්ගය',
          district: 'දිස්ත්‍රික්කය',
          grades: 'ශ්‍රේණි',
          medium: 'මාධ්‍යය',
          students: 'සිසුන්'
        },
        card: {
          grades: 'ශ්‍රේණි',
          students: 'සිසුන්'
        },
        mapView: {
          title: 'අන්තර්ක්‍රියාකාරී පාසල් සිතියම',
          description: 'අන්තර්ක්‍රියාකාරී සිතියමක ශ්‍රී ලංකාව පුරා පාසල් බලන්න',
          comingSoon: 'ගූගල් සිතියම් ඒකාබද්ධතාවය ඉදිරියේදී පැමිණේ'
        },
        download: 'එක්සෙල් බාගන්න',
        downloadSuccess: 'පාසල් නාමාවලිය සාර්ථකව බාගත විය!',
        clearFilters: 'පැහැදිලි කරන්න',
        resultsCount: 'පාසල් {{total}} න් {{count}} පෙන්වමින්',
        noResults: 'ඔබේ නිර්ණායක වලට ගැලපෙන පාසල් හමු නොවීය',
        errors: {
          loadFailed: 'පාසල් පූරණය කිරීමට අසමත් විය',
          downloadFailed: 'නාමාවලිය බාගත කිරීමට අසමත් විය'
        }
      },
      
      // Marine Life
      marine: {
        title: 'සමුද්‍ර ජීවීන්',
        subtitle: 'ශ්‍රී ලංකාවේ සමුද්‍ර ජෛව විවිධත්වය ගවේෂණය කරන්න',
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
          all: 'සියලු විශේෂ',
          fish: 'මාළු',
          mammals: 'සමුද්‍ර ක්ෂීරපායීන්',
          reptiles: 'උරගයින්',
          invertebrates: 'අපෘෂ්ඨවංශීන්',
          coral: 'කොරල්',
          plants: 'සමුද්‍ර ශාක',
          birds: 'මුහුදු කුරුල්ලන්'
        },
        stats: {
          totalSpecies: 'ලේඛගත සමුද්‍ර විශේෂ',
          coralSpecies: 'ලේඛගත පරගු විශේෂ',
          marineMammals: 'ශ්‍රී ලංකාවේ සමුද්‍ර ක්ෂීරපායී විශේෂ'
        },
        gradeExplorer: {
          title: 'ශ්‍රේණි මට්ටම් ගවේෂණය',
          description: 'ඔබේ ශ්‍රේණිය තෝරා ශ්‍රී ලංකා සිසුන් සඳහා සකස් කළ පාඩම්, ක්‍රියාකාරිකත් හා විශේෂ දැනුම අග්‍රහණය කරන්න.',
          focusHeading: 'ප්‍රධාන කෙරුණු',
          goalsHeading: 'ඉගෙනුම් ඉලක්ක',
          activityHeading: 'අත්හදා බැලීම්',
          speciesHeading: 'විශේෂ ප්‍රකාශ'
        }
      },
      
      // Freshwater
      freshwater: {
        title: 'ශ්‍රී ලංකා මිරිදිය අට්ලසය',
        subtitle: 'ගංගා, ජලාශ, මඩලා සහ දියඇලි පිළිබඳ නිශ්චිත දත්ත අධ්‍යාපනික සොයාබැලීම් සඳහා.',
        mapSection: {
          heading: 'අන්තර්ක්‍රියාකාරී මිරිදිය සිතියම',
          description:
            'පෙරහන් ක්‍රියාත්මක කර ගංගා, ජලාශ, ස්වාභාවික වැව්, මඩලා සහ දියඇලි වෙන වෙනම බලන්න. ලකුණු මත ක්ලික් කර සත්‍යාපිත දත්ත කියවන්න.'
        },
        tabs: {
          rivers: 'ගඟ පද්ධති',
          reservoirs: 'ජලාශ හා ව්‍යාපෘති',
          lakes: 'ස්වාභාවික වැව් සහ ලාගුන්',
          waterfalls: 'දියඇලි',
          wetlands: 'මඩලා සහ දියබඩ'
        },
        labels: {
          provinces: 'පළාත්',
          area: 'විස්තීර්ණය',
          designation: 'ස්ථානයේ තත්ත්වය',
          ecosystems: 'වාසස්ථාන',
          length: 'දිග',
          basinArea: 'ප්‍රදේශ විස්තීර්ණය',
          annualFlow: 'වාර්ෂික ජල ගැලීම',
          storage: 'ගබඩා හැකියාව',
          surfaceArea: 'පෘෂ්ඨ විස්තීර්ණය',
          maxDepth: 'උපරිම ගැඹුර',
          height: 'උස',
          commissioned: 'ආරම්භ කළ වර්ෂය',
          purpose: 'පරමාර්ථය',
          infrastructure: 'සබැඳි ව්‍යාපෘති'
        },
        conservationSection: {
          heading: 'මිරිදිය සංරක්ෂණ ක්‍රියාමාර්ග',
          helpTitle: 'ශිෂ්‍යයින්ට කළ හැකි ජල-හිතවාදී ක්‍රියා',
          tips: [
            'නැවත භාවිත කළ හැකි ජල බෝතලයක් ගෙන එන්න සහ සතිපතා සුරකින්නේ කොපමණද සටහන් කරන්න.',
            'පාසලේ වැසි ප්‍රමාණය මිනුම් කර පුවත්පත් වල සඳහන් ගඟ ජල මට්ටම් සමඟ සසඳන්න.',
            'ප්‍රදේශයේ නාලා, නිරෝධන බන්ධනාගාර සහ මඩලා සිතියම් සංවිධානය කරන ක්ෂේත්‍ර පරීක්ෂණයක් කළයුතුයි.',
            'නීතිවිරෝධී අපද්‍රව්‍ය ප්‍රතික්ෂේපය, වැලි කැපීම හෝ ආගන්තුක ශාක දැකියහොත් ප්‍රාදේශීය අධිකාරියට දැනුම් දෙන්න.',
            'ගඟ තීර erosion වැළැක්වීමට ස්වදේශීය රුක්ෂ හෝ වේටිවර් තක්කල වගා කරන්න.',
            'ඔබේ සොයාගැනීම් පෝස්ටර් හෝ වීඩියෝ ලෙස වෙනත් පංති සමඟ බෙදාගන්න.'
          ],
          learnTitle: 'ඉගෙන ගැනීම සහ පරීක්ෂා කිරීම',
          accordions: [
            {
              id: 'waterCycle',
              title: 'ද්වීප ජල චක්‍රය සහ මෝසම් වර්ෂා',
              description:
                'අන්තර් මෝසම් වැසි, වගා වනාන්තර සහ ජලාශ වියලි කලාපයට ජලය භාරදෙන ආකාරය අධ්‍යායනය කරන්න.',
              buttonText: 'ජලාභිධාන පාඩම බලන්න'
            },
            {
              id: 'endemicSpecies',
              title: 'දේශීය මිරිදිය ජීව විවිධත්වය',
              description:
                'ශ්‍රී ලංකාවේ ගංගා සහ වැව් වල පමණක් පවත්නා මාළු, උරග හා ජල ශාක පිළිබඳ වාර්තා සකස් කරන්න.',
              buttonText: 'විශේෂ මාර්ගෝපදේශය විවෘත කරන්න'
            },
            {
              id: 'freshwaterThreats',
              title: 'දුෂණය හා ගංවතුර කළමනාකරණය',
              description:
                'මළජලය, ගඟ තීර කාන්දුවීම් සහ නගර ජල පාරිභෝගික දූෂණය පාලනය කෙරෙන ආකාරය පරීක්ෂා කරන්න.',
              buttonText: 'කේස් අධ්‍යයන මාලාව බලන්න'
            }
          ]
        }
      },
      
      // Virtual Dive
      virtualDive: {
        title: 'අතථ්‍ය කිමිදුම් ගමන',
        subtitle: 'ජලයේ යටට නොගොස්ම ශ්‍රී ලංකාවේ යටින් ලෝකය සොයා බලමු!',
        choosePrompt: 'ඔබේ කිමිදුම් ස්ථානය තෝරන්න',
        startButton: 'අතථ්‍ය කිමිදුම අරඹන්න',
        cards: [
          {
            id: 'hikkaduwa',
            title: 'හිකඩුව කොරල් උයන',
            depth: '5-15 m',
            difficulty: 'beginner',
            description: 'වර්ණවත් කොරල් සහ කඩුවැල් මාළු, කැස්බෑව් සමඟ සෙල්ලමක්.'
          },
          {
            id: 'pigeon',
            title: 'පිජන් දූපත් සංරක්ෂිතය',
            depth: '3-12 m',
            difficulty: 'beginner',
            description: 'සුරක්ෂිත කොරල් පන්ශාලාව. පැහැපත් දිය කඩයිත් කුඩා සුරුමීන්ත්.'
          },
          {
            id: 'barReef',
            title: 'බාර් රීෆ් සමුද්‍ර උද්‍යානය',
            depth: '10-25 m',
            difficulty: 'intermediate',
            description: 'ශ්‍රී ලංකාවේ විශාලම කොරල් පන්ශාලාව. රේ, රීෆ් සරු මීහුස්සා සහ නටන කොරල්.'
          },
          {
            id: 'greatBasses',
            title: 'ග්රේට් බැසස් කපල් ජලාශ්‍රය',
            depth: '30-40 m',
            difficulty: 'advanced',
            description: 'හිත් අරන් යටවූ පරණ නෞකාවක්. දිලිසෙන මාළු කණ්ඩායම් හා පොකුරු කතා.'
          }
        ],
        difficultyLabels: {
          beginner: 'ආරම්භක',
          intermediate: 'මධ්‍යම',
          advanced: 'අභියෝගී'
        },
        viewer: {
          back: '← කිමිදුම් ස්ථාන වෙත ආපසු',
          heading: '360° අතථ්‍ය කිමිදුම් දසුන',
          hint: '🎮 මවුසය හෝ අත භාවිතයෙන් අවට බලන්න | {{site}}'
        },
        actions: {
          speciesGuide: 'විශේෂ මාර්ගෝපදේශය',
          map: 'අන්තර්ක්‍රියාකාරී සිතියම',
          vrMode: 'VR ප්‍රකාරය'
        }
      },
      games: {
        title: 'ක්‍රීඩා මධ්‍යස්ථානය',
        subtitle: 'සෙල්ලම් කරමින් ඉගෙන ගන්න සහ ලකුණු රැස්කරන්න!',
        cards: [
          {
            id: 'memoryMatch',
            title: 'විශේෂ මතක ගැලපීම',
            description: 'සමුද්‍ර සතුන්ගේ නාම සහ ඔවුන්ගේ සුපිරි හැකියාවන් ගැලපුවා.',
            difficulty: 'easy',
            points: 50
          },
          {
            id: 'oceanExplorer',
            title: 'මුහුදු ගවේෂකයා',
            description: 'මුහුදු මට්ටම් හරහා ගමන් කර විශිෂ්ට ජීවින් හමුවන්න.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'biologistChallenge',
            title: 'සමුද්‍ර ජීව විද්‍යාඥ අභියෝගය',
            description: 'වාසස්ථාන, සංරක්ෂණය, විද්‍යා මර්ම සොයා බලන්න.',
            difficulty: 'hard',
            points: 150
          },
          {
            id: 'waveRider',
            title: 'තරංග සෙල්ලම්කාරයා',
            description: 'තරංග හරහා යමින් ජල ධාරා සහ කාලගුණය ගැන ඉගෙන ගන්න.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'coralBuilder',
            title: 'කොරල් පන්ශාලා ගොඩනගන්නා',
            description: 'පිරිසිදු ජලය සහ සතුන්ට සැනසුම ලබාදී රිෆ් එක සනාථ කරන්න.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'conservationHero',
            title: 'සංරක්ෂණ වීරයා',
            description: 'සමුද්‍ර ජීවිතය ආරක්ෂා කරන හොඳ තීරණ ගන්න.',
            difficulty: 'hard',
            points: 150
          }
        ],
        difficultyLabels: {
          easy: 'සරල',
          medium: 'මධ්‍යම',
          hard: 'අභියෝගී'
        },
        pointsLabel: '+{{points}} ලකුණු',
        playButton: 'දැන් සෙල්ලම් කරන්න',
        comingSoon: {
          title: 'තවත් ක්‍රීඩා ඉක්මනින්!',
          description: 'අපි නව අධ්‍යාපනික ක්‍රීඩා නිතරම නිර්මාණය කරමින් ඉන්නවා. නිතරම පිවිසෙන්න!'
        }
      },
      quiz: {
        title: 'ප්‍රශ්නාවලි මධ්‍යස්ථානය',
        subtitle: 'ඔබේ දැනුම පරීක්ෂා කර ලාංඡන එකතු කර ප්‍රමුඛ පුවරුවල ඉහළට ගියෙමු!',
        stats: {
          quizzesTaken: 'සම්පූර්ණ කළ ප්‍රශ්නාවලි',
          averageScore: 'සාමාන්‍ය ලකුණු',
          perfectScores: 'පූර්ණ ලකුණු',
          totalPoints: 'මුලු ලකුණු'
        },
        listTitle: 'ලබාගත හැකි ප්‍රශ්නාවලි',
        categories: {
          marine: 'සමුද්‍ර ජීවීන්',
          heritage: 'ජල උරුමය',
          freshwater: 'මිරිදිය',
          conservation: 'සංරක්ෂණය',
          science: 'විද්‍යාව'
        },
        difficultyLabels: {
          easy: 'සරල',
          medium: 'මධ්‍යම',
          hard: 'අභියෝගී'
        },
        meta: {
          questions: '{{count}} ප්‍රශ්න',
          duration: '{{minutes}} විනාඩි'
        },
        chips: {
          completed: 'සම්පූර්ණයි',
          score: '{{score}}%'
        },
        buttons: {
          start: 'ප්‍රශ්නාවලිය ආරම්භ කරන්න',
          retake: 'නැවත උත්සාහ කරන්න'
        },
        cards: {
          marineMammals: {
            title: 'ශ්‍රී ලංකාවේ සමුද්‍ර ක්ෂීරපායින්',
            description: 'තරණුවන්, දවුන්, සමුද්‍ර මීහුස්සා ගැන දැනුම පරීක්ෂා කරන්න.',
            category: 'marine',
            difficulty: 'medium'
          },
          coralReefs: {
            title: 'කොරල් පන්ශාලා පවිත්‍රය',
            description: 'කොරල් පන්ශාලාවේ සඟවා ඇති තරඟකාරි ජීවිතය සොයා බලන්න.',
            category: 'marine',
            difficulty: 'easy'
          },
          waterHeritage: {
            title: 'ශ්‍රී ලංකාවේ ජල උරුමය',
            description: 'පැරණි වැව් සහ විකාශිත ජල ඉංජිනේරුවන් ගැන ඉගෙන ගන්න.',
            category: 'heritage',
            difficulty: 'hard'
          },
          freshwaterFish: {
            title: 'මිරිදිය මාළු මිතුරන්',
            description: 'ගංගා සහ වැව් වල වර්ණවත් මිතුරන් හඳුනාගන්න.',
            category: 'freshwater',
            difficulty: 'medium'
          },
          oceanConservation: {
            title: 'මුහුදු සංරක්ෂණය',
            description: 'මුහුදු අභියෝග සහ ඔබට හොඳ රැකබලා ගැනීමේ ක්‍රියාමාර්ග ගැන ඉගෙන ගන්න.',
            category: 'conservation',
            difficulty: 'easy'
          },
          naraResearch: {
            title: 'නාරා පර්යේෂණ ව්‍යාපෘති',
            description: 'නාරා ගවේශන ශාලාවල සිදුවන නව විද්‍යාත්මක වැඩපිළිවෙළවලට බැලෙමු.',
            category: 'science',
            difficulty: 'hard'
          }
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
        analytics: 'பகுப்பாய்வு',
        schoolsManager: 'பள்ளி மேலாளர்',
        aiContentGenerator: 'AI உள்ளடக்க உருவாக்கி',
        imageGenerator: 'பட உருவாக்கி',
        schoolDirectory: 'பள்ளி பட்டியல்'
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
      
      // School Directory
      schoolDirectory: {
        title: 'பள்ளி பட்டியல்',
        subtitle: 'இலங்கை முழுவதும் நாரா நீர்ப்பள்ளி கூட்டாளர் பள்ளிகளை கண்டறியுங்கள்',
        searchPlaceholder: 'பள்ளிகளை தேடுங்கள்...',
        filters: {
          province: 'மாகாணம்',
          district: 'மாவட்டம்',
          allProvinces: 'அனைத்து மாகாணங்கள்',
          allDistricts: 'அனைத்து மாவட்டங்கள்'
        },
        sort: {
          label: 'வரிசைப்படுத்து',
          name: 'பெயர்',
          students: 'மாணவர்கள்',
          year: 'ஆண்டு'
        },
        stats: {
          schools: 'கூட்டாளர் பள்ளிகள்',
          students: 'சென்றடைந்த மாணவர்கள்',
          districts: 'மாவட்டங்கள்',
          avgStudents: 'சராசரி மாணவர்கள்'
        },
        views: {
          grid: 'கட்ட காட்சி',
          list: 'பட்டியல் காட்சி',
          map: 'வரைபட காட்சி'
        },
        table: {
          name: 'பள்ளி பெயர்',
          type: 'வகை',
          district: 'மாவட்டம்',
          grades: 'வகுப்புகள்',
          medium: 'மொழி',
          students: 'மாணவர்கள்'
        },
        card: {
          grades: 'வகுப்புகள்',
          students: 'மாணவர்கள்'
        },
        mapView: {
          title: 'ஊடாடும் பள்ளி வரைபடம்',
          description: 'ஊடாடும் வரைபடத்தில் இலங்கை முழுவதும் பள்ளிகளை பார்க்கவும்',
          comingSoon: 'கூகுள் வரைபட ஒருங்கிணைப்பு விரைவில்'
        },
        download: 'எக்செல் பதிவிறக்கம்',
        downloadSuccess: 'பள்ளி பட்டியல் வெற்றிகரமாக பதிவிறக்கம் செய்யப்பட்டது!',
        clearFilters: 'அழி',
        resultsCount: '{{total}} பள்ளிகளில் {{count}} காண்பிக்கப்படுகின்றன',
        noResults: 'உங்கள் அளவுகோல்களுடன் பொருந்தும் பள்ளிகள் இல்லை',
        errors: {
          loadFailed: 'பள்ளிகளை ஏற்ற முடியவில்லை',
          downloadFailed: 'பட்டியலை பதிவிறக்க முடியவில்லை'
        }
      },
      
      // Marine Life
      marine: {
        title: 'கடல் வாழ்க்கை',
        subtitle: 'இலங்கையின் கடல் உயிரியல் பல்வகைமையை ஆராயுங்கள்',
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
          all: 'அனைத்து இனங்கள்',
          fish: 'மீன்',
          mammals: 'கடல் பாலூட்டிகள்',
          reptiles: 'ஊர்வன',
          invertebrates: 'முதுகெலும்பில்லாதவை',
          coral: 'பவளம்',
          plants: 'கடல் தாவரங்கள்',
          birds: 'கடல் பறவைகள்'
        },
        stats: {
          totalSpecies: 'அறிக்கையிடப்பட்ட கடல்சார் இனங்கள்',
          coralSpecies: 'பதிவுசெய்யப்பட்ட பவள இனங்கள்',
          marineMammals: 'இலங்கையில் உள்ள கடல் பாலூட்டினங்கள்'
        },
        gradeExplorer: {
          title: 'தர அடிப்படையிலான கற்றல் வழிகாட்டி',
          description: 'உங்கள் வகுப்பு நிலையைத் தேர்வுசெய்து பாடங்கள், செயல்பாடுகள் மற்றும் இலங்கை கடல் உயிரினங்களைப் பற்றிய சிறப்பு தொகுப்புகளை திறக்கவும்.',
          focusHeading: 'கவனம் செலுத்தும் தலைப்புகள்',
          goalsHeading: 'கற்றல் இலக்குகள்',
          activityHeading: 'கைகூலி யோசனைகள்',
          speciesHeading: 'விளக்க உயிரினங்கள்'
        }
      },
      
      // Freshwater
      freshwater: {
        title: 'இலங்கை இன்நீர் அட்லஸ்',
        subtitle: 'ஆறுகள், அணைகள், ஈர நிலங்கள் மற்றும் நீர்வீழ்ச்சிகள் குறித்த துல்லியமான தரவு கல்வி பயன்பாட்டிற்கு.',
        mapSection: {
          heading: 'இணைக்கிற இன்நீர் வரைபடம்',
          description:
            'வடிகளை இயக்கி இலங்கையின் ஆறுகள், அணைகள், இயற்கை ஏரிகள், ஈர நிலங்கள் மற்றும் நீர்வீழ்ச்சிகளைப் பார்க்கவும். குறியீடுகளை சொடுக்கி சரிபார்க்கப்பட்ட புள்ளிவிவரங்களைப் படிக்கவும்.'
        },
        tabs: {
          rivers: 'ஆறு அமைப்புகள்',
          reservoirs: 'அணைகள் & நீர்த்தேக்கங்கள்',
          lakes: 'இயற்கை ஏரிகள் & குளங்கள்',
          waterfalls: 'நீர்வீழ்ச்சிகள்',
          wetlands: 'ஈர நிலங்கள் & பள்ளத்தாக்குகள்'
        },
        labels: {
          provinces: 'மாகாணங்கள்',
          area: 'பரப்பளவு',
          designation: 'அங்கீகாரம்',
          ecosystems: 'சூழல்கள்',
          length: 'நீளம்',
          basinArea: 'நீர்ப்பாசன பரப்பளவு',
          annualFlow: 'வருடாந்திர நீரோட்டம்',
          storage: 'சேமிப்பு கொள்ளளவு',
          surfaceArea: 'மேற்பரப்பு பரப்பளவு',
          maxDepth: 'அதிகபட்ச ஆழம்',
          height: 'உயரம்',
          commissioned: 'பணியில் தொடங்கிய ஆண்டு',
          purpose: 'நோக்கம்',
          infrastructure: 'இணைந்த திட்டங்கள்'
        },
        conservationSection: {
          heading: 'இன்நீர் பாதுகாப்பு நடவடிக்கைகள்',
          helpTitle: 'மாணவர்கள் செய்யக்கூடிய நீர் நட்பு செயல்கள்',
          tips: [
            'மீண்டும் பயன்படுத்தக்கூடிய நீர் பாட்டிலைப் பயன்படுத்தி வாராந்திர நீர் சேமிப்பை பதிவுசெய்யுங்கள்.',
            'பள்ளியில் மழைப்பொழிவை அளந்து, செய்திகளில் வெளியாகும் ஆறு நிலைகளுடன் ஒப்பிடுங்கள்.',
            'உங்கள் பகுதியின் கால்வாய்கள், வடிகால் மற்றும் ஈர நில எல்லைகளை வரைபடப்படுத்தும் தள ஆய்வை ஏற்பாடு செய்யுங்கள்.',
            'சட்டவிரோத குப்பை கொட்டுதல், மணல் எடுப்பு அல்லது வெளிநாட்டு தாவரங்கள் கண்டால் உள்ளூராட்சி அதிகாரிகளுக்கு தெரிவிக்கவும்.',
            'ஆற்றங்கரை இடரொதுக்கலைத் தடுக்க உள்ளூர் மரங்கள் அல்லது வெட்டிவர் புல் நடுங்கள்.',
            'உங்கள் ஆய்வுகளைப் போஸ்டர் அல்லது குறும்படங்களாக பிற வகுப்புகளுடன் பகிர்ந்து கொள்ளுங்கள்.'
          ],
          learnTitle: 'கற்றலும் ஆராய்வும்',
          accordions: [
            {
              id: 'waterCycle',
              title: 'தீவு நீர்சுழற்சி மற்றும் பருவமழை',
              description:
                'இடைமழைகள், பிடார் காடுகள் மற்றும் நீர்த்தேக்கங்கள் வறண்ட மண்டலங்களுக்கு தண்ணீர் வழங்கும் விதத்தைப் படித்தறிக.',
              buttonText: 'நீரியல் பாடத்தைப் பார்க்கவும்'
            },
            {
              id: 'endemicSpecies',
              title: 'இலங்கை சார்ந்த இன்நீர் உயிர் பல்வகைமை',
              description:
                'இலங்கையின் ஆறுகள் மற்றும் குளங்களில் மட்டும் காணப்படும் மீன்கள், இருவாழ்வினங்கள் மற்றும் நீர்த் தாவரங்களைப் பதிவுசெய்யுங்கள்.',
              buttonText: 'இன வழிகாட்டியைத் திறக்கவும்'
            },
            {
              id: 'freshwaterThreats',
              title: 'மாசுபாடு மற்றும் வெள்ள மேலாண்மை',
              description:
                'கழிவுநீர், கரையரிப்பு மற்றும் நகர மழை நீர் வெளியேற்றம் எவ்வாறு கண்காணித்து கட்டுப்படுத்தப்படுகிறது என்பதை ஆராயுங்கள்.',
              buttonText: 'வழக்குக்கூறு தொகுப்பைப் பாருங்கள்'
            }
          ]
        }
      },
      
      // Virtual Dive
      virtualDive: {
        title: 'மெய்நிகர் மூழ்கல் சாகசம்',
        subtitle: 'நீரில் நனைவதில்லாமல் இலங்கையின் நீரடி உலகில் நீந்துவோம்!',
        choosePrompt: 'உங்கள் மூழ்கல் இடத்தைத் தேர்ந்தெடுக்கவும்',
        startButton: 'மெய்நிகர் மூழ்கலை தொடங்கவும்',
        cards: [
          {
            id: 'hikkaduwa',
            title: 'ஹிக்கடுவா பவளத் தோட்டம்',
            depth: '5-15 m',
            difficulty: 'beginner',
            description: 'வண்ணமயமான பவள தோட்டங்களில் குளவி மீன்கள் மற்றும் கடல் ஆமைகள் நடனமாடுகின்றன.'
          },
          {
            id: 'pigeon',
            title: 'பிஜன் தீவு காப்பகம்',
            depth: '3-12 m',
            difficulty: 'beginner',
            description: 'பாதுகாக்கப்பட்ட கடல் பூங்கா; பிரகாசமான தாழ்ந்த பவளங்கள் மற்றும் குட்டி சுறாக்கள்.'
          },
          {
            id: 'barReef',
            title: 'பார் ரீஃப் கடல் பூங்கா',
            depth: '10-25 m',
            difficulty: 'intermediate',
            description: 'இலங்கையின் மிகப்பெரிய பவளப் பாறை. கதிரைகள், பாறைச் சுறாக்கள், ஊஞ்சலாடும் பவளங்கள்.'
          },
          {
            id: 'greatBasses',
            title: 'கிரேட் பாஸஸ் கப்பல் சிதிலம்',
            depth: '30-40 m',
            difficulty: 'advanced',
            description: 'புகழ்பெற்ற பழமையான கப்பல் சிதிலம்; மின்னும் மீன் கூட்டங்கள் மற்றும் புதையல் கதைகள்.'
          }
        ],
        difficultyLabels: {
          beginner: 'தொடக்க நிலை',
          intermediate: 'இடைநிலை',
          advanced: 'மேம்பட்ட'
        },
        viewer: {
          back: '← மூழ்கல் இடங்களுக்கு திரும்பவும்',
          heading: '360° மெய்நிகர் மூழ்கல் காட்சி',
          hint: '🎮 முயஸ் அல்லது விரலைப் பயன்படுத்தி சுற்றிப் பாருங்கள் | {{site}}'
        },
        actions: {
          speciesGuide: 'இன வழிகாட்டி',
          map: 'இணைய வரைபடம்',
          vrMode: 'VR முறை'
        }
      },
      games: {
        title: 'விளையாட்டு மையம்',
        subtitle: 'விளையாடி கற்று புள்ளிகளை சேகரிப்போம்!',
        cards: [
          {
            id: 'memoryMatch',
            title: 'இன நினைவுப் பொருத்தம்',
            description: 'கடல் உயிர்களின் பெயர்களையும் சூப்பர் திறன்களையும் பொருத்துங்கள்.',
            difficulty: 'easy',
            points: 50
          },
          {
            id: 'oceanExplorer',
            title: 'கடல் ஆய்வாளர்',
            description: 'கடல் பகுதிகள் வழியாகப் பயணம் செய்து அற்புதமான உயிர்களை கண்டுபிடியுங்கள்.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'biologistChallenge',
            title: 'கடல்சார் உயிரியல் சவால்',
            description: 'வாழ்விடங்கள், பாதுகாப்பு மற்றும் அறிவியல் புதிர்களை ஆராயுங்கள்.',
            difficulty: 'hard',
            points: 150
          },
          {
            id: 'waveRider',
            title: 'அலை ஓட்ட வீரர்',
            description: 'அலைகளோடு சவாரி செய்து நீரோட்டங்கள் மற்றும் வானிலை பற்றி கற்றுக் கொள்ளுங்கள்.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'coralBuilder',
            title: 'பவளப் பாறை கட்டுபவர்',
            description: 'நீரை தூய்மையாகவும் மீன்களை மகிழ்ச்சியாகவும் வைத்துக் கொண்டு பவளப் பாறையை வளர்த்துக் கொள்ளுங்கள்.',
            difficulty: 'medium',
            points: 100
          },
          {
            id: 'conservationHero',
            title: 'பாதுகாப்பு நாயகன்',
            description: 'கடல் உயிர்களையும் வாழ்விடங்களையும் காப்பாற்ற புத்திசாலித்தனமான முடிவுகளை எடுக்கவும்.',
            difficulty: 'hard',
            points: 150
          }
        ],
        difficultyLabels: {
          easy: 'எளிது',
          medium: 'இடைநிலை',
          hard: 'சவாலானது'
        },
        pointsLabel: '+{{points}} புள்ளிகள்',
        playButton: 'இப்போதே விளையாடு',
        comingSoon: {
          title: 'இன்னும் பல விளையாட்டுகள் விரைவில்!',
          description: 'நாங்கள் புதிதாக கல்வி விளையாட்டுகளை உருவாக்கிக் கொண்டிருக்கிறோம். புதுப்பிப்புகளுக்கு அடிக்கடி வருக!'
        }
      },
      quiz: {
        title: 'வினாடி வினா மையம்',
        subtitle: 'உங்கள் அறிவைச் சோதித்து பதக்கங்களைப் பெற்று முன்னணி பலகையில் உயருங்கள்!',
        stats: {
          quizzesTaken: 'முடித்த வினாடி வினாக்கள்',
          averageScore: 'சராசரி மதிப்பெண்',
          perfectScores: 'பரிபூரண மதிப்பெண்கள்',
          totalPoints: 'மொத்த புள்ளிகள்'
        },
        listTitle: 'கிடைக்கும் வினாடி வினாக்கள்',
        categories: {
          marine: 'கடல் வாழ்க்கை',
          heritage: 'நீர் பாரம்பரியம்',
          freshwater: 'நன்னீர்',
          conservation: 'பாதுகாப்பு',
          science: 'அறிவியல்'
        },
        difficultyLabels: {
          easy: 'எளிது',
          medium: 'இடைநிலை',
          hard: 'சவாலானது'
        },
        meta: {
          questions: '{{count}} கேள்விகள்',
          duration: '{{minutes}} நிமிடங்கள்'
        },
        chips: {
          completed: 'முடிந்தது',
          score: '{{score}}%'
        },
        buttons: {
          start: 'வினாடி வினாவை தொடங்கவும்',
          retake: 'மீண்டும் முயலவும்'
        },
        cards: {
          marineMammals: {
            title: 'இலங்கையின் கடல்சார் பாலூட்டுகள்',
            description: 'திமிங்கிலங்கள், டால்பின்கள் மற்றும் பிற கடல் பாலூட்டுகள் பற்றி உங்கள் அறிவைச் சோதிக்கவும்.',
            category: 'marine',
            difficulty: 'medium'
          },
          coralReefs: {
            title: 'பவளப் பாறை சூழல்கள்',
            description: 'பவளப் பாறைகளின் சுறுசுறுப்பு வாழ்க்கையை ஆராயுங்கள்.',
            category: 'marine',
            difficulty: 'easy'
          },
          waterHeritage: {
            title: 'இலங்கையின் நீர் பாரம்பரியம்',
            description: 'பழமையான தொட்டி அமைப்புகள் மற்றும் அற்புதமான நீரியல் பொறியாளர்களை அறியுங்கள்.',
            category: 'heritage',
            difficulty: 'hard'
          },
          freshwaterFish: {
            title: 'நன்னீர் மீன் நண்பர்கள்',
            description: 'ஆறுகளிலும் ஏரிகளிலும் வாழும் வண்ணமயமான நண்பர்களை அடையாளம் காணுங்கள்.',
            category: 'freshwater',
            difficulty: 'medium'
          },
          oceanConservation: {
            title: 'கடல் பாதுகாப்பு',
            description: 'அச்சங்கள் என்ன, கடலை எப்படி காப்பது என்பதை கற்றுக்கொள்ளுங்கள்.',
            category: 'conservation',
            difficulty: 'easy'
          },
          naraResearch: {
            title: 'நாரா ஆய்வு திட்டங்கள்',
            description: 'நாரா ஆய்வகங்களில் நடக்கும் சமீபத்திய அறிவியல் செயல்களைப் பாருங்கள்.',
            category: 'science',
            difficulty: 'hard'
          }
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

// Initialize i18n with English as default, supporting Sinhala and Tamil
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default to English
    fallbackLng: 'en',
    supportedLngs: ['en', 'si', 'ta'], // Support English, Sinhala, and Tamil
    nonExplicitSupportedLngs: false,
    load: 'languageOnly',
    debug: false,

    interpolation: {
      escapeValue: false
    }
  });

// Set English as default if no language is stored
if (typeof window !== 'undefined') {
  const storedLang = localStorage.getItem('i18nextLng');
  // If no language is stored or invalid, default to English
  if (!storedLang || !['en', 'si', 'ta'].includes(storedLang)) {
    localStorage.setItem('i18nextLng', 'en');
    i18n.changeLanguage('en');
  }
}

export default i18n;
