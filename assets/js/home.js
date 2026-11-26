/* =========================================================
   RUWA JURAI — Home page interactions
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');

  const saiPhrases = [
    'Tahukah kamu? Tapis dibuat dari benang katun lalu disulam dengan benang emas.',
    'Siger bukan sekadar mahkota. Ia menandai kehormatan dan tanggung jawab baru.',
    'Di Lampung Barat, topeng Sekura turun ke jalan sekitar Idulfitri.',
    'Seruit paling enak ketika dimakan bersama. Piringnya memang dibuat lebar.',
    'Piil Pesenggiri bukan kesombongan. Ia tentang menjaga nama baik dan berbagi.',
    'Bahasa Lampung punya dua rumpun dialek yang sering disebut A (Api) dan O (Nyow).',
    'Gamolan dan talo balak adalah bunyi yang menemani kerja adat.',
    'Aksara Lampung adalah abugida: satu huruf bisa berubah bunyi lewat anak huruf.'
  ];
  const saiStories = [
    'Aku pernah dengar cerita tentang nelayan Krui yang membaca arah angin seperti membaca tangan tua. Mungkin itu juga sejenis aksara.',
    'Kata orang, tapis yang baik tidak dibuat tergesa-gesa. Benangnya menyimpan waktu penenunnya.',
    'Sekura membuat wajah sehari-hari boleh bersembunyi sebentar. Tawanya jadi milik semua orang.',
    'Aku paling suka bagian musyawarah: semua duduk, semua boleh bicara, lalu keputusan diangkat bersama.',
    'Kalau kamu membuka kamus, jangan cari satu jawaban. Cari siapa yang masih memakai kata itu hari ini.'
  ];

  function initHero() {
    const scene = $('[data-hero-scene]');
    if (scene && window.RJ_ART) scene.innerHTML = window.RJ_ART.heroScene();

    const hero = $('.home-hero');
    if (!hero) return;
    const layers = $$('[data-depth]', hero);
    const pupils = $$('.sai-pupils', hero);
    let raf = null;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    function tickParallax() {
      curX += (targetX - curX) * 0.11;
      curY += (targetY - curY) * 0.11;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth) || 0;
        layer.style.transform = `translate3d(${(-curX * depth * 260).toFixed(2)}px, ${(-curY * depth * 170).toFixed(2)}px, 0)`;
      });
      pupils.forEach((p) => {
        p.style.transform = `translate(${(curX * 10).toFixed(2)}px, ${(curY * 7.5).toFixed(2)}px)`;
      });
      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        raf = requestAnimationFrame(tickParallax);
      } else {
        raf = null;
      }
    }

    hero.addEventListener('pointermove', (e) => {
      if (window.matchMedia('(pointer: coarse)').matches || RJ.preferredReduced()) return;
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.width / 2) / rect.width;
      targetY = (e.clientY - rect.height / 2) / rect.height;
      if (!raf) raf = requestAnimationFrame(tickParallax);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      if (!raf && !RJ.preferredReduced()) raf = requestAnimationFrame(tickParallax);
    });

    const bubble = hero.querySelector('.speech-bubble');
    function updateBubble(text, caption = 'Sai menyapa') {
      if (!bubble) return;
      bubble.innerHTML = `${esc(text)}<small>${esc(caption)}</small>`;
      bubble.classList.remove('is-pop');
      void bubble.offsetWidth;
      bubble.classList.add('is-pop');
    }

    // mascot interactions
    const mascot = hero.querySelector('.sai-svg');
    if (mascot) {
      mascot.style.cursor = 'pointer';
      mascot.setAttribute('title', 'Klik Sai untuk sapaan & fakta budaya');
      mascot.addEventListener('click', () => {
        const phrase = saiPhrases[Math.floor(Math.random() * saiPhrases.length)];
        updateBubble(phrase, 'Fakta Sai');
        RJ.toast(phrase, { title: 'Kata Sai', icon: 'spark', duration: 5200 });
        RJ.sound.tap();
        const trunk = mascot.querySelector('.sai-trunk');
        const ears = $$('.sai-ear', mascot);
        if (!RJ.preferredReduced()) {
          if (trunk) {
            trunk.animate([
              { transform: 'rotate(0deg)' },
              { transform: 'rotate(-6deg) scale(1.03)' },
              { transform: 'rotate(4deg)' },
              { transform: 'rotate(0deg)' }
            ], { duration: 750, easing: 'ease-in-out', transformOrigin: '350px 420px' });
          }
          ears.forEach((ear, i) => {
            ear.animate([
              { transform: 'rotate(0deg)' },
              { transform: i === 0 ? 'rotate(-8deg)' : 'rotate(8deg)' },
              { transform: 'rotate(0deg)' }
            ], { duration: 600, easing: 'ease-out', transformOrigin: i === 0 ? '260px 354px' : '440px 354px' });
          });
          if (RJ.burstSparks) RJ.burstSparks(mascot);
        }
      });
    }
    $$('[data-sai-action]', hero).forEach((btn) => {
      btn.addEventListener('click', () => {
        const svg = $('.sai-svg', hero);
        if (btn.dataset.saiAction === 'wave') {
          const arm = svg && svg.querySelector('.sai-arm--left');
          if (arm && !RJ.preferredReduced()) {
            arm.animate([
              { transform: 'rotate(0deg)' },
              { transform: 'rotate(-18deg)' },
              { transform: 'rotate(9deg)' },
              { transform: 'rotate(-12deg)' },
              { transform: 'rotate(0deg)' }
            ], { duration: 920, easing: 'ease-in-out', transformOrigin: '240px 505px' });
          }
          updateBubble('Tabik pun! Senang sekali kamu mampir hari ini.', 'Sai melambai');
          RJ.toast('Tabik pun! Senang kamu mampir.', { title: 'Sai melambai', icon: 'hands', duration: 2600 });
        } else {
          const story = saiStories[Math.floor(Math.random() * saiStories.length)];
          updateBubble(story, 'Cerita Sai');
          RJ.toast(story, { title: 'Cerita dari Sai', icon: 'book', duration: 6200 });
        }
      });
    });
  }

  function renderSaiAttrs() {
    const wrap = $('[data-sai-attrs]');
    if (!wrap || !D.mascotAttributes) return;
    wrap.innerHTML = D.mascotAttributes.map((a, i) => `
      <div class="sai-attr ${i === 0 ? 'is-open' : ''}" data-attr-id="${esc(a.id)}">
        <button class="sai-attr__btn" type="button" aria-expanded="${i === 0}" aria-controls="sai-attr-${a.id}">
          <span class="sai-attr__no">${a.no}</span>
          <span class="sai-attr__name">${esc(a.title)}</span>
          <span class="sai-attr__short">${esc(a.short)}</span>
          ${icon('chevron-down')}
        </button>
        <div class="sai-attr__body" id="sai-attr-${a.id}"><div><p>${esc(a.text)}</p></div></div>
      </div>`).join('');
    const featureSvg = $('.sai-feature .sai-svg');
    const partMap = { gajah: '.sai-head', siger: '.acc-siger', tapis: '.acc-tapis', tangan: '.sai-arm--left', lengkap: '.sai-bob' };
    wrap.querySelectorAll('.sai-attr__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.sai-attr');
        const id = item.dataset.attrId;
        const open = btn.getAttribute('aria-expanded') === 'true';
        wrap.querySelectorAll('.sai-attr').forEach((x) => {
          x.classList.remove('is-open');
          const b = x.querySelector('.sai-attr__btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          RJ.sound.tap();
          if (featureSvg) {
            featureSvg.querySelectorAll('.is-part-glow').forEach((el) => el.classList.remove('is-part-glow'));
            const part = featureSvg.querySelector(partMap[id] || '.sai-bob');
            if (part) part.classList.add('is-part-glow');
          }
        }
      });
    });
  }

  function renderHighlights() {
    const rail = $('#highlight-rail');
    if (!rail || !D.highlights) return;
    rail.innerHTML = D.highlights.map((h) => {
      const href = h.type === 'kuliner'
        ? `kuliner.html?hidangan=${encodeURIComponent(h.dishId)}`
        : `ensiklopedia.html?entri=${encodeURIComponent(h.entryId)}`;
      const motif = window.RJ_ART ? window.RJ_ART.motifPaths(h.motif || 'compass', 300, 300, 3.3) : '';
      const photo = h.image ? `<img class="highlight-card__photo" src="${esc(h.image)}" alt="${esc(h.title)}" loading="lazy">` : '';
      return `<a class="highlight-card" href="${href}">
        ${photo}
        <span class="highlight-card__label">${esc(h.label)}</span>
        <span class="highlight-card__art" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><g color="currentColor">${motif}</g></svg></span>
        <h3>${esc(h.title)}</h3>
        <p>${esc(h.desc)}</p>
        <span class="highlight-card__foot"><span>${h.type === 'kuliner' ? 'Kuliner' : 'Budaya'} · Baca</span>${icon('arrow-up-right')}</span>
      </a>`;
    }).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(rail);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(rail);

    const prev = $('[data-rail-prev]');
    const next = $('[data-rail-next]');
    const scrollBy = () => Math.min(rail.clientWidth * 0.8, 420);
    if (prev) prev.addEventListener('click', () => rail.scrollBy({ left: -scrollBy(), behavior: RJ.preferredReduced() ? 'auto' : 'smooth' }));
    if (next) next.addEventListener('click', () => rail.scrollBy({ left: scrollBy(), behavior: RJ.preferredReduced() ? 'auto' : 'smooth' }));
    const sync = () => {
      if (prev) prev.disabled = rail.scrollLeft < 8;
      if (next) next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    };
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  function renderFlavor() {
    const wrap = $('#seruit-flavor');
    if (!wrap || !D.dishes) return;
    const seruit = D.dishes.find((d) => d.id === 'seruit');
    if (!seruit) return;
    const labels = { pedas: 'Pedas', asam: 'Asam', gurih: 'Gurih', manis: 'Manis', rempah: 'Rempah', smoky: 'Bakar' };
    wrap.innerHTML = Object.entries(seruit.flavor).map(([key, val]) => `
      <div class="flavor-mini__row">
        <span>${labels[key] || key}</span>
        <span class="flavor-mini__track"><span class="flavor-mini__fill" style="--v:${val / 5}"></span></span>
        <b>${val}/5</b>
      </div>`).join('');
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        wrap.querySelectorAll('.flavor-mini__fill').forEach((f, i) => {
          setTimeout(() => { f.style.transform = `scaleX(${f.style.getPropertyValue('--v')})`; }, i * 90);
        });
        io.disconnect();
      }
    }, { threshold: .5 });
    io.observe(wrap);
  }

  function initHomeMap() {
    const wrap = $('#home-map');
    if (!wrap || !window.RJ_MAP) return;
    const map = window.RJ_MAP;
    const byId = Object.fromEntries((D.regions || []).map((r) => [r.id, r]));
    const initial = byId['pesisir-barat'] ? 'pesisir-barat' : map.regencies[0].id;
    wrap.innerHTML = `<svg viewBox="0 0 ${map.width} ${map.height}" role="img" aria-label="Peta mini kabupaten dan kota di Lampung">
      <g fill="rgba(245,239,226,.075)" stroke="rgba(217,169,79,.55)" stroke-width="1.2">
        ${map.regencies.map((r) => `<path class="mini-region" data-region="${r.id}" d="${r.path}"><title>${esc(r.name)}</title></path>`).join('')}
      </g>
      <circle class="mini-beacon" cx="0" cy="0" r="14"/>
      <g>${map.regencies.map((r) => `<circle class="mini-dot" cx="${r.cx}" cy="${r.cy}" r="3.2" opacity=".5"/>`).join('')}</g>
    </svg>`;
    const card = $('#home-map-card');
    const chips = $('#home-map-chips');
    const beacon = wrap.querySelector('.mini-beacon');
    const featured = ['pesisir-barat', 'lampung-barat', 'lampung-tengah', 'lampung-timur'];
    function select(id) {
      const region = byId[id];
      if (!region) return;
      const mReg = map.regencies.find((m) => m.id === id);
      if (beacon && mReg) {
        beacon.setAttribute('cx', String(mReg.cx));
        beacon.setAttribute('cy', String(mReg.cy));
      }
      wrap.querySelectorAll('.mini-region').forEach((p) => {
        p.classList.toggle('is-active', p.dataset.region === id);
      });
      wrap.querySelectorAll('.mini-dot').forEach((d, i) => {
        d.setAttribute('r', map.regencies[i].id === id ? '5.5' : '3.2');
        d.setAttribute('opacity', map.regencies[i].id === id ? '1' : '.5');
      });
      card.innerHTML = `<span class="tag">${esc(region.adatLabel || 'Lintas adat')}</span>
        <h3 style="margin-top:10px">${esc(region.name)}</h3>
        <p>${esc(region.summary)}</p>
        <div class="map-teaser__chips" style="margin-top:12px">${(region.highlights || []).map((h) => `<span>${esc(h)}</span>`).join('')}</div>`;
      card.classList.remove('is-swap');
      void card.offsetWidth;
      card.classList.add('is-swap');
      chips.querySelectorAll('button').forEach((b) => b.classList.toggle('is-active', b.dataset.id === id));
    }
    chips.innerHTML = featured.map((id) => {
      const r = byId[id];
      return r ? `<button type="button" data-id="${id}">${esc(r.name)}</button>` : '';
    }).join('') + `<a class="btn--ghost" style="font-size:.61rem;border:1px solid rgba(245,239,226,.18);border-radius:999px;padding:5px 9px;color:rgba(245,239,226,.6)" href="peta.html">+ 11 wilayah lain</a>`;
    chips.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => select(b.dataset.id)));
    wrap.querySelectorAll('.mini-region').forEach((p) => {
      p.addEventListener('pointerenter', () => select(p.dataset.region));
      p.addEventListener('click', () => { select(p.dataset.region); });
      p.addEventListener('focus', () => select(p.dataset.region));
    });
    select(initial);
  }

  function renderTimeline() {
    const wrap = $('#home-timeline');
    if (!wrap || !D.timeline) return;
    wrap.innerHTML = D.timeline.slice(0, 7).map((t) => `
      <div class="tl-item">
        <span class="era">${esc(t.era)}</span>
        <h4>${esc(t.title)}</h4>
        <p>${esc(t.text)}</p>
      </div>`).join('');
  }

  function renderGames() {
    const wrap = $('#home-games');
    if (!wrap) return;
    const games = [
      { icon: 'spark', title: 'Kuis Piil Pesenggiri', desc: 'Uji pemahaman falsafah', href: 'gawi.html?game=kuis', img: 'assets/img/entries/piil-pesenggiri.svg' },
      { icon: 'loom', title: 'Cocokkan Tapis', desc: 'Latih ingatan motif', href: 'gawi.html?game=tapis', img: 'assets/img/entries/tapis.webp' },
      { icon: 'crown', title: 'Pasang Siger', desc: 'Rangkai atribut Sai', href: 'gawi.html?game=siger', wide: false, img: 'assets/img/entries/siger.webp' },
      { icon: 'glyph', title: 'Tebak Aksara', desc: 'Kenali had Lampung', href: 'gawi.html?game=aksara', wide: false, img: 'assets/img/entries/aksara-lampung.svg' },
      { icon: 'bowl', title: 'Meracik Seruit', desc: 'Susun bahan & langkah', href: 'gawi.html?game=seruit', wide: true, img: 'assets/img/dishes/seruit.webp' }
    ];
    wrap.innerHTML = games.map((g) => `
      <a class="game-mini ${g.wide ? 'game-mini--wide' : ''}" href="${g.href}">
        <span class="game-mini__thumb"><img src="${g.img}" alt="" loading="lazy"></span>
        <span><b>${esc(g.title)}</b><span>${esc(g.desc)}</span></span>
        ${icon('arrow-up-right')}
      </a>`).join('');
  }

  function renderAgenda() {
    const wrap = $('#home-agenda');
    if (!wrap || !D.agenda) return;
    const picks = ['sekura', 'panen-kopi', 'durian'];
    const items = picks.map((id) => D.agenda.find((a) => a.id === id)).filter(Boolean);
    wrap.innerHTML = items.map((a) => `
      <a class="agenda-mini" href="agenda.html">
        ${a.image ? `<div class="agenda-mini__media"><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy"></div>` : ''}
        <div class="agenda-mini__date"><b>${esc(a.month.split('–')[0].slice(0, 9))}</b><span>${esc(a.type)}</span></div>
        <h4>${esc(a.title)}</h4>
        <p>${esc(a.desc)}</p>
        <span class="agenda-mini__loc">${icon('pin')} ${esc(a.location)}</span>
      </a>`).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
  }

  function init() {
    initHero();
    renderSaiAttrs();
    renderHighlights();
    renderFlavor();
    initHomeMap();
    renderTimeline();
    renderGames();
    renderAgenda();
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(document.body);
    if (window.RJ.renderAksara) RJ.renderAksara(document.body);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
