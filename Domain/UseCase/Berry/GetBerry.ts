import { Berry } from '@/Domain/Model/Berry';
import { BerryRepository } from '@/Domain/Repository/BerryRepository';

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
