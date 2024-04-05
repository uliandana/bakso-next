import { Pokemon } from '@/domain/Model/Pokemon';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export interface GetChosenPokemonUseCase {
  invoke: () => Promise<Pokemon['nameSlug']>,
}

export class GetChosenPokemon implements GetChosenPokemonUseCase {
  private pokemonRepo: ProgressRepository;
  
  constructor(_pokemonRepo: ProgressRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getChosenPokemon();
  }
}
