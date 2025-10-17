// Écran d'accueil (Home)

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card, StatCard, ModuleCard, ProgressBar } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight, CategoryIcons } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';
import { ModuleCategory } from '../../src/types';
import { sampleModules } from '../../src/data/modules';

export default function HomeScreen() {
  const { userProgress, userSettings, isLoading } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  // Calculer les statistiques
  const totalModules = sampleModules.length;
  const completedModules = Object.values(userProgress?.moduleProgress || {}).filter(
    progress => progress.completed
  ).length;
  const completionPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const totalExamAttempts = userProgress?.examAttempts.length || 0;
  const averageScore = userProgress?.overallScore || 0;
  const currentStreak = userProgress?.streak || 0;

  // Trouver les modules recommandés (catégories faibles)
  const weakCategories = userProgress?.weakCategories || [];
  const recommendedModules = sampleModules.filter(module => 
    weakCategories.includes(module.category)
  ).slice(0, 3);

  // Module du jour (aléatoire parmi les non complétés)
  const incompleteModules = sampleModules.filter(module => 
    !userProgress?.moduleProgress[module.id]?.completed
  );
  const moduleOfTheDay = incompleteModules.length > 0 
    ? incompleteModules[Math.floor(Math.random() * incompleteModules.length)]
    : null;

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simuler un rafraîchissement des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleModulePress = (moduleId: string) => {
    router.push(`/module/${moduleId}`);
  };

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const handleQuickPractice = () => {
    router.push('/quiz');
  };

  const getCategoryColor = (category: ModuleCategory) => {
    return Colors.category[category] || Colors.primary;
  };

  const getMotivationalMessage = () => {
    if (averageScore >= 90) return "Excellent ! Vous êtes prêt pour l'examen ! 🎉";
    if (averageScore >= 80) return "Très bien ! Continuez sur cette lancée ! 💪";
    if (averageScore >= 70) return "Bon travail ! Quelques révisions et vous y êtes ! 📚";
    if (averageScore >= 60) return "Vous progressez bien ! Continuez à vous entraîner ! 🔥";
    return "Commencez votre préparation dès aujourd'hui ! 🚀";
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      {/* En-tête avec salutation */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Bonjour ! 👋</Text>
            <Text style={styles.subtitle}>
              Préparez-vous pour votre examen civique
            </Text>
          </View>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.motivationalMessage}>
          {getMotivationalMessage()}
        </Text>
      </View>

      {/* Statistiques principales */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Votre progression</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Score moyen"
            value={`${Math.round(averageScore)}%`}
            subtitle={`${totalExamAttempts} tentatives`}
            icon="trophy-outline"
            color={averageScore >= 80 ? Colors.success : averageScore >= 60 ? Colors.warning : Colors.error}
          />
          <StatCard
            title="Modules complétés"
            value={`${completedModules}/${totalModules}`}
            subtitle={`${Math.round(completionPercentage)}% terminé`}
            icon="checkmark-circle-outline"
            color={Colors.primary}
          />
          <StatCard
            title="Série actuelle"
            value={`${currentStreak} jours`}
            subtitle="jours consécutifs"
            icon="flame-outline"
            color={Colors.secondary}
          />
        </View>
      </View>

      {/* Actions rapides */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Examen blanc"
            icon="fitness-outline"
            onPress={handleStartQuiz}
            style={styles.actionButton}
          />
          <Button
            title="Quiz rapide"
            icon="flash-outline"
            variant="outline"
            onPress={handleQuickPractice}
            style={styles.actionButton}
          />
        </View>
      </View>

      {/* Module du jour */}
      {moduleOfTheDay && (
        <View style={styles.moduleOfTheDaySection}>
          <Text style={styles.sectionTitle}>Module du jour</Text>
          <Card style={styles.moduleOfTheDayCard}>
            <View style={styles.moduleOfTheDayHeader}>
              <View style={styles.moduleOfTheDayIcon}>
                <Ionicons 
                  name={CategoryIcons[moduleOfTheDay.category] as any} 
                  size={24} 
                  color={getCategoryColor(moduleOfTheDay.category)} 
                />
              </View>
              <View style={styles.moduleOfTheDayInfo}>
                <Text style={styles.moduleOfTheDayTitle}>{moduleOfTheDay.title}</Text>
                <Text style={styles.moduleOfTheDayDescription}>
                  {moduleOfTheDay.description}
                </Text>
              </View>
            </View>
            <View style={styles.moduleOfTheDayFooter}>
              <View style={styles.moduleOfTheDayTime}>
                <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
                <Text style={styles.moduleOfTheDayTimeText}>
                  {moduleOfTheDay.estimatedTime} min
                </Text>
              </View>
              <Button
                title="Commencer"
                size="small"
                onPress={() => handleModulePress(moduleOfTheDay.id)}
              />
            </View>
          </Card>
        </View>
      )}

      {/* Modules recommandés */}
      {recommendedModules.length > 0 && (
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommandés pour vous</Text>
          <Text style={styles.recommendedSubtitle}>
            Ces modules vous aideront à améliorer vos points faibles
          </Text>
          {recommendedModules.map(module => (
            <ModuleCard
              key={module.id}
              title={module.title}
              description={module.description}
              category={module.category}
              progress={userProgress?.moduleProgress[module.id]?.quizScore || 0}
              estimatedTime={module.estimatedTime}
              icon={CategoryIcons[module.category] as any}
              onPress={() => handleModulePress(module.id)}
            />
          ))}
        </View>
      )}

      {/* Progression globale */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progression globale</Text>
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Modules d'apprentissage</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(completionPercentage)}%
            </Text>
          </View>
          <ProgressBar 
            progress={completionPercentage} 
            color={Colors.primary}
            height={12}
          />
          <View style={styles.progressDetails}>
            <Text style={styles.progressDetailText}>
              {completedModules} modules complétés sur {totalModules}
            </Text>
            <TouchableOpacity onPress={() => router.push('/learn')}>
              <Text style={styles.progressLink}>Voir tous les modules</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  settingsButton: {
    padding: Spacing.sm,
  },
  motivationalMessage: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: `${Colors.primary}10`,
    padding: Spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  moduleOfTheDaySection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  moduleOfTheDayCard: {
    backgroundColor: `${Colors.primary}10`,
    borderWidth: 1,
    borderColor: `${Colors.primary}30`,
  },
  moduleOfTheDayHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  moduleOfTheDayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  moduleOfTheDayInfo: {
    flex: 1,
  },
  moduleOfTheDayTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  moduleOfTheDayDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  moduleOfTheDayFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleOfTheDayTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleOfTheDayTimeText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginLeft: Spacing.xs,
  },
  recommendedSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  recommendedSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: 18,
  },
  progressSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  progressCard: {
    padding: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
  },
  progressPercentage: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  progressDetailText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  progressLink: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
});
