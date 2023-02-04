const togglePokemonFavorites = (id: number) => {
  console.log('Toggle clicked');
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existsInFavorites = (id: number): boolean => {
  // Validation when the code is executed on the server
  if (typeof window === 'undefined') return false;
  const favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  return favorites.includes(id);
};

export default {
  togglePokemonFavorites,
  existsInFavorites,
};
