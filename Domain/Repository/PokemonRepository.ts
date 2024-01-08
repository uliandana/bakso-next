import { Pokemon } from '../Model/Pokemon';

export interface PokemonRepository {
  getPokemon(): Promise<Pokemon[]>,
}
