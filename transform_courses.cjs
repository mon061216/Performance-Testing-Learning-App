const fs = require('fs');

let content = fs.readFileSync('src/data/courses.js', 'utf8');

const codeToEval = content.replace('export const courses = ', 'module.exports.courses = ');
fs.writeFileSync('temp_courses.cjs', codeToEval);

const { courses } = require('./temp_courses.cjs');

courses.forEach(course => {
  if (course.levels) {
    course.levels.forEach((level, levelIdx) => {
      if (level.lessons) {
        const milestones = [];
        let currentMilestone = { id: 'l' + levelIdx + '-m1', title: 'Concepts', lessons: [] };
        
        level.lessons.forEach(lesson => {
          if (lesson.badge === 'Checkpoint') {
            if (currentMilestone.lessons.length > 0) {
              milestones.push(currentMilestone);
            }
            milestones.push({
              id: 'l' + levelIdx + '-chk',
              title: lesson.title,
              badge: 'Checkpoint',
              lessons: [lesson]
            });
            currentMilestone = { id: 'l' + levelIdx + '-m' + (milestones.length + 1), title: 'More Concepts', lessons: [] };
          } else {
            currentMilestone.lessons.push(lesson);
          }
        });
        
        if (currentMilestone.lessons.length > 0) {
          milestones.push(currentMilestone);
        }
        
        level.milestones = milestones;
        delete level.lessons;
      }
    });
  }
});

let newContent = 'export const courses = ' + JSON.stringify(courses, null, 2) + ';';

fs.writeFileSync('src/data/courses.js', newContent);
console.log("Transformed!");
