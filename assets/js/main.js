document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const translations = {
    'Marche-en-Famenne · Belgique': 'Marche-en-Famenne · Belgium',
    'Toilettage comportemental': 'Behavioral grooming',
    'Prendre rendez-vous': 'Book an appointment',
    'Notre approche': 'Our approach',
    'Galerie': 'Gallery',
    'Contact': 'Contact',
    'Le toilettage': 'Grooming',
    'qui fait du bien.': 'that feels good.',
    'Un moment de douceur, de confiance et de soin pour votre compagnon à quatre pattes.': 'A gentle moment of trust and care for your four-legged companion.',
    'Réserver un moment': 'Book a visit',
    'Chaque animal est unique.': 'Every animal is unique.',
    'Notre méthode aussi.': 'So is our approach.',
    'Des soins': 'Care',
    'avec': 'with',
    'du cœur': 'heart',
    '01 / Notre approche': '01 / Our approach',
    'Une belle coupe,': 'A beautiful trim,',
    'un animal serein.': 'a relaxed companion.',
    "Ici, on prend le temps. Chaque séance s'adapte au tempérament, aux besoins et au rythme de votre chien ou de votre chat. Le résultat est soigné, mais le bien-être passe toujours en premier.": "Here, we take our time. Every session adapts to your dog's or cat's personality, needs and pace. The result is beautiful, but their wellbeing always comes first.",
    "À l'écoute": 'Attentive',
    'Du caractère de chacun': 'Every personality',
    'En douceur': 'Gentle',
    'Sans précipitation': 'No rushing',
    'Avec soin': 'Careful',
    'Un travail précis': 'Precise work',
    'Le calme avant': 'Calm before',
    'la beauté.': 'beauty.',
    '02 / Quelques museaux': '02 / A few happy faces',
    'Ils sont repartis': 'They left',
    'tout beaux.': 'looking beautiful.',
    'Des bouilles, des personnalités et beaucoup de douceur. Faites défiler nos derniers petits clients.': 'Sweet faces, unique personalities and lots of kindness. Browse through our latest little clients.',
    '03 / Parlons-en': '03 / Let’s talk',
    'Le prochain': 'Will yours be',
    "c'est le vôtre ?": 'the next one?',
    'Une question, une première rencontre ou simplement envie d’échanger ? Écrivez-nous, nous vous répondrons avec plaisir.': 'A question, a first visit or simply want to talk? Write to us and we will be happy to reply.',
    'Bonjour !': 'Hello!',
    "Les champs marqués d'un * sont obligatoires.": 'Fields marked with * are required.',
    'Votre prénom et nom *': 'Your first and last name *',
    'Votre adresse e-mail *': 'Your email address *',
    'Votre message *': 'Your message *',
    'Ex. Camille Dupont': 'E.g. Camille Dupont',
    'vous@exemple.be': 'you@example.com',
    'Parlez-nous de votre compagnon...': 'Tell us about your companion...',
    'Envoyer le message': 'Send message',
    'Nous trouver': 'Find us',
    'Navigation': 'Navigation',
    'La galerie': 'Gallery',
    'Nous contacter': 'Contact us',
    'Contact': 'Contact',
    'Le soin juste, pour': 'The right care, for',
    'des compagnons heureux.': 'happy companions.',
    'Fait avec soin à Marche': 'Made with care in Marche'
  };
  const languageToggle = document.querySelector('.language-toggle');
  const translatableNodes = [];
  const translatablePlaceholders = [...document.querySelectorAll('[placeholder]')]
    .filter((element) => translations[element.getAttribute('placeholder')]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent.trim();
    if (text && translations[text]) translatableNodes.push({ node, french: text });
  }
  languageToggle?.addEventListener('click', () => {
    const english = languageToggle.dataset.language !== 'en';
    translatableNodes.forEach(({ node, french }) => {
      const leading = node.textContent.match(/^\s*/)[0];
      const trailing = node.textContent.match(/\s*$/)[0];
      node.textContent = `${leading}${english ? translations[french] : french}${trailing}`;
    });
    translatablePlaceholders.forEach((element) => {
      const french = element.dataset.frenchPlaceholder || element.getAttribute('placeholder');
      element.dataset.frenchPlaceholder = french;
      element.setAttribute('placeholder', english ? translations[french] : french);
    });
    document.documentElement.lang = english ? 'en' : 'fr';
    languageToggle.dataset.language = english ? 'en' : 'fr';
    languageToggle.querySelector('span').textContent = english ? 'FR' : 'EN';
    languageToggle.setAttribute('aria-label', english ? 'Revenir au français' : 'Traduire en anglais');
    languageToggle.title = english ? 'Français' : 'English';
  });

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