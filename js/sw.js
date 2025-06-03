self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
    if (event.preloadResponse) {
        event.respondWith(
            event.preloadResponse.catch(() => fetch(event.request))
        );
    }
});
