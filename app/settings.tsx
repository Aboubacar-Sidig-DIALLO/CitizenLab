// Écran de paramètres

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';
import { useAppStore } from '../src/stores/appStore';

export default function SettingsScreen() {
  const { userSettings, updateUserSettings, consentSettings, setConsentSettings } = useAppStore();

  const handleExamTypeChange = (examType: 'csp' | 'resident-card') => {
    updateUserSettings({ examType });
  };

  const handleAudioSpeedChange = (speed: number) => {
    updateUserSettings({
      audio: { ...userSettings.audio, speed }
    });
  };

  const handleAutoPlayChange = (autoPlay: boolean) => {
    updateUserSettings({
      audio: { ...userSettings.audio, autoPlay }
    });
  };

  const handleNotificationChange = (dailyReminder: boolean) => {
    updateUserSettings({
      notifications: { ...userSettings.notifications, dailyReminder }
    });
  };

  const handleConsentChange = (key: keyof typeof consentSettings, value: boolean) => {
    setConsentSettings({ ...consentSettings, [key]: value });
  };

  const handleExportData = () => {
    // TODO: Implémenter l'export des données
    console.log('Export des données');
  };

  const handleDeleteData = () => {
    // TODO: Implémenter la suppression des données
    console.log('Suppression des données');
  };

  const handleResetApp = () => {
    // TODO: Implémenter la réinitialisation
    console.log('Réinitialisation de l\'app');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.light} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Type d'examen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Examen préparé</Text>
        <Card style={styles.sectionCard}>
          <TouchableOpacity
            style={[
              styles.examOption,
              userSettings.examType === 'csp' && styles.examOptionActive
            ]}
            onPress={() => handleExamTypeChange('csp')}
          >
            <Ionicons name="card-outline" size={24} color={Colors.primary} />
            <View style={styles.examOptionInfo}>
              <Text style={styles.examOptionTitle}>CSP</Text>
              <Text style={styles.examOptionSubtitle}>Carte de Séjour Pluriannuelle</Text>
            </View>
            {userSettings.examType === 'csp' && (
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.examOption,
              userSettings.examType === 'resident-card' && styles.examOptionActive
            ]}
            onPress={() => handleExamTypeChange('resident-card')}
          >
            <Ionicons name="home-outline" size={24} color={Colors.secondary} />
            <View style={styles.examOptionInfo}>
              <Text style={styles.examOptionTitle}>Carte de Résident</Text>
              <Text style={styles.examOptionSubtitle}>Résidence permanente</Text>
            </View>
            {userSettings.examType === 'resident-card' && (
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            )}
          </TouchableOpacity>
        </Card>
      </View>

      {/* Paramètres audio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio</Text>
        <Card style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="speedometer-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Vitesse de lecture</Text>
            </View>
            <View style={styles.speedButtons}>
              {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                <TouchableOpacity
                  key={speed}
                  style={[
                    styles.speedButton,
                    userSettings.audio.speed === speed && styles.speedButtonActive
                  ]}
                  onPress={() => handleAudioSpeedChange(speed)}
                >
                  <Text style={[
                    styles.speedButtonText,
                    userSettings.audio.speed === speed && styles.speedButtonTextActive
                  ]}>
                    {speed}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="play-circle-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Lecture automatique</Text>
            </View>
            <Switch
              value={userSettings.audio.autoPlay}
              onValueChange={handleAutoPlayChange}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={userSettings.audio.autoPlay ? Colors.accent : Colors.text.muted}
            />
          </View>
        </Card>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Card style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Rappel quotidien</Text>
            </View>
            <Switch
              value={userSettings.notifications.dailyReminder}
              onValueChange={handleNotificationChange}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={userSettings.notifications.dailyReminder ? Colors.accent : Colors.text.muted}
            />
          </View>
        </Card>
      </View>

      {/* Confidentialité */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Confidentialité</Text>
        <Card style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="analytics-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Statistiques d'usage</Text>
            </View>
            <Switch
              value={consentSettings.analytics}
              onValueChange={(value) => handleConsentChange('analytics', value)}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={consentSettings.analytics ? Colors.accent : Colors.text.muted}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="bug-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Rapports d'erreurs</Text>
            </View>
            <Switch
              value={consentSettings.crashReports}
              onValueChange={(value) => handleConsentChange('crashReports', value)}
              trackColor={{ false: Colors.border.light, true: Colors.primary }}
              thumbColor={consentSettings.crashReports ? Colors.accent : Colors.text.muted}
            />
          </View>
          
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/privacy')}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Politique de confidentialité</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.muted} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Données */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Données</Text>
        <Card style={styles.sectionCard}>
          <TouchableOpacity style={styles.settingItem} onPress={handleExportData}>
            <View style={styles.settingInfo}>
              <Ionicons name="download-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Exporter mes données</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.muted} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleDeleteData}>
            <View style={styles.settingInfo}>
              <Ionicons name="trash-outline" size={20} color={Colors.error} />
              <Text style={[styles.settingLabel, { color: Colors.error }]}>
                Supprimer toutes les données
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.muted} />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Informations sur l'app */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Application</Text>
        <Card style={styles.sectionCard}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Développé avec ❤️</Text>
            <Text style={styles.settingValue}>pour la France</Text>
          </View>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleResetApp}>
            <View style={styles.settingInfo}>
              <Ionicons name="refresh-outline" size={20} color={Colors.warning} />
              <Text style={[styles.settingLabel, { color: Colors.warning }]}>
                Réinitialiser l'application
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.text.muted} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
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
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  sectionCard: {
    padding: 0,
  },
  examOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  examOptionActive: {
    backgroundColor: `${Colors.primary}10`,
  },
  examOptionInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  examOptionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  examOptionSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    marginLeft: Spacing.md,
  },
  settingValue: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
  speedButtons: {
    flexDirection: 'row',
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
});
