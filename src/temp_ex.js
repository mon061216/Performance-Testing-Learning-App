import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";
import { ShapeIcon } from "../components/ShapeIcon";
import { LockoutPanel } from "./LockoutPanel";
import { MermaidDiagram } from "../components/MermaidDiagram";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ExplanationModal } from "../components/ExplanationModal";
import { PageTransition } from "../components/PageTransition";
import { InteractiveDiagram } from "../components/InteractiveDiagram";

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
  const allLessons = course?.levels ? course.levels.flatMap(l => l.lessons) : course?.lessons;
  const lesson = allLessons?.[lessonIndex];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const question = lesson?.questions?.[currentQuestionIndex];

  const [placements, setPlacements] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Re-initialize state when route changes or question index changes
  useEffect(() => {
    if (question) {
      setPlacements(Array(question.answer.length).fill(null));
      setAttempts(0);
      setResult(null);
      setDraggedId(null);
      setShowExplanation(false);
    }
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const shuffledCards = useMemo(() => {
    if (!question) return [];
    return [...question.cards].sort(() => Math.random() - 0.5);
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const placedIds = placements.filter(Boolean);
  const availableCards = shuffledCards.filter((card) => !placedIds.includes(card.id));
  const isFilled = placements.length > 0 && placements.every(Boolean);

  if (!course || !lesson || !question) {
    return (
      <PageTransition>
        <main className="exercise centered-layout">
          <h2>Lesson not found</h2>
          <button className="ghost-button" onClick={() => navigate("/")}>Back to Home</button>
        </main>
      </PageTransition>
    );
  }

  if (isLocked) {
    return (
      <PageTransition>
        <LockoutPanel restockText={restockText} onBack={() => navigate(`/course/${course.id}`)} />
      </PageTransition>
    );
  }

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
      setResult({ kind: "correct", locked: true, title: "ChÃ­nh xÃ¡c!" });
      return;
    }

    // Immediately fail, no retry
    setResult({ kind: "answer", locked: true, title: "ChÆ°a chÃ­nh xÃ¡c!" });
    setPlacements(question.answer); // Show them the correct answer
    handleFailExercise();
  };

  const handleNext = () => {
    // Check if lives reached 0, if so, redirect immediately (handled by handleFailExercise or LockoutPanel)
    // But since handleFailExercise just sets lives, the parent might already switch to LockoutPanel.
    // If not locked out, we can move to the next question or complete.
    
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      // Cho phÃ©p qua bÃ i luÃ´n dÃ¹ lÃ m sai, vÃ¬ ngÆ°á»i dÃ¹ng Ä‘Ã£ xem giáº£i thÃ­ch
      handleCompleteExercise(course.id, lessonIndex);
      navigate(`/course/${course.id}`);
    }
  };

  const findCard = (id) => question.cards.find((card) => card.id === id);

  return (
    <PageTransition>
    <main className="exercise centered-layout" style={{ "--accent": course.accent }}>
      
      <div className="centered-header">
        <button className="close-lesson" onClick={() => navigate(`/course/${course.id}`)}>&times;</button>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${((currentQuestionIndex + 1) / lesson.questions.length) * 100}%`}}></div>
        </div>
      </div>

      <LayoutGroup>
      <div className="exercise-content">
        <div className="prompt-header">
          <div className="markdown-theory">
            <ReactMarkdown>{question.theory || ""}</ReactMarkdown>
          </div>
        </div>

        {question.theoryMermaid && (
          <div className="theory-visual">
            <MermaidDiagram chart={question.theoryMermaid} />
          </div>
        )}

        <div className="exercise-instruction">
          <div className="instruction-icon">ðŸŽ¯</div>
          <div className="instruction-text">
            <h3>Nhiá»‡m vá»¥ cá»§a báº¡n</h3>
            <h2>{question.prompt}</h2>
            <p>{question.description}</p>
            <p className="hint-text">ðŸ’¡ KÃ©o tháº£ cÃ¡c tháº» bÃªn dÆ°á»›i vÃ o Ã´ trá»‘ng tÆ°Æ¡ng á»©ng.</p>
          </div>
        </div>

        <div className="interactive-widget">
          {question.interactiveDiagram ? (
            <InteractiveDiagram 
              diagram={question.interactiveDiagram}
              placements={placements}
              question={question}
              result={result}
              draggedId={draggedId}
              dropCard={dropCard}
              removeCard={removeCard}
            />
          ) : (
            <div className="widget-slots">
              {question.slots.map((slot, index) => {
                const card = placements[index] ? findCard(placements[index]) : null;
                const isCorrect = result?.locked && placements[index] === question.answer[index];
                const isWrong = result?.kind === 'try' && placements[index] !== question.answer[index] && placements[index];

                return (
                  <div key={`${slot}-${index}`} className="slot-wrapper">
                    <div className="slot-label">{slot}</div>
                    <div
                      className={`widget-slot ${card ? "filled" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => draggedId && dropCard(index, draggedId)}
                    >
                      <span className="slot-number">{index + 1}</span>
                      <div className="slot-content">
                        {card ? (
                          <motion.button 
                            layoutId={`card-${card.id}`}
                            className={`shape-card placed ${card.type}`} 
                            onClick={() => removeCard(index)}
                          >
                            <ShapeIcon type={card.type} />
                            <span>{card.label}</span>
                          </motion.button>
                        ) : (
                          <span className="slot-placeholder">KÃ©o tháº£ vÃ o Ä‘Ã¢y...</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="available-cards-container">
          <div className="cards-horizontal">
            <AnimatePresence>
              {availableCards.map((card) => (
                <motion.button
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
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
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {!result && (
           <div className="run-button-container">
              <button 
                className={`run-btn ${isFilled ? 'active' : ''}`} 
                onClick={checkAnswer}
                disabled={!isFilled}
              >
                &#9654; Kiá»ƒm tra
              </button>
           </div>
        )}
      </div>
      </LayoutGroup>

      {result && (
        <footer className={`exercise-footer ${result.kind}`}>
          <div className="footer-content">
            <div className="feedback-message">
              <h3>{result.title}</h3>
            </div>
            <div className="footer-actions">
              <button className="why-btn" onClick={() => setShowExplanation(true)}>Xem giáº£i thÃ­ch</button>
              <button className="continue-btn" onClick={handleNext}>Tiáº¿p tá»¥c</button>
            </div>
          </div>
        </footer>
      )}

      <ExplanationModal 
        isOpen={showExplanation} 
        onClose={() => setShowExplanation(false)} 
        explanation={question.explanation} 
        explanationMermaid={question.explanationMermaid}
      />
    </main>
    </PageTransition>
  );
}

