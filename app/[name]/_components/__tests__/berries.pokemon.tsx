import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import Spinner from '@/app/_elements/Spinner';
import { Berry } from '@/domain/Model/Berry';
import { createRenderer } from 'react-test-renderer/shallow';
import Berries from '../berries.pokemon';

const dummyBerry: Berry = {
  id: '1',
  name: 'banana',
  sprite: 'url',
  firmness: 'soft',
};

describe('./app/[name]/_components/berries.pokemon', () => {
  test('renders', () => {
    const onSelect = jest.fn();
    const tree = createRenderer().render(<Berries isFetchingBerry={false} berries={[dummyBerry]} onSelect={onSelect} />);
    expect(tree).toMatchSnapshot();
  });

  test('render spinner', () => {
    const onSelect = jest.fn();
    const props = {
      isFetchingBerry: true,
      berries: [dummyBerry],
      onSelect,
    };
    const res = Berries(props);
    expect(res.type).toBe(Spinner);
  });

  test('render bg white', () => {
    const onSelect = jest.fn();
    const newBerry: Berry = {
      ...dummyBerry,
      firmness: '',
    };
    const props = {
      isFetchingBerry: false,
      berries: [newBerry],
      onSelect,
    };
    const res = Berries(props);
    expect(res.props.children[0].props.style.backgroundColor).toBe('white');
  });
});
