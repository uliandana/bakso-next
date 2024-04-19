import { Pokemon } from '@/domain/Model/Pokemon';

export interface PokemonRepository {
  getPokemon(offset: number): Promise<Pokemon[]>,
  getPokemonByName(name: string, statOnly?: boolean): Promise<Pokemon>,
  getAllPokemon(): Promise<Pokemon[]>,
}
