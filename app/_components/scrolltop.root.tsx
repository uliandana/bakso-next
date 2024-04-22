import BackIcon from '@/app/_elements/BackIcon';
import styles from '../styles.module.css';

type ScrollTopProps = {
  scrollTop: {
    invoke: () => void,
  },
};

export default function ScrollTop(props: Readonly<ScrollTopProps>) {
  const { scrollTop } = props;
  return (
    <button onClick={scrollTop.invoke} className={styles.btnScrollTop}>
      <BackIcon className="size-10 rotate-90" />
    </button>
  );
}