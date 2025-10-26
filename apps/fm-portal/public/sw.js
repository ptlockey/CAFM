importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.6.0/workbox-sw.js");

if (self.workbox) {
  self.workbox.setConfig({ debug: false });
  self.workbox.core.skipWaiting();
  self.workbox.core.clientsClaim();

  self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  self.workbox.routing.registerRoute(
    ({ request }) => ["document", "script", "style"].includes(request.destination),
    new self.workbox.strategies.NetworkFirst({ cacheName: "pages" }),
  );

  self.workbox.routing.registerRoute(
    ({ request }) => request.destination === "image",
    new self.workbox.strategies.CacheFirst({
      cacheName: "images",
      plugins: [
        new self.workbox.expiration.ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }),
      ],
    }),
  );

  self.workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/api/"),
    new self.workbox.strategies.StaleWhileRevalidate({ cacheName: "api" }),
  );
}
