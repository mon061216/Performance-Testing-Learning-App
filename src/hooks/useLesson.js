import { useState, useEffect } from "react";
import { useParams } from "react-router";
import confetti from "canvas-confetti";
import { COURSES } from "@/data/courses";

export function useLesson(hearts, onComplete) {
  const { courseId, lessonIndex } = useParams();

  const idx = parseInt(lessonIndex, 10);
  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons[idx];

  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isDragDone, setIsDragDone] = useState(false);

  // Reset local state when switching lessons
  useEffect(() => {
    setAnswer(null);
    setChecked(false);
    setShowResult(false);
    setIsDragDone(false);
  }, [courseId, lessonIndex]);

  const content = lesson?.content;
  const progress = course ? (idx / course.lessons.length) * 100 : 0;
  const canCheck = content?.kind === "drag-match" ? isDragDone : answer !== null;

  function handleCheck() {
    if (!canCheck) return;
    setChecked(true);
    setShowResult(true);
    if (content?.kind === "drag-match" || answer === true) {
      confetti({
        particleCount: 90,
        spread: 65,
        origin: { y: 0.65 },
        colors: ["#58CC02", "#FFD900", "#1CB0F6"],
        disableForReducedMotion: true,
      });
    }
  }

  function handleDragReady(correct) {
    setIsDragDone(true);
    setAnswer(correct);
    setChecked(true);
    setShowResult(true);
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#58CC02", "#FFD900", "#1CB0F6"],
      disableForReducedMotion: true,
    });
  }

  function handleContinue() {
    if (course) {
      onComplete(course.id, idx, content?.kind === "drag-match" ? true : answer);
    }
  }

  const explanation =
    content?.kind === "mcq"
      ? content.explanation
      : content?.kind === "true-false"
        ? content.explanation
        : content?.kind === "drag-match"
          ? "All pairs matched correctly! Great pattern recognition."
          : answer
            ? "Correct sequence! You understand the process flow."
            : "Not quite — review the order and try remembering the logical progression.";

  const isCorrect = content?.kind === "drag-match" ? true : answer === true;

  return {
    course,
    lesson,
    idx,
    progress,
    answer,
    checked,
    showResult,
    isDragDone,
    canCheck,
    isCorrect,
    explanation,
    handleCheck,
    handleDragReady,
    handleContinue,
    setAnswer,
  };
}
