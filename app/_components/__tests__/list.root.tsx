import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { Pokemon } from '@/app/viewmodel';
import { createRenderer } from 'react-test-renderer/shallow';
import List from '../list.root';

const dummyPokemon: Pokemon = {
  id: '10',
  nameSlug: 'pikachu',
  name: 'Pikachu',
  sprite: 'url',
  weight: 100,
  baseWeight: 100,
  bgColor: '#fff',
  stats: [],
  types: ['bug'],
  evolvesTo: [],
};

describe('./app/_components/list.root', () => {
  test('renders', () => {
    const select = {
      value: 'pikachu',
      onSelectCard: jest.fn(),
    };
    const tree = createRenderer().render(<List pokemons={[dummyPokemon]} isFetching={false} select={select} />);
    expect(tree).toMatchSnapshot();
  });

  test('no border when pokemon not selected', () => {
    const select = {
      value: 'mew',
      onSelectCard: jest.fn(),
    };
    const res = List({
      pokemons: [dummyPokemon],
      isFetching: false,
      select,
    });
    const label = res.props.children[0][0];
    expect(label.props.style.border).toBe('');
  });

  test('trigger event when pokemon selected', () => {
    const select = {
      value: 'mew',
      onSelectCard: jest.fn(),
    };
    const res = List({
      pokemons: [dummyPokemon],
      isFetching: false,
      select,
    });
    const label = res.props.children[0][0];
    const input = label.props.children[0];
    input.props.onChange();
    expect(select.onSelectCard).toBeCalledWith('pikachu');
  });
});
