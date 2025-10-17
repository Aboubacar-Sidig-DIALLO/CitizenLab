// Layout des onglets principaux

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '../../src/constants/theme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'learn':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'practice':
              iconName = focused ? 'fitness' : 'fitness-outline';
              break;
            case 'audio':
              iconName = focused ? 'headset' : 'headset-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: isDark
          ? Colors.text.muted
          : Colors.text.secondary,
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
      <Tabs.Screen name='index' options={{ title: 'Accueil' }} />
      <Tabs.Screen name='learn' options={{ title: 'Apprendre' }} />
      <Tabs.Screen name='practice' options={{ title: "S'entraîner" }} />
      <Tabs.Screen name='audio' options={{ title: 'Audio' }} />
      <Tabs.Screen name='profile' options={{ title: 'Profil' }} />
    </Tabs>
  );
}
