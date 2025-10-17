// Configuration et utilitaires pour les tests

import { Question, Module, ExamAttempt } from '../types';

/**
 * Génère des questions de test
 */
export const generateTestQuestions = (count: number): Question[] => {
  const categories = ['histoire', 'institutions', 'valeurs', 'droits-devoirs', 'geographie', 'culture'];
  const difficulties = ['facile', 'moyen', 'difficile'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `test-q-${index}`,
    category: categories[index % categories.length] as any,
    difficulty: difficulties[index % difficulties.length] as any,
    question: `Question de test ${index + 1} ?`,
    options: [
      `Option A ${index + 1}`,
      `Option B ${index + 1}`,
      `Option C ${index + 1}`,
      `Option D ${index + 1}`,
    ],
    correctAnswer: index % 4,
    explanation: `Explication pour la question ${index + 1}`,
    source: `Source ${index + 1}`,
  }));
};

/**
 * Génère des modules de test
 */
export const generateTestModules = (count: number): Module[] => {
  const categories = ['histoire', 'institutions', 'valeurs', 'droits-devoirs', 'geographie', 'culture'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `test-module-${index}`,
    title: `Module de test ${index + 1}`,
    category: categories[index % categories.length] as any,
    description: `Description du module de test ${index + 1}`,
    estimatedTime: 30 + (index * 10),
    lessons: [
      {
        id: `test-lesson-${index}-1`,
        title: `Leçon 1 du module ${index + 1}`,
        content: `Contenu de la leçon 1 du module ${index + 1}`,
        keyPoints: [`Point clé 1`, `Point clé 2`],
        relatedQuestions: [`test-q-${index}`],
      },
    ],
  }));
};

/**
 * Génère des tentatives d'examen de test
 */
export const generateTestExamAttempts = (count: number): ExamAttempt[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `test-attempt-${index}`,
    date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Jours précédents
    score: 60 + (index * 5), // Scores croissants
    duration: 1200 + (index * 100), // Durées variables
    questionIds: [`test-q-${index}`, `test-q-${index + 1}`],
    answers: [0, 1],
    categoryScores: {
      histoire: 70 + (index * 2),
      institutions: 75 + (index * 2),
      valeurs: 80 + (index * 2),
    },
    examType: index % 2 === 0 ? 'csp' : 'carte-resident',
  }));
};

/**
 * Simule un délai pour les tests asynchrones
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Génère des données de test complètes
 */
export const generateTestData = () => {
  return {
    questions: generateTestQuestions(20),
    modules: generateTestModules(6),
    examAttempts: generateTestExamAttempts(5),
  };
};

/**
 * Utilitaires pour les tests de composants
 */
export const testUtils = {
  /**
   * Simule une pression sur un bouton
   */
  pressButton: (button: any) => {
    if (button.props.onPress) {
      button.props.onPress();
    }
  },
  
  /**
   * Simule un changement de texte dans un input
   */
  changeText: (input: any, text: string) => {
    if (input.props.onChangeText) {
      input.props.onChangeText(text);
    }
  },
  
  /**
   * Simule un scroll dans une liste
   */
  scrollTo: (scrollView: any, y: number) => {
    if (scrollView.props.onScroll) {
      scrollView.props.onScroll({ nativeEvent: { contentOffset: { y } } });
    }
  },
};

/**
 * Constantes pour les tests
 */
export const TEST_CONSTANTS = {
  TIMEOUT: 5000,
  DELAY: 100,
  RETRY_COUNT: 3,
  MOCK_DATA_SIZE: 10,
};
