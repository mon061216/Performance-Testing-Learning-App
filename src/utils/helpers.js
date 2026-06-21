export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function polarXY(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function arcD(cx, cy, r, start, end) {
  const s = polarXY(cx, cy, r, start);
  const e = polarXY(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

export const G = {
  // shared style shortcuts
  text: { fill: "#e2e8f0", fontFamily: "Nunito,sans-serif" },
  muted: { fill: "#7a9bb5" },
  green: "#58CC02",
  blue: "#1CB0F6",
  yellow: "#FFD900",
  red: "#ff4b4b",
  orange: "#FF9600",
};

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
