// Écran d'apprentissage

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';

import { ModuleCard } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight, CategoryIcons } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';
import { sampleModules } from '../../src/data/modules';

export default function LearnScreen() {
  const { userProgress } = useAppStore();

  const handleModulePress = (moduleId: string) => {
    router.push(`/module/${moduleId}`);
  };

  const renderModule = ({ item }) => (
    <ModuleCard
      title={item.title}
      description={item.description}
      category={item.category}
      progress={userProgress?.moduleProgress[item.id]?.quizScore || 0}
      estimatedTime={item.estimatedTime}
      icon={CategoryIcons[item.category] as any}
      onPress={() => handleModulePress(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Modules d'apprentissage</Text>
        <Text style={styles.subtitle}>
          Explorez les différents thèmes pour préparer votre examen
        </Text>
      </View>
      
      <FlatList
        data={sampleModules}
        renderItem={renderModule}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
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
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
});
