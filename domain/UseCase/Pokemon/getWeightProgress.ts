import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export function getWeightProgress(progressRepo: ProgressRepository) {
  return {
    invoke: () => progressRepo.getWeightProgress(),
  };
}
