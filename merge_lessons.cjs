const fs = require('fs');

function extractAndRemoveLesson(content, lessonId) {
  const regex = new RegExp(`\\{\\s*id:\\s*"${lessonId}"[\\s\\S]*?questions:\\s*\\[([\\s\\S]*?)\\]\\s*\\},?`);
  const match = content.match(regex);
  if (!match) return { content, questionString: null };
  const questionString = match[1].trim();
  const newContent = content.replace(regex, '');
  return { content: newContent, questionString };
}

let content = fs.readFileSync('src/data/courses.js', 'utf8');

// Level 2
const c3 = extractAndRemoveLesson(content, 'components-3');
content = c3.content;
const c5 = extractAndRemoveLesson(content, 'components-5');
content = c5.content;

if (c3.questionString && c5.questionString) {
  content = content.replace(/id:\s*"checkpoint-2"[\s\S]*?questions:\s*\[([\s\S]*?)\}(?=\s*\]\s*\})/, (match, q1) => {
    return match + `,\n${c3.questionString},\n${c5.questionString}`;
  });
}

// Level 3
const a4 = extractAndRemoveLesson(content, 'advanced-4');
content = a4.content;
const a5 = extractAndRemoveLesson(content, 'advanced-5');
content = a5.content;

if (a4.questionString && a5.questionString) {
  content = content.replace(/id:\s*"checkpoint-3"[\s\S]*?questions:\s*\[([\s\S]*?)\}(?=\s*\]\s*\})/, (match, q1) => {
    return match + `,\n${a4.questionString},\n${a5.questionString}`;
  });
}

fs.writeFileSync('src/data/courses.js', content);
