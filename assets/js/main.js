/**
 * ВИТК — Основной скрипт
 */

if (typeof getRootPath === 'undefined') {
  window.getRootPath = function () {
    const base = '/college-site/';
    return base;
  };
}

/* ── Загрузка инклюдов ── */
async function loadInclude(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return;
  try {
    const resp = await fetch(url);
    if (!resp.ok) return;
    el.innerHTML = await resp.text();
    const root = getRootPath();
    el.querySelectorAll('[src]').forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:'))
        img.setAttribute('src', root + src);
    });
    el.querySelectorAll('[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') &&
          !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#'))
        a.setAttribute('href', root + href);
    });
  } catch (e) { console.warn('Include error:', url, e); }
}

async function loadIncludes() {
  const root = getRootPath();
  await Promise.all([
    loadInclude('#site-header', root + 'includes/header.html'),
    loadInclude('#site-nav',    root + 'includes/nav.html'),
    loadInclude('#site-footer', root + 'includes/footer.html'),
  ]);

  if (window.applyTranslations) applyTranslations();
  if (window.updateLangButtons) updateLangButtons();

  initBurger();
  initDropdowns();
  setActiveNavLink();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (window.setLang) setLang(btn.dataset.lang); });
  });
}

/* ── Бургер ── */
function initBurger() {
  const burger  = document.querySelector('.burger');
  const navList = document.querySelector('.nav-list');
  if (!burger || !navList) return;
  burger.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  // Закрыть при клике вне меню
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Dropdown подменю ── */
function initDropdowns() {
  const items = document.querySelectorAll('.nav-item.has-dropdown');
  items.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (!link) return;

    // Десктоп: hover управляется CSS; мобильный — клик по стрелке/ссылке
    link.addEventListener('click', e => {
      if (window.innerWidth <= 700) {
        // На мобильном — открыть аккордеон, не переходить по ссылке
        e.preventDefault();
        const wasOpen = item.classList.contains('open');
        // Закрыть все
        items.forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      }
    });
  });

  // Закрыть dropdown при клике вне
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      items.forEach(i => i.classList.remove('open'));
    }
  });
}

/* ── Активная ссылка в меню ── */
function setActiveNavLink() {
  const path = decodeURIComponent(location.pathname);
  document.querySelectorAll('.nav-link, .dropdown-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const cleanHref = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    const isHome = (path.endsWith('/') || path.endsWith('index.html')) &&
                   (cleanHref === 'index.html' || cleanHref === '');
    const segment = cleanHref.replace('index.html', '').replace('pages/', '').split('/')[0];
    const isMatch = !isHome && segment && path.includes(segment);
    link.classList.toggle('active', isHome || isMatch);
  });
}

/* ── Карусель ── */
function initCarousel() {
  const track  = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  if (!track || !slides.length) return;

  let current = 0, timer;

  function goTo(idx) {
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);
  const startAuto = () => { timer = setInterval(next, 5000); };
  const stopAuto  = () => clearInterval(timer);

  document.querySelector('.carousel-btn-next')
    ?.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  document.querySelector('.carousel-btn-prev')
    ?.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });
  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); diff > 0 ? next() : prev(); startAuto(); }
  }, { passive: true });

  goTo(0); startAuto();
}

/* ── Форма (GitHub Pages — заглушка) ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    if (success) {
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }
  });
}

/* ── Markdown-контент ── */
async function loadMarkdownContent(lang) {
  const root = getRootPath();
  for (const container of document.querySelectorAll('[data-md-src]')) {
    const url = root + container.getAttribute('data-md-src').replace('{lang}', lang);
    try {
      const resp = await fetch(url);
      if (!resp.ok) { container.innerHTML = ''; continue; }
      const text = await resp.text();
      container.innerHTML = window.marked ? marked.parse(text) : text.replace(/\n/g, '<br>');
    } catch { container.innerHTML = ''; }
  }
}
window.loadMarkdownContent = loadMarkdownContent;

/* ── Инициализация ── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadIncludes();
  initCarousel();
  initContactForm();
  const lang = localStorage.getItem('vitk_lang') || 'kk';
  await loadMarkdownContent(lang);
});
