const Anthropic = require('@anthropic-ai/sdk');
const config = require('./config');
const winston = require('winston');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter for API calls
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'claude_api',
  points: 50, // Number of requests
  duration: 60, // Per 60 seconds
});

// Logger setup
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'claude-integration' },
  transports: [
    new winston.transports.File({
      filename: 'logs/claude-error.log',
      level: 'error',
      maxsize: config.logMaxSize,
      maxFiles: config.logMaxFiles
    }),
    new winston.transports.File({
      filename: 'logs/claude-combined.log',
      maxsize: config.logMaxSize,
      maxFiles: config.logMaxFiles
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

class ClaudeIntegration {
  constructor() {
    if (!config.anthropicApiKey) {
      throw new Error('ANTHROPIC_API_KEY is required in environment variables');
    }

    this.client = new Anthropic({
      apiKey: config.anthropicApiKey
    });

    this.stats = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      lastRequestTime: null
    };
  }

  async checkTranslationQuality(englishText, sinhalaTrans, tamilTrans, context = {}) {
    const startTime = Date.now();

    try {
      // Rate limiting
      await rateLimiter.consume('claude_api');

      logger.info('Checking translation quality', {
        englishLength: englishText.length,
        sinhalaLength: sinhalaTrans.length,
        tamilLength: tamilTrans.length,
        context: context.page || 'unknown'
      });

      this.stats.totalRequests++;

      const message = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        temperature: 0.1, // Low temperature for consistent quality assessment
        system: config.translationPrompt,
        messages: [{
          role: 'user',
          content: `ENGLISH ORIGINAL: "${englishText}"

SINHALA TRANSLATION: "${sinhalaTrans}"
TAMIL TRANSLATION: "${tamilTrans}"

CONTEXT: ${JSON.stringify(context, null, 2)}

Analyze both translations and provide quality assessment in JSON format.`
        }]
      });

      const responseText = message.content[0].text;
      const responseTime = Date.now() - startTime;

      // Update stats
      this.stats.successfulRequests++;
      this.stats.lastRequestTime = new Date();
      this.stats.averageResponseTime =
        (this.stats.averageResponseTime + responseTime) / 2;

      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in Claude response');
      }

      const analysis = JSON.parse(jsonMatch[0]);

      // Validate analysis structure
      if (!analysis.quality_score || !analysis.enhanced_translation) {
        throw new Error('Invalid analysis structure from Claude');
      }

      logger.info('Translation analysis complete', {
        score: analysis.quality_score,
        issuesCount: analysis.issues?.length || 0,
        responseTime
      });

      return {
        success: true,
        analysis,
        metadata: {
          responseTime,
          model: 'claude-3-5-sonnet-20241022',
          timestamp: new Date().toISOString()
        }
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.stats.failedRequests++;

      logger.error('Translation check failed', {
        error: error.message,
        responseTime,
        englishText: englishText.substring(0, 100) + '...'
      });

      // Handle rate limiting
      if (error.message.includes('rate limit')) {
        await this.sleep(60000); // Wait 1 minute before retry
      }

      return {
        success: false,
        error: error.message,
        metadata: {
          responseTime,
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  async batchCheckTranslations(translations, batchSize = 3) {
    const results = [];
    const batches = [];

    // Split into batches
    for (let i = 0; i < translations.length; i += batchSize) {
      batches.push(translations.slice(i, i + batchSize));
    }

    logger.info(`Processing ${translations.length} translations in ${batches.length} batches`);

    for (const batch of batches) {
      const batchPromises = batch.map(trans =>
        this.checkTranslationQuality(
          trans.english,
          trans.sinhala,
          trans.tamil,
          trans.context
        )
      );

      const batchResults = await Promise.all(batchPromises);

      results.push(...batchResults.map((result, index) => ({
        id: batch[index].id,
        ...result
      })));

      // Rate limiting between batches
      if (batches.length > 1) {
        await this.sleep(2000);
      }
    }

    return results;
  }

  async enhanceTranslation(englishText, currentSinhala, currentTamil, context = {}) {
    const result = await this.checkTranslationQuality(
      englishText,
      currentSinhala,
      currentTamil,
      context
    );

    if (result.success && result.analysis.quality_score < config.qualityThreshold) {
      return {
        enhanced: true,
        sinhala: result.analysis.enhanced_translation?.sinhala || currentSinhala,
        tamil: result.analysis.enhanced_translation?.tamil || currentTamil,
        quality_score: result.analysis.quality_score,
        improvements: result.analysis.issues || []
      };
    }

    return {
      enhanced: false,
      sinhala: currentSinhala,
      tamil: currentTamil,
      quality_score: result.analysis?.quality_score || 0
    };
  }

  getStats() {
    return {
      ...this.stats,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    };
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = ClaudeIntegration;