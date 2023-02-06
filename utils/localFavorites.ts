export interface favoritePokemons {
  id: number;
  name: string;
}
const togglePokemonFavorites = (favoritePokemon: favoritePokemons) => {
  let favorites: favoritePokemons[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  if (favorites.some((favPokemon) => favPokemon.id === favoritePokemon.id)) {
    favorites = favorites.filter(
      (favPokemon) => favPokemon.id !== favoritePokemon.id
    );
  } else {
    favorites.unshift(favoritePokemon);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existsInFavorites = (favoritePokemon: favoritePokemons): boolean => {
  const favorites: favoritePokemons[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  return favorites.some((favPokemon) => favPokemon.id === favoritePokemon.id);
};

const pokemons = (): favoritePokemons[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

export default {
  togglePokemonFavorites,
  existsInFavorites,
  pokemons,
};
