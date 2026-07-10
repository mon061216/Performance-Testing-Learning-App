const fs = require('fs');
let c = fs.readFileSync('src/data/courses.js', 'utf8');

c = c.replace(/\\\\\`\)/g, '\\`)');
c = c.replace(/\\\\\`/g, '\\`');

fs.writeFileSync('src/data/courses.js', c);
console.log('Fixed double backslashes');
