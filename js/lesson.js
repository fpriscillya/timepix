/* ============================================================
   Lesson interactions
   - Hero: a coarse pixel grid where particle "tracks" flash,
     echoing what the MiniPIX sensor does. Respects reduced motion.
   - Flip cards for alpha / beta / gamma.
   - Pixet Basic hotspots.
   ============================================================ */

(function heroPixels() {
  const canvas = document.getElementById('pixelHero');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const TEAL = '#1ebcba', CORAL = '#f08081', LIGHT = '#b6e1df';
  // hero background is CERN blue #0053a1; tracks are drawn over it via canvas clearRect
  let cell = 18, cols = 0, rows = 0, grid = [];

  function size() {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(r.width / cell);
    rows = Math.ceil(r.height / cell);
    grid = new Array(cols * rows).fill(0);
  }
  const idx = (x, y) => y * cols + x;

  // light up a cluster of pixels: an alpha blob, a beta squiggle, or a muon streak
  function spawn() {
    const kind = Math.random();
    if (kind < 0.34) {            // alpha: small dense blob, coral
      const cx = (Math.random() * cols) | 0, cy = (Math.random() * rows) | 0;
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++)
          paint(cx + dx, cy + dy, CORAL, 1);
    } else if (kind < 0.7) {      // beta: short wiggly line, teal
      let x = (Math.random() * cols) | 0, y = (Math.random() * rows) | 0;
      for (let i = 0; i < 7; i++) {
        paint(x, y, TEAL, 0.9);
        x += (Math.random() < 0.5 ? 1 : -1);
        y += (Math.random() < 0.5 ? 1 : 0);
      }
    } else {                      // muon: long straight streak, light teal
      let x = (Math.random() * cols) | 0, y = (Math.random() * rows) | 0;
      const len = 10 + (Math.random() * 14 | 0);
      const dx = Math.random() < 0.5 ? 1 : -1;
      for (let i = 0; i < len; i++) paint(x + i * dx, y + (i * 0.3 | 0), LIGHT, 0.8);
    }
  }
  function paint(x, y, color, life) {
    if (x < 0 || y < 0 || x >= cols || y >= rows) return;
    grid[idx(x, y)] = { color, life };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const c = grid[idx(x, y)];
        // faint base grid dot
        ctx.fillStyle = 'rgba(255,255,255,0.035)';
        ctx.fillRect(x * cell + cell / 2 - 1, y * cell + cell / 2 - 1, 2, 2);
        if (c) {
          ctx.globalAlpha = Math.max(0, c.life);
          ctx.fillStyle = c.color;
          ctx.fillRect(x * cell + 2, y * cell + 2, cell - 4, cell - 4);
          ctx.globalAlpha = 1;
          c.life -= 0.018;
          if (c.life <= 0) grid[idx(x, y)] = 0;
        }
      }
    }
  }

  size();
  window.addEventListener('resize', size);

  if (reduce) {
    // static: scatter a few marks once, no animation
    for (let i = 0; i < 14; i++) spawn();
    draw();
    return;
  }
  let frame = 0;
  (function loop() {
    if (frame % 26 === 0) spawn();
    draw();
    frame++;
    requestAnimationFrame(loop);
  })();
})();

/* ---------- flip cards ---------- */
document.querySelectorAll('.flip').forEach(card => {
  card.addEventListener('click', () => {
    const open = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!open));
  });
});

/* ---------- Pixet hotspots ---------- */
(function hotspots() {
  const dots = document.querySelectorAll('.hotspot__dot');
  const panel = document.getElementById('hotspotPanel');
  if (!dots.length || !panel) return;
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.setAttribute('aria-current', 'false'));
      dot.setAttribute('aria-current', 'true');
      panel.innerHTML =
        '<h4>' + dot.dataset.title + '</h4><p>' + dot.dataset.body + '</p>';
    });
  });
})();

/* ---------- misconceptions reveal ---------- */
document.querySelectorAll('.misc-item').forEach(item => {
  item.addEventListener('click', () => {
    const open = item.getAttribute('aria-expanded') === 'true';
    item.setAttribute('aria-expanded', String(!open));
  });
});

/* ---------- sticky nav: active state on scroll ---------- */
(function navScroll() {
  const links = document.querySelectorAll('.topnav__link[href^="#"]');
  const sections = Array.from(links)
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        const active = document.querySelector(
          '.topnav__link[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('is-active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => io.observe(s));
})();

/* ---------- sticky nav: dropdown toggle ---------- */
(function navDropdown() {
  const toggle = document.querySelector('.topnav__drop-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', e => {
    e.stopPropagation();
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
  });
  document.addEventListener('click', () => {
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
})();
