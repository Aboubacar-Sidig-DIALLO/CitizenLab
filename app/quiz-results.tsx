// Écran de résultats du quiz

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

import { Button, Card, StatCard } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';
import { useAppStore } from '../src/stores/appStore';

export default function QuizResultsScreen() {
  const params = useLocalSearchParams<{
    score: string;
    totalQuestions: string;
    correctAnswers: string;
    duration: string;
    passed: string;
  }>();
  
  const { userSettings } = useAppStore();
  
  const score = parseFloat(params.score || '0');
  const totalQuestions = parseInt(params.totalQuestions || '0');
  const correctAnswers = parseInt(params.correctAnswers || '0');
  const duration = parseFloat(params.duration || '0');
  const passed = params.passed === 'true';

  const getScoreColor = (score: number) => {
    if (score >= 90) return Colors.success;
    if (score >= 80) return Colors.primary;
    if (score >= 70) return Colors.warning;
    return Colors.error;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent ! Vous êtes prêt pour l'examen ! 🎉";
    if (score >= 80) return "Très bien ! Vous avez réussi ! 💪";
    if (score >= 70) return "Bon travail ! Continuez à vous entraîner ! 📚";
    if (score >= 60) return "Vous progressez ! Quelques révisions et vous y êtes ! 🔥";
    return "Continuez à étudier ! Vous allez y arriver ! 🚀";
  };

  const getMotivationalTip = (score: number) => {
    if (score >= 80) {
      return "Vous maîtrisez bien le sujet. Continuez à réviser pour maintenir votre niveau !";
    } else if (score >= 60) {
      return "Vous êtes sur la bonne voie ! Concentrez-vous sur les questions ratées pour progresser.";
    } else {
      return "Prenez le temps de revoir les leçons correspondantes avant de refaire un quiz.";
    }
  };

  const handleRetakeQuiz = () => {
    router.push('/quiz');
  };

  const handleReviewQuestions = () => {
    // TODO: Implémenter la révision des questions
    router.push('/quiz');
  };

  const handleBackToModules = () => {
    router.push('/(tabs)/learn');
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 1) return '< 1 min';
    return `${Math.round(minutes)} min`;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête des résultats */}
      <View style={styles.header}>
        <View style={[
          styles.resultIcon,
          { backgroundColor: `${getScoreColor(score)}20` }
        ]}>
          <Ionicons 
            name={passed ? "trophy" : "refresh"} 
            size={48} 
            color={getScoreColor(score)} 
          />
        </View>
        
        <Text style={styles.resultTitle}>
          {passed ? "Félicitations !" : "Continuez vos efforts !"}
        </Text>
        
        <Text style={styles.resultMessage}>
          {getScoreMessage(score)}
        </Text>
      </View>

      {/* Score principal */}
      <View style={styles.scoreSection}>
        <Card style={styles.scoreCard}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreLabel}>Votre score</Text>
            <Text style={[
              styles.scoreValue,
              { color: getScoreColor(score) }
            ]}>
              {Math.round(score)}%
            </Text>
          </View>
          
          <View style={styles.scoreDetails}>
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Bonnes réponses</Text>
              <Text style={styles.scoreDetailValue}>
                {correctAnswers}/{totalQuestions}
              </Text>
            </View>
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Temps utilisé</Text>
              <Text style={styles.scoreDetailValue}>
                {formatDuration(duration)}
              </Text>
            </View>
            <View style={styles.scoreDetailItem}>
              <Text style={styles.scoreDetailLabel}>Statut</Text>
              <Text style={[
                styles.scoreDetailValue,
                { color: passed ? Colors.success : Colors.warning }
              ]}>
                {passed ? "Réussi" : "À améliorer"}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Statistiques détaillées */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Score"
            value={`${Math.round(score)}%`}
            subtitle={passed ? "Réussi" : "À améliorer"}
            icon="trophy-outline"
            color={getScoreColor(score)}
          />
          <StatCard
            title="Réponses"
            value={`${correctAnswers}/${totalQuestions}`}
            subtitle="correctes"
            icon="checkmark-circle-outline"
            color={Colors.success}
          />
          <StatCard
            title="Temps"
            value={formatDuration(duration)}
            subtitle="utilisé"
            icon="time-outline"
            color={Colors.primary}
          />
          <StatCard
            title="Type"
            value={userSettings.examType === 'csp' ? 'CSP' : 'Résident'}
            subtitle="d'examen"
            icon="card-outline"
            color={Colors.secondary}
          />
        </View>
      </View>

      {/* Conseils et recommandations */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Conseils</Text>
        <Card style={styles.tipsCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb-outline" size={24} color={Colors.warning} />
            <Text style={styles.tipTitle}>Recommandation</Text>
          </View>
          <Text style={styles.tipText}>
            {getMotivationalTip(score)}
          </Text>
          
          {score < 80 && (
            <View style={styles.improvementTips}>
              <Text style={styles.improvementTitle}>Pour améliorer votre score :</Text>
              <Text style={styles.improvementTip}>• Relisez les leçons correspondantes</Text>
              <Text style={styles.improvementTip}>• Refaites le quiz en mode apprentissage</Text>
              <Text style={styles.improvementTip}>• Concentrez-vous sur vos points faibles</Text>
              <Text style={styles.improvementTip}>• Prenez votre temps pour bien comprendre</Text>
            </View>
          )}
        </Card>
      </View>

      {/* Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Prochaines étapes</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Refaire le quiz"
            icon="refresh-outline"
            onPress={handleRetakeQuiz}
            style={styles.actionButton}
          />
          <Button
            title="Réviser les questions"
            icon="book-outline"
            variant="outline"
            onPress={handleReviewQuestions}
            style={styles.actionButton}
          />
        </View>
        
        <Button
          title="Retour aux modules"
          icon="library-outline"
          variant="ghost"
          onPress={handleBackToModules}
          style={styles.backButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  resultIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  resultTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  resultMessage: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  scoreSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  scoreCard: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  scoreHeader: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  scoreLabel: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  scoreValue: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
  },
  scoreDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  scoreDetailItem: {
    alignItems: 'center',
  },
  scoreDetailLabel: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  scoreDetailValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
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
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  tipsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tipsCard: {
    padding: Spacing.lg,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  tipTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginLeft: Spacing.sm,
  },
  tipText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  improvementTips: {
    backgroundColor: `${Colors.warning}10`,
    padding: Spacing.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  improvementTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.sm,
  },
  improvementTip: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
    lineHeight: 16,
  },
  actionsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  backButton: {
    marginTop: Spacing.sm,
  },
});
