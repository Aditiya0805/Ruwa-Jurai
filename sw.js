/* =========================================================
   RUWA JURAI — Service worker (PWA shell)
   Precache core assets; runtime cache for navigation + fonts fallback.
   ========================================================= */
const VERSION = 'ruwa-jurai-2026-2';
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
  './assets/img/icon-maskable-512.png',
  './assets/img/dishes/seruit.webp',
  './assets/img/dishes/pindang-baung.webp',
  './assets/img/dishes/gulai-taboh.webp',
  './assets/img/dishes/engkak-ketan.webp',
  './assets/img/dishes/kemplang.webp',
  './assets/img/dishes/keripik-pisang.webp',
  './assets/img/dishes/lempok-durian.webp',
  './assets/img/dishes/kopi-robusta.webp',
  './assets/img/dishes/sambal-tempoyak.webp',
  './assets/img/entries/saibatin.svg',
  './assets/img/entries/pepadun.webp',
  './assets/img/entries/piil-pesenggiri.svg',
  './assets/img/entries/begawi.svg',
  './assets/img/entries/sekura.webp',
  './assets/img/entries/nyambai.svg',
  './assets/img/entries/cangget.svg',
  './assets/img/entries/sebambangan.svg',
  './assets/img/entries/ngakuk-majau.svg',
  './assets/img/entries/tapis.webp',
  './assets/img/entries/siger.webp',
  './assets/img/entries/sigeh-pengunten.webp',
  './assets/img/entries/bedana.svg',
  './assets/img/entries/melinting.svg',
  './assets/img/entries/gamolan-talo-balak.svg',
  './assets/img/entries/sastra-lisan.svg',
  './assets/img/entries/aksara-lampung.svg',
  './assets/img/entries/dialek-a-o.svg',
  './assets/img/entries/lamban-pesagi.svg',
  './assets/img/entries/kerajinan.svg',
  './assets/img/entries/pugung-raharjo.svg',
  './assets/img/entries/museum-lampung.svg',
  './assets/img/ingredients/lada.svg',
  './assets/img/ingredients/kopi.svg',
  './assets/img/ingredients/kakao.svg',
  './assets/img/ingredients/pisang.svg',
  './assets/img/ingredients/singkong.svg',
  './assets/img/ingredients/durian.svg',
  './assets/img/ingredients/terasi.svg',
  './assets/img/ingredients/tempoyak.svg',
  './assets/img/scenes/route-pesisir.svg',
  './assets/img/scenes/route-pedalaman.svg',
  './assets/img/scenes/route-sejarah.svg'
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
