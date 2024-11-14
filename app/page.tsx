'use client'
import Header from './_components/header.root';
import styles from './styles.module.css';

export default function Root() {
  return (
    <main className={styles.main}>
      <Header />
    </main>
  )
}
