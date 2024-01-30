'use client'
import Link from 'next/link';
import useViewModel from './viewmodel';
import Spinner from '@/app/.elements/Spinner';

export default function Root() {
  const { pokemons, isFetching, search } = useViewModel();

  return (
    <main className="m-auto min-h-screen">
      <h1 className="text-[3rem] font-bold text-center mb-[3rem]">Choose Your Pokemon</h1>
      <input
        value={search.value}
        onChange={e => search.setSearch(e.target.value)}
        className="block w-full text-[2rem] text-black mb-[2rem] p-[1rem] bg-slate-300 rounded-[1rem] border-solid border-[0.0625rem] border-slate-500"
      />
      <section className="grid grid-cols-4">
        {pokemons.map((poke, idx) => (
          <Link data-pokemon={idx + 1} key={idx} href={`/${poke.name}`}
            className="h-[25vw] text-center flex flex-col items-center justify-between overflow-hidden relative"
            style={{ backgroundColor: poke.bgColor }} 
          >
            <img className="block w-full transition-all hover:drop-shadow-xl hover:rotate-3" src={poke.sprite} alt={poke.name} />
            <p className="text-[2rem] uppercase text-white font-[700] absolute bottom-1">{poke.name}</p>
          </Link>
        ))}
        {isFetching && (
          <div className="block p-[1rem] mb-[1rem] text-center">
            <Spinner />
          </div>
        )}
      </section>
    </main>
  )
}
