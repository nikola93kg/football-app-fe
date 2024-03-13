export const formatPlayerPositions = (positions) => {
  // Provera da li je positions niz i formatiranje svake pozicije u nizu
  if (Array.isArray(positions)) {
    return positions
      .map(position => 
        position
          .toLowerCase()
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      ).join(', '); // Spajanje formatiranih pozicija u jedan string razdvojen zarezima
  }
  // Ukoliko positions nije niz, vraća prazan string ili neku default vrednost
  return '';
};
