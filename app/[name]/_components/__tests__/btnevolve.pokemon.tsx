import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import BtnEvolve, { BtnEvolveProps } from '../btnevolve.pokemon';

const props: BtnEvolveProps = {
  pokemon: dummyPokemon,
  target: {
    pokemon: dummyPokemon,
    setTarget: jest.fn(),
  },
  onEvolvePokemon: jest.fn(),
};

describe('./app/[name]/_components/btnevolve.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<BtnEvolve {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null when evolve not ready', () => {
    const newProps: BtnEvolveProps = {
      ...props,
      pokemon: undefined,
    };
    const res = BtnEvolve(newProps);
    expect(res).toBe(null);
  });

  test('trigger onevolve when button clicked', () => {
    const newProps: BtnEvolveProps = {
      ...props,
      onEvolvePokemon: jest.fn(),
    };
    const res = BtnEvolve(newProps);
    if (res) {
      res.props.onClick();
      expect(newProps.onEvolvePokemon).lastCalledWith(newProps.target.pokemon?.nameSlug);
    }
  });
});
