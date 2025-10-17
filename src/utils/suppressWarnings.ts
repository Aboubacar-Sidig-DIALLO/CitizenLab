// Configuration pour supprimer les warnings de dépréciation
// Ce fichier peut être utilisé pour configurer les warnings React Native

// Supprimer le warning pointerEvents deprecated
const originalWarn = console.warn;
console.warn = (...args) => {
  // Filtrer le warning spécifique de pointerEvents
  if (
    args[0] &&
    typeof args[0] === 'string' &&
    args[0].includes('pointerEvents is deprecated')
  ) {
    return; // Ne pas afficher ce warning
  }
  originalWarn.apply(console, args);
};

export {};
