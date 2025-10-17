// Store mis à jour pour Expo Router

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConsentSettings, UserProgress, ExamAttempt, QuizMode } from '../types';

interface AppState {
  // État de l'onboarding
  isOnboarded: boolean;

  // Paramètres de consentement RGPD
  consentSettings: ConsentSettings;

  // Progression de l'utilisateur
  userProgress: UserProgress;

  // Paramètres utilisateur
  userSettings: {
    examType: 'csp' | 'resident-card';
    audio: {
      speed: number;
      autoPlay: boolean;
    };
    notifications: {
      dailyReminder: boolean;
      reminderTime: string;
    };
    theme: 'light' | 'dark' | 'auto';
    language: 'fr' | 'en';
  };

  // État de chargement
  isLoading: boolean;

  // Actions
  setConsentSettings: (settings: ConsentSettings) => void;
  completeOnboarding: () => void;
  updateUserProgress: (progress: Partial<UserProgress>) => void;
  updateUserSettings: (settings: Partial<AppState['userSettings']>) => void;
  addExamAttempt: (attempt: ExamAttempt) => void;
  setLoading: (loading: boolean) => void;
  resetApp: () => void;
}

const defaultUserSettings = {
  examType: 'csp' as const,
  audio: {
    speed: 1.0,
    autoPlay: false,
  },
  notifications: {
    dailyReminder: false,
    reminderTime: '20:00',
  },
  theme: 'auto' as const,
  language: 'fr' as const,
};

const defaultUserProgress: UserProgress = {
  userId: 'guest',
  overallScore: 0,
  moduleProgress: {},
  examAttempts: [],
  weakCategories: [],
  streak: 0,
  lastActivityDate: new Date(),
  totalTimeSpent: 0,
  badges: [],
  achievements: [],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // État initial
      isOnboarded: false,
      consentSettings: {
        analytics: false,
        crashReports: false,
        notifications: false,
        dataSyncCloud: false,
        personalizedContent: false,
      },
      userProgress: defaultUserProgress,
      userSettings: defaultUserSettings,
      isLoading: false,

      // Actions
      setConsentSettings: settings => set({ consentSettings: settings }),

      completeOnboarding: () => set({ isOnboarded: true }),

      updateUserProgress: progress =>
        set(state => ({
          userProgress: {
            ...state.userProgress,
            ...progress,
            lastActivityDate: new Date(),
          },
        })),

      updateUserSettings: settings =>
        set(state => ({
          userSettings: { ...state.userSettings, ...settings },
        })),

      addExamAttempt: attempt =>
        set(state => {
          const newAttempts = [...state.userProgress.examAttempts, attempt];

          // Calculer le score moyen
          const totalScore = newAttempts.reduce((sum, a) => sum + a.score, 0);
          const averageScore = totalScore / newAttempts.length;

          // Identifier les catégories faibles (< 70%)
          const categoryScores: { [key: string]: number[] } = {};
          newAttempts.forEach(attempt => {
            Object.entries(attempt.categoryScores).forEach(
              ([category, score]) => {
                if (!categoryScores[category]) {
                  categoryScores[category] = [];
                }
                categoryScores[category].push(score);
              }
            );
          });

          const weakCategories = Object.entries(categoryScores)
            .filter(([_, scores]) => {
              const avgScore =
                scores.reduce((sum, s) => sum + s, 0) / scores.length;
              return avgScore < 70;
            })
            .map(([category]) => category);

          return {
            userProgress: {
              ...state.userProgress,
              examAttempts: newAttempts,
              overallScore: averageScore,
              weakCategories: weakCategories as any[], // Type assertion temporaire
            },
          };
        }),

      setLoading: loading => set({ isLoading: loading }),

      resetApp: () =>
        set({
          isOnboarded: false,
          consentSettings: {
            analytics: false,
            crashReports: false,
            notifications: false,
            dataSyncCloud: false,
          },
          userProgress: defaultUserProgress,
          userSettings: defaultUserSettings,
          isLoading: false,
        }),
    }),
    {
      name: 'civic-exam-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Ne pas persister l'état de chargement
      partialize: state => ({
        isOnboarded: state.isOnboarded,
        consentSettings: state.consentSettings,
        userProgress: state.userProgress,
        userSettings: state.userSettings,
      }),
    }
  )
);
