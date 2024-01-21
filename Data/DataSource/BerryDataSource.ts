import { Berry } from '@/Domain/Model/Berry';

export default interface BerryDataSource {
  getBerry(): Promise<Berry[]>,
}
