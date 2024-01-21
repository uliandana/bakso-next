import { BerryRepository } from '@/Domain/Repository/BerryRepository';
import BerryDataSource from '../DataSource/BerryDataSource';

export class BerryRepositoryImpl implements BerryRepository {
  dataSource: BerryDataSource;

  constructor(_dataSource: BerryDataSource) {
    this.dataSource = _dataSource;
  }
  
  async getBerry() {
    return this.dataSource.getBerry();
  }
}
