import { describe, expect, jest, test } from '@jest/globals';
import ProgressLocalStorageDataSourceImpl, { KEY_CHOSEN, KEY_WEIGHT } from '../ProgressLocalStorageDataSource';

describe('./data/DataSource/LocalStorage', () => {
  test('ProgressLocalStorageDataSourceImpl', async () => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
    
    Storage.prototype.getItem = jest.fn<(key: string) => string>();
    Storage.prototype.setItem = jest.fn<(key: string, value: string) => void>();

    const Implementation = new ProgressLocalStorageDataSourceImpl();

    const chosen = await Implementation.getChosenPokemon();
    expect(chosen).toBe('');

    await Implementation.setChosenPokemon('pikachu');
    expect(localStorage.setItem).lastCalledWith(KEY_CHOSEN, 'pikachu');

    const weight = await Implementation.getWeightProgress();
    expect(weight).toBe(0);

    await Implementation.setWeightProgress(100);
    expect(localStorage.setItem).lastCalledWith(KEY_WEIGHT, '100');
  });
});
