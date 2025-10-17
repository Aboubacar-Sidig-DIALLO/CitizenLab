# Application d'Aide à la Réussite de l'Examen Civique

## 📱 Description

Application mobile React Native développée avec Expo pour préparer les candidats à l'examen civique obligatoire pour l'obtention de titres de séjour en France (loi Darmanin, effective au 1er janvier 2026).

**Objectif principal** : Garantir un taux de réussite de 90-100% à l'examen civique avec un seuil de réussite fixé à 80% de bonnes réponses.

## 🚀 Fonctionnalités Principales

### ✅ Implémentées
- **Onboarding complet** avec consentement RGPD
- **Dashboard de progression** avec statistiques personnalisées
- **Navigation par onglets** (Accueil, Apprendre, S'entraîner, Audio, Profil)
- **Design system** complet avec palette de couleurs républicaines
- **Gestion d'état** avec Zustand et AsyncStorage
- **Types TypeScript** stricts pour toutes les interfaces
- **Données d'exemple** : 6 modules et 36 questions QCM

### 🔄 En cours de développement
- Modules d'apprentissage détaillés
- Système de QCM complet avec examens blancs
- Lecteur audio intégré
- Suivi de progression avec SQLite
- Fonctionnalités RGPD avancées

## 🛠️ Stack Technologique

- **Framework** : React Native avec Expo
- **Langage** : TypeScript (strict mode)
- **Navigation** : React Navigation v6+
- **État global** : Zustand + AsyncStorage
- **Base de données locale** : SQLite (expo-sqlite)
- **Audio** : expo-av
- **Styling** : StyleSheet natif avec design system
- **Icônes** : expo-vector-icons

## 📁 Architecture

```
/src
  /screens          # Écrans principaux
  /components       # Composants réutilisables
  /navigation       # Configuration navigation
  /stores           # Gestion état (Zustand)
  /data             # Données officielles (JSON)
  /types            # Types TypeScript
  /constants        # Constantes et thème
```

## 🎨 Design System

### Palette de couleurs
- **Primary** : #0055A4 (Bleu France)
- **Secondary** : #EF4135 (Rouge)
- **Success** : #10B981 (Vert - réussite >80%)
- **Warning** : #F59E0B (Orange - 60-79%)
- **Error** : #EF4444 (Rouge - <60%)

### Composants UI
- `Button` : Boutons avec variants (primary, secondary, outline)
- `Card` : Cartes avec ombres et bordures arrondies
- `StatCard` : Cartes de statistiques avec icônes
- `ModuleCard` : Cartes de modules avec progression
- `QuestionCard` : Cartes de questions QCM
- `ProgressBar` : Barres de progression animées

## 📊 Données d'Exemple

### Modules (6 modules)
1. **Histoire de France** - Les grandes périodes
2. **Institutions** - La Ve République
3. **Valeurs républicaines** - Liberté, Égalité, Fraternité
4. **Droits et devoirs** - Citoyenneté française
5. **Géographie** - Organisation territoriale
6. **Culture** - Patrimoine et langue française

### Questions QCM (36 questions)
- Réparties par catégorie et difficulté
- Avec explications détaillées
- Références au Livret du citoyen

## 🔒 Conformité RGPD

### Principes implémentés
- **Minimisation des données** : Stockage local uniquement
- **Transparence** : Écran de confidentialité accessible
- **Consentement** : Options configurables (analytics, notifications, sync cloud)
- **Droits utilisateur** : Export et suppression des données
- **Sécurité** : Pas de tracking tiers, chiffrement local

## 🚀 Installation et Lancement

```bash
# Cloner le projet
git clone <repository-url>
cd civic-exam-app

# Installer les dépendances
npm install

# Lancer l'application
npx expo start

# Pour iOS
npx expo start --ios

# Pour Android
npx expo start --android

# Pour le web
npx expo start --web
```

## 📱 Parcours Utilisateur

### 1. Onboarding
- Bienvenue et présentation des fonctionnalités
- Consentement RGPD simplifié
- Choix du type d'examen (CSP ou Carte de Résident)
- Configuration des préférences

### 2. Navigation Principale
- **Accueil** : Dashboard avec progression et recommandations
- **Apprendre** : Liste des modules thématiques
- **S'entraîner** : Modes QCM (apprentissage, examen blanc, révision)
- **Audio** : Bibliothèque audio complète
- **Profil** : Statistiques, paramètres, confidentialité

### 3. Fonctionnalités Clés
- **Module du jour** : Recommandation personnalisée
- **Statistiques détaillées** : Score moyen, série, temps d'étude
- **Recommandations** : Focus sur les catégories faibles
- **Actions rapides** : Accès direct aux examens blancs

## 🎯 Objectifs de Performance

- **Temps de chargement** : < 2 secondes
- **Navigation fluide** : 60fps
- **Taille de l'app** : < 50MB (hors audio)
- **Taux de réussite** : 90-100% à l'examen officiel

## 📈 Roadmap

### Phase 1 (Actuelle) - MVP
- ✅ Architecture de base
- ✅ Onboarding et navigation
- ✅ Dashboard de progression
- ✅ Design system complet

### Phase 2 - Fonctionnalités Core
- 🔄 Modules d'apprentissage détaillés
- 🔄 Système de QCM complet
- 🔄 Lecteur audio intégré
- 🔄 Suivi de progression SQLite

### Phase 3 - Fonctionnalités Avancées
- 📅 Notifications intelligentes
- 📅 Mode hors ligne complet
- 📅 Gamification (badges, défis)
- 📅 Accessibilité complète

## 🤝 Contribution

Ce projet est développé pour aider les candidats à réussir leur examen civique. Les contributions sont les bienvenues pour :

- Améliorer le contenu pédagogique
- Ajouter de nouvelles fonctionnalités
- Optimiser les performances
- Améliorer l'accessibilité

## 📄 Licence

Ce projet est développé dans le cadre de la préparation à l'examen civique français et respecte les principes de la République française.

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur le repository
- Consulter la documentation technique
- Contacter l'équipe de développement

---

**Date limite de mise en production** : Avant le 1er janvier 2026

**Objectif ultime** : Une application qui donne confiance aux utilisateurs et transforme leur anxiété en sentiment de préparation maîtrisée, avec un taux de réussite réel de 90-100% à l'examen civique.
