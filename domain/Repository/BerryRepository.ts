import { Berry } from '@/domain/Model/Berry';

export interface BerryRepository {
  getBerry(): Promise<Berry[]>,
}
