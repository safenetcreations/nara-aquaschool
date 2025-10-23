// Grade-Specific Quiz Questions
// Provides age-appropriate quiz questions for students in grades 5-10

export const QUIZ_QUESTIONS_BY_GRADE = {
  blueWhale: {
    // Grade 5-6 Questions (Easy)
    beginner: [
      {
        id: 'bw-easy-1',
        question: 'What color is a blue whale?',
        type: 'multiple-choice',
        options: ['Blue-grey', 'Green', 'Red', 'Yellow'],
        correctAnswer: 0,
        hint: 'Think about its name!',
        points: 10,
        explanation: 'Blue whales are blue-grey in color, which is how they got their name!'
      },
      {
        id: 'bw-easy-2',
        question: 'What do blue whales eat?',
        type: 'multiple-choice',
        options: ['Fish', 'Krill (tiny shrimp)', 'Seaweed', 'Sharks'],
        correctAnswer: 1,
        hint: 'They eat tiny creatures',
        points: 10,
        explanation: 'Blue whales eat krill - tiny shrimp-like animals. They can eat up to 4 tons every day!'
      },
      {
        id: 'bw-easy-3',
        question: 'True or False: Blue whales are fish.',
        type: 'true-false',
        correctAnswer: false,
        points: 10,
        explanation: 'False! Blue whales are mammals, not fish. They breathe air and feed milk to their babies.'
      },
      {
        id: 'bw-easy-4',
        question: 'How long can a blue whale be?',
        type: 'multiple-choice',
        options: ['As long as 1 car', 'As long as 2 elephants', 'As long as 3 buses', 'As long as 1 room'],
        correctAnswer: 2,
        hint: 'They are VERY big!',
        points: 10,
        explanation: 'Blue whales can be as long as 3 school buses! That\'s about 30 meters!'
      },
      {
        id: 'bw-easy-5',
        question: 'Match the baby whale name:',
        type: 'matching',
        pairs: [
          { term: 'Baby whale', match: 'Calf' },
          { term: 'Baby cow', match: 'Calf' },
          { term: 'Tiny shrimp', match: 'Krill' }
        ],
        points: 15
      }
    ],
    
    // Grade 7-8 Questions (Medium)
    intermediate: [
      {
        id: 'bw-med-1',
        question: 'How do blue whales catch their food?',
        type: 'multiple-choice',
        options: [
          'They chase and bite fish',
          'They filter krill through baleen plates',
          'They hunt with teeth',
          'They eat plants from the ocean floor'
        ],
        correctAnswer: 1,
        points: 15,
        explanation: 'Blue whales use baleen plates (like a strainer) to filter krill from the water. They take in huge mouthfuls of water and push it out through the baleen, trapping the krill inside.'
      },
      {
        id: 'bw-med-2',
        question: 'What is the conservation status of blue whales?',
        type: 'multiple-choice',
        options: ['Least Concern', 'Vulnerable', 'Endangered', 'Extinct'],
        correctAnswer: 2,
        points: 15,
        explanation: 'Blue whales are classified as Endangered. Their population was heavily reduced by whaling but is slowly recovering.'
      },
      {
        id: 'bw-med-3',
        question: 'Fill in the blank: Blue whales migrate between _____ feeding grounds and _____ breeding grounds.',
        type: 'fill-blank',
        blanks: ['polar/cold', 'tropical/warm'],
        points: 20,
        acceptableAnswers: [
          ['polar', 'tropical'],
          ['cold', 'warm'],
          ['cold', 'tropical'],
          ['polar', 'warm']
        ],
        explanation: 'Blue whales travel from cold polar waters where food is abundant to warmer tropical waters for breeding.'
      },
      {
        id: 'bw-med-4',
        question: 'Which of these is a threat to blue whale populations? (Select all that apply)',
        type: 'multiple-select',
        options: [
          'Ship strikes',
          'Ocean noise pollution',
          'Climate change',
          'Too many sharks'
        ],
        correctAnswers: [0, 1, 2],
        points: 20,
        explanation: 'Ship strikes, noise pollution, and climate change all threaten blue whales. Sharks are not a significant threat to adult blue whales.'
      },
      {
        id: 'bw-med-5',
        question: 'Order these steps in the blue whale feeding process:',
        type: 'ordering',
        items: [
          'Whale spots krill patch',
          'Opens mouth wide',
          'Takes in huge volume of water and krill',
          'Pushes water out through baleen plates',
          'Swallows trapped krill'
        ],
        correctOrder: [0, 1, 2, 3, 4],
        points: 25
      }
    ],
    
    // Grade 9-10 Questions (Hard) - O/L Prep
    advanced: [
      {
        id: 'bw-hard-1',
        question: 'Explain how the baleen feeding mechanism of blue whales demonstrates adaptation to their environment. (5 marks)',
        type: 'short-answer',
        keywords: ['baleen', 'filter', 'krill', 'efficiency', 'adaptation', 'specialized'],
        points: 25,
        markScheme: {
          'Mentions baleen plates structure': 1,
          'Explains filtering mechanism': 1,
          'Links to krill prey': 1,
          'Discusses efficiency/advantage': 1,
          'Uses term "adaptation" correctly': 1
        },
        modelAnswer: 'The baleen feeding mechanism represents a specialized adaptation allowing blue whales to efficiently harvest small prey. Baleen plates are keratinous structures that act as a filtration system. When feeding, whales engulf large volumes of water containing krill, then use their tongue to push water out through baleen plates which trap the krill. This adaptation is highly efficient for consuming the massive quantities of small prey needed to sustain their enormous body size, demonstrating evolutionary specialization to their ecological niche.'
      },
      {
        id: 'bw-hard-2',
        question: 'Compare and contrast the cardiovascular adaptations of blue whales to terrestrial mammals.',
        type: 'short-answer',
        keywords: ['heart rate', 'diving', 'oxygen', 'myoglobin', 'blood volume'],
        points: 30,
        markScheme: {
          'Describes whale cardiovascular features': 2,
          'Compares to terrestrial mammals': 2,
          'Explains diving adaptations': 2,
          'Mentions myoglobin/oxygen storage': 2,
          'Concludes with functional significance': 2
        }
      },
      {
        id: 'bw-hard-3',
        question: 'Analyze the data: If blue whale population was 200,000 pre-whaling and is now 15,000, calculate the percentage decline.',
        type: 'calculation',
        correctAnswer: 92.5,
        acceptableRange: [92, 93],
        showWorking: true,
        points: 15,
        explanation: 'Calculation: (200,000 - 15,000) / 200,000 × 100 = 92.5% decline'
      },
      {
        id: 'bw-hard-4',
        question: 'Discuss the major threats to blue whale populations and evaluate current conservation strategies. (10 marks)',
        type: 'essay',
        wordLimit: [250, 400],
        points: 50,
        assessmentCriteria: {
          'Identifies multiple threats': 3,
          'Explains mechanisms of threats': 2,
          'Describes conservation measures': 2,
          'Evaluates effectiveness': 2,
          'Provides evidence/examples': 1
        },
        keyPoints: [
          'Historical whaling impact',
          'Ship strikes - modern threat',
          'Ocean noise pollution affecting communication',
          'Climate change - krill distribution changes',
          'IWC moratorium',
          'Marine protected areas',
          'Ship speed restrictions',
          'Population monitoring'
        ],
        syllabusReference: 'O/L Science Unit 14: Biodiversity and Conservation'
      },
      {
        id: 'bw-hard-5',
        question: 'The scientific name Balaenoptera musculus comes from Latin. "Balaena" means whale and "musculus" means muscular. Why is this an appropriate scientific name?',
        type: 'short-answer',
        keywords: ['size', 'muscle', 'power', 'binomial nomenclature', 'descriptive'],
        points: 20
      }
    ]
  },
  
  // Additional topics...
  marineConservation: {
    beginner: [
      {
        id: 'mc-easy-1',
        question: 'What does "endangered" mean?',
        type: 'multiple-choice',
        options: [
          'An animal that is very dangerous',
          'An animal that might disappear forever',
          'An animal that lives in danger',
          'An animal that is angry'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Endangered means an animal is in danger of disappearing forever (becoming extinct).'
      },
      {
        id: 'mc-easy-2',
        question: 'What can you do to help protect the ocean?',
        type: 'multiple-select',
        options: [
          'Don\'t throw plastic in the ocean',
          'Turn off lights to save energy',
          'Learn about marine animals',
          'Eat more fish'
        ],
        correctAnswers: [0, 1, 2],
        points: 15
      }
    ],
    
    intermediate: [
      {
        id: 'mc-med-1',
        question: 'Which of these is an example of habitat destruction?',
        type: 'multiple-choice',
        options: [
          'Planting mangrove trees',
          'Building hotels on beaches where turtles nest',
          'Creating marine protected areas',
          'Reducing fishing in certain areas'
        ],
        correctAnswer: 1,
        points: 15
      }
    ],
    
    advanced: [
      {
        id: 'mc-hard-1',
        question: 'Explain the concept of "ecosystem services" provided by coral reefs and why their conservation is economically important. (8 marks)',
        type: 'essay',
        wordLimit: [200, 300],
        points: 40,
        syllabusReference: 'O/L Science Unit 15: Environmental Conservation'
      }
    ]
  }
};

// Quiz configuration by grade
export const getQuizConfig = (grade) => {
  const configs = {
    beginner: {
      timePerQuestion: 60, // seconds
      hintsAllowed: 3,
      passingScore: 60,
      showExplanations: true,
      allowRetry: true,
      questionTypes: ['multiple-choice', 'true-false', 'matching'],
      maxQuestions: 10
    },
    intermediate: {
      timePerQuestion: 90,
      hintsAllowed: 2,
      passingScore: 70,
      showExplanations: true,
      allowRetry: true,
      questionTypes: ['multiple-choice', 'fill-blank', 'ordering', 'multiple-select'],
      maxQuestions: 15
    },
    advanced: {
      timePerQuestion: 120,
      hintsAllowed: 1,
      passingScore: 75,
      showExplanations: true,
      allowRetry: false,
      questionTypes: ['multiple-choice', 'short-answer', 'essay', 'calculation'],
      maxQuestions: 20,
      examMode: true
    }
  };
  
  if (grade <= 6) return { ...configs.beginner, difficulty: 'beginner' };
  if (grade <= 8) return { ...configs.intermediate, difficulty: 'intermediate' };
  return { ...configs.advanced, difficulty: 'advanced' };
};

// Get questions by topic and grade
export const getQuizQuestions = (topic, grade) => {
  const topicQuestions = QUIZ_QUESTIONS_BY_GRADE[topic];
  if (!topicQuestions) return [];
  
  if (grade <= 6) return topicQuestions.beginner || [];
  if (grade <= 8) return topicQuestions.intermediate || [];
  return topicQuestions.advanced || [];
};

// Generate a random quiz
export const generateQuiz = (topic, grade, questionCount = 5) => {
  const questions = getQuizQuestions(topic, grade);
  const config = getQuizConfig(grade);
  
  // Shuffle and select random questions
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(questionCount, questions.length));
  
  return {
    topic,
    grade,
    difficulty: config.difficulty,
    questions: selected,
    config,
    totalPoints: selected.reduce((sum, q) => sum + q.points, 0),
    timeLimit: selected.length * config.timePerQuestion
  };
};

export default {
  QUIZ_QUESTIONS_BY_GRADE,
  getQuizConfig,
  getQuizQuestions,
  generateQuiz
};
