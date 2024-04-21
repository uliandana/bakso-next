import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import BackIcon from '../BackIcon';

describe('./_elements/BackIcon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<BackIcon />);
    expect(tree).toMatchSnapshot();
  });
});
