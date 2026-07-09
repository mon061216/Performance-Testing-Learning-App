const fs = require('fs');
let appContent = fs.readFileSync('src/app/App.jsx', 'utf8');

const newAppContent = appContent.replace(
  /  const \[xp, setXp\] = useState\(0\);\n  const \[streak, setStreak\] = useState\(1\);/,
  `  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp') || '0', 10));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak') || '0', 10));
  const [lastDate, setLastDate] = useState(() => localStorage.getItem('lastDate') || '');`
).replace(
  /  const handleCompleteExercise = \(courseId, lessonIndex\) => {[\s\S]*?  };/,
  `  const handleCompleteExercise = (courseId, lessonIndex) => {
    let streakIncreased = false;
    let newStreak = streak;

    const today = new Date().toDateString();
    if (today !== lastDate) {
      streakIncreased = true;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate === yesterday.toDateString()) {
        newStreak = streak + 1;
      } else {
        newStreak = 1;
      }
      
      setStreak(newStreak);
      setLastDate(today);
      localStorage.setItem('streak', newStreak);
      localStorage.setItem('lastDate', today);
    }

    const newXp = xp + 25;
    setXp(newXp);
    localStorage.setItem('xp', newXp);

    setCompleted((current) => ({
      ...current,
      [courseId]: Math.max(current[courseId] || 0, lessonIndex + 1),
    }));

    return { streakIncreased, newStreak, newXp };
  };`
);

fs.writeFileSync('src/app/App.jsx', newAppContent, 'utf8');
console.log('App.jsx updated');
