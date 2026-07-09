const fs = require('fs');
let content = fs.readFileSync('src/temp_ex.js', 'utf8');

content = content.replace('import { LockoutPanel } from "./LockoutPanel";', 'import { MilestoneComplete } from "../components/MilestoneComplete";');

content = content.replace('    lives,\n    isLocked,\n    restockText,\n    handleCompleteExercise,\n    handleFailExercise\n  } = useOutletContext();', '    xp,\n    handleCompleteExercise\n  } = useOutletContext();');

content = content.replace(/  if \(isLocked\) {[\s\S]*?    \);\n  }\n/m, '');

content = content.replace(/if \(isLocked \|\| result\?\.locked\) return;/g, 'if (result?.locked) return;');
content = content.replace(/if \(isLocked\) return;/g, '');
content = content.replace(/!isLocked && /g, '');

content = content.replace('    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });\n    setPlacements(question.answer); // Show them the correct answer\n    handleFailExercise();', '    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });\n    setPlacements(question.answer); // Show them the correct answer');

content = content.replace('  const [showExplanation, setShowExplanation] = useState(false);', '  const [showExplanation, setShowExplanation] = useState(false);\n  const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);');

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

const renderCheck = `  if (showMilestoneComplete) {
    return <MilestoneComplete xp={xp + 25} onContinue={handleMilestoneContinue} />;
  }

  return (`;
content = content.replace('  return (\r\n    <PageTransition>', renderCheck + '\r\n    <PageTransition>');
content = content.replace('  return (\n    <PageTransition>', renderCheck + '\n    <PageTransition>');

fs.writeFileSync('src/pages/Exercise.jsx', content, 'utf8');
console.log('Exercise.jsx updated');
