import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export function getChosenPokemon(progressRepo: ProgressRepository) {
  return {
    invoke: () => progressRepo.getChosenPokemon(),
  };
}
