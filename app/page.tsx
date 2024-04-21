'use client'
import useViewModel from './viewmodel';
import BackIcon from '@/app/_elements/BackIcon';
import Spinner from '@/app/_elements/Spinner';
import styles from './styles.module.css';

export default function Root() {
  const { pokemons, select, onChoosePokemon, isFetching, search, scrollTop } = useViewModel();

  return (
    <main className={styles.main} ref={scrollTop.ref}>
      <header>
        <h1>Choose Your Pokemon</h1>
        <input
          value={search.value}
          type="search"
          placeholder="Search pokemon"
          onChange={e => search.setSearch(e.target.value)}
        />
      </header>
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
      {select.value && (
        <footer>
          <button onClick={onChoosePokemon}>
            I Choose You!
          </button>
        </footer>
      )}
      <button onClick={scrollTop.invoke} className={styles.btnScrollTop}>
        <BackIcon className="rotate-90" />
      </button>
    </main>
  )
}
