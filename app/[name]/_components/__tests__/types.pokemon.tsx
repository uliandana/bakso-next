
import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import Types, { TypesProps } from '../types.pokemon';

const props: TypesProps = {
  pokemon: {
    ...dummyPokemon,
    types: ['bug'],
  },
};

describe('./app/[name]/_components/types.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<Types {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty div when pokemon data empty', () => {
    const newProps: TypesProps = {
      ...props,
      pokemon: undefined,
    };
    const res = Types(newProps);
    expect(res.type).toBe('div');
    expect(res.props.children).toBe(undefined);
  });
});
