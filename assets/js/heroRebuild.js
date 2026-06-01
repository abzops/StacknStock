/* 100% rebuilt hero: single-source-of-truth timeline, grounded truck, aligned crane rig. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  }

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeDrop = t => 1 - Math.pow(1 - t, 4);

  ready(function initHeroMachine() {
    const root = document.getElementById('hero-machine');
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pods = [1, 2, 3].map(n => root.querySelector(`[data-machine-container="${n}"]`));
    const truck = root.querySelector('[data-machine-truck]');
    const trolley = root.querySelector('[data-machine-trolley]');
    const cable = root.querySelector('[data-machine-cable]');
    const hook = root.querySelector('[data-machine-hook]');
    const spreader = root.querySelector('[data-machine-spreader]');
    if (!pods.every(Boolean) || !truck || !trolley || !cable || !hook || !spreader) return;

    root.classList.add('hero-machine-100');

    const C = { w: 320, h: 72 };
    const stackX = 46;
    const slotsY = [390, 306, 222];
    const fallY = -180;
    const liftY = 150;
    const truckParkX = 500;
    const truckExitX = 1040;
    const truckY = 424;
    const truckLoadOffsetX = 18;
    const loadX = truckParkX + truckLoadOffsetX;
    const loadY = truckY + 44 - C.h; // container bottom sits on trailer deck
    const trolleyY = 96;
    const trolleyHalf = 21;
    const stackHookX = stackX + C.w / 2 - trolleyHalf;
    const loadHookX = loadX + C.w / 2 - trolleyHalf;
    const spreaderGap = 24;

    function setPod(i, x, y, opacity, scale) {
      const el = pods[i];
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(scale || 1).toFixed(3)})`;
      el.style.opacity = String(clamp(opacity, 0, 1));
      el.style.zIndex = String(20 + i);
    }

    function setTruck(x, opacity) {
      truck.style.transform = `translate3d(${x.toFixed(1)}px, ${truckY}px, 0)`;
      truck.style.opacity = String(clamp(opacity, 0, 1));
    }

    function setRig(trolleyX, containerY, attached) {
      const spreaderY = containerY - spreaderGap;
      const hookTop = spreaderY - trolleyY - 26;
      const cableHeight = Math.max(24, hookTop - 34);
      trolley.style.transform = `translate3d(${trolleyX.toFixed(1)}px, ${trolleyY}px, 0)`;
      cable.style.height = `${cableHeight.toFixed(1)}px`;
      hook.style.top = `${(34 + cableHeight).toFixed(1)}px`;
      spreader.style.top = `${(34 + cableHeight + 28).toFixed(1)}px`;
      spreader.style.opacity = attached ? '1' : '0';
      hook.style.opacity = attached ? '1' : '.9';
    }

    function resetBase() {
      for (let i = 0; i < 3; i += 1) setPod(i, stackX, fallY, 0, 0.78);
      setTruck(truckParkX, 0);
      setRig(stackHookX, slotsY[2], false);
    }

    function renderFall(i, p) {
      const ep = easeDrop(p);
      let y = lerp(fallY, slotsY[i], ep);
      if (p > 0.78 && p < 1) {
        y += Math.sin((p - 0.78) / 0.22 * Math.PI) * 10 * (1 - p);
      }
      setPod(i, stackX, y, p < 0.04 ? p / 0.04 : 1, lerp(0.78, 1, clamp(p * 1.4, 0, 1)));
    }

    function removalState(idx, p) {
      let x = stackX;
      let y = slotsY[idx];
      let truckX = truckParkX;
      let truckOpacity = 0;
      let tx = stackHookX;
      let attached = false;
      let podOpacity = 1;

      // 1. Truck rolls in on ground while crane waits above stack.
      if (p < 0.16) {
        const e = easeInOut(p / 0.16);
        truckX = lerp(960, truckParkX, e);
        truckOpacity = e;
        tx = stackHookX;
        attached = false;
      }
      // 2. Spreader lowers/locks above active container.
      else if (p < 0.28) {
        truckOpacity = 1;
        tx = stackHookX;
        attached = true;
      }
      // 3. Lift vertically from stack.
      else if (p < 0.42) {
        const e = easeOut((p - 0.28) / 0.14);
        truckOpacity = 1;
        tx = stackHookX;
        attached = true;
        y = lerp(slotsY[idx], liftY, e);
      }
      // 4. Travel horizontally over the parked truck.
      else if (p < 0.60) {
        const e = easeInOut((p - 0.42) / 0.18);
        truckOpacity = 1;
        tx = lerp(stackHookX, loadHookX, e);
        x = lerp(stackX, loadX, e);
        y = liftY;
        attached = true;
      }
      // 5. Lower onto trailer deck.
      else if (p < 0.76) {
        const e = easeOut((p - 0.60) / 0.16);
        truckOpacity = 1;
        tx = loadHookX;
        x = loadX;
        y = lerp(liftY, loadY, e);
        attached = true;
      }
      // 6. Release; hook rises a little, pod remains seated on trailer.
      else if (p < 0.84) {
        truckOpacity = 1;
        tx = loadHookX;
        x = loadX;
        y = loadY;
        attached = false;
      }
      // 7. Truck exits with the loaded container; pod follows truck deck.
      else {
        const e = easeInOut((p - 0.84) / 0.16);
        truckOpacity = e < 0.94 ? 1 : 1 - (e - 0.94) / 0.06;
        truckX = lerp(truckParkX, truckExitX, e);
        x = truckX + truckLoadOffsetX;
        y = loadY;
        tx = loadHookX;
        attached = false;
        podOpacity = truckOpacity;
      }

      return { x, y, truckX, truckOpacity, tx, attached, podOpacity };
    }

    if (prefersReduced) {
      root.classList.add('is-static');
      setPod(0, stackX, slotsY[0], 1, 1);
      setPod(1, stackX, slotsY[1], 1, 1);
      setPod(2, stackX, slotsY[2], 1, 1);
      setTruck(truckParkX, 1);
      setRig(stackHookX, slotsY[2], false);
      return;
    }

    const total = 24000;
    const falls = [[0.00, 0.11], [0.13, 0.24], [0.26, 0.37]];
    const removals = [[2, 0.40, 0.56], [1, 0.59, 0.75], [0, 0.78, 0.94]];
    let rafId = 0;
    let running = false;

    function frame(now) {
      if (!running) return;
      const t = (now % total) / total;
      resetBase();

      for (let i = 0; i < 3; i += 1) {
        const [a, b] = falls[i];
        if (t >= a) renderFall(i, t >= b ? 1 : (t - a) / (b - a));
      }

      let active = false;
      for (const [idx, a, b] of removals) {
        if (t >= b) {
          setPod(idx, truckExitX + truckLoadOffsetX, loadY, 0, 1);
          continue;
        }
        if (t >= a && t < b) {
          active = true;
          const s = removalState(idx, (t - a) / (b - a));
          setPod(idx, s.x, s.y, s.podOpacity, 1);
          setTruck(s.truckX, s.truckOpacity);
          setRig(s.tx, s.y, s.attached);
          break;
        }
      }

      if (!active) {
        if (t >= 0.37 && t < 0.40) setRig(stackHookX, slotsY[2], false);
        else if (t >= 0.56 && t < 0.59) setRig(stackHookX, slotsY[1], false);
        else if (t >= 0.75 && t < 0.78) setRig(stackHookX, slotsY[0], false);
        else if (t >= 0.94) {
          setTruck(truckParkX, 0);
          setRig(stackHookX, slotsY[2], false);
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    start();
  });
})();
