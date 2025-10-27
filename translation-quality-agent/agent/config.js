require('dotenv').config();

module.exports = {
  // Claude AI Configuration
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,

  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Translation Quality Settings
  checkInterval: process.env.CHECK_INTERVAL || '*/30 * * * *',
  autoUpdate: process.env.AUTO_UPDATE === 'true',
  qualityThreshold: parseInt(process.env.QUALITY_THRESHOLD) || 80,
  maxConcurrentChecks: parseInt(process.env.MAX_CONCURRENT_CHECKS) || 5,

  // React App Integration
  reactAppUrl: process.env.REACT_APP_URL || 'http://localhost:3000',
  translationApiEndpoint: process.env.TRANSLATION_API_ENDPOINT || '/api/translations',

  // Logging Configuration
  logLevel: process.env.LOG_LEVEL || 'info',
  logMaxSize: process.env.LOG_MAX_SIZE || '10m',
  logMaxFiles: parseInt(process.env.LOG_MAX_FILES) || 5,

  // Security Settings
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW) || 15,
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',

  // Quality Standards
  governmentStandards: process.env.GOVERNMENT_STANDARDS === 'true',
  formalityLevel: process.env.FORMALITY_LEVEL || 'high',
  culturalSensitivity: process.env.CULTURAL_SENSITIVITY === 'true',

  // Premium Translation Prompt
  translationPrompt: `You are a senior government translator with 20+ years experience in Sinhala and Tamil translations for Sri Lankan government institutions.

TASK: Analyze and enhance the following translation for quality.

CRITERIA:
1. Grammar correctness (විශුද්ධ සිංහල / செந்தமிழ்)
2. Professional vocabulary level (Government/Ministry standards)
3. Conciseness and impact
4. Government-appropriate formality
5. Cultural sensitivity for Sri Lankan context
6. Consistency with provided glossary

LANGUAGE RULES:
Sinhala: Use pure Sinhala, proper sandhi, formal verb forms, correct particles
Tamil: Use செந்தமிழ், proper punarchi, formal endings, correct case markers

QUALITY THRESHOLDS:
- Grammar: 100% accuracy required
- Vocabulary: 95%+ formal level
- Cultural: 98%+ appropriateness
- Consistency: 100% within context

OUTPUT FORMAT (JSON):
{
  "quality_score": 0-100,
  "issues": [
    {
      "type": "grammar|vocabulary|formality|consistency|cultural",
      "severity": "high|medium|low",
      "original": "problematic text",
      "issue": "detailed description",
      "suggestion": "corrected text",
      "rationale": "why this improves quality"
    }
  ],
  "enhanced_translation": {
    "sinhala": "improved version with proper grammar and formal vocabulary",
    "tamil": "enhanced செந்தமிழ் version with literary terms"
  },
  "quality_metrics": {
    "grammar_score": 95,
    "vocabulary_score": 92,
    "cultural_score": 98,
    "consistency_score": 100,
    "overall_score": 96
  },
  "recommendations": [
    "Use in official government communications",
    "Suitable for ministry websites",
    "Meets gazette publication standards"
  ],
  "metadata": {
    "checked_at": "2025-01-26T10:00:00Z",
    "standards_applied": ["Government Gazette", "Ministry Guidelines", "Cultural Standards"],
    "reviewer_level": "Senior Government Translator"
  }
}

Be extremely strict in evaluation. Government standards require perfection.`
};