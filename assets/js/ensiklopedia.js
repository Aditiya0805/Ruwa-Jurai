/* =========================================================
   RUWA JURAI — Ensiklopedia page
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');
  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const catById = Object.fromEntries((D.categories || []).map((c) => [c.id, c]));
  const entryById = Object.fromEntries((D.entries || []).map((e) => [e.id, e]));
  const regionName = (id) => {
    const r = (D.regions || []).find((x) => x.id === id);
    return r ? r.name : id;
  };

  let activeCat = 'all';
  let query = '';
  let sortMode = 'kurasi';
  let onlyFavorites = false;
  let viewMode = RJ.store.get('entryView', 'grid');

  if (!['grid', 'list'].includes(viewMode)) viewMode = 'grid';

  function isFavorite(id) {
    return (RJ.state.favorites || []).includes(id);
  }

  function toggleFavorite(id) {
    const favs = RJ.state.favorites || (RJ.state.favorites = []);
    const i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1); else favs.push(id);
    RJ.save();
    RJ.sound.tap();
    syncFavoriteButtons(id);
    updateCount();
    if (onlyFavorites) renderGrid();
    const entry = entryById[id];
    RJ.toast(i >= 0 ? `“${entry ? entry.title : 'Entri'}” dihapus dari simpanan.` : `“${entry ? entry.title : 'Entri'}” disimpan untuk dibaca nanti.`, {
      icon: i >= 0 ? 'heart' : 'check', duration: 2400
    });
  }

  function syncFavoriteButtons(id) {
    $$(`[data-bookmark="${id}"]`).forEach((btn) => {
      const on = isFavorite(id);
      btn.setAttribute('aria-pressed', String(on));
      btn.setAttribute('aria-label', on ? 'Hapus dari simpanan' : 'Simpan entri');
      btn.innerHTML = icon('heart');
    });
    const count = $('#entry-fav-count');
    if (count) count.textContent = String((RJ.state.favorites || []).length);
  }

  function matches(entry) {
    if (activeCat !== 'all' && entry.category !== activeCat) return false;
    if (onlyFavorites && !isFavorite(entry.id)) return false;
    if (!query) return true;
    const cat = catById[entry.category] || {};
    const haystack = normalize([
      entry.title, entry.subtitle, entry.summary, entry.lead,
      entry.community, entry.region, cat.name,
      ...(entry.labels || []),
      ...(entry.facts || []).map((f) => `${f.label} ${f.value}`),
      ...(entry.terms || []).map((t) => `${t.term} ${t.def}`),
      ...(entry.body || [])
    ].join(' '));
    return normalize(query).split(/\s+/).filter(Boolean).every((w) => haystack.includes(w));
  }

  function sorted(list) {
    const out = list.slice();
    if (sortMode === 'az') {
      out.sort((a, b) => a.title.localeCompare(b.title, 'id'));
    } else if (sortMode === 'kategori') {
      out.sort((a, b) => {
        const ca = catById[a.category] || { name: '' };
        const cb = catById[b.category] || { name: '' };
        return ca.name.localeCompare(cb.name, 'id') || a.title.localeCompare(b.title, 'id');
      });
    } else if (sortMode === 'wilayah') {
      out.sort((a, b) => a.region.localeCompare(b.region, 'id') || a.title.localeCompare(b.title, 'id'));
    } else {
      out.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return out;
  }

  function cardHTML(e, idx = 0) {
    const cat = catById[e.category] || { name: 'Budaya', accent: '#6a1c2b' };
    const fav = isFavorite(e.id);
    const motif = window.RJ_ART ? window.RJ_ART.motifPaths(e.motif || 'compass', 300, 300, 2.5) : '';
    const url = `?entri=${encodeURIComponent(e.id)}`;
    const delay = Math.min(idx * 35, 350);
    return `<article class="entry-card anim-in" style="--accent:${cat.accent};--stagger:${delay}ms" data-entry-card="${e.id}">
      <div class="entry-card__art">
        ${e.image ? `<img class="entry-card__img" src="${esc(e.image)}" alt="${esc(e.title)} — ${esc(e.subtitle)}" loading="lazy">` : ''}
        <span class="entry-card__cat">${esc(cat.name)}</span>
        <svg aria-hidden="true" viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><g color="currentColor">${motif}</g></svg>
      </div>
      <button class="entry-card__bookmark" type="button" data-bookmark="${e.id}" aria-pressed="${fav}" aria-label="${fav ? 'Hapus dari simpanan' : 'Simpan entri'}">${icon('heart')}</button>
      <div class="entry-card__body">
        <div class="entry-card__main">
          <div class="entry-card__kicker"><span>${esc(cat.name)}</span><span>·</span><span>${esc(e.sensitivity === 'terbatas' ? 'Baca dengan hormat' : 'Terbuka')}</span></div>
          <h3><a href="${url}" data-open-entry="${e.id}">${esc(e.title)}</a></h3>
          <p class="entry-card__sub">${esc(e.subtitle)}</p>
          <p class="entry-card__summary">${esc(e.summary)}</p>
          <div class="entry-card__labels">${(e.labels || []).map((l) => `<span>${esc(l)}</span>`).join('')}</div>
        </div>
        <div class="entry-card__foot">
          <a class="read" href="${url}" data-open-entry="${e.id}">Baca entri ${icon('right')}</a>
          <span class="entry-card__region">${icon('pin')} ${esc(e.region.split(',')[0])}</span>
        </div>
      </div>
    </article>`;
  }

  function renderGrid() {
    const grid = $('#entry-grid');
    if (!grid) return;
    const list = sorted((D.entries || []).filter(matches));
    grid.className = `entry-grid${viewMode === 'list' ? ' is-list' : ''}`;
    grid.innerHTML = list.map((e, i) => cardHTML(e, i)).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(grid);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(grid);
    const empty = $('#entry-empty');
    if (empty) empty.hidden = list.length > 0;
    updateCount(list.length);
  }

  function updateCount(n) {
    const count = $('#entry-count');
    if (!count) return;
    const total = (D.entries || []).length;
    const shown = typeof n === 'number' ? n : (D.entries || []).filter(matches).length;
    const favCount = (RJ.state.favorites || []).length;
    count.innerHTML = `<b>${shown}</b> dari ${total} entri · ${favCount} tersimpan`;
    const favBtn = $('#entry-fav-filter');
    if (favBtn) {
      favBtn.setAttribute('aria-pressed', String(onlyFavorites));
      favBtn.classList.toggle('chip--active', onlyFavorites);
    }
    const favCountEl = $('#entry-fav-count');
    if (favCountEl) favCountEl.textContent = String(favCount);
  }

  function renderCats() {
    const wrap = $('#entry-cats');
    if (!wrap) return;
    const counts = {};
    (D.entries || []).forEach((e) => { counts[e.category] = (counts[e.category] || 0) + 1; });
    wrap.innerHTML = `<button class="chip chip--active" type="button" data-cat="all">Semua <span class="count">${(D.entries || []).length}</span></button>` +
      (D.categories || []).filter((c) => counts[c.id]).map((c) => `<button class="chip" type="button" data-cat="${c.id}">${esc(c.name)} <span class="count">${counts[c.id]}</span></button>`).join('');
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      activeCat = btn.dataset.cat;
      $$('[data-cat]', wrap).forEach((b) => b.classList.toggle('chip--active', b === btn));
      RJ.sound.click();
      renderGrid();
    });
  }

  function entryModal(e) {
    const cat = catById[e.category] || { name: 'Budaya', accent: '#6a1c2b' };
    const fav = isFavorite(e.id);
    const related = (e.related || []).map((id) => entryById[id]).filter(Boolean);
    const firstRegion = (e.regencyIds || [])[0];
    const aksara = window.RJ.aksaraSvg ? RJ.aksaraSvg(e.title, { decorative: true }) : '';
    const mapHref = firstRegion ? `peta.html?wilayah=${encodeURIComponent(firstRegion)}` : 'peta.html';
    const content = `
      <div class="detail-hero" style="--accent:${cat.accent}">
        ${e.image ? `<div class="detail-hero__photo"><img src="${esc(e.image)}" alt="${esc(e.title)}"></div>` : ''}
        <div class="detail-hero__art" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${window.RJ_ART ? window.RJ_ART.motifPaths(e.motif || 'compass', 300, 300, 2.2) : ''}</svg></div>
        <div class="detail-hero__inner">
          <div class="detail-hero__eyebrow">
            <span class="tag">${esc(cat.name)}</span>
            ${(e.labels || []).map((l) => `<span class="tag">${esc(l)}</span>`).join('')}
          </div>
          <h2 class="detail-title" id="entry-modal-title">${esc(e.title)}</h2>
          <p class="detail-sub">${esc(e.subtitle)}</p>
          <div class="detail-aksara aksara-wrap" aria-hidden="true">${aksara}</div>
          <div class="detail-meta">
            <span>${icon('people')} ${esc(e.community)}</span>
            <span>${icon('pin')} ${esc(e.region)}</span>
            <span>${icon('shield')} ${e.sensitivity === 'terbatas' ? 'Perlu konteks & hormat' : 'Terbuka untuk belajar'}</span>
          </div>
          <div class="detail-actions">
            <button class="btn btn--sm ${fav ? 'btn--gold' : 'btn--outline'}" type="button" data-modal-fav="${e.id}" aria-pressed="${fav}">${icon('heart')} <span>${fav ? 'Tersimpan' : 'Simpan entri'}</span></button>
            <button class="btn btn--outline btn--sm" type="button" data-modal-share="${e.id}">${icon('share')} Bagikan</button>
            <a class="btn btn--ghost btn--sm" href="${mapHref}">${icon('map')} Lihat wilayah</a>
          </div>
        </div>
      </div>
      <div class="dish-detail__body">
        <p class="detail-summary">${esc(e.summary)}</p>
        <div class="detail-layout">
          <div>
            <div class="prose">
              <p>${esc(e.lead)}</p>
              ${(e.body || []).map((p) => `<p>${esc(p)}</p>`).join('')}
            </div>
            ${(e.symbols || []).length ? `
            <div class="detail-block">
              <div class="detail-block__head"><h3>Simbol &amp; makna</h3><span>${e.symbols.length} catatan</span></div>
              <div class="symbol-grid">${e.symbols.map((s, i) => `
                <div class="symbol-card"><span class="num">${String(i + 1).padStart(2, '0')}</span><h4>${esc(s.title)}</h4><p>${esc(s.text)}</p></div>`).join('')}
              </div>
            </div>` : ''}
            ${(e.terms || []).length ? `
            <div class="detail-block">
              <div class="detail-block__head"><h3>Istilah kunci</h3><span>Glosarium</span></div>
              <dl class="term-list">${e.terms.map((t) => `<div class="term-row"><dt>${esc(t.term)}</dt><dd>${esc(t.def)}</dd></div>`).join('')}</dl>
            </div>` : ''}
            ${related.length ? `
            <div class="detail-block">
              <div class="detail-block__head"><h3>Baca juga</h3><span>Terhubung</span></div>
              <div class="related-grid">${related.map((r) => `<a class="related-card" href="?entri=${encodeURIComponent(r.id)}" data-open-entry="${r.id}">${icon('book')} <span>${esc(r.title)}</span></a>`).join('')}</div>
            </div>` : ''}
          </div>
          <aside class="detail-aside">
            <div class="fact-card">
              <div class="fact-card__head">${icon('info')} Ringkasan fakta</div>
              <dl class="fact-list">
                ${(e.facts || []).map((f) => `<div class="fact-row"><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}
                <div class="fact-row"><dt>Rujukan wilayah</dt><dd>${(e.regencyIds || []).map(regionName).join(' · ') || 'Lampung'}</dd></div>
              </dl>
            </div>
            <div class="fact-card">
              <div class="fact-card__head">${icon('shield')} Catatan sumber</div>
              <div class="fact-list">
                <ul class="source-list">${(e.sources || []).map((s) => `<li>${icon('book')} <span>${esc(s)}</span></li>`).join('')}</ul>
                <p class="tiny faint" style="padding-top:10px">Entri berstatus draf kurasi dan dapat diperbarui setelah validasi.</p>
              </div>
            </div>
          </aside>
        </div>
        <div class="detail-footer-note">
          <span>${icon('shield')} Draf kurasi Ruwa Jurai · ${new Date().getFullYear()}</span>
          <span>${icon('glyph')} Aksara pada judul adalah ornamen bantu baca, bukan standar ortografi.</span>
        </div>
      </div>`;

    RJ.trackEntry(e.id);
    if (history.replaceState) history.replaceState(null, '', `?entri=${encodeURIComponent(e.id)}`);

    RJ.openModal({
      content,
      label: `Entri ensiklopedia: ${e.title}`,
      className: 'modal--wide',
      onMount(root) {
        const favBtn = root.querySelector('[data-modal-fav]');
        if (favBtn) favBtn.addEventListener('click', () => {
          toggleFavorite(e.id);
          const on = isFavorite(e.id);
          favBtn.classList.toggle('btn--gold', on);
          favBtn.classList.toggle('btn--outline', !on);
          favBtn.setAttribute('aria-pressed', String(on));
          favBtn.innerHTML = `${icon('heart')} <span>${on ? 'Tersimpan' : 'Simpan entri'}</span>`;
        });
        const shareBtn = root.querySelector('[data-modal-share]');
        if (shareBtn) shareBtn.addEventListener('click', () => {
          RJ.share({ title: `${e.title} — Ruwa Jurai`, text: e.summary, url: new URL(`?entri=${encodeURIComponent(e.id)}`, location.href).href });
        });
        root.querySelectorAll('[data-open-entry]').forEach((a) => a.addEventListener('click', (ev) => {
          ev.preventDefault();
          const next = entryById[a.dataset.openEntry];
          if (next) { RJ.closeModal(); setTimeout(() => entryModal(next), 240); }
        }));
      }
    });
  }

  function renderTimeline() {
    const wrap = $('#timeline-list');
    if (!wrap || !D.timeline) return;
    wrap.innerHTML = D.timeline.map((t, i) => `
      <div class="tl-cell">
        <div class="tl-cell__era"><span>${esc(t.era)}</span>${icon(i % 2 ? 'compass' : 'spark')}</div>
        <h4>${esc(t.title)}</h4>
        <p>${esc(t.text)}</p>
      </div>`).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
  }

  function bindControls() {
    const search = $('#entry-search');
    const clear = $('#entry-clear');
    if (search) {
      const onInput = RJ.debounce(() => {
        query = search.value.trim();
        if (clear) clear.classList.toggle('is-visible', !!query);
        renderGrid();
      }, 140);
      search.addEventListener('input', onInput);
      search.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { search.value = ''; query = ''; clear?.classList.remove('is-visible'); renderGrid(); }
      });
    }
    if (clear) clear.addEventListener('click', () => {
      if (search) search.value = '';
      query = '';
      clear.classList.remove('is-visible');
      renderGrid();
      search?.focus();
    });

    const sort = $('#entry-sort');
    if (sort) {
      sort.value = sortMode;
      sort.addEventListener('change', () => { sortMode = sort.value; renderGrid(); });
    }

    $$('[data-view]').forEach((btn) => {
      btn.addEventListener('click', () => {
        viewMode = btn.dataset.view;
        RJ.store.set('entryView', viewMode);
        $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        renderGrid();
      });
    });

    const fav = $('#entry-fav-filter');
    if (fav) fav.addEventListener('click', () => {
      onlyFavorites = !onlyFavorites;
      fav.classList.toggle('chip--active', onlyFavorites);
      fav.setAttribute('aria-pressed', String(onlyFavorites));
      renderGrid();
      if (onlyFavorites && !(RJ.state.favorites || []).length) {
        RJ.toast('Belum ada entri tersimpan. Tekan ikon hati pada kartu untuk menyimpan.', { icon: 'heart' });
      }
    });

    const reset = $('#entry-reset');
    if (reset) reset.addEventListener('click', () => {
      activeCat = 'all'; query = ''; onlyFavorites = false; sortMode = 'kurasi';
      if (search) search.value = '';
      clear?.classList.remove('is-visible');
      if (sort) sort.value = 'kurasi';
      $$('[data-cat]').forEach((b) => b.classList.toggle('chip--active', b.dataset.cat === 'all'));
      renderGrid();
    });

    const grid = $('#entry-grid');
    if (grid) grid.addEventListener('click', (e) => {
      const bm = e.target.closest('[data-bookmark]');
      if (bm) { e.preventDefault(); e.stopPropagation(); toggleFavorite(bm.dataset.bookmark); return; }
      const open = e.target.closest('[data-open-entry]');
      if (open) { e.preventDefault(); const entry = entryById[open.dataset.openEntry]; if (entry) entryModal(entry); }
    });
  }

  function init() {
    renderCats();
    renderTimeline();
    bindControls();
    $$('[data-view]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === viewMode)));
    renderGrid();
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
    const deep = RJ.getQuery('entri');
    if (deep && entryById[deep]) setTimeout(() => entryModal(entryById[deep]), 420);
    if (location.hash === '#garis-waktu') {
      setTimeout(() => $('#garis-waktu')?.scrollIntoView({ behavior: RJ.preferredReduced() ? 'auto' : 'smooth' }), 200);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
