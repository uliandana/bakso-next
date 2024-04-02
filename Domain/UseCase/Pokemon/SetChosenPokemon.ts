import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export interface SetChosenPokemonUseCase {
  invoke: (name: Pokemon['nameSlug']) => Promise<void>,
}

export class SetChosenPokemon implements SetChosenPokemonUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(name: string) {
    return this.pokemonRepo.setChosenPokemon(name);
  }
}
