/* /assets/js/main.js */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══ PAGE LOADER ══ */
(function() {
  const loader  = document.getElementById('page-loader');
  const bar     = document.getElementById('loader-bar');
  const pctEl   = document.getElementById('loader-pct');
  if (!loader) return;

  let pct = 0;
  const tick = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if (pct >= 100) { pct = 100; clearInterval(tick); }
    if (bar) bar.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
    if (pct >= 100) {
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
  }, 60);
})();

/* ══ CUSTOM CURSOR ══ */
(function() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();

  document.querySelectorAll('a, button, input, textarea, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-grow');
      ring.classList.add('ring-grow');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-grow');
      ring.classList.remove('ring-grow');
    });
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; ring.style.opacity = '1'; });
})();

/* ══ HERO PARTICLE CANVAS ══ */
(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || prefersReduced) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 60;
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random()
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      p.a += 0.005;
      const alpha = (Math.sin(p.a) * 0.3 + 0.4) * 0.6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(253,226,21,${alpha})`;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(253,226,21,${(1 - dist/120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══ NAVBAR SCROLL ══ */
(function() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══ MOBILE NAV ══ */
(function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    const open = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('open', !open);
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      hamburger.focus();
    }
  });
})();

/* ══ ACTIVE NAV ══ */
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html') || href === './' + path) {
      a.classList.add('active');
    }
  });
})();

/* ══ SMOOTH SCROLL ══ */
if (!prefersReduced) {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ══ SCROLL REVEAL ══ */
(function() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ══ ANIMATED COUNTERS ══ */
(function() {
  const statItems = document.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      const numEl = el.querySelector('.count-up');
      if (!numEl) return;
      const target = parseFloat(numEl.dataset.target);
      const suffix = numEl.dataset.suffix || '';
      const prefix = numEl.dataset.prefix || '';
      const duration = 1400;
      const start = performance.now();
      const isDecimal = target % 1 !== 0;

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        numEl.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else numEl.textContent = prefix + target + suffix;
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.3 });
  statItems.forEach(el => io.observe(el));
})();

/* ══ CRANE SLIDER POSITIONING ══ */
function getCraneId(inputId) {
  const map = { orders: 'crane-orders', skus: 'crane-skus', area: 'crane-area' };
  return map[inputId] || null;
}

function updateCraneSlider(input) {
  const fill = input.parentElement.querySelector('.range-fill');
  const crane = input.parentElement.querySelector('.crane-thumb');
  if (!fill && !crane) return;

  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || 100;
  const val = parseFloat(input.value);
  const pct = (val - min) / (max - min);

  if (fill) fill.style.width = (pct * 100) + '%';

  if (crane) {
    // Position crane: left edge of range-wrap = 0%, right = 100%
    // Account for half-thumb offset so crane is centered on value
    const trackWidth = input.getBoundingClientRect().width;
    const craneW = 40; // matches SVG width
    const leftPx = pct * trackWidth;
    crane.style.left = leftPx + 'px';
  }
}

document.querySelectorAll('input[type="range"]').forEach(r => {
  updateCraneSlider(r);
  r.addEventListener('input', () => updateCraneSlider(r));
});

// Recalculate on resize
window.addEventListener('resize', () => {
  document.querySelectorAll('input[type="range"]').forEach(r => updateCraneSlider(r));
});

/* ══ ROI CALCULATOR ══ */
(function() {
  const calcEl  = document.getElementById('roi-calc');
  if (!calcEl) return;
  const ordersEl = document.getElementById('orders');
  const skusEl   = document.getElementById('skus');
  const areaEl   = document.getElementById('area');
  const ordersVal = document.getElementById('orders-val');
  const skusVal   = document.getElementById('skus-val');
  const areaVal   = document.getElementById('area-val');
  const outPods   = document.getElementById('out-pods');
  const outUtil   = document.getElementById('out-util');
  const outPayback= document.getElementById('out-payback');
  if (!ordersEl) return;

  function animateValue(el, newVal) {
    if (!el) return;
    el.style.opacity = '0.4';
    el.style.transform = 'translateY(4px)';
    setTimeout(() => {
      el.textContent = newVal;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 150);
  }

  function update() {
    const orders = parseInt(ordersEl.value);
    const skus   = parseInt(skusEl.value);
    if (ordersVal) ordersVal.textContent = orders.toLocaleString() + ' orders/day';
    if (skusVal)   skusVal.textContent   = skus.toLocaleString() + ' SKUs';
    if (areaVal)   areaVal.textContent   = parseInt(areaEl.value).toLocaleString() + ' sq ft';

    const pods    = Math.max(1, Math.ceil(orders / 200 + skus / 500));
    const util    = Math.min(98, Math.round(orders / (pods * 200) * 100));
    const payback = pods <= 3 ? '8–14' : pods <= 6 ? '12–18' : '16–24';

    animateValue(outPods, pods);
    animateValue(outUtil, util + '%');
    animateValue(outPayback, payback + ' mo');
  }

  if (outPods) outPods.style.transition = 'opacity .15s, transform .15s';
  if (outUtil) outUtil.style.transition = 'opacity .15s, transform .15s';
  if (outPayback) outPayback.style.transition = 'opacity .15s, transform .15s';

  [ordersEl, skusEl, areaEl].forEach(el => el.addEventListener('input', update));
  update();
})();

/* ══ CONTACT FORM ══ */
(function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(id) { const el = document.getElementById(id); if (el) el.classList.add('visible'); }
  function clearErrors() { form.querySelectorAll('.field-error').forEach(el => el.classList.remove('visible')); }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name    = document.getElementById('cf-name');
    const email   = document.getElementById('cf-email');
    const company = document.getElementById('cf-company');
    const message = document.getElementById('cf-message');

    if (!name?.value.trim())              { showError('err-name');    valid = false; }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError('err-email');   valid = false; }
    if (!company?.value.trim())           { showError('err-company'); valid = false; }
    if (!message?.value.trim() || message.value.trim().length < 10) { showError('err-message'); valid = false; }

    if (valid) {
      form.style.opacity = '0';
      form.style.transition = 'opacity .4s';
      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) { success.classList.add('visible'); success.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      }, 400);
    }
  });
})();

/* ══ BUTTON RIPPLE ══ */
document.querySelectorAll('.btn-primary, .btn-ghost, .btn-black').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;
      width:20px;height:20px;
      background:rgba(255,255,255,0.2);
      border-radius:50%;
      left:${e.clientX - rect.left - 10}px;
      top:${e.clientY - rect.top - 10}px;
      transform:scale(0);
      animation:ripple .5s ease-out forwards;
      pointer-events:none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Add ripple keyframe */
const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes ripple{0%{transform:scale(0);opacity:.5}100%{transform:scale(8);opacity:0}}`;
document.head.appendChild(styleEl);

/* ══ HOVER GLOW TRACK ══ */
document.querySelectorAll('.card, .usecase-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});