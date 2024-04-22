import { Dispatch, SetStateAction } from 'react';

type HeaderProps = {
  search: {
    value: string,
    setSearch: Dispatch<SetStateAction<string>>,
  },
};

export default function Header(props: Readonly<HeaderProps>) {
  const { search } = props;
  return (
    <header>
      <h1>Choose Your Pokemon</h1>
      <input
        value={search.value}
        type="search"
        placeholder="Search pokemon"
        onChange={e => search.setSearch(e.target.value)}
      />
    </header>
  );
}