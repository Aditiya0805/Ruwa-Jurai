/* =========================================================
   RUWA JURAI — Kuliner page
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');
  const normalize = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const dishById = Object.fromEntries((D.dishes || []).map((d) => [d.id, d]));
  const FLAVOR_LABELS = { pedas: 'Pedas', asam: 'Asam', gurih: 'Gurih', manis: 'Manis', rempah: 'Rempah', smoky: 'Bakar' };
  const TYPES = [
    { id: 'all', label: 'Semua' },
    { id: 'adat', label: 'Hidangan adat' },
    { id: 'harian', label: 'Harian' },
    { id: 'oleh-oleh', label: 'Oleh-oleh' }
  ];

  let activeType = 'all';
  let query = '';

  function formatQty(n) {
    const rounded = Math.round(n * 10) / 10;
    return String(rounded).replace('.', ',');
  }

  function dishArt(dish, cls = 'dish-img') {
    if (dish && dish.image) {
      return `<img class="${cls}" src="${esc(dish.image)}" alt="${esc(dish.name)} — ${esc(dish.origin || 'Lampung')}" loading="lazy">`;
    }
    if (!window.RJ_ART) return '';
    return window.RJ_ART.dish(dish.illustration || dish.id);
  }

  function cardHTML(d, idx = 0) {
    const spice = Math.max(0, Math.min(5, Number(d.spice) || 0));
    const delay = Math.min(idx * 45, 360);
    return `<article class="dish-card anim-in" style="--stagger:${delay}ms" data-open-dish="${d.id}" tabindex="0" role="button" aria-label="Buka resep ${esc(d.name)}">
      <div class="dish-card__art">
        ${dishArt(d)}
        <span class="dish-card__type">${esc(d.types[0] === 'oleh-oleh' ? 'Oleh-oleh' : d.types[0] === 'adat' ? 'Adat' : 'Harian')}</span>
        <span class="dish-card__spice" aria-label="Tingkat pedas ${spice} dari 5">${Array.from({ length: 5 }).map((_, i) => `<i class="${i < spice ? 'on' : ''}"></i>`).join('')}</span>
      </div>
      <div class="dish-card__body">
        <span class="dish-card__origin">${esc(d.origin)}</span>
        <h3>${esc(d.name)}</h3>
        <p class="dish-card__summary">${esc(d.summary)}</p>
        <div class="dish-card__foot">
          <span class="dish-card__time">${icon('clock')} ${esc(d.time)} · ${d.serves} porsi</span>
          <span class="dish-card__labels">${(d.labels || []).slice(0, 2).map((l) => `<span>${esc(l)}</span>`).join('')}</span>
        </div>
      </div>
    </article>`;
  }

  function matches(d) {
    if (activeType !== 'all' && !(d.types || []).includes(activeType)) return false;
    if (!query) return true;
    const hay = normalize([
      d.name, d.origin, d.summary, d.philosophy, d.story, d.type,
      ...(d.types || []), ...(d.labels || []), ...(d.tastes || []),
      ...(d.ingredients || []).map((i) => i.name)
    ].join(' '));
    return normalize(query).split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
  }

  function renderGrid() {
    const grid = $('#dish-grid');
    if (!grid) return;
    const list = (D.dishes || []).filter(matches);
    grid.innerHTML = list.map((d, i) => cardHTML(d, i)).join('');
    const empty = $('#dish-empty');
    if (empty) empty.hidden = list.length > 0;
    const count = $('#dish-count');
    if (count) count.innerHTML = `<b>${list.length}</b> dari ${(D.dishes || []).length} hidangan`;
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(grid);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(grid);
  }

  function renderFilters() {
    const wrap = $('#dish-filters');
    if (!wrap) return;
    const counts = { all: (D.dishes || []).length };
    (D.dishes || []).forEach((d) => (d.types || []).forEach((t) => { counts[t] = (counts[t] || 0) + 1; }));
    wrap.innerHTML = TYPES.map((t) => `<button class="chip ${t.id === 'all' ? 'chip--active' : ''}" type="button" data-type="${t.id}" aria-pressed="${t.id === 'all'}">${t.label} <span class="count">${counts[t.id] || 0}</span></button>`).join('');
    wrap.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-type]');
      if (!btn) return;
      activeType = btn.dataset.type;
      $$('[data-type]', wrap).forEach((b) => {
        b.classList.toggle('chip--active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      RJ.sound.click();
      renderGrid();
    });
  }

  function renderIngredients() {
    const wrap = $('#ingredient-grid');
    if (!wrap || !D.ingredients) return;
    wrap.innerHTML = D.ingredients.map((i, idx) => `
      <article class="ingredient-card reveal" style="--delay:${idx * 55}ms">
        ${i.image ? `<div class="ingredient-card__media"><img src="${esc(i.image)}" alt="${esc(i.name)}" loading="lazy"></div>` : `<span class="ingredient-card__icon">${icon(i.icon || 'leaf')}</span>`}
        <div class="ingredient-card__body">
          <h4>${esc(i.name)}</h4>
          <p class="ingredient-card__latin">${esc(i.latin)}</p>
          <p>${esc(i.role)}</p>
          <div class="ingredient-card__fact"><b>Catatan</b>${esc(i.fact)}</div>
        </div>
      </article>`).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
    if (window.RJ.bindReveals) RJ.bindReveals(wrap);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(wrap);
  }

  function flavorBars(flavor, keys = ['pedas', 'asam', 'gurih', 'manis', 'rempah', 'smoky']) {
    return `<div class="flavor-bars">${keys.map((key) => {
      const v = Number(flavor[key] || 0);
      return `<div class="flavor-bar"><span>${FLAVOR_LABELS[key] || key}</span><span class="flavor-bar__track"><span class="flavor-bar__fill" style="--v:${v / 5}"></span></span><b>${v}/5</b></div>`;
    }).join('')}</div>`;
  }

  function renderTaste() {
    const wrap = $('#taste-grid');
    if (!wrap) return;
    wrap.innerHTML = (D.dishes || []).map((d) => `
      <article class="taste-card" data-open-dish="${d.id}" tabindex="0" role="button" aria-label="Buka resep ${esc(d.name)}">
        <div class="taste-card__head">
          ${d.image ? `<img class="taste-card__thumb" src="${esc(d.image)}" alt="" loading="lazy">` : ''}
          <div>
            <h3>${esc(d.name)}</h3>
            <p class="taste-card__origin">${esc(d.origin)} · ${esc((d.tastes || []).slice(0, 3).join(' · '))}</p>
          </div>
        </div>
        ${flavorBars(d.flavor, ['pedas', 'asam', 'gurih', 'manis'])}
      </article>`).join('');
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      wrap.querySelectorAll('.flavor-bar__fill').forEach((f, i) => {
        setTimeout(() => { f.style.transform = `scaleX(${f.style.getPropertyValue('--v')})`; }, Math.min(i * 18, 500));
      });
      io.disconnect();
    }, { threshold: .15 });
    io.observe(wrap);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(wrap);
  }

  function dishModal(d) {
    let servings = d.serves;
    const base = d.serves;
    const related = (d.pairings || []).map((id) => dishById[id]).filter(Boolean);
    const spice = Math.max(0, Math.min(5, Number(d.spice) || 0));
    const content = `
      <div class="dish-detail__head" style="--accent:var(--clay)">
        <div class="dish-detail__art">${dishArt(d)}</div>
        <div>
          <div class="dish-detail__eyebrow">
            ${(d.types || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
            ${(d.labels || []).map((l) => `<span class="tag">${esc(l)}</span>`).join('')}
          </div>
          <h2>${esc(d.name)}</h2>
          <p class="dish-detail__origin">${icon('pin')} ${esc(d.origin)}</p>
          <p class="dish-detail__quote">“${esc(d.philosophy.split('. ')[0])}.”</p>
          <div class="dish-detail__stats">
            <span>${icon('clock')} ${esc(d.time)}</span>
            <span>${icon('users')} ${d.serves} porsi dasar</span>
            <span>${icon('chef')} ${esc(d.difficulty)}</span>
            <span>${icon('flame')} Pedas ${spice}/5</span>
          </div>
          <div class="detail-actions">
            <button class="btn btn--sm btn--outline" type="button" data-share-dish="${d.id}">${icon('share')} Bagikan resep</button>
            <button class="btn btn--sm btn--ghost" type="button" data-modal-close>${icon('close')} Tutup</button>
          </div>
        </div>
      </div>
      <div class="dish-detail__body">
        <div class="detail-layout" style="margin-top:0">
          <div class="dish-story">
            <p>${esc(d.philosophy)}</p>
            <p>${esc(d.story)}</p>
            <div class="detail-block" style="margin-top:24px">
              <div class="detail-block__head"><h3>Profil rasa</h3><span>Editorial</span></div>
              ${flavorBars(d.flavor)}
              <p class="tiny faint" style="margin-top:10px">Pemetaan kasar untuk membantu pembaca memilih; bukan standar baku dapur Lampung.</p>
            </div>
          </div>
          <aside class="detail-aside">
            <div class="fact-card">
              <div class="fact-card__head">${icon('info')} Ringkas</div>
              <dl class="fact-list">
                <div class="fact-row"><dt>Jenis</dt><dd>${esc((d.types || []).join(' · '))}</dd></div>
                <div class="fact-row"><dt>Waktu</dt><dd>${esc(d.time)}</dd></div>
                <div class="fact-row"><dt>Tingkat</dt><dd>${esc(d.difficulty)}</dd></div>
                <div class="fact-row"><dt>Porsi dasar</dt><dd>${d.serves} orang</dd></div>
              </dl>
            </div>
            ${related.length ? `<div class="fact-card">
              <div class="fact-card__head">${icon('bowl')} Cocok dengan</div>
              <div class="fact-list"><div class="pairing-row">${related.map((r) => `<a href="?hidangan=${encodeURIComponent(r.id)}" data-open-dish="${r.id}">${esc(r.name)}</a>`).join('')}</div></div>
            </div>` : ''}
          </aside>
        </div>

        <div class="recipe-grid">
          <div class="recipe-panel">
            <h3>${icon('carrot')} Bahan</h3>
            <div class="serving-control">
              <span>Skala porsi</span>
              <button type="button" data-serv="-1" aria-label="Kurangi porsi">${icon('minus')}</button>
              <b data-serv-value>${servings}</b>
              <button type="button" data-serv="1" aria-label="Tambah porsi">${icon('plus')}</button>
            </div>
            <div class="ingredient-rows" data-ingredient-rows>
              ${d.ingredients.map((ing) => `<div class="ingredient-row"><span>${esc(ing.name)}</span><span class="qty" data-base="${ing.qty}">${formatQty(ing.qty)} ${esc(ing.unit)}</span></div>`).join('')}
            </div>
            <p class="tiny faint" style="margin-top:10px">Takararan mengikuti ${base} porsi dasar. Sesuaikan rasa di akhir memasak.</p>
            <div class="recipe-tip"><b>Tips dapur:</b> ${esc(d.tips)}</div>
          </div>
          <div class="recipe-panel">
            <h3>${icon('flame')} Langkah</h3>
            <div class="step-list">
              ${d.steps.map((s, i) => `<button class="step-item" type="button" aria-pressed="false" data-step="${i}">
                <span class="step-item__check">${icon('check')}</span>
                <p>${esc(s)}</p>
              </button>`).join('')}
            </div>
            <p class="tiny faint" style="margin-top:12px">Tekan langkah untuk menandainya selesai. Progres tidak disimpan setelah modal ditutup.</p>
          </div>
        </div>
        <div class="detail-footer-note">
          <span>${icon('shield')} Resep umum · dapat berbeda antardapur dan antardaerah</span>
          <span>${icon('bowl')} Ruwa Jurai · draf kurasi ${new Date().getFullYear()}</span>
        </div>
      </div>`;

    RJ.trackDish(d.id);
    if (history.replaceState) history.replaceState(null, '', `?hidangan=${encodeURIComponent(d.id)}`);

    RJ.openModal({
      content,
      label: `Resep: ${d.name}`,
      className: 'modal--wide',
      onMount(root) {
        const rows = root.querySelector('[data-ingredient-rows]');
        const value = root.querySelector('[data-serv-value]');
        const refresh = () => {
          if (value) {
            value.textContent = String(servings);
            value.classList.remove('is-pop');
            void value.offsetWidth;
            value.classList.add('is-pop');
          }
          if (!rows) return;
          rows.querySelectorAll('.qty').forEach((el) => {
            const baseQty = Number(el.dataset.base) || 0;
            const scaled = baseQty * servings / base;
            const unit = el.textContent.trim().replace(/^[\d.,]+\s*/, '');
            el.textContent = `${formatQty(scaled)} ${unit}`;
          });
        };
        root.querySelectorAll('[data-serv]').forEach((btn) => btn.addEventListener('click', () => {
          servings = Math.max(1, Math.min(16, servings + Number(btn.dataset.serv)));
          RJ.sound.tap();
          refresh();
        }));
        root.querySelectorAll('[data-step]').forEach((btn) => btn.addEventListener('click', () => {
          const done = btn.classList.toggle('is-done');
          btn.setAttribute('aria-pressed', String(done));
          if (done) RJ.sound.tap();
          const all = root.querySelectorAll('[data-step]');
          if (done && Array.from(all).every((s) => s.classList.contains('is-done'))) {
            RJ.toast('Semua langkah selesai. Selamat mencoba dan bagikan ceritanya!', { title: 'Resep tuntas', icon: 'trophy', duration: 4600 });
            RJ.sound.win();
            RJ.confetti({ count: 70 });
          }
        }));
        const shareBtn = root.querySelector('[data-share-dish]');
        if (shareBtn) shareBtn.addEventListener('click', () => {
          RJ.share({ title: `${d.name} — Ruwa Jurai`, text: d.summary, url: new URL(`?hidangan=${encodeURIComponent(d.id)}`, location.href).href });
        });
        root.querySelectorAll('[data-open-dish]').forEach((a) => a.addEventListener('click', (ev) => {
          ev.preventDefault();
          const next = dishById[a.dataset.openDish];
          if (next) { RJ.closeModal(); setTimeout(() => dishModal(next), 240); }
        }));
      }
    });
  }

  function bind() {
    $$('[data-open-dish]').forEach((el) => {
      el.addEventListener('click', () => {
        const d = dishById[el.dataset.openDish];
        if (d) dishModal(d);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const d = dishById[el.dataset.openDish];
          if (d) dishModal(d);
        }
      });
    });

    const search = $('#dish-search');
    const clear = $('#dish-clear');
    if (search) {
      search.addEventListener('input', RJ.debounce(() => {
        query = search.value.trim();
        if (clear) clear.classList.toggle('is-visible', !!query);
        renderGrid();
      }, 140));
      search.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { query = ''; search.value = ''; clear?.classList.remove('is-visible'); renderGrid(); }
      });
    }
    if (clear) clear.addEventListener('click', () => {
      if (search) search.value = '';
      query = '';
      clear.classList.remove('is-visible');
      renderGrid();
      search?.focus();
    });

    const reset = $('#dish-reset');
    if (reset) reset.addEventListener('click', () => {
      query = ''; activeType = 'all';
      if (search) search.value = '';
      clear?.classList.remove('is-visible');
      $$('#dish-filters [data-type]').forEach((b) => {
        b.classList.toggle('chip--active', b.dataset.type === 'all');
        b.setAttribute('aria-pressed', String(b.dataset.type === 'all'));
      });
      renderGrid();
    });

    const grid = $('#dish-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('[data-open-dish]');
        if (card) { const d = dishById[card.dataset.openDish]; if (d) dishModal(d); }
      });
      grid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('[data-open-dish]');
        if (!card) return;
        e.preventDefault();
        const d = dishById[card.dataset.openDish];
        if (d) dishModal(d);
      });
    }
  }

  function init() {
    renderFilters();
    renderGrid();
    renderIngredients();
    renderTaste();
    bind();
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
    const deep = RJ.getQuery('hidangan');
    if (deep && dishById[deep]) setTimeout(() => dishModal(dishById[deep]), 420);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
