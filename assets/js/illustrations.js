/* =========================================================
   RUWA JURAI — Hand-drawn SVG illustrations
   All artwork in this file is original to the project.
   ========================================================= */
(function () {
  'use strict';

  let seq = 0;
  const uid = (p) => `${p}${(++seq).toString(36)}`;
  const r1 = (n) => Math.round(n * 10) / 10;

  const LOGO = `
  <svg class="brand__mark" viewBox="0 0 48 48" role="img" aria-label="Marka Ruwa Jurai">
    <path d="M24 1.5 46.5 24 24 46.5 1.5 24Z" fill="#6a1c2b" stroke="#d9a94f" stroke-width="1.4"/>
    <path d="M24 7 41 24 24 41 7 24Z" fill="none" stroke="#d9a94f" stroke-width=".9" opacity=".55"/>
    <path d="M13.5 34 17.8 20.5 24 13.2 30.2 20.5 34.5 34Z" fill="none" stroke="#f5efe2" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M18.4 34 V25.2M24 34 V21.8M29.6 34 V25.2" stroke="#d9a94f" stroke-width="1.7" stroke-linecap="round"/>
    <circle cx="24" cy="13.4" r="2" fill="#d9a94f"/>
    <path d="M13.5 37.5H34.5" stroke="#d9a94f" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>
  </svg>`;

  /* ---------------------------------------------------------
     SAI — mascot
     --------------------------------------------------------- */
  function mascot(opts = {}) {
    const p = uid('sai');
    const bare = !!opts.bare;
    const cls = ['sai-svg', opts.className || ''].filter(Boolean).join(' ');
    const hidden = (name) => (bare && name ? ' is-hidden' : '');
    return `
    <svg class="${cls}" viewBox="0 0 700 840" role="${opts.decorative ? 'presentation' : 'img'}" ${opts.decorative ? 'aria-hidden="true"' : `aria-label="${opts.label || 'Sai, gajah Sumatra muda dengan siger dan kain tapis'}"`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${p}skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c3cbc5"/>
          <stop offset=".45" stop-color="#9ca7a1"/>
          <stop offset="1" stop-color="#727e79"/>
        </linearGradient>
        <linearGradient id="${p}skinDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8d9993"/>
          <stop offset="1" stop-color="#626f6a"/>
        </linearGradient>
        <radialGradient id="${p}ear" cx="45%" cy="40%" r="70%">
          <stop offset="0" stop-color="#e5b0a8"/>
          <stop offset=".7" stop-color="#cb8984"/>
          <stop offset="1" stop-color="#b06b6b"/>
        </radialGradient>
        <linearGradient id="${p}gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f7dda0"/>
          <stop offset=".35" stop-color="#e5b45d"/>
          <stop offset=".7" stop-color="#c58d35"/>
          <stop offset="1" stop-color="#9a6723"/>
        </linearGradient>
        <linearGradient id="${p}ivory" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff7e4"/>
          <stop offset="1" stop-color="#dfcba4"/>
        </linearGradient>
        <pattern id="${p}weave" width="38" height="38" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="38" height="38" fill="#742133"/>
          <path d="M0 19H38M19 0V38" stroke="#d9a94f" stroke-width="1.1" opacity=".85"/>
          <path d="M19 3 34 19 19 35 4 19Z" fill="none" stroke="#e9c77a" stroke-width="1" opacity=".8"/>
          <circle cx="19" cy="19" r="1.9" fill="#e9c77a"/>
        </pattern>
        <pattern id="${p}cloth" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="26" height="26" fill="#e9ddc5"/>
          <path d="M0 13H26M13 0V26" stroke="#b9a581" stroke-width=".8" opacity=".55"/>
        </pattern>
        <filter id="${p}soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#08110d" flood-opacity=".28"/>
        </filter>
      </defs>

      <g class="sai-bob" filter="url(#${p}soft)">
        <!-- tail -->
        <g class="sai-tail">
          <path d="M493 610c64 2 76 70 39 100" fill="none" stroke="#73807b" stroke-width="16" stroke-linecap="round"/>
          <path d="M536 704c-20 10-31 24-35 43 18-3 31-10 40-23 8-11 3-19-5-20Z" fill="#5d6a65"/>
        </g>

        <!-- legs -->
        <g class="sai-legs">
          <rect x="245" y="668" width="85" height="122" rx="39" fill="#7e8a85" stroke="#3d4945" stroke-width="3"/>
          <rect x="373" y="668" width="85" height="122" rx="39" fill="#7e8a85" stroke="#3d4945" stroke-width="3"/>
          <ellipse cx="289" cy="778" rx="57" ry="27" fill="#8b9791" stroke="#3d4945" stroke-width="3"/>
          <ellipse cx="417" cy="778" rx="57" ry="27" fill="#8b9791" stroke="#3d4945" stroke-width="3"/>
          <g fill="#d8cbb2" opacity=".9">
            <ellipse cx="270" cy="772" rx="7" ry="5"/><ellipse cx="288" cy="778" rx="7" ry="5"/><ellipse cx="306" cy="773" rx="7" ry="5"/>
            <ellipse cx="398" cy="773" rx="7" ry="5"/><ellipse cx="416" cy="778" rx="7" ry="5"/><ellipse cx="434" cy="772" rx="7" ry="5"/>
          </g>
          <g class="acc-bracelet${hidden('bracelet')}" fill="none" stroke="#e5b45d" stroke-width="7">
            <path d="M252 736q36 18 72 0"/><path d="M380 736q36 18 72 0"/>
          </g>
        </g>

        <!-- body -->
        <ellipse cx="350" cy="574" rx="174" ry="188" fill="url(#${p}skin)" stroke="#3d4945" stroke-width="3"/>
        <ellipse cx="350" cy="620" rx="125" ry="128" fill="#d8cbb2" opacity=".13"/>

        <!-- arms (behind head) -->
        <g class="sai-arm sai-arm--right">
          <path d="M459 515c48 6 77 25 88 50" fill="none" stroke="#85918b" stroke-width="48" stroke-linecap="round"/>
          <path d="M459 515c48 6 77 25 88 50" fill="none" stroke="url(#${p}skin)" stroke-width="42" stroke-linecap="round"/>
          <g class="acc-bracelet${hidden('bracelet')}">
            <path d="M512 550c10 8 22 13 36 15" fill="none" stroke="#e5b45d" stroke-width="7" stroke-linecap="round"/>
            <path d="M514 543c10 8 22 13 36 15" fill="none" stroke="#f7dda0" stroke-width="2" stroke-linecap="round"/>
          </g>
          <ellipse cx="552" cy="576" rx="29" ry="32" fill="#9aa59f" stroke="#3d4945" stroke-width="3"/>
          <path d="M541 557c9-8 20-8 28-1" fill="none" stroke="#3d4945" stroke-width="3" stroke-linecap="round"/>
          <g class="acc-branch${hidden('branch')}">
            <path d="M560 568c18-28 35-54 57-85" fill="none" stroke="#3f644f" stroke-width="6" stroke-linecap="round"/>
            <g fill="#4e745d">
              <ellipse cx="585" cy="503" rx="22" ry="10" transform="rotate(-28 585 503)"/>
              <ellipse cx="604" cy="477" rx="20" ry="9" transform="rotate(20 604 477)"/>
              <ellipse cx="557" cy="520" rx="18" ry="8" transform="rotate(-20 557 520)"/>
            </g>
            <g fill="#b8433e">
              <circle cx="604" cy="514" r="7"/><circle cx="620" cy="530" r="6"/><circle cx="580" cy="546" r="6"/>
            </g>
            <path d="M566 570c8 4 17 3 24-2" fill="none" stroke="#3d4945" stroke-width="3" stroke-linecap="round"/>
          </g>
        </g>

        <g class="sai-arm sai-arm--left">
          <path d="M241 505c-36 2-59-15-75-46" fill="none" stroke="#85918b" stroke-width="50" stroke-linecap="round"/>
          <path d="M241 505c-36 2-59-15-75-46" fill="none" stroke="url(#${p}skin)" stroke-width="44" stroke-linecap="round"/>
          <g class="acc-bracelet${hidden('bracelet')}">
            <path d="M187 489c-5-10-8-21-8-33" fill="none" stroke="#e5b45d" stroke-width="7" stroke-linecap="round"/>
            <path d="M180 489c-5-10-8-21-8-33" fill="none" stroke="#f7dda0" stroke-width="2" stroke-linecap="round"/>
          </g>
          <g class="sai-hand">
            <ellipse cx="160" cy="435" rx="31" ry="35" fill="#9aa59f" stroke="#3d4945" stroke-width="3" transform="rotate(-12 160 435)"/>
            <path d="M143 412c-3-14 3-24 10-26 8-2 13 7 13 18" fill="#9aa59f" stroke="#3d4945" stroke-width="3" stroke-linecap="round"/>
            <path d="M158 407c1-14 8-23 15-23 8 0 11 9 9 21" fill="#9aa59f" stroke="#3d4945" stroke-width="3" stroke-linecap="round"/>
            <path d="M174 410c4-12 11-19 17-17 7 2 8 11 3 21" fill="#9aa59f" stroke="#3d4945" stroke-width="3" stroke-linecap="round"/>
          </g>
        </g>

        <!-- undercloth + tapis -->
        <path d="M218 614q132-31 264 0l-17 82q-115 27-230 0Z" fill="url(#${p}cloth)" stroke="#3d4945" stroke-width="3"/>
        <g class="acc-tapis${hidden('tapis')}">
          <path d="M212 606q138-34 276 0l-14 24q-124 28-248 0Z" fill="#e5b45d" stroke="#4c1822" stroke-width="3"/>
          <path d="M210 622q140-33 280 0l-20 112q-120 30-240 0Z" fill="url(#${p}weave)" stroke="#4c1822" stroke-width="3"/>
          <path d="M224 704q126 25 252 0" fill="none" stroke="#e5b45d" stroke-width="4" opacity=".85"/>
          <g stroke="#e5b45d" stroke-width="2" opacity=".9">
            <path d="M232 720v18M252 724v18M272 727v18M292 729v18M312 730v18M332 731v18M352 732v18M372 731v18M392 730v18M412 728v18M432 726v18M452 723v18M472 720v18"/>
          </g>
          <!-- small ship motif -->
          <g fill="none" stroke="#f1d493" stroke-width="2.2" opacity=".95">
            <path d="M316 664h78l-15 27h-51Z"/>
            <path d="M352 643v50M352 646l30 19h-30M352 651l-23 14h23"/>
            <path d="M300 700q50 18 100 0"/>
          </g>
        </g>

        <!-- head & ears -->
        <g class="sai-head">
          <g class="sai-ear sai-ear--left">
            <ellipse cx="210" cy="354" rx="98" ry="137" fill="url(#${p}skinDark)" stroke="#3d4945" stroke-width="3" transform="rotate(-9 210 354)"/>
            <ellipse cx="217" cy="358" rx="62" ry="98" fill="url(#${p}ear)" stroke="#8f5a59" stroke-width="2" transform="rotate(-9 217 358)"/>
            <path d="M190 300c-8 26-6 57 7 85" fill="none" stroke="#e7bab1" stroke-width="3" opacity=".5" stroke-linecap="round"/>
          </g>
          <g class="sai-ear sai-ear--right">
            <ellipse cx="490" cy="354" rx="98" ry="137" fill="url(#${p}skinDark)" stroke="#3d4945" stroke-width="3" transform="rotate(9 490 354)"/>
            <ellipse cx="483" cy="358" rx="62" ry="98" fill="url(#${p}ear)" stroke="#8f5a59" stroke-width="2" transform="rotate(9 483 358)"/>
            <path d="M510 300c8 26 6 57-7 85" fill="none" stroke="#e7bab1" stroke-width="3" opacity=".5" stroke-linecap="round"/>
          </g>

          <path d="M350 168c104 0 171 68 171 177 0 113-70 172-171 172s-171-59-171-172c0-109 67-177 171-177Z" fill="url(#${p}skin)" stroke="#3d4945" stroke-width="3"/>
          <path d="M243 451c23 31 60 50 107 50s84-19 107-50c-8 49-47 78-107 78s-99-29-107-78Z" fill="#7d8983" opacity=".35"/>

          <!-- eyes -->
          <g class="sai-eyes">
            <ellipse cx="305" cy="334" rx="25" ry="31" fill="#fffaf0" stroke="#3d4945" stroke-width="2.5"/>
            <ellipse cx="395" cy="334" rx="25" ry="31" fill="#fffaf0" stroke="#3d4945" stroke-width="2.5"/>
            <g class="sai-pupils">
              <ellipse cx="309" cy="338" rx="13" ry="17" fill="#27302c"/>
              <ellipse cx="399" cy="338" rx="13" ry="17" fill="#27302c"/>
              <circle cx="304" cy="330" r="4.5" fill="#fff"/>
              <circle cx="394" cy="330" r="4.5" fill="#fff"/>
              <circle cx="315" cy="345" r="2" fill="#fff" opacity=".7"/>
              <circle cx="405" cy="345" r="2" fill="#fff" opacity=".7"/>
            </g>
            <path d="M280 300q24-13 47-1" fill="none" stroke="#4b5651" stroke-width="4" stroke-linecap="round"/>
            <path d="M373 299q24-12 47 1" fill="none" stroke="#4b5651" stroke-width="4" stroke-linecap="round"/>
          </g>
          <ellipse cx="273" cy="405" rx="20" ry="10" fill="#d88d87" opacity=".33"/>
          <ellipse cx="427" cy="405" rx="20" ry="10" fill="#d88d87" opacity=".33"/>
          <circle cx="252" cy="390" r="3" fill="#7f8b85" opacity=".7"/>
          <circle cx="448" cy="390" r="3" fill="#7f8b85" opacity=".7"/>

          <!-- trunk -->
          <g class="sai-trunk">
            <path d="M350 410c-4 62-13 108-38 151-16 27-45 36-60 17-14-17-3-38 15-39" fill="none" stroke="#5f6c67" stroke-width="58" stroke-linecap="round"/>
            <path d="M350 410c-4 62-13 108-38 151-16 27-45 36-60 17-14-17-3-38 15-39" fill="none" stroke="url(#${p}skin)" stroke-width="50" stroke-linecap="round"/>
            <path d="M344 430c-4 54-13 97-35 136" fill="none" stroke="#d7e0da" stroke-width="11" stroke-linecap="round" opacity=".2"/>
            <g fill="none" stroke="#68756f" stroke-width="2.5" opacity=".65" stroke-linecap="round">
              <path d="M318 470q12 6 22 1"/>
              <path d="M311 500q13 7 24 1"/>
              <path d="M301 530q14 7 25 1"/>
              <path d="M288 559q14 6 25 0"/>
            </g>
          </g>

          <!-- tusks & mouth -->
          <path d="M302 460c3 25 12 39 24 48" fill="none" stroke="url(#${p}ivory)" stroke-width="11" stroke-linecap="round"/>
          <path d="M398 460c-3 25-12 39-24 48" fill="none" stroke="url(#${p}ivory)" stroke-width="11" stroke-linecap="round"/>
          <path d="M334 485q17 12 34 1" fill="none" stroke="#39443f" stroke-width="3.5" stroke-linecap="round"/>

          <!-- siger -->
          <g class="acc-siger${hidden('siger')}">
            <path d="M244 251q106-27 212 0l-10 35q-96-23-192 0Z" fill="url(#${p}gold)" stroke="#6b4415" stroke-width="3"/>
            <path d="M259 249 286 174l28 67 36-97 36 97 28-67 27 75Z" fill="url(#${p}gold)" stroke="#6b4415" stroke-width="3" stroke-linejoin="round"/>
            <path d="M286 174l9 62M350 144v82M414 174l-9 62" fill="none" stroke="#fff0c4" stroke-width="3" opacity=".55"/>
            <g fill="#b23a48" stroke="#6b4415" stroke-width="2">
              <circle cx="350" cy="216" r="9"/><circle cx="296" cy="235" r="5.5"/><circle cx="404" cy="235" r="5.5"/>
            </g>
            <g fill="#f7dda0">
              <circle cx="270" cy="258" r="3"/><circle cx="294" cy="254" r="3"/><circle cx="318" cy="251" r="3"/><circle cx="342" cy="249" r="3"/><circle cx="366" cy="249" r="3"/><circle cx="390" cy="252" r="3"/><circle cx="414" cy="255" r="3"/><circle cx="436" cy="259" r="3"/>
            </g>
            <path d="M244 286c-18 14-22 34-15 54" fill="none" stroke="#d9a94f" stroke-width="3"/>
            <path d="M249 337l-9 18-11-16 8-16Z" fill="#b23a48" stroke="#6b4415" stroke-width="2"/>
            <path d="M456 286c18 14 22 34 15 54" fill="none" stroke="#d9a94f" stroke-width="3"/>
            <path d="M451 337l9 18 11-16-8-16Z" fill="#b23a48" stroke="#6b4415" stroke-width="2"/>
            <path d="M262 270q88-18 176 0" fill="none" stroke="#fff0c4" stroke-width="2" opacity=".8"/>
          </g>

          <circle cx="210" cy="438" r="5" fill="#e5b45d" opacity=".9"/>
          <circle cx="490" cy="438" r="5" fill="#e5b45d" opacity=".9"/>
        </g>
      </g>
    </svg>`;
  }

  /* ---------------------------------------------------------
     HERO — layered Lampung landscape
     --------------------------------------------------------- */
  function heroScene() {
    const p = uid('hero');
    return `
    <svg class="hero-scene__svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${p}sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0d211a"/>
          <stop offset=".55" stop-color="#17382d"/>
          <stop offset="1" stop-color="#275344"/>
        </linearGradient>
        <radialGradient id="${p}glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#e9c77a" stop-opacity=".5"/>
          <stop offset=".45" stop-color="#c6933d" stop-opacity=".18"/>
          <stop offset="1" stop-color="#c6933d" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${p}gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f6dda6"/>
          <stop offset=".5" stop-color="#d9a94f"/>
          <stop offset="1" stop-color="#a67328"/>
        </linearGradient>
        <linearGradient id="${p}far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b5c4a"/>
          <stop offset="1" stop-color="#1b3f33"/>
        </linearGradient>
        <linearGradient id="${p}mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#204a3a"/>
          <stop offset="1" stop-color="#14332a"/>
        </linearGradient>
        <linearGradient id="${p}sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#173e3d"/>
          <stop offset="1" stop-color="#0d2526"/>
        </linearGradient>
        <pattern id="${p}sunPattern" width="44" height="44" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M22 2 42 22 22 42 2 22Z" fill="none" stroke="#f2d48f" stroke-width="1" opacity=".45"/>
          <path d="M22 10 34 22 22 34 10 22Z" fill="none" stroke="#f2d48f" stroke-width=".8" opacity=".3"/>
          <circle cx="22" cy="22" r="1.6" fill="#f2d48f" opacity=".6"/>
        </pattern>
        <filter id="${p}blur"><feGaussianBlur stdDeviation="8"/></filter>
      </defs>

      <rect width="1600" height="1000" fill="url(#${p}sky)"/>
      <g data-depth="0.02" class="hero-scene__stars">
        ${Array.from({ length: 48 }).map((_, i) => {
          const x = (i * 157 + 83) % 1560 + 20;
          const y = (i * 97 + 41) % 560 + 30;
          const r = i % 7 === 0 ? 1.9 : 1.1;
          const delay = ((i % 9) * 0.45).toFixed(2);
          return `<circle class="hero-star" style="--d:${delay}s" cx="${x}" cy="${y}" r="${r}" fill="#f3dca7" opacity="${(0.18 + (i % 4) * 0.14).toFixed(2)}"/>`;
        }).join('')}
      </g>

      <g data-depth="0.04" class="hero-scene__glow">
        <circle cx="1060" cy="430" r="470" fill="url(#${p}glow)"/>
        <circle class="hero-sun-ring" cx="1060" cy="430" r="240" fill="none" stroke="#e9c77a" stroke-width="1" opacity=".22"/>
        <circle class="hero-sun-ring hero-sun-ring--slow" cx="1060" cy="430" r="292" fill="none" stroke="#e9c77a" stroke-width="1" opacity=".14" stroke-dasharray="3 10"/>
        <circle cx="1060" cy="430" r="196" fill="url(#${p}gold)" opacity=".9"/>
        <circle cx="1060" cy="430" r="196" fill="url(#${p}sunPattern)" opacity=".55"/>
        <g class="hero-sun-rays" fill="none" stroke="#f2d48f" stroke-width="1.2" opacity=".4">
          ${Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            const x1 = 1060 + Math.cos(a) * 228;
            const y1 = 430 + Math.sin(a) * 228;
            const x2 = 1060 + Math.cos(a) * 250;
            const y2 = 430 + Math.sin(a) * 250;
            return `<path d="M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}"/>`;
          }).join('')}
        </g>
      </g>

      <g data-depth="0.06" class="hero-scene__birds" fill="none" stroke="#e9c77a" stroke-width="2" stroke-linecap="round" opacity=".55">
        <path d="M300 255q13-12 26 0M326 255q13-12 26 0"/>
        <path d="M1170 225q11-10 22 0M1192 225q11-10 22 0"/>
        <path d="M905 185q8-8 16 0M921 185q8-8 16 0" opacity=".6"/>
      </g>

      <g data-depth="0.07" class="hero-scene__far">
        <path d="M0 690 170 470l95 112 120-190 160 236 120-126 170 180 145-152 185 198 120-96 205 160v160H0Z" fill="url(#${p}far)" opacity=".9"/>
        <path d="M0 720 190 560l110 88 130-96 120 100 100-70 150 110 170-120 130 100 130-80 180 110v150H0Z" fill="#173b30" opacity=".8"/>
        <path d="M0 760 240 660l120 64 160-90 130 92 140-64 160 88 150-70 170 84 160-100 170 96v130H0Z" fill="#123128"/>
      </g>

      <g data-depth="0.09" class="hero-scene__sea">
        <path d="M0 790h1600v210H0Z" fill="url(#${p}sea)"/>
        <g fill="none" stroke="#6f9c8e" stroke-width="2" opacity=".3" stroke-linecap="round">
          <path d="M80 840q32-16 64 0t64 0 64 0 64 0 64 0 64 0"/>
          <path d="M700 880q32-16 64 0t64 0 64 0 64 0 64 0 64 0 64 0"/>
          <path d="M1020 830q28-14 56 0t56 0 56 0 56 0 56 0"/>
          <path d="M260 920q30-15 60 0t60 0 60 0 60 0 60 0"/>
        </g>
        <g class="hero-boat" opacity=".8">
          <path d="M1260 820h150l-24 34h-106Z" fill="#0c201e" stroke="#c9a661" stroke-width="2"/>
          <path d="M1334 820v-112l72 76h-72" fill="#12312c" stroke="#c9a661" stroke-width="2"/>
          <path d="M1334 708v112l-54-56h54" fill="#0f2a25" stroke="#c9a661" stroke-width="2" opacity=".9"/>
          <path d="M1240 870q80 16 160 0" fill="none" stroke="#c9a661" stroke-width="2" opacity=".4"/>
        </g>
      </g>

      <g data-depth="0.12" class="hero-scene__mid">
        <path d="M0 820c130-50 230-44 340 4 120 52 220 42 340-4 130-50 230-40 330 10 120 62 230 48 330 0 100-48 180-40 260-6v176H0Z" fill="#0f2a22"/>
        <!-- village -->
        <g transform="translate(150 690) scale(.9)" opacity=".9">
          <path d="M0 94h170v10H0Z" fill="#092019"/>
          <path d="M20 92V48h128v44Z" fill="#132f27" stroke="#b58d47" stroke-width="2"/>
          <path d="M4 48 84 6l80 42Z" fill="#173a2f" stroke="#b58d47" stroke-width="2"/>
          <path d="M67 92V66h32v26Z" fill="#e9c77a" opacity=".6"/>
          <path d="M31 62h22v18H31ZM117 62h22v18h-22Z" fill="#e9c77a" opacity=".5"/>
          <path d="M84 6v-18M84 -12l24 8-24 8" fill="none" stroke="#b58d47" stroke-width="2"/>
        </g>
        <!-- trees -->
        <g fill="#0b241c" stroke="#163b2e" stroke-width="2">
          <path d="M450 850c-8-58 20-100 46-100s48 44 40 100Z"/>
          <path d="M510 842c-12-82 28-138 60-138s58 60 46 138Z" opacity=".8"/>
          <path d="M1200 850c-10-70 24-122 54-122s58 52 48 122Z" opacity=".9"/>
          <path d="M1390 856c-8-60 20-104 45-104s48 44 40 104Z" opacity=".7"/>
        </g>
        <!-- coffee / pepper vines -->
        <g transform="translate(80 780)" stroke="#2f5847" stroke-width="4" fill="none" opacity=".8">
          <path d="M0 80c34-16 54-50 56-96M56 80c10-38 4-70-14-98"/>
          <g fill="#b8433e" stroke="none">
            <circle cx="18" cy="44" r="4"/><circle cx="31" cy="30" r="4"/><circle cx="49" cy="56" r="4"/><circle cx="62" cy="36" r="4"/>
          </g>
          <g fill="#3f644f" stroke="none">
            <ellipse cx="22" cy="24" rx="12" ry="5" transform="rotate(-30 22 24)"/>
            <ellipse cx="44" cy="20" rx="12" ry="5" transform="rotate(20 44 20)"/>
            <ellipse cx="60" cy="64" rx="12" ry="5" transform="rotate(-15 60 64)"/>
          </g>
        </g>
      </g>

      <g data-depth="0.16" class="hero-scene__fore">
        <path d="M0 900c120-34 240-40 370-10 140 32 270 20 390-14 150-42 280-38 410 2 110 34 220 38 430 8v114H0Z" fill="#0a1f19"/>
        <g fill="#102b22" stroke="#1d4436" stroke-width="2">
          <path d="M0 950c100-46 180-46 270 0Z"/>
          <path d="M1330 960c80-42 170-40 270 0Z"/>
        </g>
        <g stroke="#2f5847" stroke-width="3" fill="none" opacity=".7">
          <path d="M1120 990c8-70 42-110 92-140M1212 990c-10-60-34-96-74-124"/>
          <path d="M80 996c0-48 16-80 44-100M124 996c-4-38-18-66-42-86"/>
        </g>
        <g fill="#d9a94f" opacity=".55">
          <circle cx="1180" cy="890" r="3"/><circle cx="1250" cy="920" r="2.2"/><circle cx="1320" cy="870" r="2.6"/><circle cx="1080" cy="940" r="2"/>
          <circle cx="250" cy="910" r="2.2"/><circle cx="330" cy="940" r="3"/><circle cx="420" cy="900" r="2"/>
        </g>
      </g>
    </svg>`;
  }

  /* ---------------------------------------------------------
     PAGE ORNAMENT
     --------------------------------------------------------- */
  function ornament(motif = 'compass', opts = {}) {
    const p = uid('orn');
    return `
    <svg class="ornament-svg ${opts.className || ''}" viewBox="0 0 600 600" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${p}g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f6dda6"/><stop offset=".5" stop-color="#d9a94f"/><stop offset="1" stop-color="#9b6926"/>
        </linearGradient>
        <pattern id="${p}pat" width="42" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M21 2 40 21 21 40 2 21Z" fill="none" stroke="#d9a94f" stroke-width="1" opacity=".4"/>
          <circle cx="21" cy="21" r="1.4" fill="#d9a94f" opacity=".6"/>
        </pattern>
      </defs>
      <circle cx="300" cy="300" r="284" fill="url(#${p}pat)" opacity=".4"/>
      <circle cx="300" cy="300" r="236" fill="none" stroke="#d9a94f" stroke-width="1" opacity=".5"/>
      <circle cx="300" cy="300" r="196" fill="none" stroke="#d9a94f" stroke-width="1" opacity=".35" stroke-dasharray="2 9"/>
      <g fill="none" stroke="#d9a94f" stroke-width="1.2" opacity=".4">
        ${Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return `<path d="M${r1(300 + Math.cos(a) * 246)} ${r1(300 + Math.sin(a) * 246)}L${r1(300 + Math.cos(a) * 258)} ${r1(300 + Math.sin(a) * 258)}"/>`;
        }).join('')}
      </g>
      <g color="#d9a94f" opacity=".9">
        ${motifPaths(motif, 300, 300, 3.1)}
      </g>
    </svg>`;
  }

  /* ---------------------------------------------------------
     MOTIF LINE ART
     --------------------------------------------------------- */
  function motifPaths(name, cx = 300, cy = 300, s = 1) {
    const g = (inner) => `<g transform="translate(${cx} ${cy}) scale(${s})" fill="none" stroke="currentColor" stroke-width="${1.6 / s}" stroke-linecap="round" stroke-linejoin="round">${inner}</g>`;
    switch (name) {
      case 'wave':
        return g(`<path d="M-70 22q18-24 36 0t36 0 36 0M-70 0q18-24 36 0t36 0 36 0M-70 -22q18-24 36 0t36 0 36 0"/><circle cx="10" cy="-52" r="16"/><path d="M-58 48h116"/>`);
      case 'mountain':
        return g(`<path d="M-74 42 0-42l74 84Z"/><path d="M-42 12-18 36M0-42 20-18M22 22 38 42"/><path d="M-64 48h128"/><circle cx="44" cy="-50" r="9"/>`);
      case 'compass':
        return g(`<circle cx="0" cy="0" r="58"/><path d="M0-58 16-16 58 0 16 16 0 58-16 16-58 0-16-16Z"/><circle cx="0" cy="0" r="5" fill="currentColor"/><path d="M-72 0h14M58 0h14M0-72v14M0 58v14"/>`);
      case 'throne':
        return g(`<path d="M-52 44V-16q0-20 20-20h64q20 0 20 20v60M-52 6h104"/><path d="M-38-36v-22l14 8 14-16 14 16 14-8 14 16 14-8v34"/><path d="M-30 44v20M30 44v20"/><path d="M-34 22h68"/>`);
      case 'mask':
        return g(`<path d="M-58-42q58-30 116 0 10 55-22 84Q4 72 0 72t-36-30q-32-29-22-84Z"/><path d="M-38-8q16-14 30 0M34-8q-16-14-30 0"/><path d="M-20 34q20 16 40 0"/><path d="M-58-42 0-58l58 16"/><path d="M-46-58 0-76l46 18"/>`);
      case 'dance':
        return g(`<circle cx="0" cy="-50" r="14"/><path d="M0-36v36M0 0l-30 36M0 0l32 34M0-28l-40 6M0-28l40-16"/><path d="M-48-58q10-8 20 0M28-64q10-8 20 0"/><path d="M-52 42h104"/>`);
      case 'rings':
        return g(`<circle cx="-22" cy="0" r="36"/><circle cx="22" cy="0" r="36"/><circle cx="-22" cy="0" r="27" stroke-dasharray="2 6"/><path d="M-64-54l8 8M56-54l-8 8M-64 54l8-8M56 54l-8-8"/>`);
      case 'loom':
        return g(`<path d="M-66-58v116M66-58v116M-66-58h132M-66 58h132"/><path d="M-48-36h96v68h-96Z"/><path d="M-48-18h96M-48 0h96M-48 18h96M-24-36v68M0-36v68M24-36v68" opacity=".7"/><path d="M-48 48h96"/>`);
      case 'crown':
        return g(`<path d="M-66 30 -58-36-28-4 0-52 28-4 58-36 66 30Z"/><path d="M-66 30h132v20H-66Z"/><circle cx="0" cy="-24" r="7"/><circle cx="-38" cy="4" r="4"/><circle cx="38" cy="4" r="4"/><path d="M-48 58h96"/>`);
      case 'house':
        return g(`<path d="M-58 52V-8h116v60M-74-8 0-66 74-8"/><path d="M-20 52V20h40v32"/><path d="M-44 10h18v18h-18ZM26 10h18v18H26"/><path d="M-28-8-26-40 0-58 26-40 28-8"/><path d="M-70 52h140"/>`);
      case 'gong':
        return g(`<circle cx="14" cy="18" r="44"/><circle cx="14" cy="18" r="30"/><circle cx="14" cy="18" r="8" fill="currentColor"/><path d="M-64-52h38M-64-30h38M-64-8h38M-64 14h38M-64 36h38"/><path d="M-58 56h100"/>`);
      case 'book':
        return g(`<path d="M-60-42q32-12 60 4 28-16 60-4v84q-32-12-60 4-28-16-60-4Z"/><path d="M0-38v84M-46-24q20-6 34 2M-46-4q20-6 34 2M-46 16q20-6 34 2M12-22q20-8 34-2M12-2q20-8 34-2M12 18q20-8 34-2"/>`);
      case 'glyph':
        return g(`<path d="M-54 42 12-42q10-12 18 0 6 10-2 24L-22 42M-42 6 8 42M-64 0 42-58M-56 56h96"/><circle cx="42" cy="-46" r="6"/><path d="M44 57c18-8 28-22 32-42" stroke-width="2"/>`);
      case 'speech':
        return g(`<path d="M-64-42h96v62h-48L-40 44-36 20h-28Z"/><path d="M28-8h42v52H42L24 60 28 38h-8"/><path d="M-44-20h60M-44 0h36M38 12h18M38 28h12" opacity=".7"/>`);
      case 'hands':
        return g(`<path d="M-58 20q20-34 40-8 0-36 20-28 4-30 22-18 22 14 30 72-2 42-50 44-42 2-62-62Z"/><path d="M-58 20Q-38-8-18 12M0-16v34M20-10v30M-44 38h84"/>`);
      case 'landmark':
        return g(`<path d="M-66 44h132M-58 44V-2h116v46M-66-2 0-46 66-2Z"/><path d="M-36 44V12M-12 44V12M12 44V12M36 44V12"/><path d="M-52 58h104"/>`);
      case 'seruit':
        return g(`<path d="M-66 24h132q-12 34-66 34T-66 24Z"/><path d="M-58 24q10-42 58-42t58 42"/><path d="M-38 22q16-20 30-4 12-18 28-2 12-12 26 6"/><path d="M-46 58h92" opacity=".6"/><path d="M40-44q12-16 24 0M56-44q12-16 24 0" opacity=".5"/>`);
      case 'leaf':
        return g(`<path d="M-48 48C-58-14-14-54 44-52 52 8 14 56-48 48Z"/><path d="M-40 40 32-38M-18 12l-2-28M2-8l24-2M-30 26l-2 22M-10 6l22-2"/>`);
      default:
        return g(`<circle cx="0" cy="0" r="46"/><path d="M0-64 18-18 64 0 18 18 0 64-18 18-64 0-18-18Z"/>`);
    }
  }

  function motifPanel(motif, opts = {}) {
    return `<div class="motif-panel ${opts.className || ''}" ${opts.style ? `style="${opts.style}"` : ''}>
      <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
        <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" stroke-width="1" opacity=".25"/>
        <circle cx="300" cy="300" r="210" fill="none" stroke="currentColor" stroke-width="1" opacity=".16" stroke-dasharray="2 8"/>
        <g fill="none" stroke="currentColor" stroke-width="1" opacity=".18">
          ${Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return `<path d="M${r1(300 + Math.cos(a) * 246)} ${r1(300 + Math.sin(a) * 246)}L${r1(300 + Math.cos(a) * 280)} ${r1(300 + Math.sin(a) * 280)}"/>`;
          }).join('')}
        </g>
        <g color="currentColor">
          ${motifPaths(motif, 300, 300, 3.2)}
        </g>
      </svg>
      ${opts.label ? `<span class="motif-panel__label">${opts.label}</span>` : ''}
    </div>`;
  }

  /* ---------------------------------------------------------
     DISH ILLUSTRATIONS
     --------------------------------------------------------- */
  function dish(type) {
    const p = uid('dish');
    const palettes = {
      seruit: { bg: '#e9d7b9', circle: '#d9bf93', accent: '#6e1d2d', food: '#8a5433' },
      pindang: { bg: '#ead4c0', circle: '#c98d64', accent: '#7a2436', food: '#b9583e' },
      gulai: { bg: '#efd7b3', circle: '#d3a85e', accent: '#2b5142', food: '#c7943e' },
      engkak: { bg: '#ecdcc2', circle: '#c9a26b', accent: '#7a2436', food: '#d3ad72' },
      kemplang: { bg: '#efdfc5', circle: '#d4b27d', accent: '#6e1d2d', food: '#d9b579' },
      keripik: { bg: '#f0e0bc', circle: '#d7b26c', accent: '#2b5142', food: '#e0b84f' },
      lempok: { bg: '#e7d2af', circle: '#ba945c', accent: '#7a2436', food: '#b0792e' },
      kopi: { bg: '#e5d5bd', circle: '#b98b55', accent: '#5a1b27', food: '#5b3726' },
      sambal: { bg: '#e9d1ba', circle: '#c07f63', accent: '#6e1d2d', food: '#b53a36' }
    };
    const c = palettes[type] || palettes.seruit;
    const steam = `<g class="dish-steam" fill="none" stroke="#fff8ea" stroke-width="4" stroke-linecap="round" opacity=".5">
      <path d="M300 120c-18 28 18 38 0 66"/><path d="M360 100c-18 28 18 38 0 66"/><path d="M420 126c-18 28 18 38 0 66"/></g>`;
    let content = '';
    if (type === 'seruit') {
      content = `
        <g transform="rotate(-4 400 340)">
          <path d="M120 400q70-170 280-180 210-10 280 140-40 142-280 152-240 10-280-112Z" fill="#3f664f" stroke="#2c4c39" stroke-width="4"/>
          <path d="M155 390q65-142 250-150 185-8 245 116-35 122-250 132-215 10-245-98Z" fill="#4d795d" opacity=".85"/>
          <path d="M215 355q10-80 140-92 130-12 176 76-45 74-166 82-120 8-150-66Z" fill="#a8693e" stroke="#6e3e23" stroke-width="4"/>
          <path d="M240 330q65-48 160-35 50 7 80 36" fill="none" stroke="#7a4529" stroke-width="9" stroke-linecap="round"/>
          <g fill="none" stroke="#d9a15e" stroke-width="6" opacity=".7">
            <path d="M268 300q22 20 44 0M330 288q22 20 44 0M392 300q22 20 44 0M300 340q22 20 44 0M368 344q22 20 44 0"/>
          </g>
          <path d="M248 350q24-16 48 0" stroke="#f2c98f" stroke-width="5" fill="none" stroke-linecap="round"/>
        </g>
        <g>
          <ellipse cx="590" cy="410" rx="86" ry="52" fill="#f3e8cd" stroke="#b99d6b" stroke-width="3"/>
          <ellipse cx="590" cy="400" rx="66" ry="36" fill="#b33c36"/>
          <path d="M560 394q12-12 24 0M586 386q12-12 24 0M610 398q12-12 24 0" fill="none" stroke="#f5d9a5" stroke-width="4" stroke-linecap="round"/>
        </g>
        <g>
          <circle cx="210" cy="235" r="46" fill="#b9cd75" stroke="#7b964b" stroke-width="3"/>
          <path d="M210 191v88M166 235h88" stroke="#e8efc4" stroke-width="4" opacity=".6"/>
          <circle cx="160" cy="430" r="36" fill="#b8d178" stroke="#7c984c" stroke-width="3"/>
          <path d="M160 394v72M124 430h72" stroke="#e8efc4" stroke-width="3" opacity=".6"/>
          <path d="M520 230q30-28 60 0" fill="none" stroke="#6e9b54" stroke-width="7" stroke-linecap="round"/>
          <path d="M550 230c-6 20-2 44 10 58" fill="none" stroke="#6e9b54" stroke-width="5"/>
        </g>
        <g fill="#b53a36"><ellipse cx="480" cy="500" rx="24" ry="10" transform="rotate(-18 480 500)"/><ellipse cx="520" cy="515" rx="20" ry="9" transform="rotate(12 520 515)"/></g>`;
    } else if (type === 'pindang' || type === 'gulai') {
      const golden = type === 'gulai';
      content = `
        <g>
          <ellipse cx="400" cy="410" rx="252" ry="118" fill="#7e3b2e" stroke="#4d201c" stroke-width="4"/>
          <ellipse cx="400" cy="384" rx="234" ry="102" fill="${golden ? '#d9a63f' : '#b94f36'}"/>
          <ellipse cx="400" cy="376" rx="208" ry="86" fill="${golden ? '#eac25f' : '#d06a43'}"/>
          <path d="M230 380q50-50 113-20 25-48 80-22 30-32 70-8 52-18 78 28" fill="none" stroke="${golden ? '#b5802d' : '#9c382d'}" stroke-width="5" opacity=".65"/>
          ${golden ? `
            <g fill="#8a7a3b"><ellipse cx="330" cy="368" rx="52" ry="20" transform="rotate(-12 330 368)"/><ellipse cx="465" cy="392" rx="46" ry="18" transform="rotate(8 465 392)"/></g>
            <g fill="#d8b24b"><circle cx="280" cy="390" r="18"/><circle cx="355" cy="410" r="14"/><circle cx="512" cy="380" r="16"/></g>
            <g fill="#4c7452"><ellipse cx="300" cy="350" rx="22" ry="9" transform="rotate(-30 300 350)"/><ellipse cx="525" cy="406" rx="20" ry="8" transform="rotate(20 525 406)"/></g>
          ` : `
            <g>
              <path d="M300 390q34-52 88-32 26-38 68-12 36-16 62 22-24 46-104 48-74 2-114-26Z" fill="#7c8e8a" stroke="#4c5c58" stroke-width="3"/>
              <circle cx="330" cy="378" r="5" fill="#f1e3c8"/><path d="M370 368q30-20 60 0" fill="none" stroke="#5e716d" stroke-width="3"/>
            </g>
            <g fill="#4c7452"><ellipse cx="278" cy="392" rx="25" ry="9" transform="rotate(-28 278 392)"/><ellipse cx="512" cy="360" rx="22" ry="8" transform="rotate(24 512 360)"/></g>
            <g fill="#b53a36"><ellipse cx="430" cy="350" rx="28" ry="8" transform="rotate(-12 430 350)"/><ellipse cx="460" cy="410" rx="24" ry="8" transform="rotate(8 460 410)"/></g>
          `}
          <path d="M174 404q226 90 452 0" fill="none" stroke="#e9c376" stroke-width="5" opacity=".55"/>
          <path d="M188 440q212 76 424 0" fill="none" stroke="#f4dca4" stroke-width="2" opacity=".3"/>
        </g>
        <g fill="none" stroke="#8a5433" stroke-width="3" opacity=".3">
          <path d="M400 274q-16-28 4-48M430 280q-16-28 4-48M370 280q-16-28 4-48"/>
        </g>
        <g transform="translate(590 490) rotate(12)">
          <ellipse cx="0" cy="0" rx="44" ry="22" fill="#e7d3ad" stroke="#b08e59" stroke-width="3"/>
          <path d="M-26 0h52M-18-8h36M-18 8h36" stroke="#b08e59" stroke-width="2" opacity=".6"/>
        </g>`;
    } else if (type === 'engkak') {
      content = `
        <g>
          <ellipse cx="400" cy="440" rx="250" ry="78" fill="#c49a5f" opacity=".35"/>
          <ellipse cx="400" cy="418" rx="240" ry="74" fill="#f1e2c5" stroke="#c7a979" stroke-width="3"/>
          <ellipse cx="400" cy="408" rx="198" ry="56" fill="#e4cfa9"/>
          <g transform="translate(400 330)">
            <path d="M-120-30 102-50 132 46-90 66Z" fill="#d4a55d" stroke="#8c5d2b" stroke-width="4"/>
            <path d="M-114-18 102-38 112 4-104 24Z" fill="#8c5d2b"/>
            <path d="M-102 6 106-14 112 18-96 38Z" fill="#f0d6a2"/>
            <path d="M-92 28 110 8 116 28-86 48Z" fill="#8c5d2b"/>
            <path d="M-118-30 102-50 106-36-114-16Z" fill="#f4e0b5"/>
            <path d="M-90 66 132 46 134 56-88 76Z" fill="#b57e38" opacity=".6"/>
          </g>
          <g fill="#8c5d2b" opacity=".55"><circle cx="270" cy="450" r="4"/><circle cx="300" cy="470" r="3"/><circle cx="530" cy="450" r="3"/><circle cx="500" cy="470" r="4"/></g>
          <path d="M260 470q40 20 80 0" fill="none" stroke="#b9945d" stroke-width="2" opacity=".5"/>
        </g>
        <g transform="translate(590 250) rotate(14)">
          <path d="M0 0q40-12 40 26t-40 26q-40 0-40-26T0 0Z" fill="#8c5d2b" opacity=".8"/>
          <path d="M-24 22q24-14 48 0" fill="none" stroke="#e7c78e" stroke-width="2" opacity=".5"/>
        </g>`;
    } else if (type === 'kemplang') {
      content = `
        <g>
          <ellipse cx="400" cy="430" rx="240" ry="92" fill="#c49a5f" opacity=".3"/>
          <ellipse cx="400" cy="404" rx="232" ry="78" fill="#f1e2c5" stroke="#c7a979" stroke-width="3"/>
          <g>
            <ellipse cx="350" cy="390" rx="100" ry="48" fill="#e1bd7e" stroke="#9c6b2e" stroke-width="3" transform="rotate(-8 350 390)"/>
            <ellipse cx="420" cy="360" rx="98" ry="46" fill="#e8c88f" stroke="#9c6b2e" stroke-width="3" transform="rotate(9 420 360)"/>
            <ellipse cx="380" cy="326" rx="92" ry="43" fill="#f0d6a4" stroke="#9c6b2e" stroke-width="3" transform="rotate(-4 380 326)"/>
            <g fill="#b98642" opacity=".65">
              <circle cx="330" cy="386" r="5"/><circle cx="370" cy="398" r="4"/><circle cx="390" cy="370" r="5"/><circle cx="440" cy="360" r="4"/><circle cx="410" cy="320" r="5"/><circle cx="350" cy="322" r="4"/>
            </g>
          </g>
          <g>
            <ellipse cx="590" cy="440" rx="78" ry="44" fill="#f3e8cd" stroke="#b99d6b" stroke-width="3"/>
            <ellipse cx="590" cy="432" rx="58" ry="30" fill="#b33c36"/>
            <path d="M564 428q11-10 22 0M588 422q11-10 22 0" fill="none" stroke="#f5d9a5" stroke-width="3" stroke-linecap="round"/>
          </g>
          <g fill="#b53a36"><ellipse cx="238" cy="300" rx="30" ry="9" transform="rotate(-26 238 300)"/><ellipse cx="264" cy="322" rx="24" ry="8" transform="rotate(8 264 322)"/></g>
        </g>`;
    } else if (type === 'keripik') {
      content = `
        <g>
          <ellipse cx="400" cy="440" rx="230" ry="80" fill="#c49a5f" opacity=".3"/>
          <path d="M186 396q0 100 214 100t214-100q-40 52-214 52t-214-52Z" fill="#6e1d2d" stroke="#48121d" stroke-width="3"/>
          <ellipse cx="400" cy="396" rx="214" ry="76" fill="#8a2b3d"/>
          <ellipse cx="400" cy="388" rx="188" ry="60" fill="#f2dfb5"/>
          <g fill="#e2b84f" stroke="#a87a23" stroke-width="2">
            ${Array.from({ length: 22 }).map((_, i) => {
              const x = 260 + (i * 37) % 290;
              const y = 345 + ((i * 53) % 70);
              const rot = (i * 47) % 180;
              return `<ellipse cx="${x}" cy="${y}" rx="30" ry="9" transform="rotate(${rot} ${x} ${y})"/>`;
            }).join('')}
          </g>
          <g fill="#f4d78a" opacity=".8">
            <ellipse cx="340" cy="360" rx="22" ry="5" transform="rotate(20 340 360)"/>
            <ellipse cx="440" cy="380" rx="24" ry="5" transform="rotate(-30 440 380)"/>
            <ellipse cx="390" cy="330" rx="20" ry="5" transform="rotate(70 390 330)"/>
          </g>
          <g>
            <ellipse cx="590" cy="430" rx="70" ry="38" fill="#efe1c4" stroke="#b99d6b" stroke-width="3"/>
            <ellipse cx="590" cy="422" rx="50" ry="24" fill="#b33c36"/>
          </g>
        </g>
        <g fill="#b56a39" opacity=".8"><ellipse cx="250" cy="380" rx="30" ry="9" transform="rotate(-40 250 380)"/><ellipse cx="520" cy="350" rx="28" ry="8" transform="rotate(24 520 350)"/></g>`;
    } else if (type === 'lempok') {
      content = `
        <g>
          <ellipse cx="400" cy="474" rx="215" ry="52" fill="#8f6c3c" opacity=".25"/>
          <g transform="translate(400 320)">
            <path d="M-90-40h180l22 24v154q0 30-30 30H-82q-30 0-30-30V-16Z" fill="#e7d5b4" stroke="#8c6b3c" stroke-width="4"/>
            <path d="M-112-16h224v-18q0-30-30-30H-82q-30 0-30 30Z" fill="#c89b57" stroke="#7e5927" stroke-width="4"/>
            <path d="M-92 10h184v106q0 24-24 24H-68q-24 0-24-24Z" fill="#8a5a23" opacity=".9"/>
            <path d="M-92 22h184v64q0 24-24 24H-68q-24 0-24-24Z" fill="#b0792e"/>
            <path d="M-70 34q20-16 40 0t40 0 40 0" fill="none" stroke="#e9bd70" stroke-width="5" opacity=".7"/>
            <path d="M-20 0h40v168h-40Z" fill="#fff4dc" opacity=".28"/>
            <path d="M72 0h26v168H72Z" fill="#fff4dc" opacity=".16"/>
          </g>
          <g transform="translate(580 270) rotate(16)">
            <ellipse cx="0" cy="0" rx="92" ry="62" fill="#b9c96e" stroke="#7a8a3e" stroke-width="4"/>
            <g fill="#e8c95b" stroke="#a9862c" stroke-width="3">
              <path d="M-44-18q16-28 40 0 18 22-12 38-30 16-36-10Z"/>
              <path d="M10-10q18-24 38 0 14 22-10 36-24 14-34-10Z"/>
              <path d="M-20 24q14-20 34-2 14 18-6 30-26 12-34-8Z"/>
            </g>
          </g>
          <g transform="translate(180 330) rotate(-18)">
            <path d="M0 0c40-10 56 18 36 42S-12 58-18 26-18 6 0 0Z" fill="#8c5d2b" stroke="#5e3c17" stroke-width="3"/>
            <path d="M-34 60q30-16 60 0" fill="none" stroke="#e7c78e" stroke-width="3" opacity=".6"/>
          </g>
        </g>`;
    } else if (type === 'kopi') {
      content = `
        <g>
          <ellipse cx="400" cy="470" rx="220" ry="58" fill="#8f6c3c" opacity=".22"/>
          <ellipse cx="400" cy="440" rx="210" ry="46" fill="#f3e8cd" stroke="#b99d6b" stroke-width="3"/>
          <path d="M260 310h250v100q0 50-50 50H310q-50 0-50-50Z" fill="#f7eedb" stroke="#8c6b3c" stroke-width="4"/>
          <path d="M510 340q72 4 72 52t-72 52" fill="none" stroke="#8c6b3c" stroke-width="14"/>
          <path d="M280 336h210v70q0 30-30 30H310q-30 0-30-30Z" fill="#5b3726"/>
          <path d="M290 346h190v20H290Z" fill="#8a5a2c" opacity=".7"/>
          <path d="M295 370h180v28H295Z" fill="#d9b477" opacity=".2"/>
          <path d="M300 426h170" stroke="#8c6b3c" stroke-width="4" opacity=".6"/>
          <g fill="#5b3726" stroke="#2f1a10" stroke-width="2">
            <ellipse cx="220" cy="470" rx="26" ry="15" transform="rotate(-24 220 470)"/>
            <ellipse cx="270" cy="500" rx="22" ry="13" transform="rotate(18 270 500)"/>
            <ellipse cx="560" cy="490" rx="24" ry="14" transform="rotate(32 560 490)"/>
            <path d="M196 456q24 14 48 0" fill="none" stroke="#a9784b" stroke-width="2"/>
            <path d="M248 490q22 12 44 0" fill="none" stroke="#a9784b" stroke-width="2"/>
          </g>
          <g fill="none" stroke="#6e5c4b" stroke-width="3.5" stroke-linecap="round" opacity=".55">
            <path d="M330 280q-20-28 4-52"/>
            <path d="M380 268q-20-28 4-52"/>
            <path d="M430 282q-20-28 4-52"/>
          </g>
        </g>`;
    } else if (type === 'sambal') {
      content = `
        <g>
          <ellipse cx="400" cy="460" rx="215" ry="64" fill="#8f6c3c" opacity=".25"/>
          <path d="M220 340q0 120 180 120t180-120q-40-42-180-42t-180 42Z" fill="#7c7b73" stroke="#4e4e49" stroke-width="4"/>
          <ellipse cx="400" cy="340" rx="180" ry="56" fill="#98968a" stroke="#4e4e49" stroke-width="4"/>
          <ellipse cx="400" cy="344" rx="150" ry="42" fill="#b53a36"/>
          <path d="M280 344q40-22 80 0t80 0 60 0" fill="none" stroke="#d15c4b" stroke-width="6" opacity=".7"/>
          <g fill="#b53a36" stroke="#7a2422" stroke-width="2">
            <ellipse cx="320" cy="330" rx="36" ry="12" transform="rotate(-20 320 330)"/>
            <ellipse cx="440" cy="352" rx="40" ry="13" transform="rotate(14 440 352)"/>
            <ellipse cx="380" cy="318" rx="32" ry="10" transform="rotate(48 380 318)"/>
          </g>
          <g fill="#5b8b4b" stroke="#376830" stroke-width="2">
            <path d="M460 300q20-28 44-6 10 20-16 32-28 12-28-26Z"/>
            <path d="M280 300q-14-24-38-10-14 16 6 30 24 14 32-20Z"/>
          </g>
          <g transform="translate(580 230) rotate(20)">
            <circle cx="0" cy="0" r="44" fill="#b9cd75" stroke="#7b964b" stroke-width="3"/>
            <path d="M0-44v88M-44 0h88" stroke="#e8efc4" stroke-width="3" opacity=".6"/>
          </g>
          <g fill="#d9a94f">
            <circle cx="300" cy="390" r="4"/><circle cx="480" cy="400" r="3"/><circle cx="420" cy="390" r="3.5"/>
          </g>
        </g>`;
    }
    return `
    <svg class="dish-svg" viewBox="0 0 800 600" role="presentation" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${p}bg" cx="50%" cy="44%" r="62%">
          <stop offset="0" stop-color="${c.bg}"/><stop offset="1" stop-color="${c.circle}"/>
        </radialGradient>
        <pattern id="${p}weave" width="42" height="42" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="42" height="42" fill="${c.accent}"/>
          <path d="M0 21H42M21 0V42" stroke="#e5b45d" stroke-width="1.2" opacity=".7"/>
          <path d="M21 7 35 21 21 35 7 21Z" fill="none" stroke="#e5b45d" stroke-width="1" opacity=".7"/>
        </pattern>
      </defs>
      <circle cx="400" cy="300" r="290" fill="url(#${p}bg)"/>
      <circle cx="400" cy="300" r="236" fill="none" stroke="#fff8ea" stroke-width="1" opacity=".22"/>
      <g opacity=".8">
        <path d="M80 540q120-70 320-70t320 70v60H80Z" fill="url(#${p}weave)" opacity=".24"/>
      </g>
      ${steam}
      ${content}
      <g fill="#fff8ea" opacity=".35">
        <circle cx="150" cy="180" r="3"/><circle cx="670" cy="160" r="2.5"/><circle cx="700" cy="320" r="2"/><circle cx="110" cy="350" r="2"/>
        <path d="M650 120l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/>
      </g>
    </svg>`;
  }

  window.RJ_ART = { logo: LOGO, mascot, heroScene, ornament, motifPanel, motifPaths, dish };
})();
