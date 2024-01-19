const CACHE = 'v1';
const POKEMON_LIMIT = 100;

const pokemonSprites = Array.apply(null, { length: POKEMON_LIMIT });
const precachedResources = [
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=100',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=300',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=400',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=500',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=600',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=700',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=800',
  'https://pokeapi.co/api/v2/pokemon?limit=100&offset=900',
  'https://pokeapi.co/api/v2/pokemon?limit=10&offset=1000',
  ...pokemonSprites.map((_, idx) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idx + 1}.png`),
];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE);
  await cache.addAll(resources);
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache(precachedResources),
  );
});

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  if (precachedResources.includes(event.request)) {
    event.respondWith(cacheFirst(event.request));
  }
});
