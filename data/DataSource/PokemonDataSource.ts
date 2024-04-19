import { Pokemon } from '@/domain/Model/Pokemon';

export default interface PokemonDataSource {
  getPokemon(offset: number): Promise<Pokemon[]>,
  getPokemonByName(name: string, statOnly?: boolean): Promise<Pokemon>,
  getAllPokemon(): Promise<Pokemon[]>,
}
