const fs = require('fs');
let lines = fs.readFileSync('src/data/courses.js', 'utf8').split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i] === '  {') {
    if (lines[i+1] && lines[i+1].includes('title: "Phân tích Nâng cao"') && lines[i+3] && lines[i+3].includes('id: "adv-1"')) {
      lines.splice(i-2, 5, '      },');
    }
    else if (lines[i+1] && lines[i+1].includes('title: "Phân tích Nâng cao"')) {
      lines.splice(i-2, 3, '      },', '      {');
    }
    else if (lines[i+1] && lines[i+1].includes('title: "Cấu tạo & Nguyên lý"')) {
      lines.splice(i-2, 3, '      },', '      {');
    }
  }
}
fs.writeFileSync('src/data/courses.js', lines.join('\n'), 'utf8');
console.log('Fixed');
