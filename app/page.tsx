'use client'
import useViewModel from './viewmodel';
import Spinner from '@/app/.elements/Spinner';

export default function Root() {
  const { pokemons, select, onChoosePokemon, isFetching, search } = useViewModel();

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
      <ul className="grid grid-cols-4">
        {pokemons.map((poke, idx) => (
          <li data-pokemon={idx + 1} key={idx}
            className="h-[25vw] text-center flex flex-col items-center justify-between overflow-hidden relative cursor-pointer"
            style={{ backgroundColor: poke.bgColor, border: (select.value === poke.nameSlug ? '0.0625rem solid gold' : '') }}
            onClick={() => select.onSelectCard(poke.nameSlug)}
          >
            <img className="block w-full transition-all hover:drop-shadow-xl hover:rotate-6 hover:scale-110" src={poke.sprite} alt={poke.name} />
            <p className="text-[2rem] uppercase font-[700] absolute bottom-1">{poke.name}</p>
          </li>
        ))}
        {isFetching && (
          <li className="block p-[1rem] mb-[1rem] text-center">
            <Spinner />
          </li>
        )}
      </ul>
      {select.value && (
        <footer className="sticky bottom-[-3rem] mb-[-3rem] p-[6rem]">
          <button onClick={onChoosePokemon} className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-neutral-100 text-red-600 font-[700] tracking-[0.125rem] shadow-2xl">
            I Choose You!
          </button>
        </footer>
      )}
    </main>
  )
}
