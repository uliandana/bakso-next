import { Berry } from '@/domain/Model/Berry';

export default interface BerryDataSource {
  getBerry(): Promise<Berry[]>,
}
