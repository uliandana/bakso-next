import { Berry } from '@/domain/Model/Berry';
import BerryDataSource from '@/data/DataSource/BerryDataSource';

type BerryApiListResult = {
  name: string,
  url: string,
};

type BerryApiDetailResult = {
  firmness: {
    name: 'very-soft' | 'soft' | 'hard' | 'very-hard' | 'super-hard' | string,
  },
  id: number,
  name: string,
};

const urlSprite: (name: string) => string = (name) => `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/${name}-berry.png
`

export default class BerryAPIDataSourceImpl implements BerryDataSource {
  async getBerry() {
    const res = await fetch(`https://pokeapi.co/api/v2/berry?limit=100`);
    const resHandle: Promise<Berry[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const { results }: { results: BerryApiListResult[]} = await res.json();
      const resDetail = await Promise.all(results.map(async i => await fetch(i.url)));
      resolve(await Promise.all(resDetail.map(async i => {
        const res: Berry = {
          id: '',
          name: '',
          sprite: '',
          firmness: '',
        };
        if (i.ok) {
          const detail: BerryApiDetailResult = await i.json();
          res.id = detail.id.toString();
          res.name = detail.name;
          res.sprite = urlSprite(detail.name);
          res.firmness = detail.firmness.name;
        }
        return res;
      })));
    });
    return resHandle;
  }
}