import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import useInfiniteScroll from '@/app/_utils/useInfiniteScroll';
import { useAllStates, useAllEvents, useAllEffects, UseAllEffectsProps, Pokemon, useCases } from '../viewmodel';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const noop = () => {};
const asyncnoop = async () => {};

const dummyPokemon: Pokemon = {
  id: '100',
  name: 'Pikachu',
  nameSlug: 'pikachu',
  sprite: 'url',
  types: [],
  stats: [],
  evolvesTo: [],
  weight: 100,
  baseWeight: 100,
  bgColor: '#fff',
};
const allStates: ReturnType<typeof useAllStates> = {
  allPokemons: [dummyPokemon], setAllPokemons: noop,
  filteredPokemons: [], setFilteredPokemons: noop,
  pokemons: [], setPokemons: noop,
  selected: '', setSelected: noop,
  indexPage: 0, setIndexPage: noop,
  offset: 0, setOffset: noop,
  isFetching: false, setIsFetching: noop,
  search: '100', setSearch: noop,
  mainRef: {
    current: null
  },
};
const allUseCases: ReturnType<typeof useCases> = {
  getAllPokemonUseCase: { invoke: async () => [dummyPokemon] },
  getChosenPokemonUseCase: { invoke: async () => '' },
  setChosenPokemonUseCase: { invoke: asyncnoop },
};
const allEvents:  ReturnType<typeof useAllEvents> = {
  initialize: jest.fn(asyncnoop),
  fetchPokemon: asyncnoop,
  onSelectCard: noop,
  onScrollTop: noop,
  onChoosePokemon: asyncnoop,
};
const observer: ReturnType<typeof useInfiniteScroll> = {
  initialize: noop,
  disconnect: noop,
};
const router: AppRouterInstance = {
  back: noop,
  forward: noop,
  refresh: noop,
  push: jest.fn(),
  replace: noop,
  prefetch: noop,
};

describe('./app/viewmodel', () => {
  test('useAllStates', () => {
    jest.spyOn(React, 'useState');
    (React.useState as jest.Mock).mockImplementation(v => [v, jest.fn()]);
    jest.spyOn(React, 'useRef');
    (React.useRef as jest.Mock).mockImplementation(() => ({}));

    const states = useAllStates();
    expect(states).toHaveProperty('selected');
    expect(states).toHaveProperty('pokemons');
    expect(states).toHaveProperty('offset');
    expect(states).toHaveProperty('search');
  });

  test('useCases', () => {
    const newUseCases = useCases();
    expect(newUseCases).toHaveProperty('getAllPokemonUseCase');
    expect(newUseCases).toHaveProperty('getChosenPokemonUseCase');
    expect(newUseCases).toHaveProperty('setChosenPokemonUseCase');
  });

  test('useAllEvents', () => {
    const newAllStates: ReturnType<typeof useAllStates> = {
      ...allStates,
      selected: 'mew',
      setSelected: jest.fn(),
    };
    const newObserver: ReturnType<typeof useInfiniteScroll> = {
      ...observer,
      initialize: jest.fn(),
    };
    const events = useAllEvents({ allStates: newAllStates, allUseCases, router, observer: newObserver });

    events.onSelectCard('mew');
    expect(newAllStates.setSelected).lastCalledWith('mew');
  });

  test('useAllEffects', () => {
    jest.spyOn(React, 'useEffect');
    (React.useEffect as jest.Mock).mockImplementation((e) => (e as typeof noop)());
    const props: UseAllEffectsProps = {
      allStates,
      allEvents,
      observer,
    };
    useAllEffects(props);
    expect(allEvents.initialize).toBeCalled();
  });

  test('useAllEffects: set next index & concat pokemon list', () => {
    jest.spyOn(React, 'useEffect');
    (React.useEffect as jest.Mock).mockImplementation((e) => (e as typeof noop)());
    const props: UseAllEffectsProps = {
      allStates: {
        ...allStates,
        indexPage: 2,
        offset: 250,
        setIndexPage: jest.fn(),
        setPokemons: jest.fn(),
      },
      allEvents,
      observer,
    };
    useAllEffects(props);
    expect(props.allStates.setIndexPage).toBeCalledWith(3);
  });
});
