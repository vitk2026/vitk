(function () {
  const ROOT = typeof getRootPath === 'function' ? getRootPath() : '../../';

  let photos = [];
  let current = 0;

  async function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    const src = grid.getAttribute('data-src');
    if (!src) return;

    try {
      const resp = await fetch(ROOT + src);
      if (!resp.ok) return;
      photos = await resp.json();
    } catch { return; }

    grid.className = 'gallery-grid';
    grid.innerHTML = photos.map((item, i) => {
      // Поддержка как строки так и объекта {src, caption}
      const imgSrc = typeof item === 'string' ? item : item.src;
      const caption = typeof item === 'object' && item.caption ? item.caption : '';
      return `
        <div class="gallery-item" onclick="openLightbox(${i})">
          <img src="${ROOT}${imgSrc}" alt="${caption || 'Фото ' + (i + 1)}" loading="lazy">
          ${caption ? `<div class="gallery-caption">${caption}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  window.openLightbox = function (idx) {
    current = idx;
    updateLightbox();
    document.getElementById('gallery-lightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    document.getElementById('gallery-lightbox').style.display = 'none';
    document.body.style.overflow = '';
  };

  window.lightboxNav = function (dir) {
    current = (current + dir + photos.length) % photos.length;
    updateLightbox();
  };

  function updateLightbox() {
    const item = photos[current];
    const imgSrc = typeof item === 'string' ? item : item.src;
    const caption = typeof item === 'object' && item.caption ? item.caption : '';
    document.getElementById('lightbox-img').src = ROOT + imgSrc;
    const cap = document.getElementById('lightbox-caption');
    if (cap) cap.textContent = caption;
  }

  document.getElementById('gallery-lightbox')
    ?.addEventListener('click', function (e) {
      if (e.target === this) closeLightbox();
    });

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('gallery-lightbox');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'ArrowRight') lightboxNav(1);
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'Escape')     closeLightbox();
  });

  document.addEventListener('DOMContentLoaded', loadGallery);
})();