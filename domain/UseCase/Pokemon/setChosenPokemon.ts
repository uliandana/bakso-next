import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export function setChosenPokemon(progressRepo: ProgressRepository) {
  return {
    invoke: (name: string) => progressRepo.setChosenPokemon(name),
  };
}
