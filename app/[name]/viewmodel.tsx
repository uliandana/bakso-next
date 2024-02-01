import BerryAPIDataSourceImpl from '@/Data/DataSource/API/BerryAPIDataSource';
import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { BerryRepositoryImpl } from '@/Data/Repository/BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { Berry } from '@/Domain/Model/Berry';
import { Pokemon } from '@/Domain/Model/Pokemon';
import { GetBerry } from '@/Domain/UseCase/Berry/GetBerry';
import { GetPokemonByName } from '@/Domain/UseCase/Pokemon/GetPokemonByName';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { getStoredBerry, storeBerry } from './indexeddb';

export default function NameViewModel(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [evolutions, setEvolutions] = useState<Pokemon[]>([]);
  const [berries, setBerries] = useState<Berry[]>([]);
  const [selectBerry, setSelectBerry] = useState<Berry['id']>('');
  const [isFetchingPokemon, setIsFetchingPokemon] = useState<Boolean>(true);
  const [isFetchingEvolution, setIsFetchingEvolution] = useState<Boolean>(true);
  const [isFetchingBerry, setIsFetchingBerry] = useState<Boolean>(true);

  const [cardSprite, setCardSprite] = useState(-1);

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

  const onSelectBerry:ChangeEventHandler<HTMLInputElement> = e => {
    setSelectBerry(e.target.value);
  };

  const onFeedBerry = () => {

  };

  useEffect(() => {
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
    sprite: {
      cardSprite,
      onFlipSprite,
    },
    feed: {
      selected: selectBerry,
      select: onSelectBerry,
    },
    onFeedBerry,
    isFetchingPokemon,
    isFetchingEvolution,
    isFetchingBerry,
  };
}
