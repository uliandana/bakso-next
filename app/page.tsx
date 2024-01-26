'use client'
import useViewModel from './viewmodel';
import Spinner from '@/app/.elements/Spinner';

export default function Root() {
  const { pokemons, isFetching, search } = useViewModel();

  return (
    <main className="min-h-screen px-[4rem] py-[6rem]">
      <h1 className="text-[3rem] font-bold text-center mb-[3rem]">Choose Your Pokemon</h1>
      <input
        value={search.value}
        onChange={e => search.setSearch(e.target.value)}
        className="block w-full text-[2rem] text-black mb-[2rem] p-[1rem] bg-slate-300 rounded-[1rem] border-solid border-[0.0625rem] border-slate-500"
      />
      <section className="flex flex-wrap items-center justify-between">
        {pokemons.map((poke, idx) => (
          <a data-pokemon={idx + 1} key={idx} href={`/${poke.name}`}
            className="w-[10rem] h-[13rem] p-[1rem] mb-[1rem] text-center flex flex-col items-center justify-between" 
          >
            <img src={poke.sprite} alt={poke.name} />
            <p className="text-[1rem] mt-[1rem]">{poke.name}</p>
          </a>
        ))}
        {isFetching && (
          <div className="block w-[10rem] p-[1rem] mb-[1rem] text-center">
            <Spinner />
          </div>
        )}
      </section>
    </main>
  )
}
