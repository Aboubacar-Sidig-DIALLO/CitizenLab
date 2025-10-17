// Écran de pratique

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';
import { QuizMode } from '../../src/types';

export default function PracticeScreen() {
  const { userSettings, userProgress } = useAppStore();

  const handleStartQuiz = (mode: QuizMode) => {
    router.push('/quiz');
  };

  const practiceModes = [
    {
      id: 'examen-blanc',
      title: 'Examen blanc',
      description: 'Simulation complète de l\'examen officiel',
      icon: 'fitness-outline',
      color: Colors.primary,
      details: [
        '30 questions aléatoires',
        '30 minutes chrono',
        'Pas de retour en arrière',
        'Score final avec explications'
      ],
      buttonText: 'Commencer l\'examen',
    },
    {
      id: 'apprentissage',
      title: 'Mode apprentissage',
      description: 'Apprenez à votre rythme avec corrections immédiates',
      icon: 'book-outline',
      color: Colors.secondary,
      details: [
        'Questions par thème',
        'Correction immédiate',
        'Explications détaillées',
        'Pas de limite de temps'
      ],
      buttonText: 'Commencer l\'apprentissage',
    },
    {
      id: 'revision',
      title: 'Révision ciblée',
      description: 'Révisez uniquement vos questions ratées',
      icon: 'refresh-outline',
      color: Colors.warning,
      details: [
        'Questions précédemment ratées',
        'Focus sur les points faibles',
        'Progression personnalisée',
        'Amélioration garantie'
      ],
      buttonText: 'Réviser mes erreurs',
    },
  ];

  const totalAttempts = userProgress?.examAttempts.length || 0;
  const averageScore = userProgress?.overallScore || 0;
  const weakCategories = userProgress?.weakCategories || [];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>S'entraîner</Text>
        <Text style={styles.subtitle}>
          Choisissez votre mode d'entraînement pour progresser efficacement
        </Text>
      </View>

      {/* Statistiques rapides */}
      <View style={styles.statsSection}>
        <Card style={styles.statsCard}>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalAttempts}</Text>
              <Text style={styles.statLabel}>Tentatives</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(averageScore)}%</Text>
              <Text style={styles.statLabel}>Score moyen</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weakCategories.length}</Text>
              <Text style={styles.statLabel}>Points faibles</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Modes de pratique */}
      <View style={styles.modesSection}>
        {practiceModes.map((mode) => (
          <Card key={mode.id} style={styles.modeCard}>
            <View style={styles.modeHeader}>
              <View style={[styles.modeIcon, { backgroundColor: `${mode.color}20` }]}>
                <Ionicons name={mode.icon as any} size={32} color={mode.color} />
              </View>
              <View style={styles.modeInfo}>
                <Text style={styles.modeTitle}>{mode.title}</Text>
                <Text style={styles.modeDescription}>{mode.description}</Text>
              </View>
            </View>
            
            <View style={styles.modeDetails}>
              {mode.details.map((detail, index) => (
                <View key={index} style={styles.detailItem}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  <Text style={styles.detailText}>{detail}</Text>
                </View>
              ))}
            </View>

            <Button
              title={mode.buttonText}
              onPress={() => handleStartQuiz(mode.id as QuizMode)}
              style={styles.modeButton}
            />
          </Card>
        ))}
      </View>

      {/* Recommandations */}
      {weakCategories.length > 0 && (
        <View style={styles.recommendationsSection}>
          <Text style={styles.sectionTitle}>Recommandations</Text>
          <Card style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Ionicons name="bulb-outline" size={24} color={Colors.warning} />
              <Text style={styles.recommendationTitle}>Points à améliorer</Text>
            </View>
            <Text style={styles.recommendationText}>
              Vous avez des difficultés dans ces catégories :{' '}
              {weakCategories.join(', ')}. Nous vous recommandons de vous concentrer 
              sur ces thèmes avant de passer l'examen.
            </Text>
            <Button
              title="Réviser ces catégories"
              variant="outline"
              size="small"
              onPress={() => handleStartQuiz('revision')}
              style={styles.recommendationButton}
            />
          </Card>
        </View>
      )}

      {/* Conseils pour l'examen */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Conseils pour réussir</Text>
        <Card style={styles.tipsCard}>
          <View style={styles.tipItem}>
            <Ionicons name="time-outline" size={20} color={Colors.primary} />
            <Text style={styles.tipText}>
              Gérez votre temps : vous avez environ 1 minute par question
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-outline" size={20} color={Colors.success} />
            <Text style={styles.tipText}>
              Lisez attentivement chaque question avant de répondre
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="refresh-outline" size={20} color={Colors.warning} />
            <Text style={styles.tipText}>
              Révisez régulièrement pour maintenir vos connaissances
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="trophy-outline" size={20} color={Colors.secondary} />
            <Text style={styles.tipText}>
              Un score de 80% ou plus vous garantit la réussite
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  statsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  statsCard: {
    padding: Spacing.lg,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.light,
  },
  modesSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  modeCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  modeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  modeDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  modeDetails: {
    marginBottom: Spacing.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  modeButton: {
    marginTop: Spacing.sm,
  },
  recommendationsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  recommendationCard: {
    padding: Spacing.lg,
    backgroundColor: `${Colors.warning}10`,
    borderWidth: 1,
    borderColor: `${Colors.warning}30`,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  recommendationTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginLeft: Spacing.sm,
  },
  recommendationText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  recommendationButton: {
    alignSelf: 'flex-start',
  },
  tipsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tipsCard: {
    padding: Spacing.lg,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  tipText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 20,
  },
});
