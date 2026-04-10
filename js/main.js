/* ============================================================
   CLASSROOM SUPPORT — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Navigation ── */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('#nav-burger');
  const mobileNav = document.querySelector('#nav-mobile');

  // Scroll class on nav
  function updateNav() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Mobile menu toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      mobileNav.hidden = isOpen;
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll Reveal ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Stats Counter Animation ── */
  function animateCounter(el, target, suffix) {
    const duration = 1800;
    const startTime = performance.now();
    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.stat__num');
        if (numEl && numEl.dataset.count) {
          animateCounter(numEl, parseInt(numEl.dataset.count, 10), numEl.dataset.suffix || '');
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat').forEach(el => statsObserver.observe(el));

  /* ── Contact Form ── */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const success = contactForm.querySelector('.form-success');
      if (btn) {
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }
      // Simulate async submission
      setTimeout(() => {
        if (btn) {
          btn.textContent = 'Send Message';
          btn.disabled = false;
        }
        if (success) success.classList.add('show');
        contactForm.reset();
        setTimeout(() => { if (success) success.classList.remove('show'); }, 5000);
      }, 1200);
    });
  }

})();
