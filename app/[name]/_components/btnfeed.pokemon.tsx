import viewmodel from '../viewmodel';

export type BtnFeedProps = {
  pokemon: ReturnType<typeof viewmodel>['pokemon'],
  feed: ReturnType<typeof viewmodel>['feed'],
  onFeedBerry: ReturnType<typeof viewmodel>['onFeedBerry'],
  isFetchingPokemon: ReturnType<typeof viewmodel>['isFetchingPokemon'],
};

export default function BtnFeed(props: Readonly<BtnFeedProps>) {
  const { pokemon, feed, onFeedBerry, isFetchingPokemon } = props;
  if (isFetchingPokemon || !pokemon) {
    return null;
  }
  return (
    <button disabled={!feed.selected} onClick={onFeedBerry} className="w-full py-[1rem] rounded-[3rem] text-[2rem] uppercase bg-red-600 text-white font-[700] tracking-[0.125rem] shadow-2xl">
      Feed Pokemon
    </button>
  );
}
