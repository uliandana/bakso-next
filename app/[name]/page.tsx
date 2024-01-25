'use client'
import CloseIcon from '@/app/.elements/CloseIcon';
import Spinner from '@/app/.elements/Spinner';
import useViewModel from './viewmodel';

type Params = {
  name: string,
}

const STATS: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  'speed': 'Speed',
};

const TYPES: { [key: string]: string } = {
  bug: '#AABB22',
  dark: '#775544',
  dragon: '#7766EE',
  electric: '#FFCC33',
  fairy: '#FFAAFF',
  fighting: '#BB5544',
  fire: '#FF4422',
  flying: '#6699FF',
  ghost: '#6666BB',
  grass: '#77CC55',
  ground: '#DDBB55',
  ice: '#77DDFF',
  normal: '#BBBBAA',
  poison: '#AA5599',
  psychic: '#FF5599',
  rock: '#BBAA66',
  steel: '#AAAABB',
  water: '#3399FF',
};

export default function PokemonByName({ params }: { params: Params }) {
  const { pokemon, berries, isFetching } = useViewModel(params.name);

  if (isFetching) {
    return (
      <main className="flex flex-col h-[100vh] overflow-x-hidden overflow-y-auto items-center justify-between p-24">
        <Spinner />
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-[1rem] h-[100vh] overflow-y-auto justify-between p-24">
      <header className="flex items-center justify-center">
        <h1 className="text-[3rem] font-[700] mr-[-3rem] flex-1 text-center">{pokemon?.name}</h1>
        <a href="/" className="h-[3rem] w-[3rem] p-[0.5rem] rounded-full bg-red-700">
          <CloseIcon />
        </a>
      </header>
      <img className="h-[25vh] self-center" src={pokemon?.sprite} />
      <div className="flex items-center justify-center gap-[1rem]">
        {pokemon?.types.map(i => (
          <span className="py-[0.25rem] px-[1rem] text-[1.5rem] text-white uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: TYPES[i] || 'grey' }} key={i}>
            {i}
          </span>
        ))}
      </div>
      <table className="text-[1.5rem] w-8/12 mx-auto">
        <tbody>
          {pokemon?.stats.map((i, idx) => (
            <tr key={idx}>
              <td className="pr-[2rem]">{STATS[i.name]}</td>
              <td>{i.value}</td>
            </tr>
          ))}
          <tr>
            <td className="pr-[2rem]">Weight</td>
            <td>{pokemon?.weight}</td>
          </tr>
        </tbody>
      </table>
      {pokemon?.evolvesTo?.length! > 0 && (
        <section className="flex gap-[1rem] items-center">
          <p className="w-[16rem] text-[1.5rem]">Evolves to</p>
          <div className="h-[5rem] mb-[1rem] overflow-y-hidden overflow-x-auto p-[1rem] whitespace-nowrap">
            {pokemon?.evolvesTo.map(i => <img key={i?.id} src={i?.sprite} className="h-[4rem] mx-[1rem] inline-block" />)}
          </div>
        </section>
      )}
      <footer className="sticky bottom-[-3rem] mb-[-3rem]">
        <div className="h-[5rem] mb-[1rem] overflow-y-hidden overflow-x-auto p-[1rem] rounded-[1rem] border-solid border-[0.125rem] border-white whitespace-nowrap">
          {berries.map(i => <img key={i.id} src={i.sprite} title={i.name} className="h-[3rem] mx-[1rem] inline-block" />)}
        </div>
        <button className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-[green] font-[700] tracking-[0.125rem]">Feed Pokemon</button>
      </footer>
    </main>
  )
}
