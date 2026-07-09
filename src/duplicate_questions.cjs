const fs = require('fs');
const code = fs.readFileSync('src/data/courses.js', 'utf8');

let newCode = '';
const parts = code.split('questions: [');
newCode += parts[0];

for (let j = 1; j < parts.length; j++) {
  let part = parts[j];
  let qStart = part.indexOf('{');
  
  let open = 0;
  let qEnd = -1;
  let inString = false;
  let inBacktick = false;
  
  for(let k = qStart; k < part.length; k++) {
    if (part[k] === '`') inBacktick = !inBacktick;
    if (!inBacktick && part[k] === '"') inString = !inString;
    
    if (!inBacktick && !inString) {
      if (part[k] === '{') open++;
      if (part[k] === '}') {
        open--;
        if (open === 0) {
          qEnd = k;
          break;
        }
      }
    }
  }
  
  let questionStr = part.substring(qStart, qEnd + 1);
  let afterQ = part.substring(qEnd + 1);
  let nextQ = afterQ.indexOf('{');
  let endArray = afterQ.indexOf(']');
  
  if (nextQ !== -1 && nextQ < endArray) {
    // Already multiple questions
    newCode += 'questions: [' + part;
  } else {
    // Duplicate the question, but for the 2nd and 3rd, we need to REMOVE theory and description.
    // However, the user said "từ lesson 2 trở đi không cần cung cấp lý thuyết nữa...".
    // Wait! I already implemented conditional rendering in Exercise.jsx to hide theory and description for currentQuestionIndex > 0 !!!
    // So the data can remain EXACTLY THE SAME! I just need to duplicate the object!
    // BUT wait! I haven't implemented that conditional rendering in Exercise.jsx yet!
    // I should implement it in Exercise.jsx, and then here I just need to duplicate the question string.
    newCode += 'questions: [\n          ' + questionStr + ',\n          ' + questionStr + ',\n          ' + questionStr + '\n        ' + afterQ;
  }
}

fs.writeFileSync('src/data/courses.js', newCode, 'utf8');
console.log('Done!');
