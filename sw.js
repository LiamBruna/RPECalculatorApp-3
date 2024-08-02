<<<<<<< HEAD
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/icon.png',
        '/_expo/static/js/web/AppEntry-b5b05a17cb04052b3e5c2a3d92d66da7.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
=======
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/icon.png',
        '/_expo/static/js/web/AppEntry-b5b05a17cb04052b3e5c2a3d92d66da7.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
>>>>>>> aab3ff1ad5b085a3a09f01067e3f1b90d668939f
