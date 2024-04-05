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
}