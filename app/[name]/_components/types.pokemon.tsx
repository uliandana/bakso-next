import TYPES from '@/app/_utils/pokemonTypeColor';
import viewmodel from '../viewmodel';
import styles from '../styles.module.css';

export type TypesProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon']
};

export default function Types(props: Readonly<TypesProps>) {
  const { pokemon } = props;
  if (!pokemon) {
    return <div className={styles.types} />
  }
  return (
    <div className={styles.types}>
      {pokemon?.types.map(i => (
        <span className="py-[0.25rem] px-[1rem] text-[1.5rem] uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: TYPES[i] || 'grey' }} key={i}>
          {i}
        </span>
      ))}
    </div>
  );
}
