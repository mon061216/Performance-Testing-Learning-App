import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { MAX_LIVES, RESTOCK_MS } from "../data/courses";
import { useTimer, formatTimeLeft } from "../hooks/useTimer";
import { StatBar } from "../components/StatBar";

export default function App() {
  const [lives, setLives] = useState(MAX_LIVES);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [completed, setCompleted] = useState({});
  const [lockUntil, setLockUntil] = useState(null);
  const now = useTimer();

  const isLocked = lives <= 0 && lockUntil && now < lockUntil;
  const restockText = isLocked ? formatTimeLeft(lockUntil - now) : "0m 00s";

  useEffect(() => {
    if (lockUntil && now >= lockUntil) {
      setLives(MAX_LIVES);
      setLockUntil(null);
    }
  }, [lockUntil, now]);

  const handleCompleteExercise = (courseId, lessonIndex) => {
    setXp((v) => v + 25);
    setStreak((v) => v + 1);
    setCompleted((current) => ({
      ...current,
      [courseId]: Math.max(current[courseId] || 0, lessonIndex + 1),
    }));
  };

  const handleFailExercise = () => {
    setLives((value) => {
      const nextLives = Math.max(0, value - 1);
      if (nextLives === 0) setLockUntil(Date.now() + RESTOCK_MS);
      return nextLives;
    });
  };

  return (
    <div className="app-shell">
      <StatBar lives={lives} xp={xp} streak={streak} isLocked={isLocked} restockText={restockText} />
      <div className="app-grid-full">
        <Outlet context={{
          lives,
          setLives,
          xp,
          setXp,
          streak,
          setStreak,
          completed,
          setCompleted,
          lockUntil,
          setLockUntil,
          isLocked,
          restockText,
          handleCompleteExercise,
          handleFailExercise
        }} />
      </div>
    </div>
  );
}
