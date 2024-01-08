import { Pokemon } from '@/Domain/Model/Pokemon';
import { PokemonRepository } from '@/Domain/Repository/PokemonRepository';

export interface GetPokemonUseCase {
  invoke: () => Promise<Pokemon[]>,
}

export class GetPokemon implements GetPokemonUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getPokemon();
  }
}
