import viewmodel, { STATS } from '../viewmodel';

export type StatsProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon'],
  isFetchingPokemon: ReturnType<typeof viewmodel>['isFetchingPokemon'],
};

export default function Stats(props: Readonly<StatsProps>) {
  const { pokemon, isFetchingPokemon } = props;
  if (isFetchingPokemon || !pokemon) {
    return <table />;
  }
  return (
    <table>
      <tbody>
        {pokemon.stats.map(i => STATS[i.name] && (
          <tr key={i.name}>
            <td className="pr-[2rem]">{STATS[i.name]}</td>
            <td>{i.value}</td>
          </tr>
        ))}
        <tr>
          <td className="pr-[2rem]">Weight</td>
          <td>{pokemon.weight} Kg</td>
        </tr>
      </tbody>
    </table>
  );
}
