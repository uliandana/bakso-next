import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export interface GetPokemonByNameUseCase {
  invoke: (name: string, statOnly?: boolean) => Promise<Pokemon>,
}

export class GetPokemonByName implements GetPokemonByNameUseCase {
  private pokemonRepo: PokemonRepository;
  
  constructor(_pokemonRepo: PokemonRepository) {
    this.pokemonRepo = _pokemonRepo;
  }

  async invoke(name: string, statOnly?: boolean) {
    return this.pokemonRepo.getPokemonByName(name, statOnly);
  }
}
