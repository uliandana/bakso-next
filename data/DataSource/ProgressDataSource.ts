import { Pokemon } from '@/domain/Model/Pokemon';

export default interface ProgressDataSource {
  getChosenPokemon(): Promise<Pokemon['nameSlug']>,
  setChosenPokemon(name: Pokemon['nameSlug']): Promise<void>,
  getWeightProgress(): Promise<Pokemon['weight']>,
  setWeightProgress(weight: Pokemon['weight']): Promise<void>,
}
