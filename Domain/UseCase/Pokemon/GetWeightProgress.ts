import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export interface GetWeightProgressUseCase {
  invoke: () => Promise<Pokemon['weight']>,
}

export class GetWeightProgress implements GetWeightProgressUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getWeightProgress();
  }
}
