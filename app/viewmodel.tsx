import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PokemonAPIDataSourceImpl from '@/data/DataSource/API/PokemonAPIDataSource';
import ProgressLocalStorageDataSourceImpl from '@/data/DataSource/LocalStorage/ProgressLocalStorageDataSource';
import { PokemonRepositoryImpl } from '@/data/Repository/PokemonRepositoryImpl';
import { ProgressRepositoryImpl } from '@/data/Repository/ProgressRepositoryImpl';
import { GetAllPokemon } from '@/domain/UseCase/Pokemon/GetAllPokemon';
import { SetChosenPokemon } from '@/domain/UseCase/Pokemon/SetChosenPokemon';
import { GetChosenPokemon } from '@/domain/UseCase/Pokemon/GetChosenPokemon';
import { Pokemon } from '@/domain/Model/Pokemon';
import useInfiniteScroll from './.utils/useInfiniteScroll';

export default function RootViewModel() {
  const router = useRouter();
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [selected, setSelected] = useState<Pokemon['nameSlug']>('');

  const [indexPage, setIndexPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const [search, setSearch] = useState('');

  const mainRef = useRef<HTMLElement>(null);

  const observer = useInfiniteScroll<Pokemon[]>({ setOffset, data: pokemons, attribute: 'data-pokemon', dynamicAttribute: `[data-pokemon='${(indexPage + 1) * 100}']` });

  const dataSourceImplAPI = new PokemonAPIDataSourceImpl();
  const dataSourceImplLocalStorage = new ProgressLocalStorageDataSourceImpl();

  const pokemonRepositoryImpl = new PokemonRepositoryImpl(dataSourceImplAPI);
  const progressRepositoryImpl = new ProgressRepositoryImpl(dataSourceImplLocalStorage);
  
  const getAllPokemonUseCase = new GetAllPokemon(pokemonRepositoryImpl);
  const getChosenPokemonUseCase = new GetChosenPokemon(progressRepositoryImpl);
  const setChosenPokemonUseCase = new SetChosenPokemon(progressRepositoryImpl);


  const initialize = async () => {
    const chosen = await getChosenPokemonUseCase.invoke();
    if (chosen) {
      router.replace(`/${chosen}`);
    } else {
      fetchPokemon(0);
      observer.initialize();
    }
  };

  const fetchPokemon = async (offset: number) => {
    try {
      setIsFetching(true)
      const data = await getAllPokemonUseCase.invoke();
      setAllPokemons(data);
      setFilteredPokemons(data);
      setPokemons(data.slice(0, 100));
      setIsFetching(false);
    } catch(e) {
      setPokemons([...pokemons]);
      setIsFetching(false);
    }
  };

  const onSelectCard = (name: Pokemon['nameSlug']) => {
    setSelected(name);
  };

  const onScrollTop = () => {
    if (mainRef?.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onChoosePokemon = async () => {
    await setChosenPokemonUseCase.invoke(selected);
    router.push(`/${selected}`);
  };

  useEffect(() => {
    const nextIndexPage = Math.ceil(offset / 100);
    if (indexPage >= nextIndexPage) {
      return;
    }

    setIndexPage(nextIndexPage);
    setPokemons([...pokemons, ...filteredPokemons.slice(offset, offset + 100)]);
  }, [offset]);

  useEffect(() => {
    setPokemons([]);
    const filteredByKeyword = allPokemons.filter(i => i.name.includes(search.toLowerCase()) || (i.id === search));
    setFilteredPokemons(filteredByKeyword);
    setPokemons(filteredByKeyword.slice(0, 100));
    setOffset(0);
    setIndexPage(0);
    observer.initialize();
  }, [search]);

  useEffect(() => {
    initialize();
  }, []);

  return {
    pokemons,
    isFetching,
    search: {
      value: search,
      setSearch,
    },
    select: {
      value: selected,
      onSelectCard,
    },
    scrollTop: {
      invoke: onScrollTop,
      ref: mainRef,
    },
    onChoosePokemon,
  };
}
