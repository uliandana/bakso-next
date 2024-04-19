import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';
import PokemonDataSource from '@/data/DataSource/PokemonDataSource';

export class PokemonRepositoryImpl implements PokemonRepository {
  dataSource: PokemonDataSource;

  constructor(_dataSource: PokemonDataSource) {
    this.dataSource = _dataSource;
  }

  async getPokemonByName(name: Pokemon['nameSlug'], statOnly?: boolean) {
    return this.dataSource.getPokemonByName(name, statOnly);
  }

  async getAllPokemon() {
    return this.dataSource.getAllPokemon();
  }
}
