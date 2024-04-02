import { Pokemon } from '@/Domain/Model/Pokemon';
import { PokemonRepository } from '@/Domain/Repository/PokemonRepository';

export interface GetChosenPokemonUseCase {
  invoke: () => Promise<Pokemon['nameSlug']>,
}

export class GetChosenPokemon implements GetChosenPokemonUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getChosenPokemon();
  }
}
