// Écran de quiz

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Button, Card, ProgressBar } from '../src/components/ui';
import { Colors, Spacing, FontSize, FontWeight } from '../src/constants/theme';
import { useAppStore } from '../src/stores/appStore';
import { sampleQuestions } from '../src/data/questions';
import { QuizMode, ExamAttempt } from '../src/types';

export default function QuizScreen() {
  const { userSettings, addExamAttempt } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizMode>('apprentissage');
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes en secondes
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState(sampleQuestions.slice(0, 10)); // 10 questions pour le test

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && quizMode === 'examen-blanc' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizMode, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizMode === 'examen-blanc' && answers[currentQuestionIndex] !== null) {
      return; // Pas de modification en mode examen blanc
    }
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null && quizMode === 'examen-blanc') {
      Alert.alert(
        'Attention',
        'Vous devez sélectionner une réponse avant de continuer.'
      );
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (quizMode === 'apprentissage') {
      setShowExplanation(true);
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(newAnswers[currentQuestionIndex + 1]);
        setShowExplanation(false);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleContinueAfterExplanation = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestionIndex] = selectedAnswer;
    }

    // Calculer le score
    let correctAnswers = 0;
    const categoryScores: {
      [key: string]: { correct: number; total: number };
    } = {};

    questions.forEach((question, index) => {
      const userAnswer = finalAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) correctAnswers++;

      // Score par catégorie
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;
      if (isCorrect) categoryScores[question.category].correct++;
    });

    const score = (correctAnswers / questions.length) * 100;

    // Convertir les scores par catégorie en pourcentages
    const categoryScoresPercent: { [key: string]: number } = {};
    Object.keys(categoryScores).forEach(category => {
      const { correct, total } = categoryScores[category];
      categoryScoresPercent[category] = (correct / total) * 100;
    });

    // Créer la tentative d'examen
    const attempt: ExamAttempt = {
      id: `attempt_${Date.now()}`,
      date: new Date(),
      score,
      duration:
        quizMode === 'examen-blanc' ? (30 * 60 - timeRemaining) / 60 : 0,
      questionIds: questions.map(q => q.id),
      answers: finalAnswers,
      categoryScores: categoryScoresPercent,
      examType: userSettings.examType,
      mode: quizMode,
      passed: score >= 80,
    };

    addExamAttempt(attempt);

    // Naviguer vers les résultats
    router.push({
      pathname: '/quiz-results',
      params: {
        score: score.toString(),
        totalQuestions: questions.length.toString(),
        correctAnswers: correctAnswers.toString(),
        duration: attempt.duration.toString(),
        passed: attempt.passed.toString(),
      },
    });
  };

  const handleStartQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    setQuizStarted(true);
    setTimeRemaining(30 * 60);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
  };

  if (!quizStarted) {
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Mode Quiz</Text>
          <Text style={styles.subtitle}>
            Choisissez votre mode d'entraînement
          </Text>
        </View>

        <View style={styles.modesSection}>
          <Card style={styles.modeCard}>
            <View style={styles.modeHeader}>
              <Ionicons
                name='fitness-outline'
                size={32}
                color={Colors.primary}
              />
              <Text style={styles.modeTitle}>Examen blanc</Text>
            </View>
            <Text style={styles.modeDescription}>
              Simulation complète de l'examen officiel avec chronomètre
            </Text>
            <View style={styles.modeFeatures}>
              <Text style={styles.featureText}>
                • 30 questions chronométrées
              </Text>
              <Text style={styles.featureText}>• Pas de retour en arrière</Text>
              <Text style={styles.featureText}>
                • Conditions réelles d'examen
              </Text>
            </View>
            <Button
              title="Commencer l'examen"
              onPress={() => handleStartQuiz('examen-blanc')}
              style={styles.modeButton}
            />
          </Card>

          <Card style={styles.modeCard}>
            <View style={styles.modeHeader}>
              <Ionicons
                name='book-outline'
                size={32}
                color={Colors.secondary}
              />
              <Text style={styles.modeTitle}>Mode apprentissage</Text>
            </View>
            <Text style={styles.modeDescription}>
              Apprenez à votre rythme avec corrections immédiates
            </Text>
            <View style={styles.modeFeatures}>
              <Text style={styles.featureText}>• Correction immédiate</Text>
              <Text style={styles.featureText}>• Explications détaillées</Text>
              <Text style={styles.featureText}>• Pas de limite de temps</Text>
            </View>
            <Button
              title="Commencer l'apprentissage"
              variant='outline'
              onPress={() => handleStartQuiz('apprentissage')}
              style={styles.modeButton}
            />
          </Card>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {/* En-tête avec progression et temps */}
      <View style={styles.quizHeader}>
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} sur {questions.length}
          </Text>
          <ProgressBar progress={progress} color={Colors.primary} height={8} />
        </View>

        {quizMode === 'examen-blanc' && (
          <View style={styles.timerSection}>
            <Ionicons
              name='time-outline'
              size={20}
              color={timeRemaining < 300 ? Colors.error : Colors.primary}
            />
            <Text
              style={[
                styles.timerText,
                timeRemaining < 300 && styles.timerTextWarning,
              ]}
            >
              {formatTime(timeRemaining)}
            </Text>
          </View>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Question */}
        <Card style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </Card>

        {/* Options de réponse */}
        <View style={styles.optionsSection}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const isWrong = isSelected && !isCorrect;

            let optionStyle = styles.optionButton;
            if (showExplanation) {
              if (isCorrect) {
                optionStyle = [styles.optionButton, styles.optionButtonCorrect];
              } else if (isWrong) {
                optionStyle = [styles.optionButton, styles.optionButtonWrong];
              }
            } else if (isSelected) {
              optionStyle = [styles.optionButton, styles.optionButtonSelected];
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={
                  quizMode === 'examen-blanc' &&
                  answers[currentQuestionIndex] !== null
                }
              >
                <View style={styles.optionContent}>
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                  {showExplanation && isCorrect && (
                    <Ionicons
                      name='checkmark-circle'
                      size={24}
                      color={Colors.success}
                    />
                  )}
                  {showExplanation && isWrong && (
                    <Ionicons
                      name='close-circle'
                      size={24}
                      color={Colors.error}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explication (mode apprentissage) */}
        {showExplanation && (
          <Card style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>Explication</Text>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
            <Text style={styles.explanationSource}>
              Source : {currentQuestion.source}
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Boutons de navigation */}
      <View style={styles.navigationSection}>
        <Button
          title={showExplanation ? 'Continuer' : 'Suivant'}
          onPress={
            showExplanation
              ? handleContinueAfterExplanation
              : handleNextQuestion
          }
          style={styles.nextButton}
        />
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
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  modesSection: {
    paddingHorizontal: Spacing.lg,
  },
  modeCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modeTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginLeft: Spacing.md,
  },
  modeDescription: {
    fontSize: FontSize.md,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  modeFeatures: {
    marginBottom: Spacing.lg,
  },
  featureText: {
    fontSize: FontSize.sm,
    color: Colors.text.light,
    marginBottom: Spacing.xs,
  },
  modeButton: {
    marginTop: Spacing.sm,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface.light,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  progressSection: {
    flex: 1,
  },
  progressText: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Spacing.xs,
  },
  timerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timerText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  timerTextWarning: {
    color: Colors.error,
  },
  questionCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
  },
  questionText: {
    fontSize: FontSize.lg,
    color: Colors.text.light,
    lineHeight: 24,
    fontWeight: FontWeight.medium,
  },
  optionsSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  optionButton: {
    backgroundColor: Colors.surface.light,
    borderRadius: 12,
    marginBottom: Spacing.md,
    borderWidth: 2,
    borderColor: Colors.border.light,
  },
  optionButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  optionButtonCorrect: {
    borderColor: Colors.success,
    backgroundColor: `${Colors.success}10`,
  },
  optionButtonWrong: {
    borderColor: Colors.error,
    backgroundColor: `${Colors.error}10`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  optionLetterText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.accent,
  },
  optionText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    flex: 1,
    lineHeight: 20,
  },
  explanationCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: `${Colors.info}10`,
    borderWidth: 1,
    borderColor: `${Colors.info}30`,
  },
  explanationTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.text.light,
    marginBottom: Spacing.md,
  },
  explanationText: {
    fontSize: FontSize.md,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  explanationSource: {
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  navigationSection: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface.light,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  nextButton: {
    marginBottom: Spacing.sm,
  },
});
