import { Pokemon } from '@/Domain/Model/Pokemon';
import PokemonDataSource from '../PokemonDataSource';

type PokemonApiResult = {
  name: string,
  url: string,
};

export default class PokemonAPIDataSourceImpl implements PokemonDataSource {
  async getPokemon(offset: number) {
    const query = offset >= 1000 ? `limit=10&offset=${offset}` : `limit=100&offset=${offset}`
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?${query}`);
    const resHandle: Promise<Pokemon[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const { results }: { results: PokemonApiResult[]} = await res.json();
      resolve(results.map(p => ({
        id: p.url.split('/')[6],
        name: p.name,
        nameSlug: p.name,
        get sprite() {
          return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
        },
        stats: [],
        types: [],
        baseWeight: 10,
        weight: 10,
        evolvesTo: [],
      })));
    });
    return resHandle;
  }
}