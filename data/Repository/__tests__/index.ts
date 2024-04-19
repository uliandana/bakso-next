import { describe, expect, jest, test } from '@jest/globals';
import { Berry } from '@/domain/Model/Berry';
import { Pokemon } from '@/domain/Model/Pokemon';
import BerryDataSource from '@/data/DataSource/BerryDataSource';
import PokemonDataSource from '@/data/DataSource/PokemonDataSource';
import ProgressDataSource from '@/data/DataSource/ProgressDataSource';

import { BerryRepositoryImpl } from '../BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '../PokemonRepositoryImpl';
import { ProgressRepositoryImpl } from '../ProgressRepositoryImpl';

describe('./data/Repository', () => {
  test('BerryRepositoryImpl', async () => {
    const dataSource: BerryDataSource = {
      getBerry: jest.fn<() => Promise<Berry[]>>(),
    };
    const Implementation = new BerryRepositoryImpl(dataSource);

    await Implementation.getBerry();
    expect(dataSource.getBerry).toHaveBeenCalled();
  });

  test('PokemonRepositoryImpl', async () => {
    const dataSource: PokemonDataSource = {
      getAllPokemon: jest.fn<() => Promise<Pokemon[]>>(),
      getPokemonByName: jest.fn<(name: string, statOnly?: boolean) => Promise<Pokemon>>(),
    };
    const Implementation = new PokemonRepositoryImpl(dataSource);

    await Implementation.getAllPokemon();
    expect(dataSource.getAllPokemon).toHaveBeenCalled();
    await Implementation.getPokemonByName('pikachu', true);
    expect(dataSource.getPokemonByName).lastCalledWith('pikachu', true);
  });

  test('ProgressRepositoryImpl', async () => {
    const dataSource: ProgressDataSource = {
      getChosenPokemon: jest.fn<() => Promise<Pokemon['nameSlug']>>(),
      setChosenPokemon: jest.fn<(name: Pokemon['nameSlug']) => Promise<void>>(),
      getWeightProgress: jest.fn<() => Promise<Pokemon['weight']>>(),
      setWeightProgress: jest.fn<(weight: Pokemon['weight']) => Promise<void>>(),
    };
    const Implementation = new ProgressRepositoryImpl(dataSource);

    await Implementation.getChosenPokemon();
    expect(dataSource.getChosenPokemon).toHaveBeenCalled();
    await Implementation.setChosenPokemon('pikachu');
    expect(dataSource.setChosenPokemon).lastCalledWith('pikachu');
    await Implementation.getWeightProgress();
    expect(dataSource.getWeightProgress).toHaveBeenCalled();
    await Implementation.setWeightProgress(100);
    expect(dataSource.setWeightProgress).lastCalledWith(100);
  });
});
