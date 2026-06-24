import React from "react";

export function LockoutPanel({ restockText, onBack }) {
  return (
    <main className="exercise lockout">
      <div className="exercise-copy">
        <span className="lesson-pill">Lives empty</span>
        <h1>Take a short break</h1>
        <p>Your hearts are out of stock. New lives will restock in {restockText}, then you can continue learning.</p>
      </div>
      <div className="lockout-box">
        <strong>No lessons available right now</strong>
        <span>Come back after the timer, and Chart Master will refill your hearts automatically.</span>
      </div>
      <div className="actions">
        <button className="ghost-button" onClick={onBack}>Back to Home</button>
      </div>
    </main>
  );
}
