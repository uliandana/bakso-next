import Spinner from '@/app/_elements/Spinner';
import viewmodel from '../viewmodel';
import styles from '../styles.module.css';
import Evolutions from './evolutions.pokemon';

export type SpritesProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon']
  target: ReturnType<typeof viewmodel>['target'],
  sprite: ReturnType<typeof viewmodel>['sprite'],
  feed: ReturnType<typeof viewmodel>['feed'],
  evolutions: ReturnType<typeof viewmodel>['evolutions'],
  isFetchingPokemon: ReturnType<typeof viewmodel>['isFetchingPokemon'],
};

export default function Sprites(props: Readonly<SpritesProps>) {
  const { pokemon, target, sprite, feed, evolutions, isFetchingPokemon } = props;
  if (isFetchingPokemon || !pokemon) {
    return (
      <div className={styles.sprite}>
        <Spinner />
      </div>
    );
  }

  const EVOLUTION = [
    'This pokemon has no evolution',
    'This pokemon can evolve',
  ];

  const clsSprite = `${styles.spriteSides} ${sprite.cardSprite < 0 ? 'card-flip' : 'card-flipped'}`;
  const clsSpriteBack = `${styles.spriteSides} ${sprite.cardSprite < 0 ? 'card-flipped' : 'card-flip'}`;
  const clsSpriteImg = ({
    'GOOD': 'animate-feed-shake',
    'BAD': 'animate-feed-sick',
    '': 'animate-none',
  })[feed.berryTaste];
  const evolutionProgress = (target.pokemon && pokemon) ? (pokemon?.weight * 100 / target.pokemon.baseWeight) : 0;

  return (
    <div className={styles.sprite}>
      <div className={styles.spriteCard}>
        <div className={clsSprite}>
          <img className={clsSpriteImg} src={pokemon?.sprite} alt={pokemon.name} />
        </div>
        <Evolutions evolutions={evolutions} className={clsSpriteBack} targetId={target.pokemon?.id} onSelect={target.setTarget} />
      </div>
      <div
        className={styles.evolutionProgress}
        style={{ background: `conic-gradient(#fff 0 ${evolutionProgress}%, transparent 0 100%)` }}
      >
        <button onClick={sprite.onFlipSprite} className="flex items-center justify-center size-[5rem] bg-red-500 disabled:bg-red-500/50 text-[2rem] font-[700] rounded-full" disabled={!pokemon?.evolvesTo.length}>
          {pokemon?.evolvesTo.length ? <img src={target.pokemon?.sprite} className="w-4/6 silhouette" alt="" /> : ''}
        </button>
      </div>
      <p className="text-[1.5rem] bg-neutral-800 shadow-xl absolute bottom-[5.25rem] right-[-4rem] py-[0.25rem] px-[1rem] rounded-[0.5rem] animate-fade-out">
        {EVOLUTION[pokemon?.evolvesTo.length] || `This pokemon has ${pokemon.evolvesTo.length} evolutions!`}
        <span className="absolute bottom-[-1rem] right-[4.5rem] border-solid border-t-neutral-800 border-t-[1rem] border-x-transparent border-x-[1rem] border-b-0" />
      </p>
    </div>
  );
}
