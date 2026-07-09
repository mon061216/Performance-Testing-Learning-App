const fs = require('fs');
let content = fs.readFileSync('src/pages/Exercise.jsx', 'utf8');

content = content.replace(
  /const \[showMilestoneComplete, setShowMilestoneComplete\] = useState\(false\);/,
  `const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);
  const [milestoneData, setMilestoneData] = useState(null);`
);

const oldNext = `  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      if (true) { // Always show milestone complete screen after every lesson
        setShowMilestoneComplete(true);
      } else {
        handleCompleteExercise(course.id, lessonIndex);
        navigate(\`/course/\${course.id}\`);
      }
    }
  };`;

const newNext = `  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      const data = handleCompleteExercise(course.id, lessonIndex);
      setMilestoneData(data);
      setShowMilestoneComplete(true);
    }
  };`;

content = content.replace(oldNext, newNext);

const oldContinue = `  const handleMilestoneContinue = () => {
    handleCompleteExercise(course.id, lessonIndex);
    navigate(\`/course/\${course.id}\`);
  };`;

const newContinue = `  const handleMilestoneContinue = () => {
    navigate(\`/course/\${course.id}\`);
  };`;

content = content.replace(oldContinue, newContinue);

const oldRender = `  if (showMilestoneComplete) {
    return <MilestoneComplete xp={xp + 25} onContinue={handleMilestoneContinue} />;
  }`;

const newRender = `  if (showMilestoneComplete && milestoneData) {
    return (
      <MilestoneComplete 
        xp={milestoneData.newXp} 
        streak={milestoneData.newStreak}
        streakIncreased={milestoneData.streakIncreased}
        onContinue={handleMilestoneContinue} 
      />
    );
  }`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('src/pages/Exercise.jsx', content, 'utf8');
console.log('Exercise.jsx updated');
