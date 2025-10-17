// Écran audio

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

export default function AudioScreen() {
  const { userSettings } = useAppStore();

  const audioContent = [
    {
      id: 'audio-1',
      title: 'Histoire de France - Révolution française',
      duration: '15:30',
      module: 'Histoire',
      description: 'Découvrez les événements clés de la Révolution française',
    },
    {
      id: 'audio-2',
      title: 'Institutions de la Ve République',
      duration: '12:45',
      module: 'Institutions',
      description: 'Comprendre le fonctionnement des institutions françaises',
    },
    {
      id: 'audio-3',
      title: 'Valeurs républicaines',
      duration: '18:20',
      module: 'Valeurs',
      description: 'Liberté, Égalité, Fraternité et Laïcité',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Contenus audio</Text>
        <Text style={styles.subtitle}>
          Apprenez en écoutant nos contenus audio optimisés
        </Text>
      </View>

      <View style={styles.content}>
        {audioContent.map((audio) => (
          <Card key={audio.id} style={styles.audioCard}>
            <View style={styles.audioHeader}>
              <View style={styles.audioIcon}>
                <Ionicons name="headset-outline" size={24} color={Colors.primary} />
              </View>
              <View style={styles.audioInfo}>
                <Text style={styles.audioTitle}>{audio.title}</Text>
                <Text style={styles.audioModule}>{audio.module}</Text>
                <Text style={styles.audioDescription}>{audio.description}</Text>
              </View>
              <Text style={styles.audioDuration}>{audio.duration}</Text>
            </View>
            <View style={styles.audioActions}>
              <Button
                title="Écouter"
                icon="play-outline"
                size="small"
                onPress={() => router.push('/audio-player')}
              />
              <Button
                title="Télécharger"
                variant="outline"
                size="small"
                icon="download-outline"
                onPress={() => console.log('Téléchargement non implémenté')}
              />
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Paramètres audio</Text>
        <Card style={styles.settingsCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Vitesse de lecture</Text>
            <Text style={styles.settingValue}>
              {userSettings.audio.speed}x
            </Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Lecture automatique</Text>
            <Text style={styles.settingValue}>
              {userSettings.audio.autoPlay ? 'Activé' : 'Désactivé'}
            </Text>
          </View>
          <Button
            title="Modifier les paramètres"
            variant="outline"
            onPress={() => router.push('/settings')}
          />
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
  content: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  audioCard: {
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  audioIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  audioModule: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
    marginBottom: Spacing.xs,
  },
  audioDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  audioDuration: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    fontWeight: FontWeight.medium,
  },
  audioActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  settingsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  settingsCard: {
    padding: Spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.text.light,
  },
  settingValue: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
});
