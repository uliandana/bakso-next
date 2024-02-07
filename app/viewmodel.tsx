import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { GetAllPokemon } from '@/Domain/UseCase/Pokemon/GetAllPokemon';
import { Pokemon } from '@/Domain/Model/Pokemon';

export default function RootViewModel() {
  const router = useRouter();
  const [listPokemons, setListPokemons] = useState<Pokemon[]>([]);
  const [allPokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [selected, setSelected] = useState<Pokemon['nameSlug']>('');

  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [indexPage, setIndexPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(true);

  const [search, setSearch] = useState('');

  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);
  
  const getAllPokemonUseCase = new GetAllPokemon(pokemonRepositoryImpl);

  const fetchPokemon = async (offset: number) => {
    try {
      if (allPokemons.length) {
        setPokemons([...pokemons, ...allPokemons.slice(offset, offset + 100)]);
      } else {
        setIsFetching(true)
        const data = await getAllPokemonUseCase.invoke();
        setListPokemons(data);
        setAllPokemons(data);
        setPokemons([...pokemons, ...data.slice(offset, offset + 100)]);
        setIsFetching(false);
      }
    } catch(e) {
      setPokemons([...pokemons]);
      setIsFetching(false);
    }
  };

  const onSelectCard = (name: Pokemon['nameSlug']) => {
    setSelected(name);
  };

  const onChoosePokemon = () => {
    localStorage.setItem('CHOSEN', selected);
    router.push(`/${selected}`);
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
    setPokemons([]);
    setAllPokemons(listPokemons.filter(i => i.name.includes(search)));
  }, [search]);

  useEffect(() => {
    setOffset(0);
    fetchPokemon(0);
  }, [allPokemons]);

  useEffect(() => {
    fetchPokemon(0);
    initializeObserver();
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
    onChoosePokemon,
  };
}
