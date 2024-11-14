const CACHE = 'v1';

const precachedResources = [];

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
  const isHost = ['bakso-next.vercel.app'].includes(host);
  if (cachedResponse && !isHost) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok && request.url.startsWith('http')) {
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
