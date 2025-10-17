// Écrans de base manquants

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Button } from '../components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../constants/theme';

// Écran de détail de module
export default function ModuleDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Module Detail</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de détail de leçon
export function LessonDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Lesson Detail</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de quiz
export function QuizScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de résultats de quiz
export function QuizResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quiz Results</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de lecteur audio
export function AudioPlayerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Audio Player</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de paramètres
export function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

// Écran de confidentialité
export function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Privacy</Text>
        <Text style={styles.subtitle}>Cette fonctionnalité sera implémentée prochainement</Text>
        <Button title="Retour" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: 20,
  },
});
