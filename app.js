/* ==========================================================================
   24 COLORES SIN FALLOS DE TRANSICIÓN Y CON PÉTALOS TRASEROS ILUMINADOS
   ========================================================================== */
const COLORS = [
  { name: "Rojo Carmesí",    main: "#e01e5a", mid: "#b51244", back: "#d11952", light: "#ff7aa2", glow: "rgba(255, 46, 108, 0.85)" },
  { name: "Rosa Intenso",    main: "#ff3d7f", mid: "#c91e5a", back: "#eb2f70", light: "#ff9ebb", glow: "rgba(255, 77, 136, 0.85)" },
  { name: "Fucsia Brillante",main: "#d9048e", mid: "#9e0267", back: "#c40480", light: "#ff78ce", glow: "rgba(255, 25, 179, 0.85)" },
  { name: "Coral",           main: "#ff5238", mid: "#c42f19", back: "#eb4228", light: "#ffa394", glow: "rgba(255, 94, 66, 0.85)" },
  { name: "Durazno",         main: "#ff7b3b", mid: "#c75118", back: "#ed6b2b", light: "#ffc299", glow: "rgba(255, 138, 77, 0.85)" },
  { name: "Naranja Ámbar",   main: "#f57c00", mid: "#b85600", back: "#e06d00", light: "#ffc266", glow: "rgba(255, 145, 0, 0.85)" },
  { name: "Oro",             main: "#eab308", mid: "#a67902", back: "#d9a306", light: "#ffe97d", glow: "rgba(255, 209, 26, 0.85)" },
  { name: "Amarillo Sol",    main: "#facc15", mid: "#b89006", back: "#e6b80e", light: "#fff59e", glow: "rgba(255, 230, 66, 0.85)" },
  { name: "Verde Lima",      main: "#65a30d", mid: "#3f6905", back: "#579108", light: "#bef264", glow: "rgba(132, 204, 22, 0.85)" },
  { name: "Verde Esmeralda", main: "#10b981", mid: "#067a54", back: "#0ca673", light: "#6ee7b7", glow: "rgba(16, 219, 148, 0.85)" },
  { name: "Verde Jade",      main: "#22c55e", mid: "#15803d", back: "#1cb353", light: "#86efac", glow: "rgba(34, 197, 94, 0.85)" },
  { name: "Menta",           main: "#14b8a6", mid: "#0d7a6e", back: "#11a393", light: "#99f6e4", glow: "rgba(45, 212, 191, 0.85)" },
  { name: "Turquesa",        main: "#06b6d4", mid: "#087b91", back: "#07a3be", light: "#7dd3fc", glow: "rgba(34, 211, 238, 0.85)" },
  { name: "Azul Celeste",    main: "#0ea5e9", mid: "#0369a1", back: "#0992d1", light: "#93c5fd", glow: "rgba(56, 189, 248, 0.85)" },
  { name: "Azul Real",       main: "#3b82f6", mid: "#1d4ed8", back: "#296ef2", light: "#93c5fd", glow: "rgba(59, 130, 246, 0.85)" },
  { name: "Azul Zafiro",     main: "#2563eb", mid: "#1e3a8a", back: "#1f54cc", light: "#60a5fa", glow: "rgba(56, 128, 255, 0.85)" },
  { name: "Índigo",          main: "#6366f1", mid: "#3730a3", back: "#5254e8", light: "#a5b4fc", glow: "rgba(114, 117, 255, 0.85)" },
  { name: "Violeta",         main: "#8b5cf6", mid: "#5b21b6", back: "#7c4dff", light: "#c4b5fd", glow: "rgba(155, 107, 255, 0.85)" },
  { name: "Lavanda",         main: "#a855f7", mid: "#6b21a8", back: "#9333ea", light: "#e9d5ff", glow: "rgba(184, 102, 255, 0.85)" },
  { name: "Púrpura",         main: "#c026d3", mid: "#701a75", back: "#a81cba", light: "#f0abfc", glow: "rgba(217, 70, 239, 0.85)" },
  { name: "Magenta",         main: "#db2777", mid: "#831843", back: "#c41d68", light: "#f472b6", glow: "rgba(244, 63, 148, 0.85)" },
  { name: "Rosa Pastel",     main: "#fb7185", mid: "#be123c", back: "#f43f5e", light: "#ffe4e6", glow: "rgba(253, 164, 175, 0.85)" },
  { name: "Blanco Perla",    main: "#e2e8f0", mid: "#94a3b8", back: "#cbd5e1", light: "#ffffff", glow: "rgba(255, 255, 255, 0.85)" },
  { name: "Vino Borgoña",    main: "#be123c", mid: "#7a0926", back: "#a60f35", light: "#fb7185", glow: "rgba(225, 29, 72, 0.85)" }
];

let index = 0;
const root = document.documentElement.style;
const colorLabel = document.getElementById("colorLabel");

function updateRoseColor(newIndex, burst = false) {
  index = (newIndex + COLORS.length) % COLORS.length;
  const c = COLORS[index];

  // Cambia todos los pétalos al mismo tiempo sin que quede rastro del color anterior
  root.setProperty("--c-main", c.main);
  root.setProperty("--c-mid", c.mid);
  root.setProperty("--c-back", c.back);
  root.setProperty("--c-light", c.light);
  root.setProperty("--c-glow", c.glow);

  colorLabel.textContent = `${index + 1} / ${COLORS.length} • ${c.name}`;

  if (burst) {
    const roseRect = document.getElementById("rose").getBoundingClientRect();
    createSparkles(roseRect.left + 100, roseRect.top + 95, 28);
  }
}

document.getElementById("prevColor").addEventListener("click", () => {
  updateRoseColor(index - 1, true);
});

document.getElementById("nextColor").addEventListener("click", () => {
  updateRoseColor(index + 1, true);
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") updateRoseColor(index - 1, true);
  if (e.key === "ArrowRight") updateRoseColor(index + 1, true);
});

/* ==========================================================================
   DESTELLOS AL TOCAR LA ROSA
   ========================================================================== */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];
const bgStars = [];

for (let i = 0; i < 55; i++) {
  bgStars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.5,
    alpha: Math.random(),
    vy: -(Math.random() * 0.3 + 0.1),
    da: Math.random() * 0.02 + 0.005
  });
}

function createSparkles(x, y, count = 30) {
  const c = COLORS[index];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 0.8;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 0.6,
      r: Math.random() * 3 + 1.2,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.012,
      color: i % 2 === 0 ? c.light : c.main
    });
  }
}

document.getElementById("rose").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX || rect.left + 100;
  const y = e.clientY || rect.top + 95;
  createSparkles(x, y, 35);
});

function animate() {
  ctx.clearRect(0, 0, w, h);
  const c = COLORS[index];

  // Partículas de fondo
  for (let i = 0; i < bgStars.length; i++) {
    const s = bgStars[i];
    s.y += s.vy;
    s.alpha += s.da;
    if (s.alpha > 1 || s.alpha < 0.15) s.da *= -1;
    if (s.y < -10) {
      s.y = h + 10;
      s.x = Math.random() * w;
    }
    ctx.save();
    ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
    ctx.fillStyle = c.light;
    ctx.shadowBlur = 8;
    ctx.shadowColor = c.main;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Destellos al tocar
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = c.main;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  updateRoseColor(Math.floor(Math.random() * COLORS.length), false);
  animate();
};

