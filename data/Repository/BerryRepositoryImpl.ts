import { BerryRepository } from '@/domain/Repository/BerryRepository';
import BerryDataSource from '@/data/DataSource/BerryDataSource';

export class BerryRepositoryImpl implements BerryRepository {
  dataSource: BerryDataSource;

  constructor(_dataSource: BerryDataSource) {
    this.dataSource = _dataSource;
  }
  
  async getBerry() {
    return this.dataSource.getBerry();
  }
}
