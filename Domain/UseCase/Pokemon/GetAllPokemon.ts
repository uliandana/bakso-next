import { Pokemon } from '@/Domain/Model/Pokemon';
import { PokemonRepository } from '@/Domain/Repository/PokemonRepository';

export interface GetAllPokemonUseCase {
  invoke: (offset: number) => Promise<Pokemon[]>,
}

export class GetAllPokemon implements GetAllPokemonUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke() {
    return this.pokemonRepo.getAllPokemon();
  }
}
