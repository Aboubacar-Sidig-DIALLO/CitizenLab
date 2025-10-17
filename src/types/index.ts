// Types mis à jour

export interface Module {
  id: string;
  title: string;
  category: ModuleCategory;
  description: string;
  estimatedTime: number; // en minutes
  lessons: Lesson[];
  audioUrl?: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  prerequisites?: string[]; // IDs des modules requis
}

export interface Lesson {
  id: string;
  title: string;
  content: string; // Texte formaté (Markdown)
  keyPoints: string[];
  audioUrl?: string;
  relatedQuestions: string[]; // IDs des questions QCM liées
  estimatedTime: number; // en minutes
  order: number; // Ordre dans le module
}

export interface Question {
  id: string;
  category: ModuleCategory;
  difficulty: 'facile' | 'moyen' | 'difficile';
  question: string;
  options: string[]; // 4 options (A, B, C, D)
  correctAnswer: number; // Index de la bonne réponse (0-3)
  explanation: string; // Explication détaillée après réponse
  source: string; // Référence au Livret du citoyen
  examType: 'csp' | 'resident-card' | 'both'; // Type d'examen concerné
  tags: string[]; // Tags pour faciliter la recherche
}

export interface AudioContent {
  id: string;
  title: string;
  moduleId: string;
  lessonId?: string;
  duration: number; // en secondes
  fileUrl: string;
  transcription?: string; // Optionnel pour accessibilité
  quality: 'low' | 'medium' | 'high';
  fileSize: number; // en MB
}

export interface UserProgress {
  userId: string;
  overallScore: number; // Score moyen global
  moduleProgress: {
    [moduleId: string]: {
      completed: boolean;
      lessonsCompleted: string[];
      quizScore: number;
      timeSpent: number; // en minutes
      lastAccessed: Date;
      attempts: number;
    };
  };
  examAttempts: ExamAttempt[];
  weakCategories: ModuleCategory[]; // Catégories <70% de réussite
  streak: number; // Jours consécutifs d'utilisation
  lastActivityDate: Date;
  totalTimeSpent: number; // en minutes
  badges: string[]; // Badges obtenus
  achievements: Achievement[];
}

export interface ExamAttempt {
  id: string;
  date: Date;
  score: number;
  duration: number; // en minutes
  questionIds: string[];
  answers: (number | null)[];
  categoryScores: { [category: string]: number };
  examType: 'csp' | 'resident-card';
  mode: QuizMode;
  passed: boolean; // >= 80% pour CSP, >80% pour carte de résident
}

export interface ConsentSettings {
  analytics: boolean; // Statistiques d'usage anonymisées
  crashReports: boolean; // Rapports d'erreurs
  notifications: boolean; // Rappels d'étude
  dataSyncCloud: boolean; // Synchronisation optionnelle
  personalizedContent: boolean; // Contenu personnalisé basé sur les performances
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'study' | 'exam' | 'streak' | 'mastery';
}

// Types d'examen
export type ExamType = 'csp' | 'resident-card';

// Catégories de modules
export type ModuleCategory =
  | 'histoire'
  | 'institutions'
  | 'valeurs'
  | 'droits-devoirs'
  | 'geographie'
  | 'culture'
  | 'langue'
  | 'vie-pratique';

// Modes de quiz
export type QuizMode = 'examen-blanc' | 'apprentissage' | 'revision';

// Difficulté
export type Difficulty = 'facile' | 'moyen' | 'difficile';

// Thème
export type Theme = 'light' | 'dark' | 'auto';

// Langue
export type Language = 'fr' | 'en';

// Paramètres audio
export interface AudioSettings {
  speed: number; // 0.5x à 2.0x
  autoPlay: boolean;
  downloadQuality: 'low' | 'medium' | 'high';
  backgroundPlay: boolean;
}

// Paramètres de notifications
export interface NotificationSettings {
  dailyReminder: boolean;
  reminderTime: string; // Format HH:MM
  examReminder: boolean; // Rappel avant l'examen
  achievementNotification: boolean;
}

// Configuration de l'application
export interface AppConfig {
  version: string;
  buildNumber: string;
  lastUpdateCheck: Date;
  features: {
    offlineMode: boolean;
    cloudSync: boolean;
    analytics: boolean;
    notifications: boolean;
  };
}

// État de synchronisation
export interface SyncState {
  isOnline: boolean;
  lastSync: Date | null;
  pendingChanges: number;
  syncInProgress: boolean;
}

// Statistiques d'utilisation
export interface UsageStats {
  totalSessions: number;
  averageSessionDuration: number; // en minutes
  mostUsedFeatures: string[];
  favoriteModules: string[];
  studyPatterns: {
    preferredTimeOfDay: string;
    averageQuestionsPerSession: number;
    completionRate: number;
  };
}

// Erreur personnalisée
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
}

// Résultat d'une opération
export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: AppError;
  message?: string;
}

// Types de navigation
export type RootStackParamList = {
  Home: undefined;
  Learn: undefined;
  Practice: undefined;
  Audio: undefined;
  Profile: undefined;
  Settings: undefined;
  Quiz: { mode: QuizMode; moduleId?: string };
  QuizResults: { attemptId: string };
  ModuleDetail: { moduleId: string };
  LessonDetail: { lessonId: string };
  AudioPlayer: { audioId: string };
  Onboarding: undefined;
  Privacy: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Learn: undefined;
  Practice: undefined;
  Audio: undefined;
  Profile: undefined;
};

// Alias pour DifficultyLevel (pour compatibilité)
export type DifficultyLevel = Difficulty;
