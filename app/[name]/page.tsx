'use client'
import CloseIcon from '@/app/.elements/CloseIcon';
import Spinner from '@/app/.elements/Spinner';
import { Berry } from '@/Domain/Model/Berry';
import useViewModel from './viewmodel';
import TYPES from '../.utils/pokemonTypeColor';
import styles from './styles.module.css';

type Params = {
  name: string,
}

const EVOLUTION = [
  'This pokemon has no evolution',
  'This pokemon can evolve',
];

const STATS: { [key: string]: string } = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'speed': 'Speed',
};

const BERRY_BG: Record<Berry['firmness'], string> = {
  'very-soft': '#AABB22',
  'soft': '#775544',
  'hard': '#7766EE',
  'very-hard': '#FFCC33',
  'super-hard': '#FFAAFF',
};

export default function PokemonByName({ params }: { params: Params }) {
  const { pokemon, evolutions, target, berries, sprite, feed, modalRechoose, onFeedBerry, onRechoosePokemon, onEvolvePokemon, isFetchingPokemon, isFetchingBerry } = useViewModel(params.name);
  const clsSprite = `${styles.spriteSides} ${sprite.cardSprite < 0 ? 'card-flip' : 'card-flipped'}`;
  const clsSpriteBack = `${styles.spriteSides} ${sprite.cardSprite < 0 ? 'card-flipped' : 'card-flip'}`;
  const clsSpriteImg = ({
    'GOOD': 'animate-feed-shake',
    'BAD': 'animate-feed-sick',
    '': 'animate-none',
  })[feed.berryTaste];
  const evolutionProgress = (target.pokemon && pokemon) ? (pokemon?.weight * 100 / target.pokemon.baseWeight) : 0;
  return (
    <main className={styles.main}>
      {(isFetchingPokemon || !pokemon) ? <Spinner /> : (
        <>
          <header>
            <h1 className="text-[3rem] font-[700] mr-[-3rem] flex-1 text-center">{pokemon?.name}</h1>
            <button onClick={modalRechoose.open} className="size-[3rem] p-[0.5rem] rounded-full bg-neutral-100 text-red-600">
              <CloseIcon />
            </button>
          </header>
          <div className={styles.sprite}>
            <div className={styles.spriteCard}>
              <div className={clsSprite}>
                <img className={clsSpriteImg} src={pokemon?.sprite} />
              </div>
              {evolutions.length && (
                <div className={clsSpriteBack}>
                  {evolutions.length === 1 ? (
                    <img className="silhouette" src={evolutions[0].sprite} />
                  ): (
                    evolutions.map(i => (
                      <label className={styles.evolutions} htmlFor={`evolve-${i.id}`} key={i.id}>
                        <input id={`evolve-${i.id}`} type="radio" name="evolve" checked={target.pokemon?.id === i.id} value={i.id} className="hidden" onChange={e => target.setTarget(evolutions.filter(i => i.id === e.target.value)[0])} />
                        <img src={i.sprite} title="?" className="silhouette" />
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
            <div
              className="size-[6rem] rounded-full shadow-xl absolute bottom-[-2rem] right-[-2rem] flex items-center justify-center"
              style={{ background: `conic-gradient(#84b7f2 0 ${evolutionProgress}%, transparent 0 100%)` }}
            >
              <button onClick={sprite.onFlipSprite} className="size-[5rem] bg-red-500 text-[2rem] font-[700] rounded-full">
                {pokemon?.evolvesTo.length}
              </button>
            </div>
            <p className="text-[1.5rem] bg-neutral-800 shadow-xl absolute bottom-[5.25rem] right-[-4rem] py-[0.25rem] px-[1rem] rounded-[0.5rem] animate-fade-out">
              {EVOLUTION[pokemon?.evolvesTo.length] || `This pokemon has ${pokemon.evolvesTo.length} evolutions!`}
              <span className="absolute bottom-[-1rem] right-[4.5rem] border-solid border-t-neutral-800 border-t-[1rem] border-x-transparent border-x-[1rem] border-b-0" />
            </p>
          </div>
          <div className={styles.types}>
            {pokemon?.types.map(i => (
              <span className="py-[0.25rem] px-[1rem] text-[1.5rem] uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: TYPES[i] || 'grey' }} key={i}>
                {i}
              </span>
            ))}
          </div>
          {(pokemon.weight >= target.pokemon?.weight!) && (
            <button onClick={() => onEvolvePokemon(target.pokemon?.nameSlug!)} className={styles.btnEvolve}>
              Evolve
            </button>
          )}
          <table>
            <tbody>
              {pokemon?.stats.map((i, idx) => STATS[i.name] && (
                <tr key={idx}>
                  <td className="pr-[2rem]">{STATS[i.name]}</td>
                  <td>{i.value}</td>
                </tr>
              ))}
              <tr>
                <td className="pr-[2rem]">Weight</td>
                <td>{pokemon?.weight}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <footer>
        {isFetchingBerry ? <Spinner /> : (
          <div className={styles.berries}>
            {berries.map(i => i.id && (
              <label htmlFor={`berry-${i.id}`} key={i.id} style={{ backgroundColor: BERRY_BG[i.firmness] || 'white' }}>
                <input id={`berry-${i.id}`} type="radio" name="berry" value={i.id} className="hidden" onChange={feed.select} />
                <img src={i.sprite} title={i.name} className="size-[3rem] m-[1rem]" />
              </label>
            ))}
          </div>
        )}
        <button disabled={!feed.selected} onClick={onFeedBerry} className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-red-600 text-white font-[700] tracking-[0.125rem] shadow-2xl">
          Feed Pokemon
        </button>
      </footer>
      <div className="overlay" style={{ display: modalRechoose.isOpen ? 'block' : 'none' }}>
        <div className={modalRechoose.isFading ? 'modal fading' : 'modal'}>
          <h3 className="text-[2rem] font-[700]">Are you sure you want to change your Pokemon?</h3>
          <p className="text-[1.5rem]">Your progress will reset</p>
          <footer className="flex items-center justify-between mt-[2rem]">
            <button onClick={modalRechoose.close} className="flex-1 text-[2rem] font-[700]">
              No
            </button>
            <button onClick={onRechoosePokemon} className="flex-1 text-[2rem] font-[700]">
              Yes
            </button>
          </footer>
        </div>
      </div>
    </main>
  )
}
