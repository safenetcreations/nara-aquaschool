const cron = require('node-cron');
const axios = require('axios');
const ClaudeIntegration = require('./claudeIntegration');
const config = require('./config');
const winston = require('winston');
const _ = require('lodash');

// Logger setup
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'translation-checker' },
  transports: [
    new winston.transports.File({
      filename: 'logs/checker-error.log',
      level: 'error',
      maxsize: config.logMaxSize,
      maxFiles: config.logMaxFiles
    }),
    new winston.transports.File({
      filename: 'logs/checker.log',
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

class TranslationChecker {
  constructor() {
    this.claude = new ClaudeIntegration();
    this.isRunning = false;
    this.isScheduled = false;
    this.lastCheck = null;
    this.nextCheck = null;

    this.stats = {
      totalChecks: 0,
      successfulChecks: 0,
      failedChecks: 0,
      translationsProcessed: 0,
      issuesFound: 0,
      autoFixed: 0,
      averageQualityScore: 0,
      lastQualityScores: []
    };

    this.checkHistory = [];
  }

  async fetchTranslationsFromReact() {
    try {
      const url = `${config.reactAppUrl}${config.translationApiEndpoint}/all`;
      logger.debug('Fetching translations from React app', { url });

      const response = await axios.get(url, {
        timeout: 30000, // 30 second timeout
        headers: {
          'User-Agent': 'Translation-Quality-Agent/1.0'
        }
      });

      const translations = response.data;

      if (!Array.isArray(translations)) {
        throw new Error('Invalid response format from React app');
      }

      logger.info(`Fetched ${translations.length} translations from React app`);
      return translations;

    } catch (error) {
      logger.error('Failed to fetch translations from React app', {
        error: error.message,
        url: `${config.reactAppUrl}${config.translationApiEndpoint}/all`
      });

      // Return empty array instead of throwing to allow graceful degradation
      return [];
    }
  }

  async updateTranslationInReact(id, updates) {
    try {
      const url = `${config.reactAppUrl}${config.translationApiEndpoint}/${id}`;

      const response = await axios.put(url, {
        ...updates,
        last_quality_check: new Date().toISOString(),
        quality_agent_version: '1.0.0'
      }, {
        timeout: 15000
      });

      logger.info('Translation updated in React app', { id, status: response.status });
      this.stats.autoFixed++;

      return true;

    } catch (error) {
      logger.error('Failed to update translation in React app', {
        id,
        error: error.message
      });
      return false;
    }
  }

  async processTranslation(translation) {
    try {
      this.stats.translationsProcessed++;

      const result = await this.claude.checkTranslationQuality(
        translation.english,
        translation.sinhala,
        translation.tamil,
        {
          page: translation.page,
          component: translation.component,
          context: translation.context
        }
      );

      if (!result.success) {
        this.stats.failedChecks++;
        return {
          id: translation.id,
          success: false,
          error: result.error
        };
      }

      const { analysis } = result;
      const qualityScore = analysis.quality_score;

      // Track quality scores
      this.stats.lastQualityScores.push(qualityScore);
      if (this.stats.lastQualityScores.length > 100) {
        this.stats.lastQualityScores.shift(); // Keep only last 100 scores
      }

      this.stats.averageQualityScore =
        _.mean(this.stats.lastQualityScores);

      // Log issues
      if (analysis.issues && analysis.issues.length > 0) {
        this.stats.issuesFound += analysis.issues.length;

        const highSeverityIssues = analysis.issues.filter(
          issue => issue.severity === 'high'
        );

        if (highSeverityIssues.length > 0) {
          logger.warn('High severity issues found', {
            id: translation.id,
            issues: highSeverityIssues.length,
            score: qualityScore
          });
        }
      }

      // Auto-fix if enabled and quality is below threshold
      let autoFixed = false;
      if (config.autoUpdate && qualityScore < config.qualityThreshold) {
        const enhanced = analysis.enhanced_translation;

        if (enhanced) {
          const updateData = {
            sinhala: enhanced.sinhala || translation.sinhala,
            tamil: enhanced.tamil || translation.tamil,
            quality_score: qualityScore,
            quality_issues: analysis.issues || [],
            quality_check_date: new Date().toISOString()
          };

          autoFixed = await this.updateTranslationInReact(translation.id, updateData);
        }
      }

      this.stats.successfulChecks++;

      return {
        id: translation.id,
        success: true,
        quality_score: qualityScore,
        issues_count: analysis.issues?.length || 0,
        auto_fixed: autoFixed,
        processing_time: result.metadata?.responseTime || 0
      };

    } catch (error) {
      logger.error('Error processing translation', {
        id: translation.id,
        error: error.message
      });

      this.stats.failedChecks++;
      return {
        id: translation.id,
        success: false,
        error: error.message
      };
    }
  }

  async runQualityCheck() {
    if (this.isRunning) {
      logger.warn('Quality check already running, skipping...');
      return {
        success: false,
        message: 'Check already in progress'
      };
    }

    this.isRunning = true;
    const checkStartTime = Date.now();

    logger.info('Starting comprehensive translation quality check');

    try {
      // Fetch all translations
      const translations = await this.fetchTranslationsFromReact();

      if (translations.length === 0) {
        logger.warn('No translations found to check');
        return {
          success: true,
          message: 'No translations to check',
          stats: this.stats
        };
      }

      // Process translations in batches
      const results = [];
      const batches = _.chunk(translations, config.maxConcurrentChecks);

      for (const batch of batches) {
        const batchPromises = batch.map(trans => this.processTranslation(trans));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);

        // Small delay between batches to prevent overwhelming the API
        if (batches.length > 1) {
          await this.sleep(1000);
        }
      }

      const checkDuration = Date.now() - checkStartTime;
      this.lastCheck = new Date();

      // Calculate next check time
      this.nextCheck = new Date(this.lastCheck.getTime() + this.getIntervalMs());

      // Log summary
      const successful = results.filter(r => r.success).length;
      const autoFixed = results.filter(r => r.auto_fixed).length;
      const avgQuality = _.mean(results.filter(r => r.quality_score).map(r => r.quality_score));

      logger.info('Translation quality check completed', {
        total: translations.length,
        successful,
        autoFixed,
        averageQuality: avgQuality ? avgQuality.toFixed(1) : 'N/A',
        duration: `${checkDuration}ms`
      });

      // Store check history
      this.checkHistory.push({
        timestamp: this.lastCheck,
        duration: checkDuration,
        translationsChecked: translations.length,
        successful,
        autoFixed,
        averageQuality: avgQuality,
        stats: { ...this.stats }
      });

      // Keep only last 50 checks
      if (this.checkHistory.length > 50) {
        this.checkHistory.shift();
      }

      this.stats.totalChecks++;

      return {
        success: true,
        message: `Checked ${translations.length} translations`,
        stats: this.getStats(),
        results: results.slice(0, 10) // Return first 10 results for summary
      };

    } catch (error) {
      logger.error('Quality check failed', { error: error.message });
      return {
        success: false,
        message: error.message,
        stats: this.getStats()
      };
    } finally {
      this.isRunning = false;
    }
  }

  startScheduledChecks() {
    if (this.isScheduled) {
      logger.warn('Scheduled checks already running');
      return;
    }

    logger.info('Starting scheduled quality checks', {
      interval: config.checkInterval
    });

    this.isScheduled = true;

    // Parse cron expression to calculate interval
    this.nextCheck = new Date(Date.now() + this.getIntervalMs());

    cron.schedule(config.checkInterval, async () => {
      await this.runQualityCheck();
    });

    // Run initial check after 30 seconds
    setTimeout(() => {
      this.runQualityCheck();
    }, 30000);

    logger.info('Scheduled checks activated');
  }

  stopScheduledChecks() {
    if (this.isScheduled) {
      cron.getTasks().forEach(task => task.destroy());
      this.isScheduled = false;
      logger.info('Scheduled checks stopped');
    }
  }

  getIntervalMs() {
    // Convert cron expression to milliseconds (simplified)
    // This is a basic implementation - for production, use a proper cron parser
    const interval = config.checkInterval;

    if (interval.startsWith('*/')) {
      const minutes = parseInt(interval.split('/')[1]);
      return minutes * 60 * 1000;
    }

    return 30 * 60 * 1000; // Default 30 minutes
  }

  getStats() {
    return {
      ...this.stats,
      isRunning: this.isRunning,
      isScheduled: this.isScheduled,
      lastCheck: this.lastCheck,
      nextCheck: this.nextCheck,
      uptime: process.uptime(),
      checkHistory: this.checkHistory.slice(-5) // Last 5 checks
    };
  }

  getCheckHistory(limit = 10) {
    return this.checkHistory.slice(-limit);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = TranslationChecker;