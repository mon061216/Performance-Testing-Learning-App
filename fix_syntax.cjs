const fs = require('fs');
let content = fs.readFileSync('src/data/courses.js', 'utf8');

// Fix Level 1
content = content.replace(
  /\s*\}\s*\]\s*\}\s*,\s*\{\s*id: "checkpoint-1",/,
  ',\n          {\n            id: "checkpoint-1",'
);
content = content.replace(
  /\s*\}\s*\]\s*\}\s*,\s*\{\s*title: "Components & Syntax",/,
  '\n          }\n        ]\n      },\n      {\n        title: "Components & Syntax",'
);

// Fix Level 2
content = content.replace(
  /\s*\}\s*\]\s*\}\s*,\s*\{\s*id: "checkpoint-2",/,
  ',\n          {\n            id: "checkpoint-2",'
);
content = content.replace(
  /\s*\}\s*\]\s*\}\s*,\s*\{\s*title: "Advanced Concepts",/,
  '\n          }\n        ]\n      },\n      {\n        title: "Advanced Concepts",'
);

// Fix Level 3
content = content.replace(
  /\s*\}\s*\]\s*\}\s*\]\s*\}\s*\{\s*id: "checkpoint-3",/,
  ',\n          {\n            id: "checkpoint-3",'
);
content = content.replace(
  /\s*\}\s*\]\s*\}\s*\];/,
  '\n          }\n        ]\n      }\n];'
);

fs.writeFileSync('src/data/courses.js', content);
console.log('Syntax fixes applied!');
