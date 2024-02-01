import { Pokemon } from '@/Domain/Model/Pokemon';
import { PokemonRepository } from '@/Domain/Repository/PokemonRepository';

export interface GetPokemonByNameUseCase {
  invoke: (name: string, statOnly?: Boolean) => Promise<Pokemon>,
}

export class GetPokemonByName implements GetPokemonByNameUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(name: string, statOnly?: Boolean) {
    return this.pokemonRepo.getPokemonByName(name, statOnly);
  }
}
