/* =========================================================
   RUWA JURAI — Tentang page
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');

  function renderSdgs() {
    const wrap = $('#sdg-grid');
    if (!wrap) return;
    wrap.innerHTML = (D.sdgs || []).map((s) => `
      <article class="sdg-card" style="--sdg-color:${s.color || '#d9a94f'}">
        <div class="sdg-no">${s.no}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <small>${esc(s.source || '')}</small>
      </article>`).join('');
  }

  function renderSources() {
    const wrap = $('#source-grid');
    if (!wrap) return;
    wrap.innerHTML = (D.sources || []).map((s) => `
      <article class="source-card">
        <h4>${icon('book')} ${esc(s.title)}</h4>
        <p>${esc(s.body)}</p>
        <div class="source-card__meta">
          <span>${esc(s.license || '')}</span>
          ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">Lihat sumber <span data-icon="arrow-up-right"></span></a>` : ''}
        </div>
      </article>`).join('');
  }

  function bindFaq() {
    $$('.faq-item').forEach((item) => {
      const btn = item.querySelector('.faq-btn');
      const body = item.querySelector('.faq-body');
      if (!btn || !body) return;
      btn.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
        if (body.parentElement !== item) return;
      });
    });
  }

  function init() {
    renderSdgs();
    renderSources();
    bindFaq();
    const form = $('#tentang-form');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      RJ.toast(`Pesan masuk. Kami akan membalas teratur, ${data.name || 'teman budaya'}.`, { title: 'Tentang', icon: 'mail', duration: 4200 });
      e.target.reset();
    });
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
