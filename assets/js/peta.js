/* =========================================================
   RUWA JURAI — Peta page
   Interaktif: hover, pilih, filter adat, cari, zoom, geser.
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const MAP = window.RJ_MAP;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');
  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const regionById = Object.fromEntries((D.regions || []).map((r) => [r.id, r]));
  const entryById = Object.fromEntries((D.entries || []).map((e) => [e.id, e]));
  const dishById = Object.fromEntries((D.dishes || []).map((d) => [d.id, d]));

  const ADAT_COLORS = { saibatin: '#b45567', pepadun: '#568e74', melinting: '#c7903e', lintas: '#8d7b65' };
  const withColor = (r) => ADAT_COLORS[r.adat] || '#d9a94f';

  const LABEL_POS = {
    'bandar-lampung': { x: 512, y: 612, anchor: 'start' },
    'metro': { x: 530, y: 487, anchor: 'start' },
    'pringsewu': { x: 388, y: 551, anchor: 'end' },
    'pesawaran': { x: 458, y: 640, anchor: 'start' },
    'tanggamus': { x: 350, y: 640, anchor: 'middle' },
    'lampung-selatan': { x: 595, y: 700, anchor: 'middle' },
    'lampung-timur': { x: 660, y: 520, anchor: 'start' },
    'lampung-tengah': { x: 555, y: 430, anchor: 'middle' },
    'lampung-barat': { x: 200, y: 500, anchor: 'middle' },
    'pesisir-barat': { x: 112, y: 600, anchor: 'middle' },
    'way-kanan': { x: 285, y: 345, anchor: 'middle' },
    'lampung-utara': { x: 375, y: 410, anchor: 'middle' },
    'tulang-bawang-barat': { x: 455, y: 310, anchor: 'middle' },
    'tulang-bawang': { x: 590, y: 275, anchor: 'middle' },
    'mesuji': { x: 510, y: 165, anchor: 'middle' }
  };

  let activeId = null;
  let adatFilter = 'all';
  let query = '';
  let showLabels = false;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let dragging = false;
  let dragStart = null;
  let moved = false;

  function buildSVG() {
    const svg = $('#map-svg');
    if (!svg || !MAP) return;
    const paths = MAP.regencies.map((m) => {
      const data = regionById[m.id] || {};
      return `<path class="region-path" d="${m.path}" data-region="${m.id}" data-adat="${data.adat || 'lintas'}" tabindex="0" role="button" aria-label="${esc(m.name)}"><title>${esc(m.name)}</title></path>`;
    }).join('');
    const labels = MAP.regencies.map((m) => {
      const pos = LABEL_POS[m.id] || { x: m.cx, y: m.cy, anchor: 'middle' };
      const dist = Math.hypot(pos.x - m.cx, pos.y - m.cy);
      const leader = dist > 24 ? `<path class="region-leader" d="M${m.cx} ${m.cy}L${pos.x} ${pos.y}" data-leader="${m.id}"/>` : '';
      return `${leader}<text class="region-label" x="${pos.x}" y="${pos.y}" text-anchor="${pos.anchor}" data-label="${m.id}">${esc(m.name.replace(/^Kota /, ''))}</text>`;
    }).join('');
    svg.innerHTML = `<g id="map-viewport"><g class="region-shapes">${paths}</g><circle class="map-beacon" id="map-beacon" cx="0" cy="0" r="18"/><g class="region-labels" aria-hidden="true">${labels}</g></g>`;
  }

  function applyTransform() {
    const vp = $('#map-viewport');
    if (!vp) return;
    vp.setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)}) translate(400 450) scale(${scale.toFixed(3)}) translate(-400 -450)`);
  }

  function regionMatches(r) {
    if (adatFilter !== 'all' && r.adat !== adatFilter) return false;
    if (!query) return true;
    const mapReg = MAP.regencies.find((m) => m.id === r.id) || {};
    const hay = normalize([r.name, mapReg.name, r.capital, r.adatLabel, r.title, r.summary, ...(r.highlights || [])].join(' '));
    return normalize(query).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
  }

  function syncMapState() {
    const svg = $('#map-svg');
    if (!svg) return;
    if (adatFilter === 'all') svg.removeAttribute('data-highlight');
    else svg.setAttribute('data-highlight', adatFilter);
    const beacon = $('#map-beacon');
    const activeMapReg = MAP.regencies.find((m) => m.id === activeId);
    if (beacon && activeMapReg) {
      beacon.setAttribute('cx', String(activeMapReg.cx));
      beacon.setAttribute('cy', String(activeMapReg.cy));
      beacon.classList.add('is-active');
    }
    $$('.region-path', svg).forEach((p) => {
      const r = regionById[p.dataset.region] || {};
      const match = regionMatches(r);
      p.classList.toggle('is-dim', !match && r.id !== activeId);
      p.classList.toggle('is-active', r.id === activeId);
      p.setAttribute('aria-pressed', String(r.id === activeId));
    });
    $$('.region-label', svg).forEach((t) => t.classList.toggle('is-active', t.dataset.label === activeId));
    $$('.region-leader', svg).forEach((l) => l.classList.toggle('is-active', l.dataset.leader === activeId));
    syncList();
  }

  function syncList() {
    const wrap = $('#region-list');
    if (!wrap) return;
    const check = $('[data-map-label]');
    if (check) check.setAttribute('aria-pressed', String(showLabels));
    const list = (D.regions || []).filter(regionMatches).sort((a, b) => a.name.localeCompare(b.name, 'id'));
    wrap.innerHTML = list.map((r) => `
      <button class="region-btn ${r.id === activeId ? 'is-active' : ''}" type="button" data-region-btn="${r.id}">
        <i style="background:${withColor(r)}"></i>
        <span>${esc(r.name)}</span>
        <small>${esc(r.capital)}</small>
      </button>`).join('') || '<p class="tiny faint" style="padding:18px 14px">Tidak ada wilayah yang cocok.</p>';
    const count = $('#region-list-count');
    if (count) count.textContent = String(list.length);
  }

  function renderInfo(r) {
    const box = $('#region-info');
    if (!box || !r) return;
    const entries = (r.entries || []).map((id) => entryById[id]).filter(Boolean);
    const dishes = (r.dishes || []).map((id) => dishById[id]).filter(Boolean);
    const accent = withColor(r);
    const previews = [
      ...entries.slice(0, 1).map((e) => ({ img: e.image, label: e.title, href: `ensiklopedia.html?entri=${encodeURIComponent(e.id)}` })),
      ...dishes.slice(0, 1).map((d) => ({ img: d.image, label: d.name, href: `kuliner.html?hidangan=${encodeURIComponent(d.id)}` }))
    ].filter((x) => x.img);
    box.innerHTML = `
      <div class="region-info__head" style="--region-accent:${accent}">
        <span class="region-info__tag">${esc(r.adatLabel)} · ${esc(r.capital)}</span>
        <h2>${esc(r.name)}</h2>
        <p>${icon('pin')} ${esc(r.capital)} · Lampung</p>
      </div>
      ${previews.length ? `<div class="region-info__gallery">${previews.map((p) => `<a class="region-thumb" href="${p.href}"><img src="${esc(p.img)}" alt="${esc(p.label)}" loading="lazy"><span>${esc(p.label)}</span></a>`).join('')}</div>` : ''}
      <div class="region-info__body">
        <div class="region-info__title">${esc(r.title)}</div>
        <p class="region-info__summary">${esc(r.summary)}</p>
        <div class="region-highlights">${(r.highlights || []).map((h) => `<span>${esc(h)}</span>`).join('')}</div>
        <div class="region-links">
          ${entries.slice(0, 3).map((e) => `<a href="ensiklopedia.html?entri=${encodeURIComponent(e.id)}">${esc(e.title)} ${icon('arrow-up-right')}</a>`).join('')}
          ${dishes.slice(0, 3).map((d) => `<a href="kuliner.html?hidangan=${encodeURIComponent(d.id)}">${esc(d.name)} ${icon('bowl')}</a>`).join('')}
        </div>
      </div>`;
    box.classList.remove('is-swap');
    void box.offsetWidth;
    box.classList.add('is-swap');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(box);
  }

  function selectRegion(id, opts = {}) {
    const r = regionById[id];
    if (!r) return;
    activeId = id;
    renderInfo(r);
    syncMapState();
    if (opts.scrollList) {
      const btn = $(`[data-region-btn="${id}"]`);
      if (btn) btn.scrollIntoView({ block: 'nearest', behavior: RJ.preferredReduced() ? 'auto' : 'smooth' });
    }
    if (opts.url !== false && history.replaceState) {
      history.replaceState(null, '', `?wilayah=${encodeURIComponent(id)}`);
    }
  }

  function tooltipFor(el) {
    const tip = $('#map-tooltip');
    const panel = $('#map-panel');
    if (!tip || !panel) return;
    const r = regionById[el.dataset.region];
    if (!r) return;
    tip.textContent = r.name;
    tip.classList.add('is-visible');
    const rect = panel.getBoundingClientRect();
    const px = Number(el.dataset.px || 0);
    const py = Number(el.dataset.py || 0);
    tip.style.left = `${px}px`;
    tip.style.top = `${py}px`;
  }

  function bindMap() {
    const svg = $('#map-svg');
    const panel = $('#map-panel');
    if (!svg || !panel) return;

    svg.addEventListener('pointerover', (e) => {
      const el = e.target.closest('.region-path');
      if (!el || dragging) return;
      tooltipFor(el);
    });
    svg.addEventListener('pointermove', (e) => {
      const el = e.target.closest('.region-path');
      if (!el) { $('#map-tooltip')?.classList.remove('is-visible'); return; }
      const rect = panel.getBoundingClientRect();
      el.dataset.px = String(e.clientX - rect.left + 12);
      el.dataset.py = String(e.clientY - rect.top - 12);
      if (!dragging) tooltipFor(el);
    });
    svg.addEventListener('pointerout', (e) => {
      if (e.target.closest('.region-path')) $('#map-tooltip')?.classList.remove('is-visible');
    });
    svg.addEventListener('click', (e) => {
      const el = e.target.closest('.region-path');
      if (el && !moved) selectRegion(el.dataset.region, { scrollList: true });
    });
    svg.addEventListener('keydown', (e) => {
      const el = e.target.closest('.region-path');
      if (!el) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRegion(el.dataset.region, { url: false });
        renderInfo(regionById[el.dataset.region]);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const all = $$('.region-path', svg);
        const i = all.indexOf(el);
        const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
        const next = all[(i + dir + all.length) % all.length];
        next.focus();
        selectRegion(next.dataset.region, { url: false });
      }
    });

    // drag to pan
    svg.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      dragStart = { x: e.clientX, y: e.clientY, tx, ty };
      svg.setPointerCapture?.(e.pointerId);
      $('#map-tooltip')?.classList.remove('is-visible');
    });
    svg.addEventListener('pointermove', (e) => {
      if (!dragging || !dragStart) return;
      const rect = svg.getBoundingClientRect();
      const dx = (e.clientX - dragStart.x) * (800 / rect.width) / scale;
      const dy = (e.clientY - dragStart.y) * (900 / rect.height) / scale;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      tx = clamp(dragStart.tx + dx, -400 * (scale - 1) - 80, 400 * (scale - 1) + 80);
      ty = clamp(dragStart.ty + dy, -450 * (scale - 1) - 80, 450 * (scale - 1) + 80);
      applyTransform();
    });
    const endDrag = () => { dragging = false; };
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);
    svg.addEventListener('pointerleave', () => { $('#map-tooltip')?.classList.remove('is-visible'); });

    svg.addEventListener('wheel', (e) => {
      if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return;
      e.preventDefault();
      zoomBy(e.deltaY < 0 ? 0.2 : -0.2);
    }, { passive: false });
    svg.addEventListener('dblclick', () => zoomBy(0.4));

    $$('[data-map-zoom]').forEach((b) => b.addEventListener('click', () => zoomBy(b.dataset.mapZoom === 'in' ? 0.4 : -0.4)));
    const reset = $('[data-map-reset]');
    if (reset) reset.addEventListener('click', () => {
      scale = 1; tx = 0; ty = 0; applyTransform();
      RJ.sound.tap();
      RJ.toast('Tampilan peta diatur ulang.', { icon: 'rotate', duration: 1800 });
    });
    const labelsBtn = $('[data-map-label]');
    if (labelsBtn) labelsBtn.addEventListener('click', () => {
      showLabels = !showLabels;
      svg.classList.toggle('show-labels', showLabels);
      labelsBtn.setAttribute('aria-pressed', String(showLabels));
      labelsBtn.classList.toggle('is-active', showLabels);
    });
    if (showLabels) svg.classList.add('show-labels');

    // filter chips
    const filters = $('#map-filters');
    if (filters) filters.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-adat]');
      if (!btn) return;
      adatFilter = btn.dataset.adat;
      $$('[data-adat]', filters).forEach((b) => {
        b.classList.toggle('chip--active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      RJ.sound.click();
      syncMapState();
      if (adatFilter !== 'all') {
        const names = { saibatin: 'Saibatin', pepadun: 'Pepadun', melinting: 'Melinting', lintas: 'Lintas adat' };
        RJ.toast(`Menyorot wilayah dengan keterkaitan ${names[adatFilter]}.`, { icon: 'map', duration: 2400 });
      }
    });

    // region list
    const list = $('#region-list');
    if (list) list.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-region-btn]');
      if (btn) selectRegion(btn.dataset.regionBtn, { url: true });
    });

    // search
    const search = $('#region-search');
    if (search) search.addEventListener('input', RJ.debounce(() => {
      query = search.value.trim();
      syncMapState();
      if (query) {
        const first = (D.regions || []).filter(regionMatches).sort((a, b) => a.name.localeCompare(b.name, 'id'))[0];
        if (first) renderInfo(first);
      }
    }, 120));

    // route stops jump to map
    $$('[data-jump-region]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.jumpRegion;
        selectRegion(id, { url: true, scrollList: true });
        RJ.sound.click();
        $('#peta')?.scrollIntoView({ behavior: RJ.preferredReduced() ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function zoomBy(delta) {
    scale = clamp(scale + delta, 1, 4);
    if (scale === 1) { tx = 0; ty = 0; }
    else {
      tx = clamp(tx, -400 * (scale - 1), 400 * (scale - 1));
      ty = clamp(ty, -450 * (scale - 1), 450 * (scale - 1));
    }
    applyTransform();
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function init() {
    buildSVG();
    bindMap();
    syncMapState();
    const deep = RJ.getQuery('wilayah');
    const initial = deep && regionById[deep] ? deep : 'pesisir-barat';
    selectRegion(initial, { url: false, scrollList: false });
    $$('[data-map-label]').forEach((b) => b.setAttribute('aria-pressed', String(showLabels)));
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
