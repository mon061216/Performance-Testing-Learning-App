const fs = require('fs');
let content = fs.readFileSync('src/pages/Exercise.jsx', 'utf8');

// Normalize line endings to \n
content = content.replace(/\r\n/g, '\n');

// 1. imports
content = content.replace('import { LockoutPanel } from "./LockoutPanel";\n', 'import { MilestoneComplete } from "../components/MilestoneComplete";\n');

// 2. useOutletContext
content = content.replace(/    lives,\n    isLocked,\n    restockText,\n    handleCompleteExercise,\n    handleFailExercise\n  } = useOutletContext\(\);/g, `    xp,
    handleCompleteExercise
  } = useOutletContext();`);

// 3. remove LockoutPanel render
content = content.replace(/  if \(isLocked\) \{\s*return \(\s*<LockoutPanel[^\}]*\/>\s*\);\s*\}/g, '');

// 4. remove isLocked checks
content = content.replace(/if \(isLocked \|\| result\?\.locked\) return;/g, 'if (result?.locked) return;');
content = content.replace(/if \(isLocked\) return;/g, '');
content = content.replace(/!isLocked && /g, '');

// 5. handleFailExercise calls
content = content.replace(/    setResult\(\{ kind: "answer", locked: true, title: "Chưa chính xác!" \}\);\n    setPlacements\(question\.answer\); \/\/ Show them the correct answer\n    handleFailExercise\(\);/g, `    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });
    setPlacements(question.answer); // Show them the correct answer`);

// 6. Add showMilestoneComplete state
content = content.replace(/  const \[showExplanation, setShowExplanation\] = useState\(false\);/g, `  const [showExplanation, setShowExplanation] = useState(false);\n  const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);`);

// 7. handleNext and milestone logic
const oldNextRegex = /  const handleNext = \(\) => \{[\s\S]*?navigate\(`\/course\/\$\{course\.id\}`\);\n    \}\n  \};/g;

const newNext = `  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      const currentLevel = course.levels?.find(l => l.lessons.some(les => les.id === lesson.id));
      const isLastInLevel = currentLevel && currentLevel.lessons[currentLevel.lessons.length - 1].id === lesson.id;
      
      if (isLastInLevel) {
        setShowMilestoneComplete(true);
      } else {
        handleCompleteExercise(course.id, lessonIndex);
        navigate(\`/course/\${course.id}\`);
      }
    }
  };

  const handleMilestoneContinue = () => {
    handleCompleteExercise(course.id, lessonIndex);
    navigate(\`/course/\${course.id}\`);
  };`;
content = content.replace(oldNextRegex, newNext);

// 8. Render MilestoneComplete
const newRender = `  if (showMilestoneComplete) {
    return <MilestoneComplete xp={xp + 25} onContinue={handleMilestoneContinue} />;
  }

  return (`;
content = content.replace(/  return \(\n    <PageTransition>/g, newRender + `\n    <PageTransition>`);

fs.writeFileSync('src/pages/Exercise.jsx', content, 'utf8');
console.log('Exercise.jsx fully fixed');
