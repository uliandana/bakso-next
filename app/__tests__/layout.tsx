import React from 'react';
import { describe, expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import Layout, { metadata } from '../layout';

describe('./app/layout', () => {
  test('renders', () => {
    const tree = createRenderer().render(
      <Layout>
        <div />
      </Layout>
    );
    expect(tree).toMatchSnapshot();
    expect(metadata.title).toBe('PokeDiet');
  });
});
