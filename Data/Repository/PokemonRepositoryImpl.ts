import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';
import PokemonDataSource from '@/data/DataSource/PokemonDataSource';

export class PokemonRepositoryImpl implements PokemonRepository {
  dataSource: PokemonDataSource;

  constructor(_dataSource: PokemonDataSource) {
    this.dataSource = _dataSource;
  }
  
  async getPokemon(offset: number) {
    return this.dataSource.getPokemon!(offset);
  }

  async getPokemonByName(name: Pokemon['nameSlug'], statOnly?: Boolean) {
    return this.dataSource.getPokemonByName!(name, statOnly);
  }

  async getAllPokemon() {
    return this.dataSource.getAllPokemon!();
  }

  async getChosenPokemon() {
    return this.dataSource.getChosenPokemon!();
  }

  async setChosenPokemon(name: Pokemon['nameSlug']) {
    return this.dataSource.setChosenPokemon!(name);
  }

  async getWeightProgress() {
    return this.dataSource.getWeightProgress!();
  }

  async setWeightProgress(weight: Pokemon['weight']) {
    return this.dataSource.setWeightProgress!(weight);
  }
}
