import { Pokemon } from '@/domain/Model/Pokemon';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export interface SetWeightProgressUseCase {
  invoke: (name: Pokemon['weight']) => Promise<void>,
}

export class SetWeightProgress implements SetWeightProgressUseCase {
  private pokemonRepo: ProgressRepository;
  
  constructor(_pokemonRepo: ProgressRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(weight: number) {
    return this.pokemonRepo.setWeightProgress(weight);
  }
}
