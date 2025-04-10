const CACHE_NAME = `leitner-504-cache-v${Date.now()}`;
const urlsToCache = [
  './', // Cache the root URL
  './index.html',
  './style.css',
  './script.js',
  './words.js',
  './app.js',
  './manifest.json',
  // Add paths to icons if you have them, e.g.:
  './images/icons/icon-192x192.png',
  './images/icons/icon-512x512.png',
  './offline.html'  // Add offline fallback page
];

// Install event: Cache the core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache resources:', error);
          // Continue installation even if some resources fail to cache
          return Promise.resolve();
        });
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients as soon as the service worker activates
      return self.clients.claim();
    })
  );
});

// Fetch event: Serve cached assets first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it's also a stream
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Don't cache responses for non-GET requests or chrome-extension:// URLs
                if (event.request.method === 'GET' && 
                    !event.request.url.startsWith('chrome-extension://') &&
                    !event.request.url.includes('chrome-extension')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(error => {
          console.error('Fetch failed:', error);
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
          // For other requests, return a custom offline response
          return new Response(
            JSON.stringify({ error: 'You are offline' }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        });
      })
  );
});
