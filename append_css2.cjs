const fs = require('fs');
const css = `
/* HOME PAGE LAYOUT UPDATE */
.home-view {
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  gap: 40px !important;
}

.home-hero {
  flex: 1 !important;
  margin-bottom: 0 !important;
}

.course-cards {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

@media (max-width: 768px) {
  .home-view {
    flex-direction: column !important;
  }
}
`;
fs.appendFileSync('src/styles/styles.css', css);
console.log('Appended layout css');
