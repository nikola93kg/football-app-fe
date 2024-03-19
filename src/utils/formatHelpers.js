export const formatPlayerPositions = (positions) => {
  if (Array.isArray(positions)) {
    return positions
      .map(position => 
        position
          .toLowerCase()
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      ).join(', ');
  }
  return ''; // ako positions nije niz vratice prazan string
};
