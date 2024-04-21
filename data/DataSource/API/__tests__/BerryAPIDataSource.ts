/**
  * @jest-environment node
*/
import { describe, expect, jest, test } from '@jest/globals';
import BerryAPIDataSourceImpl, { BerryApiDetailResult } from '../BerryAPIDataSource';

describe('./data/DataSource/API/BerryAPIDataSource', () => {
  test('getBerry: success result', async () => {
    jest.spyOn(global, 'fetch');
    const dummyBerry: BerryApiDetailResult = {
      id: 1,
      name: 'banana',
      firmness: {
        name: 'soft',
      },
    };
    const responseAll = {
      ok: true,
      json: async () => ({
        results: [{ url: 'url' }],
      }),
    };
    const responseDetail = {
      ok: true,
      json: async () => dummyBerry,
    };
    (global.fetch as jest.Mock)
      .mockImplementationOnce(async () => responseAll)
      .mockImplementation(async () => responseDetail);

    const Implementation = new BerryAPIDataSourceImpl();

    const berries = await Implementation.getBerry();
    expect(berries[0].name).toBe(dummyBerry.name);
  });

  test('getBerry: failed result', async () => {
    jest.spyOn(global, 'fetch');
    const responseAll = {
      ok: false,
    };
    (global.fetch as jest.Mock).mockImplementation(async () => responseAll);

    const Implementation = new BerryAPIDataSourceImpl();

    const berries = await Implementation.getBerry();
    expect(berries.length).toBe(0);
  });
});
