(function () {
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  const lang = browserLang.startsWith('fr') ? 'fr' : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  window.__I18N_LANG = lang;

  window.getCharHTML = function (ch) {
    if (ch === ' ') return '&nbsp;';
    if (ch === '🡲' || ch === '🡺') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></svg>';
    if (ch === '🡼') return '<svg style="width: 1.25em; height: 1.25em; vertical-align: -0.25em;" viewBox="0 0 84 85" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(-135 42 42.5)"><path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z"/></g></svg>';
    if (ch === '🞣') return '<svg style="width: 0.9em; height: 0.9em; vertical-align: -0.1em; transform: translateY(-0.1em);" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"/></svg>';
    return ch;
  };

  if (lang === 'fr') {
    window.__t = function (key) { return null; };
    return;
  }

  const T = {
    'meta.description': 'Daksh Hiran — Creative developer & software engineer specializing in modern web interfaces, motion design, interactive architecture, and full-stack software engineering.',

    'index.title': 'Daksh Hiran, Creative Developer',
    'index.h1': 'Daksh Hiran, Creative Developer & Software Engineer specialized in web development, animation and interactive design.',
    'index.hero.tagline': 'Creative developer, <span class="other-accent">bringing ideas to life</span>,<br>through movement, detail, and finesse.',
    'index.about.text': 'As a <span class="other-accent">creative developer</span>, I craft tailor-made web experiences, blending technical precision and <span class="other-accent">design emotion</span>.',
    'index.about.sub': 'My name is Daksh Hiran. A passionate creator and software engineer, building memorable digital experiences, always seeking the symbiosis between art and information.',
    'index.cg.phrase': 'Each project is a chance to <span class="other-accent">learn</span>, <span class="other-accent">experiment</span>, and push boundaries.',
    'index.skills.subtitle': 'Skills',
    'index.skills.text': 'Software Engineer specialized in full-stack web development, motion, and interactive design.',
    'index.skills.frontend': 'Frontend',
    'index.skills.animation': 'Animation & 3D',
    'index.skills.backend': 'Backend',
    'index.skills.database': 'Databases',
    'index.skills.devops': 'DevOps & Tools',
    'index.skills.security': 'System & Security',
    'index.skills.design': 'Design',
    'index.contact.title': 'Contact',
    'index.contact.dispo1': "Available for <span class=\"other-accent\">ambitious software engineering and creative development opportunities</span>.",
    'index.contact.dispo2': "I'm available for <span class=\"other-accent\">freelance missions worldwide</span>, on <span class=\"other-accent\">your ambitious projects</span> and international collaborations.",
    'index.proj.label': 'Preview',
    'index.detail.back': '🡼BACK',

    'info.title': 'Info, Daksh Hiran',
    'info.eyebrow': 'About',
    'info.role': 'Creative developer & software engineer, specialized in web development.',
    'info.desc': "I craft tailor-made web experiences where technical precision meets emotion. Passionate about animation, interaction and <span class=\"other-accent\">detail</span>, I always seek the symbiosis between art and information.",
    'info.meta.based': 'Based in',
    'info.meta.status': 'Status',
    'info.meta.based.value': 'India',
    'info.meta.status.value': 'Open to opportunities',
    'info.skills.frontend': 'Frontend',
    'info.skills.animation': 'Animation & 3D',
    'info.skills.backend': 'Backend',
    'info.skills.security': 'Security & Tools',

    'contact.title': 'Contact, Daksh Hiran',
    'contact.panel.title': "Let's talk about your project.",
    'contact.panel.copy': "I respond quickly to project requests, freelance missions and collaborations around interactive web experiences.",
    'contact.meta.base': 'Based in',
    'contact.meta.status': 'Status',
    'contact.meta.delay': 'Avg. response',
    'contact.meta.base.value': 'India',
    'contact.meta.status.value': 'Software Engineer / Freelance',
    'contact.meta.delay.value': '24h',
    'contact.eyebrow': 'Contact',
    'contact.role': 'Creative developer, focused on animation, interaction, and tailor-made web experiences.',
    'contact.desc': "If you have a project in mind, an ambitious idea, I'd be glad to discuss it with you and explore a potential collaboration.",
    'contact.shortcuts': 'Shortcuts',
    'contact.brief': 'Brief format',
    'contact.maildirect': 'Direct mail',
    'contact.brief.product': 'Product goal',
    'contact.brief.deadline': 'Target deadline',
    'contact.brief.stack': 'Tech stack',
    'contact.brief.deliverables': 'Expected deliverables',

    'works.title': 'Work, Daksh Hiran',
    'works.h1': 'Projects, Daksh Hiran, Creative Developer. Discover my work in web development, animation and interactive design.',

    'common.aria.back': 'Back to home',
    'common.aria.menu': 'Main navigation',
    'common.aria.social': 'Social links',
    'common.aria.footer': 'Footer navigation',

    '404.title': '404 — Daksh Hiran',
    '404.subtitle': 'This page got lost in the void.<br><span class="subtitle-dim">It doesn\'t exist, or no longer does.</span>',
    '404.ticker': '— PAGE NOT FOUND — SIGNAL LOST — ERROR 0x404 — THIS PAGE DOESN\'T EXIST — COORDINATES: NULL — UNKNOWN DESTINATION — ',
    '404.aria.back': 'Back to home',
  };

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    if (T[key] != null) el.innerHTML = T[key];
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
      const idx = pair.indexOf(':');
      if (idx < 0) return;
      const attr = pair.slice(0, idx).trim();
      const key = pair.slice(idx + 1).trim();
      if (T[key] != null) el.setAttribute(attr, T[key]);
    });
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey && T[titleKey]) document.title = T[titleKey];

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && T['meta.description']) descMeta.setAttribute('content', T['meta.description']);

  window.__t = function (key) { return T[key]; };
})();
