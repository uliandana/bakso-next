import { Berry } from '../Model/Berry';

export interface BerryRepository {
  getBerry(): Promise<Berry[]>,
}
