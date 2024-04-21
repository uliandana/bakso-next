import { ChangeEventHandler } from 'react';
import Spinner from '@/app/_elements/Spinner';
import { BERRY_BG, Berry } from '../viewmodel';
import styles from '../styles.module.css';

type BerriesProps = {
  isFetchingBerry: boolean,
  berries: Berry[],
  onSelect: ChangeEventHandler,
};

export default function Berries(props: Readonly<BerriesProps>) {
  const { isFetchingBerry, berries, onSelect } = props;
  if (isFetchingBerry) {
    return <Spinner />
  }
  return (
    <div className={styles.berries}>
      {berries.map(i => i.id && (
        <label htmlFor={`berry-${i.id}`} key={i.id} style={{ backgroundColor: BERRY_BG[i.firmness] || 'white' }}>
          <input id={`berry-${i.id}`} type="radio" name="berry" value={i.id} className="hidden" onChange={onSelect} />
          <img src={i.sprite} title={i.name} alt={i.name} className="size-[3rem] m-[1rem]" />
        </label>
      ))}
    </div>
  );
}