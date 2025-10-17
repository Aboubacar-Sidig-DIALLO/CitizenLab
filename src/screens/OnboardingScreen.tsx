// Écran d'onboarding avec consentement RGPD

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Button, Card } from '../components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../constants/theme';
import { useAppStore } from '../stores/appStore';
import { RootStackParamList, ExamType, ConsentSettings } from '../types';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  content?: React.ReactNode;
}

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const { updateUserSettings, userSettings } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExamType, setSelectedExamType] = useState<ExamType>('csp');
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    analytics: false,
    crashReports: false,
    notifications: false,
    dataSyncCloud: false,
    personalizedContent: false,
  });

  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Bienvenue !',
      description: 'Préparez-vous à réussir votre examen civique avec confiance',
      icon: 'flag-outline',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Cette application vous accompagne dans votre préparation à l'examen civique obligatoire 
            pour l'obtention de titres de séjour en France.
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="book-outline" size={24} color={Colors.primary} />
              <Text style={styles.featureText}>Modules d'apprentissage thématiques</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="fitness-outline" size={24} color={Colors.primary} />
              <Text style={styles.featureText}>Simulations d'examen en conditions réelles</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="headset-outline" size={24} color={Colors.primary} />
              <Text style={styles.featureText}>Contenus audio pour apprendre partout</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics-outline" size={24} color={Colors.primary} />
              <Text style={styles.featureText}>Suivi de progression personnalisé</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 1,
      title: 'Respect de votre vie privée',
      description: 'Cette application respecte votre confidentialité',
      icon: 'shield-checkmark-outline',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Nous nous engageons à protéger votre vie privée selon les principes RGPD :
          </Text>
          <View style={styles.privacyList}>
            <View style={styles.privacyItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.privacyText}>
                Toutes vos données restent sur votre appareil
              </Text>
            </View>
            <View style={styles.privacyItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.privacyText}>
                Aucune donnée personnelle n'est collectée
              </Text>
            </View>
            <View style={styles.privacyItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.privacyText}>
                Aucun suivi publicitaire
              </Text>
            </View>
            <View style={styles.privacyItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.privacyText}>
                Vous contrôlez vos données à tout moment
              </Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      id: 2,
      title: 'Options de confidentialité',
      description: 'Choisissez vos préférences (optionnel)',
      icon: 'settings-outline',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Vous pouvez activer ces options pour améliorer votre expérience :
          </Text>
          <View style={styles.consentOptions}>
            <Card style={styles.consentCard}>
              <View style={styles.consentItem}>
                <View style={styles.consentInfo}>
                  <Text style={styles.consentTitle}>Synchronisation cloud</Text>
                  <Text style={styles.consentDescription}>
                    Sauvegardez votre progression sur plusieurs appareils
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Button
                    title={consentSettings.dataSyncCloud ? 'Activé' : 'Désactivé'}
                    variant={consentSettings.dataSyncCloud ? 'primary' : 'outline'}
                    size="small"
                    onPress={() => setConsentSettings(prev => ({
                      ...prev,
                      dataSyncCloud: !prev.dataSyncCloud
                    }))}
                  />
                </View>
              </View>
            </Card>
            
            <Card style={styles.consentCard}>
              <View style={styles.consentItem}>
                <View style={styles.consentInfo}>
                  <Text style={styles.consentTitle}>Rappels quotidiens</Text>
                  <Text style={styles.consentDescription}>
                    Recevez des notifications pour vous encourager à étudier
                  </Text>
                </View>
                <View style={styles.switchContainer}>
                  <Button
                    title={consentSettings.notifications ? 'Activé' : 'Désactivé'}
                    variant={consentSettings.notifications ? 'primary' : 'outline'}
                    size="small"
                    onPress={() => setConsentSettings(prev => ({
                      ...prev,
                      notifications: !prev.notifications
                    }))}
                  />
                </View>
              </View>
            </Card>
          </View>
          <Text style={styles.consentNote}>
            Vous pourrez modifier ces choix à tout moment dans les paramètres.
          </Text>
        </View>
      ),
    },
    {
      id: 3,
      title: 'Type d\'examen',
      description: 'Quel titre de séjour visez-vous ?',
      icon: 'document-text-outline',
      content: (
        <View style={styles.stepContent}>
          <Text style={styles.stepDescription}>
            Choisissez le type d'examen pour personnaliser votre préparation :
          </Text>
          <View style={styles.examOptions}>
            <Card 
              style={[
                styles.examCard,
                selectedExamType === 'csp' && styles.examCardSelected
              ]}
              onPress={() => setSelectedExamType('csp')}
            >
              <View style={styles.examCardContent}>
                <Ionicons 
                  name="card-outline" 
                  size={32} 
                  color={selectedExamType === 'csp' ? Colors.primary : Colors.text.secondary} 
                />
                <Text style={[
                  styles.examCardTitle,
                  selectedExamType === 'csp' && styles.examCardTitleSelected
                ]}>
                  Carte de Séjour Pluriannuelle
                </Text>
                <Text style={styles.examCardDescription}>
                  Titre de séjour de 1 à 4 ans
                </Text>
                <Text style={styles.examCardDetails}>
                  Seuil de réussite : 80%
                </Text>
              </View>
            </Card>
            
            <Card 
              style={[
                styles.examCard,
                selectedExamType === 'carte-resident' && styles.examCardSelected
              ]}
              onPress={() => setSelectedExamType('carte-resident')}
            >
              <View style={styles.examCardContent}>
                <Ionicons 
                  name="home-outline" 
                  size={32} 
                  color={selectedExamType === 'carte-resident' ? Colors.primary : Colors.text.secondary} 
                />
                <Text style={[
                  styles.examCardTitle,
                  selectedExamType === 'carte-resident' && styles.examCardTitleSelected
                ]}>
                  Carte de Résident
                </Text>
                <Text style={styles.examCardDescription}>
                  Titre de séjour de 10 ans
                </Text>
                <Text style={styles.examCardDetails}>
                  Seuil de réussite : 80%
                </Text>
              </View>
            </Card>
          </View>
        </View>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finaliser l'onboarding
      updateUserSettings({
        examType: selectedExamType,
      });
      navigation.replace('Main');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Utiliser les valeurs par défaut
    updateUserSettings({
      examType: selectedExamType,
    });
    navigation.replace('Main');
  };

  const currentStepData = steps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={currentStepData.icon} size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>{currentStepData.title}</Text>
          <Text style={styles.subtitle}>{currentStepData.description}</Text>
        </View>

        <View style={styles.content}>
          {currentStepData.content}
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
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
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          {currentStep > 0 && (
            <Button
              title="Précédent"
              variant="outline"
              onPress={handlePrevious}
              style={styles.button}
            />
          )}
          <View style={styles.buttonSpacer} />
          <Button
            title={currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
            onPress={handleNext}
            style={styles.button}
          />
        </View>
        {currentStep < steps.length - 1 && (
          <Button
            title="Passer"
            variant="outline"
            onPress={handleSkip}
            style={styles.skipButton}
          />
        )}
      </View>
    </SafeAreaView>
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
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${Colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingBottom: Spacing.lg,
  },
  stepContent: {
    paddingVertical: Spacing.lg,
  },
  stepDescription: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    lineHeight: 22,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  featuresList: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  featureText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    marginLeft: Spacing.md,
    flex: 1,
  },
  privacyList: {
    gap: Spacing.md,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
  },
  privacyText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 20,
  },
  consentOptions: {
    gap: Spacing.md,
  },
  consentCard: {
    padding: Spacing.lg,
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  consentInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  consentTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  consentDescription: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    lineHeight: 18,
  },
  switchContainer: {
    minWidth: 80,
  },
  consentNote: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: Spacing.lg,
  },
  examOptions: {
    gap: Spacing.md,
  },
  examCard: {
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  examCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  examCardContent: {
    alignItems: 'center',
  },
  examCardTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  examCardTitleSelected: {
    color: Colors.primary,
  },
  examCardDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  examCardDetails: {
    fontSize: FontSize.sm,
    color: Colors.text.muted,
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  progressBar: {
    flexDirection: 'row',
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
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface.light,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  buttonSpacer: {
    width: Spacing.md,
  },
  skipButton: {
    marginTop: Spacing.md,
  },
});
