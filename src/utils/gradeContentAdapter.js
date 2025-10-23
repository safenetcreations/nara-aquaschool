// Grade-Based Content Adaptation System
// Filters and adapts content based on student grade level (5-10)

export const GRADE_LEVELS = {
  FOUNDATION: {
    grades: [5, 6],
    label: 'Grades 5-6',
    difficulty: 'beginner',
    readingLevel: 'simple',
    attentionSpan: 15, // minutes
    icon: '⭐'
  },
  INTERMEDIATE: {
    grades: [7, 8],
    label: 'Grades 7-8',
    difficulty: 'intermediate',
    readingLevel: 'moderate',
    attentionSpan: 25,
    icon: '⭐⭐'
  },
  ADVANCED: {
    grades: [9, 10],
    label: 'Grades 9-10',
    difficulty: 'advanced',
    readingLevel: 'academic',
    attentionSpan: 40,
    icon: '⭐⭐⭐',
    examPrep: true
  }
};

/**
 * Get difficulty level based on grade
 */
export const getDifficultyLevel = (grade) => {
  if (grade <= 6) return 'beginner';
  if (grade <= 8) return 'intermediate';
  return 'advanced';
};

/**
 * Get grade level object
 */
export const getGradeLevel = (grade) => {
  if (grade <= 6) return GRADE_LEVELS.FOUNDATION;
  if (grade <= 8) return GRADE_LEVELS.INTERMEDIATE;
  return GRADE_LEVELS.ADVANCED;
};

/**
 * Filter content array by grade range
 */
export const filterContentByGrade = (contentArray, userGrade) => {
  return contentArray.filter(item => {
    if (!item.gradeRange) return true; // Show all if no grade specified
    const { min, max } = item.gradeRange;
    return userGrade >= min && userGrade <= max;
  });
};

/**
 * Get appropriate description based on grade
 */
export const getGradeAppropriateText = (textObject, userGrade) => {
  if (!textObject) return '';
  
  if (typeof textObject === 'string') return textObject;
  
  // If object has grade-specific versions
  if (userGrade <= 6 && textObject.grade56) return textObject.grade56;
  if (userGrade <= 8 && textObject.grade78) return textObject.grade78;
  if (userGrade <= 10 && textObject.grade910) return textObject.grade910;
  
  // Fallback to common descriptions
  if (textObject.simple && userGrade <= 6) return textObject.simple;
  if (textObject.moderate && userGrade <= 8) return textObject.moderate;
  if (textObject.advanced) return textObject.advanced;
  
  return textObject.default || textObject.en || '';
};

/**
 * Adapt quiz difficulty based on grade
 */
export const getQuizSettings = (userGrade) => {
  const gradeLevel = getGradeLevel(userGrade);
  
  return {
    timePerQuestion: userGrade <= 6 ? 60 : userGrade <= 8 ? 90 : 120,
    hintsAllowed: userGrade <= 6 ? 3 : userGrade <= 8 ? 2 : 1,
    passingScore: userGrade <= 6 ? 60 : userGrade <= 8 ? 70 : 75,
    questionTypes: getQuestionTypes(userGrade),
    showExplanations: true,
    allowRetry: userGrade <= 8,
    examMode: userGrade >= 9
  };
};

/**
 * Get appropriate question types for grade
 */
const getQuestionTypes = (grade) => {
  if (grade <= 6) return ['multiple-choice', 'true-false', 'matching'];
  if (grade <= 8) return ['multiple-choice', 'fill-blank', 'ordering', 'matching'];
  return ['multiple-choice', 'short-answer', 'essay', 'data-analysis'];
};

/**
 * Get recommended activity duration
 */
export const getRecommendedDuration = (userGrade, activityType) => {
  const baseTime = {
    'game': userGrade <= 6 ? 10 : userGrade <= 8 ? 15 : 20,
    'video': userGrade <= 6 ? 5 : userGrade <= 8 ? 10 : 15,
    'reading': userGrade <= 6 ? 5 : userGrade <= 8 ? 10 : 15,
    'quiz': userGrade <= 6 ? 15 : userGrade <= 8 ? 20 : 30,
    'project': userGrade <= 6 ? 30 : userGrade <= 8 ? 45 : 60
  };
  
  return baseTime[activityType] || 15;
};

/**
 * Check if content is appropriate for grade
 */
export const isContentAppropriate = (content, userGrade) => {
  if (!content.gradeRange) return true;
  const { min, max } = content.gradeRange;
  return userGrade >= min && userGrade <= max;
};

/**
 * Get dashboard configuration by grade
 */
export const getDashboardConfig = (userGrade) => {
  if (userGrade <= 6) {
    return {
      layout: 'colorful-simple',
      widgets: ['daily-challenge', 'star-count', 'new-badge', 'fun-fact'],
      language: 'simple-encouraging',
      showAnimations: true,
      showStickers: true,
      progressStyle: 'stars'
    };
  } else if (userGrade <= 8) {
    return {
      layout: 'organized-detailed',
      widgets: ['weekly-goals', 'progress-charts', 'leaderboard', 'achievements'],
      language: 'informative-motivating',
      showAnalytics: true,
      progressStyle: 'bars-and-charts'
    };
  } else {
    return {
      layout: 'professional-advanced',
      widgets: ['syllabus-progress', 'exam-prep', 'research-projects', 'career-paths'],
      language: 'academic-goal-oriented',
      showAnalytics: true,
      showExamPrep: true,
      progressStyle: 'detailed-analytics',
      syllabusTracking: true
    };
  }
};

/**
 * Get learning path recommendations
 */
export const getRecommendedActivities = (userGrade, currentTopic) => {
  const activities = {
    'grade56': [
      { type: 'game', title: 'Play & Learn', icon: '🎮' },
      { type: 'video', title: 'Watch & Explore', icon: '📺' },
      { type: 'coloring', title: 'Color & Create', icon: '🎨' }
    ],
    'grade78': [
      { type: 'simulation', title: 'Interactive Lab', icon: '🔬' },
      { type: 'quiz', title: 'Test Knowledge', icon: '📝' },
      { type: 'project', title: 'Group Activity', icon: '👥' }
    ],
    'grade910': [
      { type: 'research', title: 'Research Project', icon: '📊' },
      { type: 'exam-prep', title: 'O/L Preparation', icon: '📚' },
      { type: 'analysis', title: 'Data Analysis', icon: '📈' }
    ]
  };
  
  if (userGrade <= 6) return activities.grade56;
  if (userGrade <= 8) return activities.grade78;
  return activities.grade910;
};

/**
 * Tag content with difficulty indicator
 */
export const addDifficultyTag = (content, userGrade) => {
  const level = getGradeLevel(userGrade);
  return {
    ...content,
    difficultyIcon: level.icon,
    difficultyLabel: level.difficulty,
    gradeLabel: level.label,
    isAppropriate: isContentAppropriate(content, userGrade)
  };
};

/**
 * Get O/L syllabus relevance (for grades 9-10)
 */
export const getSyllabusRelevance = (content, userGrade) => {
  if (userGrade < 9) return null;
  
  return {
    isRelevant: content.syllabusTopics && content.syllabusTopics.length > 0,
    units: content.syllabusTopics || [],
    examPrep: content.examPrep || false,
    priority: content.olPriority || 'medium'
  };
};

/**
 * Adapt vocabulary complexity
 */
export const adaptVocabulary = (text, userGrade) => {
  // Simple word replacements for younger grades
  const simplifications = {
    'balaenoptera musculus': userGrade <= 6 ? 'blue whale' : 'blue whale (Balaenoptera musculus)',
    'cetacean': userGrade <= 6 ? 'whale' : userGrade <= 8 ? 'whale or dolphin' : 'cetacean',
    'phytoplankton': userGrade <= 6 ? 'tiny ocean plants' : 'phytoplankton (microscopic plants)',
    'anthropogenic': userGrade <= 8 ? 'human-caused' : 'anthropogenic',
    'eutrophication': userGrade <= 8 ? 'water pollution from nutrients' : 'eutrophication'
  };
  
  let adaptedText = text;
  
  if (userGrade <= 8) {
    Object.keys(simplifications).forEach(term => {
      const replacement = simplifications[term];
      const regex = new RegExp(term, 'gi');
      adaptedText = adaptedText.replace(regex, replacement);
    });
  }
  
  return adaptedText;
};

/**
 * Get content engagement strategy
 */
export const getEngagementStrategy = (userGrade) => {
  return {
    rewards: {
      frequency: userGrade <= 6 ? 'every-action' : userGrade <= 8 ? 'every-milestone' : 'major-achievements',
      type: userGrade <= 6 ? 'stickers-stars' : userGrade <= 8 ? 'badges-points' : 'certificates-recognition'
    },
    feedback: {
      timing: userGrade <= 6 ? 'immediate' : userGrade <= 8 ? 'end-of-activity' : 'detailed-summary',
      style: userGrade <= 6 ? 'positive-emoji' : userGrade <= 8 ? 'constructive' : 'analytical'
    },
    challenges: {
      difficulty: getDifficultyLevel(userGrade),
      competition: userGrade <= 6 ? 'optional' : userGrade <= 8 ? 'encouraged' : 'integral'
    }
  };
};

export default {
  GRADE_LEVELS,
  getDifficultyLevel,
  getGradeLevel,
  filterContentByGrade,
  getGradeAppropriateText,
  getQuizSettings,
  getRecommendedDuration,
  isContentAppropriate,
  getDashboardConfig,
  getRecommendedActivities,
  addDifficultyTag,
  getSyllabusRelevance,
  adaptVocabulary,
  getEngagementStrategy
};
