import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useModal from '@/app/.utils/useModal';
import BerryAPIDataSourceImpl from '@/data/DataSource/API/BerryAPIDataSource';
import PokemonAPIDataSourceImpl from '@/data/DataSource/API/PokemonAPIDataSource';
import PokemonLocalStorageDataSourceImpl from '@/data/DataSource/LocalStorage/PokemonLocalStorageDataSource';
import { BerryRepositoryImpl } from '@/data/Repository/BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '@/data/Repository/PokemonRepositoryImpl';
import { Berry } from '@/domain/Model/Berry';
import { Pokemon } from '@/domain/Model/Pokemon';
import { GetBerry } from '@/domain/UseCase/Berry/GetBerry';
import { GetPokemonByName } from '@/domain/UseCase/Pokemon/GetPokemonByName';
import { GetChosenPokemon } from '@/domain/UseCase/Pokemon/GetChosenPokemon';
import { SetChosenPokemon } from '@/domain/UseCase/Pokemon/SetChosenPokemon';
import { GetWeightProgress } from '@/domain/UseCase/Pokemon/GetWeightProgress';
import { SetWeightProgress } from '@/domain/UseCase/Pokemon/SetWeightProgress';

type ModalMode = '' | 'RECHOOSE';

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
};

export default function NameViewModel(name: string) {
  const router = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [target, setTarget] = useState<Pokemon>();

  const [berries, setBerries] = useState<Berry[]>([]);
  const [isFetchingPokemon, setIsFetchingPokemon] = useState<Boolean>(true);
  const [isFetchingEvolution, setIsFetchingEvolution] = useState<Boolean>(true);
  const [isFetchingBerry, setIsFetchingBerry] = useState<Boolean>(true);

  const [cardSprite, setCardSprite] = useState(-1);
  const [modal, setModal] = useModal<ModalMode>('');

  const [selectBerry, setSelectBerry] = useState<Berry['id']>('');
  const [firmnessFed, setFirmnessFed] = useState<Berry['firmness']>('');
  const [berryTaste, setBerryTaste] = useState<'GOOD'|'BAD'|''>('');

  const dataSourceImplAPI = new PokemonAPIDataSourceImpl();
  const dataSourceImplLocalStorage = new PokemonLocalStorageDataSourceImpl();

  const pokemonRepositoryImpl = new PokemonRepositoryImpl(dataSourceImplAPI);
  pokemonRepositoryImpl.getChosenPokemon = dataSourceImplLocalStorage.getChosenPokemon;
  pokemonRepositoryImpl.setChosenPokemon = dataSourceImplLocalStorage.setChosenPokemon;
  pokemonRepositoryImpl.getWeightProgress = dataSourceImplLocalStorage.getWeightProgress;
  pokemonRepositoryImpl.setWeightProgress = dataSourceImplLocalStorage.setWeightProgress;

  const getPokemonUseCase = new GetPokemonByName(pokemonRepositoryImpl);
  const getChosenPokemonUseCase = new GetChosenPokemon(pokemonRepositoryImpl);
  const setChosenPokemonUseCase = new SetChosenPokemon(pokemonRepositoryImpl);
  const getWeightProgressUseCase = new GetWeightProgress(pokemonRepositoryImpl);
  const setWeightProgressUseCase = new SetWeightProgress(pokemonRepositoryImpl);

  const berryDataSourceImpl = new BerryAPIDataSourceImpl();
  const berryRepositoryImpl = new BerryRepositoryImpl(berryDataSourceImpl);

  const getBerryUseCase = new GetBerry(berryRepositoryImpl);

  const initialize = async () => {
    const chosen = await getChosenPokemonUseCase.invoke();
    if (chosen !== name) {
      router.replace(`/${chosen}`);
    } else {
      fetchPokemon();
      fetchBerry();
    }
  };

  const fetchPokemon = async () => {
    try {
      setIsFetchingPokemon(true);
      const data = await getPokemonUseCase.invoke(name);
      setIsFetchingPokemon(false);
      if (data) {
        data.weight = await getWeightProgressUseCase.invoke() || data.weight;
        setPokemon(data);
        fetchEvolutions(data.evolvesTo);
      }
    } catch(e) {
      setIsFetchingPokemon(false);
    }
  };

  const fetchEvolutions = async (evolvesTo:Pokemon['name'][]) => {
    try {
      setIsFetchingEvolution(true);
      const data = await Promise.all(evolvesTo.map(i => getPokemonUseCase.invoke(i, true)));
      setIsFetchingEvolution(false);
      if (data) {
        setEvolutions(data);
        setTarget(data[0]);
      }
    } catch(e) {
      setIsFetchingEvolution(false);
    }
  };

  const fetchBerry = async () => {
    try {
      setIsFetchingBerry(true);
      const data = await getBerryUseCase.invoke();
      setIsFetchingBerry(false);
      if (data) {
        setBerries(data);
      }
    } catch(e) {
      setIsFetchingBerry(false);
    }
  };

  const onFlipSprite = () => {
    if (!evolutions.length) {
      return;
    }
    setCardSprite(cardSprite < 0 ? 0 : -1);
  };

  const modalRechoose = {
    isOpen: modal === 'RECHOOSE' || modal === '_FADING_',
    isFading: modal === '_FADING_',
    open: () => setModal('RECHOOSE'),
    close: () => setModal(''),
  };

  const onSelectBerry:ChangeEventHandler<HTMLInputElement> = e => {
    setSelectBerry(e.target.value);
  };

  const onFeedBerry = () => {
    const WEIGHT: Record<Berry['firmness'], number[]> = {
      'very-soft': [2, -4],
      'soft': [3, -6],
      'hard': [5, -10],
      'very-hard': [8, -16],
      'super-hard': [10, -20],
    };
    const { firmness } = berries.filter(i => i.id === selectBerry)[0];
    if (pokemon && firmness) {
      const [plus, min] = WEIGHT[firmness] || [1, 1];
      const newWeight = (firmness === firmnessFed) ? (pokemon.weight + min) : (pokemon.weight + plus);
      setPokemon({
        ...pokemon,
        weight: newWeight < 0 ? 0 : newWeight,
      });
      setWeightProgressUseCase.invoke(newWeight < 0 ? 0 : newWeight)
      setFirmnessFed(firmness);
      setBerryTaste(firmness === firmnessFed ? 'BAD' : 'GOOD');
      setTimeout(() => {
        setBerryTaste('');
      }, 1100);
    }
  };

  const onRechoosePokemon = () => {
    setChosenPokemonUseCase.invoke('');
    setWeightProgressUseCase.invoke(0);
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const onEvolvePokemon = (name: Pokemon['nameSlug']) => {
    setChosenPokemonUseCase.invoke(name);
    router.replace(`/${name}`);
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    pokemon,
    evolutions,
    target: {
      pokemon: target,
      setTarget,
    },
    berries,
    modalRechoose,
    sprite: {
      cardSprite,
      onFlipSprite,
    },
    feed: {
      selected: selectBerry,
      select: onSelectBerry,
      berryTaste,
    },
    onRechoosePokemon,
    onEvolvePokemon,
    onFeedBerry,
    isFetchingPokemon,
    isFetchingEvolution,
    isFetchingBerry,
  };
}
