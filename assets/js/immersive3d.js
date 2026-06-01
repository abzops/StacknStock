/* Stack n Stock Immersive 3D Layer - framework-free, defensive, and accessible */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  function initHeroField() {
    const canvas = document.getElementById('hero-canvas');
    const hero = document.querySelector('.hero');
    if (!canvas || !hero || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let timeSec = 0;
    let rafId = 0;
    let running = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const nodes = [];
    const cubeCount = 42;

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes.length = 0;
      for (let i = 0; i < cubeCount; i += 1) {
        nodes.push({
          x: (Math.random() - 0.5) * 920,
          y: (Math.random() - 0.5) * 520,
          z: Math.random() * 900 + 160,
          s: Math.random() * 18 + 8,
          vx: (Math.random() - 0.5) * 0.55,
          vy: (Math.random() - 0.5) * 0.35,
          vz: Math.random() * 1.4 + 0.45,
          spin: Math.random() * Math.PI
        });
      }
    }

    function project(node) {
      const depth = 760;
      const scale = depth / (depth + node.z);
      return {
        x: width * 0.58 + (node.x + mouse.x * 70) * scale,
        y: height * 0.48 + (node.y + mouse.y * 42) * scale,
        scale,
        alpha: clamp(1 - node.z / 1200, 0.12, 0.9)
      };
    }

    function drawCube(x, y, size, alpha, spin) {
      const s = size;
      const skew = s * 0.48;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.sin(spin) * 0.08);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(253,226,21,${alpha})`;
      ctx.fillStyle = `rgba(253,226,21,${alpha * 0.06})`;
      ctx.beginPath();
      ctx.moveTo(-s, -s * 0.55);
      ctx.lineTo(s * 0.4, -s * 0.55 - skew);
      ctx.lineTo(s, s * 0.1);
      ctx.lineTo(-s * 0.38, s * 0.72);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-s, -s * 0.55);
      ctx.lineTo(-s, s * 0.42);
      ctx.lineTo(-s * 0.38, s * 0.72);
      ctx.moveTo(s, s * 0.1);
      ctx.lineTo(s, s * 0.98);
      ctx.lineTo(-s * 0.38, s * 0.72);
      ctx.moveTo(s * 0.4, -s * 0.55 - skew);
      ctx.lineTo(s * 0.4, s * 0.3);
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.16})`;
      ctx.stroke();
      ctx.restore();
    }

    function drawGrid(time) {
      const horizon = height * 0.64;
      ctx.save();
      ctx.strokeStyle = 'rgba(253,226,21,0.08)';
      ctx.lineWidth = 1;
      for (let i = -12; i <= 12; i += 1) {
        const x = width * 0.58 + i * 58 + mouse.x * 24;
        ctx.beginPath();
        ctx.moveTo(width * 0.58 + i * 12, horizon);
        ctx.lineTo(x, height + 80);
        ctx.stroke();
      }
      for (let i = 0; i < 14; i += 1) {
        const y = horizon + Math.pow(i, 1.65) * 11 + (time % 1) * 18;
        ctx.globalAlpha = clamp(1 - i / 14, 0.08, 0.55);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    function animate(now) {
      if (!running) return;
      timeSec = now * 0.001;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(width * 0.62, height * 0.45, 0, width * 0.62, height * 0.45, Math.max(width, height) * 0.62);
      gradient.addColorStop(0, 'rgba(253,226,21,0.12)');
      gradient.addColorStop(0.42, 'rgba(253,226,21,0.035)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      drawGrid(timeSec);

      const projected = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.z -= node.vz;
        node.spin += 0.012;
        if (node.z < 40 || Math.abs(node.x) > 980 || Math.abs(node.y) > 620) {
          node.x = (Math.random() - 0.5) * 920;
          node.y = (Math.random() - 0.5) * 520;
          node.z = 1060;
        }
        return { node, point: project(node) };
      });

      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const a = projected[i].point;
          const b = projected[j].point;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(253,226,21,${(1 - dist / 150) * 0.12})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      projected
        .sort((a, b) => b.node.z - a.node.z)
        .forEach(({ node, point }) => drawCube(point.x, point.y, node.s * point.scale, point.alpha, node.spin));

      rafId = window.requestAnimationFrame(animate);
    }

    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      mouse.tx = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      mouse.ty = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    }, { passive: true });

    window.addEventListener('resize', resize, { passive: true });
    resize();
    seed();
    const start = () => {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    start();
  }

  function initTiltCards() {
    if (!canHover || prefersReducedMotion) return;
    const cards = document.querySelectorAll('.bracket-card, .card, .usecase-card, .cert-card, .team-card, .container-card, .value-item, .calc-result, .contact-card');
    cards.forEach((card) => {
      card.classList.add('sns-tilt-ready');
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 13;
        const rotateX = (0.5 - y) * 10;
        card.style.setProperty('--tilt-x', rotateX.toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', rotateY.toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  function initMagneticActions() {
    if (!canHover || prefersReducedMotion) return;
    document.querySelectorAll('.btn-primary, .btn-ghost, .btn-black, .nav-cta').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate3d(${x * 0.11}px, ${y * 0.16}px, 24px)`;
      }, { passive: true });
      button.addEventListener('pointerleave', () => {
        button.style.transform = '';
      });
    });
  }

  function initScrollDepth() {
    const root = document.documentElement;
    const setDepth = () => root.style.setProperty('--scroll-depth', String(Math.min(1, window.scrollY / Math.max(1, window.innerHeight))));
    window.addEventListener('scroll', setDepth, { passive: true });
    setDepth();
  }

  ready(() => {
    document.body.classList.add('sns-3d-ready');
    initHeroField();
    initTiltCards();
    initMagneticActions();
    initScrollDepth();
  });
})();
