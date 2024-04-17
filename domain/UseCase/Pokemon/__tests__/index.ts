import { describe, expect, jest, test } from '@jest/globals';
import { Pokemon } from '@/domain/Model/Pokemon';
import { PokemonRepository } from '@/domain/Repository/PokemonRepository';
import { ProgressRepository } from '@/domain/Repository/ProgressRepository';

import { GetAllPokemon } from '../GetAllPokemon';
import { GetChosenPokemon } from '../GetChosenPokemon';
import { GetPokemon } from '../GetPokemon';
import { GetPokemonByName } from '../GetPokemonByName';
import { GetWeightProgress } from '../GetWeightProgress';
import { SetChosenPokemon } from '../SetChosenPokemon';
import { SetWeightProgress } from '../SetWeightProgress';

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
  const getPokemon = jest.fn<() => Promise<Pokemon[]>>().mockResolvedValue([pokemon]);
  const getPokemonByName = jest.fn<() => Promise<Pokemon>>().mockResolvedValue(pokemon);
  const getAllPokemon = jest.fn<() => Promise<Pokemon[]>>().mockResolvedValue([pokemon]);
  const pokemonRepository: PokemonRepository = {
    getPokemon,
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
  test('GetAllPokemon', async () => {
    const pokemon = dummyPokemon;
    const pokemonRepository = mockPokemonRepository(pokemon);
    const getAllPokemonImplementation = new GetAllPokemon(pokemonRepository);
    const result = await getAllPokemonImplementation.invoke();
    expect(result[0]).toBe(pokemon);
  });

  test('GetChosenPokemon', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const getChosenPokemonImplementation = new GetChosenPokemon(progressRepository);
    const result = await getChosenPokemonImplementation.invoke();
    expect(result).toBe(pokemon.nameSlug);
  });

  test('GetPokemon', async () => {
    const pokemon = dummyPokemon;
    const pokemonRepository = mockPokemonRepository(pokemon);
    const getPokemonImplementation = new GetPokemon(pokemonRepository);
    const result = await getPokemonImplementation.invoke(1);
    expect(result[0]).toBe(pokemon);
  });

  test('GetPokemonByName', async () => {
    const pokemon = dummyPokemon;
    const pokemonRepository = mockPokemonRepository(pokemon);
    const getPokemonByNameImplementation = new GetPokemonByName(pokemonRepository);
    const result = await getPokemonByNameImplementation.invoke('pikachu');
    expect(result).toBe(pokemon);
  });

  test('GetWeightProgress', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const getWeightProgressImplementation = new GetWeightProgress(progressRepository);
    const result = await getWeightProgressImplementation.invoke();
    expect(result).toBe(pokemon.weight);
  });

  test('SetChosenPokemon', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const setChosenPokemonImplementation = new SetChosenPokemon(progressRepository);
    await setChosenPokemonImplementation.invoke('pikachu');
    expect(progressRepository.setChosenPokemon).toHaveBeenCalledWith('pikachu');
  });

  test('SetWeightProgress', async () => {
    const pokemon = dummyPokemon;
    const progressRepository = mockProgressRepository(pokemon);
    const setWeightProgressImplementation = new SetWeightProgress(progressRepository);
    await setWeightProgressImplementation.invoke(90);
    expect(progressRepository.setWeightProgress).toHaveBeenCalledWith(90);
  });
});
