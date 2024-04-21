import { Pokemon } from '@/domain/Model/Pokemon';
import PokemonDataSource from '@/data/DataSource/PokemonDataSource';

export type PokemonApiListResult = {
  name: string,
  url: string,
};

export type PokemonApiDetailResult = {
  stats: {
    base_stat: number,
    stat: { name: string },
  }[],
  types: {
    type: { name: string },
  }[],
  weight: number,
};

export type PokemonApiSpeciesResult = {
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

export type PokemonApiEvolutionResult = {
  chain: {
    evolves_to: PokemonApiEvolutionResult['chain'][],
    species: {
      name: string,
      url: string,
    },
  },
};

export const urlSprite: (id: string) => string = (id) => `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
`

export default class PokemonAPIDataSourceImpl implements PokemonDataSource {
  async getAllPokemon() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=1500`);
    const resHandle: Promise<Pokemon[]> = (async () => {
      if (!res.ok) {
        return [];
      }
      const { results }: { results: PokemonApiListResult[]} = await res.json();
      return results.map(p => ({
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
        bgColor: `hsl(${Math.random() * 360}, ${(Math.random() * 70) + 5}%, ${(Math.random() * 10) + 25}%)`,
      }));
    })();
    return resHandle;
  }

  async getPokemonByName(name: string, statOnly: boolean = false) {
    const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const species: PokemonApiSpeciesResult = await resSpecies.json();

    const resDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${species?.id}`);
    const detail: PokemonApiDetailResult = await resDetail.json();

    let evolvesTo: Pokemon['name'][] = [];

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
      evolvesTo = rcvEvolution(evolution.chain);
    }

    const resHandle: Promise<Pokemon> = (async () => {
      if (!resDetail.ok || !resSpecies.ok) {
        return {
          id: '',
          name: '',
          nameSlug: '',
          sprite: '',
          stats: [],
          baseWeight: 0,
          types: [],
          weight: 0,
          evolvesTo: [],
          bgColor: '',
        };
      }
      return {
        id: species.id.toString(),
        name: species.names.filter(i => i.language.name === 'en')[0].name,
        nameSlug: species.name,
        get sprite() {
          return urlSprite(species.id.toString())
        },
        stats: detail.stats.map(i => ({ name: i.stat.name, value: i.base_stat })),
        types: detail.types.map(i => i.type.name),
        baseWeight: detail.weight / 10,
        weight: detail.weight / 10,
        evolvesTo,
        bgColor: `hsl(${Math.random() * 360}, ${(Math.random() * 70) + 5}%, ${(Math.random() * 10) + 25}%)`,
      };
    })();
    return resHandle;
  }
}