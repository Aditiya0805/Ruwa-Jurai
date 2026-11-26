/* =========================================================
   RUWA JURAI — Kamus & Aksara page
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');
  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  let cat = 'all';
  let dialect = 'all';
  let query = '';

  function renderAksara() {
    const input = $('#akk-input');
    const out = $('#akk-output');
    if (!input || !out) return;
    const text = input.value.trim();
    if (!text) {
      out.innerHTML = '<span class="converter__placeholder">Aksara akan tertulis di sini.</span>';
      return;
    }
    out.innerHTML = window.RJ.aksaraSvg ? RJ.aksaraSvg(text, { decorative: true }) : '';
    if (window.RJ.animateSvgStrokes) RJ.animateSvgStrokes(out, { duration: 650, stagger: 45 });
  }

  function renderGlyphs() {
    const wrap = $('#glyph-grid');
    if (!wrap || !window.RJ.AKSARA) return;
    const AK = window.RJ.AKSARA;
    const groups = [
      { id: 'all', label: 'Semua', list: AK.letters },
      { id: 'above', label: 'Anak huruf atas', list: AK.marks.filter((m) => m.group === 'above') },
      { id: 'below', label: 'Anak huruf bawah', list: AK.marks.filter((m) => m.group === 'below') },
      { id: 'after', label: 'Anak huruf setelah', list: AK.marks.filter((m) => m.group === 'after') }
    ];
    const render = (group) => {
      const list = group.id === 'all' ? AK.letters : (group.list || []);
      wrap.innerHTML = list.map((item, idx) => group.id === 'all'
        ? `<button type="button" class="glyph-card anim-in" style="--stagger:${Math.min(idx * 22, 320)}ms" data-glyph-key="${esc(item.key)}" data-glyph-name="${esc(item.name)}" data-glyph-note="${esc(item.note)}">${window.RJ.aksaraSvg ? RJ.aksaraSvg(item.key, { decorative: true }) : ''}<div class="glyph-card__label">${esc(item.latin || item.name)}</div><div class="glyph-card__note">${esc(item.sound)}</div></button>`
        : `<button type="button" class="glyph-card is-mark anim-in" style="--stagger:${Math.min(idx * 28, 280)}ms" data-mark-name="${esc(item.name)}" data-mark-note="${esc(item.note)}"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="3"><circle cx="20" cy="20" r="13"/><circle cx="20" cy="20" r="5"/></svg><div class="glyph-card__label">${esc(item.name)}</div><div class="glyph-card__note">Anak huruf ${esc(item.latin)}</div></button>`).join('');
    };
    render(groups[0]);
    $$('#glyph-tabs [data-glyph-group]').forEach((b) => b.addEventListener('click', () => {
      $$('#glyph-tabs [data-glyph-group]').forEach((x) => x.classList.toggle('chip--active', x === b));
      const found = groups.find((g) => g.id === b.dataset.glyphGroup) || groups[0];
      RJ.sound.click();
      render(found);
    }));
    wrap.addEventListener('click', (e) => {
      const card = e.target.closest('.glyph-card');
      if (!card) return;
      RJ.sound.tap();
      if (card.dataset.glyphKey) {
        const key = card.dataset.glyphKey;
        const svg = window.RJ.aksaraSvg ? RJ.aksaraSvg(key, { decorative: true }) : '';
        RJ.openModal({
          label: `Huruf aksara ${card.dataset.glyphName}`,
          className: 'modal--sheet',
          content: `<div class="glyph-modal">
            <span class="tag">Huruf Induk · Had Lampung</span>
            <div class="glyph-modal__canvas">${svg}</div>
            <h3>${esc(card.dataset.glyphName)}</h3>
            <p>${esc(card.dataset.glyphNote || '')}</p>
            <div style="margin-top:16px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
              <button type="button" class="btn btn--sm btn--outline" data-replay-stroke>${icon('rotate')} Ulangi goresan</button>
              <button type="button" class="btn btn--sm btn--gold" data-try-glyph="${esc(key)}">Coba di konverter</button>
            </div>
          </div>`,
          onMount(root) {
            const box = root.querySelector('.glyph-modal__canvas');
            if (box && window.RJ.animateSvgStrokes) RJ.animateSvgStrokes(box, { duration: 850, stagger: 120 });
            root.querySelector('[data-replay-stroke]')?.addEventListener('click', () => {
              if (box && window.RJ.animateSvgStrokes) RJ.animateSvgStrokes(box, { duration: 850, stagger: 120 });
              RJ.sound.tap();
            });
            root.querySelector('[data-try-glyph]')?.addEventListener('click', () => {
              const inp = $('#akk-input');
              if (inp) {
                inp.value = (inp.value ? inp.value + ' ' : '') + key;
                renderAksara();
              }
              RJ.closeModal();
            });
          }
        });
      } else if (card.dataset.markName) {
        RJ.toast(card.dataset.markNote || card.dataset.markName, { title: card.dataset.markName, icon: 'glyph', duration: 3400 });
      }
    });
  }

  function renderDict() {
    const wrap = $('#dict-list');
    if (!wrap) return;
    const list = (D.dictionary || []).filter((t) => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (dialect !== 'all' && t.dialect !== dialect) return false;
      if (query) {
        const hay = normalize([t.term, t.meaning, t.note, t.category, t.dialect].join(' '));
        return normalize(query).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
      }
      return true;
    });
    wrap.innerHTML = list.map((t) => `
      <div class="dict-item">
        <dt>${esc(t.term)}<small>${esc(t.dialect)} · ${esc(t.category)}</small></dt>
        <dd class="dict-meaning">${esc(t.meaning)}${t.note ? `<small>${esc(t.note)}</small>` : ''}</dd>
        <div class="dict-actions">
          <button type="button" data-dict-copy="${t.term}" aria-label="Salin arti ${t.term}">${icon('copy')}</button>
          <button type="button" data-dict-akh="${t.term}" aria-label="Lihat aksara ${t.term}">${icon('glyph')}</button>
          <span class="dict-badge">${esc(t.category)}</span>
        </div>
      </div>`).join('');
    const count = $('#dict-count');
    const total = $('#dict-total');
    if (count) count.textContent = String(list.length);
    if (total) total.textContent = String((D.dictionary || []).length);
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
  }

  function bind() {
    const input = $('#akk-input');
    const copy = $('#akk-copy');
    const clear = $('#akk-clear');
    if (input) input.addEventListener('input', renderAksara);
    if (clear) clear.addEventListener('click', () => { if (input) input.value = ''; renderAksara(); input?.focus(); });
    if (copy) copy.addEventListener('click', () => RJ.copyText(input ? input.value.trim() : '', 'Terjemahan tersalin.'));
    if (input) {
      $$('[data-akk]').forEach((b) => b.addEventListener('click', () => {
        if (input) { input.value = b.dataset.akk; }
        renderAksara();
        input?.focus();
      }));
    }

    const cats = $('#dict-cats');
    const dialects = $('#dict-dialects');
    if (cats) cats.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      $$('[data-cat]', cats).forEach((b) => b.classList.toggle('chip--active', b === btn));
      cat = btn.dataset.cat;
      renderDict();
    });
    if (dialects) dialects.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-dialect]');
      if (!btn) return;
      $$('[data-dialect]', dialects).forEach((b) => b.classList.toggle('chip--active', b === btn));
      dialect = btn.dataset.dialect;
      renderDict();
    });
    const dsearch = $('#dict-search');
    if (dsearch) {
      dsearch.addEventListener('input', RJ.debounce(() => { query = dsearch.value.trim(); renderDict(); }, 130));
      dsearch.addEventListener('keydown', (e) => { if (e.key === 'Escape') { dsearch.value = ''; query = ''; renderDict(); } });
    }
    const wrap = $('#dict-list');
    if (wrap) wrap.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('[data-dict-copy]');
      if (copyBtn) RJ.copyText(copyBtn.dataset.dictCopy, 'Arti disalin.');
      const akhBtn = e.target.closest('[data-dict-akh]');
      if (akhBtn) RJ.openModal({ content: `<div class="detail-body">${window.RJ.aksaraSvg ? RJ.aksaraSvg(akhBtn.dataset.dictAkh, { decorative: true }) : ''}</div>` });
    });
  }

  function init() {
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
    renderAksara();
    renderGlyphs();
    renderDict();
    bind();
    const deep = RJ.getQuery('q');
    if (deep) {
      const dsearch = $('#dict-search');
      if (dsearch) dsearch.value = deep;
      query = deep;
      renderDict();
    }
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
