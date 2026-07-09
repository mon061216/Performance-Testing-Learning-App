import React, { useState } from "react";
import { useLocation, useOutlet } from "react-router";
import { AnimatePresence } from "motion/react";
import { StatBar } from "../components/StatBar";

export default function App() {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('app_xp_v3') || '0', 10));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('app_streak_v3') || '0', 10));
  const [lastDate, setLastDate] = useState(() => localStorage.getItem('app_lastDate_v3') || '');
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('app_completed_v3')) || {};
    } catch {
      return {};
    }
  });
  const location = useLocation();

  const handleCompleteExercise = (courseId, lessonIndex, xpAmount = 25) => {
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
      localStorage.setItem('app_streak_v3', newStreak);
      localStorage.setItem('app_lastDate_v3', today);
    }

    const newXp = xp + xpAmount;
    setXp(newXp);
    localStorage.setItem('app_xp_v3', newXp);

    setCompleted((current) => {
      const newCompleted = {
        ...current,
        [courseId]: Math.max(current[courseId] || 0, lessonIndex + 1),
      };
      localStorage.setItem('app_completed_v3', JSON.stringify(newCompleted));
      return newCompleted;
    });

    return { streakIncreased, newStreak, newXp, gainedXp: xpAmount };
  };

  const element = useOutlet({
    xp, setXp, streak, setStreak,
    completed, setCompleted, handleCompleteExercise
  });

  return (
    <div className="app-shell">
      <StatBar xp={xp} streak={streak} />
      <div className="app-grid-full" style={{ overflowX: 'hidden' }}>
        <AnimatePresence mode="wait">
          {element && React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </div>
    </div>
  );
}
