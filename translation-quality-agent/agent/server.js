const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const config = require('./config');
const TranslationChecker = require('./translationChecker');
const ClaudeIntegration = require('./claudeIntegration');
const winston = require('winston');

// Rate limiter for API endpoints
const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'api',
  points: config.rateLimitMaxRequests,
  duration: config.rateLimitWindow * 60, // Convert minutes to seconds
});

// Logger setup
const logger = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'translation-agent-server' },
  transports: [
    new winston.transports.File({
      filename: 'logs/server-error.log',
      level: 'error',
      maxsize: config.logMaxSize,
      maxFiles: config.logMaxFiles
    }),
    new winston.transports.File({
      filename: 'logs/server.log',
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

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting middleware
app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: rejRes.msBeforeNext / 1000
    });
  }
});

// Initialize services
const checker = new TranslationChecker();
const claude = new ClaudeIntegration();

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('API Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    });
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime(),
    services: {
      claude: {
        status: 'operational',
        stats: claude.getStats()
      },
      checker: {
        status: checker.isScheduled ? 'scheduled' : 'idle',
        stats: checker.getStats()
      }
    },
    config: {
      autoUpdate: config.autoUpdate,
      qualityThreshold: config.qualityThreshold,
      checkInterval: config.checkInterval
    }
  };

  res.json(health);
});

// Get comprehensive stats
app.get('/api/stats', (req, res) => {
  res.json({
    server: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    },
    checker: checker.getStats(),
    claude: claude.getStats(),
    timestamp: new Date().toISOString()
  });
});

// Manual quality check trigger
app.post('/api/check/manual', async (req, res) => {
  try {
    logger.info('Manual quality check triggered', { ip: req.ip });

    const result = await checker.runQualityCheck();

    res.json({
      success: true,
      message: 'Quality check completed',
      ...result
    });

  } catch (error) {
    logger.error('Manual check failed', { error: error.message });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check single translation
app.post('/api/check/single', async (req, res) => {
  const { english, sinhala, tamil, context } = req.body;

  if (!english || !sinhala || !tamil) {
    return res.status(400).json({
      error: 'Missing required fields: english, sinhala, tamil'
    });
  }

  try {
    logger.info('Single translation check requested', {
      englishLength: english.length,
      context: context?.page || 'unknown'
    });

    const result = await claude.checkTranslationQuality(
      english,
      sinhala,
      tamil,
      context || {}
    );

    res.json(result);

  } catch (error) {
    logger.error('Single check failed', { error: error.message });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Batch check translations
app.post('/api/check/batch', async (req, res) => {
  const { translations } = req.body;

  if (!Array.isArray(translations) || translations.length === 0) {
    return res.status(400).json({
      error: 'translations must be a non-empty array'
    });
  }

  if (translations.length > 50) {
    return res.status(400).json({
      error: 'Maximum 50 translations per batch'
    });
  }

  try {
    logger.info('Batch translation check requested', {
      count: translations.length
    });

    const result = await claude.batchCheckTranslations(translations);

    res.json({
      success: true,
      results: result,
      count: result.length
    });

  } catch (error) {
    logger.error('Batch check failed', { error: error.message });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get check history
app.get('/api/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
  const history = checker.getCheckHistory(limit);

  res.json({
    history,
    count: history.length
  });
});

// Control scheduled checks
app.post('/api/schedule/:action', (req, res) => {
  const { action } = req.params;

  try {
    switch (action) {
      case 'start':
        checker.startScheduledChecks();
        res.json({ message: 'Scheduled checks started' });
        break;

      case 'stop':
        checker.stopScheduledChecks();
        res.json({ message: 'Scheduled checks stopped' });
        break;

      default:
        res.status(400).json({ error: 'Invalid action. Use start or stop.' });
    }
  } catch (error) {
    logger.error('Schedule control failed', { action, error: error.message });
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });

  res.status(500).json({
    error: 'Internal server error',
    message: config.nodeEnv === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  checker.stopScheduledChecks();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  checker.stopScheduledChecks();
  process.exit(0);
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start server
const server = app.listen(config.port, () => {
  // Start scheduled checks
  checker.startScheduledChecks();

  console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                         TRANSLATION QUALITY AGENT                           ║
║                                                                            ║
║  🚀 Server running on port ${config.port}                                     ║
║  🤖 Claude AI: ${config.anthropicApiKey ? 'Configured' : 'NOT CONFIGURED'}    ║
║  🔄 Auto-update: ${config.autoUpdate ? 'ENABLED' : 'DISABLED'}                 ║
║  📊 Quality threshold: ${config.qualityThreshold}%                             ║
║  ⏰ Check interval: ${config.checkInterval}                                   ║
║  🌐 React app: ${config.reactAppUrl}                                         ║
║                                                                            ║
║  📋 Endpoints:                                                            ║
║    GET  /health          - Health check                                    ║
║    GET  /api/stats       - System statistics                               ║
║    POST /api/check/manual - Trigger manual check                           ║
║    POST /api/check/single - Check single translation                       ║
║    POST /api/check/batch  - Check multiple translations                    ║
║    GET  /api/history      - Check history                                   ║
║                                                                            ║
║  🎯 Ready to enhance translation quality!                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝
  `);

  logger.info('Translation Quality Agent started', {
    port: config.port,
    autoUpdate: config.autoUpdate,
    qualityThreshold: config.qualityThreshold
  });
});

module.exports = { app, server };