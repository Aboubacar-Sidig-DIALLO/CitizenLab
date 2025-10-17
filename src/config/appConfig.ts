// Configuration de l'application

export const AppConfig = {
  name: 'Examen Civique France',
  version: '1.0.0',
  description: 'Application d\'aide à la réussite de l\'examen civique français',
  
  // Configuration des examens
  exams: {
    csp: {
      name: 'Carte de Séjour Pluriannuelle',
      passingScore: 80,
      questionCount: 30,
      timeLimit: 30 * 60, // 30 minutes en secondes
    },
    'carte-resident': {
      name: 'Carte de Résident',
      passingScore: 80,
      questionCount: 30,
      timeLimit: 30 * 60, // 30 minutes en secondes
    },
  },
  
  // Configuration RGPD
  privacy: {
    dataRetentionDays: 365,
    allowAnalytics: false,
    allowCrashReports: false,
    allowNotifications: false,
    allowCloudSync: false,
  },
  
  // Configuration des notifications
  notifications: {
    reminderTimes: ['08:00', '12:00', '18:00', '20:00'],
    frequencies: ['daily', 'weekly'],
  },
  
  // Configuration audio
  audio: {
    speeds: [0.75, 1, 1.25, 1.5],
    defaultSpeed: 1,
    autoPlay: false,
  },
  
  // Configuration des modules
  modules: {
    categories: ['histoire', 'institutions', 'valeurs', 'droits-devoirs', 'geographie', 'culture'],
    defaultEstimatedTime: 30, // minutes
  },
  
  // Configuration des questions
  questions: {
    difficulties: ['facile', 'moyen', 'difficile'],
    optionsCount: 4,
    passingScore: 80,
  },
  
  // URLs et ressources
  urls: {
    privacyPolicy: 'https://example.com/privacy',
    termsOfService: 'https://example.com/terms',
    support: 'https://example.com/support',
  },
  
  // Métadonnées pour les stores
  store: {
    appStoreId: '123456789',
    playStoreId: 'com.example.civic-exam',
  },
};
