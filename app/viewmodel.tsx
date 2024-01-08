import PokemonAPIDataSourceImpl from '@/Data/DataSource/API/PokemonAPIDataSource';
import { PokemonRepositoryImpl } from '@/Data/Repository/PokemonRepositoryImpl';
import { GetPokemon } from '@/Domain/UseCase/Pokemon/GetPokemon';

export default async function RootViewModel() {
  const pokemonDataSourceImpl = new PokemonAPIDataSourceImpl();
  const pokemonRepositoryImpl = new PokemonRepositoryImpl(pokemonDataSourceImpl);
  
  const getPokemonUseCase = new GetPokemon(pokemonRepositoryImpl);
  const pokemons = await getPokemonUseCase.invoke();

  return {
    pokemons,
  };
}
