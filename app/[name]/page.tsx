'use client'
import BackIcon from '@/app/.elements/BackIcon';
import Spinner from '@/app/.elements/Spinner';
import useViewModel from './viewmodel';

type Params = {
  name: string,
}

export default function PokemonByName({ params }: { params: Params }) {
  const { pokemon, berries, iseFetching } = useViewModel(params.name);

  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      <a href="/" className="h-[2rem] w-[2rem]">
        <BackIcon />
      </a>
      <div>
        <img src={pokemon?.sprite} />
        {iseFetching ?
          <Spinner /> : (
            <>
              <p>{pokemon?.name}</p>
              {pokemon?.types.map(i => <span className="py-[0.25rem] px-[1rem]" key={i}>{i}</span>)}
              <p>{pokemon?.weight} kg</p>
              <button>I Choose You!</button>
              <p>Evolves to</p>
              <div className="flex items-center gap-[2rem]">
                {pokemon?.evolvesTo.map((i, idx) => (
                  <div key={idx}>
                    <img className="w-[5rem]" src={i?.sprite} />
                    <p>{i?.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          <section>
            <p>Feed Berry</p>
            <div className="flex w-[14.5rem] flex-wrap gap-[0.5rem]">
              {berries.map(i => <img key={i.id} src={i.sprite} title={i.name} className="w-[1rem]" />)}
            </div>
          </section>
      </div>
      <table>
        <tbody>
          {pokemon?.stats.map((i, idx) => (
            <tr key={idx}>
              <td>{i.name}</td>
              <td>{i.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
