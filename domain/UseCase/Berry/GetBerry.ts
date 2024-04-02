import { Berry } from '@/domain/Model/Berry';
import { BerryRepository } from '@/domain/Repository/BerryRepository';

export interface GetBerryUseCase {
  invoke: () => Promise<Berry[]>,
}

export class GetBerry implements GetBerryUseCase {
  private berryRepo: BerryRepository;
  
  constructor(_berryRepo: BerryRepository) {
    this.berryRepo = _berryRepo;
  }

  async invoke() {
    return this.berryRepo.getBerry();
  }
}
