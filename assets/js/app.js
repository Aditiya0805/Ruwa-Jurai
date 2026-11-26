/* =========================================================
   RUWA JURAI — Shared application shell
   ========================================================= */
(function () {
  'use strict';

  const RJ = (window.RJ = window.RJ || {});
  const DATA = window.RJ_DATA || {};

  /* ---------------------------------------------------------
     Utilities
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const escapeHtml = (str) => String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const debounce = (fn, wait = 160) => {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  };
  const normalize = (str) => String(str || '').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const getQuery = (name) => new URLSearchParams(location.search).get(name);
  const pageName = () => (location.pathname.split('/').pop() || 'index.html').replace(/\/$/, '');
  const icon = (name, opts) => (window.RJ.icon ? window.RJ.icon(name, opts) : '');
  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem('rj:' + key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (_) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('rj:' + key, JSON.stringify(value)); } catch (_) { /* ignore */ }
    },
    remove(key) {
      try { localStorage.removeItem('rj:' + key); } catch (_) { /* ignore */ }
    }
  };

  const defaults = {
    theme: null,
    text: 'md',
    contrast: false,
    motion: 'auto',
    sound: false,
    favorites: [],
    entriesSeen: [],
    dishesSeen: [],
    badges: [],
    xp: 0,
    games: {},
    quizBest: 0
  };
  const state = Object.assign({}, defaults, store.get('state', {}));
  const save = () => store.set('state', state);
  const resolveTheme = () => state.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  /* ---------------------------------------------------------
     Sound engine
     --------------------------------------------------------- */
  const sound = (() => {
    let ctx = null;
    function context() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    function tone(freq, start, dur, gain = 0.04, type = 'sine') {
      if (!state.sound) return;
      const c = context();
      if (!c) return;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      const t = c.currentTime + start;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g).connect(c.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    }
    return {
      click: () => tone(620, 0, 0.05, 0.025, 'triangle'),
      tap: () => tone(480, 0, 0.04, 0.018, 'sine'),
      correct: () => { [523.25, 659.25, 783.99].forEach((f, i) => tone(f, i * 0.08, 0.16, 0.045)); },
      wrong: () => { tone(196, 0, 0.14, 0.04, 'triangle'); tone(164, 0.12, 0.2, 0.035, 'triangle'); },
      win: () => { [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.1, 0.24, 0.04)); },
      flip: () => tone(720, 0, 0.06, 0.02, 'sine'),
      enabled: () => !!state.sound
    };
  })();

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  let toastStack;
  function toast(message, opts = {}) {
    if (!toastStack) {
      toastStack = document.createElement('div');
      toastStack.className = 'toast-stack';
      toastStack.setAttribute('role', 'status');
      toastStack.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastStack);
    }
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `${icon(opts.icon || 'spark', { className: 'icon' })}
      <div class="toast__body">${opts.title ? `<b>${escapeHtml(opts.title)}</b>` : ''}<span>${escapeHtml(message)}</span></div>`;
    toastStack.appendChild(el);
    if (opts.sound !== false) sound.tap();
    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 350);
    }, opts.duration || 3600);
  }

  /* ---------------------------------------------------------
     Confetti
     --------------------------------------------------------- */
  function confetti(opts = {}) {
    if (prefersReduced() || document.documentElement.dataset.motion === 'reduce') return;
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    Object.assign(canvas.style, { position: 'fixed', inset: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '9800' });
    document.body.appendChild(canvas);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    const c = canvas.getContext('2d');
    c.scale(dpr, dpr);
    const colors = opts.colors || ['#d9a94f', '#8a2b3d', '#2b5142', '#f5efe2', '#b98635', '#a85c3e'];
    const count = opts.count || 90;
    const parts = Array.from({ length: count }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 260,
      y: innerHeight * 0.45 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 10,
      vy: -6 - Math.random() * 8,
      w: 4 + Math.random() * 7,
      h: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1
    }));
    let raf;
    const start = performance.now();
    function frame(now) {
      const elapsed = (now - start) / 1000;
      c.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach((p) => {
        p.vy += 0.28;
        p.vx *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life = Math.max(0, 1 - elapsed / 2.8);
        c.save();
        c.globalAlpha = p.life;
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.fillStyle = p.color;
        c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        c.restore();
      });
      if (elapsed < 2.9) raf = requestAnimationFrame(frame);
      else { cancelAnimationFrame(raf); canvas.remove(); }
    }
    raf = requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------
     Progress / badges
     --------------------------------------------------------- */
  const badgeDefs = DATA.badges || [];
  function awardBadge(id) {
    if (!id || state.badges.includes(id)) return false;
    state.badges.push(id);
    const badge = badgeDefs.find((b) => b.id === id);
    if (badge) {
      state.xp += badge.xp || 10;
      toast(`Lencana baru: ${badge.title} · +${badge.xp} XP`, { title: 'Pencapaian', icon: badge.icon || 'trophy' });
      sound.correct();
    }
    save();
    return true;
  }
  function addXP(n) {
    state.xp = Math.max(0, (state.xp || 0) + n);
    save();
  }
  function trackEntry(id) {
    if (!id) return;
    if (!state.entriesSeen.includes(id)) {
      state.entriesSeen.push(id);
      save();
    }
    if (state.entriesSeen.length >= 1) awardBadge('penjelajah');
    if (state.entriesSeen.length >= 5) awardBadge('kolektor');
  }
  function trackDish(id) {
    if (!id) return;
    if (!state.dishesSeen.includes(id)) {
      state.dishesSeen.push(id);
      save();
    }
    if (state.dishesSeen.length >= 3) awardBadge('pecinta-rasa');
  }

  /* ---------------------------------------------------------
     Modal
     --------------------------------------------------------- */
  let modalRoot = null;
  let modalTrigger = null;
  function openModal(opts = {}) {
    closeModal(true);
    modalTrigger = document.activeElement;
    modalRoot = document.createElement('div');
    modalRoot.className = `modal ${opts.className || ''}`;
    modalRoot.setAttribute('role', 'dialog');
    modalRoot.setAttribute('aria-modal', 'true');
    modalRoot.setAttribute('aria-label', opts.label || 'Tampilan detail');
    modalRoot.innerHTML = `
      <div class="modal__backdrop" data-modal-close></div>
      <div class="modal__dialog" role="document">
        <button class="modal__close" type="button" data-modal-close aria-label="Tutup">${icon('close')}</button>
        <div class="modal__body">${opts.content || ''}</div>
      </div>`;
    document.body.appendChild(modalRoot);
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => modalRoot.classList.add('is-open'));
    const focusTarget = modalRoot.querySelector('[data-autofocus]') || modalRoot.querySelector('.modal__close');
    setTimeout(() => focusTarget && focusTarget.focus(), 60);
    modalRoot.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) closeModal();
    });
    document.addEventListener('keydown', modalKeys);
    if (opts.onMount) opts.onMount(modalRoot);
    return modalRoot;
  }
  function modalKeys(e) {
    if (!modalRoot) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
    if (e.key !== 'Tab') return;
    const focusables = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', modalRoot)
      .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function closeModal(instant = false) {
    if (!modalRoot) return;
    const el = modalRoot;
    modalRoot = null;
    document.removeEventListener('keydown', modalKeys);
    document.body.classList.remove('is-locked');
    if (instant) {
      el.remove();
    } else {
      el.classList.remove('is-open');
      setTimeout(() => el.remove(), 360);
      if (modalTrigger && typeof modalTrigger.focus === 'function') modalTrigger.focus();
    }
  }

  /* ---------------------------------------------------------
     Share / download helpers
     --------------------------------------------------------- */
  async function copyText(text, message = 'Tautan disalin.') {
    try {
      await navigator.clipboard.writeText(text);
      toast(message, { icon: 'copy' });
    } catch (_) {
      toast('Peramban tidak mengizinkan penyalinan otomatis.', { icon: 'alert' });
    }
  }
  async function share(opts = {}) {
    const data = { title: opts.title || document.title, text: opts.text || '', url: opts.url || location.href };
    if (navigator.share) {
      try { await navigator.share(data); return; } catch (_) { /* cancelled */ }
    } else {
      copyText(data.url, 'Tautan disalin untuk dibagikan.');
    }
  }
  function downloadICS(items, filename = 'ruwa-jurai-agenda.ics') {
    const list = Array.isArray(items) ? items : [items];
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ruwa Jurai//Agenda Budaya//ID', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
    list.forEach((it, i) => {
      const start = it.start || new Date();
      const end = it.end || new Date(start.getTime() + 3 * 3600 * 1000);
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${Date.now()}-${i}@ruwajurai.id`);
      lines.push(`DTSTAMP:${stamp(new Date())}`);
      lines.push(`DTSTART:${stamp(start)}`);
      lines.push(`DTEND:${stamp(end)}`);
      lines.push(`SUMMARY:${String(it.title || 'Agenda Ruwa Jurai').replace(/[,;]/g, ' ')}`);
      lines.push(`LOCATION:${String(it.location || 'Lampung').replace(/[,;]/g, ' ')}`);
      lines.push(`DESCRIPTION:${String(it.desc || 'Agenda budaya Ruwa Jurai. Tanggal perkiraan, periksa penyelenggara.').replace(/\n/g, ' ')}`);
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast('Berkas kalender diunduh. Tanggal bersifat perkiraan.', { icon: 'download', title: 'Agenda' });
  }

  /* ---------------------------------------------------------
     Theme / appearance
     --------------------------------------------------------- */
  function applyAppearance() {
    const root = document.documentElement;
    root.dataset.theme = resolveTheme();
    root.dataset.text = state.text || 'md';
    if (state.contrast) root.dataset.contrast = 'high'; else delete root.dataset.contrast;
    if (state.motion === 'reduce') root.dataset.motion = 'reduce'; else delete root.dataset.motion;
    root.style.colorScheme = resolveTheme();
  }
  function setTheme(theme) {
    state.theme = theme;
    save();
    applyAppearance();
    document.dispatchEvent(new CustomEvent('rj:theme', { detail: { theme } }));
  }
  function toggleTheme() {
    const next = resolveTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    sound.tap();
    toast(next === 'dark' ? 'Mode gelap aktif.' : 'Mode terang aktif.', { icon: next === 'dark' ? 'moon' : 'sun', duration: 1800 });
  }
  function setText(size) {
    state.text = size;
    save();
    applyAppearance();
  }
  function setContrast(on) {
    state.contrast = !!on;
    save();
    applyAppearance();
  }
  function setMotion(reduce) {
    state.motion = reduce ? 'reduce' : 'auto';
    save();
    applyAppearance();
  }
  function setSound(on) {
    state.sound = !!on;
    save();
    if (on) sound.correct();
    syncSoundButtons();
  }
  function syncSoundButtons() {
    $$('[data-sound-toggle]').forEach((b) => {
      b.setAttribute('aria-pressed', String(!!state.sound));
      b.classList.toggle('is-sound', !!state.sound);
      b.setAttribute('aria-label', state.sound ? 'Nonaktifkan suara antarmuka' : 'Aktifkan suara antarmuka');
      b.setAttribute('data-tip', state.sound ? 'Suara aktif' : 'Suara nonaktif');
      b.innerHTML = `<span class="sound-bars" aria-hidden="true"><span></span><span></span><span></span></span>`;
    });
    const switchEl = $('[data-setting="sound"]');
    if (switchEl) switchEl.setAttribute('aria-checked', String(!!state.sound));
  }

  /* ---------------------------------------------------------
     Header / mobile nav
     --------------------------------------------------------- */
  const NAV = [
    { href: 'index.html', label: 'Beranda', en: 'Home' },
    { href: 'ensiklopedia.html', label: 'Ensiklopedia', en: 'Adat' },
    { href: 'kuliner.html', label: 'Kuliner', en: 'Rasa' },
    { href: 'peta.html', label: 'Peta', en: 'Jelajah' },
    { href: 'gawi.html', label: 'Gawi', en: 'Dolan' },
    { href: 'kamus.html', label: 'Kamus', en: 'Aksara' },
    { href: 'agenda.html', label: 'Agenda', en: 'Waktu' },
    { href: 'tentang.html', label: 'Tentang', en: 'Kami' }
  ];

  function headerHTML() {
    const active = pageName();
    return `
    <a class="skip-link" href="#main">Lewati ke konten</a>
    <header class="site-header" id="site-header">
      <div class="header__inner">
        <a class="brand" href="index.html" aria-label="Ruwa Jurai — beranda">
          ${window.RJ_ART ? window.RJ_ART.logo : ''}
          <span class="brand__word"><b>Ruwa Jurai</b><small>Sai Bumi Ruwa Jurai</small></span>
        </a>
        <nav class="main-nav" aria-label="Navigasi utama">
          ${NAV.map((n) => `<a href="${n.href}" ${n.href === active ? 'aria-current="page"' : ''}>${n.label}</a>`).join('')}
        </nav>
        <div class="header__tools">
          <button class="search-trigger" type="button" data-open-search aria-label="Cari di Ruwa Jurai">
            ${icon('search', { className: 'icon icon--sm' })}<span>Cari</span><kbd>⌘K</kbd>
          </button>
          <button class="tool-btn tool-btn--desktop" type="button" data-sound-toggle aria-pressed="false" data-tip="Suara nonaktif" aria-label="Aktifkan suara antarmuka">
            <span class="sound-bars" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
          <button class="tool-btn" type="button" data-open-settings aria-label="Pengaturan tampilan dan aksesibilitas" data-tip="Pengaturan">
            ${icon('settings')}
          </button>
          <button class="tool-btn" type="button" data-theme-toggle aria-label="Ubah mode terang atau gelap" data-tip="Mode warna">
            <span data-theme-icon>${icon('moon')}</span>
          </button>
          <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Buka menu">
            <span class="menu-btn__lines" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </div>
    </header>
    <div class="scroll-progress" aria-hidden="true"><span></span></div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Navigasi seluler">
      <div class="mobile-nav__links">
        ${NAV.map((n, i) => `<a href="${n.href}" ${n.href === active ? 'aria-current="page"' : ''}><span class="num">${String(i + 1).padStart(2, '0')}</span>${n.label}<small style="margin-left:auto;font-family:var(--font-body);font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;opacity:.5">${n.en}</small></a>`).join('')}
      </div>
      <div class="mobile-nav__foot">
        <span class="tiny">Sai Bumi Ruwa Jurai</span>
        <span>Draf kurasi budaya · 2026</span>
        <button class="link-arrow" type="button" data-open-search style="color:var(--gold-2);border-color:rgba(245,239,226,.3)">Cari di situs ${icon('search')}</button>
      </div>
    </nav>`;
  }

  function footerHTML() {
    const year = new Date().getFullYear();
    return `
    <footer class="site-footer" id="site-footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <a class="brand" href="index.html" aria-label="Ruwa Jurai">
              ${window.RJ_ART ? window.RJ_ART.logo : ''}
              <span class="brand__word"><b>Ruwa Jurai</b><small>Sai Bumi Ruwa Jurai</small></span>
            </a>
            <p>Ruang cerita budaya dan kuliner Lampung. Dirakit dengan hormat untuk pemilik tradisi, generasi muda, dan siapa pun yang ingin pulang dengan cerita baru.</p>
            <div class="footer__aksara aksara-wrap" data-aksara="ruwa jurai" data-aksara-decor aria-hidden="true"></div>
            <p class="tiny" style="margin-top:10px;opacity:.55">Tulisan aksara adalah ornamen visual, bukan rujukan ortografi.</p>
          </div>
          <div class="footer__col">
            <h4>Jelajah</h4>
            <a href="ensiklopedia.html">Ensiklopedia adat</a>
            <a href="kuliner.html">Kuliner</a>
            <a href="peta.html">Peta 15 kabupaten</a>
            <a href="gawi.html">Gawi — dolan</a>
          </div>
          <div class="footer__col">
            <h4>Belajar</h4>
            <a href="kamus.html">Kamus &amp; aksara</a>
            <a href="kamus.html#konverter">Konverter aksara</a>
            <a href="agenda.html">Agenda budaya</a>
            <a href="tentang.html#sdg">Dampak SDG</a>
          </div>
          <div class="footer__col">
            <h4>Catatan</h4>
            <a href="tentang.html#kurasi">Etika kurasi</a>
            <a href="tentang.html#sumber">Sumber &amp; lisensi</a>
            <a href="tentang.html#tim">Tim &amp; kredit</a>
            <a href="tentang.html#kontak">Hubungi kami</a>
          </div>
        </div>
        <div class="footer__quote">
          <blockquote>“Satu bumi, dua jurai—<em>satu cerita yang terus ditulis.</em>”</blockquote>
          <span class="quote-mark" aria-hidden="true">”</span>
        </div>
        <div class="footer__bottom">
          <span>© ${year} Ruwa Jurai. Proyek edukasi budaya untuk GEMATIK 2026.<br>Konten berstatus <b>draf kurasi</b> dan menunggu validasi tokoh adat serta ahli bahasa.</span>
          <div class="footer__sdgs" aria-label="Tujuan Pembangunan Berkelanjutan yang didukung">
            <span class="sdg-badge">SDG 4 · Pendidikan</span>
            <span class="sdg-badge">SDG 8 · Ekonomi</span>
            <span class="sdg-badge">SDG 11 · Komunitas</span>
          </div>
        </div>
        <div class="footer__wordmark" aria-hidden="true">ruwa jurai</div>
      </div>
    </footer>`;
  }

  function bindShell() {
    const body = document.body;
    const header = $('#site-header');
    const progress = $('.scroll-progress span');
    const mobileNav = $('#mobile-nav');
    const menuBtn = $('.menu-btn');

    if (body.dataset.header === 'solid') header.classList.add('is-solid');
    if (body.dataset.header === 'hidden') header.style.display = 'none';

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 24);
      if (progress) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.setProperty('--progress', String(max > 0 ? Math.min(y / max, 1) : 0));
      }
      const toTop = $('#back-to-top');
      if (toTop) toTop.classList.toggle('is-visible', y > 900);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function closeMenu() {
      mobileNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      body.classList.remove('is-locked');
    }
    menuBtn.addEventListener('click', () => {
      const open = !mobileNav.classList.contains('is-open');
      mobileNav.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      body.classList.toggle('is-locked', open);
      if (open) { sound.tap(); setTimeout(() => mobileNav.querySelector('a').focus(), 200); }
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('[data-open-search]')) closeMenu();
    });

    const themeButtons = $$('[data-theme-toggle]');
    const updateThemeIcon = () => {
      const dark = resolveTheme() === 'dark';
      themeButtons.forEach((b) => {
        const holder = b.querySelector('[data-theme-icon]') || b;
        holder.innerHTML = icon(dark ? 'sun' : 'moon');
        b.setAttribute('data-tip', dark ? 'Mode terang' : 'Mode gelap');
      });
    };
    updateThemeIcon();
    document.addEventListener('rj:theme', updateThemeIcon);
    themeButtons.forEach((b) => b.addEventListener('click', toggleTheme));

    $$('[data-sound-toggle]').forEach((b) => b.addEventListener('click', () => setSound(!state.sound)));
    syncSoundButtons();

    $$('[data-open-search]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openSearch(); }));
    $$('[data-open-settings]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); toggleSettings(b); }));

    // back to top
    const toTop = document.createElement('button');
    toTop.id = 'back-to-top';
    toTop.className = 'back-to-top';
    toTop.type = 'button';
    toTop.setAttribute('aria-label', 'Kembali ke atas');
    toTop.innerHTML = icon('up');
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' }));
    document.body.appendChild(toTop);

    // reveal
    function bindReveals(root = document) {
      const revealEls = $$('.reveal:not(.is-inview)', root);
      if (!revealEls.length) return;
      if ('IntersectionObserver' in window && !prefersReduced() && document.documentElement.dataset.motion !== 'reduce') {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-inview');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.02, rootMargin: '0px 0px 80px 0px' });
        revealEls.forEach((el) => io.observe(el));
      } else {
        revealEls.forEach((el) => el.classList.add('is-inview'));
      }
    }
    bindReveals(document);
    RJ.bindReveals = bindReveals;

    // interactive 3D tilt + golden cursor spotlight on cards
    function bindInteractiveCards(root = document) {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const sel = '.path-card, .highlight-card, .entry-card, .dish-card, .game-card, .badge-card, .route-card, .agenda-card, .ingredient-card, .taste-card, .gallery-tile, .value-card, .sdg-card';
      $$(sel, root).forEach((card) => {
        if (card.dataset.tiltBound) return;
        card.dataset.tiltBound = '1';
        card.addEventListener('pointermove', (e) => {
          if (prefersReduced() || document.documentElement.dataset.motion === 'reduce') return;
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          const rx = ((0.5 - py) * 5.2).toFixed(2);
          const ry = ((px - 0.5) * 6.4).toFixed(2);
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        }, { passive: true });
        card.addEventListener('pointerleave', () => {
          card.style.transform = '';
          card.style.removeProperty('--mx');
          card.style.removeProperty('--my');
        });
      });
    }
    bindInteractiveCards(document);
    RJ.bindInteractiveCards = bindInteractiveCards;

    // SVG stroke draw animation for Aksara & line motifs
    function animateSvgStrokes(root, opts = {}) {
      if (!root || prefersReduced() || document.documentElement.dataset.motion === 'reduce') return;
      const paths = $$('path', root);
      const dur = opts.duration || 700;
      const stagger = opts.stagger || 50;
      paths.forEach((path, i) => {
        if (typeof path.getTotalLength !== 'function') return;
        let len = 0;
        try { len = path.getTotalLength(); } catch (_) { len = 0; }
        if (!len) return;
        path.style.strokeDasharray = `${len} ${len}`;
        path.style.strokeDashoffset = `${len}`;
        path.animate([
          { strokeDashoffset: len, opacity: 0.35 },
          { strokeDashoffset: 0, opacity: 1 }
        ], {
          duration: dur,
          delay: i * stagger,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards'
        });
      });
    }
    RJ.animateSvgStrokes = animateSvgStrokes;

    // Golden sparkle burst around an element (e.g. clicking Sai)
    function burstSparks(el) {
      if (!el || prefersReduced() || document.documentElement.dataset.motion === 'reduce') return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      for (let i = 0; i < 12; i++) {
        const sp = document.createElement('span');
        sp.className = 'spark-particle';
        const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const dist = 48 + Math.random() * 64;
        sp.style.left = cx + 'px';
        sp.style.top = cy + 'px';
        sp.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        sp.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 750);
      }
    }
    RJ.burstSparks = burstSparks;

    // interactive button click ripple
    document.addEventListener('pointerdown', (e) => {
      const btn = e.target.closest('.btn, .chip');
      if (!btn || prefersReduced() || document.documentElement.dataset.motion === 'reduce') return;
      const r = btn.getBoundingClientRect();
      const rip = document.createElement('span');
      rip.className = 'btn-ripple';
      const size = Math.max(r.width, r.height) * 1.4;
      rip.style.width = rip.style.height = size + 'px';
      rip.style.left = (e.clientX - r.left - size / 2) + 'px';
      rip.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(rip);
      setTimeout(() => rip.remove(), 600);
    }, { passive: true });

    // count up
    $$('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count);
      if (!Number.isFinite(target)) return;
      if (prefersReduced()) { el.textContent = String(target); return; }
      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1300;
        const suffix = el.dataset.suffix || '';
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, { threshold: 0.5 });
      io.observe(el);
    });

    // keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const tag = (e.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        const modalOpen = document.querySelector('.modal.is-open, .settings-popover.is-open');
        if (!modalOpen) { e.preventDefault(); openSearch(); }
      } else if (e.key === 'Escape') {
        closeSettings();
        closeMenu();
      }
    });

    // gentle click feedback
    document.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button, [role="button"], .game-tile, .chip')) sound.tap();
    }, { passive: true });

    // hydrate icons & aksara
    if (window.RJ.hydrateIcons) window.RJ.hydrateIcons(document.body);
    if (window.RJ.renderAksara) window.RJ.renderAksara(document.body);

    // animate aksara strokes on scroll into view (after renderAksara populates SVGs)
    if ('IntersectionObserver' in window && !prefersReduced() && document.documentElement.dataset.motion !== 'reduce') {
      const akIo = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSvgStrokes(entry.target, { duration: 900, stagger: 55 });
            akIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      $$('[data-aksara]').forEach((el) => akIo.observe(el));
    }
  }

  /* ---------------------------------------------------------
     Search palette
     --------------------------------------------------------- */
  let searchModal = null;
  let searchIndex = null;

  function buildSearchIndex() {
    if (searchIndex) return searchIndex;
    const pages = [
      { title: 'Beranda', desc: 'Pintu masuk Ruwa Jurai, Sai Bumi Ruwa Jurai.', url: 'index.html', type: 'Halaman', icon: 'compass' },
      { title: 'Ensiklopedia Adat', desc: 'Kategori, entri budaya, dan garis waktu Lampung.', url: 'ensiklopedia.html', type: 'Halaman', icon: 'book' },
      { title: 'Kuliner', desc: 'Cerita rasa, bahan, dan resep dari dapur Lampung.', url: 'kuliner.html', type: 'Halaman', icon: 'bowl' },
      { title: 'Peta Jelajah', desc: '15 kabupaten/kota dan kekayaan budayanya.', url: 'peta.html', type: 'Halaman', icon: 'map' },
      { title: 'Gawi', desc: 'Lima permainan budaya untuk belajar sambil bermain.', url: 'gawi.html', type: 'Halaman', icon: 'gamepad' },
      { title: 'Kamus & Aksara', desc: 'Kamus mini, konverter, dan tebak aksara.', url: 'kamus.html', type: 'Halaman', icon: 'glyph' },
      { title: 'Agenda Budaya', desc: 'Kalender perayaan, musim, dan panggung budaya.', url: 'agenda.html', type: 'Halaman', icon: 'calendar' },
      { title: 'Tentang & Sumber', desc: 'Etika kurasi, SDG, kredit, dan lisensi.', url: 'tentang.html', type: 'Halaman', icon: 'info' }
    ];
    const entries = (DATA.entries || []).map((e) => ({
      title: e.title, desc: e.subtitle, url: 'ensiklopedia.html?entri=' + encodeURIComponent(e.id),
      type: 'Budaya', icon: e.motif || 'book', keywords: [e.category, e.community, e.region, e.summary, ...(e.labels || [])].join(' ')
    }));
    const dishes = (DATA.dishes || []).map((d) => ({
      title: d.name, desc: d.summary, url: 'kuliner.html?hidangan=' + encodeURIComponent(d.id),
      type: 'Kuliner', icon: 'bowl', keywords: [d.origin, d.labels, d.tastes, d.type].join(' ')
    }));
    const dictionary = (DATA.dictionary || []).slice(0, 80).map((d) => ({
      title: d.term, desc: d.meaning + ' · ' + d.category, url: 'kamus.html?q=' + encodeURIComponent(d.term),
      type: 'Kamus', icon: 'speech', keywords: [d.note, d.dialect].join(' ')
    }));
    const regions = (DATA.regions || []).map((r) => ({
      title: r.name, desc: r.title + ' · ' + r.capital, url: 'peta.html?wilayah=' + encodeURIComponent(r.id),
      type: 'Wilayah', icon: 'pin', keywords: [r.summary, r.highlights].join(' ')
    }));
    searchIndex = [...pages, ...entries, ...dishes, ...dictionary, ...regions].map((item) => ({
      ...item, haystack: normalize([item.title, item.desc, item.type, item.keywords].join(' '))
    }));
    return searchIndex;
  }

  function searchResults(query) {
    const q = normalize(query.trim());
    const index = buildSearchIndex();
    if (!q) return index.slice(0, 9);
    const words = q.split(/\s+/).filter(Boolean);
    return index
      .map((item) => {
        let score = 0;
        words.forEach((w) => {
          if (normalize(item.title) === w) score += 8;
          else if (normalize(item.title).startsWith(w)) score += 5;
          else if (normalize(item.title).includes(w)) score += 3;
          if (item.haystack.includes(w)) score += 1;
        });
        return { item, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 18)
      .map((r) => r.item);
  }

  function openSearch() {
    closeSettings();
    closeModal(true);
    if (!searchModal) {
      searchModal = document.createElement('div');
      searchModal.className = 'modal search-modal';
      searchModal.setAttribute('role', 'dialog');
      searchModal.setAttribute('aria-modal', 'true');
      searchModal.setAttribute('aria-label', 'Pencarian situs');
      searchModal.innerHTML = `
        <div class="modal__backdrop" data-search-close></div>
        <div class="modal__dialog">
          <div class="search-shell">
            <div class="search-field">
              ${icon('search')}
              <input type="search" id="rj-search-input" placeholder="Cari cerita, rasa, wilayah…" autocomplete="off" aria-label="Kata pencarian" aria-controls="rj-search-results">
              <button class="search-esc" type="button" data-search-close aria-label="Tutup pencarian">ESC</button>
            </div>
            <div class="search-suggestions">
              ${['Seruit', 'Sekura', 'Tapis', 'Piil Pesenggiri', 'Aksara', 'Pesisir Barat'].map((s) => `<button class="chip" type="button" data-suggestion="${s}">${s}</button>`).join('')}
            </div>
            <div class="search-results" id="rj-search-results" role="listbox" aria-label="Hasil pencarian"></div>
            <div class="search-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> pilih · <kbd>↵</kbd> buka · <kbd>esc</kbd> tutup</span>
              <span>${(DATA.entries || []).length + (DATA.dishes || []).length} cerita terindeks</span>
            </div>
          </div>
        </div>`;
      document.body.appendChild(searchModal);
      searchModal.addEventListener('click', (e) => {
        if (e.target.closest('[data-search-close]')) closeSearch();
      });
      searchModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { e.preventDefault(); closeSearch(); }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          moveSearchActive(e.key === 'ArrowDown' ? 1 : -1);
        }
        if (e.key === 'Enter') {
          const active = searchModal.querySelector('.search-result.is-active');
          if (active) { e.preventDefault(); active.click(); }
        }
      });
      const input = $('#rj-search-input', searchModal);
      input.addEventListener('input', debounce(() => {
        renderSearchResults(input.value);
      }, 90));
      searchModal.querySelectorAll('[data-suggestion]').forEach((b) => {
        b.addEventListener('click', () => {
          input.value = b.dataset.suggestion;
          renderSearchResults(b.dataset.suggestion);
          input.focus();
        });
      });
      renderSearchResults('');
    }
    searchModal.classList.add('is-open');
    searchModal.style.display = '';
    document.body.classList.add('is-locked');
    setTimeout(() => {
      const input = $('#rj-search-input', searchModal);
      if (input) { input.value = ''; input.focus(); renderSearchResults(''); }
    }, 50);
    document.addEventListener('keydown', searchGlobalKeys);
  }
  function searchGlobalKeys(e) {
    if (e.key === 'Escape') closeSearch();
  }
  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    document.removeEventListener('keydown', searchGlobalKeys);
  }
  function renderSearchResults(query) {
    const wrap = $('#rj-search-results', searchModal);
    if (!wrap) return;
    const results = searchResults(query);
    if (!results.length) {
      wrap.innerHTML = `<div class="search-empty">Tidak ada hasil untuk “${escapeHtml(query)}”.<br><span class="tiny">Coba kata yang lebih singkat, misalnya “tapis” atau “seruit”.</span></div>`;
      return;
    }
    const groups = {};
    results.forEach((r) => { (groups[r.type] = groups[r.type] || []).push(r); });
    wrap.innerHTML = Object.entries(groups).map(([type, items]) => `
      <div class="search-group-title">${escapeHtml(type)}</div>
      ${items.map((r) => `
        <a class="search-result" href="${r.url}" role="option">
          <span class="search-result__icon">${icon(r.icon || 'spark')}</span>
          <span class="search-result__main"><b>${escapeHtml(r.title)}</b><span>${escapeHtml(r.desc || '')}</span></span>
          <span class="search-result__type">${escapeHtml(r.type)}</span>
        </a>`).join('')}
    `).join('');
    wrap.querySelectorAll('.search-result').forEach((a) => {
      a.addEventListener('mouseenter', () => setSearchActive(a));
    });
    setSearchActive(wrap.querySelector('.search-result'));
  }
  function setSearchActive(el) {
    if (!searchModal) return;
    searchModal.querySelectorAll('.search-result.is-active').forEach((x) => x.classList.remove('is-active'));
    if (el) {
      el.classList.add('is-active');
      el.scrollIntoView({ block: 'nearest' });
    }
  }
  function moveSearchActive(dir) {
    const items = $$('.search-result', searchModal);
    if (!items.length) return;
    const current = items.findIndex((x) => x.classList.contains('is-active'));
    let next = current + dir;
    if (next < 0) next = items.length - 1;
    if (next >= items.length) next = 0;
    setSearchActive(items[next]);
    sound.tap();
  }

  /* ---------------------------------------------------------
     Settings popover
     --------------------------------------------------------- */
  let settingsEl = null;
  function ensureSettings() {
    if (settingsEl) return settingsEl;
    settingsEl = document.createElement('div');
    settingsEl.className = 'settings-popover';
    settingsEl.setAttribute('role', 'dialog');
    settingsEl.setAttribute('aria-label', 'Pengaturan tampilan dan aksesibilitas');
    settingsEl.innerHTML = `
      <h3>Tampilan &amp; aksesibilitas</h3>
      <div class="setting-row">
        <span class="setting-row__label">Tema<small>Terang atau gelap, tersimpan di perangkat.</small></span>
        <div class="seg" role="group" aria-label="Tema">
          <button type="button" data-set-theme="light" aria-pressed="false">Terang</button>
          <button type="button" data-set-theme="dark" aria-pressed="false">Gelap</button>
        </div>
      </div>
      <div class="setting-row">
        <span class="setting-row__label">Ukuran teks<small>Untuk kenyamanan membaca.</small></span>
        <div class="seg" role="group" aria-label="Ukuran teks">
          <button type="button" data-set-text="md" aria-pressed="false">A</button>
          <button type="button" data-set-text="lg" aria-pressed="false">A+</button>
          <button type="button" data-set-text="xl" aria-pressed="false">A++</button>
        </div>
      </div>
      <div class="setting-row">
        <span class="setting-row__label">Kontras tinggi<small>Memperkuat batas dan warna teks.</small></span>
        <button type="button" class="switch" role="switch" data-setting="contrast" aria-checked="false" aria-label="Kontras tinggi"></button>
      </div>
      <div class="setting-row">
        <span class="setting-row__label">Kurangi gerak<small>Menonaktifkan animasi besar.</small></span>
        <button type="button" class="switch" role="switch" data-setting="motion" aria-checked="false" aria-label="Kurangi gerak"></button>
      </div>
      <div class="setting-row">
        <span class="setting-row__label">Suara antarmuka<small>Nada lembut untuk interaksi.</small></span>
        <button type="button" class="switch" role="switch" data-setting="sound" aria-checked="false" aria-label="Suara antarmuka"></button>
      </div>
      <div class="setting-row" style="justify-content:flex-end;padding-bottom:2px">
        <button type="button" class="link-arrow" data-reset-settings style="font-size:.66rem">Atur ulang</button>
      </div>`;
    document.body.appendChild(settingsEl);

    settingsEl.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('[data-set-theme]');
      if (themeBtn) { setTheme(themeBtn.dataset.setTheme); syncSettings(); sound.tap(); }
      const textBtn = e.target.closest('[data-set-text]');
      if (textBtn) { setText(textBtn.dataset.setText); syncSettings(); sound.tap(); }
      const sw = e.target.closest('[data-setting]');
      if (sw) {
        const key = sw.dataset.setting;
        if (key === 'contrast') setContrast(!state.contrast);
        if (key === 'motion') setMotion(state.motion !== 'reduce');
        if (key === 'sound') setSound(!state.sound);
        syncSettings();
        sound.tap();
      }
      if (e.target.closest('[data-reset-settings]')) {
        Object.assign(state, { theme: null, text: 'md', contrast: false, motion: 'auto', sound: false });
        save(); applyAppearance(); syncSettings(); syncSoundButtons();
        toast('Pengaturan tampilan dikembalikan ke awal.', { icon: 'rotate' });
      }
    });
    return settingsEl;
  }
  function syncSettings() {
    if (!settingsEl) return;
    const theme = resolveTheme();
    $$('[data-set-theme]', settingsEl).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setTheme === theme)));
    $$('[data-set-text]', settingsEl).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setText === (state.text || 'md'))));
    const contrast = $('[data-setting="contrast"]', settingsEl);
    if (contrast) contrast.setAttribute('aria-checked', String(!!state.contrast));
    const motion = $('[data-setting="motion"]', settingsEl);
    if (motion) motion.setAttribute('aria-checked', String(state.motion === 'reduce'));
    const snd = $('[data-setting="sound"]', settingsEl);
    if (snd) snd.setAttribute('aria-checked', String(!!state.sound));
  }
  function toggleSettings(trigger) {
    const el = ensureSettings();
    syncSettings();
    const open = !el.classList.contains('is-open');
    if (!open) { closeSettings(); return; }
    el.classList.add('is-open');
    const rect = trigger ? trigger.getBoundingClientRect() : null;
    if (rect) {
      el.style.top = Math.min(rect.bottom + 10, innerHeight - 100) + 'px';
      el.style.right = Math.max(14, innerWidth - rect.right) + 'px';
    }
    setTimeout(() => {
      document.addEventListener('pointerdown', settingsOutside);
      document.addEventListener('keydown', settingsKeys);
    }, 10);
  }
  function settingsOutside(e) {
    if (!settingsEl) return;
    if (settingsEl.contains(e.target) || e.target.closest('[data-open-settings]')) return;
    closeSettings();
  }
  function settingsKeys(e) {
    if (e.key === 'Escape') closeSettings();
  }
  function closeSettings() {
    if (!settingsEl) return;
    settingsEl.classList.remove('is-open');
    document.removeEventListener('pointerdown', settingsOutside);
    document.removeEventListener('keydown', settingsKeys);
  }

  /* ---------------------------------------------------------
     Preloader
     --------------------------------------------------------- */
  function mountPreloader() {
    const seen = sessionStorage.getItem('rj:visited');
    const skip = seen || prefersReduced();
    sessionStorage.setItem('rj:visited', '1');
    const el = document.createElement('div');
    el.className = 'preloader';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="preloader__inner">
        <svg class="preloader__loom" viewBox="0 0 420 220" aria-hidden="true" fill="none">
          <g stroke="#d9a94f" opacity=".5">
            <path d="M20 24h380M20 196h380M40 24v172M380 24v172"/>
          </g>
          <g stroke="#d9a94f" stroke-width="1.4">
            <path class="warp" d="M80 40v140M120 40v140M160 40v140M200 40v140M240 40v140M280 40v140M320 40v140"/>
          </g>
          <g stroke="#edd6a6" stroke-width="2.2">
            <path class="thread" d="M60 72q50 34 100 0t100 0 100 0"/>
            <path class="thread" d="M60 104q50 34 100 0t100 0 100 0"/>
            <path class="thread" d="M60 136q50 34 100 0t100 0 100 0"/>
            <path class="thread" d="M60 168q50 34 100 0t100 0 100 0"/>
          </g>
          <g class="motif" stroke="#edd6a6" stroke-width="1.6" opacity=".9">
            <path d="M210 20 226 36 210 52 194 36Z"/>
            <path d="M210 28 218 36 210 44 202 36Z"/>
          </g>
        </svg>
        <div class="preloader__title">Ruwa Jurai</div>
        <div class="preloader__sub">Menghubungkan benang cerita</div>
        <div class="preloader__bar"><span></span></div>
        <div class="preloader__meta"><span>Sai Bumi</span><span data-preload-pct>0%</span><span>Ruwa Jurai</span></div>
      </div>
      <button class="preloader__skip" type="button">Lewati</button>`;
    document.body.prepend(el);
    const bar = $('.preloader__bar span', el);
    const pct = $('[data-preload-pct]', el);
    const duration = skip ? 300 : 1700;
    const start = performance.now();
    let raf;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2.2);
      bar.style.setProperty('--p', eased.toFixed(3));
      pct.textContent = Math.round(eased * 100) + '%';
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    }
    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      bar.style.setProperty('--p', '1');
      pct.textContent = '100%';
      setTimeout(() => {
        el.classList.add('is-done');
        setTimeout(() => el.remove(), 900);
      }, 180);
    }
    $('.preloader__skip', el).addEventListener('click', finish);
    raf = requestAnimationFrame(tick);
    window.addEventListener('load', () => setTimeout(finish, Math.max(0, duration - (performance.now() - start))));
  }

  /* ---------------------------------------------------------
     Init
     --------------------------------------------------------- */
  function init() {
    applyAppearance();
    const headerMount = $('[data-site-header]');
    if (headerMount) headerMount.innerHTML = headerHTML();
    const footerMount = $('[data-site-footer]');
    if (footerMount) footerMount.innerHTML = footerHTML();
    bindShell();
    bindPageNav();
    hydrateArt();
    mountPreloader();
    document.body.classList.add('is-ready');
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', () => { if (!state.theme) applyAppearance(); });
    }
  }

  function hydrateArt() {
    if (!window.RJ_ART) return;
    $$('[data-ornament]').forEach((el) => {
      if (el.dataset.artDone) return;
      el.innerHTML = window.RJ_ART.ornament(el.dataset.ornament, { className: 'page-hero__orn' });
      el.dataset.artDone = '1';
    });
    $$('[data-mascot]').forEach((el) => {
      if (el.dataset.artDone) return;
      el.innerHTML = window.RJ_ART.mascot({ bare: el.dataset.mascot === 'bare', label: el.dataset.mascotLabel || '' });
      el.dataset.artDone = '1';
    });
    $$('[data-motif-panel]').forEach((el) => {
      if (el.dataset.artDone) return;
      el.innerHTML = window.RJ_ART.motifPanel(el.dataset.motifPanel, { label: el.dataset.motifLabel || '' });
      el.dataset.artDone = '1';
    });
    $$('[data-dish]').forEach((el) => {
      if (el.dataset.artDone) return;
      el.innerHTML = window.RJ_ART.dish(el.dataset.dish);
      el.dataset.artDone = '1';
    });
    if (window.RJ.hydrateIcons) window.RJ.hydrateIcons(document.body);
  }

  function bindPageNav() {
    $$('[data-goto]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = $(el.dataset.goto);
        if (target) target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' });
      });
    });
    $$('[data-share]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        share({ title: el.dataset.shareTitle || document.title, text: el.dataset.shareText || '', url: el.dataset.shareUrl || location.href });
      });
    });
  }

  RJ.$ = $; RJ.$$ = $$; RJ.escape = escapeHtml; RJ.normalize = normalize;
  RJ.debounce = debounce; RJ.getQuery = getQuery; RJ.pageName = pageName;
  RJ.icon = RJ.icon || icon; RJ.store = store; RJ.state = state; RJ.save = save;
  RJ.toast = toast; RJ.confetti = confetti; RJ.sound = sound;
  RJ.awardBadge = awardBadge; RJ.addXP = addXP; RJ.trackEntry = trackEntry; RJ.trackDish = trackDish;
  RJ.openModal = openModal; RJ.closeModal = closeModal;
  RJ.copyText = copyText; RJ.share = share; RJ.downloadICS = downloadICS;
  RJ.openSearch = openSearch; RJ.settings = { open: toggleSettings, sync: syncSettings };
  RJ.applyAppearance = applyAppearance;
  RJ.toggleTheme = toggleTheme;
  RJ.resolveTheme = resolveTheme;
  RJ.preferredReduced = prefersReduced;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
