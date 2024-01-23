'use client'
import BackIcon from '@/app/.elements/BackIcon';
import Spinner from '@/app/.elements/Spinner';
import useViewModel from './viewmodel';

type Params = {
  name: string,
}

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
    <main className="flex flex-col h-[100vh] overflow-y-auto items-stretch justify-between p-24">
      <header className="flex items-center justify-center">
        <h1 className="text-[3rem] font-[700] mr-[-2rem] flex-1 text-center">{pokemon?.name}</h1>
        <a href="/" className="h-[2rem] w-[2rem]">
          <BackIcon />
        </a>
      </header>
      <img src={pokemon?.sprite} />
      <div className="flex items-center justify-center gap-[1rem]">
        {pokemon?.types.map(i => (
          <span className="py-[0.25rem] px-[1rem] text-[1.5rem] uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: 'grey' }} key={i}>
            {i}
          </span>
        ))}
      </div>
      <table className="text-[1.5rem] w-8/12 mx-auto">
        <tbody>
          {pokemon?.stats.map((i, idx) => (
            <tr key={idx}>
              <td className="pr-[2rem]">{i.name}</td>
              <td>{i.value}</td>
            </tr>
          ))}
          <tr>
            <td className="pr-[2rem]">Weight</td>
            <td>{pokemon?.weight} kg</td>
          </tr>
        </tbody>
      </table>
      {pokemon?.evolvesTo?.length! > 0 && (
        <section>
          <p>Evolves to</p>
          <div className="flex items-center gap-[2rem]">
            {pokemon?.evolvesTo.map((i, idx) => (
              <div key={idx}>
                <img className="w-[5rem]" src={i?.sprite} />
                <p>{i?.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="h-[5rem] overflow-x-auto p-[1rem] rounded-[1rem] border-solid border-[0.125rem] border-white whitespace-nowrap">
        {berries.map(i => <img key={i.id} src={i.sprite} title={i.name} className="h-[3rem] inline-block" />)}
      </div>
      <button className="py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-[green] font-[700] tracking-[0.125rem]">Feed Pokemon</button>
    </main>
  )
}
