const fs = require('fs');

let content = fs.readFileSync('src/data/courses.js', 'utf8');
const codeToEval = content.replace('export const courses = ', 'module.exports.courses = ');
fs.writeFileSync('temp_courses.cjs', codeToEval);
const { courses } = require('./temp_courses.cjs');

// Level 1 original: intro-1, intro-2, intro-3, checkpoint-1
const l1 = courses[0].levels[0].lessons;
const newL1 = [
  {
    id: "l1-m1",
    title: "Introduction & State Changes",
    badge: "Lesson 1",
    questions: [
      ...l1[0].questions,
      ...l1[1].questions,
      ...l1[2].questions
    ]
  },
  l1[3] // checkpoint-1
];
newL1[1].badge = "Checkpoint";

// Level 2 original: usage-1, comp-1, comp-2, comp-3, comp-4, checkpoint-2
const l2 = courses[0].levels[1].lessons;
const newL2 = [
  {
    id: "l2-m1",
    title: "Usage & Basic Components",
    badge: "Lesson 2",
    questions: [
      ...l2[0].questions,
      ...l2[1].questions,
      ...l2[2].questions
    ]
  },
  {
    id: "l2-m2",
    title: "Transition Syntax & Elements",
    badge: "Lesson 3",
    questions: [
      ...l2[3].questions,
      ...l2[4].questions
    ]
  },
  l2[5] // checkpoint-2
];
newL2[2].badge = "Checkpoint";

// Level 3 original: adv-1, adv-2, adv-3, checkpoint-3
const l3 = courses[0].levels[2].lessons;
const newL3 = [
  {
    id: "l3-m1",
    title: "Drawing & Composite States",
    badge: "Lesson 4",
    questions: [
      ...l3[0].questions,
      ...l3[1].questions,
      ...l3[2].questions
    ]
  },
  l3[3] // checkpoint-3
];
newL3[1].badge = "Checkpoint";

courses[0].levels[0].lessons = newL1;
courses[0].levels[1].lessons = newL2;
courses[0].levels[2].lessons = newL3;

let newContent = 'export const courses = ' + JSON.stringify(courses, null, 2) + ';';
fs.writeFileSync('src/data/courses.js', newContent);
console.log("Restructured courses!");
