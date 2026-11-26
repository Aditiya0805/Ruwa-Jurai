/* =========================================================
   RUWA JURAI — Gawi game hub
   ========================================================= */
(function () {
  'use strict';

  const D = window.RJ_DATA || {};
  const AK = window.RJ.AKSARA;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const icon = (n) => (window.RJ && RJ.icon ? RJ.icon(n) : '');
  const MOTIFS = {
    kuis: 'speech',
    tapis: 'loom',
    siger: 'crown',
    aksara: 'glyph',
    seruit: 'seruit'
  };

  const GAMES = {
    kuis: { id: 'kuis', title: 'Kuis Piil Pesenggiri', short: 'Falsafah adat', desc: 'Uji pemahaman empat unsur adat: Juluk-adok, Nemui-nyimah, Nengah-nyappur, Sakai-sambayan.', accent: 'var(--maroon)', tag: 'Falsafah', min: 1, max: 10, image: 'assets/img/entries/piil-pesenggiri.svg', badge: 'kuis-piil' },
    tapis: { id: 'tapis', title: 'Cocokkan Tapis', short: 'Ingatan motif', desc: 'Latih ingatan motif tapis: benang emas, pucuk rebung, dan doa yang ditenun.', accent: 'var(--maroon)', tag: 'Memori', min: 4, max: 4, image: 'assets/img/entries/tapis.webp', badge: 'memori-tapis' },
    siger: { id: 'siger', title: 'Pasang Siger', short: 'Busana adat', desc: 'Rangkai atribut Sai: siger di kepala, tapis di badan, dan tangan terbuka.', accent: 'var(--maroon)', tag: 'Busana', min: 3, max: 3, image: 'assets/img/entries/siger.webp', badge: 'siger-stylist' },
    aksara: { id: 'aksara', title: 'Tebak Aksara', short: 'Baca aksara', desc: 'Kenali dua puluh satu huruf dasar dan anak-anaknya dari aksara Lampung.', accent: 'var(--maroon)', tag: 'Aksara', min: 1, max: 5, image: 'assets/img/entries/aksara-lampung.svg', badge: 'aksara-cerdas' },
    seruit: { id: 'seruit', title: 'Meracik Seruit', short: 'Susun rasa', desc: 'Pilih bahan pertama yang benar saat meracik seruit: ikan, sambal, dan tempoyak.', accent: 'var(--maroon)', tag: 'Kuliner', min: 1, max: 3, image: 'assets/img/dishes/seruit.webp', badge: 'seruit-chef' }
  };

  const MEMORY_MOTIFS = [
    { id: 'wave', name: 'Ombak', desc: 'Garis pantai & lalu lintas budaya' },
    { id: 'loom', name: 'Tapis', desc: 'Benang emas & doa ditenun' },
    { id: 'crown', name: 'Siger', desc: 'Mahkota & tanggung jawab' },
    { id: 'speech', name: 'Pandangan', desc: 'Musyawarah & bahasa' }
  ];

  let currentGame = null;

  function shuffle(arr) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  function cardHTML(g, idx) {
    const motif = MOTIFS[g.id];
    const best = (RJ.state.games || {})[g.id];
    const bestText = best ? '<span class="game-card__best has-score">Terbaik ' + best + '</span>' : '<span class="game-card__best">Belum dimainkan</span>';
    const wide = g.id === 'seruit';
    const art = window.RJ_ART ? window.RJ_ART.motifPaths(motif, 300, 300, 2.6) : '';
    const num = String(idx + 1).padStart(2, '0');
    const qcount = g.min === g.max ? String(g.max) + ' tantangan' : g.min + '-' + g.max + ' soal';
    const photo = g.image ? '<img class="game-card__img" src="' + esc(g.image) + '" alt="' + esc(g.title) + '" loading="lazy">' : '';
    return '<article class="game-card anim-in ' + (wide ? 'game-card--wide' : '') + '" style="--stagger:' + (idx * 55) + 'ms" data-game="' + g.id + '" tabindex="0" role="button">' +
      '<div class="game-card__art">' + photo + '<svg aria-hidden="true" viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><g color="currentColor">' + art + '</g></svg></div>' +
      '<span class="game-card__num">' + num + '</span>' +
      bestText +
      '<div class="game-card__body">' +
      '<span class="game-card__tag">' + esc(g.tag) + '</span>' +
      '<h3>' + esc(g.title) + '</h3>' +
      '<p>' + esc(g.desc) + '</p>' +
      '<div class="game-card__foot">' +
      '<span class="game-card__meta"><span data-icon="users"></span> ' + qcount + '</span>' +
      '<span class="game-card__play">Main <span data-icon="play"></span></span>' +
      '</div>' +
      '</div>' +
      '</article>';
  }

  function renderGames() {
    const wrap = $('#gawi-grid');
    if (!wrap) return;
    const list = Object.keys(GAMES).map(function (k) { return GAMES[k]; });
    wrap.innerHTML = list.map(cardHTML).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(wrap);
    $$('[data-game]', wrap).forEach(function (el) {
      el.addEventListener('click', function () { openGame(el.dataset.game, true); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGame(el.dataset.game, true); }
      });
    });
  }

  function renderBadges() {
    const wrap = $('#badge-grid');
    if (!wrap || !D.badges) return;
    wrap.innerHTML = D.badges.map(function (b, idx) {
      const earned = (RJ.state.badges || []).indexOf(b.id) >= 0;
      const cls = earned ? 'is-earned' : 'is-locked';
      const label = earned ? 'Lencana ' + b.title : 'Lencana belum diraih: ' + b.title;
      return '<article class="badge-card anim-in ' + cls + '" style="--stagger:' + (idx * 35) + 'ms" aria-label="' + label + '">' +
        '<span class="badge-card__xp">+' + b.xp + ' XP</span>' +
        '<div class="badge-card__icon">' + icon(b.icon || 'trophy') + '</div>' +
        '<h4>' + esc(b.title) + '</h4>' +
        '<p>' + esc(b.desc) + '</p>' +
        '</article>';
    }).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
    if (window.RJ.bindInteractiveCards) RJ.bindInteractiveCards(wrap);
  }

  function renderXp() {
    const xp = RJ.state.xp || 0;
    const level = Math.floor(xp / 50) + 1;
    const pct = Math.min(1, (xp % 50) / 50 || (xp >= 200 ? 1 : 0));
    const val = document.getElementById('gawi-xp');
    if (val) val.textContent = String(xp);
    $$('[data-xp-level]').forEach(function (el) { el.textContent = String(level); });
    $$('.xp-panel .xp-fill').forEach(function (el) {
      el.style.setProperty('--xp', (xp === 0 ? 0 : Math.max(0.08, pct)).toFixed(3));
    });
    const badgeLen = String((RJ.state.badges || []).length);
    $$('[data-badge-count]').forEach(function (el) { el.textContent = badgeLen; });
    const legacyBadge = document.getElementById('gawi-badge-count');
    if (legacyBadge) legacyBadge.textContent = badgeLen;
  }

  function openGame(id, scroll) {
    const g = GAMES[id];
    if (!g) return;
    currentGame = id;
    const stage = document.getElementById('game-stage');
    const body = $('#game-body');
    const title = $('#game-title');
    const badgeObj = (D.badges || []).find(function (b) { return b.id === g.badge; });
    if (title) title.textContent = g.title;
    setStageScore(0, RJ.state.xp || 0);
    if (body) body.innerHTML = '<div class="game-intro" data-game-intro="' + g.id + '">' +
      '<div class="game-intro__icon">' + icon(MOTIFS[g.id] || 'trophy') + '</div>' +
      '<h2>' + esc(g.title) + '</h2>' +
      '<p>' + esc(g.desc) + '</p>' +
      '<div class="game-intro__rules"><span>' + g.max + ' tantangan</span><span>XP +' + (g.max * 5) + '</span><span>Lencana: ' + esc(badgeObj ? badgeObj.title : '—') + '</span></div>' +
      '<div style="margin-top:24px"><button class="btn btn--gold" type="button" data-game-start="' + g.id + '">' + icon('play') + ' Mulai permainan</button></div>' +
      '</div>';
    if (stage) {
      stage.classList.add('is-open');
      stage.setAttribute('aria-hidden', 'false');
    }
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(body);
    if (scroll) {
      if (stage) stage.scrollIntoView({ behavior: RJ.preferredReduced() ? 'auto' : 'smooth', block: 'nearest' });
    }
  }

  function closeGame() {
    const stage = document.getElementById('game-stage');
    if (stage) {
      stage.classList.remove('is-open');
      stage.setAttribute('aria-hidden', 'true');
    }
    currentGame = null;
  }

  function bindIntro() {
    const start = $('#game-start');
    if (!start) return;
    start.addEventListener('click', function () {
      const id = start.dataset.gameStart;
      if (GAMES[id]) startGame(id);
    });
  }

  function setStageScore(score, xp) {
    const scoreEl = $('#game-score');
    const xpEl = $('#game-xp');
    if (scoreEl) scoreEl.textContent = String(score);
    if (xpEl) xpEl.textContent = String(xp);
  }

  function finishGame(gameId, score, xpEarned) {
    RJ.state.games = RJ.state.games || {};
    RJ.state.games[gameId] = Math.max(RJ.state.games[gameId] || 0, score);
    RJ.addXP(xpEarned);
    setStageScore(score, RJ.state.xp || 0);
    const g = GAMES[gameId];
    if (g && g.badge && score > 0) RJ.awardBadge(g.badge);
    renderGames();
    renderBadges();
    renderXp();
    if (score > 0) {
      RJ.sound.win();
      RJ.confetti({ count: 90 });
    }
    const body = $('#game-body');
    if (!body) return;
    const pct = (g.min + g.max) / 2;
    const headline = score >= pct ? 'Hebat.' : score > 0 ? 'Ada progres.' : 'Coba lagi.';
    const copy = score >= pct ? 'Kamu memahami cukup untuk berani maju. Sai mengangkat satu kaki.' : score > 0 ? 'Satu atau dua pertanyaan sudah cukup untuk mengingat. Sai mengangguk pelan.' : 'Bukan akhir—hanya pertanyaan yang belum terjawab. Sai menyilangkan dua kaki.';
    body.innerHTML = '<div class="game-result anim-in">' +
      '<div class="game-result__ring"><b>' + score + '</b><span>skor</span></div>' +
      '<h2>' + headline + '</h2>' +
      '<p>' + copy + '</p>' +
      '<div class="game-result__actions">' +
      '<button class="btn btn--outline btn--sm" type="button" data-game-again="' + gameId + '">' + icon('rotate') + ' Main lagi</button>' +
      '<button class="btn btn--gold btn--sm" type="button" data-game-exit="' + gameId + '">Keluar ke Gawi</button>' +
      '</div>' +
      '</div>';
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(body);
  }

  function startKuis() {
    const quizzes = D.quizzes || [];
    const total = quizzes.length;
    let idx = 0;
    let score = 0;
    let chosen = -1;
    let answered = false;
    const best = RJ.state.quizBest || 0;
    const body = $('#game-body');
    if (!body) return;

    const render = function () {
      const q = quizzes[idx];
      body.innerHTML = '<div class="quiz-card">' +
        '<div class="game-hud" style="margin-bottom:18px">' +
        '<div class="game-hud__progress"><span>Soal ' + (idx + 1) + ' dari ' + total + '</span><div class="game-progress"><i style="transform:scaleX(' + ((idx / total).toFixed(3)) + ')"></i></div></div>' +
        '<span class="game-hud__score">Skor <b>' + score + '</b></span>' +
        '</div>' +
        '<p class="quiz-q">' + esc(q.q) + '</p>' +
        '<div class="quiz-options">' +
        q.options.map(function (o, i) { return '<button class="quiz-option' + (chosen === i ? ' is-chosen' : '') + '" type="button" data-answer="' + i + '"><span class="quiz-option__key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o) + '</span></button>'; }).join('') +
        '</div>' +
        '<div class="quiz-feedback ' + (answered ? 'is-visible' : '') + '" id="quiz-feedback" role="status">' +
        '<div class="quiz-feedback__row">' +
        '<span>' + icon(answered ? (chosen === q.answer ? 'check' : 'x') : 'info') + ' ' + (answered ? (chosen === q.answer ? 'Benar.' : 'Belum tepat.') : 'Pilih salah satu.') + '</span>' +
        (answered ? '<button class="btn btn--outline btn--sm quiz-feedback__next" type="button" data-next>' + (idx === total - 1 ? 'Lihat hasil' : 'Soal berikutnya') + '</button>' : '') +
        '</div>' +
        (answered ? '<p style="margin-top:8px">' + esc(q.explain || '') + '</p>' : '') +
        '</div>' +
        '</div>';
      const rows = $$('[data-answer]', body);
      rows.forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          chosen = Number(b.dataset.answer);
          if (chosen === q.answer) { score += 1; RJ.sound.correct(); } else { RJ.sound.wrong(); }
          setStageScore(score, RJ.state.xp || 0);
          const fb = $('#quiz-feedback');
          if (fb) fb.classList.add('is-visible');
          $$('[data-answer]', body).forEach(function (r) {
            r.disabled = true;
            if (Number(r.dataset.answer) === q.answer) r.classList.add('is-correct');
            if (Number(r.dataset.answer) === chosen && chosen !== q.answer) r.classList.add('is-wrong');
          });
          setTimeout(function () {
            if (idx === total - 1) {
              RJ.addXP(score * 5);
              RJ.state.quizBest = Math.max(best, score);
              RJ.save();
              finishGame('kuis', score, score * 5);
            } else {
              idx += 1;
              chosen = -1;
              answered = false;
              render();
            }
          }, 1100);
        });
      });
      const next = $$('[data-next]', body)[0];
      if (next) next.addEventListener('click', function () {
        idx += 1;
        chosen = -1;
        answered = false;
        render();
      });
    };

    render();
  }

  function startTapis() {
    const body = $('#game-body');
    if (!body) return;
    const pairs = MEMORY_MOTIFS.length;
    const rawCards = [];
    MEMORY_MOTIFS.forEach(function (m) {
      rawCards.push({ id: m.id + '-a', motif: m.id, name: m.name, flipped: false, matched: false });
      rawCards.push({ id: m.id + '-b', motif: m.id, name: m.name, flipped: false, matched: false });
    });
    const cards = shuffle(rawCards);
    let flipped = [];
    let lock = false;
    let matchedPairs = 0;
    let moves = 0;

    body.innerHTML = '<div class="memory-wrap">' +
      '<div class="memory-status"><span>Menangkap pasangan motif tapis</span><b><span data-mem-pairs>0</span>/' + pairs + ' pasangan · <span data-mem-moves>0</span> langkah</b></div>' +
      '<div class="memory-grid" data-grid>' +
      cards.map(function (c, i) {
        const motifArt = window.RJ_ART ? window.RJ_ART.motifPaths(c.motif, 60, 60, 0.9) : '';
        return '<div class="memory-card" data-card="' + i + '" tabindex="0" role="button" aria-label="Kartu tertutup">' +
          '<div class="memory-card__inner">' +
          '<div class="memory-face memory-face--back"><span class="mark">' + icon('loom') + '</span></div>' +
          '<div class="memory-face memory-face--front"><svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + motifArt + '</svg><span>' + esc(c.name) + '</span></div>' +
          '</div>' +
          '</div>';
      }).join('') +
      '</div>' +
      '</div>';

    const grid = $('[data-grid]', body);
    const els = $$('[data-card]', grid);
    const pairsEl = $('[data-mem-pairs]', body);
    const movesEl = $('[data-mem-moves]', body);

    function syncCardDom(i) {
      const c = cards[i];
      const el = els[i];
      if (!el) return;
      el.classList.toggle('is-flipped', c.flipped);
      el.classList.toggle('is-matched', c.matched);
      el.setAttribute('aria-label', (c.flipped || c.matched) ? c.name : 'Kartu tertutup');
    }

    function flipCard(el) {
      const idx = Number(el.dataset.card);
      const card = cards[idx];
      if (card.flipped || card.matched || lock) return;
      card.flipped = true;
      syncCardDom(idx);
      RJ.sound.flip();
      flipped.push(idx);
      if (flipped.length < 2) return;
      moves += 1;
      if (movesEl) movesEl.textContent = String(moves);
      lock = true;
      const iA = flipped[0];
      const iB = flipped[1];
      const a = cards[iA];
      const b = cards[iB];
      setTimeout(function () {
        if (a.motif === b.motif) {
          a.matched = true;
          b.matched = true;
          matchedPairs += 1;
          if (pairsEl) pairsEl.textContent = String(matchedPairs);
          syncCardDom(iA);
          syncCardDom(iB);
          RJ.sound.correct();
          setStageScore(matchedPairs, RJ.state.xp || 0);
          if (matchedPairs === pairs) {
            setTimeout(function () {
              finishGame('tapis', matchedPairs, 40);
            }, 480);
          }
        } else {
          a.flipped = false;
          b.flipped = false;
          syncCardDom(iA);
          syncCardDom(iB);
          RJ.sound.wrong();
        }
        flipped = [];
        lock = false;
      }, 650);
    }

    els.forEach(function (el) {
      el.addEventListener('click', function () { flipCard(el); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard(el); } });
    });
  }

  function startSiger() {
    const body = $('#game-body');
    if (!body) return;
    const stage = document.getElementById('game-stage');
    const svgHost = document.createElement('div');
    svgHost.innerHTML = window.RJ_ART ? window.RJ_ART.mascot({ bare: false, label: 'Sai' }) : '';
    body.innerHTML = '<div class="dressup-layout">' +
      '<div class="dressup-stage"><div class="sai-host">' + svgHost.innerHTML + '</div></div>' +
      '<div class="dressup-controls">' +
      '<div class="dressup-mission"><span>Misi</span><h3>Pasang Sai agar lengkap</h3><p>Klik untuk memasang atau melepas siger, tapis, dan tangan terbuka. Sai hanya utuh bila ketiganya terpasang.</p></div>' +
      '<div class="dressup-toggles">' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="siger" aria-pressed="false"><span class="dressup-toggle__icon">' + icon('crown') + '</span><span class="dressup-toggle__text"><b>Siger di kepala</b><span>Kehormatan &amp; tanggung jawab</span></span><span class="dressup-toggle__state">Lepas</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="tapis" aria-pressed="false"><span class="dressup-toggle__icon">' + icon('loom') + '</span><span class="dressup-toggle__text"><b>Tapis di badan</b><span>Doa &amp; identitas</span></span><span class="dressup-toggle__state">Lepas</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="tangan" aria-pressed="false"><span class="dressup-toggle__icon">' + icon('hands') + '</span><span class="dressup-toggle__text"><b>Tangan terbuka</b><span>Nemui-nyimah &amp; keramahan</span></span><span class="dressup-toggle__state">Lepas</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="lengkap" aria-pressed="false"><span class="dressup-toggle__icon">' + icon('sparkles') + '</span><span class="dressup-toggle__text"><b>Pasang semua sekaligus</b><span>Gajah + seluruh atribut adat</span></span><span class="dressup-toggle__state">Aksi</span></button>' +
      '</div>' +
      '<div style="grid-column:1/-1;text-align:center"><button class="btn btn--gold" type="button" data-dress-win>' + icon('trophy') + ' Selesaikan &amp; rayakan Sai</button></div>' +
      '</div>' +
      '</div>';
    const dressState = { siger: false, tapis: false, tangan: false };
    const setPart = function (key, on) {
      const svg = stage ? (stage.querySelector('.dressup-stage .sai-svg') || stage.querySelector('.sai-svg')) : null;
      if (!svg) return;
      const sel = { siger: '.acc-siger', tapis: '.acc-tapis', tangan: '.sai-hand' }[key];
      const g = key === 'tangan' ? svg.querySelector('g.sai-hand') : svg.querySelector(sel);
      if (g) {
        g.classList.toggle('is-hidden', !on);
        if (on && !RJ.preferredReduced()) {
          g.animate([{ transform: 'scale(0.92)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out', transformOrigin: 'center' });
        }
      }
    };
    const syncButtons = function () {
      ['siger', 'tapis', 'tangan'].forEach(function (k) {
        const b = body.querySelector('[data-dress-toggle="' + k + '"]');
        if (!b) return;
        b.setAttribute('aria-pressed', String(dressState[k]));
        const st = b.querySelector('.dressup-toggle__state');
        if (st) st.textContent = dressState[k] ? 'Terpasang' : 'Lepas';
      });
      const allOn = dressState.siger && dressState.tapis && dressState.tangan;
      const allBtn = body.querySelector('[data-dress-toggle="lengkap"]');
      if (allBtn) allBtn.setAttribute('aria-pressed', String(allOn));
      setStageScore((dressState.siger ? 1 : 0) + (dressState.tapis ? 1 : 0) + (dressState.tangan ? 1 : 0), RJ.state.xp || 0);
    };
    ['siger', 'tapis', 'tangan'].forEach(function (k) { setPart(k, false); });
    syncButtons();
    $$('[data-dress-toggle]', body).forEach(function (b) {
      b.addEventListener('click', function () {
        const key = b.dataset.dressToggle;
        if (key === 'lengkap') {
          const nextAll = !(dressState.siger && dressState.tapis && dressState.tangan);
          ['siger', 'tapis', 'tangan'].forEach(function (k) { dressState[k] = nextAll; setPart(k, nextAll); });
        } else {
          dressState[key] = !dressState[key];
          setPart(key, dressState[key]);
        }
        syncButtons();
        RJ.sound.tap();
      });
    });
    const winBtn = $('[data-dress-win]');
    if (winBtn) winBtn.addEventListener('click', function () {
      if (!(dressState.siger && dressState.tapis && dressState.tangan)) {
        RJ.toast('Pasang siger, tapis, dan tangan terbuka terlebih dahulu!', { title: 'Belum lengkap', icon: 'spark', duration: 2800 });
        RJ.sound.wrong();
        return;
      }
      finishGame('siger', 3, 30);
    });
  }

  function startAksara() {
    const body = $('#game-body');
    if (!body || !AK || !AK.letters) return;
    const QUESTIONS = 5;
    const pool = shuffle(AK.letters).slice(0, QUESTIONS);
    let idx = 0;
    let score = 0;
    let chosen = -1;
    let answered = false;

    const render = function () {
      const l = pool[idx];
      const distractors = shuffle(AK.letters.filter(function (x) { return x.key !== l.key; })).slice(0, 3);
      const options = shuffle([l].concat(distractors));
      const ansIdx = options.findIndex(function (o) { return o.key === l.key; });
      body.innerHTML = '<div class="aksara-game">' +
        '<div class="game-hud" style="margin-bottom:16px">' +
        '<div class="game-hud__progress"><span>Huruf ' + (idx + 1) + ' dari ' + QUESTIONS + '</span><div class="game-progress"><i style="transform:scaleX(' + ((idx / QUESTIONS).toFixed(3)) + ')"></i></div></div>' +
        '<span class="game-hud__score">Skor <b>' + score + '</b></span>' +
        '</div>' +
        '<div class="aksara-game__glyph" id="ak-glyph-box">' + (window.RJ.aksaraSvg ? RJ.aksaraSvg(l.key, { decorative: true }) : '') + '</div>' +
        '<p class="aksara-game__prompt">Bunyi huruf aksara di atas adalah…</p>' +
        '<div class="aksara-choices">' +
        options.map(function (o, i) { return '<button class="aksara-choice' + (chosen === i ? ' is-chosen' : '') + '" type="button" data-ak-choice="' + i + '">' + esc(o.name || o.latin) + '</button>'; }).join('') +
        '</div>' +
        '<div class="quiz-feedback ' + (answered ? 'is-visible' : '') + '" id="aksara-feedback" role="status">' +
        '<div class="quiz-feedback__row">' +
        '<span>' + (answered ? (chosen === ansIdx ? 'Benar!' : 'Belum tepat — jawabannya ' + esc(l.name) + '.') : 'Pilih hurufnya.') + '</span>' +
        (answered ? '<button class="btn btn--outline btn--sm quiz-feedback__next" type="button" data-ak-next>' + (idx === QUESTIONS - 1 ? 'Lihat hasil' : 'Soal berikutnya') + '</button>' : '') +
        '</div>' +
        (answered ? '<p style="margin-top:8px">' + esc(l.note || '') + '</p>' : '') +
        '</div>' +
        '</div>';
      const gBox = $('#ak-glyph-box');
      if (gBox && window.RJ.animateSvgStrokes) RJ.animateSvgStrokes(gBox, { duration: 600, stagger: 90 });

      const btns = $$('[data-ak-choice]', body);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          chosen = Number(b.dataset.akChoice);
          if (chosen === ansIdx) { score += 1; RJ.sound.correct(); } else { RJ.sound.wrong(); }
          setStageScore(score, RJ.state.xp || 0);
          const fb = $('#aksara-feedback');
          if (fb) fb.classList.add('is-visible');
          $$('[data-ak-choice]', body).forEach(function (r) {
            r.disabled = true;
            if (Number(r.dataset.akChoice) === ansIdx) r.classList.add('is-correct');
            if (Number(r.dataset.akChoice) === chosen && chosen !== ansIdx) r.classList.add('is-wrong');
          });
          setTimeout(function () {
            if (idx === QUESTIONS - 1) {
              RJ.state.quizBest = Math.max(RJ.state.quizBest || 0, score);
              finishGame('aksara', score, score * 7);
            } else {
              idx += 1;
              answered = false;
              chosen = -1;
              render();
            }
          }, 1050);
        });
      });
    };
    render();
  }

  function startSeruit() {
    const body = $('#game-body');
    if (!body) return;
    const dishes = D.dishes || [];
    if (!dishes.length) return;
    let idx = 0;
    let score = 0;
    let chosen = -1;
    let answered = false;

    const render = function () {
      const dish = dishes[idx % dishes.length];
      const first = dish.ingredients[0];
      const distractors = [];
      dishes.forEach(function (d) {
        if (d.id === dish.id) return;
        d.ingredients.forEach(function (i) {
          if (i.name !== first.name && !distractors.some(function (x) { return x.name === i.name; })) {
            distractors.push(i);
          }
        });
      });
      const options = shuffle([first].concat(shuffle(distractors).slice(0, 2)));
      const ansIdx = options.findIndex(function (o) { return o.name === first.name; });

      body.innerHTML = '<div class="seruit-game">' +
        '<div class="seruit-intro">' +
        (dish.image ? '<img class="seruit-intro__img" src="' + esc(dish.image) + '" alt="' + esc(dish.name) + '">' : '') +
        '<h3>' + esc(dish.name) + '</h3>' +
        '<p>' + esc(dish.summary) + '</p>' +
        '</div>' +
        '<div class="game-hud" style="margin-bottom:18px">' +
        '<div class="game-hud__progress"><span>Meracik ' + esc(dish.name) + ' (' + (idx + 1) + '/3)</span><div class="game-progress"><i style="transform:scaleX(' + ((idx / 3).toFixed(3)) + ')"></i></div></div>' +
        '<span class="game-hud__score">Skor <b>' + score + '</b></span>' +
        '</div>' +
        '<div class="quiz-q">Bahan utama pertama untuk meracik <em>' + esc(dish.name) + '</em>?</div>' +
        '<div class="quiz-options">' +
        options.map(function (o, i) { return '<button class="quiz-option" type="button" data-seruit="' + i + '"><span class="quiz-option__key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.name) + '</span></button>'; }).join('') +
        '</div>' +
        '<div class="quiz-feedback ' + (answered ? 'is-visible' : '') + '" id="seruit-feedback" role="status">' +
        '<div class="quiz-feedback__row">' +
        '<span>' + (answered ? (chosen === ansIdx ? 'Tepat sekali!' : 'Belum tepat.') : 'Pilih bahan pertama.') + '</span>' +
        '</div>' +
        (answered ? '<p style="margin-top:8px">' + esc(dish.name) + ' dimulai dari <b>' + esc(first.name) + '</b> — ' + esc(dish.steps[0] || '') + '</p>' : '') +
        '</div>' +
        '</div>';

      const btns = $$('[data-seruit]', body);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          chosen = Number(b.dataset.seruit);
          if (chosen === ansIdx) { score += 1; RJ.sound.correct(); } else { RJ.sound.wrong(); }
          setStageScore(score, RJ.state.xp || 0);
          const fb = $('#seruit-feedback');
          if (fb) fb.classList.add('is-visible');
          $$('[data-seruit]', body).forEach(function (r) {
            r.disabled = true;
            if (Number(r.dataset.seruit) === ansIdx) r.classList.add('is-correct');
            if (Number(r.dataset.seruit) === chosen && chosen !== ansIdx) r.classList.add('is-wrong');
          });
          setTimeout(function () {
            if (idx === 2) {
              finishGame('seruit', score, score * 10 + 10);
            } else {
              idx += 1;
              answered = false;
              chosen = -1;
              render();
            }
          }, 1250);
        });
      });
    };
    render();
  }

  function startGame(id) {
    if (id === 'kuis') startKuis();
    else if (id === 'tapis') startTapis();
    else if (id === 'siger') startSiger();
    else if (id === 'aksara') startAksara();
    else if (id === 'seruit') startSeruit();
  }

  function bindStage() {
    const stage = $('#game-stage');
    if (!stage) return;
    stage.addEventListener('click', function (e) {
      const back = e.target.closest('[data-game-back]');
      if (back) closeGame();
      const start = e.target.closest('[data-game-start]');
      if (start) startGame(start.dataset.gameStart);
      const again = e.target.closest('[data-game-again]');
      if (again) startGame(again.dataset.gameAgain);
      const exit = e.target.closest('[data-game-exit]');
      if (exit) closeGame();
    });
    stage.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeGame(); });
  }

  function init() {
    renderGames();
    renderBadges();
    renderXp();
    bindStage();
    const deep = RJ.getQuery('game');
    const initial = deep && GAMES[deep] ? deep : null;
    if (initial) {
      setTimeout(function () {
        const stage = document.getElementById('game-stage');
        if (stage && !stage.classList.contains('is-open')) openGame(initial, false);
      }, 300);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
