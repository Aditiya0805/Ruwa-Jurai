/* RUWA JURAI — PWA service worker registration */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(
      () => { /* registered */ },
      () => { /* offline unsupported */ }
    );
  });
}
