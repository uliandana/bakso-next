import { PokemonStats } from './PokemonStats';

export interface Pokemon {
  id: string,
  name: string,
  nameSlug: string,
  sprite: string,
  stats: PokemonStats[],
  types: string[],
  baseWeight: number,
  weight: number,
  evolvesTo: Pokemon['name'][],
  bgColor: string,
}
