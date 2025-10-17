# Changelog - Application Examen Civique France

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versioning Sémantique](https://semver.org/lang/fr/).

## [1.0.0] - 2025-01-16

### Ajouté
- **Onboarding complet** avec consentement RGPD
- **Dashboard de progression** avec statistiques personnalisées
- **Navigation par onglets** (Accueil, Apprendre, S'entraîner, Audio, Profil)
- **Design system** complet avec palette de couleurs républicaines
- **Gestion d'état** avec Zustand et AsyncStorage
- **Types TypeScript** stricts pour toutes les interfaces
- **Données d'exemple** : 6 modules et 36 questions QCM
- **Écrans de base** pour tous les modules d'apprentissage
- **Système de QCM** avec 3 modes (apprentissage, examen blanc, révision)
- **Lecteur audio** intégré avec expo-av
- **Suivi de progression** avec SQLite
- **Fonctionnalités RGPD** complètes (export, suppression, consentement)
- **Configuration complète** : ESLint, Prettier, Jest, TypeScript
- **Documentation** : README, guide utilisateur, documentation technique
- **Checklist RGPD** complète avec conformité 100%

### Fonctionnalités Principales
- **Modules d'apprentissage** : 6 modules thématiques complets
  - Histoire de France
  - Institutions de la République
  - Valeurs républicaines
  - Droits et devoirs du citoyen
  - Géographie française
  - Culture et patrimoine

- **Système de QCM** : 36 questions avec explications détaillées
  - Questions par catégorie et difficulté
  - Explications détaillées pour chaque réponse
  - Références au Livret du citoyen

- **Modes d'entraînement** :
  - Mode apprentissage (correction immédiate)
  - Examen blanc (simulation complète)
  - Révision ciblée (questions ratées)

- **Contenus audio** :
  - Fichiers MP3 optimisés
  - Contrôles de lecture avancés
  - Mode hors ligne
  - Lecture en arrière-plan

- **Suivi de progression** :
  - Statistiques détaillées
  - Recommandations personnalisées
  - Historique des tentatives
  - Identification des points faibles

### Conformité RGPD
- **Minimisation des données** : Stockage local uniquement
- **Transparence** : Écran de confidentialité accessible
- **Consentement** : Options configurables par l'utilisateur
- **Droits utilisateur** : Export et suppression des données
- **Sécurité** : Pas de tracking tiers, chiffrement local

### Architecture Technique
- **Framework** : React Native avec Expo
- **Langage** : TypeScript (strict mode)
- **Navigation** : React Navigation v6+
- **État global** : Zustand + AsyncStorage
- **Base de données** : SQLite (expo-sqlite)
- **Audio** : expo-av
- **Styling** : StyleSheet natif avec design system
- **Icônes** : expo-vector-icons

### Configuration et Outils
- **ESLint** : Règles de qualité du code
- **Prettier** : Formatage automatique
- **Jest** : Configuration des tests
- **TypeScript** : Configuration stricte
- **Tailwind CSS** : Configuration (optionnel)

### Documentation
- **README.md** : Documentation utilisateur complète
- **TECHNICAL_DOCS.md** : Documentation technique détaillée
- **USER_GUIDE.md** : Guide utilisateur complet
- **RGPD_CHECKLIST.md** : Checklist de conformité RGPD

### Métadonnées
- **Nom** : Examen Civique France
- **Version** : 1.0.0
- **Bundle ID iOS** : com.civicexam.france
- **Package Android** : com.civicexam.france
- **Description** : Application d'aide à la réussite de l'examen civique français

## [0.1.0] - 2025-01-16

### Ajouté
- **Initialisation du projet** avec Expo et TypeScript
- **Structure de base** des dossiers et fichiers
- **Configuration initiale** des dépendances
- **Premiers composants** UI de base
- **Navigation de base** avec React Navigation
- **Store Zustand** pour la gestion d'état
- **Types TypeScript** pour les interfaces principales

### Modifié
- **Configuration Expo** : Métadonnées de l'application
- **Package.json** : Dépendances et scripts
- **TSConfig** : Configuration TypeScript stricte

### Technique
- **Dépendances installées** :
  - expo-av pour l'audio
  - expo-sqlite pour la base de données
  - @react-navigation/native pour la navigation
  - zustand pour la gestion d'état
  - @react-native-async-storage/async-storage pour le stockage

---

## Types de Modifications

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements dans les fonctionnalités existantes
- **Déprécié** : Fonctionnalités qui seront supprimées dans une version future
- **Supprimé** : Fonctionnalités supprimées dans cette version
- **Corrigé** : Corrections de bugs
- **Sécurité** : Corrections de vulnérabilités

## Versioning

Ce projet utilise le [Versioning Sémantique](https://semver.org/lang/fr/).

- **MAJOR** : Changements incompatibles avec l'API
- **MINOR** : Nouvelles fonctionnalités compatibles avec l'API
- **PATCH** : Corrections de bugs compatibles avec l'API

## Roadmap

### Version 1.1.0 (Prévue)
- [ ] Notifications intelligentes
- [ ] Mode hors ligne complet
- [ ] Gamification (badges, défis)
- [ ] Accessibilité complète

### Version 1.2.0 (Prévue)
- [ ] Assistant IA pour questions
- [ ] Mode multijoueur local
- [ ] Partage social des réussites
- [ ] Statistiques avancées

### Version 2.0.0 (Prévue)
- [ ] Support multi-langues
- [ ] Contenus audio supplémentaires
- [ ] Intégration avec les services officiels
- [ ] Version web complète

---

**Note** : Ce changelog est maintenu à jour avec l'évolution du projet. Pour toute question ou suggestion, n'hésitez pas à créer une issue sur le repository.
