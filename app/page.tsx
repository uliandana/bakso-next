import useViewModel from './viewmodel';

export default async function Root() {
  const { pokemons } = await useViewModel();
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {pokemons.map((poke, idx) => (
        <a className="block w-[10rem] p-[1rem] text-center" key={idx} href={`/${poke.name}`}>
          <img src={poke.sprite} />
          <p>{poke.name}</p>
        </a>
      ))}
    </main>
  )
}
