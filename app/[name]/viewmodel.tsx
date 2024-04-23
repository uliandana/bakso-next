import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useModal from '@/app/_utils/useModal';
import BerryAPIDataSourceImpl from '@/data/DataSource/API/BerryAPIDataSource';
import PokemonAPIDataSourceImpl from '@/data/DataSource/API/PokemonAPIDataSource';
import ProgressLocalStorageDataSourceImpl from '@/data/DataSource/LocalStorage/ProgressLocalStorageDataSource';
import { BerryRepositoryImpl } from '@/data/Repository/BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '@/data/Repository/PokemonRepositoryImpl';
import { Berry } from '@/domain/Model/Berry';
import { Pokemon } from '@/domain/Model/Pokemon';
import { getBerry } from '@/domain/UseCase/Berry/getBerry';
import { getPokemonByName } from '@/domain/UseCase/Pokemon/getPokemonByName';
import { getChosenPokemon } from '@/domain/UseCase/Pokemon/getChosenPokemon';
import { setChosenPokemon } from '@/domain/UseCase/Pokemon/setChosenPokemon';
import { getWeightProgress } from '@/domain/UseCase/Pokemon/getWeightProgress';
import { setWeightProgress } from '@/domain/UseCase/Pokemon/setWeightProgress';
import { ProgressRepositoryImpl } from '@/data/Repository/ProgressRepositoryImpl';

type ModalMode = '' | 'RECHOOSE';
export type {Berry, Pokemon};
export const STATS: { [key: string]: string; } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'speed': 'Speed',
};

export const BERRY_BG: Record<Berry['firmness'], string> = {
  'very-soft': '#AABB22',
  'soft': '#775544',
  'hard': '#7766EE',
  'very-hard': '#FFCC33',
  'super-hard': '#FFAAFF',
  '': '',
};

export const dummyPokemon: Pokemon = {
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

export default function NameViewModel(name: string) {
  const router = useRouter();
  const allStates = useAllStates();
  const allUseCases = useCases();
  const allEvents = useAllEvents({ allStates, allUseCases, router, name });
  useAllEffects({ allEvents });

  return {
    pokemon: allStates.pokemon,
    evolutions: allStates.evolutions,
    target: {
      pokemon: allStates.target,
      setTarget: allStates.setTarget,
    },
    berries: allStates.berries,
    modalRechoose: allEvents.modalRechoose,
    sprite: {
      cardSprite: allStates.cardSprite,
      onFlipSprite: allEvents.onFlipSprite,
    },
    feed: {
      selected: allStates.selectBerry,
      select: allEvents.onSelectBerry,
      berryTaste: allStates.berryTaste,
    },
    onRechoosePokemon: allEvents.onRechoosePokemon,
    onEvolvePokemon: allEvents.onEvolvePokemon,
    onFeedBerry: allEvents.onFeedBerry,
    isFetchingPokemon: allStates.isFetchingPokemon,
    isFetchingEvolution: allStates.isFetchingEvolution,
    isFetchingBerry: allStates.isFetchingBerry,
  };
}

export function useAllStates() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [target, setTarget] = useState<Pokemon>();

  const [berries, setBerries] = useState<Berry[]>([]);
  const [isFetchingPokemon, setIsFetchingPokemon] = useState<boolean>(true);
  const [isFetchingEvolution, setIsFetchingEvolution] = useState<boolean>(true);
  const [isFetchingBerry, setIsFetchingBerry] = useState<boolean>(true);

  const [cardSprite, setCardSprite] = useState(-1);
  const [modal, setModal] = useModal<ModalMode>('');

  const [selectBerry, setSelectBerry] = useState<Berry['id']>('');
  const [firmnessFed, setFirmnessFed] = useState<Berry['firmness']>('soft');
  const [berryTaste, setBerryTaste] = useState<'GOOD'|'BAD'|''>('');

  return {
    pokemon, setPokemon,
    evolutions, setEvolutions,
    target, setTarget,
    berries, setBerries,
    isFetchingPokemon, setIsFetchingPokemon,
    isFetchingEvolution, setIsFetchingEvolution,
    isFetchingBerry, setIsFetchingBerry,
    cardSprite, setCardSprite,
    modal, setModal,
    selectBerry, setSelectBerry,
    firmnessFed, setFirmnessFed,
    berryTaste, setBerryTaste,
  };
}

export function useCases() {
  const dataSourceImplAPI = new PokemonAPIDataSourceImpl();
  const dataSourceImplLocalStorage = new ProgressLocalStorageDataSourceImpl();

  const pokemonRepositoryImpl = new PokemonRepositoryImpl(dataSourceImplAPI);
  const progressRepositoryImpl = new ProgressRepositoryImpl(dataSourceImplLocalStorage);

  const getPokemonUseCase = getPokemonByName(pokemonRepositoryImpl);
  const getChosenPokemonUseCase = getChosenPokemon(progressRepositoryImpl);
  const setChosenPokemonUseCase = setChosenPokemon(progressRepositoryImpl);
  const getWeightProgressUseCase = getWeightProgress(progressRepositoryImpl);
  const setWeightProgressUseCase = setWeightProgress(progressRepositoryImpl);

  const berryDataSourceImpl = new BerryAPIDataSourceImpl();
  const berryRepositoryImpl = new BerryRepositoryImpl(berryDataSourceImpl);

  const getBerryUseCase = getBerry(berryRepositoryImpl);

  return {
    getPokemonUseCase,
    getChosenPokemonUseCase,
    setChosenPokemonUseCase,
    getWeightProgressUseCase,
    setWeightProgressUseCase,
    getBerryUseCase,
  };
}

export type UseAllEventsProps = {
  allStates: ReturnType<typeof useAllStates>,
  allUseCases: ReturnType<typeof useCases>,
  router: ReturnType<typeof useRouter>,
  name: string,
};

export function useAllEvents({ allStates, allUseCases, router, name }: UseAllEventsProps) {
  const initialize = async () => {
    const chosen = await allUseCases.getChosenPokemonUseCase.invoke();
    if (chosen !== name) {
      router.replace(`/${chosen}`);
    } else {
      fetchPokemon();
      fetchBerry();
    }
  };

  const fetchPokemon = async () => {
    try {
      allStates.setIsFetchingPokemon(true);
      const data = await allUseCases.getPokemonUseCase.invoke(name);
      allStates.setIsFetchingPokemon(false);
      if (data) {
        data.weight = await allUseCases.getWeightProgressUseCase.invoke() || data.weight;
        allStates.setPokemon(data);
        fetchEvolutions(data.evolvesTo);
      }
    } catch(e) {
      allStates.setIsFetchingPokemon(false);
    }
  };

  const fetchEvolutions = async (evolvesTo:Pokemon['name'][]) => {
    try {
      allStates.setIsFetchingEvolution(true);
      const data = await Promise.all(evolvesTo.map(i => allUseCases.getPokemonUseCase.invoke(i, true)));
      allStates.setIsFetchingEvolution(false);
      if (data) {
        allStates.setEvolutions(data);
        allStates.setTarget(data[0]);
      }
    } catch(e) {
      allStates.setIsFetchingEvolution(false);
    }
  };

  const fetchBerry = async () => {
    try {
      allStates.setIsFetchingBerry(true);
      const data = await allUseCases.getBerryUseCase.invoke();
      allStates.setIsFetchingBerry(false);
      if (data) {
        allStates.setBerries(data);
      }
    } catch(e) {
      allStates.setIsFetchingBerry(false);
    }
  };

  const onFlipSprite = () => {
    if (!allStates.evolutions.length) {
      return;
    }
    allStates.setCardSprite(allStates.cardSprite < 0 ? 0 : -1);
  };

  const modalRechoose = {
    isOpen: allStates.modal === 'RECHOOSE' || allStates.modal === '_FADING_',
    isFading: allStates.modal === '_FADING_',
    open: () => allStates.setModal('RECHOOSE'),
    close: () => allStates.setModal(''),
  };

  const onSelectBerry:ChangeEventHandler<HTMLInputElement> = e => {
    allStates.setSelectBerry(e.target.value);
  };

  const onFeedBerry = () => {
    const WEIGHT: Record<Berry['firmness'], number[]> = {
      'very-soft': [2, -4],
      'soft': [3, -6],
      'hard': [5, -10],
      'very-hard': [8, -16],
      'super-hard': [10, -20],
      '': [0, 0],
    };
    const { firmness } = allStates.berries.filter(i => i.id === allStates.selectBerry)[0] || {};
    if (allStates.pokemon && firmness) {
      const [plus, min] = WEIGHT[firmness] || [0, 0];
      const newWeight = (firmness === allStates.firmnessFed) ? (allStates.pokemon.weight + min) : (allStates.pokemon.weight + plus);
      allStates.setPokemon({
        ...allStates.pokemon,
        weight: newWeight < 0 ? 0 : newWeight,
      });
      allUseCases.setWeightProgressUseCase.invoke(newWeight < 0 ? 0 : newWeight)
      allStates.setFirmnessFed(firmness);
      allStates.setBerryTaste(firmness === allStates.firmnessFed ? 'BAD' : 'GOOD');
      setTimeout(() => {
        allStates.setBerryTaste('');
      }, 1100);
    }
  };

  const onRechoosePokemon = () => {
    allUseCases.setChosenPokemonUseCase.invoke('');
    allUseCases.setWeightProgressUseCase.invoke(0);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const onEvolvePokemon = (name: Pokemon['nameSlug'] | undefined) => {
    if (name) {
      allUseCases.setChosenPokemonUseCase.invoke(name);
      router.replace(`/${name}`);
    }
  };
  return {
    initialize,
    fetchPokemon,
    fetchEvolutions,
    fetchBerry,
    onFlipSprite,
    modalRechoose,
    onSelectBerry,
    onFeedBerry,
    onRechoosePokemon,
    onEvolvePokemon,
  };
}

export type UseAllEffectsProps = {
  allEvents:  ReturnType<typeof useAllEvents>,
};

export function useAllEffects({ allEvents }: UseAllEffectsProps) {
  useEffect(() => {
    allEvents.initialize();
  }, []);
}
