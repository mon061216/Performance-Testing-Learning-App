const fs = require('fs');
let c = fs.readFileSync('src/data/courses.js', 'utf8');

c = c.replace(/\(\`/g, '(\\`');
c = c.replace(/\`\)/g, '\\`)');
c = c.replace(/\`do \/ Activity\`/g, '\\`do / Activity\\`');
c = c.replace(/\`Event \[Guard\] \/ Action\`/g, '\\`Event [Guard] / Action\\`');
c = c.replace(/\`\[condition\]\`/g, '\\`[condition]\\`');

fs.writeFileSync('src/data/courses.js', c);
console.log('Fixed backticks');
