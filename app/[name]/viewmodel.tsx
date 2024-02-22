import BerryAPIDataSourceImpl from '@/Data/DataSource/API/BerryAPIDataSource';
import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { BerryRepositoryImpl } from '@/Data/Repository/BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { Berry } from '@/Domain/Model/Berry';
import { Pokemon } from '@/Domain/Model/Pokemon';
import { GetBerry } from '@/Domain/UseCase/Berry/GetBerry';
import { GetPokemonByName } from '@/Domain/UseCase/Pokemon/GetPokemonByName';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStoredBerry, storeBerry } from './indexeddb';
import useModal from '../.utils/useModal';

type ModalMode = '' | 'RECHOOSE';

export default function NameViewModel(name: string) {
  const router = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [berries, setBerries] = useState<Berry[]>([]);
  const [isFetchingPokemon, setIsFetchingPokemon] = useState<Boolean>(true);
  const [isFetchingEvolution, setIsFetchingEvolution] = useState<Boolean>(true);
  const [isFetchingBerry, setIsFetchingBerry] = useState<Boolean>(true);

  const [cardSprite, setCardSprite] = useState(-1);
  const [modal, setModal] = useModal<ModalMode>('');

  const [selectBerry, setSelectBerry] = useState<Berry['id']>('');
  const [firmnessFed, setFirmnessFed] = useState<Berry['firmness']>('');
  const [berryTaste, setBerryTaste] = useState<'GOOD'|'BAD'|''>('');

  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);

  const getPokemonUseCase = new GetPokemonByName(pokemonRepositoryImpl);

  const berryDataSourceImpl = new BerryAPIDataSourceImpl();
  const berryRepositoryImpl = new BerryRepositoryImpl(berryDataSourceImpl);

  const getBerryUseCase = new GetBerry(berryRepositoryImpl);

  const fetchPokemon = async () => {
    try {
      setIsFetchingPokemon(true);
      const data = await getPokemonUseCase.invoke(name);
      setIsFetchingPokemon(false);
      if (data) {
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
        storeBerry(data);
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
      setFirmnessFed(firmness);
      setBerryTaste(firmness === firmnessFed ? 'BAD' : 'GOOD');
      setTimeout(() => {
        setBerryTaste('');
      }, 1100);
    }
  };

  const onRechoosePokemon = () => {
    localStorage.removeItem('CHOSEN');
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  const onEvolvePokemon = (name: Pokemon['nameSlug']) => {
    localStorage.setItem('CHOSEN', name);
    router.replace(`/${name}`);
  };

  useEffect(() => {
    const chosen = localStorage.getItem('CHOSEN');
    if (chosen) {
      router.replace(`/${chosen}`);
    }
    fetchPokemon();
    fetchBerry();
  }, []);

  useEffect(() => {
    if (berries.length) {
      const cb: (b:Berry[]) => Berry[] = b => b;
      getStoredBerry(cb);
    }
  }, [berries]);

  return {
    pokemon,
    evolutions,
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
