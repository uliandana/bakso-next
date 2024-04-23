import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export function setWeightProgress(progressRepo: ProgressRepository) {
  return {
    invoke: (weight: number) => progressRepo.setWeightProgress(weight),
  };
}
