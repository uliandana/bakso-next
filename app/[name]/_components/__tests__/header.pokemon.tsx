import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { dummyPokemon } from '../../viewmodel';
import Header, { HeaderProps } from '../header.pokemon';

const props: HeaderProps = {
  pokemon: dummyPokemon,
  modalRechoose: {
    isOpen: false,
    isFading: false,
    open: jest.fn(),
    close: jest.fn(),
  },
};

describe('./app/[name]/_components/header.pokemon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<Header {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render empty header when pokemon data empty', () => {
    const newProps: HeaderProps = {
      ...props,
      pokemon: undefined,
    };
    const res = Header(newProps);
    expect(res.type).toBe('header');
    expect(res.props.children).toBe(undefined);
  });
});
