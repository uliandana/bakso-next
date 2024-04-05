import { Pokemon } from '@/domain/Model/Pokemon';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

export interface SetChosenPokemonUseCase {
  invoke: (name: Pokemon['nameSlug']) => Promise<void>,
}

export class SetChosenPokemon implements SetChosenPokemonUseCase {
  private pokemonRepo: ProgressRepository;
  
  constructor(_pokemonRepo: ProgressRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(name: string) {
    return this.pokemonRepo.setChosenPokemon(name);
  }
}
