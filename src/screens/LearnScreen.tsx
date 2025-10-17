// Écran d'apprentissage - Liste des modules

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ModuleCard } from '../components/ui';
import { Colors, Spacing, FontSize, FontWeight, CategoryIcons } from '../constants/theme';
import { useAppStore } from '../stores/appStore';
import { RootStackParamList } from '../types';
import { sampleModules } from '../data/modules';

type LearnScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function LearnScreen() {
  const navigation = useNavigation<LearnScreenNavigationProp>();
  const { userProgress } = useAppStore();

  const handleModulePress = (moduleId: string) => {
    navigation.navigate('ModuleDetail', { moduleId });
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
