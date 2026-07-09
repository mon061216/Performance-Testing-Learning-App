const fs = require('fs');
let content = fs.readFileSync('src/pages/Exercise.jsx', 'utf8');

// 1. imports
content = content.replace('import { LockoutPanel } from "./LockoutPanel";', 'import { MilestoneComplete } from "../components/MilestoneComplete";');

// 2. useOutletContext
content = content.replace(`    lives,
    isLocked,
    restockText,
    handleCompleteExercise,
    handleFailExercise
  } = useOutletContext();`, `    xp,
    handleCompleteExercise
  } = useOutletContext();`);

// 3. remove LockoutPanel render
content = content.replace(/  if \(isLocked\) \{\s*return \(\s*<LockoutPanel[^\}]*\/>\s*\);\s*\}/, '');

// 4. remove isLocked checks
content = content.replace(/if \(isLocked \|\| result\?\.locked\) return;/g, 'if (result?.locked) return;');
content = content.replace(/if \(isLocked\) return;/g, '');
content = content.replace(/!isLocked && /g, '');

// 5. handleFailExercise calls
content = content.replace(`    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });
    setPlacements(question.answer); // Show them the correct answer
    handleFailExercise();`, `    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });
    setPlacements(question.answer); // Show them the correct answer`);

// 6. Add showMilestoneComplete state
content = content.replace(`  const [showExplanation, setShowExplanation] = useState(false);`, `  const [showExplanation, setShowExplanation] = useState(false);\n  const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);`);

// 7. handleNext and milestone logic
const oldNext = `  const handleNext = () => {
    // Check if lives reached 0, if so, redirect immediately (handled by handleFailExercise or LockoutPanel)
    // But since handleFailExercise just sets lives, the parent might already switch to LockoutPanel.
    // If not locked out, we can move to the next question or complete.
    
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      // Cho phép qua bài luôn dù làm sai, vì người dùng đã xem giải thích
      handleCompleteExercise(course.id, lessonIndex);
      navigate(\`/course/\${course.id}\`);
    }
  };`;

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
content = content.replace(oldNext, newNext);

// 8. Render MilestoneComplete
const newRender = `  if (showMilestoneComplete) {
    return <MilestoneComplete xp={xp + 25} onContinue={handleMilestoneContinue} />;
  }

  return (`;
content = content.replace(`  return (
    <PageTransition>`, newRender + `\n    <PageTransition>`);
content = content.replace(`  return (\r\n    <PageTransition>`, newRender + `\r\n    <PageTransition>`);

fs.writeFileSync('src/pages/Exercise.jsx', content, 'utf8');
console.log('Exercise.jsx fixed');
