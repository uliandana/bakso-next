import { Pokemon } from '@/domain/Model/Pokemon';

export default interface PokemonDataSource {
  getPokemonByName(name: string, statOnly?: boolean): Promise<Pokemon>,
  getAllPokemon(): Promise<Pokemon[]>,
}
