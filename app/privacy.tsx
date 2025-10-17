// Écran de confidentialité

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

import { Button, Card } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';

export default function PrivacyScreen() {
  const handleExportData = () => {
    // TODO: Implémenter l'export des données
    console.log('Export des données');
  };

  const handleDeleteData = () => {
    // TODO: Implémenter la suppression des données
    console.log('Suppression des données');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.light} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confidentialité</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Card style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="shield-checkmark" size={48} color={Colors.success} />
          </View>
          <Text style={styles.introTitle}>Votre vie privée est protégée</Text>
          <Text style={styles.introText}>
            Cette application respecte votre confidentialité selon les principes RGPD. 
            Vos données restent sur votre appareil et ne sont jamais transmises à des tiers.
          </Text>
        </Card>
      </View>

      {/* Principes RGPD */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nos engagements RGPD</Text>
        <Card style={styles.principlesCard}>
          <View style={styles.principleItem}>
            <Ionicons name="lock-closed" size={24} color={Colors.success} />
            <View style={styles.principleContent}>
              <Text style={styles.principleTitle}>Minimisation des données</Text>
              <Text style={styles.principleText}>
                Nous ne collectons que les données strictement nécessaires à votre apprentissage.
              </Text>
            </View>
          </View>
          
          <View style={styles.principleItem}>
            <Ionicons name="eye-off" size={24} color={Colors.success} />
            <View style={styles.principleContent}>
              <Text style={styles.principleTitle}>Transparence</Text>
              <Text style={styles.principleText}>
                Vous savez exactement quelles données sont collectées et pourquoi.
              </Text>
            </View>
          </View>
          
          <View style={styles.principleItem}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            <View style={styles.principleContent}>
              <Text style={styles.principleTitle}>Consentement</Text>
              <Text style={styles.principleText}>
                Vous contrôlez quelles données peuvent être utilisées et comment.
              </Text>
            </View>
          </View>
          
          <View style={styles.principleItem}>
            <Ionicons name="download" size={24} color={Colors.success} />
            <View style={styles.principleContent}>
              <Text style={styles.principleTitle}>Portabilité</Text>
              <Text style={styles.principleText}>
                Vous pouvez exporter ou supprimer vos données à tout moment.
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Données collectées */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Données collectées</Text>
        <Card style={styles.dataCard}>
          <View style={styles.dataCategory}>
            <Text style={styles.dataCategoryTitle}>📊 Progression d'apprentissage</Text>
            <Text style={styles.dataCategoryText}>
              • Scores aux quiz et examens{'\n'}
              • Temps passé sur chaque leçon{'\n'}
              • Modules complétés{'\n'}
              • Points faibles identifiés
            </Text>
          </View>
          
          <View style={styles.dataCategory}>
            <Text style={styles.dataCategoryTitle}>⚙️ Paramètres de l'application</Text>
            <Text style={styles.dataCategoryText}>
              • Type d'examen préparé (CSP/Résident){'\n'}
              • Préférences audio{'\n'}
              • Paramètres de notifications{'\n'}
              • Choix de consentement RGPD
            </Text>
          </View>
          
          <View style={styles.dataCategory}>
            <Text style={styles.dataCategoryTitle}>📱 Données techniques (optionnelles)</Text>
            <Text style={styles.dataCategoryText}>
              • Rapports d'erreurs anonymisés{'\n'}
              • Statistiques d'usage anonymisées{'\n'}
              • Informations de performance
            </Text>
          </View>
        </Card>
      </View>

      {/* Stockage et sécurité */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stockage et sécurité</Text>
        <Card style={styles.securityCard}>
          <View style={styles.securityItem}>
            <Ionicons name="phone-portrait" size={24} color={Colors.primary} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Stockage local</Text>
              <Text style={styles.securityText}>
                Toutes vos données sont stockées uniquement sur votre appareil, 
                dans une base de données locale sécurisée.
              </Text>
            </View>
          </View>
          
          <View style={styles.securityItem}>
            <Ionicons name="shield" size={24} color={Colors.primary} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Chiffrement</Text>
              <Text style={styles.securityText}>
                Les données sensibles sont chiffrées et protégées par les 
                mécanismes de sécurité de votre système d'exploitation.
              </Text>
            </View>
          </View>
          
          <View style={styles.securityItem}>
            <Ionicons name="ban" size={24} color={Colors.primary} />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Aucun tracking</Text>
              <Text style={styles.securityText}>
                Aucun cookie, pixel de tracking ou système d'analyse 
                tiers n'est utilisé dans cette application.
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Vos droits */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vos droits</Text>
        <Card style={styles.rightsCard}>
          <View style={styles.rightItem}>
            <Ionicons name="eye" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit d'accès : Consulter vos données</Text>
          </View>
          
          <View style={styles.rightItem}>
            <Ionicons name="create" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit de rectification : Corriger vos données</Text>
          </View>
          
          <View style={styles.rightItem}>
            <Ionicons name="trash" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit à l'effacement : Supprimer vos données</Text>
          </View>
          
          <View style={styles.rightItem}>
            <Ionicons name="download" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit à la portabilité : Exporter vos données</Text>
          </View>
          
          <View style={styles.rightItem}>
            <Ionicons name="pause" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit à la limitation : Limiter le traitement</Text>
          </View>
          
          <View style={styles.rightItem}>
            <Ionicons name="hand-left" size={20} color={Colors.info} />
            <Text style={styles.rightText}>Droit d'opposition : S'opposer au traitement</Text>
          </View>
        </Card>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gérer vos données</Text>
        <View style={styles.actionButtons}>
          <Button
            title="Exporter mes données"
            icon="download-outline"
            onPress={handleExportData}
            style={styles.actionButton}
          />
          <Button
            title="Supprimer toutes les données"
            icon="trash-outline"
            variant="outline"
            onPress={handleDeleteData}
            style={styles.actionButton}
          />
        </View>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Card style={styles.contactCard}>
          <Text style={styles.contactTitle}>Questions sur la confidentialité ?</Text>
          <Text style={styles.contactText}>
            Si vous avez des questions sur la protection de vos données personnelles, 
            vous pouvez nous contacter.
          </Text>
          <Button
            title="Nous contacter"
            icon="mail-outline"
            variant="outline"
            onPress={() => console.log('Contact')}
            style={styles.contactButton}
          />
        </Card>
      </View>

      {/* Dernière mise à jour */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Dernière mise à jour : Janvier 2025
        </Text>
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
  introCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: `${Colors.success}10`,
    borderWidth: 1,
    borderColor: `${Colors.success}30`,
  },
  introIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  introTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  introText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
  principlesCard: {
    padding: Spacing.lg,
  },
  principleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  principleContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  principleTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  principleText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  dataCard: {
    padding: Spacing.lg,
  },
  dataCategory: {
    marginBottom: Spacing.lg,
  },
  dataCategoryTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.sm,
  },
  dataCategoryText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  securityCard: {
    padding: Spacing.lg,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  securityContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  securityTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  securityText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  rightsCard: {
    padding: Spacing.lg,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  rightText: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginLeft: Spacing.md,
    flex: 1,
  },
  actionButtons: {
    gap: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.sm,
  },
  contactCard: {
    padding: Spacing.lg,
    alignItems: 'center',
    backgroundColor: `${Colors.info}10`,
    borderWidth: 1,
    borderColor: `${Colors.info}30`,
  },
  contactTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  contactText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  contactButton: {
    marginTop: Spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  footerText: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
  },
});
