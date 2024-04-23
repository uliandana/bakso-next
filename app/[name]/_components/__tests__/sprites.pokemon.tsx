import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import Sprites, { SpritesProps } from '../sprites.pokemon';

const props: SpritesProps = {
  pokemon: dummyPokemon,
  target: {
    pokemon: dummyPokemon,
    setTarget: jest.fn(),
  },
  sprite: {
    cardSprite: 19,
    onFlipSprite: jest.fn(),
  },
  feed: {
    select: jest.fn(),
    selected: '1',
    berryTaste: 'GOOD',
  },
  evolutions: [],
  isFetchingPokemon: false,
};

describe('./app/[name]/_components/sprites.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<Sprites {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
