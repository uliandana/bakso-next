import { BerryRepository } from '@/domain/Repository/BerryRepository';

export function getBerry(berryRepo: BerryRepository) {
  return {
    invoke: () => berryRepo.getBerry(),
  };
}
