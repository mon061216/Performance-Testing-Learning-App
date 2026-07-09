import React from "react";

export function StatBar({ xp, streak }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">CM</div>
        <div>
          <strong>Chart Master</strong>
          <span>diagram practice</span>
        </div>
      </div>
      <div className="stats" aria-label="Player stats">
        <div className="stat"><b>{streak}</b> day streak</div>
        <div className="stat"><b>{xp}</b> XP</div>
      </div>
    </header>
  );
}
