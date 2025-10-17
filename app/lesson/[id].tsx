// Écran de détail d'une leçon

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';

import { Button, Card } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';
import { sampleModules } from '../../src/data/modules';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userProgress, updateUserProgress } = useAppStore();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Trouver la leçon dans tous les modules
  let lesson = null;
  let module = null;
  
  for (const mod of sampleModules) {
    const foundLesson = mod.lessons.find(l => l.id === id);
    if (foundLesson) {
      lesson = foundLesson;
      module = mod;
      break;
    }
  }
  
  if (!lesson || !module) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Leçon non trouvée</Text>
        <Button title="Retour" onPress={() => router.back()} />
      </View>
    );
  }

  const lessonProgress = userProgress?.moduleProgress[module.id];
  const isLessonCompleted = lessonProgress?.lessonsCompleted.includes(lesson.id) || false;

  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      const updatedProgress = {
        ...userProgress,
        moduleProgress: {
          ...userProgress?.moduleProgress,
          [module.id]: {
            ...lessonProgress,
            lessonsCompleted: [...(lessonProgress?.lessonsCompleted || []), lesson.id],
            timeSpent: (lessonProgress?.timeSpent || 0) + lesson.estimatedTime,
            lastAccessed: new Date(),
          },
        },
      };
      updateUserProgress(updatedProgress);
      setIsCompleted(true);
    }
  };

  const handleStartQuiz = () => {
    router.push('/quiz');
  };

  const handlePlayAudio = () => {
    router.push('/audio-player');
  };

  const handleNextLesson = () => {
    const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
    if (currentIndex < module.lessons.length - 1) {
      router.push(`/lesson/${module.lessons[currentIndex + 1].id}`);
    } else {
      router.push(`/module/${module.id}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête de la leçon */}
      <View style={styles.header}>
        <View style={styles.lessonIcon}>
          <Ionicons name="book-outline" size={32} color={Colors.primary} />
        </View>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.moduleTitle}>{module.title}</Text>
        
        <View style={styles.lessonMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.metaText}>{lesson.estimatedTime} min</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="list-outline" size={16} color={Colors.text.secondary} />
            <Text style={styles.metaText}>{lesson.keyPoints.length} points clés</Text>
          </View>
          {lesson.audioUrl && (
            <View style={styles.metaItem}>
              <Ionicons name="headset-outline" size={16} color={Colors.text.secondary} />
              <Text style={styles.metaText}>Audio disponible</Text>
            </View>
          )}
        </View>
      </View>

      {/* Contenu de la leçon */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Contenu de la leçon</Text>
        <Card style={styles.contentCard}>
          <Text style={styles.contentText}>{lesson.content}</Text>
        </Card>
      </View>

      {/* Points clés */}
      <View style={styles.keyPointsSection}>
        <Text style={styles.sectionTitle}>Points clés à retenir</Text>
        <Card style={styles.keyPointsCard}>
          {lesson.keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPointItem}>
              <View style={styles.keyPointIcon}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              </View>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </Card>
      </View>

      {/* Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.actionButtons}>
          {lesson.audioUrl && (
            <Button
              title="Écouter l'audio"
              icon="headset-outline"
              variant="outline"
              onPress={handlePlayAudio}
              style={styles.actionButton}
            />
          )}
          <Button
            title="Quiz rapide"
            icon="fitness-outline"
            variant="outline"
            onPress={handleStartQuiz}
            style={styles.actionButton}
          />
        </View>
      </View>

      {/* Actions de navigation */}
      <View style={styles.navigationSection}>
        {!isLessonCompleted && !isCompleted && (
          <Button
            title="Marquer comme terminée"
            icon="checkmark-circle-outline"
            onPress={handleCompleteLesson}
            style={styles.completeButton}
          />
        )}
        
        {(isLessonCompleted || isCompleted) && (
          <View style={styles.completedActions}>
            <View style={styles.completedMessage}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <Text style={styles.completedText}>Leçon terminée !</Text>
            </View>
            <View style={styles.navigationButtons}>
              <Button
                title="Leçon suivante"
                icon="arrow-forward-outline"
                onPress={handleNextLesson}
                style={styles.navButton}
              />
              <Button
                title="Retour au module"
                variant="outline"
                icon="arrow-back-outline"
                onPress={() => router.push(`/module/${module.id}`)}
                style={styles.navButton}
              />
            </View>
          </View>
        )}
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
  lessonIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  lessonTitle: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  moduleTitle: {
    fontSize: FontSize.md,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.lg,
  },
  lessonMeta: {
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
  contentSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  contentCard: {
    padding: Spacing.lg,
  },
  contentText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    lineHeight: 24,
  },
  keyPointsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  keyPointsCard: {
    padding: Spacing.lg,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  keyPointIcon: {
    marginRight: Spacing.md,
    marginTop: 2,
  },
  keyPointText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    flex: 1,
    lineHeight: 20,
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
  navigationSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  completeButton: {
    marginBottom: Spacing.lg,
  },
  completedActions: {
    alignItems: 'center',
  },
  completedMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: `${Colors.success}20`,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 20,
  },
  completedText: {
    fontSize: FontSize.md,
    color: Colors.success,
    fontWeight: FontWeight.semibold,
    marginLeft: Spacing.sm,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
    width: '100%',
  },
  navButton: {
    flex: 1,
  },
});
