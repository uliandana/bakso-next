import { Pokemon } from '@/Domain/Model/Pokemon';
import PokemonDataSource from '../PokemonDataSource';

type PokemonApiResult = {
  name: string,
  url: string,
};

export default class PokemonAPIDataSourceImpl implements PokemonDataSource {
  async getPokemon() {
    const offset = Math.floor(Math.random() * 1000);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
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
      })));
    });
    return resHandle;
  }
}