import { Pokemon } from '@/domain/Model/Pokemon';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export interface GetWeightProgressUseCase {
  invoke: () => Promise<Pokemon['weight']>,
}

export class GetWeightProgress implements GetWeightProgressUseCase {
  private pokemonRepo: ProgressRepository;
  
  constructor(_pokemonRepo: ProgressRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getWeightProgress();
  }
}
