import { Pokemon } from '@/Domain/Model/Pokemon';

export default interface PokemonDataSource {
  getPokemon?(offset: number): Promise<Pokemon[]>,
  getPokemonByName?(name: string, statOnly?: Boolean): Promise<Pokemon>,
  getAllPokemon?(): Promise<Pokemon[]>,
  getChosenPokemon?(): Promise<Pokemon['nameSlug']>,
  setChosenPokemon?(name: Pokemon['nameSlug']): Promise<void>,
  getWeightProgress?(): Promise<Pokemon['weight']>,
  setWeightProgress?(weight: Pokemon['weight']): Promise<void>,
}
