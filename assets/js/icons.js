/* =========================================================
   RUWA JURAI — Icon set
   Hand-drawn monoline icons on a 24×24 grid.
   ========================================================= */
(function () {
  'use strict';

  const P = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.55-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z"/>',
    volume: '<path d="M11 5 6 9H2v6h4l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
    'volume-off': '<path d="M11 5 6 9H2v6h4l5 4Z"/><path d="m16 9 5 6M21 9l-5 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    right: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    left: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    up: '<path d="M12 20V4M6 10l6-6 6 6"/>',
    down: '<path d="M12 4v16M6 14l6 6 6-6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-right': '<path d="m9 6 6 6-6 6"/>',
    'chevron-left': '<path d="m15 6-6 6 6 6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    map: '<path d="m9 4 6 2 6-2v16l-6 2-6-2-6 2V6Z"/><path d="M9 4v16M15 6v16"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22Z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 6h8M8 10h6"/>',
    bowl: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M8 7c0-2 3-2 3-4M14 7c0-2 3-2 3-4M2 21h20"/>',
    gamepad: '<path d="M7 8h10a5 5 0 0 1 4.9 4l.6 3.2a3.3 3.3 0 0 1-5.7 2.8L15 16H9l-1.8 2a3.3 3.3 0 0 1-5.7-2.8l.6-3.2A5 5 0 0 1 7 8Z"/><path d="M7.5 11v4M5.5 13h4M15.5 12h.01M18 14h.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
    spark: '<path d="M12 2.5 14.4 9l6.6 3-6.6 3-2.4 6.5L9.6 15 3 12l6.6-3Z"/>',
    sparkles: '<path d="M12 3 13.7 8.3 19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z"/><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7ZM5 3l.5 1.5L7 5l-1.5.5L5 7l-.5-1.5L3 5l1.5-.5Z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.4 5.6L8 16l2.4-5.6Z"/>',
    people: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0M16 8.5a3 3 0 1 1 2 5.3M18 14.5a5 5 0 0 1 3 4.5"/>',
    mask: '<path d="M4 5c5-2 11-2 16 0 1 5-.5 9-4 12-2.5 2.2-5.5 2.2-8 0C4.5 14 3 10 4 5Z"/><path d="M8.5 9.5c1-1 2-1 3 0M12.5 9.5c1-1 2-1 3 0M9 15c2 1.5 4 1.5 6 0"/>',
    rings: '<circle cx="9" cy="13" r="5"/><circle cx="15" cy="13" r="5"/><path d="m12 3 2 3h-4Z"/>',
    loom: '<path d="M5 3v18M19 3v18M3 6h18M3 18h18"/><path d="M7 9h10v6H7Z"/><path d="M10 9v6M14 9v6"/>',
    crown: '<path d="m3 8 4 4 5-7 5 7 4-4-2 11H5Z"/><path d="M5 19h14M8 15h8"/>',
    drum: '<ellipse cx="12" cy="7" rx="8" ry="3.5"/><path d="M4 7v9c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V7"/><path d="M4 12c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5"/>',
    speech: '<path d="M21 12a8.5 8.5 0 0 1-9 8.5 10 10 0 0 1-3.5-.6L3 21l1.6-4.5A8.5 8.5 0 1 1 21 12Z"/><path d="M8 10h8M8 14h5"/>',
    house: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
    hands: '<path d="M7 11V5.5a1.5 1.5 0 0 1 3 0V10m0-.5V4a1.5 1.5 0 0 1 3 0v6m0-1V5a1.5 1.5 0 0 1 3 0v7l1.2-1.6a1.6 1.6 0 0 1 2.6 1.8L17 18a6 6 0 0 1-5 3h-1a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 2-1.5"/>',
    landmark: '<path d="M3 21h18M4 18h16M5 10h14M12 3 3 8h18ZM7 10v8M12 10v8M17 10v8"/>',
    leaf: '<path d="M20 4C10 4 4 9 4 16a5 5 0 0 0 5 5c7 0 11-7 11-17Z"/><path d="M4 21c2-6 6-10 12-13"/>',
    coffee: '<path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M16 9h2a3 3 0 0 1 0 6h-2M7 2v2M11 2v2M15 2v2"/>',
    pepper: '<circle cx="10" cy="13" r="6"/><path d="M15 9c2-2 4-2 5 0s-1 4-3 4M8 13h.01M12 13h.01M10 16h.01M13 16h.01"/>',
    cocoa: '<path d="M12 21c-5 0-8-4-8-9 0-6 5-9 10-9 4 0 6 3 6 7 0 6-3 11-8 11Z"/><path d="M9 4c-1 5 1 10 4 13M15 4c1 4 0 8-2 11"/>',
    banana: '<path d="M4 5c0 8 5 14 13 14 2 0 3-1 3-2s-1-2-3-2c-6 0-9-4-9-10"/><path d="M4 5c-1-2 0-3 2-3M8 19l-1 2"/>',
    cassava: '<path d="M7 21c-3-3 1-9 5-13s7-5 8-4-1 5-5 9-5 8-8 8Z"/><path d="M9 15c2 0 4 1 5 3M12 10c1-2 3-4 5-4"/>',
    durian: '<path d="M12 3c5 0 8 4 8 9s-3 9-8 9-8-4-8-9 3-9 8-9Z"/><path d="M9 3 7 1M15 3l2-2M12 3V1"/><g fill="currentColor" stroke="none"><circle cx="9" cy="9" r=".9"/><circle cx="15" cy="9" r=".9"/><circle cx="12" cy="13" r=".9"/><circle cx="8" cy="15" r=".9"/><circle cx="16" cy="15" r=".9"/></g>',
    shrimp: '<path d="M5 16c0-7 5-12 12-12 2 0 3 2 1 3-2 1-5 0-7 2-2 2-2 4-1 6 1 2 3 2 5 1"/><path d="M5 16c2 3 6 5 10 3M3 20l2-2M20 7l2-2"/>',
    tempoyak: '<path d="M7 3h10v3l2 3v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9l2-3Z"/><path d="M6 9h12M9 14h6M9 17h4"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    trophy: '<path d="M8 3h8v6a4 4 0 0 1-8 0Z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.6l6.2-.9Z"/>',
    heart: '<path d="M20 5.5a5 5 0 0 0-7.1 0L12 6.4l-.9-.9A5 5 0 0 0 4 12.6l8 8 8-8a5 5 0 0 0 0-7.1Z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    rotate: '<path d="M3 4v6h6M3.5 14a8.5 8.5 0 1 0 2-9"/>',
    shuffle: '<path d="M3 6h4l10 12h4M3 18h4L17 6h4M18 3l3 3-3 3M18 15l3 3-3 3"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
    'zoom-in': '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11h6M11 8v6"/>',
    'zoom-out': '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11h6"/>',
    external: '<path d="M14 4h6v6M20 4 10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    quote: '<path d="M4 11h6v8H4Zm0 4c0-5 2-8 6-9M14 11h6v8h-6Zm0 4c0-5 2-8 6-9"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3.2 4.5"/>',
    chef: '<path d="M7 13a4 4 0 1 1 .7-7.9 4.5 4.5 0 0 1 8.6 0A4 4 0 1 1 17 13Z"/><path d="M7 13v7h10v-7M9 17h6"/>',
    carrot: '<path d="m14 4 6 6-9 9-6-6Z"/><path d="m5 13-2 7 7-2M16 2c2 0 4 2 4 4M12 6l-2-2"/>',
    'calendar-plus': '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M12 13v6M9 16h6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>',
    send: '<path d="M21 3 3 10l7 3 3 7Z"/><path d="m10 13 5-5"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 0-4H12a2 2 0 0 1 0-4h5a4 4 0 0 0 4-4c0-3.5-4-6-9-6Z"/><g fill="currentColor" stroke="none"><circle cx="7.5" cy="10" r="1"/><circle cx="9.5" cy="6.5" r="1"/><circle cx="14" cy="6" r="1"/><circle cx="17" cy="9" r="1"/></g>',
    type: '<path d="M4 6V4h16v2M12 4v16M8 20h8"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    accessibility: '<circle cx="12" cy="4.5" r="2"/><path d="M4 8.5c2.7 1 5.3 1.5 8 1.5s5.3-.5 8-1.5M12 10v5M12 15l-3.5 6M12 15l3.5 6"/>',
    mouse: '<path d="M5 9a7 7 0 0 1 14 0v2H5ZM5 11v4a7 7 0 0 0 14 0v-4"/><path d="M12 5v4"/>',
    alert: '<path d="M12 3 2 21h20Z"/><path d="M12 9v5M12 17.5h.01"/>',
    lightbulb: '<path d="M9 18h6M10 22h4M8 14a6 6 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h8M8 9h2"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
    tiktok: '<path d="M14 4v10a4 4 0 1 1-4-4M14 4c.5 3 2.5 5 6 5"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-4a4 4 0 0 0-1-3.2c3-.4 6-1.6 6-7.2A5.5 5.5 0 0 0 18.5 2 5 5 0 0 0 18 5s-1.5-1-5 1a13 13 0 0 0-5-1S6 3 5.5 4.6A6 6 0 0 0 4 8.6c0 5.6 3 6.8 6 7.2a4 4 0 0 0-1 3.2v4"/>',
    searchPlus: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5M8 11h6M11 8v6"/>',
    wave: '<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3-3 5-2M2 17c2.5-4 5-4 7.5 0s5 4 7.5 0 3-3 5-2M2 7c2.5-4 5-4 7.5 0s5 4 7.5 0 3-3 5-2"/>',
    mountain: '<path d="m3 20 7-13 4 7 3-4 4 10Z"/><path d="m8 11 2 2 2-2"/>',
    throne: '<path d="M5 21V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v15M3 9h2M19 9h2M5 13h14M9 4V2M15 4V2M9 21v-4h6v4"/>',
    dance: '<circle cx="12" cy="4.5" r="2.5"/><path d="M12 7v6M12 13l-4 8M12 13l4 8M12 9l-5 2M12 9l5-2"/>',
    gong: '<circle cx="14" cy="14" r="7"/><circle cx="14" cy="14" r="3"/><path d="M3 6h6M3 10h6M3 14h4M3 18h4M4 21h16"/>',
    glyph: '<path d="M5 18 13 5c1-1.5 3-1 3 .8 0 1-1 2.5-2 4l-5 7M8 12l6 6M4 21h16"/>',
    utensils: '<path d="M7 2v8a2 2 0 0 0 4 0V2M9 10v12M17 2c-2 2-3 5-3 8h3v12"/>',
    flame: '<path d="M12 22c5 0 8-3.5 8-8 0-4-2-6-4-9 0 2-1 4-2 5-1-3-2-6-6-8 1 3 0 4-1 6-1 2-3 4-3 7 0 4 3 7 8 7Z"/>',
  };

  const slug = (name) => String(name || '').replace(/[^a-z0-9-]/gi, '');

  function icon(name, opts = {}) {
    const key = slug(name);
    const d = P[key] || P.spark;
    const cls = ['icon', opts.className || ''].filter(Boolean).join(' ');
    const size = opts.size ? ` style="width:${opts.size};height:${opts.size}"` : '';
    const label = opts.label
      ? `role="img" aria-label="${String(opts.label).replace(/"/g, '&quot;')}"`
      : 'aria-hidden="true" focusable="false"';
    return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${opts.stroke || 1.7}" stroke-linecap="round" stroke-linejoin="round" ${label}${size}>${d}</svg>`;
  }

  function hydrateIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach((el) => {
      if (el.dataset.iconDone === el.dataset.icon) return;
      el.innerHTML = icon(el.dataset.icon, { label: el.dataset.iconLabel || '' });
      el.dataset.iconDone = el.dataset.icon;
    });
  }

  window.RJ_ICONS = P;
  window.RJ = window.RJ || {};
  window.RJ.icon = icon;
  window.RJ.hydrateIcons = hydrateIcons;
})();
