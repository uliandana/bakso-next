import viewmodel from '../viewmodel';
import styles from '../styles.module.css';

export type BtnEvolveProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon']
  target: ReturnType<typeof viewmodel>['target'],
  onEvolvePokemon: ReturnType<typeof viewmodel>['onEvolvePokemon'],
};

export default function BtnEvolve(props: Readonly<BtnEvolveProps>) {
  const { pokemon, target, onEvolvePokemon } = props;
  if (!pokemon || !target.pokemon || (pokemon?.weight < target.pokemon?.weight)) {
    return null;
  }
  return (
    <button onClick={() => onEvolvePokemon(target.pokemon?.nameSlug)} className={styles.btnEvolve}>
      Evolve
    </button>
  );
}
