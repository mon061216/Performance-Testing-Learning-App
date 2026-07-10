const fs = require('fs');
const content = fs.readFileSync('src/pages/PathView.jsx', 'utf8');
const classes = new Set();
const matches = content.match(/className=["']([^"']+)["']/g);
if (matches) {
  matches.forEach(m => {
    classes.add(m);
  });
}
console.log(Array.from(classes).join('\n'));
