// Écran d'onboarding

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';
import { useAppStore } from '../src/stores/appStore';

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const { completeOnboarding, setConsentSettings } = useAppStore();

  const steps = [
    {
      title: 'Bienvenue !',
      subtitle: "Préparez-vous à l'examen civique français",
      content: (
        <View style={styles.stepContent}>
          <View style={styles.welcomeIcon}>
            <Ionicons name='flag' size={64} color={Colors.primary} />
          </View>
          <Text style={styles.stepTitle}>Civic Exam App</Text>
          <Text style={styles.stepDescription}>
            Votre compagnon pour réussir l'examen civique français avec un taux
            de réussite de 90-100% !
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={Colors.success}
              />
              <Text style={styles.featureText}>
                Modules d'apprentissage complets
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={Colors.success}
              />
              <Text style={styles.featureText}>
                Simulations d'examen réalistes
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={Colors.success}
              />
              <Text style={styles.featureText}>
                Contenus audio pour l'écoute
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color={Colors.success}
              />
              <Text style={styles.featureText}>
                Suivi de progression détaillé
              </Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      title: 'Choisissez votre examen',
      subtitle: 'Adaptons le contenu à vos besoins',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Quel type d'examen préparez-vous ?
          </Text>
          <View style={styles.examOptions}>
            <TouchableOpacity style={styles.examOption}>
              <Ionicons name='card-outline' size={32} color={Colors.primary} />
              <Text style={styles.examOptionTitle}>CSP</Text>
              <Text style={styles.examOptionSubtitle}>
                Carte de Séjour Pluriannuelle
              </Text>
              <Text style={styles.examOptionDescription}>
                Pour les résidents de longue durée
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.examOption}>
              <Ionicons
                name='home-outline'
                size={32}
                color={Colors.secondary}
              />
              <Text style={styles.examOptionTitle}>Carte de Résident</Text>
              <Text style={styles.examOptionSubtitle}>
                Résidence permanente
              </Text>
              <Text style={styles.examOptionDescription}>
                Pour l'établissement définitif
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
    },
    {
      title: 'Respect de votre vie privée',
      subtitle: 'Vos données sont protégées',
      content: (
        <View style={styles.stepContent}>
          <View style={styles.privacyIcon}>
            <Ionicons
              name='shield-checkmark'
              size={64}
              color={Colors.success}
            />
          </View>
          <Text style={styles.stepDescription}>
            Cette application respecte votre confidentialité selon les principes
            RGPD
          </Text>
          <View style={styles.privacyFeatures}>
            <View style={styles.privacyFeature}>
              <Ionicons name='lock-closed' size={20} color={Colors.success} />
              <Text style={styles.privacyFeatureText}>
                Toutes vos données restent sur votre appareil
              </Text>
            </View>
            <View style={styles.privacyFeature}>
              <Ionicons name='eye-off' size={20} color={Colors.success} />
              <Text style={styles.privacyFeatureText}>
                Aucune donnée personnelle n'est collectée
              </Text>
            </View>
            <View style={styles.privacyFeature}>
              <Ionicons name='ban' size={20} color={Colors.success} />
              <Text style={styles.privacyFeatureText}>
                Aucun suivi publicitaire ou commercial
              </Text>
            </View>
            <View style={styles.privacyFeature}>
              <Ionicons name='download' size={20} color={Colors.success} />
              <Text style={styles.privacyFeatureText}>
                Vous pouvez exporter ou supprimer vos données
              </Text>
            </View>
          </View>
          <View style={styles.privacyNote}>
            <Ionicons
              name='information-circle'
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.privacyNoteText}>
              Vous pourrez modifier vos préférences dans les paramètres
            </Text>
          </View>
        </View>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Configuration par défaut du consentement
      setConsentSettings({
        analytics: false,
        crashReports: true,
        notifications: false,
        dataSyncCloud: false,
        personalizedContent: false,
      });
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setConsentSettings({
      analytics: false,
      crashReports: true,
      notifications: false,
      dataSyncCloud: false,
      personalizedContent: false,
    });
    completeOnboarding();
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Indicateur de progression */}
        <View style={styles.progressIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive,
              ]}
            />
          ))}
        </View>

        {/* Contenu de l'étape */}
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>
          <Text style={styles.stepSubtitle}>{steps[currentStep].subtitle}</Text>
          {steps[currentStep].content}
        </View>
      </ScrollView>

      {/* Boutons de navigation */}
      <View style={styles.navigation}>
        {currentStep > 0 && (
          <Button
            title='Précédent'
            variant='outline'
            onPress={handlePrevious}
            style={styles.navigationButton}
          />
        )}
        <View style={styles.navigationSpacer} />
        <Button
          title={currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
          onPress={handleNext}
          style={styles.navigationButton}
        />
        {currentStep < steps.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Passer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
  },
  progressIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border.light,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  stepSubtitle: {
    fontSize: FontSize.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  stepContent: {
    alignItems: 'center',
    width: '100%',
  },
  stepDescription: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  welcomeIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  featuresList: {
    width: '100%',
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    flex: 1,
  },
  examOptions: {
    width: '100%',
    gap: Spacing.md,
  },
  examOption: {
    backgroundColor: Colors.surface.light,
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  examOptionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  examOptionSubtitle: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  examOptionDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  privacyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: `${Colors.success}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  privacyFeatures: {
    width: '100%',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  privacyFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  privacyFeatureText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    flex: 1,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.primary}10`,
    padding: Spacing.md,
    borderRadius: 8,
    gap: Spacing.sm,
  },
  privacyNoteText: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    flex: 1,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  navigationButton: {
    flex: 1,
  },
  navigationSpacer: {
    flex: 1,
  },
  skipButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  skipButtonText: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    fontWeight: FontWeight.medium,
  },
});
