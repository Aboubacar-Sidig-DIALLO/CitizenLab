const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuration pour supprimer les warnings de dépréciation
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Supprimer les warnings spécifiques
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  // Filtrer le warning pointerEvents deprecated
  if (args[0] && typeof args[0] === 'string' && args[0].includes('pointerEvents is deprecated')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

module.exports = config;
