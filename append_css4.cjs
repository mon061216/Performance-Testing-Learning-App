const fs = require('fs');
const css = `
/* REMOVE LEFT COMPONENT BACKGROUND TO MATCH REFERENCE */
.home-hero {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}
.home-hero::before {
  display: none !important;
}
`;
fs.appendFileSync('src/styles/styles.css', css);
console.log('Updated left component background');
