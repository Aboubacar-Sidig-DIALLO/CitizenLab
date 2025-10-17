# Documentation Technique - Application Examen Civique France

## 🏗️ Architecture

### Structure du Projet

```
civic-exam-app/
├── src/
│   ├── components/          # Composants réutilisables
│   │   └── ui/             # Composants UI de base
│   ├── screens/            # Écrans de l'application
│   ├── navigation/         # Configuration de navigation
│   ├── stores/             # Gestion d'état (Zustand)
│   ├── data/               # Données et contenu
│   ├── types/              # Types TypeScript
│   ├── constants/          # Constantes et thème
│   ├── hooks/              # Hooks personnalisés
│   ├── utils/              # Fonctions utilitaires
│   └── config/             # Configuration
├── assets/                  # Images, icônes, fonts
├── App.tsx                 # Point d'entrée principal
├── app.json                # Configuration Expo
├── package.json            # Dépendances et scripts
└── README.md               # Documentation utilisateur
```

### Technologies Utilisées

- **React Native** : Framework mobile cross-platform
- **Expo** : Plateforme de développement et déploiement
- **TypeScript** : Langage de programmation typé
- **React Navigation** : Navigation entre écrans
- **Zustand** : Gestion d'état global
- **AsyncStorage** : Stockage local persistant
- **SQLite** : Base de données locale
- **expo-av** : Lecture de fichiers audio
- **expo-notifications** : Notifications push

## 🎨 Design System

### Palette de Couleurs

```typescript
const Colors = {
  primary: '#0055A4',      // Bleu France
  secondary: '#EF4135',    // Rouge
  success: '#10B981',      // Vert (réussite >80%)
  warning: '#F59E0B',      // Orange (60-79%)
  error: '#EF4444',        // Rouge (<60%)
  background: {
    light: '#F9FAFB',
    dark: '#1F2937',
  },
  text: {
    light: '#111827',
    dark: '#F9FAFB',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
};
```

### Composants UI

#### Button
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}
```

#### Card
```typescript
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}
```

#### ProgressBar
```typescript
interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  height?: number;
  animated?: boolean;
}
```

## 📊 Modèles de Données

### Module
```typescript
interface Module {
  id: string;
  title: string;
  category: ModuleCategory;
  description: string;
  estimatedTime: number;
  lessons: Lesson[];
  audioUrl?: string;
  icon?: string;
}
```

### Question
```typescript
interface Question {
  id: string;
  category: ModuleCategory;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  source: string;
}
```

### UserProgress
```typescript
interface UserProgress {
  userId: string;
  examType: ExamType;
  overallScore: number;
  moduleProgress: { [moduleId: string]: ModuleProgress };
  examAttempts: ExamAttempt[];
  weakCategories: string[];
  streak: number;
  lastActivityDate: Date;
  totalTimeSpent: number;
}
```

## 🔄 Gestion d'État

### Store Zustand

```typescript
interface AppStore {
  // État
  userProgress: UserProgress | null;
  userSettings: UserSettings;
  currentQuizSession: QuizSession | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setUserProgress: (progress: UserProgress) => void;
  updateModuleProgress: (moduleId: string, progress: Partial<ModuleProgress>) => void;
  addExamAttempt: (attempt: ExamAttempt) => void;
  setUserSettings: (settings: Partial<UserSettings>) => void;
  startQuizSession: (session: QuizSession) => void;
  updateQuizAnswer: (questionIndex: number, answer: number) => void;
  finishQuizSession: () => void;
}
```

### Persistance des Données

- **AsyncStorage** : Stockage des préférences utilisateur et progression
- **SQLite** : Base de données locale pour les données complexes
- **Zustand persist** : Synchronisation automatique avec AsyncStorage

## 🧭 Navigation

### Structure de Navigation

```
RootStackNavigator
├── OnboardingScreen
├── MainTabNavigator
│   ├── HomeScreen
│   ├── LearnScreen
│   ├── PracticeScreen
│   ├── AudioScreen
│   └── ProfileScreen
├── ModuleDetailScreen
├── LessonDetailScreen
├── QuizScreen
├── QuizResultsScreen
├── AudioPlayerScreen
├── SettingsScreen
└── PrivacyScreen
```

### Types de Navigation

```typescript
type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ModuleDetail: { moduleId: string };
  LessonDetail: { lessonId: string };
  Quiz: { mode: QuizMode; examType?: ExamType };
  QuizResults: { sessionId: string };
  AudioPlayer: { audioId: string };
  Settings: undefined;
  Privacy: undefined;
};
```

## 🎵 Gestion Audio

### Configuration expo-av

```typescript
const audioConfig = {
  shouldPlay: false,
  isLooping: false,
  volume: 1.0,
  rate: 1.0,
  shouldCorrectPitch: true,
  progressUpdateIntervalMillis: 1000,
};
```

### Fonctionnalités Audio

- Lecture de fichiers MP3 optimisés
- Contrôles de lecture (play/pause, vitesse)
- Lecture en arrière-plan
- Téléchargement pour mode hors ligne
- Sous-titres pour accessibilité

## 🔒 Conformité RGPD

### Principes Implémentés

1. **Minimisation des données**
   - Stockage local uniquement
   - Pas de collecte de données personnelles
   - Données anonymisées

2. **Transparence**
   - Écran de confidentialité accessible
   - Explication claire des données collectées
   - Finalités explicites

3. **Consentement**
   - Options configurables par l'utilisateur
   - Possibilité de modifier à tout moment
   - Consentement granulaire

4. **Droits utilisateur**
   - Export des données (JSON)
   - Suppression complète des données
   - Accès aux données stockées

### Données Collectées

```typescript
interface ConsentSettings {
  analytics: boolean;        // Statistiques d'usage anonymisées
  crashReports: boolean;     // Rapports d'erreurs
  notifications: boolean;    // Rappels d'étude
  dataSyncCloud: boolean;   // Synchronisation optionnelle
}
```

## 🧪 Tests

### Configuration Jest

```json
{
  "preset": "react-native",
  "setupFilesAfterEnv": ["<rootDir>/src/utils/testSetup.ts"],
  "testPathIgnorePatterns": ["/node_modules/", "/.expo/"],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}"
  ]
}
```

### Types de Tests

1. **Tests unitaires** : Composants individuels
2. **Tests d'intégration** : Flux utilisateur complets
3. **Tests de régression** : Prévention des bugs
4. **Tests de performance** : Optimisation des performances

### Couverture de Code

- **Branches** : 70%
- **Functions** : 70%
- **Lines** : 70%
- **Statements** : 70%

## 🚀 Déploiement

### Configuration Expo

```json
{
  "expo": {
    "name": "Examen Civique France",
    "slug": "examen-civique-france",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "backgroundColor": "#0055A4"
    }
  }
}
```

### Builds

- **iOS** : App Store via TestFlight
- **Android** : Google Play Store
- **Web** : PWA (Progressive Web App)

### Métadonnées

- **Bundle ID iOS** : `com.civicexam.france`
- **Package Android** : `com.civicexam.france`
- **Version Code** : 1
- **Build Number** : 1.0.0

## 📈 Performance

### Objectifs

- **Temps de chargement** : < 2 secondes
- **Navigation fluide** : 60fps
- **Taille de l'app** : < 50MB (hors audio)
- **Consommation batterie** : Optimisée

### Optimisations

1. **Images** : Compression et formats optimisés
2. **Code** : Lazy loading et code splitting
3. **État** : Mise à jour minimale des composants
4. **Réseau** : Cache et requêtes optimisées

## 🔧 Développement

### Scripts Disponibles

```bash
npm start          # Démarrer le serveur de développement
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run web        # Lancer sur le web
npm test           # Exécuter les tests
npm run lint       # Vérifier le code
npm run type-check # Vérifier les types TypeScript
```

### Standards de Code

- **ESLint** : Règles de qualité du code
- **Prettier** : Formatage automatique
- **TypeScript** : Typage strict
- **Conventions** : Nommage cohérent

### Workflow Git

1. **Feature branches** : Développement de nouvelles fonctionnalités
2. **Pull requests** : Revue de code obligatoire
3. **Tests** : Passage des tests avant merge
4. **CI/CD** : Déploiement automatique

## 🐛 Débogage

### Outils de Développement

- **React Native Debugger** : Débogage avancé
- **Flipper** : Inspection des composants
- **Expo Dev Tools** : Outils de développement
- **Chrome DevTools** : Débogage web

### Logs et Monitoring

- **Console logs** : Débogage en développement
- **Crash reports** : Rapports d'erreurs en production
- **Analytics** : Métriques d'usage (optionnel)
- **Performance** : Monitoring des performances

## 📚 Ressources

### Documentation

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [TypeScript](https://www.typescriptlang.org/)

### Outils

- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

Cette documentation technique est maintenue à jour avec l'évolution du projet. Pour toute question ou suggestion d'amélioration, n'hésitez pas à créer une issue sur le repository.
