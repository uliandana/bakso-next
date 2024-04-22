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
import useInfiniteScroll from '@/app/_utils/useInfiniteScroll';

export type { Pokemon };

export default function RootViewModel() {
  const router = useRouter();
  const allStates = useAllStates();

  const observer = useInfiniteScroll<Pokemon[]>({
    setOffset: allStates.setOffset,
    data: allStates.pokemons,
    attribute: 'data-pokemon',
    dynamicAttribute: `[data-pokemon='${(allStates.indexPage + 1) * 100}']`,
  });

  const allUseCases = useCases();
  const allEvents = useAllEvents({ allStates, allUseCases, router, observer });
  useAllEffects({ allStates, allEvents, observer });

  return {
    pokemons: allStates.pokemons,
    isFetching: allStates.isFetching,
    search: {
      value: allStates.search,
      setSearch: allStates.setSearch,
    },
    select: {
      value: allStates.selected,
      onSelectCard: allEvents.onSelectCard,
    },
    scrollTop: {
      invoke: allEvents.onScrollTop,
      ref: allStates.mainRef,
    },
    onChoosePokemon: allEvents.onChoosePokemon,
  };
}

export function useAllStates() {
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [selected, setSelected] = useState<Pokemon['nameSlug']>('');

  const [indexPage, setIndexPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const [search, setSearch] = useState('');

  const mainRef = useRef<HTMLElement>(null);

  return {
    allPokemons, setAllPokemons,
    filteredPokemons, setFilteredPokemons,
    pokemons, setPokemons,
    selected, setSelected,
    indexPage, setIndexPage,
    offset, setOffset,
    isFetching, setIsFetching,
    search, setSearch,
    mainRef,
  };
}

export function useCases() {
  const dataSourceImplAPI = new PokemonAPIDataSourceImpl();
  const dataSourceImplLocalStorage = new ProgressLocalStorageDataSourceImpl();

  const pokemonRepositoryImpl = new PokemonRepositoryImpl(dataSourceImplAPI);
  const progressRepositoryImpl = new ProgressRepositoryImpl(dataSourceImplLocalStorage);

  return {
    getAllPokemonUseCase: new GetAllPokemon(pokemonRepositoryImpl),
    getChosenPokemonUseCase: new GetChosenPokemon(progressRepositoryImpl),
    setChosenPokemonUseCase: new SetChosenPokemon(progressRepositoryImpl),
  };
}

export type UseAllEventsProps = {
  allStates: ReturnType<typeof useAllStates>,
  allUseCases: ReturnType<typeof useCases>,
  router: ReturnType<typeof useRouter>,
  observer: ReturnType<typeof useInfiniteScroll>,
};

export function useAllEvents({ allStates, allUseCases, router, observer }: UseAllEventsProps) {
  const initialize = async () => {
    const chosen = await allUseCases.getChosenPokemonUseCase.invoke();
    if (chosen) {
      router.replace(`/${chosen}`);
    } else {
      fetchPokemon();
      observer.initialize();
    }
  };

  const fetchPokemon = async () => {
    try {
      allStates.setIsFetching(true)
      const data = await allUseCases.getAllPokemonUseCase.invoke();
      allStates.setAllPokemons(data);
      allStates.setFilteredPokemons(data);
      allStates.setPokemons(data.slice(0, 100));
      allStates.setIsFetching(false);
    } catch(e) {
      allStates.setPokemons([...allStates.pokemons]);
      allStates.setIsFetching(false);
    }
  };

  const onSelectCard = (name: Pokemon['nameSlug']) => {
    allStates.setSelected(name);
  };

  const onScrollTop = () => {
    if (allStates.mainRef?.current) {
      allStates.mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onChoosePokemon = async () => {
    await allUseCases.setChosenPokemonUseCase.invoke(allStates.selected);
    router.push(`/${allStates.selected}`);
  };

  return {
    initialize,
    fetchPokemon,
    onSelectCard,
    onScrollTop,
    onChoosePokemon,
  };
}

export type UseAllEffectsProps = {
  allStates: ReturnType<typeof useAllStates>,
  allEvents:  ReturnType<typeof useAllEvents>,
  observer: ReturnType<typeof useInfiniteScroll>,
};

export function useAllEffects({ allStates, allEvents, observer }: UseAllEffectsProps) {
  useEffect(() => {
    const nextIndexPage = Math.ceil(allStates.offset / 100);
    if (allStates.indexPage >= nextIndexPage) {
      return;
    }

    allStates.setIndexPage(nextIndexPage);
    allStates.setPokemons([...allStates.pokemons, ...allStates.filteredPokemons.slice(allStates.offset, allStates.offset + 100)]);
  }, [allStates.offset]);

  useEffect(() => {
    allStates.setPokemons([]);
    const filteredByKeyword = allStates.allPokemons.filter(i => i.name.includes(allStates.search.toLowerCase()) || (i.id === allStates.search));
    allStates.setFilteredPokemons(filteredByKeyword);
    allStates.setPokemons(filteredByKeyword.slice(0, 100));
    allStates.setOffset(0);
    allStates.setIndexPage(0);
    observer.initialize();
  }, [allStates.search]);

  useEffect(() => {
    allEvents.initialize();
  }, []);
}