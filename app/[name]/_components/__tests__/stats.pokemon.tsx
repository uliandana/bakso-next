
import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import Stats, { StatsProps } from '../stats.pokemon';

const props: StatsProps = {
  pokemon: {
    ...dummyPokemon,
    stats: [{ name: 'speed', value: 10 }],
  },
  isFetchingPokemon: false,
};

describe('./app/[name]/_components/stats.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<Stats {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty table when pokemon data empty', () => {
    const newProps: StatsProps = {
      ...props,
      pokemon: undefined,
    };
    const res = Stats(newProps);
    expect(res.type).toBe('table');
    expect(res.props.children).toBe(undefined);
  });
});
