// Celebration animation: petals falling top-to-bottom + fluttering
// butterflies. Pure CSS-driven (transform/opacity only) for smooth
// performance; this just generates the randomized elements once into
// a <div id="celebration"> that must already be in the page.
//
// Shared by view.html (legacy per-name link page) and customer.html
// (customer portal) — see celebration.css for the animation rules.
(function initCelebration() {
  "use strict";

  const container = document.getElementById("celebration");
  if (!container) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const width = window.innerWidth;
  const density = width < 480 ? "small" : width < 900 ? "medium" : "large";
  const counts = {
    small: { petals: 7, butterflies: 2 },
    medium: { petals: 11, butterflies: 3 },
    large: { petals: 15, butterflies: 4 },
  }[density];

  const PETAL_COLORS = ["#DA9A2E", "#C97A2B", "#B84A4A", "#E8A9A0", "#F0C866", "#D97757"];

  const PETAL_SHAPES = [
    // Rounded teardrop petal
    `<path d="M12 2C6.5 8 4.5 13.5 12 22C19.5 13.5 17.5 8 12 2Z"/>`,
    // Simple four-petal blossom
    `<path d="M12 3c1.8 2 1.8 4.4 0 6-1.8-1.6-1.8-4 0-6Zm0 12c1.8 2 1.8 4.4 0 6-1.8-1.6-1.8-4 0-6ZM3 12c2-1.8 4.4-1.8 6 0-1.6 1.8-4 1.8-6 0Zm12 0c2-1.8 4.4-1.8 6 0-1.6 1.8-4 1.8-6 0Z"/>`,
  ];

  function rand(min, max) { return Math.random() * (max - min) + min; }

  const frag = document.createDocumentFragment();

  for (let i = 0; i < counts.petals; i++) {
    const fallDuration = rand(9, 16);
    const fallDelay = -rand(0, fallDuration);
    const swayDuration = rand(2.4, 4.5);
    const spinDuration = rand(3, 7);
    const size = rand(14, 26);
    const leftPercent = rand(0, 100);
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    const shape = PETAL_SHAPES[Math.floor(Math.random() * PETAL_SHAPES.length)];
    const opacity = rand(0.55, 0.9).toFixed(2);

    const fall = document.createElement("div");
    fall.className = "petal-fall";
    fall.style.left = `${leftPercent}%`;
    fall.style.animationDuration = `${fallDuration}s`;
    fall.style.animationDelay = `${fallDelay}s`;

    const sway = document.createElement("div");
    sway.className = "petal-sway";
    sway.style.animationDuration = `${swayDuration}s`;
    sway.style.animationDelay = `${-rand(0, swayDuration)}s`;

    const spin = document.createElement("div");
    spin.className = "petal-spin";
    spin.style.animationDuration = `${spinDuration}s`;
    spin.style.animationDelay = `${-rand(0, spinDuration)}s`;
    spin.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" opacity="${opacity}">${shape}</svg>`;

    sway.appendChild(spin);
    fall.appendChild(sway);
    frag.appendChild(fall);
  }

  const WING_COLORS = [
    ["#DA9A2E", "#F4C463"],
    ["#B84A4A", "#E8A9A0"],
    ["#AD7418", "#F0C866"],
    ["#9A3D3D", "#DA9A2E"],
  ];

  for (let i = 0; i < counts.butterflies; i++) {
    const flightDuration = rand(13, 20);
    const flightDelay = -rand(0, flightDuration);
    const topPercent = rand(8, 70);
    const scale = rand(0.7, 1.15);
    const wingDuration = rand(0.28, 0.42);
    const [colorA, colorB] = WING_COLORS[i % WING_COLORS.length];
    const gradId = `wingGrad-${i}-${Math.random().toString(36).slice(2, 8)}`;

    const el = document.createElement("div");
    el.className = "butterfly";
    el.style.top = `${topPercent}%`;
    el.style.animationDuration = `${flightDuration}s`;
    el.style.animationDelay = `${flightDelay}s`;
    el.innerHTML = `
      <svg width="${38 * scale}" height="${24 * scale}" viewBox="0 0 100 60" style="animation-duration:${wingDuration}s">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${colorA}"/>
            <stop offset="100%" stop-color="${colorB}"/>
          </linearGradient>
        </defs>
        <g class="wing" style="animation-duration:${wingDuration}s">
          <path d="M50 30 C 20 -4, -6 8, 4 34 C 12 54, 38 50, 50 30 Z" fill="url(#${gradId})"/>
        </g>
        <g class="wing" style="animation-duration:${wingDuration}s">
          <path d="M50 30 C 80 -4, 106 8, 96 34 C 88 54, 62 50, 50 30 Z" fill="url(#${gradId})"/>
        </g>
        <ellipse cx="50" cy="30" rx="2.6" ry="11" fill="#2B2320"/>
      </svg>`;
    frag.appendChild(el);
  }

  container.appendChild(frag);

  // Pause the animation while the tab isn't visible (saves battery/CPU).
  document.addEventListener("visibilitychange", () => {
    container.style.animationPlayState = document.hidden ? "paused" : "running";
    container.querySelectorAll("*").forEach((el) => {
      el.style.animationPlayState = document.hidden ? "paused" : "running";
    });
  });
})();
