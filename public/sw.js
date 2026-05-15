const CACHE_NAME = 'voluntas-radio-v1';
const APP_SHELL = [
  '.',
  'index.html',
  '404.html',
  'favicon.ico',
  'site.webmanifest',
  'favicons/apple-touch-icon.png',
  'favicons/favicon-16x16.png',
  'favicons/favicon-32x32.png',
  'favicons/icon-144x144.png',
  'favicons/icon-192x192.png',
];

const toAbsoluteUrl = (path) => new URL(path, self.registration.scope).toString();

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL.map(toAbsoluteUrl));
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(toAbsoluteUrl('index.html')) || cache.match(toAbsoluteUrl('404.html'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkResponse = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }

          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkResponse;
    })
  );
});
