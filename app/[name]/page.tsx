'use client'
import Berries from './_components/berries.pokemon';
import styles from './styles.module.css';
import Header from './_components/header.pokemon';
import BtnEvolve from './_components/btnevolve.pokemon';
import Types from './_components/types.pokemon';
import Sprites from './_components/sprites.pokemon';
import useViewModel from './viewmodel';
import Stats from './_components/stats.pokemon';
import BtnFeed from './_components/btnfeed.pokemon';

type Params = {
  name: string,
}

export default function PokemonByName({ params }: Readonly<{ params: Params }>) {
  const { pokemon, evolutions, target, berries, sprite, feed, modalRechoose, onFeedBerry, onRechoosePokemon, onEvolvePokemon, isFetchingPokemon, isFetchingBerry } = useViewModel(params.name);

  return (
    <main className={styles.main}>
      <Header pokemon={pokemon} modalRechoose={modalRechoose} />
      <Sprites pokemon={pokemon} target={target} sprite={sprite} feed={feed} evolutions={evolutions} isFetchingPokemon={isFetchingPokemon} />
      <Types pokemon={pokemon} />
      <BtnEvolve pokemon={pokemon} target={target} onEvolvePokemon={onEvolvePokemon} />
      <Stats pokemon={pokemon} isFetchingPokemon={isFetchingPokemon} />
      <footer>
        <Berries isFetchingBerry={isFetchingBerry} berries={berries} onSelect={feed.select} />
        <BtnFeed pokemon={pokemon} feed={feed} onFeedBerry={onFeedBerry} isFetchingPokemon={isFetchingPokemon} />
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
