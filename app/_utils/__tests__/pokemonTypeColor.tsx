import { describe, expect, test } from '@jest/globals';
import pokemonTypeColor from '../pokemonTypeColor';

describe('./_utils/pokemonTypeColor', () => {
  test('return color codes', () => {
    const color = pokemonTypeColor['bug'];
    expect(color.length).toBe(7);
    expect(color.charAt(0)).toBe('#');
  });
});
