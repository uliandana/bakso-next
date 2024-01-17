import { Pokemon } from '../Model/Pokemon';

export interface PokemonRepository {
  getPokemon(offset: number): Promise<Pokemon[]>,
}
