// Thème mis à jour avec plus de couleurs

export const Colors = {
  // Couleurs principales (inspirées des valeurs républicaines)
  primary: '#0055A4', // Bleu France
  secondary: '#EF4135', // Rouge
  accent: '#FFFFFF', // Blanc
  
  // Couleurs de statut
  success: '#10B981', // Vert - réussite >80%
  warning: '#F59E0B', // Orange - 60-79%
  error: '#EF4444', // Rouge - <60%
  info: '#3B82F6', // Bleu info
  
  // Couleurs de fond
  background: {
    light: '#F9FAFB',
    dark: '#1F2937',
  },
  
  // Couleurs de surface
  surface: {
    light: '#FFFFFF',
    dark: '#374151',
  },
  
  // Couleurs de texte
  text: {
    light: '#111827',
    dark: '#F9FAFB',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
  
  // Couleurs de bordure
  border: {
    light: '#E5E7EB',
    dark: '#4B5563',
  },
  
  // Couleurs par catégorie
  category: {
    histoire: '#8B5CF6', // Violet
    institutions: '#3B82F6', // Bleu
    valeurs: '#EF4444', // Rouge
    'droits-devoirs': '#10B981', // Vert
    geographie: '#F59E0B', // Orange
    culture: '#EC4899', // Rose
    langue: '#06B6D4', // Cyan
    'vie-pratique': '#84CC16', // Lime
  },
  
  // Couleurs de progression
  progress: {
    excellent: '#10B981', // >= 90%
    good: '#3B82F6', // 80-89%
    average: '#F59E0B', // 70-79%
    poor: '#EF4444', // < 70%
  },
  
  // Couleurs de difficulté
  difficulty: {
    facile: '#10B981',
    moyen: '#F59E0B',
    difficile: '#EF4444',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontSize = {
  tiny: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const FontWeight = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

// Icônes par catégorie
export const CategoryIcons = {
  histoire: 'library-outline',
  institutions: 'business-outline',
  valeurs: 'heart-outline',
  'droits-devoirs': 'shield-checkmark-outline',
  geographie: 'map-outline',
  culture: 'musical-notes-outline',
  langue: 'chatbubbles-outline',
  'vie-pratique': 'home-outline',
};

// Icônes par difficulté
export const DifficultyIcons = {
  facile: 'checkmark-circle-outline',
  moyen: 'help-circle-outline',
  difficile: 'warning-outline',
};

// Icônes par type d'examen
export const ExamTypeIcons = {
  csp: 'card-outline',
  'resident-card': 'home-outline',
};

// Icônes par mode de quiz
export const QuizModeIcons = {
  'examen-blanc': 'fitness-outline',
  apprentissage: 'book-outline',
  revision: 'refresh-outline',
};

// Icônes par badge/achievement
export const AchievementIcons = {
  'first-quiz': 'trophy-outline',
  'perfect-score': 'star-outline',
  'week-streak': 'flame-outline',
  'month-streak': 'calendar-outline',
  'all-modules': 'checkmark-done-outline',
  'exam-ready': 'ribbon-outline',
};

// Durées d'animation
export const AnimationDuration = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Tailles d'écran (breakpoints)
export const Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Z-index
export const ZIndex = {
  dropdown: 1000,
  modal: 2000,
  toast: 3000,
  loading: 4000,
};