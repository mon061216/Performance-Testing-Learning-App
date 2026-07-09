const fs = require('fs');
const css = `
/* Milestone Complete Overlay */
.milestone-complete-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #121212;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  font-family: 'Inter', sans-serif;
}

.milestone-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.milestone-mascot {
  width: 250px;
  height: auto;
  margin-bottom: 2rem;
}

.milestone-content h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.milestone-content .subtitle {
  font-size: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
}

.xp-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
}

.xp-label {
  font-size: 0.875rem;
  font-weight: 700;
  color: #a1a1aa;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.xp-value-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.xp-value {
  font-size: 4rem;
  font-weight: 900;
  color: white;
}

.xp-sparkle {
  font-size: 2rem;
  color: #4ade80;
}

.continue-btn-large {
  background: #f8fafc;
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 1rem 4rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
`;
fs.appendFileSync('src/styles/styles.css', '\n' + css, 'utf8');
console.log('Appended CSS');
