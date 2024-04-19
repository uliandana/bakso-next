import { Pokemon } from '@/domain/Model/Pokemon';

export interface PokemonRepository {
  getPokemonByName(name: string, statOnly?: boolean): Promise<Pokemon>,
  getAllPokemon(): Promise<Pokemon[]>,
}
