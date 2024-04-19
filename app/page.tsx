'use client'
import useViewModel from './viewmodel';
import BackIcon from '@/app/.elements/BackIcon';
import Spinner from '@/app/.elements/Spinner';
import Image from 'next/image';
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
      <ul>
        {pokemons.map((poke, idx) => (
          <li data-pokemon={idx + 1} key={poke.id} className={styles.item} role="checkbox"
            style={{
              backgroundColor: poke.bgColor,
              border: (select.value === poke.nameSlug ? '0.0625rem solid gold' : ''),
            }}
            onClick={() => select.onSelectCard(poke.nameSlug)}
          >
            <Image src={poke.sprite} width={475} height={475} alt={poke.name} priority={idx < 100} />
            <p>{poke.name}</p>
          </li>
        ))}
        {isFetching && (
          <li className={styles.loading}>
            <Spinner />
          </li>
        )}
      </ul>
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
