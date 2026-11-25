/* =========================================================
   RUWA JURAI — Service worker (PWA shell)
   Precache core assets; runtime cache for navigation + fonts fallback.
   ========================================================= */
const VERSION = 'ruwa-jurai-2026-1';
const CORE = [
  './',
  './index.html',
  './ensiklopedia.html',
  './kuliner.html',
  './peta.html',
  './gawi.html',
  './kamus.html',
  './agenda.html',
  './tentang.html',
  './manifest.webmanifest',
  './assets/css/base.css',
  './assets/css/components.css',
  './assets/css/pages.css',
  './assets/css/interior.css',
  './assets/css/games.css',
  './assets/js/data.js',
  './assets/js/app.js',
  './assets/js/home.js',
  './assets/js/ensiklopedia.js',
  './assets/js/kuliner.js',
  './assets/js/peta.js',
  './assets/js/gawi.js',
  './assets/js/kamus.js',
  './assets/js/agenda.js',
  './assets/js/tentang.js',
  './assets/js/aksara.js',
  './assets/js/illustrations.js',
  './assets/js/icons.js',
  './assets/js/glyphs.js',
  './assets/js/map-data.js',
  './assets/fonts/fonts.css',
  './assets/fonts/fraunces-latin.woff2',
  './assets/fonts/fraunces-latin-ext.woff2',
  './assets/fonts/fraunces-italic-latin.woff2',
  './assets/fonts/fraunces-italic-latin-ext.woff2',
  './assets/fonts/jakarta-latin.woff2',
  './assets/fonts/jakarta-latin-ext.woff2',
  './assets/img/favicon.svg',
  './assets/img/og-ruwa-jurai.svg',
  './assets/img/icon.svg',
  './assets/img/icon-192.png',
  './assets/img/icon-512.png',
  './assets/img/icon-maskable.svg',
  './assets/img/icon-maskable-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('rj-shell-' + VERSION).then((cache) => cache.addAll([...CORE])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !k.startsWith('rj-shell-' + VERSION)).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open('rj-shell-' + VERSION).then((c) => c.put('./', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./'))
        .then((cached) => cached || Response.error())
    );
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).then((res) => {
        const copy = res.clone();
        caches.open('rj-shell-' + VERSION).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      });
    })
  );
});
