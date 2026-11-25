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
    kuis: { id: 'kuis', title: 'Kuis Piil Pesenggiri', short: 'Falsafah adat', desc: 'Uji pemahaman empat unsur adat: Juluk-adok, Nemui-nyimah, Nengah-nyappur, Sakai-sambayan.', accent: 'var(--maroon)', tag: 'Falsafah', min: 1, max: 10 },
    tapis: { id: 'tapis', title: 'Cocokkan Tapis', short: 'Ingatan motif', desc: 'Latih ingatan motif tapis: benang emas, pucuk rebung, dan doa yang ditenun.', accent: 'var(--maroon)', tag: 'Memori', min: 1, max: 1 },
    siger: { id: 'siger', title: 'Pasang Siger', short: 'Busana adat', desc: 'Rangkai atribut Sai: siger di kepala, tapis di badan, dan tangan terbuka.', accent: 'var(--maroon)', tag: 'Busana', min: 1, max: 1 },
    aksara: { id: 'aksara', title: 'Tebak Aksara', short: 'Baca aksara', desc: 'Kenali dua puluh satu huruf dasar dan anak-anaknya dari aksara Lampung.', accent: 'var(--maroon)', tag: 'Aksara', min: 1, max: 5 },
    seruit: { id: 'seruit', title: 'Meracik Seruit', short: 'Susun rasa', desc: 'Pilih bahan pertama yang benar saat meracik seruit: ikan, sambal, dan tempoyak.', accent: 'var(--maroon)', tag: 'Kuliner', min: 1, max: 3 }
  };

  const MEMORY_MOTIFS = [
    { id: 'wave', name: 'Ombak', desc: 'Garis pantai & lalu lintas budaya' },
    { id: 'loom', name: 'Tapis', desc: 'Benang emas & doa ditenun' },
    { id: 'crown', name: 'Siger', desc: 'Mahkota & tanggung jawab' },
    { id: 'speech', name: 'Pandangan', desc: 'Musyawarah & bahasa' }
  ];

  let currentGame = null;

  function cardHTML(g) {
    const motif = MOTIFS[g.id];
    const best = (RJ.state.games || {})[g.id];
    const bestText = best ? '<span class="game-card__best has-score">Terbaik ' + best + '</span>' : '<span class="game-card__best">Belum dimainkan</span>';
    const wide = g.id === 'seruit';
    const art = window.RJ_ART ? window.RJ_ART.motifPaths(motif, 300, 300, 2.6) : '';
    const num = String(Object.keys(GAMES).indexOf(g.id) + 1).padStart(2, '0');
    const qcount = g.min === g.max ? String(g.max) + ' pertanyaan' : g.min + '-' + g.max + ' pertanyaan';
    return '<article class="game-card ' + (wide ? 'game-card--wide' : '') + '" data-game="' + g.id + '">' +
      '<div class="game-card__art" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><g color="currentColor">' + art + '</g></svg></div>' +
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
    $$('[data-game]', wrap).forEach(function (el) { el.addEventListener('click', function () { openGame(el.dataset.game, true); }); });
  }

  function renderBadges() {
    const wrap = $('#badge-grid');
    if (!wrap || !D.badges) return;
    wrap.innerHTML = D.badges.map(function (b) {
      const earned = (RJ.state.badges || []).indexOf(b.id) >= 0;
      const cls = earned ? 'is-earned' : 'is-locked';
      const label = earned ? 'Lencana ' + b.title : 'Lencana belum diraih: ' + b.title;
      return '<article class="badge-card ' + cls + '" aria-label="' + label + '">' +
        '<span class="badge-card__xp">+' + b.xp + ' XP</span>' +
        '<div class="badge-card__icon">' + icon(b.icon || 'trophy') + '</div>' +
        '<h4>' + esc(b.title) + '</h4>' +
        '<p>' + esc(b.desc) + '</p>' +
        '</article>';
    }).join('');
    if (window.RJ.hydrateIcons) RJ.hydrateIcons(wrap);
  }

  function renderXp() {
    const xp = RJ.state.xp || 0;
    const val = document.getElementById('gawi-xp');
    if (val) val.textContent = String(xp);
    const panelFill = document.querySelector('.gawi-hub-head .xp-panel .xp-fill');
    if (panelFill) panelFill.style.setProperty('--xp', String(Math.min(100, (xp / 200) * 100)));
    const badgeCount = document.getElementById('gawi-badge-count');
    if (badgeCount) badgeCount.textContent = String((RJ.state.badges || []).length);
  }

  function openGame(id, scroll) {
    const g = GAMES[id];
    if (!g) return;
    const stage = document.getElementById('game-stage');
    const body = $('#game-body');
    const title = $('#game-title');
    if (title) title.textContent = g.title;
    if (body) body.innerHTML = '<div class="game-intro" data-game-intro="' + g.id + '">' +
      '<div class="game-intro__icon">' + icon('trophy') + '</div>' +
      '<h2>' + esc(g.title) + '</h2>' +
      '<p>' + esc(g.desc) + '</p>' +
      '<div class="game-intro__rules"><span>' + g.min + ' pertanyaan</span><span>' + g.max + ' pertanyaan</span><span>XP +' + (g.max * 5) + '</span><span>Lencana: ' + esc((D.badges || []).filter(function (b) { return b.id === (id === 'kuis' ? 'kuis-piil' : id === 'tapis' ? 'memoria-tapis' : id === 'siger' ? 'siger-stylist' : id === 'aksara' ? 'aksara-cerdas' : 'seruit-chef'); })[0] ? ((D.badges || []).filter(function (b) { return b.id === (id === 'kuis' ? 'kuis-piil' : id === 'tapis' ? 'memoria-tapis' : id === 'siger' ? 'siger-stylist' : id === 'aksara' ? 'aksara-cerdas' : 'seruit-chef'); })[0].title) : '—') + '</span></div>' +
      '<div style="margin-top:24px"><button class="btn btn--gold" type="button" data-game-start="' + g.id + '">' + icon('play') + ' Mulai permainan</button></div>' +
      '</div>';
    if (stage) stage.classList.add('is-open');
    if (scroll) {
      const hub = document.getElementById('gawi');
      if (hub) hub.scrollIntoView({ behavior: RJ.preferredReduced() ? 'auto' : 'smooth', block: 'start' });
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
    RJ.addXP(xpEarned);
    setStageScore(score, RJ.state.xp || 0);
    const badges = { kuis: 'kuis-piil', tapis: 'memoria-tapis', siger: 'siger-stylist', aksara: 'aksara-cerdas', seruit: 'seruit-chef' };
    const badgeId = badges[gameId];
    if (badgeId) RJ.awardBadge(badgeId);
    renderXp();
    const body = $('#game-body');
    if (!body) return;
    const g = GAMES[gameId];
    const pct = (g.min + g.max) / 2;
    const headline = score >= pct ? 'Hebat.' : score > 0 ? 'Ada progres.' : 'Coba lagi.';
    const copy = score >= pct ? 'Kamu memahami cukup untuk berani maju. Sai mengangkat satu kaki.' : score > 0 ? 'Satu atau dua pertanyaan sudah cukup untuk mengingat. Sai mengangguk pelan.' : 'Bukan akhir—hanya pertanyaan yang belum terjawab. Sai menyilangkan dua kaki.';
    body.innerHTML = '<div class="game-result">' +
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
    const cards = [];
    MEMORY_MOTIFS.forEach(function (m) {
      cards.push({ id: m.id + '-a', motif: m.id, name: m.name, flipped: false, matched: false });
      cards.push({ id: m.id + '-b', motif: m.id, name: m.name, flipped: false, matched: false });
    });
    let flipped = [];
    let lock = false;
    let matchedPairs = 0;

    const renderGrid = function () {
      body.innerHTML = '<div class="memory-wrap">' +
        '<div class="memory-status"><span>Menangkap pasangan motif tapis</span><b>' + matchedPairs + '/' + pairs + ' pasangan</b></div>' +
        '<div class="memory-grid" data-grid></div>' +
        '</div>';
      const grid = $('[data-grid]', body);
      grid.innerHTML = cards.map(function (c, i) {
        const cls = 'memory-card';
        if (c.matched) cls += ' is-matched';
        if (c.flipped) cls += ' is-flipped';
        const flippedLabel = c.flipped ? c.name : 'Kartu tertutup';
        const motifArt = window.RJ_ART ? window.RJ_ART.motifPaths(c.motif, 60, 60, 0.9) : '';
        return '<div class="' + cls + '" data-card="' + i + '" tabindex="0" role="button" aria-label="' + flippedLabel + '">' +
          '<div class="memory-card__inner">' +
          '<div class="memory-face memory-face--back"><span class="mark">' + icon('loom') + '</span></div>' +
          '<div class="memory-face memory-face--front"><svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + motifArt + '</svg><span>' + esc(c.name) + '</span></div>' +
          '</div>' +
          '</div>';
      }).join('');
      const els = $$('[data-card]', grid);
      els.forEach(function (el) {
        el.addEventListener('click', function () { flipCard(el); });
        el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard(el); } });
      });
    };

    function flipCard(el) {
      const card = cards[Number(el.dataset.card)];
      if (card.flipped || card.matched || lock) return;
      card.flipped = true;
      RJ.sound.flip();
      renderGrid();
      if (flipped.length === 0) { flipped = [card]; return; }
      flipped.push(card);
      if (flipped.length < 2) { renderGrid(); return; }
      lock = true;
      const a = flipped[0];
      const b = flipped[1];
      setTimeout(function () {
        if (a.motif === b.motif && !a.matched && !b.matched) {
          a.matched = true;
          b.matched = true;
          matchedPairs += 1;
          RJ.sound.correct();
          renderGrid();
          if (matchedPairs === pairs) {
            lock = false;
            const xp = 40;
            RJ.addXP(xp);
            RJ.awardBadge('memoria-tapis');
            renderXp();
            setStageScore(matchedPairs, RJ.state.xp || 0);
            finishGame('tapis', matchedPairs, xp);
          }
        } else {
          a.flipped = false;
          b.flipped = false;
          renderGrid();
        }
        flipped = [];
        lock = false;
      }, 650);
    }

    renderGrid();
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
      '<div class="dressup-mission"><span>Misi</span><h3>Pasang Sai agar lengkap</h3><p>Masukkan siger, tapis, dan tangan terbuka. Sai hanya utuh bila ketiganya hadir.</p></div>' +
      '<div class="dressup-toggles">' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="siger" aria-pressed="true"><span class="dressup-toggle__icon">' + icon('crown') + '</span><span class="dressup-toggle__text"><b>Siger di kepala</b><span>Kehormatan &amp; tanggung jawab</span></span><span class="dressup-toggle__state">On</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="tapis" aria-pressed="true"><span class="dressup-toggle__icon">' + icon('loom') + '</span><span class="dressup-toggle__text"><b>Tapis di badan</b><span>Doa &amp; identitas</span></span><span class="dressup-toggle__state">On</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="tangan" aria-pressed="true"><span class="dressup-toggle__icon">' + icon('hands') + '</span><span class="dressup-toggle__text"><b>Tangan terbuka</b><span>Nemui-nyimah &amp; keramahan</span></span><span class="dressup-toggle__state">On</span></button>' +
      '<button class="dressup-toggle" type="button" data-dress-toggle="lengkap" aria-pressed="true"><span class="dressup-toggle__icon">' + icon('sparkles') + '</span><span class="dressup-toggle__text"><b>Sai lengkap</b><span>Gajah + atribut adat</span></span><span class="dressup-toggle__state">On</span></button>' +
      '</div>' +
      '<div style="grid-column:1/-1;text-align:center"><button class="btn btn--gold" type="button" data-dress-win>' + icon('trophy') + ' Pasang lengkap: siger, tapis, tangan</button></div>' +
      '</div>' +
      '</div>';
    const setPart = function (key, on) {
      const svg = stage ? (stage.querySelector('.dressup-stage .sai-svg') || stage.querySelector('.sai-svg')) : null;
      if (!svg) return;
      const sel = { siger: '.acc-siger', tapis: '.acc-tapis', tangan: '.sai-hand', lengkap: '.acc-siger' }[key];
      const g = key === 'tangan' ? svg.querySelector('g.sai-hand') : svg.querySelector(sel);
      if (g) g.classList.toggle('is-hidden', !on);
    };
    ['siger', 'tapis', 'tangan', 'lengkap'].forEach(function (k) { setPart(k, true); });
    $$('[data-dress-toggle]', body).forEach(function (b) {
      b.addEventListener('click', function () {
        const key = b.dataset.dressToggle;
        const on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', String(!on));
        const stateEl = b.querySelector('.dressup-toggle__state');
        if (stateEl) stateEl.textContent = on ? 'On' : 'Off';
        setPart(key, on);
        if (key === 'lengkap') {
          setPart('siger', b.getAttribute('aria-pressed') === 'true');
          setPart('tapis', b.getAttribute('aria-pressed') === 'true');
          setPart('tangan', b.getAttribute('aria-pressed') === 'true');
        }
        RJ.sound.tap();
      });
    });
    const winBtn = $('[data-dress-win]');
    if (winBtn) winBtn.addEventListener('click', function () {
      if ((RJ.state.badges || []).indexOf('siger-stylist') >= 0) return;
      RJ.sound.win();
      RJ.addXP(30);
      RJ.awardBadge('siger-stylist');
      RJ.confetti({ count: 110 });
      finishGame('siger', 3, 30);
    });
  }

  function startAksara() {
    const body = $('#game-body');
    if (!body) return;
    const QUESTIONS = 5;
    let idx = 0;
    let score = 0;
    let current = null;
    let chosen = -1;
    let answered = false;

    const render = function () {
      const l = idx === 0 ? { key: AK.letters[0].key, latin: AK.letters[0].latin, name: AK.letters[0].name, note: AK.letters[0].note } : current;
      const options = AK.letters.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 4);
      const ansIdx = options.findIndex(function (o) { return o.key === l.key; });
      body.innerHTML = '<div class="aksara-game">' +
        '<div class="aksara-game__glyph">' + (window.RJ.aksaraSvg ? RJ.aksaraSvg(l.key, { decorative: true }) : '') + '</div>' +
        '<p class="aksara-game__prompt">Ini huruf aksara ke berapa?</p>' +
        '<div class="aksara-choices">' +
        options.map(function (o, i) { return '<button class="aksara-choice' + (chosen === i ? ' is-chosen' : '') + '" type="button" data-ak-choice="' + i + '">' + esc(o.name || o.latin) + '</button>'; }).join('') +
        '</div>' +
        '<p class="aksara-game__word">' + esc(l.latin) + ' · ' + esc(l.note || '') + '</p>' +
        '<div class="quiz-feedback ' + (answered ? 'is-visible' : '') + '" id="aksara-feedback" role="status">' +
        '<div class="quiz-feedback__row">' +
        '<span>' + (answered ? (chosen === ansIdx ? 'Benar.' : 'Belum tepat.') : 'Pilih hurufnya.') + '</span>' +
        (answered ? '<button class="btn btn--outline btn--sm quiz-feedback__next" type="button" data-ak-next>' + (idx === QUESTIONS - 1 ? 'Lihat hasil' : 'Soal berikutnya') + '</button>' : '') +
        '</div>' +
        (answered ? '<p style="margin-top:8px">' + esc(l.note || '') + '</p>' : '') +
        '</div>' +
        '</div>';
      const btns = $$('[data-ak-choice]', body);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          chosen = Number(b.dataset.akChoice);
          if (chosen === ansIdx) { score += 1; RJ.sound.correct(); } else { RJ.sound.wrong(); }
          const fb = $('#aksara-feedback');
          if (fb) fb.classList.add('is-visible');
          $$('[data-ak-choice]', body).forEach(function (r) {
            r.disabled = true;
            if (Number(r.dataset.akChoice) === ansIdx) r.classList.add('is-correct');
            if (Number(r.dataset.akChoice) === chosen && chosen !== ansIdx) r.classList.add('is-wrong');
          });
          setTimeout(function () {
            if (idx === QUESTIONS - 1) {
              RJ.addXP(score * 7);
              RJ.awardBadge('aksara-cerdas');
              RJ.state.quizBest = Math.max(RJ.state.quizBest || 0, score);
              RJ.save();
              finishGame('aksara', score, score * 7);
            } else {
              idx += 1;
              answered = false;
              chosen = -1;
              current = null;
              render();
            }
          }, 1100);
        });
      });
      const next = $$('[data-ak-next]', body)[0];
      if (next) next.addEventListener('click', function () {
        idx += 1;
        answered = false;
        chosen = -1;
        current = null;
        render();
      });
    };
    render();
  }

  function startSeruit() {
    const body = $('#game-body');
    if (!body) return;
    const dishes = D.dishes || [];
    let idx = 0;
    let score = 0;
    let chosen = -1;
    let answered = false;

    const render = function () {
      const dish = dishes[idx % dishes.length];
      const first = dish.ingredients[0];
      const distractors = [];
      dishes.forEach(function (d) { d.ingredients.forEach(function (i) { if (i.name !== first.name && distractors.length < 2) distractors.push(i); }); });
      const options = [first].concat(distractors.filter(function (i) { return i && i.name !== first.name; }).slice(0, 2));
      body.innerHTML = '<div class="seruit-intro">' +
        '<h3>' + esc(dish.name) + '</h3>' +
        '<p>' + esc(dish.summary) + '</p>' +
        '</div>' +
        '<div class="game-hud" style="margin-bottom:18px">' +
        '<div class="game-hud__progress"><span>Meracik ' + dish.name + '</span><div class="game-progress"><i style="transform:scaleX(' + ((idx / 3).toFixed(3)) + ')"></i></div></div>' +
        '<span class="game-hud__score">Skor <b>' + score + '</b></span>' +
        '</div>' +
        '<div class="quiz-q">Bahan pertama yang benar saat meracik <em>' + esc(dish.name) + '</em>?</div>' +
        '<div class="quiz-options">' +
        options.map(function (o, i) { return '<button class="quiz-option" type="button" data-seruit="' + i + '"><span class="quiz-option__key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.name) + '</span></button>'; }).join('') +
        '</div>' +
        '<div class="quiz-feedback ' + (answered ? 'is-visible' : '') + '" id="seruit-feedback" role="status">' +
        '<div class="quiz-feedback__row">' +
        '<span>' + (answered ? (chosen === 0 ? 'Benar. Ikan dulu, lalu sambal.' : 'Belum tepat. Resepnya dimulai dari bahan pertama.') : 'Pilih bahan pertama.') + '</span>' +
        (answered ? '<button class="btn btn--outline btn--sm quiz-feedback__next" type="button" data-seruit-next>' + (idx === 2 ? 'Lihat hasil' : 'Meracik lagi') + '</button>' : '') +
        '</div>' +
        (answered ? '<p style="margin-top:8px">Seruit dimulai dari ' + esc(first.name) + ' — lalu aduk sambal, rempah, dan tempo. Susunan bahan menentukan rasa akhir.</p>' : '') +
        '</div>' +
        '<div style="margin-top:18px"><button class="btn btn--ghost btn--sm" type="button" data-seruit-skip>Lewati: pilih hidangan lain</button></div>' +
        '</div>';
      const btns = $$('[data-seruit]', body);
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          chosen = Number(b.dataset.seruit);
          if (chosen === 0) score += 1;
          const fb = $('#seruit-feedback');
          if (fb) fb.classList.add('is-visible');
          $$('[data-seruit]', body).forEach(function (r) {
            r.disabled = true;
            if (Number(r.dataset.seruit) === 0) r.classList.add('is-correct');
          });
          setTimeout(function () {
            if (idx === 2) {
              RJ.addXP(score * 5);
              RJ.awardBadge('seruit-chef');
              finishGame('seruit', score, score * 5);
            } else {
              idx += 1;
              answered = false;
              chosen = -1;
              render();
            }
          }, 1100);
        });
      });
      const next = $$('[data-seruit-next]', body)[0];
      if (next) next.addEventListener('click', function () { idx += 1; answered = false; chosen = -1; render(); });
      const skip = $$('[data-seruit-skip]', body)[0];
      if (skip) skip.addEventListener('click', function () { idx += 1; answered = false; chosen = -1; render(); });
      render();
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
