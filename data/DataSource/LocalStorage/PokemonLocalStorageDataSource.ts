import PokemonDataSource from '@/data/DataSource/PokemonDataSource';

const KEY_CHOSEN = 'CHOSEN';
const KEY_WEIGHT = 'WEIGHT';

export default class PokemonLocalStorageDataSourceImpl implements PokemonDataSource {
  async getChosenPokemon(): Promise<string> {
    const chosen = localStorage.getItem(KEY_CHOSEN) || '';
    return chosen;
  }

  async setChosenPokemon(name: string): Promise<void> {
    localStorage.setItem(KEY_CHOSEN, name);
  }

  async getWeightProgress(): Promise<number> {
    const weight = localStorage.getItem(KEY_WEIGHT) || '0';
    return parseInt(weight);
  }

  async setWeightProgress(weight: number): Promise<void> {
    localStorage.setItem(KEY_WEIGHT, weight.toString());
  }
}