import Spinner from '@/app/_elements/Spinner';
import { Pokemon } from '../viewmodel';
import styles from '../styles.module.css';

type ListProps = {
  pokemons: Pokemon[],
  isFetching: boolean,
  select: {
    value: Pokemon['nameSlug'],
    onSelectCard: (name: Pokemon['nameSlug']) => void,
  }
};

export default function List(props: Readonly<ListProps>) {
  const { pokemons, isFetching, select } = props;
  return (
    <div className={styles.list}>
      {pokemons.map((poke, idx) => (
        <label htmlFor={`pokemon-${poke.id}`} data-pokemon={idx + 1} key={poke.id}
          style={{
            backgroundColor: poke.bgColor,
            border: (select.value === poke.nameSlug ? '0.0625rem solid gold' : ''),
          }}
        >
          <input id={`pokemon-${poke.id}`} type="radio" name="berry" value={poke.nameSlug} className="hidden" onChange={() => select.onSelectCard(poke.nameSlug)} />
          <img className="block w-full transition-all hover:drop-shadow-xl hover:rotate-6 hover:scale-110" src={poke.sprite} alt={poke.name} />
          <p>{poke.name}</p>
        </label>
      ))}
      {isFetching && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
