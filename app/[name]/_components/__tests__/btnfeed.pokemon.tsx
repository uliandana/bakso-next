import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import BtnFeed, { BtnFeedProps } from '../btnfeed.pokemon';

const props: BtnFeedProps = {
  pokemon: dummyPokemon,
  feed: {
    select: jest.fn(),
    selected: '01',
    berryTaste: 'GOOD',
  },
  onFeedBerry: jest.fn(),
  isFetchingPokemon: false,
};

describe('./app/[name]/_components/btnfeed.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<BtnFeed {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null when pokemon data empty', () => {
    const newProps: BtnFeedProps = {
      ...props,
      pokemon: undefined,
    };
    const res = BtnFeed(newProps);
    expect(res).toBe(null);
  });
});
