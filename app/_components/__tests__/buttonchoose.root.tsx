import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import ButtonChoose from '../buttonchoose.root';

describe('./app/_components/buttonchoose.root', () => {
  test('renders', () => {
    const select = {
      value: 'pikachu',
    };
    const onChoosePokemon = async () => {};
    const tree = createRenderer().render(<ButtonChoose select={select} onChoosePokemon={onChoosePokemon} />);
    expect(tree).toMatchSnapshot();
  });

  test('render null when no pokemon selected', () => {
    const select = {
      value: '',
    };
    const onChoosePokemon = async () => {};
    const res = ButtonChoose({ select, onChoosePokemon });
    expect(res).toBe(null);
  });
});
