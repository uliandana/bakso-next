import CloseIcon from '@/app/_elements/CloseIcon';
import viewmodel from '../viewmodel';

export type HeaderProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon']
  modalRechoose: ReturnType<typeof viewmodel>['modalRechoose'],
};

export default function Header(props: Readonly<HeaderProps>) {
  const { pokemon, modalRechoose } = props;
  if (!pokemon) {
    return <header />;
  }
  return (
    <header>
      <h1 className="text-[3rem] font-[700] mr-[-3rem] flex-1 text-center">{pokemon?.name}</h1>
      <button onClick={modalRechoose.open} className="size-[3rem] p-[0.5rem] rounded-full bg-neutral-100 text-red-600">
        <CloseIcon className='"size-10' />
      </button>
    </header>
  );
}
