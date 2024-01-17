import { Pokemon } from '@/Domain/Model/Pokemon';

export default interface PokemonDataSource {
  getPokemon(offset: number): Promise<Pokemon[]>,
}
