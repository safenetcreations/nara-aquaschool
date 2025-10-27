import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TranslationContext = createContext();

export const TranslationProvider = ({
  children,
  agentUrl = 'http://localhost:5000',
  autoCheckInterval = 300000, // 5 minutes
  enableMonitoring = true
}) => {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');
  const [agentStatus, setAgentStatus] = useState({
    connected: false,
    lastCheck: null,
    stats: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check agent health
  const checkAgentHealth = useCallback(async () => {
    try {
      const response = await axios.get(`${agentUrl}/health`, {
        timeout: 5000
      });

      setAgentStatus({
        connected: true,
        lastCheck: new Date(),
        stats: response.data.services,
        uptime: response.data.uptime
      });

      setError(null);
    } catch (err) {
      setAgentStatus(prev => ({
        ...prev,
        connected: false,
        lastCheck: new Date()
      }));

      setError(err.message);
    }
  }, [agentUrl]);

  // Check translation quality
  const checkTranslationQuality = useCallback(async (
    english,
    sinhala,
    tamil,
    context = {}
  ) => {
    if (!agentStatus.connected) {
      throw new Error('Translation agent not connected');
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${agentUrl}/api/check/single`, {
        english,
        sinhala,
        tamil,
        context
      }, {
        timeout: 30000
      });

      return response.data;
    } catch (err) {
      throw new Error(`Quality check failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [agentUrl, agentStatus.connected]);

  // Register translation for monitoring
  const registerTranslation = useCallback((key, translationData) => {
    setTranslations(prev => ({
      ...prev,
      [key]: {
        ...translationData,
        registeredAt: new Date(),
        lastChecked: null,
        qualityScore: null
      }
    }));
  }, []);

  // Update translation
  const updateTranslation = useCallback((key, updates) => {
    setTranslations(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
        lastUpdated: new Date()
      }
    }));
  }, []);

  // Get translation with fallback
  const t = useCallback((key, fallback = key) => {
    const translation = translations[key];
    if (!translation) return fallback;

    switch (language) {
      case 'si':
        return translation.sinhala || fallback;
      case 'ta':
        return translation.tamil || fallback;
      default:
        return translation.english || fallback;
    }
  }, [translations, language]);

  // Trigger manual quality check
  const triggerQualityCheck = useCallback(async () => {
    if (!agentStatus.connected) {
      throw new Error('Agent not connected');
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${agentUrl}/api/check/manual`, {}, {
        timeout: 60000 // 1 minute timeout for manual checks
      });

      // Refresh agent status
      await checkAgentHealth();

      return response.data;
    } catch (err) {
      throw new Error(`Manual check failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [agentUrl, agentStatus.connected, checkAgentHealth]);

  // Get all translations for API
  const getAllTranslations = useCallback(() => {
    return Object.entries(translations).map(([key, data]) => ({
      id: key,
      english: data.english,
      sinhala: data.sinhala,
      tamil: data.tamil,
      page: data.page,
      component: data.component,
      context: data.context
    }));
  }, [translations]);

  // Initialize health checking
  useEffect(() => {
    if (enableMonitoring) {
      checkAgentHealth();

      const interval = setInterval(checkAgentHealth, autoCheckInterval);
      return () => clearInterval(interval);
    }
  }, [checkAgentHealth, enableMonitoring, autoCheckInterval]);

  // Auto-register translations with agent (if connected)
  useEffect(() => {
    if (agentStatus.connected && Object.keys(translations).length > 0) {
      // This would typically sync with a backend API
      // For now, just log that translations are registered
      console.log(`Translation Agent: ${Object.keys(translations).length} translations registered`);
    }
  }, [agentStatus.connected, translations]);

  const contextValue = {
    // Core translation functions
    t,
    language,
    setLanguage,

    // Translation management
    translations,
    registerTranslation,
    updateTranslation,
    getAllTranslations,

    // Agent integration
    agentStatus,
    checkTranslationQuality,
    triggerQualityCheck,
    checkAgentHealth,

    // State
    isLoading,
    error,

    // Configuration
    agentUrl,
    enableMonitoring
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

// Hook for checking translation quality
export const useTranslationQuality = () => {
  const { checkTranslationQuality, isLoading, agentStatus } = useTranslation();

  const checkQuality = useCallback(async (english, sinhala, tamil, context) => {
    return await checkTranslationQuality(english, sinhala, tamil, context);
  }, [checkTranslationQuality]);

  return {
    checkQuality,
    isLoading,
    isAgentConnected: agentStatus.connected
  };
};

// Hook for manual quality checks
export const useQualityCheck = () => {
  const { triggerQualityCheck, isLoading, agentStatus } = useTranslation();

  const runCheck = useCallback(async () => {
    return await triggerQualityCheck();
  }, [triggerQualityCheck]);

  return {
    runCheck,
    isLoading,
    isAgentConnected: agentStatus.connected,
    lastCheck: agentStatus.lastCheck,
    stats: agentStatus.stats
  };
};