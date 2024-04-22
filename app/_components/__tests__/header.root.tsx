import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import Header from '../header.root';

describe('./app/_components/header.root', () => {
  test('renders', () => {
    const search = {
      value: 'pika',
      setSearch: jest.fn(),
    };
    const tree = createRenderer().render(<Header search={search} />);
    expect(tree).toMatchSnapshot();
  });

  test('trigger event when input search onchanged', () => {
    const search = {
      value: 'pika',
      setSearch: jest.fn(),
    };
    const res = Header({ search });
    const input = res.props.children[1];
    input.props.onChange({
      target: {
        value: 'mew',
      },
    });
    expect(search.setSearch).toBeCalledWith('mew');
  });
});
