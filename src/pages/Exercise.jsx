import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";
import { ShapeIcon } from "../components/ShapeIcon";
import { LockoutPanel } from "./LockoutPanel";

export function Exercise() {
  const { courseId, lessonIndex: lessonIndexStr } = useParams();
  const navigate = useNavigate();
  const lessonIndex = parseInt(lessonIndexStr, 10);

  const {
    lives,
    isLocked,
    restockText,
    handleCompleteExercise,
    handleFailExercise
  } = useOutletContext();

  const course = courses.find((c) => c.id === courseId);

  const lesson = course?.lessons?.[lessonIndex];
  const questionIndex = 0; // The source code had state-based questionIndex but initialized to 0, let's keep track of it if there are multiple questions.
  // Wait, let's look at how questionIndex was managed in the original Exercise component.
  // In the original component:
  // const [questionIndex, setQuestionIndex] = useState(0);
  // const question = lesson.questions[questionIndex];
  // Yes! The component itself tracks questionIndex in state.

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const question = lesson?.questions?.[currentQuestionIndex];

  const [placements, setPlacements] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  // Re-initialize state when route changes or question index changes
  useEffect(() => {
    if (question) {
      setPlacements(Array(question.answer.length).fill(null));
      setAttempts(0);
      setResult(null);
      setDraggedId(null);
    }
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const shuffledCards = useMemo(() => {
    if (!question) return [];
    return [...question.cards].sort(() => Math.random() - 0.5);
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const placedIds = placements.filter(Boolean);
  const availableCards = shuffledCards.filter((card) => !placedIds.includes(card.id));
  const isFilled = placements.length > 0 && placements.every(Boolean);

  const isFirstLesson = lessonIndex === 0;
  const isSwimlane = course?.id === "swimlane";
  const isBranched = lesson?.isBranched;
  const layoutClass = isFirstLesson ? "slots-grid" : isBranched ? "slots-branch" : isSwimlane ? "slots-swimlane" : "slots-flow";

  const randomDescription = useMemo(() => {
    if (!question) return "";
    if (Array.isArray(question.description)) {
      return question.description[Math.floor(Math.random() * question.description.length)];
    }
    return question.description;
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  if (!course || !lesson || !question) {
    return (
      <main className="exercise">
        <h2>Lesson not found</h2>
        <button className="ghost-button" onClick={() => navigate("/")}>Back to Home</button>
      </main>
    );
  }

  if (isLocked) {
    return <LockoutPanel restockText={restockText} onBack={() => navigate(`/course/${course.id}`)} />;
  }

  const resetQuestion = () => {
    setPlacements(Array(question.answer.length).fill(null));
    setAttempts(0);
    setResult(null);
    setDraggedId(null);
  };

  const dropCard = (slotIndex, cardId) => {
    if (isLocked || result?.locked) return;
    setPlacements((current) => {
      const next = current.map((id) => (id === cardId ? null : id));
      next[slotIndex] = cardId;
      return next;
    });
  };

  const removeCard = (slotIndex) => {
    if (isLocked || result?.locked) return;
    setPlacements((current) => current.map((id, index) => (index === slotIndex ? null : id)));
  };

  const checkAnswer = () => {
    if (isLocked) return;
    const correct = placements.every((id, index) => id === question.answer[index]);
    if (correct) {
      setResult({ kind: "correct", locked: true, title: "Great diagram!", text: question.explanation });
      setTimeout(() => {
        if (currentQuestionIndex < lesson.questions.length - 1) {
          setCurrentQuestionIndex((i) => i + 1);
        } else {
          handleCompleteExercise(course.id, lessonIndex);
          navigate(`/course/${course.id}`);
        }
      }, 1500);
      return;
    }

    if (attempts === 0) {
      setAttempts(1);
      setResult({ kind: "try", locked: false, title: "Almost.", text: "Rearrange the shapes and try one more time." });
      return;
    }

    setAttempts(2);
    setResult({ kind: "answer", locked: true, title: "Answer revealed", text: question.explanation });
    setPlacements(question.answer);
    handleFailExercise();

    setTimeout(() => {
      if (lives - 1 <= 0) {
        navigate(`/course/${course.id}`);
      }
    }, 2000);
  };

  const findCard = (id) => question.cards.find((card) => card.id === id);

  return (
    <main className="exercise" style={{ "--accent": course.accent }}>
      <header className="exercise-header">
        <button className="ghost-button" onClick={() => navigate(`/course/${course.id}`)}>&times; Quit</button>
        <div className="progress-track" style={{ flex: 1, margin: "0 20px" }}>
          <span style={{ width: `${Math.round((currentQuestionIndex / lesson.questions.length) * 100)}%` }} />
        </div>
      </header>

      <div className="exercise-copy">
        <span className="lesson-pill">
          Lesson {lessonIndex + 1} of {course.lessons.length}
          {lesson.questions.length > 1 ? ` | Question ${currentQuestionIndex + 1} of ${lesson.questions.length}` : ""}
        </span>
        <h1>{question.prompt}</h1>
        {question.scenario && (
          <div className="scenario-box">
            <p>{question.scenario}</p>
          </div>
        )}
        {randomDescription && <p className="description-text">{randomDescription}</p>}
      </div>

      <div className="workspace">
        <section className={`slots-container ${layoutClass}`} aria-label="Answer slots">
          {question.slots.map((slot, index) => {
            const card = placements[index] ? findCard(placements[index]) : null;
            const isCorrect = result?.locked && placements[index] === question.answer[index];

            const slotContent = (
              <div
                key={`${slot}-${index}`}
                className={`slot ${card ? "filled" : ""} ${isCorrect ? "slot-correct" : ""}`}
                style={isSwimlane && !isFirstLesson ? { marginLeft: `${index * 40}px` } : {}}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => draggedId && dropCard(index, draggedId)}
              >
                <span className="slot-number">{index + 1}</span>
                {!isSwimlane || isFirstLesson ? <small>{slot}</small> : null}
                {card ? (
                  <button className={`shape-card placed ${card.type}`} onClick={() => removeCard(index)}>
                    <ShapeIcon type={card.type} />
                    <span>{card.label}</span>
                  </button>
                ) : (
                  <span className="empty-slot">Drop shape</span>
                )}
              </div>
            );

            // Swimlane wrappers
            if (isSwimlane && !isFirstLesson) {
              return (
                <div className="swimlane-row" key={`${slot}-row-${index}`}>
                  <div className="swimlane-header">{slot}</div>
                  <div className="swimlane-cell">
                    {slotContent}
                  </div>
                </div>
              );
            }

            return slotContent;
          })}
        </section>

        <section className="bank" aria-label="Draggable shapes">
          <div className="bank-head">
            <strong>Shape bank</strong>
            <span>{availableCards.length} left</span>
          </div>
          <div className="cards">
            {availableCards.map((card) => (
              <button
                key={card.id}
                draggable={!isLocked && !result?.locked}
                className={`shape-card ${card.type}`}
                onDragStart={() => setDraggedId(card.id)}
                onDragEnd={() => setDraggedId(null)}
                onClick={() => {
                  const emptyIndex = placements.findIndex((id) => !id);
                  if (emptyIndex >= 0) dropCard(emptyIndex, card.id);
                }}
              >
                <ShapeIcon type={card.type} />
                <span>{card.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {result && (
        <div className={`feedback ${result.kind}`}>
          <strong>{result.title}</strong>
          <span>{result.text}</span>
        </div>
      )}

      <div className="actions">
        <button className="ghost-button" onClick={resetQuestion} disabled={isLocked}>Reset</button>
        <button className="primary-button" onClick={checkAnswer} disabled={isLocked || !isFilled || result?.kind === "correct"}>
          {attempts === 0 ? "Check answer" : result?.locked ? "Answer shown" : "Check again"}
        </button>
      </div>
    </main>
  );
}
