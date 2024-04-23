import { describe, expect, jest, test } from '@jest/globals';
import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

import { getAllPokemon } from '../getAllPokemon';
import { getChosenPokemon } from '../getChosenPokemon';
import { getPokemonByName } from '../getPokemonByName';
import { getWeightProgress } from '../getWeightProgress';
import { setChosenPokemon } from '../setChosenPokemon';
import { setWeightProgress } from '../setWeightProgress';

export const dummyPokemon: Pokemon = {
  id: '1',
  name: 'pikachu',
  nameSlug: 'pikachu',
  sprite: 'url',
  stats: [],
  types: ['electric'],
  baseWeight: 10,
  weight: 10,
  evolvesTo: [],
  bgColor: '#fff',
};

export const mockPokemonRepository = (pokemon: Pokemon) => {
  const getPokemonByName = jest.fn<() => Promise<Pokemon>>().mockResolvedValue(pokemon);
  const getAllPokemon = jest.fn<() => Promise<Pokemon[]>>().mockResolvedValue([pokemon]);
  const pokemonRepository: PokemonRepository = {
    getPokemonByName,
    getAllPokemon,
  };
  return pokemonRepository;
};

export const mockProgressRepository = (pokemon: Pokemon) => {
  const getChosenPokemon = jest.fn<() => Promise<Pokemon['nameSlug']>>().mockResolvedValue(pokemon.nameSlug);
  const setChosenPokemon = jest.fn<(name: Pokemon['nameSlug']) => Promise<void>>();
  const getWeightProgress = jest.fn<() => Promise<Pokemon['weight']>>().mockResolvedValue(pokemon.weight);
  const setWeightProgress = jest.fn<(name: Pokemon['weight']) => Promise<void>>();
  const progressRepository: ProgressRepository = {
    getChosenPokemon,
    setChosenPokemon,
    getWeightProgress,
    setWeightProgress,
  };
  return progressRepository;
};

describe('./domain/UseCase/Pokemon', () => {
  test('getAllPokemon', async () => {
    const pokemon = dummyPokemon;
    const pokemonRepository = mockPokemonRepository(pokemon);
    const getAllPokemonImplementation = getAllPokemon(pokemonRepository);
    const result = await getAllPokemonImplementation.invoke();
    expect(result[0]).toBe(pokemon);
  });

  test('getChosenPokemon', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const getChosenPokemonImplementation = getChosenPokemon(progressRepository);
    const result = await getChosenPokemonImplementation.invoke();
    expect(result).toBe(pokemon.nameSlug);
  });

  test('getPokemonByName', async () => {
    const pokemon = dummyPokemon;
    const pokemonRepository = mockPokemonRepository(pokemon);
    const getPokemonByNameImplementation = getPokemonByName(pokemonRepository);
    const result = await getPokemonByNameImplementation.invoke('pikachu');
    expect(result).toBe(pokemon);
  });

  test('getWeightProgress', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const getWeightProgressImplementation = getWeightProgress(progressRepository);
    const result = await getWeightProgressImplementation.invoke();
    expect(result).toBe(pokemon.weight);
  });

  test('setChosenPokemon', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const setChosenPokemonImplementation = setChosenPokemon(progressRepository);
    await setChosenPokemonImplementation.invoke('pikachu');
    expect(progressRepository.setChosenPokemon).toHaveBeenCalledWith('pikachu');
  });

  test('setWeightProgress', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const setWeightProgressImplementation = setWeightProgress(progressRepository);
    await setWeightProgressImplementation.invoke(90);
    expect(progressRepository.setWeightProgress).toHaveBeenCalledWith(90);
  });
});
