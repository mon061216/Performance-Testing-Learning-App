import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { COURSES } from "@/data/courses";

export function useAppState() {
  const navigate = useNavigate();

  const [completedLessons, setCompletedLessons] = useState({});
  const [xp, setXp] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [streak] = useState(3);
  const [showXp, setShowXp] = useState(false);
  const [lastXp, setLastXp] = useState(0);

  // Keep track of active course/lesson for transitions
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const handleLessonComplete = useCallback(
    (courseId, lessonIndex, correct) => {
      const currentCourse = COURSES.find((c) => c.id === courseId);
      const currentLesson = currentCourse?.lessons[lessonIndex];
      if (!currentCourse || !currentLesson) return;

      setActiveCourseId(courseId);
      setActiveLessonIndex(lessonIndex);

      const gained = correct
        ? currentLesson.xp
        : Math.max(2, Math.floor(currentLesson.xp * 0.2));

      if (!correct) setHearts((h) => Math.max(0, h - 1));
      setXp((x) => x + gained);
      setLastXp(gained);
      setCompletedLessons((prev) => {
        const ex = prev[courseId] || [];
        return ex.includes(lessonIndex)
          ? prev
          : { ...prev, [courseId]: [...ex, lessonIndex] };
      });
      setShowXp(true);
    },
    [],
  );

  const handleXpDone = useCallback(() => {
    setShowXp(false);
    const currentCourse = COURSES.find((c) => c.id === activeCourseId);
    if (!currentCourse) return;

    if (hearts <= 0) {
      navigate("/out-of-hearts");
      return;
    }

    const next = activeLessonIndex + 1;
    if (next >= currentCourse.lessons.length) {
      navigate(`/course/${activeCourseId}/complete`);
    } else {
      navigate(`/course/${activeCourseId}/lesson/${next}`);
    }
  }, [activeCourseId, activeLessonIndex, hearts, navigate]);

  const handleRefill = useCallback(() => {
    setHearts(5);
  }, []);

  return {
    completedLessons,
    xp,
    hearts,
    streak,
    showXp,
    lastXp,
    handleLessonComplete,
    handleXpDone,
    handleRefill,
  };
}
