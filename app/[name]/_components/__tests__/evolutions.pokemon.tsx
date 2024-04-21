import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { Pokemon } from '@/domain/Model/Pokemon';
import { createRenderer } from 'react-test-renderer/shallow';
import Evolutions from '../evolutions.pokemon';

const dummyPokemon: Pokemon = {
  id: '01',
  name: 'pikachu',
  nameSlug: 'pikachu',
  sprite: 'url',
  stats: [],
  types: ['bug'],
  baseWeight: 10,
  weight: 10,
  evolvesTo: [],
  bgColor: '#fff',
};

describe('./app/[name]/_components/evolutions.pokemon', () => {
  test('renders', () => {
    const onSelect = jest.fn();
    const tree = createRenderer().render(<Evolutions evolutions={[dummyPokemon]} className="test-class" targetId="01" onSelect={onSelect} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty', () => {
    const onSelect = jest.fn();
    const props = {
      evolutions: [],
      className: '',
      targetId: '',
      onSelect,
    };
    const res = Evolutions(props);
    expect(res).toBe(null);
  });

  test('render multi evolutions and trigger onSelect', () => {
    const onSelect = jest.fn();
    const props = {
      evolutions: [dummyPokemon, dummyPokemon],
      className: '',
      targetId: '',
      onSelect,
    };
    const res = Evolutions(props);
    expect(res?.props.children.length).toBe(2);
    const e = {
      target: {
        value: '0',
      },
    };
    res?.props.children[0].props.children[0].props.onChange(e);
    expect(props.onSelect).toHaveBeenCalled();
  });
});
