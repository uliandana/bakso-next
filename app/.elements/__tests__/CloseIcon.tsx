import React from 'react';
import { describe, expect, test } from '@jest/globals';
import ShallowRenderer from 'react-test-renderer/shallow';
import CloseIcon from '../CloseIcon';

describe('./elements/CloseIcon', () => {
  test('renders', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<CloseIcon />);
    expect(tree).toMatchSnapshot();
  });
});
