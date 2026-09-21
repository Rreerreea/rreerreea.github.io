// Service Worker v5 — force update
const CACHE_NAME = "portfolio-v5";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // Network first for all requests
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
