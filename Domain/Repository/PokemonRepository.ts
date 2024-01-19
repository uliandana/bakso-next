import { Pokemon } from '../Model/Pokemon';

export interface PokemonRepository {
  getPokemon(offset: number): Promise<Pokemon[]>,
  getPokemonByName(name: string): Promise<Pokemon | null>,
}
