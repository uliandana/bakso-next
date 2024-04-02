import { Pokemon } from '../Model/Pokemon';

export interface PokemonRepository {
  getPokemon(offset: number): Promise<Pokemon[]>,
  getPokemonByName(name: string, statOnly?: Boolean): Promise<Pokemon>,
  getAllPokemon(): Promise<Pokemon[]>,
  getChosenPokemon(): Promise<Pokemon['nameSlug']>,
  setChosenPokemon(name: Pokemon['nameSlug']): Promise<void>,
  getWeightProgress(): Promise<Pokemon['weight']>,
  setWeightProgress(weight: Pokemon['weight']): Promise<void>,
}
