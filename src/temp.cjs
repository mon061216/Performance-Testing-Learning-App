const fs = require('fs');
let lines = fs.readFileSync('src/data/courses.js', 'utf8').split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === ']' && lines[i+1]?.trim() === '},' && lines[i+2]?.trim() === '{') {
    if (lines[i+3]?.includes('title: "Cấu tạo & Nguyên lý"')) {
      lines[i] = '      },';
      lines[i+1] = '      {';
      lines[i+2] = '        title: "Cấu tạo & Nguyên lý",';
      lines[i+3] = '';
    } else if (lines[i+3]?.includes('title: "Phân tích Nâng cao"')) {
      // First Phân tích Nâng cao (components-4)
      lines[i] = '      },';
      lines[i+1] = '      {';
      lines[i+2] = '        title: "Phân tích Nâng cao",';
      lines[i+3] = '';
    }
  }
  
  if (lines[i].trim() === '}' && lines[i+1]?.trim() === ']' && lines[i+2]?.trim() === '},' && lines[i+3]?.trim() === '{' && lines[i+4]?.includes('title: "Phân tích Nâng cao"')) {
    // This is the merge of adv-1 into components-4's level.
    // lines[i] is '      }' which closes components-4. We need to replace lines[i+1] to lines[i+4] with nothing, and add a comma to lines[i].
    lines[i] = '      },';
    lines[i+1] = '';
    lines[i+2] = '';
    lines[i+3] = '';
    lines[i+4] = '';
    lines[i+5] = ''; // wait, line i+5 is `    lessons: [` which also needs to be removed!
  }
}

// Remove empty lines
lines = lines.filter(l => l !== '');
fs.writeFileSync('src/data/courses.js', lines.join('\n'), 'utf8');
console.log('Fixed');
