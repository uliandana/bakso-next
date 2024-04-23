import { PokemonRepository } from '@/domain/Repository/PokemonRepository';

export function getAllPokemon(pokemonRepo: PokemonRepository) {
  return {
    invoke: () => pokemonRepo.getAllPokemon(),
  };
}
