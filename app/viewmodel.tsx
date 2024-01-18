import { useEffect, useState } from 'react';
import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { GetPokemon } from '@/Domain/UseCase/Pokemon/GetPokemon';
import { Pokemon } from '@/Domain/Model/Pokemon';

export default function RootViewModel() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [indexPage, setIndexPage] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<Boolean>(true);

  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);
  
  const getPokemonUseCase = new GetPokemon(pokemonRepositoryImpl);

  const fetchPokemon = async (offset: number) => {
    try {
      setIsFetching(true)
      const data = await getPokemonUseCase.invoke(offset);
      setPokemons([...pokemons, ...data]);
      setIsFetching(false);
    } catch(e) {
      setPokemons([...pokemons]);
      setIsFetching(false);
    }
  };

  const initializeObserver = () => {
    const options = {
      threshold: 1,
    };
    
    const fnObs = new IntersectionObserver((e) => {
      const { isIntersecting, target } = e[0];
      if (!isIntersecting) {
        return;
      }

      const newOffset = parseInt(target.getAttribute('data-pokemon') || '0');
      if (!newOffset) {
        return;
      }
      
      setOffset(newOffset);
    }, options);

    setObserver(fnObs);
  };

  useEffect(() => {
    const nextIndexPage = Math.ceil(offset / 100);
    if (indexPage >= nextIndexPage) {
      return;
    }

    setIndexPage(nextIndexPage);
    fetchPokemon(offset);
  }, [offset]);

  useEffect(() => {
    const target = document.querySelector(`[data-pokemon='${(indexPage + 1) * 100}']`);
    if (target && observer) {
      observer.observe(target);
    }
  }, [pokemons]);

  useEffect(() => {
    fetchPokemon(0);
    initializeObserver();
  }, []);

  return {
    pokemons,
    isFetching
  };
}
