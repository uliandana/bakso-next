async function getData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    return [];
  }
  return res.json();
}

function urlSprite(path: string) {
  const id = path.split('/')[6];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

interface Pokemon {
  url: string,
  name: string,
}

interface ListData {
  results: Pokemon[],
}

export default async function Home() {
  const data: ListData = await getData('https://pokeapi.co/api/v2/pokemon?limit=50&offset=750');
  return (
    <main className="flex flex-wrap min-h-screen items-center justify-between p-24">
      {data.results.map((i: { url: string, name: string }, idx: number) => (
        <a className="block w-[10rem] p-[1rem] text-center" key={idx} href={`/${i.name}`}>
          <img src={urlSprite(i.url)} />
          <p>{i.name}</p>
        </a>
      ))}
    </main>
  )
}
