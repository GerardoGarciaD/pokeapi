export interface AllPokemons {
  pokemon_v2_pokemon: PokemonV2Pokemon[];
}

export interface PokemonV2Pokemon {
  label: string;
  name: string;
  id: number;
  imgs: string[];
  pokemon_v2_pokemontypes: PokemonV2Pokemontype[];
  pokemon_v2_pokemonstats: PokemonV2Pokemonstat[];
}

export interface PokemonV2Pokemonstat {
  base_stat: number;
  pokemon_v2_stat: PokemonV2;
}

export interface PokemonV2 {
  name: Name;
}

export enum Name {
  Attack = 'attack',
  Bug = 'bug',
  Dark = 'dark',
  Defense = 'defense',
  Dragon = 'dragon',
  Electric = 'electric',
  Fairy = 'fairy',
  Fighting = 'fighting',
  Fire = 'fire',
  Flying = 'flying',
  Ghost = 'ghost',
  Grass = 'grass',
  Ground = 'ground',
  HP = 'hp',
  Ice = 'ice',
  Normal = 'normal',
  Poison = 'poison',
  Psychic = 'psychic',
  Rock = 'rock',
  SpecialAttack = 'special-attack',
  SpecialDefense = 'special-defense',
  Speed = 'speed',
  Steel = 'steel',
  Water = 'water',
}

export interface PokemonV2Pokemontype {
  pokemon_v2_type: PokemonV2;
}

export interface PrevNextPokemons {
  pokemon_v2_pokemon: PokemonsNamesPrevNext[];
}

export interface PokemonsNamesPrevNext {
  name: string;
}
