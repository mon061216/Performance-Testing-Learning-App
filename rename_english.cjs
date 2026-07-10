const fs = require('fs');
let content = fs.readFileSync('src/data/courses.js', 'utf8');

content = content.replace(/title: "Tổng hợp Kiến thức Level 1"/g, 'title: "Level 1 Review"');
content = content.replace(/title: "Tổng hợp Kiến thức Level 2"/g, 'title: "Level 2 Review"');
content = content.replace(/title: "Tổng hợp Kiến thức Level 3"/g, 'title: "Level 3 Review"');

fs.writeFileSync('src/data/courses.js', content);
