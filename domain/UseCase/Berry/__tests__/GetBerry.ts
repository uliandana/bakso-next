import { describe, expect, jest, test } from '@jest/globals';
import { BerryRepository } from '@/domain/Repository/BerryRepository';
import { Berry } from '@/domain/Model/Berry';
import { getBerry } from '../getBerry';

describe('./domain/UseCase/Berry/getBerry', () => {
  test('invoked', async () => {
    const berry: Berry = {
      id: '1',
      name: 'fruit',
      sprite: 'url',
      firmness: 'hard',
    };
    const getBerryMock = jest.fn<() => Promise<Berry[]>>().mockResolvedValue([berry]);
    const berryRepository: BerryRepository = {
      getBerry: getBerryMock,
    };
    const getBerryImplementation = getBerry(berryRepository);
    const result = await getBerryImplementation.invoke();
    expect(result[0]).toBe(berry);
  });
});
