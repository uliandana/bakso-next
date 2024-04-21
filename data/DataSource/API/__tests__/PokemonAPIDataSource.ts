import { describe, expect, jest, test } from '@jest/globals';
import PokemonAPIDataSourceImpl, { PokemonApiDetailResult, PokemonApiEvolutionResult, PokemonApiListResult, PokemonApiSpeciesResult, urlSprite } from '../PokemonAPIDataSource';

describe('./data/DataSource/API/PokemonAPIDataSource', () => {
  test('getAllPokemon: success result', async () => {
    jest.spyOn(global, 'fetch');
    const dummyPokemon: PokemonApiListResult = {
      name: 'pikachu',
      url: 'url',
    };
    const responseAll = {
      ok: true,
      json: async () => ({
        results: [dummyPokemon],
      }),
    };
    (global.fetch as jest.Mock).mockImplementation(async () => responseAll);

    const Implementation = new PokemonAPIDataSourceImpl();

    const pokemon = await Implementation.getAllPokemon();
    expect(pokemon[0].name).toBe(dummyPokemon.name);
    expect(pokemon[0].sprite).toBe(urlSprite(pokemon[0].id));
  });

  test('getAllPokemon: failed result', async () => {
    jest.spyOn(global, 'fetch');
    const responseAll = {
      ok: false,
    };
    (global.fetch as jest.Mock).mockImplementation(async () => responseAll);

    const Implementation = new PokemonAPIDataSourceImpl();

    const pokemon = await Implementation.getAllPokemon();
    expect(pokemon.length).toBe(0);
  });

  test('getPokemonByName: success result', async () => {
    jest.spyOn(global, 'fetch');
    const dummySpecies: PokemonApiSpeciesResult = {
      id: 1,
      name: 'pikachu',
      evolution_chain: {
        url: 'url'
      },
      names: [{
        language: {
          name: 'en',
        },
        name: 'pikachu',
      }],
    };
    const responseSpecies = {
      ok: true,
      json: async () => dummySpecies,
    };

    const dummyDetail: PokemonApiDetailResult = {
      stats: [{
        base_stat: 100,
        stat: { name: 'speed' },
      }],
      types: [{
        type: { name: 'bug' },
      }],
      weight: 100,
    };
    const responseDetail = {
      ok: true,
      json: async () => dummyDetail,
    };

    const dummyEvolution: PokemonApiEvolutionResult = {
      chain: {
        evolves_to: [{
          evolves_to: [{
            evolves_to: [],
            species: {
              name: 'raichu',
              url: 'url',
            },
          }],
          species: {
            name: 'pikachu',
            url: 'url',
          },
        }],
        species: {
          name: 'pichu',
          url: 'url',
        },
      },
    };
    const responseEvolution = {
      ok: true,
      json: async () => dummyEvolution,
    };
    (global.fetch as jest.Mock)
      .mockImplementationOnce(async () => responseSpecies)
      .mockImplementationOnce(async () => responseDetail)
      .mockImplementation(async () => responseEvolution);

    const Implementation = new PokemonAPIDataSourceImpl();

    const pokemon = await Implementation.getPokemonByName('pikachu');
    expect(pokemon.name).toBe(dummySpecies.name);
    expect(pokemon.sprite).toBe(urlSprite(pokemon.id));
  });

  test('getPokemonByName: failed result', async () => {
    jest.spyOn(global, 'fetch');
    const response = {
      ok: false,
      json: async () => null,
    };
    (global.fetch as jest.Mock).mockImplementation(async () => response);

    const Implementation = new PokemonAPIDataSourceImpl();

    const pokemon = await Implementation.getPokemonByName('pikachu', true);
    expect(pokemon.name).toBe('');
  });
});
