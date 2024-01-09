'use client'
import useViewModel from './viewmodel';

export default async function Root() {
  const { pokemons, observerRef } = await useViewModel();

  return (
    <main ref={observerRef} className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {pokemons.map((poke, idx) => (
        <a className="block w-[10rem] p-[1rem] text-center" key={idx} href={`/${poke.name}`}>
          <img src={poke.sprite} />
          <p className="text-[1rem]">{poke.name}</p>
        </a>
      ))}
    </main>
  )
}
