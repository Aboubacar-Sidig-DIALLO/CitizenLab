// Écran de détail d'un module

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

import { Button, Card, ProgressBar } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight, CategoryIcons } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';
import { sampleModules } from '../../src/data/modules';

export default function ModuleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userProgress } = useAppStore();
  
  const module = sampleModules.find(m => m.id === id);
  
  if (!module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Module non trouvé</Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  const moduleProgress = userProgress?.moduleProgress[module.id];
  const completedLessons = moduleProgress?.lessonsCompleted.length || 0;
  const totalLessons = module.lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleLessonPress = (lessonId: string) => {
    router.push(`/lesson/${lessonId}`);
  };

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const handlePlayAudio = () => {
    router.push('/audio-player');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête du module */}
      <View style={styles.header}>
        <View style={styles.moduleIcon}>
          <Ionicons 
            name={CategoryIcons[module.category] as any} 
            size={48} 
            color={Colors.category[module.category]} 
          />
        </View>
        <Text style={styles.moduleTitle}>{module.title}</Text>
        <Text style={styles.moduleCategory}>{module.category}</Text>
        <Text style={styles.moduleDescription}>{module.description}</Text>
        
        <View style={styles.moduleMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.metaText}>{module.estimatedTime} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.metaText}>{totalLessons} leçons</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="trending-up-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.metaText}>{module.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Progression */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Votre progression</Text>
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Leçons complétées</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          <ProgressBar 
            progress={progressPercentage} 
            color={Colors.category[module.category]}
            height={12}
          />
          <Text style={styles.progressText}>
            {completedLessons} sur {totalLessons} leçons terminées
          </Text>
        </Card>
      </View>

      {/* Actions rapides */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Quiz du module"
            icon="fitness-outline"
            onPress={handleStartQuiz}
            style={styles.actionButton}
          />
          {module.audioUrl && (
            <Button
              title="Écouter l'audio"
              icon="headset-outline"
              variant="outline"
              onPress={handlePlayAudio}
              style={styles.actionButton}
            />
          )}
        </View>
      </View>

      {/* Liste des leçons */}
      <View style={styles.lessonsSection}>
        <Text style={styles.sectionTitle}>Leçons</Text>
        {module.lessons.map((lesson, index) => {
          const isCompleted = moduleProgress?.lessonsCompleted.includes(lesson.id);
          const isLocked = index > 0 && !moduleProgress?.lessonsCompleted.includes(module.lessons[index - 1].id);
          
          return (
            <Card key={lesson.id} style={styles.lessonCard}>
              <TouchableOpacity
                style={styles.lessonContent}
                onPress={() => !isLocked && handleLessonPress(lesson.id)}
                disabled={isLocked}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonNumber}>
                    {isCompleted ? (
                      <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                    ) : isLocked ? (
                      <Ionicons name="lock-closed" size={24} color={Colors.text.muted} />
                    ) : (
                      <Text style={styles.lessonNumberText}>{index + 1}</Text>
                    )}
                  </View>
                  <View style={styles.lessonInfo}>
                    <Text style={[
                      styles.lessonTitle,
                      isLocked && styles.lessonTitleLocked
                    ]}>
                      {lesson.title}
                    </Text>
                    <Text style={styles.lessonDuration}>
                      {lesson.estimatedTime} min
                    </Text>
                  </View>
                  {lesson.audioUrl && (
                    <View style={styles.lessonAudio}>
                      <Ionicons name="headset-outline" size={20} color={Colors.primary} />
                    </View>
                  )}
                </View>
                
                {lesson.keyPoints.length > 0 && (
                  <View style={styles.lessonKeyPoints}>
                    <Text style={styles.keyPointsTitle}>Points clés :</Text>
                    {lesson.keyPoints.slice(0, 2).map((point, pointIndex) => (
                      <Text key={pointIndex} style={styles.keyPoint}>
                        • {point}
                      </Text>
                    ))}
                    {lesson.keyPoints.length > 2 && (
                      <Text style={styles.keyPointMore}>
                        +{lesson.keyPoints.length - 2} autres points
                      </Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: FontSize.lg,
    color: Colors.text.light,
    marginBottom: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  moduleIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  moduleTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  moduleCategory: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
    marginBottom: Spacing.md,
  },
  moduleDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  moduleMeta: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  progressSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
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
  progressText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.sm,
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
  lessonsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  lessonCard: {
    marginBottom: Spacing.md,
    padding: 0,
  },
  lessonContent: {
    padding: Spacing.lg,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  lessonNumberText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  lessonTitleLocked: {
    color: Colors.text.muted,
  },
  lessonDuration: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  lessonAudio: {
    padding: Spacing.sm,
  },
  lessonKeyPoints: {
    marginTop: Spacing.sm,
  },
  keyPointsTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  keyPoint: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
    lineHeight: 16,
  },
  keyPointMore: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontStyle: 'italic',
  },
});
