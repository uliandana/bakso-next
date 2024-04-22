import React from 'react';
import { describe, expect, jest, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import ScrollTop from '../scrolltop.root';

describe('./app/_components/scrolltop.root', () => {
  test('renders', () => {
    const scrollTop = {
      invoke: jest.fn(),
    };
    const tree = createRenderer().render(<ScrollTop scrollTop={scrollTop} />);
    expect(tree).toMatchSnapshot();
  });
});
