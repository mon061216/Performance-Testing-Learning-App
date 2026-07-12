const fs = require('fs');
const css = `
/* PREMIUM BUTTON DESIGN FOR COURSE CARD */
.course-card .primary-button {
  background: #2b2b2b !important;
  color: white !important;
  border-radius: 9999px !important;
  box-shadow: 0 8px 20px rgba(43, 43, 43, 0.3) !important;
  border: none !important;
  padding: 14px 40px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  transform: translateY(0) !important;
  min-height: auto !important;
}

.course-card .primary-button:hover {
  background: #111111 !important;
  box-shadow: 0 12px 25px rgba(17, 17, 17, 0.4) !important;
  transform: translateY(-3px) !important;
}

.course-card .primary-button:active {
  transform: translateY(1px) !important;
  box-shadow: 0 4px 10px rgba(17, 17, 17, 0.3) !important;
}
`;
fs.appendFileSync('src/styles/styles.css', css);
console.log('Appended premium button CSS');
