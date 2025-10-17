// Utilitaires communs pour l'application

import { ExamType, ModuleCategory, DifficultyLevel } from '../types';

/**
 * Formate un nombre en pourcentage avec le symbole %
 */
export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

/**
 * Formate une durée en minutes et secondes
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}min ${remainingSeconds}s`;
};

/**
 * Formate une date en français
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formate une date courte
 */
export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString('fr-FR');
};

/**
 * Calcule le score moyen d'un tableau de scores
 */
export const calculateAverageScore = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

/**
 * Détermine la couleur selon le score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#10B981'; // Vert
  if (score >= 60) return '#F59E0B'; // Orange
  return '#EF4444'; // Rouge
};

/**
 * Génère un message de motivation selon le score
 */
export const getMotivationalMessage = (score: number): string => {
  if (score >= 90) return "Excellent ! Vous êtes prêt pour l'examen ! 🎉";
  if (score >= 80) return "Très bien ! Continuez sur cette lancée ! 💪";
  if (score >= 70) return "Bon travail ! Quelques révisions et vous y êtes ! 📚";
  if (score >= 60) return "Vous progressez bien ! Continuez à vous entraîner ! 🔥";
  return "Commencez votre préparation dès aujourd'hui ! 🚀";
};

/**
 * Vérifie si un score est suffisant pour réussir l'examen
 */
export const isPassingScore = (score: number, examType: ExamType): boolean => {
  const passingScore = examType === 'csp' ? 80 : 80;
  return score >= passingScore;
};

/**
 * Génère un ID unique
 */
export const generateId = (): string => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide une adresse email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calcule la progression d'un module
 */
export const calculateModuleProgress = (
  lessonsCompleted: string[],
  totalLessons: number
): number => {
  if (totalLessons === 0) return 0;
  return (lessonsCompleted.length / totalLessons) * 100;
};

/**
 * Obtient le nom complet d'une catégorie
 */
export const getCategoryName = (category: ModuleCategory): string => {
  const categoryNames = {
    histoire: 'Histoire de France',
    institutions: 'Institutions de la République',
    valeurs: 'Valeurs républicaines',
    'droits-devoirs': 'Droits et devoirs du citoyen',
    geographie: 'Géographie française',
    culture: 'Culture et patrimoine',
  };
  return categoryNames[category] || category;
};

/**
 * Obtient le nom complet d'un niveau de difficulté
 */
export const getDifficultyName = (difficulty: DifficultyLevel): string => {
  const difficultyNames = {
    facile: 'Facile',
    moyen: 'Moyen',
    difficile: 'Difficile',
  };
  return difficultyNames[difficulty] || difficulty;
};

/**
 * Obtient le nom complet d'un type d'examen
 */
export const getExamTypeName = (examType: ExamType): string => {
  const examTypeNames = {
    csp: 'Carte de Séjour Pluriannuelle',
    'carte-resident': 'Carte de Résident',
  };
  return examTypeNames[examType] || examType;
};

/**
 * Calcule le temps estimé total d'un module
 */
export const calculateModuleTime = (lessons: any[]): number => {
  return lessons.reduce((total, lesson) => total + (lesson.estimatedTime || 15), 0);
};

/**
 * Trie les modules par progression (moins avancés en premier)
 */
export const sortModulesByProgress = (modules: any[], progress: any) => {
  return modules.sort((a, b) => {
    const progressA = progress[a.id]?.quizScore || 0;
    const progressB = progress[b.id]?.quizScore || 0;
    return progressA - progressB;
  });
};

/**
 * Filtre les questions par catégorie et difficulté
 */
export const filterQuestions = (
  questions: any[],
  category?: ModuleCategory,
  difficulty?: DifficultyLevel
) => {
  return questions.filter(question => {
    if (category && question.category !== category) return false;
    if (difficulty && question.difficulty !== difficulty) return false;
    return true;
  });
};

/**
 * Mélange un tableau (algorithme Fisher-Yates)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Sélectionne un nombre aléatoire d'éléments d'un tableau
 */
export const selectRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
};

/**
 * Calcule les statistiques d'une catégorie
 */
export const calculateCategoryStats = (questions: any[], answers: (number | null)[]) => {
  const stats = {
    total: 0,
    correct: 0,
    percentage: 0,
  };
  
  questions.forEach((question, index) => {
    if (answers[index] !== null) {
      stats.total++;
      if (answers[index] === question.correctAnswer) {
        stats.correct++;
      }
    }
  });
  
  stats.percentage = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
  return stats;
};

/**
 * Valide les paramètres d'un quiz
 */
export const validateQuizParams = (mode: string, examType?: ExamType): boolean => {
  const validModes = ['apprentissage', 'examen-blanc', 'revision'];
  const validExamTypes = ['csp', 'carte-resident'];
  
  if (!validModes.includes(mode)) return false;
  if (examType && !validExamTypes.includes(examType)) return false;
  
  return true;
};

/**
 * Calcule le temps restant d'un quiz
 */
export const calculateTimeRemaining = (startTime: Date, timeLimit: number): number => {
  const elapsed = (Date.now() - startTime.getTime()) / 1000;
  return Math.max(0, timeLimit - elapsed);
};

/**
 * Formate le temps restant en minutes:secondes
 */
export const formatTimeRemaining = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
