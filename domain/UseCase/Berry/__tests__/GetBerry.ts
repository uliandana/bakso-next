import { describe, expect, jest, test } from '@jest/globals';
import { BerryRepository } from '@/domain/Repository/BerryRepository';
import { Berry } from '@/domain/Model/Berry';
import { GetBerry } from '../GetBerry';

describe('./domain/UseCase/Berry/GetBerry', () => {
  test('invoked', async () => {
    const berry: Berry = {
      id: '1',
      name: 'fruit',
      sprite: 'url',
      firmness: 'hard',
    };
    const getBerry = jest.fn<() => Promise<Berry[]>>().mockResolvedValue([berry]);
    const berryRepository: BerryRepository = {
      getBerry,
    };
    const getBerryImplementation = new GetBerry(berryRepository);
    const result = await getBerryImplementation.invoke();
    expect(result[0]).toBe(berry);
  });
});
