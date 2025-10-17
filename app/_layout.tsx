// Layout principal avec navigation conditionnelle

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Import de nos stores pour l'initialisation
import '../src/stores/appStore';
import { useAppStore } from '../src/stores/appStore';

// Prévenir l'auto-hide du splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Ajouter des fonts personnalisées si nécessaire
  });
  
  const { isOnboarded } = useAppStore();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="module/[id]" options={{ title: 'Module' }} />
            <Stack.Screen name="lesson/[id]" options={{ title: 'Leçon' }} />
            <Stack.Screen name="quiz" options={{ headerShown: false }} />
            <Stack.Screen name="quiz-results" options={{ title: 'Résultats' }} />
            <Stack.Screen name="audio-player" options={{ title: 'Lecteur Audio' }} />
            <Stack.Screen name="settings" options={{ title: 'Paramètres' }} />
            <Stack.Screen name="privacy" options={{ title: 'Confidentialité' }} />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
