const fs = require('fs');
const css = `
/* BALANCING AND BACKGROUND REMOVAL */
.home-view {
  align-items: center !important;
}

.course-card {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
}

.course-card:hover {
  transform: none !important;
  box-shadow: none !important;
}

.course-card .primary-button {
  margin-top: 20px;
  width: auto;
  align-self: flex-start;
  padding: 12px 32px;
  font-size: 1.1rem;
}

.course-card-content {
  padding: 0 !important;
}

.course-card-content h2 {
  font-size: 2.5rem;
  color: #1e293b;
  line-height: 1.2;
}

.course-card-content p {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 20px;
}
`;
fs.appendFileSync('src/styles/styles.css', css);
console.log('Updated course card styles');
