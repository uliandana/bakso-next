import { Pokemon } from '@/Domain/Model/Pokemon';
import PokemonDataSource from '../PokemonDataSource';

type PokemonApiResponse = {
  results: Pokemon[],
};

export default class PokemonAPIDataSourceImpl implements PokemonDataSource {
  async getPokemon() {
    const offset = Math.floor(Math.random() * 1000);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
    const resHandle: Promise<Pokemon[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const data: PokemonApiResponse = await res.json();
      resolve(data.results);
    });
    return resHandle;
  }
}