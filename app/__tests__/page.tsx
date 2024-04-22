import { describe, expect, test } from '@jest/globals';
import Page from '../page';

describe('./app/page', () => {
  test('cover import by check module type', () => {
    expect(typeof Page).toBe('function');
  });
});
