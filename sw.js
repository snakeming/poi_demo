// Service Worker for Taiwan Travel Handbook
// Uses workbox for caching strategies

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.1.0/workbox-sw.js');

if (workbox) {
  console.log('[SW] Workbox loaded successfully');

  // Cache static assets at runtime (since we can't use build-time injection)
  workbox.routing.registerRoute(
    ({ request }) => ['document', 'script', 'style', 'image', 'font'].includes(request.destination),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-assets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        }),
      ],
    })
  );

  // Cache Google Fonts stylesheets
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/i,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-stylesheets',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        }),
      ],
    })
  );

  // Cache Google Fonts webfont files
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/.*/i,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        }),
      ],
    })
  );

  // Cache OpenStreetMap tiles
  workbox.routing.registerRoute(
    /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
    new workbox.strategies.CacheFirst({
      cacheName: 'osm-tiles',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

  console.log('[SW] Routes registered');
} else {
  console.error('[SW] Workbox failed to load');
}
