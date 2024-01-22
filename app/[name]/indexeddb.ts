import { Berry } from '@/Domain/Model/Berry';

const DB_NAME = 'pokeapp';
const DB_VERSION = 1;

const DB_STORE = {
  BERRY: 'berry',
};

export const storeBerry: (data: Berry[]) => void = (data) => {
  const req = window?.indexedDB?.open?.(DB_NAME, DB_VERSION);
  
  if (!req) {
    return;
  }

  req.onerror = e => {
    console.error(e);
  }

  req.onupgradeneeded = () => {
    const db = req.result;
    const objStore = db.createObjectStore(DB_STORE.BERRY, { keyPath: 'id' });

    objStore.createIndex('name', 'name', { unique: false });
    objStore.createIndex('firmness', 'firmness', { unique: false });

    objStore.transaction.oncomplete = () => {
      const obj = db.transaction(DB_STORE.BERRY, 'readwrite').objectStore(DB_STORE.BERRY);
      data.forEach(i => {
        obj.add({
          id: i.id,
          name: i.name,
          firmness: i.firmness,
        });
      });
    };
  }
};

type cb = (data: Berry[]) => Berry[];
export const getStoredBerry: (cb: cb) => void = (cb) => {
  const req = window?.indexedDB?.open?.(DB_NAME, DB_VERSION);
  
  if (!req) {
    return;
  }

  req.onerror = e => {
    console.error(e);
  }

  req.onsuccess = () => {
    const db = req.result;
    const getAll = db
      .transaction(DB_STORE.BERRY)
      .objectStore(DB_STORE.BERRY)
      .getAll();

    getAll.onsuccess = e => {
      console.log(e.target);
    };

    getAll.onerror = e => {
      console.error(e);
    };
  }
};