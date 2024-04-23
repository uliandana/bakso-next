import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { useAllStates, useAllEvents, useAllEffects, UseAllEffectsProps, Pokemon, useCases, Berry } from '../viewmodel';
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
const dummyBerry: Berry = {
  id: '1',
  name: 'banana',
  sprite: 'url',
  firmness: 'soft',
};
const allStates: ReturnType<typeof useAllStates> = {
  pokemon: dummyPokemon, setPokemon: noop,
  evolutions: [], setEvolutions: noop,
  target: dummyPokemon, setTarget: noop,
  berries: [], setBerries: noop,
  isFetchingPokemon: false, setIsFetchingPokemon: noop,
  isFetchingEvolution: false, setIsFetchingEvolution: noop,
  isFetchingBerry: false, setIsFetchingBerry: noop,
  cardSprite: 1, setCardSprite: noop,
  modal: '', setModal: noop,
  selectBerry: '1', setSelectBerry: noop,
  firmnessFed: 'soft', setFirmnessFed: noop,
  berryTaste: 'GOOD', setBerryTaste: noop,
};
const allUseCases: ReturnType<typeof useCases> = {
  getPokemonUseCase: { invoke: async () => dummyPokemon },
  getChosenPokemonUseCase: { invoke: async () => dummyPokemon.nameSlug },
  setChosenPokemonUseCase: { invoke: asyncnoop },
  getWeightProgressUseCase: { invoke: async () => 10 },
  setWeightProgressUseCase: { invoke: asyncnoop },
  getBerryUseCase: { invoke: async () => [] },
};
const allEvents:  ReturnType<typeof useAllEvents> = {
  initialize: jest.fn(asyncnoop),
  fetchPokemon: asyncnoop,
  fetchEvolutions: asyncnoop,
  fetchBerry: asyncnoop,
  onFlipSprite: noop,
  modalRechoose: {
    isOpen: false,
    isFading: false,
    open: noop,
    close: noop,
  },
  onSelectBerry: noop,
  onFeedBerry: noop,
  onRechoosePokemon: noop,
  onEvolvePokemon: noop,
};
const router: AppRouterInstance = {
  back: noop,
  forward: noop,
  refresh: noop,
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: noop,
};

describe('./app/[name]/viewmodel', () => {
  test('useAllStates', () => {
    jest.spyOn(React, 'useState');
    (React.useState as jest.Mock).mockImplementation(v => [v, jest.fn()]);
    jest.spyOn(React, 'useRef');
    (React.useRef as jest.Mock).mockImplementation(() => ({}));

    const states = useAllStates();
    expect(states).toHaveProperty('pokemon');
    expect(states).toHaveProperty('evolutions');
    expect(states).toHaveProperty('berries');
    expect(states).toHaveProperty('modal');
  });

  test('useAllStates', () => {
    const newUseCases = useCases();
    expect(newUseCases).toHaveProperty('getPokemonUseCase');
    expect(newUseCases).toHaveProperty('getChosenPokemonUseCase');
    expect(newUseCases).toHaveProperty('setChosenPokemonUseCase');
    expect(newUseCases).toHaveProperty('getBerryUseCase');
  });

  test('useAllEvents', () => {
    const newAllStates: ReturnType<typeof useAllStates> = {
      ...allStates,
      setCardSprite: jest.fn(),
      setModal: jest.fn(),
      setSelectBerry: jest.fn(),
      setFirmnessFed: jest.fn(),
    };
    const events = useAllEvents({ allStates: newAllStates, allUseCases, router, name: 'pikachu' });

    events.onFlipSprite();
    expect(newAllStates.setCardSprite).toBeCalledTimes(0);

    events.modalRechoose.open();
    expect(newAllStates.setModal).lastCalledWith('RECHOOSE');

    events.modalRechoose.close();
    expect(newAllStates.setModal).lastCalledWith('');

    events.onFeedBerry();
    expect(newAllStates.setFirmnessFed).toBeCalledTimes(0);

    jest.useFakeTimers();
    events.onRechoosePokemon();
    jest.runAllTimers();
    expect(router.push).lastCalledWith('/');

    events.onEvolvePokemon('raichu');
    expect(router.replace).lastCalledWith('/raichu');
  });

  test('useAllEvents: onFeedBerry ', () => {
    const newAllStates: ReturnType<typeof useAllStates> = {
      ...allStates,
      berries:[dummyBerry],
      selectBerry: dummyBerry.id,
      firmnessFed: 'hard',
      setPokemon: jest.fn(),
      setFirmnessFed: jest.fn(),
      setBerryTaste: jest.fn(),
    };
    const events = useAllEvents({ allStates: newAllStates, allUseCases, router, name: 'pikachu' });
    jest.useFakeTimers();
    events.onFeedBerry();
    expect(newAllStates.setFirmnessFed).toBeCalledWith(dummyBerry.firmness);
    expect(newAllStates.setBerryTaste).toBeCalledWith('GOOD');
    jest.runAllTimers();
    expect(newAllStates.setBerryTaste).toBeCalledWith('');
  });

  test('useAllEffects', () => {
    jest.spyOn(React, 'useEffect');
    (React.useEffect as jest.Mock).mockImplementation((e) => (e as typeof noop)());
    const props: UseAllEffectsProps = { allEvents };
    useAllEffects(props);
    expect(allEvents.initialize).toBeCalled();
  });
});
