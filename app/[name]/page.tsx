'use client'
import Link from 'next/link';
import CloseIcon from '@/app/.elements/CloseIcon';
import Spinner from '@/app/.elements/Spinner';
import useViewModel from './viewmodel';

type Params = {
  name: string,
}

const EVOLUTION = [
  'This pokemon has no evolution',
  'This pokemon can evolve',
];

const STATS: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
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
  const { pokemon, evolutions, berries, sprite, feed, isFetchingPokemon, isFetchingEvolution, isFetchingBerry } = useViewModel(params.name);
  const clsSprite = sprite.cardSprite < 0 ?
    'bg-neutral-100 rounded-[1rem] h-[30vh] card-flip':
    'bg-neutral-100 rounded-[1rem] h-[30vh] card-flipped';
  const clsSpriteBack = sprite.cardSprite < 0 ?
    'bg-neutral-100 rounded-[1rem] h-[30vh] card-flipped':
    'bg-neutral-100 rounded-[1rem] h-[30vh] card-flip';
  return (
    <main className="m-auto max-w-screen-md flex flex-col gap-[1rem] h-dvh overflow-y-auto justify-between p-24">
      {(isFetchingPokemon || !pokemon) ? <Spinner /> : (
        <>
          <header className="flex items-center justify-center">
            <h1 className="text-[3rem] font-[700] mr-[-3rem] flex-1 text-center">{pokemon?.name}</h1>
            <Link href="/" className="size-[3rem] p-[0.5rem] rounded-full bg-neutral-100 text-red-600">
              <CloseIcon />
            </Link>
          </header>
          <div className="relative self-center">
            <div className="relative size-[30vh]">
              <div className={clsSprite}>
                <img src={pokemon?.sprite} />
              </div>
              {evolutions[0] && (
                <div className={clsSpriteBack}>
                  <img className="silhouette" src={evolutions[0].sprite} />
                </div>
              )}
            </div>
            <button onClick={sprite.onFlipSprite} className="size-[5rem] bg-red-500 text-[2rem] font-[700] shadow-xl rounded-full absolute bottom-[-1rem] right-[-1rem]">
              {pokemon?.evolvesTo.length}
            </button>
            <p className="text-[1.5rem] bg-neutral-800 shadow-xl absolute bottom-[5.25rem] right-[-4rem] py-[0.25rem] px-[1rem] rounded-[0.5rem] animate-fade-out">
              {EVOLUTION[pokemon?.evolvesTo.length] || `This pokemon has ${pokemon.evolvesTo.length} evolutions!`}
              <span className="absolute bottom-[-1rem] right-[4.5rem] border-solid border-t-neutral-800 border-t-[1rem] border-x-transparent border-x-[1rem] border-b-0" />
            </p>
          </div>
          <div className="flex items-center justify-center gap-[1rem]">
            {pokemon?.types.map(i => (
              <span className="py-[0.25rem] px-[1rem] text-[1.5rem] uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: TYPES[i] || 'grey' }} key={i}>
                {i}
              </span>
            ))}
          </div>
          <table className="text-[1.5rem] w-8/12 mx-auto">
            <tbody>
              {pokemon?.stats.map((i, idx) => STATS[i.name] && (
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
        </>
      )}
      <footer className="sticky bottom-[-3rem] mb-[-3rem]">
        {isFetchingBerry ? <Spinner /> : (
          <div className="h-[5rem] mb-[1rem] overflow-y-hidden overflow-x-auto rounded-[1rem] border-solid border-[0.125rem] border-white whitespace-nowrap bg-neutral-100">
            {berries.map(i => i.id && (
              <label htmlFor={`berry-${i.id}`} key={i.id} className="inline-block rounded-[1rem] cursor-pointer has-[:checked]:bg-cyan-400">
                <input id={`berry-${i.id}`} type="radio" name="berry" value={i.id} className="hidden" onChange={feed.select} />
                <img src={i.sprite} title={i.name} className="h-[3rem] m-[1rem]" />
              </label>
            ))}
          </div>
        )}
        <button className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-neutral-100 text-red-600 font-[700] tracking-[0.125rem]">Feed Pokemon</button>
      </footer>
    </main>
  )
}
