// Écran de profil

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card, StatCard } from '../../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../../src/constants/theme';
import { useAppStore } from '../../src/stores/appStore';

export default function ProfileScreen() {
  const { userProgress, userSettings } = useAppStore();

  const totalAttempts = userProgress?.examAttempts.length || 0;
  const averageScore = userProgress?.overallScore || 0;
  const currentStreak = userProgress?.streak || 0;
  const totalTimeSpent = userProgress?.totalTimeSpent || 0;
  const weakCategories = userProgress?.weakCategories || [];

  const examTypeLabel = userSettings.examType === 'csp' 
    ? 'Carte de Séjour Pluriannuelle' 
    : 'Carte de Résident';

  const handleExportData = () => {
    // TODO: Implémenter l'export des données
    console.log('Export des données');
  };

  const handleDeleteData = () => {
    // TODO: Implémenter la suppression des données
    console.log('Suppression des données');
  };

  const profileSections = [
    {
      title: 'Paramètres',
      items: [
        {
          icon: 'settings-outline',
          title: 'Paramètres généraux',
          subtitle: 'Notifications, thème, langue',
          onPress: () => router.push('/settings'),
        },
        {
          icon: 'shield-checkmark-outline',
          title: 'Confidentialité',
          subtitle: 'RGPD, données personnelles',
          onPress: () => router.push('/privacy'),
        },
      ],
    },
    {
      title: 'Données',
      items: [
        {
          icon: 'download-outline',
          title: 'Exporter mes données',
          subtitle: 'Télécharger un fichier JSON',
          onPress: handleExportData,
        },
        {
          icon: 'trash-outline',
          title: 'Supprimer toutes les données',
          subtitle: 'Réinitialiser l\'application',
          onPress: handleDeleteData,
          destructive: true,
        },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête du profil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color={Colors.primary} />
        </View>
        <Text style={styles.userName}>Utilisateur</Text>
        <Text style={styles.examType}>{examTypeLabel}</Text>
      </View>

      {/* Statistiques principales */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Vos statistiques</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Score moyen"
            value={`${Math.round(averageScore)}%`}
            subtitle={`${totalAttempts} tentatives`}
            icon="trophy-outline"
            color={averageScore >= 80 ? Colors.success : averageScore >= 60 ? Colors.warning : Colors.error}
          />
          <StatCard
            title="Série actuelle"
            value={`${currentStreak} jours`}
            subtitle="jours consécutifs"
            icon="flame-outline"
            color={Colors.secondary}
          />
          <StatCard
            title="Temps d'étude"
            value={`${Math.round(totalTimeSpent / 60)}h`}
            subtitle="minutes totales"
            icon="time-outline"
            color={Colors.primary}
          />
          <StatCard
            title="Points faibles"
            value={weakCategories.length.toString()}
            subtitle="catégories"
            icon="warning-outline"
            color={Colors.warning}
          />
        </View>
      </View>

      {/* Progression récente */}
      {totalAttempts > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Dernières tentatives</Text>
          <Card style={styles.recentCard}>
            {userProgress?.examAttempts.slice(-3).reverse().map((attempt, index) => (
              <View key={attempt.id} style={styles.attemptItem}>
                <View style={styles.attemptInfo}>
                  <Text style={styles.attemptDate}>
                    {attempt.date.toLocaleDateString('fr-FR')}
                  </Text>
                  <Text style={styles.attemptType}>
                    {attempt.examType === 'csp' ? 'CSP' : 'Carte de Résident'}
                  </Text>
                </View>
                <View style={[
                  styles.attemptScore,
                  { backgroundColor: attempt.score >= 80 ? `${Colors.success}20` : `${Colors.warning}20` }
                ]}>
                  <Text style={[
                    styles.attemptScoreText,
                    { color: attempt.score >= 80 ? Colors.success : Colors.warning }
                  ]}>
                    {Math.round(attempt.score)}%
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        </View>
      )}

      {/* Sections du profil */}
      {profileSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Card style={styles.sectionCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[
                  styles.sectionItem,
                  itemIndex < section.items.length - 1 && styles.sectionItemBorder
                ]}
                onPress={item.onPress}
              >
                <View style={styles.sectionItemContent}>
                  <View style={[
                    styles.sectionItemIcon,
                    item.destructive && styles.sectionItemIconDestructive
                  ]}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={24} 
                      color={item.destructive ? Colors.error : Colors.primary} 
                    />
                  </View>
                  <View style={styles.sectionItemInfo}>
                    <Text style={[
                      styles.sectionItemTitle,
                      item.destructive && styles.sectionItemTitleDestructive
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.sectionItemSubtitle}>
                      {item.subtitle}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-forward" 
                    size={20} 
                    color={Colors.text.muted} 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      ))}

      {/* Informations sur l'application */}
      <View style={styles.infoSection}>
        <Card style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Dernière mise à jour</Text>
            <Text style={styles.infoValue}>Janvier 2025</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Développé avec ❤️</Text>
            <Text style={styles.infoValue}>pour la France</Text>
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
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  examType: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
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
  recentSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  recentCard: {
    padding: Spacing.lg,
  },
  attemptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  attemptInfo: {
    flex: 1,
  },
  attemptDate: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.light,
  },
  attemptType: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
  },
  attemptScore: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  attemptScoreText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionCard: {
    padding: 0,
  },
  sectionItem: {
    padding: Spacing.lg,
  },
  sectionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  sectionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  sectionItemIconDestructive: {
    backgroundColor: `${Colors.error}20`,
  },
  sectionItemInfo: {
    flex: 1,
  },
  sectionItemTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  sectionItemTitleDestructive: {
    color: Colors.error,
  },
  sectionItemSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
  infoSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  infoCard: {
    padding: Spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoLabel: {
    fontSize: FontSize.md,
    color: Colors.text.light,
  },
  infoValue: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
});
