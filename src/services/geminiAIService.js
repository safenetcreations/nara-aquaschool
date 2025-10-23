// Gemini AI Service for Automatic Content & Image Generation
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
// IMPORTANT: Replace with your actual API key or use environment variable
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';
const genAI = new GoogleGenerativeAI(API_KEY);

// Gemini 2.5 Flash model for fast content generation
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

/**
 * Generate educational content about marine species
 * @param {string} speciesName - Name of the marine species
 * @param {string} language - Language code (en, si, ta)
 * @returns {Promise<Object>} Generated content
 */
export const generateMarineSpeciesContent = async (speciesName, language = 'en') => {
  try {
    const languageMap = {
      en: 'English',
      si: 'Sinhala',
      ta: 'Tamil'
    };

    const prompt = `
Generate comprehensive educational content about "${speciesName}" for Sri Lankan school students.
Language: ${languageMap[language]}

Please provide the following in JSON format:
{
  "commonName": "${speciesName}",
  "scientificName": "Scientific name",
  "description": "Detailed 3-4 sentence description suitable for students aged 10-18",
  "habitat": "Primary habitat (ocean/reef/coastal)",
  "conservationStatus": "Conservation status (LC/NT/VU/EN/CR)",
  "diet": "What it eats",
  "size": "Typical size",
  "funFact": "Interesting fun fact that will engage students",
  "threats": "Main threats to survival",
  "localRelevance": "How this species relates to Sri Lankan waters",
  "educationalValue": "Why students should learn about this species"
}

Focus on accuracy and educational value. Make it engaging for young learners.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse AI response');
  } catch (error) {
    console.error('Error generating species content:', error);
    throw error;
  }
};

/**
 * Generate image prompt for marine species
 * @param {string} speciesName - Name of the marine species
 * @param {string} context - Context (underwater, reef, ocean, etc.)
 * @returns {Promise<string>} Detailed image generation prompt
 */
export const generateImagePrompt = async (speciesName, context = 'underwater') => {
  try {
    const prompt = `
Create a detailed, professional image generation prompt for "${speciesName}" in a ${context} setting.

The image should be:
- Scientifically accurate
- Suitable for educational materials
- High quality and photorealistic
- Appropriate for school students
- Include natural Sri Lankan marine environment when relevant

Generate a detailed prompt (2-3 sentences) that can be used with image generation AI like DALL-E or Midjourney.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating image prompt:', error);
    throw error;
  }
};

/**
 * Generate quiz questions about marine topic
 * @param {string} topic - Topic name
 * @param {number} count - Number of questions
 * @param {string} difficulty - easy/medium/hard
 * @returns {Promise<Array>} Array of quiz questions
 */
export const generateQuizQuestions = async (topic, count = 5, difficulty = 'medium') => {
  try {
    const prompt = `
Generate ${count} multiple-choice quiz questions about "${topic}" for Sri Lankan students.
Difficulty: ${difficulty}

Format each question as JSON:
{
  "question": "Question text",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0-3 (index of correct option),
  "explanation": "Why this is the correct answer",
  "difficulty": "${difficulty}",
  "category": "marine-biology/ocean-science/conservation/etc"
}

Return a JSON array of ${count} questions. Make them engaging and educational.
Focus on Sri Lankan marine biodiversity and conservation.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON array from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse quiz questions');
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw error;
  }
};

/**
 * Generate lesson plan
 * @param {string} topic - Lesson topic
 * @param {string} gradeLevel - Grade level (5-7, 8-10, 11-13)
 * @param {string} language - Language code
 * @returns {Promise<Object>} Lesson plan
 */
export const generateLessonPlan = async (topic, gradeLevel = '8-10', language = 'en') => {
  try {
    const languageMap = {
      en: 'English',
      si: 'Sinhala',
      ta: 'Tamil'
    };

    const prompt = `
Create a comprehensive lesson plan about "${topic}" for Sri Lankan students in grades ${gradeLevel}.
Language: ${languageMap[language]}

Provide in JSON format:
{
  "title": "Lesson title",
  "subject": "Marine Biology/Ocean Science/Environmental Studies",
  "gradeLevel": "${gradeLevel}",
  "duration": "45/60/90 minutes",
  "learningObjectives": ["Objective 1", "Objective 2", "Objective 3"],
  "materials": ["Material 1", "Material 2"],
  "introduction": "Hook to engage students (2-3 sentences)",
  "activities": [
    {
      "name": "Activity name",
      "duration": "15 minutes",
      "description": "What students will do",
      "materials": ["Materials needed"]
    }
  ],
  "assessment": "How to assess student learning",
  "homework": "Optional homework assignment",
  "localContext": "How this relates to Sri Lankan marine environment",
  "vocabulary": ["Key term 1: definition", "Key term 2: definition"]
}

Make it practical and aligned with Sri Lankan curriculum standards.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse lesson plan');
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw error;
  }
};

/**
 * Generate fun fact about marine life
 * @param {string} topic - Topic or species
 * @returns {Promise<string>} Fun fact
 */
export const generateFunFact = async (topic) => {
  try {
    const prompt = `
Generate ONE fascinating, scientifically accurate fun fact about "${topic}" that will excite Sri Lankan school students.

Requirements:
- Must be true and verifiable
- Should be surprising or little-known
- Maximum 2 sentences
- Engaging for ages 10-18
- Relate to Sri Lankan waters if possible

Just return the fun fact text, no extra formatting.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error generating fun fact:', error);
    throw error;
  }
};

/**
 * Generate multilingual content (all 3 languages at once)
 * @param {string} speciesName - Species name
 * @returns {Promise<Object>} Content in all languages
 */
export const generateMultilingualContent = async (speciesName) => {
  try {
    const prompt = `
Generate educational content about "${speciesName}" in THREE languages: English, Sinhala, and Tamil.

Return JSON in this exact format:
{
  "commonName": {
    "en": "English name",
    "si": "සිංහල නම",
    "ta": "தமிழ் பெயர்"
  },
  "description": {
    "en": "English description (3-4 sentences)",
    "si": "සිංහල විස්තරය",
    "ta": "தமிழ் விளக்கம்"
  },
  "funFact": {
    "en": "English fun fact",
    "si": "සිංහල විනෝදජනක කරුණ",
    "ta": "தமிழ் சுவாரஸ்யமான உண்மை"
  },
  "scientificName": "Scientific name (same for all languages)",
  "habitat": "Habitat type",
  "conservationStatus": "Status"
}

Ensure all content is accurate, educational, and culturally appropriate for Sri Lankan students.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse multilingual content');
  } catch (error) {
    console.error('Error generating multilingual content:', error);
    throw error;
  }
};

/**
 * Analyze image and generate description
 * @param {File} imageFile - Image file
 * @returns {Promise<Object>} Image analysis
 */
export const analyzeMarineImage = async (imageFile) => {
  try {
    // Convert image to base64
    const reader = new FileReader();
    const base64Image = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: imageFile.type
      }
    };

    const prompt = `
Analyze this marine life image and provide:
1. Species identification (if possible)
2. Description of what you see
3. Educational value
4. Suggested tags/keywords

Return as JSON:
{
  "identifiedSpecies": "Species name or 'Unknown'",
  "confidence": "high/medium/low",
  "description": "What's in the image",
  "educationalNotes": "What students can learn",
  "tags": ["tag1", "tag2", "tag3"],
  "suggestedActivities": ["Activity suggestion 1", "Activity 2"]
}
`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse image analysis');
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

/**
 * Generate batch content for multiple species
 * @param {Array<string>} speciesNames - Array of species names
 * @returns {Promise<Array>} Array of generated content
 */
export const generateBatchContent = async (speciesNames) => {
  try {
    const results = await Promise.all(
      speciesNames.map(name => generateMultilingualContent(name))
    );
    return results;
  } catch (error) {
    console.error('Error generating batch content:', error);
    throw error;
  }
};

export default {
  generateMarineSpeciesContent,
  generateImagePrompt,
  generateQuizQuestions,
  generateLessonPlan,
  generateFunFact,
  generateMultilingualContent,
  analyzeMarineImage,
  generateBatchContent
};
