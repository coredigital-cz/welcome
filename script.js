/* ============================================================
   CORE DIGITAL CZ — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Scroll fade-in observer ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback — just show everything
    fadeEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.style.background = 'rgba(9,13,24,.97)';
      } else {
        header.style.background = 'rgba(9,13,24,.82)';
      }
    }, { passive: true });
  }

  /* ---------- Staggered feature cards ---------- */
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ---------- Staggered process steps ---------- */
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.1}s`;
  });

  /* ---------- Animate metric numbers on scroll ---------- */
  const metrics = document.querySelectorAll('.metric-number[data-target]');

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const isFloat = el.getAttribute('data-float') === 'true';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = target * ease;
      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && metrics.length > 0) {
    const numObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            numObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    metrics.forEach((m) => numObs.observe(m));
  }

})();
