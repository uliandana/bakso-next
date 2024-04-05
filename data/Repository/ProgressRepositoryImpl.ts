import { Pokemon } from '@/domain/Model/Pokemon';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';
import ProgressDataSource from '@/data/DataSource/ProgressDataSource';

export class ProgressRepositoryImpl implements ProgressRepository {
  dataSource: ProgressDataSource;

  constructor(_dataSource: ProgressDataSource) {
    this.dataSource = _dataSource;
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
