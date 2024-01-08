import { Pokemon } from '@/Domain/Model/Pokemon';

export default interface PokemonDataSource {
  getPokemon(): Promise<Pokemon[]>,
}
