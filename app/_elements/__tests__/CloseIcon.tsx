import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import CloseIcon from '../CloseIcon';

describe('./_elements/CloseIcon', () => {
  test('renders', () => {
    const tree = createRenderer().render(<CloseIcon />);
    expect(tree).toMatchSnapshot();
  });
});
