const fs = require('fs');
const content = fs.readFileSync('src/data/courses.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id: "') || l.includes('prompt: "')) console.log(i, l.trim());
});
