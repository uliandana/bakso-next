'use client'
import CloseIcon from '@/app/.elements/CloseIcon';
import Spinner from '@/app/.elements/Spinner';
import TYPES from '@/app/.utils/pokemonTypeColor';
import useViewModel, { STATS } from './viewmodel';
import Berries from './.components/berries.pokemon';
import Evolutions from './.components/evolutions.pokemon';
import styles from './styles.module.css';

type Params = {
  name: string,
}

export default function PokemonByName({ params }: Readonly<{ params: Params }>) {
  const { pokemon, evolutions, target, berries, sprite, feed, modalRechoose, onFeedBerry, onRechoosePokemon, onEvolvePokemon, isFetchingPokemon, isFetchingBerry } = useViewModel(params.name);

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
          <div className={styles.types}>
            {pokemon?.types.map(i => (
              <span className="py-[0.25rem] px-[1rem] text-[1.5rem] uppercase rounded-[0.5rem] font-mono" style={{ backgroundColor: TYPES[i] || 'grey' }} key={i}>
                {i}
              </span>
            ))}
          </div>
          {(pokemon.weight >= target.pokemon?.weight!) && (
            <button onClick={() => onEvolvePokemon(target.pokemon?.nameSlug)} className={styles.btnEvolve}>
              Evolve
            </button>
          )}
          <table>
            <tbody>
              {pokemon?.stats.map(i => STATS[i.name] && (
                <tr key={i.name}>
                  <td className="pr-[2rem]">{STATS[i.name]}</td>
                  <td>{i.value}</td>
                </tr>
              ))}
              <tr>
                <td className="pr-[2rem]">Weight</td>
                <td>{pokemon?.weight} Kg</td>
              </tr>
            </tbody>
          </table>
          <footer>
            <Berries isFetchingBerry={isFetchingBerry} berries={berries} onSelect={feed.select} />
            <button disabled={!feed.selected} onClick={onFeedBerry} className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-red-600 text-white font-[700] tracking-[0.125rem] shadow-2xl">
              Feed Pokemon
            </button>
          </footer>
        </>
      )}
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
