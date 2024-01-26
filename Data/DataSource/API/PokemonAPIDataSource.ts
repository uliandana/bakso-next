import { Pokemon } from '@/Domain/Model/Pokemon';
import PokemonDataSource from '../PokemonDataSource';

type PokemonApiListResult = {
  name: string,
  url: string,
};

type PokemonApiDetailResult = {
  stats: {
    base_stat: number,
    stat: { name: string },
  }[],
  types: {
    type: { name: string },
  }[],
  weight: number,
};

type PokemonApiSpeciesResult = {
  id: number,
  name: string,
  evolution_chain: { url: string },
  names: {
    language: {
      name: string,
    },
    name: string,
  }[],
};

type PokemonApiEvolutionResult = {
  chain: {
    evolves_to: PokemonApiEvolutionResult['chain'][],
    species: {
      name: string,
      url: string,
    },
  },
};

const urlSprite: (id: string) => string = (id) => `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
`

export default class PokemonAPIDataSourceImpl implements PokemonDataSource {
  async getPokemon(offset: number) {
    const query = offset >= 1000 ? `limit=10&offset=${offset}` : `limit=100&offset=${offset}`
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species?${query}`);
    const resHandle: Promise<Pokemon[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const { results }: { results: PokemonApiListResult[]} = await res.json();
      resolve(results.map(p => ({
        id: p.url.split('/')[6],
        name: p.name,
        nameSlug: p.name,
        get sprite() {
          return urlSprite(this.id)
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

  async getAllPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=1500`);
    const resHandle: Promise<Pokemon[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const { results }: { results: PokemonApiListResult[]} = await res.json();
      resolve(results.map(p => ({
        id: p.url.split('/')[6],
        name: p.name,
        nameSlug: p.name,
        get sprite() {
          return urlSprite(this.id)
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

  async getPokemonByName(name: string, statOnly: boolean = false) {
    const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const species: PokemonApiSpeciesResult = await resSpecies.json();

    const resDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`);
    const detail: PokemonApiDetailResult = await resDetail.json();

    let evolvesTo: (Pokemon | null)[] = [];

    if (!statOnly) {
      const resEvolution = await fetch(species.evolution_chain.url);
      const evolution: PokemonApiEvolutionResult = await resEvolution.json();
      
      const rcvEvolution: (chain: PokemonApiEvolutionResult['chain']) => string[] = (chain) => {
        if (chain.species.name === species.name) {
          return chain.evolves_to.map(i => i.species.name);
        } else {
          return chain.evolves_to.map(i => rcvEvolution(i)).flat();
        }
      };
      const strEvolvesTo = rcvEvolution(evolution.chain);
      evolvesTo = await Promise.all(strEvolvesTo.map(async i => await this.getPokemonByName(i, true)));
    }

    const resHandle: Promise<Pokemon | null> = new Promise(async resolve => {
      if (!resDetail.ok || !resSpecies.ok) {
        resolve(null);
      }
      resolve({
        id: species.id.toString(),
        name: species.names.filter(i => i.language.name === 'en')[0].name,
        nameSlug: species.name,
        get sprite() {
          return urlSprite(this.id)
        },
        stats: detail.stats.map(i => ({ name: i.stat.name, value: i.base_stat })),
        types: detail.types.map(i => i.type.name),
        baseWeight: detail.weight,
        weight: detail.weight,
        evolvesTo,
      });
    });
    return resHandle;
  }
}