/* Unified site polish: subtle 3D cards, premium CTA motion, and page depth layer */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  function addDepthLayer() {
    if (document.querySelector('.site-depth-layer')) return;
    const layer = document.createElement('div');
    layer.className = 'site-depth-layer';
    layer.setAttribute('aria-hidden', 'true');
    document.body.prepend(layer);
  }

  function initInView() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .founder-profile, .team-person, .bracket-card, .card, .usecase-card, .cert-card, .contact-card');
    if (!targets.length) return;
    if (!('IntersectionObserver' in window) || prefersReduced) {
      targets.forEach(el => el.classList.add('visible', 'is-inview'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible', 'is-inview');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  }

  function initTilt() {
    if (!canHover || prefersReduced) return;
    const selectors = [
      '[data-tilt]', '.founder-profile', '.team-person', '.bracket-card', '.card',
      '.usecase-card', '.cert-card', '.value-item', '.calc-result', '.contact-card'
    ].join(',');
    document.querySelectorAll(selectors).forEach(card => {
      if (card.dataset.polishedTilt === 'true') return;
      card.dataset.polishedTilt = 'true';
      card.classList.add('polish-tilt');
      let raf = 0;
      let next = null;
      const apply = () => {
        raf = 0;
        if (!next) return;
        const { x, y } = next;
        card.style.setProperty('--tilt-y', ((x - 0.5) * 8).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-x', ((0.5 - y) * 6).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      };
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        next = {
          x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
          y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
        };
        if (!raf) raf = requestAnimationFrame(apply);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        next = null;
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '30%');
      });
    });
  }

  function initButtons() {
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-black, .btn-outline-y, .nav-cta, button[type="submit"], .contact-btn').forEach(btn => {
      btn.classList.add('sns-action');
      if (!btn.querySelector('.action-arrow')) {
        const arrow = document.createElement('span');
        arrow.className = 'action-arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        btn.appendChild(arrow);
      }
      if (!canHover || prefersReduced) return;
      btn.addEventListener('pointermove', event => {
        const rect = btn.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        btn.style.setProperty('--btn-mx', (x * 100).toFixed(1) + '%');
        btn.style.setProperty('--btn-my', (y * 100).toFixed(1) + '%');
      }, { passive: true });
    });
  }

  function initPageParallax() {
    if (prefersReduced) return;
    const root = document.documentElement;
    const update = () => {
      const depth = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 1.4));
      root.style.setProperty('--page-depth', depth.toFixed(3));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  ready(() => {
    addDepthLayer();
    initInView();
    initTilt();
    initButtons();
    initPageParallax();
  });
})();
