/* =========================================================
   RUWA JURAI — Aksara Lampung display engine
   Adapted from Lampung Design System (MIT). See third_party/.
   This is a display helper for names & ornament, not a full
   orthography engine. Always pair with Latin transliteration.
   ========================================================= */
(function () {
  'use strict';

  const G = window.RJ_GLYPHS || { stroke: 8, letters: {}, marks: { above: {}, below: {}, after: {} } };
  const ADVANCE = 78;
  const AFTER = 24;
  const TOP = -16;
  const HEIGHT = 128;

  const CONSONANTS = [
    ['ny', 'nya'], ['ng', 'nga'], ['gh', 'gha'], ['kh', 'ka'], ['sy', 'sa'],
    ['k', 'ka'], ['g', 'ga'], ['p', 'pa'], ['b', 'ba'], ['m', 'ma'],
    ['t', 'ta'], ['d', 'da'], ['n', 'na'], ['c', 'ca'], ['j', 'ja'],
    ['y', 'ya'], ['l', 'la'], ['r', 'ra'], ['s', 'sa'], ['w', 'wa'],
    ['h', 'ha'], ['f', 'pa'], ['v', 'pa'], ['z', 'ja'], ['q', 'ka'], ['x', 'sa']
  ];
  const VOWELS = { a: null, i: 'i', u: 'u', e: 'e', 'é': 'é', 'è': 'é', o: 'o' };
  const CODA_SIGN = { n: 'an', ng: 'ang', r: 'ar', h: 'ah' };
  const isVowel = (ch) => ch in VOWELS;
  const onsetAt = (w, i) => CONSONANTS.find(([latin]) => w.startsWith(latin, i));

  /**
   * Split Latin text into aksara cells.
   * @param {string} text
   * @returns {Array<{letter?:string,above?:string[],below?:string[],after?:string[],space?:boolean}>}
   */
  function toAksara(text) {
    const out = [];
    const words = String(text || '')
      .toLowerCase()
      .normalize('NFC')
      .split(/[^a-zéè]+/)
      .filter(Boolean);
    words.forEach((w, wi) => {
      if (wi) out.push({ space: true });
      let i = 0;
      while (i < w.length) {
        const cell = { letter: 'a', above: [], below: [], after: [] };
        const on = onsetAt(w, i);
        if (on) { cell.letter = on[1]; i += on[0].length; }
        if (on && !isVowel(w[i] || '')) { cell.after.push('nengen'); out.push(cell); continue; }
        const v = w[i] || 'a';
        if (isVowel(v)) i += 1;
        const sign = VOWELS[v];
        const next = w[i];
        const afterNext = w[i + 1];
        if (v === 'a' && (next === 'i' || next === 'u') && (afterNext === undefined || !isVowel(afterNext))) {
          if (next === 'i') cell.after.push('ai'); else cell.below.push('au');
          i += 1;
          out.push(cell);
          continue;
        }
        if (sign === 'u' || sign === 'o') cell.below.push(sign);
        else if (sign) cell.above.push(sign);
        for (const coda of ['ng', 'n', 'r', 'h']) {
          if (w.startsWith(coda, i) && !isVowel(w[i + coda.length] || '') && !(coda === 'n' && w[i + 1] === 'y')) {
            const s = CODA_SIGN[coda];
            if (s === 'ah') cell.after.push(s); else cell.above.push(s);
            i += coda.length;
            break;
          }
        }
        out.push(cell);
      }
    });
    return out;
  }

  const paths = (list = [], dx = 0) => list.map((d) => `<path d="${d}"${dx ? ` transform="translate(${dx} 0)"` : ''}/>`).join('');

  /**
   * Render Latin text as inline SVG aksara.
   * @param {string} text
   * @param {{title?:string, stroke?:number, pad?:number, className?:string, decorative?:boolean}} [opts]
   */
  function aksaraSvg(text, opts = {}) {
    const cells = toAksara(text);
    let x = 0;
    const parts = [];
    cells.forEach((c) => {
      if (c.space) { x += ADVANCE * 0.5; return; }
      const g = [paths(G.letters[c.letter] || [])];
      (c.above || []).forEach((m) => g.push(paths((G.marks.above || {})[m] || [])));
      (c.below || []).forEach((m) => g.push(paths((G.marks.below || {})[m] || [])));
      let w = ADVANCE;
      (c.after || []).forEach((m) => {
        g.push(paths((G.marks.after || {})[m] || [], w + 4));
        w += AFTER;
      });
      parts.push(`<g transform="translate(${x} 0)">${g.join('')}</g>`);
      x += w;
    });
    const width = Math.max(x + 22 + (opts.pad || 0), 1);
    const label = opts.title || text;
    const cls = ['aksara__svg', opts.className || ''].filter(Boolean).join(' ');
    return `<svg class="${cls}" viewBox="0 ${TOP} ${width} ${HEIGHT}" fill="none" stroke="currentColor" stroke-width="${opts.stroke || G.stroke || 8}" stroke-linecap="round" stroke-linejoin="round" role="${opts.decorative ? 'presentation' : 'img'}" aria-label="${String(label).replace(/"/g, '&quot;')}" ${opts.decorative ? 'aria-hidden="true"' : ''} focusable="false">${parts.join('')}</svg>`;
  }

  /** Render every [data-aksara] in a root. */
  function renderAksara(root = document) {
    root.querySelectorAll('[data-aksara]').forEach((el) => {
      const text = el.getAttribute('data-aksara') || el.textContent.trim();
      if (!text) return;
      if (el.dataset.aksaraDone === text) return;
      const decorative = el.hasAttribute('data-aksara-decor') || el.getAttribute('aria-hidden') === 'true';
      el.innerHTML = aksaraSvg(text, { decorative });
      if (!decorative && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);
      if (!decorative) el.querySelector('svg')?.setAttribute('aria-hidden', 'true');
      el.dataset.aksaraDone = text;
    });
  }

  /** The few base glyphs, with educational metadata. */
  const LETTERS = [
    { key: 'a', latin: 'A', name: 'A', sound: 'a', note: 'Huruf vokal dasar.' },
    { key: 'ka', latin: 'Ka', name: 'Ka', sound: 'ka', note: 'Bunyi /ka/.' },
    { key: 'ga', latin: 'Ga', name: 'Ga', sound: 'ga', note: 'Bunyi /ga/.' },
    { key: 'nga', latin: 'Nga', name: 'Nga', sound: 'nga', note: 'Sengau /nga/.' },
    { key: 'pa', latin: 'Pa', name: 'Pa', sound: 'pa', note: 'Bunyi /pa/.' },
    { key: 'ba', latin: 'Ba', name: 'Ba', sound: 'ba', note: 'Bunyi /ba/.' },
    { key: 'ma', latin: 'Ma', name: 'Ma', sound: 'ma', note: 'Bunyi /ma/.' },
    { key: 'ta', latin: 'Ta', name: 'Ta', sound: 'ta', note: 'Bunyi /ta/.' },
    { key: 'da', latin: 'Da', name: 'Da', sound: 'da', note: 'Bunyi /da/.' },
    { key: 'na', latin: 'Na', name: 'Na', sound: 'na', note: 'Bunyi /na/.' },
    { key: 'ca', latin: 'Ca', name: 'Ca', sound: 'ca', note: 'Bunyi /ca/.' },
    { key: 'ja', latin: 'Ja', name: 'Ja', sound: 'ja', note: 'Bunyi /ja/.' },
    { key: 'nya', latin: 'Nya', name: 'Nya', sound: 'nya', note: 'Sengau /nya/.' },
    { key: 'ya', latin: 'Ya', name: 'Ya', sound: 'ya', note: 'Bunyi /ya/.' },
    { key: 'la', latin: 'La', name: 'La', sound: 'la', note: 'Bunyi /la/.' },
    { key: 'ra', latin: 'Ra', name: 'Ra', sound: 'ra', note: 'Bunyi /ra/.' },
    { key: 'sa', latin: 'Sa', name: 'Sa', sound: 'sa', note: 'Bunyi /sa/.' },
    { key: 'wa', latin: 'Wa', name: 'Wa', sound: 'wa', note: 'Bunyi /wa/.' },
    { key: 'ha', latin: 'Ha', name: 'Ha', sound: 'ha', note: 'Bunyi /ha/.' },
    { key: 'gha', latin: 'Gha', name: 'Gha', sound: 'gha', note: 'Bunyi /gha/, dipakai pada sejumlah kata serapan.' }
  ];

  const marks = [
    { group: 'above', key: 'i', latin: 'i', name: 'Anak huruf i', note: 'Vokal /i/ di atas huruf induk.' },
    { group: 'above', key: 'e', latin: 'e', name: 'Anak huruf e', note: 'Vokal /e/ di atas huruf induk.' },
    { group: 'above', key: 'an', latin: 'an', name: 'Anak huruf an', note: 'Menutup suku kata dengan /n/.' },
    { group: 'above', key: 'ang', latin: 'ang', name: 'Anak huruf ang', note: 'Menutup suku kata dengan /ng/.' },
    { group: 'above', key: 'ar', latin: 'ar', name: 'Anak huruf ar', note: 'Menutup suku kata dengan /r/.' },
    { group: 'below', key: 'u', latin: 'u', name: 'Anak huruf u', note: 'Vokal /u/ di bawah huruf induk.' },
    { group: 'below', key: 'o', latin: 'o', name: 'Anak huruf o', note: 'Vokal /o/ di bawah huruf induk.' },
    { group: 'below', key: 'au', latin: 'au', name: 'Anak huruf au', note: 'Diftong /au/.' },
    { group: 'after', key: 'ai', latin: 'ai', name: 'Anak huruf ai', note: 'Diftong /ai/, ditulis setelah huruf.' },
    { group: 'after', key: 'ah', latin: 'ah', name: 'Anak huruf ah', note: 'Menutup suku kata dengan /h/.' },
    { group: 'after', key: 'nengen', latin: 'ng', name: 'Nengen', note: 'Penanda konsonan mati (tanpa vokal).' }
  ];

  window.RJ = window.RJ || {};
  Object.assign(window.RJ, {
    toAksara,
    aksaraSvg,
    renderAksara,
    AK_SARA: { letters: LETTERS, marks, glyphs: G }
  });
})();
