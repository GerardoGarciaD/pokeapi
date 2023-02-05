export interface PokemonPokedexInfo {
  pokemon_v2_pokemon: PokemonPokedex[];
}

export interface PokemonPokedex {
  name: string;
  id: number;
  img: string;
  pokemon_v2_pokemontypes: PokemonV2Pokemontype[];
  pokemon_v2_pokemonstats: PokemonV2Pokemonstat[];
  pokemon_v2_pokemonmoves: PokemonV2Pokemonmove[];
  pokemon_v2_pokemonabilities: PokemonV2Pokemonability[];
}

interface PokemonV2Pokemonability {
  pokemon_v2_ability: PokemonV2AbilityClass;
}

interface PokemonV2AbilityClass {
  name: string;
  id: number;
}

interface PokemonV2Pokemonmove {
  pokemon_v2_move: PokemonV2AbilityClass;
}

interface PokemonV2Pokemonstat {
  base_stat: number;
  pokemon_v2_stat: PokemonV2StatClass;
}

interface PokemonV2StatClass {
  name: Name;
}

enum Name {
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

interface PokemonV2Pokemontype {
  pokemon_v2_type: PokemonV2StatClass;
}
