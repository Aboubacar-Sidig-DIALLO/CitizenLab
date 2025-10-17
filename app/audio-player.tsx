// Écran de lecteur audio

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';
import { useAppStore } from '../src/stores/appStore';

export default function AudioPlayerScreen() {
  const { userSettings, updateUserSettings } = useAppStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes par défaut
  const [playbackSpeed, setPlaybackSpeed] = useState(userSettings.audio.speed);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number) => {
    setCurrentTime(value);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    updateUserSettings({
      audio: { ...userSettings.audio, speed },
    });
  };

  const handleBackward = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const handleForward = () => {
    setCurrentTime(Math.min(duration, currentTime + 10));
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name='close' size={24} color={Colors.text.light} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lecteur Audio</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Informations de l'audio */}
      <View style={styles.infoSection}>
        <Card style={styles.infoCard}>
          <View style={styles.audioIcon}>
            <Ionicons name='headset' size={48} color={Colors.primary} />
          </View>
          <Text style={styles.audioTitle}>
            Histoire de France - Révolution française
          </Text>
          <Text style={styles.audioSubtitle}>Module Histoire • Leçon 1</Text>
        </Card>
      </View>

      {/* Contrôles principaux */}
      <View style={styles.controlsSection}>
        <View style={styles.timeSection}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <View style={styles.progressContainer}>
            <TouchableOpacity
              style={styles.progressSlider}
              onPress={() => {
                // Placeholder pour la fonctionnalité de seek
                console.log('Seek functionality not implemented yet');
              }}
            >
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(currentTime / duration) * 100}%` },
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>

        <View style={styles.mainControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleBackward}
          >
            <Ionicons
              name='play-skip-back'
              size={32}
              color={Colors.text.light}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={48}
              color={Colors.accent}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleForward}
          >
            <Ionicons
              name='play-skip-forward'
              size={32}
              color={Colors.text.light}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contrôles secondaires */}
      <View style={styles.secondaryControls}>
        <View style={styles.speedControls}>
          <Text style={styles.controlLabel}>Vitesse</Text>
          <View style={styles.speedButtons}>
            {[0.75, 1.0, 1.25, 1.5].map(speed => (
              <TouchableOpacity
                key={speed}
                style={[
                  styles.speedButton,
                  playbackSpeed === speed && styles.speedButtonActive,
                ]}
                onPress={() => handleSpeedChange(speed)}
              >
                <Text
                  style={[
                    styles.speedButtonText,
                    playbackSpeed === speed && styles.speedButtonTextActive,
                  ]}
                >
                  {speed}x
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.additionalControls}>
          <TouchableOpacity style={styles.additionalButton}>
            <Ionicons name='repeat' size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Ionicons name='shuffle' size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton}>
            <Ionicons name='list' size={24} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsSection}>
        <Card style={styles.optionsCard}>
          <View style={styles.optionItem}>
            <Ionicons
              name='download-outline'
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.optionText}>
              Télécharger pour l'écoute hors ligne
            </Text>
            <TouchableOpacity>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={Colors.text.muted}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionItem}>
            <Ionicons
              name='document-text-outline'
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.optionText}>Voir la transcription</Text>
            <TouchableOpacity>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={Colors.text.muted}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.optionItem}>
            <Ionicons
              name='bookmark-outline'
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.optionText}>Marquer comme favori</Text>
            <TouchableOpacity>
              <Ionicons
                name='chevron-forward'
                size={20}
                color={Colors.text.muted}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  infoCard: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  audioIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  audioTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  audioSubtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  controlsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  timeText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
    minWidth: 50,
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  progressSlider: {
    height: 40,
    justifyContent: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border.light,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControls: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  speedControls: {
    marginBottom: Spacing.lg,
  },
  controlLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.light,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  speedButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  speedButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.surface.light,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  speedButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  speedButtonText: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    fontWeight: FontWeight.medium,
  },
  speedButtonTextActive: {
    color: Colors.accent,
  },
  additionalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xl,
  },
  additionalButton: {
    padding: Spacing.md,
  },
  optionsSection: {
    paddingHorizontal: Spacing.lg,
    flex: 1,
  },
  optionsCard: {
    padding: 0,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  optionText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    flex: 1,
    marginLeft: Spacing.md,
  },
});
