// Configuration des environnements

export const ENV = {
  // Environnement actuel
  NODE_ENV: process.env.NODE_ENV || 'development',

  // URLs de l'API (si nécessaire)
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com',

  // Configuration de base de données
  DATABASE_NAME: 'civic_exam.db',

  // Configuration des notifications
  NOTIFICATION_CHANNEL_ID: 'civic_exam_notifications',

  // Configuration des analytics (désactivées par défaut)
  ANALYTICS_ENABLED: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === 'true',

  // Configuration de debug
  DEBUG_MODE: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',

  // Configuration des logs
  LOG_LEVEL: process.env.EXPO_PUBLIC_LOG_LEVEL || 'info',
};

/**
 * Vérifie si l'application est en mode développement
 */
export const isDevelopment = (): boolean => {
  return ENV.NODE_ENV === 'development';
};

/**
 * Vérifie si l'application est en mode production
 */
export const isProduction = (): boolean => {
  return ENV.NODE_ENV === 'production';
};

/**
 * Vérifie si le mode debug est activé
 */
export const isDebugMode = (): boolean => {
  return ENV.DEBUG_MODE || isDevelopment();
};

/**
 * Configuration spécifique à l'environnement
 */
export const getEnvironmentConfig = () => {
  if (isDevelopment()) {
    return {
      enableLogging: true,
      enableAnalytics: false,
      enableCrashReporting: false,
      apiTimeout: 10000,
      retryAttempts: 3,
    };
  }

  if (isProduction()) {
    return {
      enableLogging: false,
      enableAnalytics: ENV.ANALYTICS_ENABLED,
      enableCrashReporting: true,
      apiTimeout: 5000,
      retryAttempts: 2,
    };
  }

  // Configuration par défaut
  return {
    enableLogging: true,
    enableAnalytics: false,
    enableCrashReporting: false,
    apiTimeout: 8000,
    retryAttempts: 2,
  };
};
