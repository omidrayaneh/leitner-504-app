const CACHE_NAME = 'leitner-504-cache-v1';
const urlsToCache = [
  '/', // Cache the root URL
  '/index.html',
  '/style.css',
  '/script.js',
  '/words.js',
  '/manifest.json',
  // Add paths to icons if you have them, e.g.:
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png'
];

// Install event: Cache the core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // AddAll will fail if any resource fails to fetch
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache one or more resources:', error);
          // Decide if installation should fail or proceed without some assets
          // For essential assets, it might be better to let it fail
        });
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
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

        // Clone the request because it's a stream and can only be consumed once.
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
                 if (event.request.method === 'GET' && !event.request.url.startsWith('chrome-extension://')) {
                    cache.put(event.request, responseToCache);
                 }
              });

            return response;
          }
        ).catch(error => {
            console.error('Fetch failed; returning offline page instead.', error);
            // Optionally, return a fallback offline page if network fails
            // return caches.match('/offline.html');
        });
      })
    );
});
