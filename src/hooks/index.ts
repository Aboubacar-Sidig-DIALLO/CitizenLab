// Hooks personnalisés pour l'application

import { useState, useEffect, useCallback } from 'react';
import { useAppStore } from '../stores/appStore';
import { Module, Question, QuizMode, ExamType } from '../types';
import { sampleModules } from '../data/modules';
import { sampleQuestions } from '../data/questions';

/**
 * Hook pour gérer la progression d'un module
 */
export const useModuleProgress = (moduleId: string) => {
  const { userProgress, updateUserProgress } = useAppStore();

  const progress = userProgress?.moduleProgress[moduleId] || {
    completed: false,
    lessonsCompleted: [],
    quizScore: 0,
    timeSpent: 0,
    lastAccessed: new Date(),
  };

  const updateProgress = useCallback(
    (updates: Partial<typeof progress>) => {
      updateUserProgress({
        moduleProgress: {
          ...userProgress.moduleProgress,
          [moduleId]: {
            ...progress,
            ...updates,
          },
        },
      });
    },
    [moduleId, updateUserProgress, userProgress.moduleProgress, progress]
  );

  const markLessonCompleted = useCallback(
    (lessonId: string) => {
      const currentLessons = progress.lessonsCompleted;
      if (!currentLessons.includes(lessonId)) {
        updateProgress({
          lessonsCompleted: [...currentLessons, lessonId],
        });
      }
    },
    [progress.lessonsCompleted, updateProgress]
  );

  const updateQuizScore = useCallback(
    (score: number) => {
      updateProgress({ quizScore: score });
    },
    [updateProgress]
  );

  const addTimeSpent = useCallback(
    (minutes: number) => {
      updateProgress({
        timeSpent: progress.timeSpent + minutes,
      });
    },
    [progress.timeSpent, updateProgress]
  );

  return {
    progress,
    updateProgress,
    markLessonCompleted,
    updateQuizScore,
    addTimeSpent,
  };
};

/**
 * Hook pour gérer les statistiques globales
 */
export const useGlobalStats = () => {
  const { userProgress } = useAppStore();

  const totalAttempts = userProgress?.examAttempts.length || 0;
  const averageScore = userProgress?.overallScore || 0;
  const currentStreak = userProgress?.streak || 0;
  const totalTimeSpent = userProgress?.totalTimeSpent || 0;
  const weakCategories = userProgress?.weakCategories || [];

  const completedModules = Object.values(
    userProgress?.moduleProgress || {}
  ).filter(progress => progress.completed).length;

  const totalModules = sampleModules.length;
  const completionPercentage =
    totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return {
    totalAttempts,
    averageScore,
    currentStreak,
    totalTimeSpent,
    weakCategories,
    completedModules,
    totalModules,
    completionPercentage,
  };
};

/**
 * Hook pour gérer les questions d'un quiz
 */
export const useQuizQuestions = (
  mode: QuizMode,
  examType: ExamType,
  category?: string
) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = () => {
      setLoading(true);

      let filteredQuestions = [...sampleQuestions];

      // Filtrer par catégorie si spécifiée
      if (category) {
        filteredQuestions = filteredQuestions.filter(
          q => q.category === category
        );
      }

      // Filtrer par mode
      switch (mode) {
        case 'revision':
          // TODO: Filtrer les questions ratées précédemment
          break;
        case 'examen-blanc':
          // Mélanger toutes les questions
          filteredQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
          break;
        case 'apprentissage':
          // Garder toutes les questions disponibles
          break;
      }

      // Limiter le nombre de questions selon le mode
      const questionCount =
        mode === 'examen-blanc' ? 30 : filteredQuestions.length;
      filteredQuestions = filteredQuestions.slice(0, questionCount);

      setQuestions(filteredQuestions);
      setLoading(false);
    };

    loadQuestions();
  }, [mode, examType, category]);

  return { questions, loading };
};

/**
 * Hook pour gérer un timer de quiz
 */
export const useQuizTimer = (timeLimit: number, onTimeUp?: () => void) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeRemaining, onTimeUp]);

  const startTimer = useCallback(() => {
    setStartTime(new Date());
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeRemaining(timeLimit);
    setIsRunning(false);
    setStartTime(null);
  }, [timeLimit]);

  const addTime = useCallback((seconds: number) => {
    setTimeRemaining(prev => prev + seconds);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    timeRemaining,
    isRunning,
    startTime,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime: () => formatTime(timeRemaining),
  };
};

/**
 * Hook pour gérer les favoris
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToFavorites = useCallback((id: string) => {
    setFavorites(prev => [...prev, id]);
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(prev => prev.filter(favId => favId !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favorites.includes(id);
    },
    [favorites]
  );

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
};

/**
 * Hook pour gérer les notifications
 */
export const useNotifications = () => {
  const [permission, setPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Vérifier les permissions de notification
    setPermission(false);
  }, []);

  const requestPermission = useCallback(async () => {
    // TODO: Demander la permission
    setPermission(true);
  }, []);

  const scheduleNotification = useCallback(
    async (title: string, body: string, date: Date) => {
      if (!permission) return;
      // TODO: Programmer une notification
    },
    [permission]
  );

  const cancelAllNotifications = useCallback(async () => {
    // TODO: Annuler toutes les notifications
  }, []);

  return {
    permission,
    requestPermission,
    scheduleNotification,
    cancelAllNotifications,
  };
};

/**
 * Hook pour gérer le thème sombre/clair
 */
export const useTheme = () => {
  const { userSettings, updateUserSettings } = useAppStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // TODO: Détecter le thème système ou utiliser les paramètres utilisateur
    setIsDark(userSettings.theme === 'dark');
  }, [userSettings.theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDark ? 'light' : 'dark';
    updateUserSettings({ theme: newTheme });
  }, [isDark, updateUserSettings]);

  return {
    isDark,
    toggleTheme,
    theme: userSettings.theme,
  };
};

/**
 * Hook pour gérer la recherche
 */
export const useSearch = <T>(
  items: T[],
  searchKey: keyof T,
  initialQuery: string = ''
) => {
  const [query, setQuery] = useState(initialQuery);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredItems(items);
      return;
    }

    const filtered = items.filter(item => {
      const value = item[searchKey];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });

    setFilteredItems(filtered);
  }, [items, query, searchKey]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  return {
    query,
    setQuery,
    filteredItems,
    clearSearch,
  };
};
