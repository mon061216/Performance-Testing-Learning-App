import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";
import { ShapeIcon } from "../components/ShapeIcon";
import { MilestoneComplete } from "../components/MilestoneComplete";
import { MermaidDiagram } from "../components/MermaidDiagram";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ExplanationModal } from "../components/ExplanationModal";
import { PageTransition } from "../components/PageTransition";
import { InteractiveDiagram } from "../components/InteractiveDiagram";
import { SelectableDiagram } from "../components/SelectableDiagram";

export function Exercise() {
  const { courseId, lessonIndex: lessonIndexStr } = useParams();
  const navigate = useNavigate();
  const lessonIndex = parseInt(lessonIndexStr, 10);

  const { xp, handleCompleteExercise } = useOutletContext();

  const course = courses.find((c) => c.id === courseId);
  const allLessons = course?.levels ? course.levels.flatMap(l => l.lessons) : course?.lessons;
  const lesson = allLessons?.[lessonIndex];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const question = lesson?.questions?.[currentQuestionIndex];

  const [placements, setPlacements] = useState([]);
  const [selections, setSelections] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showMilestoneComplete, setShowMilestoneComplete] = useState(false);
  const [milestoneData, setMilestoneData] = useState(null);
  const [hasFailed, setHasFailed] = useState(false);

  // Re-initialize state when route changes or question index changes
  useEffect(() => {
    if (question) {
      setPlacements(Array(question.answer?.length || 0).fill(null));
      setSelections([]);
      setAttempts(0);
      setResult(null);
      setDraggedId(null);
      setShowExplanation(false);
    }
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const shuffledCards = useMemo(() => {
    if (!question) return [];
    return [...(question.cards || [])].sort(() => Math.random() - 0.5);
  }, [courseId, lessonIndex, currentQuestionIndex, question]);

  const placedIds = placements.filter(Boolean);
  const availableCards = shuffledCards.filter((card) => !placedIds.includes(card.id));
  
  let isFilled = false;
  if (question?.selectableDiagram) {
    isFilled = selections.length > 0;
  } else {
    isFilled = placements.length > 0 && placements.every(Boolean);
  }

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



  const dropCard = (slotIndex, cardId) => {
    if (result?.locked) return;
    if (result?.kind === 'try') setResult(null);
    setPlacements((current) => {
      const next = current.map((id) => (id === cardId ? null : id));
      next[slotIndex] = cardId;
      return next;
    });
  };

  const removeCard = (slotIndex) => {
    if (result?.locked) return;
    if (result?.kind === 'try') setResult(null);
    setPlacements((current) => current.map((id, index) => (index === slotIndex ? null : id)));
  };

  const toggleSelection = (nodeId) => {
    if (result?.locked) return;
    if (result?.kind === 'try') setResult(null);
    setSelections(current => {
      if (current.includes(nodeId)) {
        return current.filter(id => id !== nodeId);
      }
      return [...current, nodeId];
    });
  };

  const retry = () => {
    setResult(null);
    setPlacements(Array(question.answer?.length || 0).fill(null));
    setSelections([]);
  };

  const showAnswer = () => {
    setHasFailed(true);
    setResult({ kind: "answer", locked: true, title: "Incorrect!" });
    if (!question.selectableDiagram) {
      setPlacements(question.answer);
    }
  };

  const checkAnswer = () => {
    let correct = false;
    
    if (question.selectableDiagram) {
      const isCountCorrect = selections.length === question.answer.length;
      const allSelectedAreCorrect = selections.every(id => question.answer.includes(id));
      correct = isCountCorrect && allSelectedAreCorrect;
    } else {
      correct = placements.every((id, index) => id === question.answer[index]);
    }

    if (correct) {
      setResult({ kind: "correct", locked: true, title: "Correct!" });
      return;
    }

    // Fail, but allow retry
    setResult({ kind: "try", locked: false, title: "Incorrect!" });
  };

  const handleNext = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setResult(null);
      setPlacements(Array(question?.answer?.length || 0).fill(null));
      setSelections([]);
      setDraggedId(null);
    } else {
      const isFailure = hasFailed || result?.kind === "answer";
      const data = handleCompleteExercise(course.id, lessonIndex, isFailure ? 0 : 25);
      setMilestoneData(data);
      setShowMilestoneComplete(true);
    }
  };

  const handleMilestoneContinue = () => {
    navigate(`/course/${course.id}`);
  };

  const findCard = (id) => question.cards?.find((card) => card.id === id);

  if (showMilestoneComplete && milestoneData) {
    return (
      <MilestoneComplete 
        xp={milestoneData.newXp} 
        streak={milestoneData.newStreak}
        streakIncreased={milestoneData.streakIncreased}
        onContinue={handleMilestoneContinue} 
      />
    );
  }

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
          {currentQuestionIndex === 0 && (
            <div className="markdown-theory">
              <ReactMarkdown>{question.theory || ""}</ReactMarkdown>
            </div>
          )}
        </div>

        {question.theoryMermaid && (
          <div className="theory-visual">
            <MermaidDiagram chart={question.theoryMermaid} />
          </div>
        )}

        <div className="exercise-instruction">
          <div className="instruction-icon">🎯</div>
          <div className="instruction-text">
            {currentQuestionIndex === 0 && <h3>Your task</h3>}
            <h2>{question.prompt}</h2>
            {currentQuestionIndex === 0 && <p>{question.description}</p>}
            {question.selectableDiagram ? (
              <p className="hint-text">💡 Click on the boxes in the diagram to select them.</p>
            ) : (
              <p className="hint-text">💡 Drag and drop the cards below into the corresponding slots.</p>
            )}
          </div>
        </div>

        <div className="interactive-widget">
          {question.selectableDiagram ? (
            <SelectableDiagram
              diagram={question.selectableDiagram}
              selections={selections}
              toggleSelection={toggleSelection}
              result={result}
              question={question}
            />
          ) : question.interactiveDiagram ? (
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
                            key={card.id}
                            layoutId={result?.kind === 'answer' ? undefined : `card-${card.id}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`shape-card placed ${card.type}`} 
                            onClick={() => removeCard(index)}
                          >
                            <ShapeIcon type={card.type} />
                            <span>{card.label}</span>
                          </motion.button>
                        ) : (
                          <span className="slot-placeholder">Drop here...</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!question.selectableDiagram && (
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
                    draggable={!result?.locked}
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
        )}

        {!result && (
           <div className="run-button-container">
              <button 
                className={`run-btn ${isFilled ? 'active' : ''}`} 
                onClick={checkAnswer}
                disabled={!isFilled}
              >
                &#9654; Check
              </button>
           </div>
        )}
      </div>
      </LayoutGroup>

      {result && (
        <footer className={`exercise-footer ${result.kind}`}>
          <div className="footer-content">
            <div className="feedback-message">
              {result.kind === 'correct' && (
                 <img src="/mascot_cheering.png" alt="Cheering Mascot" className="feedback-mascot" />
              )}
              {(result.kind === 'try' || result.kind === 'answer') && (
                 <img src="/mascot_encouraging.png" alt="Encouraging Mascot" className="feedback-mascot" />
              )}
              <h3>{result.title}</h3>
            </div>
            <div className="footer-actions">
              {result.kind === 'try' ? (
                <button className="why-btn" onClick={showAnswer}>Show answer</button>
              ) : (
                <button className="why-btn" onClick={() => setShowExplanation(true)}>Show explanation</button>
              )}
              {result.kind === 'try' ? (
                <button className="continue-btn" onClick={retry}>Try again</button>
              ) : (
                <button className="continue-btn" onClick={handleNext}>Continue</button>
              )}
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
