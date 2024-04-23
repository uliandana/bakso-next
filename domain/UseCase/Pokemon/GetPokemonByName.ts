import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export function getPokemonByName(pokemonRepo: PokemonRepository) {
  return {
    invoke: (name: string, statOnly?: boolean) => pokemonRepo.getPokemonByName(name, statOnly),
  };
}
