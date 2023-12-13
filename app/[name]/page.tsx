async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    return [];
  }
  return res.json();
}

type Params = {
  name: string,
}

type Stats = {
  base_stat: number,
  stat: {
    name: string,
  },
}

interface Pokemon {
  name: string,
  id: number,
  stats: Stats[],
  weight: number,
}

export default async function PokemonByName({ params }: { params: Params }) {
  const data: Pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} />
      <p>{data.name}</p>
      <p>{data.weight} kg</p>
      <table>
        <tbody>
          {data.stats.map((i, idx) => (
            <tr key={idx}>
              <td>{i.stat.name}</td>
              <td>{i.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
