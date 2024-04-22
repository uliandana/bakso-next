'use client'
import useViewModel from './viewmodel';
import Header from './_components/header.root';
import List from './_components/list.root';
import ButtonChoose from './_components/buttonchoose.root';
import styles from './styles.module.css';
import ScrollTop from './_components/scrolltop.root';

export default function Root() {
  const { pokemons, select, onChoosePokemon, isFetching, search, scrollTop } = useViewModel();

  return (
    <main className={styles.main} ref={scrollTop.ref}>
      <Header search={search} />
      <List pokemons={pokemons} isFetching={isFetching} select={select} />
      <ButtonChoose select={select} onChoosePokemon={onChoosePokemon} />
      <ScrollTop scrollTop={scrollTop} />
    </main>
  )
}
