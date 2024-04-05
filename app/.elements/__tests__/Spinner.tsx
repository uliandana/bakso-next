import React from 'react';
import { describe, expect, test } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../Spinner';

describe('./elements/Spinner', () => {
  test('renders', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
