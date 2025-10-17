// Point d'entrée principal de l'application

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

// Supprimer les warnings de dépréciation spécifiques
import './src/utils/suppressWarnings';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
