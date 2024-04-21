import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import Spinner from '../Spinner';

describe('./_elements/Spinner', () => {
  test('renders', () => {
    const tree = createRenderer().render(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
