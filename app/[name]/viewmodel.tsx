import BerryAPIDataSourceImpl from '@/Data/DataSource/API/BerryAPIDataSource';
import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { BerryRepositoryImpl } from '@/Data/Repository/BerryRepositoryImpl';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { Berry } from '@/Domain/Model/Berry';
import { Pokemon } from '@/Domain/Model/Pokemon';
import { GetBerry } from '@/Domain/UseCase/Berry/GetBerry';
import { GetPokemonByName } from '@/Domain/UseCase/Pokemon/GetPokemonByName';
import { useEffect, useState } from 'react';
import { getStoredBerry, storeBerry } from './indexeddb';

export default function NameViewModel(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [berries, setBerries] = useState<Berry[]>([]);
  const [iseFetching, setIsFetching] = useState<Boolean>(true);

  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);

  const getPokemonUseCase = new GetPokemonByName(pokemonRepositoryImpl);

  const berryDataSourceImpl = new BerryAPIDataSourceImpl();
  const berryRepositoryImpl = new BerryRepositoryImpl(berryDataSourceImpl);

  const getBerryUseCase = new GetBerry(berryRepositoryImpl);

  const fetchPokemon = async () => {
    try {
      setIsFetching(true);
      const data = await getPokemonUseCase.invoke(name);
      setIsFetching(false);
      if (data) {
        setPokemon(data);
      }
    } catch(e) {
      setIsFetching(false);
    }
  };

  const fetchBerry = async () => {
    try {
      const data = await getBerryUseCase.invoke();
      if (data) {
        setBerries(data);
        storeBerry(data);
      }
    } catch(e) {
      setBerries([]);
    }
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
    berries,
    iseFetching,
  };
}
