import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export interface SetWeightProgressUseCase {
  invoke: (name: Pokemon['weight']) => Promise<void>,
}

export class SetWeightProgress implements SetWeightProgressUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(weight: number) {
    return this.pokemonRepo.setWeightProgress(weight);
  }
}
