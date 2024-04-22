import { Dispatch, SetStateAction } from 'react';
import { Pokemon } from '../viewmodel';

type ButtonChooseProps = {
  select: {
    value: Pokemon['nameSlug'],
  },
  onChoosePokemon: () => Promise<void>,
};

export default function ButtonChoose(props: Readonly<ButtonChooseProps>) {
  const { select, onChoosePokemon } = props;

  if (!select.value) {
    return null;
  }

  return (
    <footer>
      <button onClick={onChoosePokemon}>
        I Choose You!
      </button>
    </footer>
  );
}
