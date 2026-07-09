const fs = require('fs');
let content = fs.readFileSync('src/pages/Exercise.jsx', 'utf8');

content = content.replace(/\r\n/g, '\n');

// 1. imports
content = content.replace('import { LockoutPanel } from "./LockoutPanel";\n', 'import { MilestoneComplete } from "../components/MilestoneComplete";\n');

// 2. useOutletContext
content = content.replace(`  const { 
    courseId: paramCourseId, 
    lessonIndex: paramLessonIndex 
  } = useParams();
  const { 
    lives,
    isLocked,
    restockText,
    handleCompleteExercise,
    handleFailExercise
  } = useOutletContext();`, `  const { 
    courseId: paramCourseId, 
    lessonIndex: paramLessonIndex 
  } = useParams();
  const { 
    xp,
    handleCompleteExercise
  } = useOutletContext();`);

// 3. remove LockoutPanel render
const lockoutPattern = `  if (isLocked) {
    return (
      <LockoutPanel 
        restockText={restockText} 
        courseId={course.id} 
      />
    );
  }`;
content = content.replace(lockoutPattern, '');

// 4. remove isLocked checks
content = content.replace('if (isLocked || result?.locked) return;', 'if (result?.locked) return;');
content = content.replace('if (isLocked) return;', '');
content = content.replace('!isLocked && ', '');

// 5. handleFailExercise calls
const failPattern = `    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });
    setPlacements(question.answer); // Show them the correct answer
    handleFailExercise();`;
const newFailPattern = `    setResult({ kind: "answer", locked: true, title: "Chưa chính xác!" });
    setPlacements(question.answer); // Show them the correct answer`;
content = content.replace(failPattern, newFailPattern);

// 6. Add showMilestoneComplete state
content = content.replace('  const [showExplanation, setShowExplanation] = useState(false);', `  const [showExplanation, setShowExplanation] = useState(false);\n  const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);`);

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
const oldRender = `  return (
    <PageTransition>`;
const newRender = `  if (showMilestoneComplete) {
    return <MilestoneComplete xp={xp + 25} onContinue={handleMilestoneContinue} />;
  }

  return (
    <PageTransition>`;
content = content.replace(oldRender, newRender);

fs.writeFileSync('src/pages/Exercise.jsx', content, 'utf8');
console.log('Exercise.jsx fully fixed using script 3');
