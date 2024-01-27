const CACHE = 'v1';
const POKEMON_LIMIT = 30;

const pokemonSprites = Array.apply(null, { length: POKEMON_LIMIT });
const precachedResources = [
  'https://pokeapi.co/api/v2/pokemon?limit=1500',
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
  const { host } = new URL(request.url);
  const isHost = ['pokeapp-next-eta.vercel.app'].includes(host);
  if (cachedResponse && !isHost) {
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
  event.respondWith(cacheFirst(event.request));
});
