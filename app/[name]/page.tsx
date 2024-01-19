'use client'
import useViewModel from './viewmodel';

type Params = {
  name: string,
}

export default function PokemonByName({ params }: { params: Params }) {
  const { pokemon } = useViewModel(params.name);
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      <img src={pokemon?.sprite} />
      <p>{pokemon?.name}</p>
      <p>{pokemon?.weight} kg</p>
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
