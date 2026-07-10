import React from "react";

export function ShapeIcon({ type }) {
  if (type === 'initial-state') {
    return <span className="shape-icon initial-state-icon" aria-hidden="true">●</span>;
  }
  if (type === 'final-state') {
    return <span className="shape-icon final-state-icon" aria-hidden="true">◉</span>;
  }
  return <span className={`shape-icon ${type}`} aria-hidden="true" />;
}
