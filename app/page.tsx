'use client'
import useViewModel from './viewmodel';

export default function Root() {
  const { pokemons } = useViewModel();

  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {pokemons.map((poke, idx) => (
        <a data-pokemon={idx + 1} className="block w-[10rem] p-[1rem] text-center" key={idx} href={`/${poke.name}`}>
          <img src={poke.sprite} />
          <p className="text-[1rem]">{poke.name}</p>
        </a>
      ))}
    </main>
  )
}
