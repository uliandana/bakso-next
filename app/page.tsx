'use client'
import Link from 'next/link';
import useViewModel from './viewmodel';
import Spinner from '@/app/.elements/Spinner';

export default function Root() {
  const { pokemons, onChoosePokemon, isFetching, search } = useViewModel();

  return (
    <main className="m-auto h-dvh overflow-y-auto">
      <header className="p-[2rem] px-[6rem]">
        <h1 className="text-[3rem] font-bold text-center mb-[2rem]">Choose Your Pokemon</h1>
        <input
          value={search.value}
          placeholder="Search pokemon"
          onChange={e => search.setSearch(e.target.value)}
          className="block w-full text-[2rem] text-black p-[1rem] bg-white rounded-[1rem] border-solid border-[0.0625rem] border-slate-500"
        />
      </header>
      <section className="grid grid-cols-4">
        {pokemons.map((poke, idx) => (
          <Link data-pokemon={idx + 1} key={idx} href={`/${poke.name}`}
            className="h-[25vw] text-center flex flex-col items-center justify-between overflow-hidden relative"
            style={{ backgroundColor: poke.bgColor }} 
          >
            <img className="block w-full transition-all hover:drop-shadow-xl hover:rotate-6 hover:scale-110" src={poke.sprite} alt={poke.name} />
            <p className="text-[2rem] uppercase font-[700] absolute bottom-1">{poke.name}</p>
          </Link>
        ))}
        {isFetching && (
          <div className="block p-[1rem] mb-[1rem] text-center">
            <Spinner />
          </div>
        )}
      </section>
      <footer className="sticky bottom-[-3rem] mb-[-3rem] p-[6rem]">
        <button onClick={onChoosePokemon} className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-neutral-100 text-red-600 font-[700] tracking-[0.125rem] shadow-2xl">
          I Choose You!
        </button>
      </footer>
    </main>
  )
}
