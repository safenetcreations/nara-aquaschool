// src/services/gamificationService.js - Gamification system for badges, achievements, and points
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  increment,
  arrayUnion,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Badge categories and definitions
export const BADGE_CATEGORIES = {
  EXPLORATION: 'exploration',
  KNOWLEDGE: 'knowledge',
  CONTRIBUTION: 'contribution',
  HERITAGE: 'heritage',
  CONSERVATION: 'conservation',
  SKILL: 'skill',
  SPECIAL: 'special'
};

// Badge definitions
export const BADGES = {
  // Exploration Badges
  REEF_EXPLORER: {
    id: 'reef_explorer',
    name: 'Reef Explorer',
    nameSi: 'ගල්පර ගවේෂකයා',
    nameTa: 'பவளப்பாறை ஆய்வாளர்',
    description: 'Completed virtual dive through coral reef',
    category: BADGE_CATEGORIES.EXPLORATION,
    icon: '🪸',
    points: 100,
    requirements: {
      type: 'virtual_dive',
      target: 'coral_reef',
      count: 1
    },
    levels: {
      bronze: { count: 1, points: 100 },
      silver: { count: 5, points: 250 },
      gold: { count: 10, points: 500 },
      platinum: { count: 20, points: 1000 }
    }
  },
  
  MANGROVE_NAVIGATOR: {
    id: 'mangrove_navigator',
    name: 'Mangrove Navigator',
    nameSi: 'කඩොලාන සංචාරකයා',
    nameTa: 'கடலோர காடு வழிகாட்டி',
    description: 'Explored mangrove ecosystems',
    category: BADGE_CATEGORIES.EXPLORATION,
    icon: '🌿',
    points: 100,
    requirements: {
      type: 'module_completion',
      target: 'mangroves',
      count: 1
    },
    levels: {
      bronze: { count: 1, points: 100 },
      silver: { count: 3, points: 250 },
      gold: { count: 5, points: 500 }
    }
  },
  
  DEEP_SEA_DIVER: {
    id: 'deep_sea_diver',
    name: 'Deep Sea Diver',
    nameSi: 'ගැඹුරු මුහුදු කිමිදුම්කරු',
    nameTa: 'ஆழ்கடல் மூழ்காளர்',
    description: 'Completed deep ocean exploration module',
    category: BADGE_CATEGORIES.EXPLORATION,
    icon: '🤿',
    points: 150,
    requirements: {
      type: 'module_completion',
      target: 'deep_ocean',
      count: 1
    }
  },
  
  // Knowledge Badges
  MARINE_BIOLOGIST: {
    id: 'marine_biologist',
    name: 'Junior Marine Biologist',
    nameSi: 'කනිෂ්ඨ සමුද්‍ර ජීව විද්‍යාඥ',
    nameTa: 'இளம் கடல் உயிரியலாளர்',
    description: 'Identified 25 different marine species',
    category: BADGE_CATEGORIES.KNOWLEDGE,
    icon: '🐠',
    points: 200,
    requirements: {
      type: 'species_identified',
      count: 25
    },
    levels: {
      bronze: { count: 10, points: 100 },
      silver: { count: 25, points: 200 },
      gold: { count: 50, points: 400 },
      platinum: { count: 100, points: 800 }
    }
  },
  
  QUIZ_MASTER: {
    id: 'quiz_master',
    name: 'Quiz Master',
    nameSi: 'ප්‍රශ්න ශූරයා',
    nameTa: 'வினாடி வினா மாஸ்டர்',
    description: 'Scored 90% or above in 10 quizzes',
    category: BADGE_CATEGORIES.KNOWLEDGE,
    icon: '🎯',
    points: 150,
    requirements: {
      type: 'quiz_excellence',
      threshold: 90,
      count: 10
    },
    levels: {
      bronze: { count: 5, points: 75 },
      silver: { count: 10, points: 150 },
      gold: { count: 25, points: 300 },
      platinum: { count: 50, points: 600 }
    }
  },
  
  OCEAN_SCHOLAR: {
    id: 'ocean_scholar',
    name: 'Ocean Scholar',
    nameSi: 'සාගර පණ්ඩිත',
    nameTa: 'கடல் அறிஞர்',
    description: 'Completed all ocean science modules',
    category: BADGE_CATEGORIES.KNOWLEDGE,
    icon: '🎓',
    points: 500,
    requirements: {
      type: 'category_completion',
      target: 'ocean_science',
      count: 'all'
    }
  },
  
  // Heritage Badges
  WEWA_EXPERT: {
    id: 'wewa_expert',
    name: 'Wewa Expert',
    nameSi: 'වැව් විශේෂඥ',
    nameTa: 'குளம் நிபுணர்',
    description: 'Mastered ancient irrigation systems',
    category: BADGE_CATEGORIES.HERITAGE,
    icon: '🏛️',
    points: 200,
    requirements: {
      type: 'module_completion',
      target: 'ancient_irrigation',
      count: 1
    },
    levels: {
      bronze: { modules: 1, points: 100 },
      silver: { modules: 3, points: 200 },
      gold: { modules: 5, points: 400 }
    }
  },
  
  HYDRAULIC_HISTORIAN: {
    id: 'hydraulic_historian',
    name: 'Hydraulic Historian',
    nameSi: 'ජල තාක්ෂණ ඉතිහාසඥ',
    nameTa: 'நீர்வழி வரலாற்றாளர்',
    description: 'Studied 10 historical water sites',
    category: BADGE_CATEGORIES.HERITAGE,
    icon: '📜',
    points: 150,
    requirements: {
      type: 'sites_studied',
      count: 10
    }
  },
  
  // Conservation Badges
  BEACH_GUARDIAN: {
    id: 'beach_guardian',
    name: 'Beach Guardian',
    nameSi: 'වෙරළ ආරක්ෂකයා',
    nameTa: 'கடற்கரை காவலர்',
    description: 'Participated in beach monitoring program',
    category: BADGE_CATEGORIES.CONSERVATION,
    icon: '🏖️',
    points: 150,
    requirements: {
      type: 'citizen_science',
      target: 'beach_monitoring',
      count: 1
    },
    levels: {
      bronze: { submissions: 1, points: 150 },
      silver: { submissions: 5, points: 300 },
      gold: { submissions: 10, points: 600 },
      platinum: { submissions: 25, points: 1200 }
    }
  },
  
  WATER_QUALITY_TESTER: {
    id: 'water_quality_tester',
    name: 'Water Quality Tester',
    nameSi: 'ජල ගුණත්ව පරීක්ෂක',
    nameTa: 'நீர் தர சோதனையாளர்',
    description: 'Submitted water quality data',
    category: BADGE_CATEGORIES.CONSERVATION,
    icon: '🧪',
    points: 100,
    requirements: {
      type: 'citizen_science',
      target: 'water_quality',
      count: 1
    }
  },
  
  TURTLE_PROTECTOR: {
    id: 'turtle_protector',
    name: 'Turtle Protector',
    nameSi: 'කැස්බෑ ආරක්ෂක',
    nameTa: 'ஆமை பாதுகாவலர்',
    description: 'Completed turtle conservation module',
    category: BADGE_CATEGORIES.CONSERVATION,
    icon: '🐢',
    points: 200,
    requirements: {
      type: 'module_completion',
      target: 'turtle_conservation',
      count: 1
    }
  },
  
  // Skill Badges
  PHOTOGRAPHER: {
    id: 'photographer',
    name: 'Marine Photographer',
    nameSi: 'සමුද්‍ර ඡායාරූප ශිල්පී',
    nameTa: 'கடல் புகைப்படக்காரர்',
    description: 'Submitted winning photo in competition',
    category: BADGE_CATEGORIES.SKILL,
    icon: '📸',
    points: 200,
    requirements: {
      type: 'competition_win',
      target: 'photography',
      count: 1
    }
  },
  
  STORYTELLER: {
    id: 'storyteller',
    name: 'Ocean Storyteller',
    nameSi: 'සාගර කතා කියන්නා',
    nameTa: 'கடல் கதைசொல்லி',
    description: 'Created and shared ocean story',
    category: BADGE_CATEGORIES.SKILL,
    icon: '✍️',
    points: 150,
    requirements: {
      type: 'content_creation',
      target: 'story',
      count: 1
    }
  },
  
  DATA_ANALYST: {
    id: 'data_analyst',
    name: 'Ocean Data Analyst',
    nameSi: 'සාගර දත්ත විශ්ලේෂක',
    nameTa: 'கடல் தரவு பகுப்பாய்வாளர்',
    description: 'Analyzed ocean data successfully',
    category: BADGE_CATEGORIES.SKILL,
    icon: '📊',
    points: 250,
    requirements: {
      type: 'data_analysis',
      count: 5
    }
  },
  
  // Special Badges
  NARA_VISITOR: {
    id: 'nara_visitor',
    name: 'NARA Visitor',
    nameSi: 'NARA අමුත්තා',
    nameTa: 'NARA பார்வையாளர்',
    description: 'Visited a NARA facility',
    category: BADGE_CATEGORIES.SPECIAL,
    icon: '🏢',
    points: 300,
    requirements: {
      type: 'field_visit',
      target: 'nara_facility',
      count: 1
    }
  },
  
  STREAK_MASTER: {
    id: 'streak_master',
    name: 'Streak Master',
    nameSi: 'අඛණ්ඩ ශූරයා',
    nameTa: 'தொடர் வெற்றியாளர்',
    description: '30 day learning streak',
    category: BADGE_CATEGORIES.SPECIAL,
    icon: '🔥',
    points: 500,
    requirements: {
      type: 'streak',
      days: 30
    },
    levels: {
      bronze: { days: 7, points: 100 },
      silver: { days: 15, points: 250 },
      gold: { days: 30, points: 500 },
      platinum: { days: 60, points: 1000 }
    }
  },
  
  BLUE_CHAMPION: {
    id: 'blue_champion',
    name: 'Blue Champion',
    nameSi: 'නිල් ශූරයා',
    nameTa: 'நீல சாம்பியன்',
    description: 'Top contributor of the month',
    category: BADGE_CATEGORIES.SPECIAL,
    icon: '🏆',
    points: 1000,
    requirements: {
      type: 'monthly_champion',
      rank: 1
    }
  }
};

// Achievement milestones
export const ACHIEVEMENTS = {
  FIRST_STEPS: {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Complete your first lesson',
    points: 50,
    requirement: { lessonsCompleted: 1 }
  },
  CURIOUS_MIND: {
    id: 'curious_mind',
    name: 'Curious Mind',
    description: 'Complete 10 lessons',
    points: 200,
    requirement: { lessonsCompleted: 10 }
  },
  KNOWLEDGE_SEEKER: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 50 lessons',
    points: 500,
    requirement: { lessonsCompleted: 50 }
  },
  QUIZ_ROOKIE: {
    id: 'quiz_rookie',
    name: 'Quiz Rookie',
    description: 'Take your first quiz',
    points: 50,
    requirement: { quizzesTaken: 1 }
  },
  CITIZEN_SCIENTIST: {
    id: 'citizen_scientist',
    name: 'Citizen Scientist',
    description: 'Make 5 citizen science contributions',
    points: 300,
    requirement: { citizenScienceContributions: 5 }
  },
  SPECIES_SPOTTER: {
    id: 'species_spotter',
    name: 'Species Spotter',
    description: 'Identify 50 different species',
    points: 400,
    requirement: { speciesIdentified: 50 }
  },
  DEDICATED_LEARNER: {
    id: 'dedicated_learner',
    name: 'Dedicated Learner',
    description: 'Maintain a 7-day streak',
    points: 200,
    requirement: { streak: 7 }
  },
  RISING_STAR: {
    id: 'rising_star',
    name: 'Rising Star',
    description: 'Reach Level 10',
    points: 500,
    requirement: { level: 10 }
  }
};

// Points calculation
export const POINT_VALUES = {
  LESSON_COMPLETE: 50,
  QUIZ_COMPLETE: 30,
  QUIZ_PERFECT: 50, // Bonus for 100% score
  CHALLENGE_SUBMIT: 100,
  CHALLENGE_WIN: 300,
  CITIZEN_SCIENCE: 75,
  SPECIES_IDENTIFY: 10,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 5, // Per day of streak
  COMMENT: 5,
  SHARE: 10,
  FIELD_VISIT: 200
};

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0,     // Level 1
  100,   // Level 2
  300,   // Level 3
  600,   // Level 4
  1000,  // Level 5
  1500,  // Level 6
  2100,  // Level 7
  2800,  // Level 8
  3600,  // Level 9
  4500,  // Level 10
  5500,  // Level 11
  6600,  // Level 12
  7800,  // Level 13
  9100,  // Level 14
  10500, // Level 15
  12000, // Level 16
  13600, // Level 17
  15300, // Level 18
  17100, // Level 19
  19000  // Level 20
];

// Award badge to user
export const awardBadge = async (userId, badgeId, level = 'bronze') => {
  try {
    const badge = BADGES[badgeId];
    if (!badge) {
      throw new Error('Badge not found');
    }
    
    // Create badge record
    const badgeRecord = {
      badgeId,
      name: badge.name,
      category: badge.category,
      level,
      points: badge.levels ? badge.levels[level].points : badge.points,
      awardedAt: serverTimestamp()
    };
    
    // Add to user's badges subcollection
    await setDoc(
      doc(db, 'students', userId, 'badges', `${badgeId}_${level}`),
      badgeRecord
    );
    
    // Update user profile
    await updateDoc(doc(db, 'users', userId), {
      badges: arrayUnion(`${badgeId}_${level}`),
      points: increment(badgeRecord.points),
      updatedAt: serverTimestamp()
    });
    
    // Check for level up
    await checkLevelUp(userId);
    
    return {
      success: true,
      badge: badgeRecord,
      message: `Congratulations! You earned the ${badge.name} badge!`
    };
  } catch (error) {
    console.error('Error awarding badge:', error);
    throw error;
  }
};

// Check and award achievements
export const checkAchievements = async (userId, stats) => {
  try {
    const newAchievements = [];
    
    for (const [key, achievement] of Object.entries(ACHIEVEMENTS)) {
      let qualified = true;
      
      for (const [stat, value] of Object.entries(achievement.requirement)) {
        if (stats[stat] < value) {
          qualified = false;
          break;
        }
      }
      
      if (qualified) {
        // Check if already has achievement
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userAchievements = userDoc.data()?.achievements || [];
        
        if (!userAchievements.includes(achievement.id)) {
          newAchievements.push(achievement);
          
          // Award achievement
          await updateDoc(doc(db, 'users', userId), {
            achievements: arrayUnion(achievement.id),
            points: increment(achievement.points),
            updatedAt: serverTimestamp()
          });
        }
      }
    }
    
    if (newAchievements.length > 0) {
      await checkLevelUp(userId);
    }
    
    return newAchievements;
  } catch (error) {
    console.error('Error checking achievements:', error);
    throw error;
  }
};

// Add points to user
export const addPoints = async (userId, points, reason) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      points: increment(points),
      updatedAt: serverTimestamp()
    });
    
    // Log point transaction
    await setDoc(doc(collection(db, 'users', userId, 'pointHistory')), {
      points,
      reason,
      timestamp: serverTimestamp()
    });
    
    // Check for level up
    await checkLevelUp(userId);
    
    return {
      success: true,
      points,
      message: `+${points} points earned!`
    };
  } catch (error) {
    console.error('Error adding points:', error);
    throw error;
  }
};

// Check and update user level
export const checkLevelUp = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    const currentPoints = userData.points || 0;
    const currentLevel = userData.level || 1;
    
    let newLevel = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (currentPoints >= LEVEL_THRESHOLDS[i]) {
        newLevel = i + 1;
        break;
      }
    }
    
    if (newLevel > currentLevel) {
      await updateDoc(doc(db, 'users', userId), {
        level: newLevel,
        updatedAt: serverTimestamp()
      });
      
      return {
        leveledUp: true,
        oldLevel: currentLevel,
        newLevel,
        message: `Level up! You're now level ${newLevel}!`
      };
    }
    
    return { leveledUp: false };
  } catch (error) {
    console.error('Error checking level up:', error);
    throw error;
  }
};

// Update learning streak
export const updateStreak = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    const lastActive = userData.lastActive?.toDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let newStreak = 1;
    
    if (lastActive) {
      const lastDate = new Date(lastActive);
      lastDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        newStreak = (userData.streak || 0) + 1;
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      } else {
        // Same day
        newStreak = userData.streak || 1;
      }
    }
    
    await updateDoc(doc(db, 'users', userId), {
      streak: newStreak,
      lastActive: serverTimestamp()
    });
    
    // Check for streak badges
    if (newStreak === 7 || newStreak === 15 || newStreak === 30 || newStreak === 60) {
      const level = newStreak === 7 ? 'bronze' : 
                   newStreak === 15 ? 'silver' :
                   newStreak === 30 ? 'gold' : 'platinum';
      await awardBadge(userId, 'STREAK_MASTER', level);
    }
    
    // Award streak bonus points
    if (newStreak > 1) {
      await addPoints(userId, POINT_VALUES.STREAK_BONUS * newStreak, 'Daily streak bonus');
    }
    
    return {
      streak: newStreak,
      message: newStreak > 1 ? `${newStreak} day streak!` : 'Welcome back!'
    };
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
};

// Get user badges
export const getUserBadges = async (userId) => {
  try {
    const badgesRef = collection(db, 'students', userId, 'badges');
    const snapshot = await getDocs(badgesRef);
    const badges = [];
    
    snapshot.forEach((doc) => {
      badges.push({ id: doc.id, ...doc.data() });
    });
    
    return badges;
  } catch (error) {
    console.error('Error fetching user badges:', error);
    throw error;
  }
};

// Get leaderboard
export const getLeaderboard = async (type = 'points', limit = 10, schoolId = null) => {
  try {
    let q;
    
    if (schoolId) {
      // School leaderboard
      q = query(
        collection(db, 'users'),
        where('schoolId', '==', schoolId),
        where('role', '==', 'student'),
        orderBy(type, 'desc'),
        limit(limit)
      );
    } else {
      // Global leaderboard
      q = query(
        collection(db, 'users'),
        where('role', '==', 'student'),
        orderBy(type, 'desc'),
        limit(limit)
      );
    }
    
    const snapshot = await getDocs(q);
    const leaderboard = [];
    let rank = 1;
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        rank: rank++,
        uid: doc.id,
        displayName: data.displayName,
        avatar: data.avatar,
        schoolId: data.schoolId,
        points: data.points || 0,
        level: data.level || 1,
        badges: data.badges?.length || 0,
        streak: data.streak || 0
      });
    });
    
    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

export default {
  BADGES,
  ACHIEVEMENTS,
  POINT_VALUES,
  LEVEL_THRESHOLDS,
  awardBadge,
  checkAchievements,
  addPoints,
  checkLevelUp,
  updateStreak,
  getUserBadges,
  getLeaderboard
};
