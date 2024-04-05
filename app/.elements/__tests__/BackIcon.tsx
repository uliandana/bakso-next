import React from 'react';
import { describe, expect, test } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow';
import BackIcon from '../BackIcon';

describe('./elements/BackIcon', () => {
  test('renders', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<BackIcon />);
    expect(tree).toMatchSnapshot();
  });
});
