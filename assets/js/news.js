/**
 * ВИТК — Система новостей
 *
 * Список: pages/news/index.html  → загружает content/news/index.json
 * Пост:  pages/news/post.html?id=SLUG  → загружает content/news/SLUG.{lang}.md
 *
 * КАК ДОБАВИТЬ НОВОСТЬ:
 * 1. Добавьте запись в content/news/index.json
 * 2. Создайте content/news/ВАШ-SLUG.kk.md  (казахский текст)
 * 3. Создайте content/news/ВАШ-SLUG.ru.md  (русский текст)
 */

(function () {
  'use strict';

  const ROOT = typeof getRootPath === 'function' ? getRootPath() : '../../';
  const NEWS_INDEX = ROOT + 'content/news/index.json';

  /* ── Утилиты ── */
  function getLang() {
    return localStorage.getItem('vitk_lang') || 'kk';
  }

  function formatDate(isoStr) {
    const lang = getLang();
    const d = new Date(isoStr);
    return d.toLocaleDateString(lang === 'kk' ? 'kk-KZ' : 'ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function getPostEmoji(tag) {
    const map = {
      'Мероприятие': '🎓', 'Іс-шара': '🎓',
      'Учёба': '📚',       'Оқу': '📚',
      'Инфраструктура': '🏗️', 'Инфрақұрылым': '🏗️',
      'Достижения': '🏆',  'Жетістіктер': '🏆',
    };
    return map[tag] || '📰';
  }

  /* ── Карточка поста ── */
  function renderCard(post, lang) {
    const title   = post.title[lang]   || post.title.ru;
    const excerpt = post.excerpt[lang] || post.excerpt.ru;
    const tag     = post.tag[lang]     || post.tag.ru;
    const readMore = lang === 'kk' ? 'Толығырақ оқу' : 'Читать далее';

    return `
      <article class="post-card" data-tag="${tag}">
        ${post.image
          ? `<img class="post-card-img" src="${ROOT}${post.image}" alt="${title}" loading="lazy">`
          : `<div class="post-card-img-placeholder">${getPostEmoji(tag)}</div>`
        }
        <div class="post-card-body">
          <div class="post-card-meta">
            <span class="post-date">📅 ${formatDate(post.date)}</span>
            <span class="post-tag">${tag}</span>
          </div>
          <h2 class="post-card-title">${title}</h2>
          <p class="post-card-excerpt">${excerpt}</p>
          <div class="post-card-footer">
            <a href="post.html?id=${post.id}" class="post-read-more">${readMore}</a>
          </div>
        </div>
      </article>
    `;
  }

  /* ── Список новостей ── */
  async function renderNewsList() {
  const grid   = document.getElementById('news-grid');
  const filter = document.getElementById('news-filter');
  if (!grid) return;

  const POSTS_PER_PAGE = 6; // количество карточек на странице
  let currentPage = 1;
  let filteredPosts = [];

  let posts;
  try {
    const resp = await fetch(NEWS_INDEX);
    if (!resp.ok) throw new Error('not found');
    posts = await resp.json();
  } catch {
    grid.innerHTML = `<div class="posts-empty"><div class="empty-icon">📰</div><p>${
      getLang() === 'kk' ? 'Жаңалықтар жоқ' : 'Новостей пока нет'
    }</p></div>`;
    return;
  }

  // Сортировка по дате (новые сначала)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const lang = getLang();

  // Теги
  const allLabel = lang === 'kk' ? 'Барлығы' : 'Все';
  if (filter) {
    const tags = [...new Set(posts.map(p => p.tag[lang] || p.tag.ru))];
    filter.innerHTML = `<button class="filter-btn active" data-tag="all">${allLabel}</button>`
      + tags.map(tag => `<button class="filter-btn" data-tag="${tag}">${tag}</button>`).join('');

    filter.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPage = 1;
        filteredPosts = btn.dataset.tag === 'all'
          ? posts
          : posts.filter(p => (p.tag[lang] || p.tag.ru) === btn.dataset.tag);
        renderPage();
      });
    });
  }

  filteredPosts = posts;

  function renderPage() {
    const total = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const slice = filteredPosts.slice(start, start + POSTS_PER_PAGE);

    // Карточки
    grid.innerHTML = slice.length
      ? slice.map(p => renderCard(p, lang)).join('')
      : `<div class="posts-empty"><div class="empty-icon">📰</div><p>${
          lang === 'kk' ? 'Жаңалықтар жоқ' : 'Новостей пока нет'
        }</p></div>`;

    // Пагинация
    let pagination = document.getElementById('news-pagination');
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.id = 'news-pagination';
      pagination.className = 'pagination';
      grid.parentNode.insertBefore(pagination, grid.nextSibling);
    }

    if (total <= 1) {
      pagination.innerHTML = '';
      return;
    }

    let html = '';

    // Кнопка "назад"
    html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">‹</button>`;

    // Номера страниц
    for (let i = 1; i <= total; i++) {
      if (
        i === 1 || i === total ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span class="page-dots">…</span>`;
      }
    }

    // Кнопка "вперёд"
    html += `<button class="page-btn" ${currentPage === total ? 'disabled' : ''} data-page="${currentPage + 1}">›</button>`;

    pagination.innerHTML = html;

    pagination.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        renderPage();
        // Прокрутка наверх к сетке
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  renderPage();
}

  /* ── Одиночный пост ── */
  async function renderPost() {
    const params  = new URLSearchParams(location.search);
    const id      = params.get('id');
    const content = document.getElementById('post-content');
    const meta    = document.getElementById('post-meta');
    const imgBox  = document.getElementById('post-img-container');
    const lang    = getLang();

    if (!content || !id) return;

    // Загрузить мета из index.json
    let postMeta = null;
    try {
      const resp = await fetch(NEWS_INDEX);
      if (resp.ok) {
        const all = await resp.json();
        postMeta = all.find(p => p.id === id);
      }
    } catch {}

    if (postMeta) {
      // Обновить заголовок страницы
      document.title = (postMeta.title[lang] || postMeta.title.ru) + ' — НОУ ВИТК';

      // Мета-блок
      const tag     = postMeta.tag[lang] || postMeta.tag.ru;
      const pubLabel = lang === 'kk' ? 'Жарияланды:' : 'Опубликовано:';
      meta.innerHTML = `
        <span class="post-tag" style="font-size:.8rem">${tag}</span>
        <span class="post-date">📅 ${pubLabel} ${formatDate(postMeta.date)}</span>
      `;

      // Картинка
      if (postMeta.image && imgBox) {
        imgBox.innerHTML = `<img class="post-page-img" src="${ROOT}${postMeta.image}" alt="${postMeta.title[lang] || postMeta.title.ru}">`;
      }
    }

    // Загрузить Markdown
    const mdUrl = `${ROOT}content/news/${id}.${lang}.md`;
    try {
      const resp = await fetch(mdUrl);
      if (!resp.ok) throw new Error();
      const text = await resp.text();
      content.innerHTML = window.marked ? marked.parse(text) : text.replace(/\n/g, '<br>');
    } catch {
      content.innerHTML = `<p style="color:#999">${lang === 'kk' ? 'Мазмұн табылмады' : 'Контент не найден'}</p>`;
    }
  }

  /* ── Инициализация ── */
  function init() {
    const path = location.pathname;
    if (path.includes('post.html')) {
      renderPost();
      // Перерендер при смене языка
      document.addEventListener('click', e => {
        if (e.target.closest('.lang-btn')) setTimeout(renderPost, 100);
      });
    } else if (path.includes('news')) {
      renderNewsList();
      document.addEventListener('click', e => {
        if (e.target.closest('.lang-btn')) setTimeout(renderNewsList, 100);
      });
    }
  }

  // Ждём загрузки инклюдов
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOMContentLoaded уже сработал, запускаем через небольшую задержку
    setTimeout(init, 200);
  }
})();
