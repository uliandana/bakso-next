'use client'
import useViewModel from './viewmodel';
import Spinner from '@/app/.elements/Spinner';

export default function Root() {
  const { pokemons, isFetching } = useViewModel();

  return (
    <main className="min-h-screen px-[4rem] py-[6rem]">
      <h1 className="text-[3rem] font-bold text-center mb-[3rem]">Choose Your Pokemon</h1>
      <section className="flex flex-wrap items-center justify-between">
        {pokemons.map((poke, idx) => (
          <a data-pokemon={idx + 1} className="block w-[10rem] p-[1rem] mb-[1rem] text-center" key={idx} href={`/${poke.name}`}>
            <img src={poke.sprite} />
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
