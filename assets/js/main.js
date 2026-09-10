document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const header = document.querySelector('.site-header');
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const revealTargets = document.querySelectorAll('.hero, .approach, .gallery, .contact, .site-footer');

  document.querySelector('.hero')?.classList.add('is-visible');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => activeObserver.observe(section));
  }

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