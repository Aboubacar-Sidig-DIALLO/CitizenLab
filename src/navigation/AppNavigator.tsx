// Configuration de la navigation principale

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

import { Colors } from '../constants/theme';
import { RootStackParamList, MainTabParamList } from '../types';

// Import des écrans (à créer)
import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import PracticeScreen from '../screens/PracticeScreen';
import AudioScreen from '../screens/AudioScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ModuleDetailScreen from '../screens/ModuleDetailScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizResultsScreen from '../screens/QuizResultsScreen';
import AudioPlayerScreen from '../screens/AudioPlayerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// Navigation des tabs principaux
function MainTabNavigator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Learn':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Practice':
              iconName = focused ? 'fitness' : 'fitness-outline';
              break;
            case 'Audio':
              iconName = focused ? 'headset' : 'headset-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isDark ? Colors.text.muted : Colors.text.secondary,
        tabBarStyle: {
          backgroundColor: isDark ? Colors.surface.dark : Colors.surface.light,
          borderTopColor: isDark ? Colors.border.dark : Colors.border.light,
        },
        headerStyle: {
          backgroundColor: isDark ? Colors.surface.dark : Colors.surface.light,
        },
        headerTintColor: isDark ? Colors.text.dark : Colors.text.light,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Tab.Screen 
        name="Learn" 
        component={LearnScreen}
        options={{ title: 'Apprendre' }}
      />
      <Tab.Screen 
        name="Practice" 
        component={PracticeScreen}
        options={{ title: 'S\'entraîner' }}
      />
      <Tab.Screen 
        name="Audio" 
        component={AudioScreen}
        options={{ title: 'Audio' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}

// Navigation principale avec stack
export default function AppNavigator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? Colors.surface.dark : Colors.surface.light,
          },
          headerTintColor: isDark ? Colors.text.dark : Colors.text.light,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ModuleDetail" 
          component={ModuleDetailScreen}
          options={{ title: 'Module' }}
        />
        <Stack.Screen 
          name="LessonDetail" 
          component={LessonDetailScreen}
          options={{ title: 'Leçon' }}
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen}
          options={{ title: 'Quiz', headerShown: false }}
        />
        <Stack.Screen 
          name="QuizResults" 
          component={QuizResultsScreen}
          options={{ title: 'Résultats' }}
        />
        <Stack.Screen 
          name="AudioPlayer" 
          component={AudioPlayerScreen}
          options={{ title: 'Lecteur Audio' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Paramètres' }}
        />
        <Stack.Screen 
          name="Privacy" 
          component={PrivacyScreen}
          options={{ title: 'Confidentialité' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
