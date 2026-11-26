/* =========================================================
   RUWA JURAI — Agenda page
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');

  const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const MONTH_SHORT = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  let activeMonth = Number(new Date().getMonth());

  function monthEvents(m) {
    const idx = Number(m);
    const events = (D.agenda || []).filter((a) => (a.months || []).includes(idx));
    const monthsOf = (a) => (a.months || []).filter((x) => x === idx).map((x) => MONTH_NAMES[x]);
    return { events, monthsOf };
  }

  function monthStats(m) {
    const { events } = monthEvents(m);
    return events.length;
  }

  function renderMonths() {
    const track = $('#month-track');
    if (!track) return;
    track.innerHTML = Array.from({ length: 12 }, (_, i) => {
      const n = monthStats(i);
      const event = (D.agenda || []).find((a) => (a.months || []).includes(i));
      const dotColor = (event && event.color) || '#d9a94f';
      const days = Array.from({ length: Math.min(n, 3) }, (_, k) => `<i style="background:${dotColor}"></i>`).join('');
      const active = i === activeMonth;
      return `<button class="month-cell ${active ? 'is-active' : ''}" type="button" data-month="${i}" role="gridcell" aria-selected="${active}" aria-label="${MONTH_NAMES[i]}: ${n} agenda">
        <b>${MONTH_SHORT[i]}</b>
        <span>${String(i + 1).padStart(2, '0')}</span>
        <span class="month-cell__count">${n ? `${n} acara` : '—'}</span>
        <span class="month-dots">${n ? days : '<i style="background:transparent"></i><i style="background:transparent"></i>'}</span>
      </button>`;
    }).join('');
    $$('[data-month]', track).forEach((b) => b.addEventListener('click', () => {
      activeMonth = Number(b.dataset.month);
      $$('[data-month]', track).forEach((x) => x.classList.toggle('is-active', x === b));
      renderAgenda();
      RJ.sound.click();
    }));
  }

  function renderAgenda() {
    const grid = $('#agenda-grid');
    if (!grid) return;
    const { events } = monthEvents(activeMonth);
    grid.innerHTML = events.map((a, idx) => `
      <article class="agenda-card anim-in" style="--event-color:${a.color};--stagger:${Math.min(idx * 55, 320)}ms">
        ${a.image ? `<div class="agenda-card__media"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy"><span class="agenda-card__badge">${esc(a.type)}</span></div>` : ''}
        <div class="agenda-card__body">
          <div class="agenda-date">
            <b>2026</b>
            <span>${MONTH_NAMES[activeMonth].slice(0, 3)}</span>
          </div>
          <div class="agenda-main">
            <div class="agenda-main__top">
              <span class="agenda-main__type">${esc(a.type)}</span>
            </div>
            <h3>${esc(a.title)}</h3>
            <p class="agenda-main__desc">${esc(a.desc)}</p>
            <div class="agenda-main__meta">
              <span>${icon('pin')} ${esc(a.location)}</span>
              <span>${icon(a.icon || 'calendar')} ${a.approximate ? 'Perkiraan' : 'Jadwal'}</span>
            </div>
          </div>
        </div>
        <div class="agenda-card__foot">
          <span class="tiny">Bulan: ${(a.months || []).map((m) => MONTH_NAMES[m]).join(', ')}</span>
          <button type="button" data-ag-add="${a.id}">${icon('calendar-plus')} Simpan ke kalender</button>
        </div>
      </article>`).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(grid);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(grid);
  }

  function bind() {
    const grid = $('#agenda-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const b = e.target.closest('[data-ag-add]');
        if (!b) return;
        const a = (D.agenda || []).find((x) => x.id === b.dataset.agAdd);
        if (a) RJ.downloadICS({ title: a.title, location: a.location, desc: a.desc }, `ruwa-jurai-${a.id}.ics`);
      });
    }
    const form = $('#agenda-form');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      RJ.toast(`Terima kasih. Agenda “${data.name || 'kelompok'}” masuk antrian kurasi.`, { title: 'Agenda', icon: 'calendar-plus', duration: 4200 });
      e.target.reset();
    });
  }

  function init() {
    const deep = RJ.getQuery('month');
    if (deep !== null) {
      const n = Number(deep);
      if (Number.isInteger(n) && n >= 0 && n < 12) activeMonth = n;
    }
    renderMonths();
    renderAgenda();
    bind();
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
