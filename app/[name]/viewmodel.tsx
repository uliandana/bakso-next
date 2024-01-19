import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { Pokemon } from '@/Domain/Model/Pokemon';
import { GetPokemonByName } from '@/Domain/UseCase/Pokemon/GetPokemonByName';
import { useEffect, useState } from 'react';

export default function NameViewModel(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [iseFetching, setIsFetching] = useState<Boolean>(true);

  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);

  const getPokemonUseCase = new GetPokemonByName(pokemonRepositoryImpl);

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

  useEffect(() => {
    fetchPokemon();
  }, []);

  return {
    pokemon,
    iseFetching,
  };
}
