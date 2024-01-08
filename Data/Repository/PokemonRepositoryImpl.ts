import { PokemonRepository } from '@/Domain/Repository/PokemonRepository';
import PokemonDataSource from '../DataSource/PokemonDataSource';

export class PokemonRepositoryImpl implements PokemonRepository {
  dataSource: PokemonDataSource;

  constructor(_dataSource: PokemonDataSource) {
    this.dataSource = _dataSource;
  }
  
  async getPokemon() {
    return this.dataSource.getPokemon();
  }
}
