import { Berry } from '@/Domain/Model/Berry';
import BerryDataSource from '../BerryDataSource';

type BerryApiListResult = {
  name: string,
  url: string,
};

const urlSprite: (id: string) => string = (id) => `
  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/berries/${id}-berry.png
`

export default class BerryAPIDataSourceImpl implements BerryDataSource {
  async getBerry() {
    const res = await fetch(`https://pokeapi.co/api/v2/berry?limit=100`);
    const resHandle: Promise<Berry[]> = new Promise(async resolve => {
      if (!res.ok) {
        resolve([]);
      }
      const { results }: { results: BerryApiListResult[]} = await res.json();
      resolve(results.map(p => ({
        id: p.url.split('/')[6],
        name: p.name,
        get sprite() {
          return urlSprite(this.name)
        },
        type: '',
      })));
    });
    return resHandle;
  }
}