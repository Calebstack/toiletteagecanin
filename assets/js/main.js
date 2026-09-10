document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  document.querySelectorAll('.marquee-track').forEach((track) => {
    const originalItems = [...track.children];
    const minimumWidth = window.innerWidth * 1.25;
    while (track.scrollWidth < minimumWidth) {
      originalItems.forEach((item) => track.appendChild(item.cloneNode(true)));
    }
    [...track.children].forEach((item) => track.appendChild(item.cloneNode(true)));
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      nav.style.cssText = !open
        ? 'display:flex;position:absolute;top:74px;left:0;right:0;margin:0;padding:22px 24px;background:var(--paper);border-bottom:1px solid var(--line);flex-direction:column;gap:20px;box-shadow:0 12px 25px rgba(16,45,90,.08)'
        : '';
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      nav.style.cssText = '';
    }));
  }
});