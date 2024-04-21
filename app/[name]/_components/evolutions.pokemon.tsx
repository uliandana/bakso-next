import { Dispatch, SetStateAction } from 'react';
import { Pokemon } from '../viewmodel';
import styles from '../styles.module.css';

type EvolutionsProps = {
  evolutions: Pokemon[],
  className: string,
  targetId: Pokemon['id'] | undefined,
  onSelect: Dispatch<SetStateAction<Pokemon | undefined>>,
};

export default function Evolutions(props: Readonly<EvolutionsProps>) {
  const { evolutions, className, targetId, onSelect } = props;

  if (!evolutions.length) {
    return null;
  }

  return (
    <div className={className}>
      {evolutions.length === 1 ? (
        <img className="silhouette" src={evolutions[0].sprite} alt="evolution" />
      ): (
        evolutions.map(i => (
          <label className={styles.evolutions} htmlFor={`evolve-${i.id}`} key={i.id}>
            <input id={`evolve-${i.id}`} type="radio" name="evolve" checked={targetId === i.id} value={i.id} className="hidden" onChange={e => onSelect(evolutions.filter(i => i.id === e.target.value)[0])} />
            <img src={i.sprite} title="?" className="silhouette" alt="evolution" />
          </label>
        ))
      )}
    </div>
  );
}
