const fs = require('fs');
let content = fs.readFileSync('src/data/courses.js', 'utf8');

content = content.replace(/title: "Level 1 Checkpoint"/g, 'title: "Tổng hợp Kiến thức Level 1"');
content = content.replace(/title: "Level 2 Checkpoint"/g, 'title: "Tổng hợp Kiến thức Level 2"');
content = content.replace(/title: "Level 3 Checkpoint"/g, 'title: "Tổng hợp Kiến thức Level 3"');

fs.writeFileSync('src/data/courses.js', content);
