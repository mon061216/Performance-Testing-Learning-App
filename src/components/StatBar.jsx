import React from "react";
import { MAX_LIVES } from "../data/courses";

export function StatBar({ lives, xp, streak, isLocked, restockText }) {
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
        <div className="stat hearts" title="Lives">
          {Array.from({ length: MAX_LIVES }).map((_, index) => (
            <span key={index} className={index < lives ? "heart alive" : "heart"}>{"\u2665"}</span>
          ))}
        </div>
        {isLocked && <div className="stat restock"><b>{restockText}</b> restock</div>}
        <div className="stat"><b>{streak}</b> day streak</div>
        <div className="stat"><b>{xp}</b> XP</div>
      </div>
    </header>
  );
}
