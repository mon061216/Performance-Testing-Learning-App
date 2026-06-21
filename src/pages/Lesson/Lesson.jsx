import { Navigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/helpers";
import AuroraBackground from "@/components/common/AuroraBackground";
import ConceptDiagram from "@/components/diagrams/ConceptDiagram";
import MCQLesson from "@/components/lessons/MCQLesson";
import TrueFalseLesson from "@/components/lessons/TrueFalseLesson";
import DragMatchLesson from "@/components/lessons/DragMatchLesson";
import WordOrderLesson from "@/components/lessons/WordOrderLesson";
import ResultBanner from "@/components/feedback/ResultBanner";
import LessonHeader from "./LessonHeader";
import { useLesson } from "@/hooks/useLesson";

export default function Lesson({ hearts, onComplete }) {
  const {
    course,
    lesson,
    idx,
    progress,
    answer,
    checked,
    showResult,
    canCheck,
    isCorrect,
    explanation,
    handleCheck,
    handleDragReady,
    handleContinue,
    setAnswer,
  } = useLesson(hearts, onComplete);

  if (!course || !lesson) {
    return <Navigate to="/" replace />;
  }

  const content = lesson.content;

  return (
    <div
      className="min-h-screen flex flex-col relative animate-fadeIn"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <LessonHeader
          progress={progress}
          courseColor={course.color}
          hearts={hearts}
          onClose={handleContinue} // In case user closes, handle completion logic or routing
        />

        {/* Main content — split pane */}
        <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-5 pb-32 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-5">
          {/* LEFT: Animated diagram */}
          <div className="flex flex-col">
            <div
              className="rounded-3xl overflow-hidden flex items-center justify-center relative"
              style={{
                background:
                  "linear-gradient(135deg, rgba(88,204,2,0.07) 0%, rgba(28,176,246,0.05) 100%)",
                border: `1.5px solid ${course.color}30`,
                backdropFilter: "blur(20px)",
                minHeight: "220px",
                flex: 1,
              }}
            >
              {/* Breathing border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{ border: `1px solid ${course.color}` }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Lesson type badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider select-none"
                style={{
                  background: `${course.color}20`,
                  border: `1px solid ${course.color}40`,
                  color: course.color,
                }}
              >
                {content.kind === "mcq"
                  ? "Multiple Choice"
                  : content.kind === "true-false"
                    ? "True / False"
                    : content.kind === "drag-match"
                      ? "Match Pairs"
                      : "Word Order"}
              </div>
              <div className="w-full h-full p-4 pt-10 select-none">
                <ConceptDiagram id={lesson.diagram} />
              </div>
            </div>
          </div>

          {/* RIGHT: Question */}
          <div className="flex flex-col gap-4">
            {/* Lesson header info */}
            <div className="flex items-center gap-2 flex-wrap select-none">
              <div
                className="px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                style={{ background: course.color }}
              >
                {course.title}
              </div>
              <span className="text-[10px] text-muted-foreground font-bold">
                Lesson {idx + 1} of {course.lessons.length}
              </span>
            </div>
            <div className="flex items-center gap-2.5 select-none">
              <span className="text-2xl">{lesson.emoji}</span>
              <h2 className="text-lg font-black text-foreground">
                {lesson.title}
              </h2>
            </div>

            {/* Interactive content */}
            <div className="flex-1">
              {content.kind === "mcq" && (
                <MCQLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
              {content.kind === "true-false" && (
                <TrueFalseLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
              {content.kind === "drag-match" && (
                <DragMatchLesson content={content} onReady={handleDragReady} />
              )}
              {content.kind === "word-order" && (
                <WordOrderLesson
                  content={content}
                  onReady={setAnswer}
                  checked={checked}
                />
              )}
            </div>
          </div>
        </div>

        {/* Check button (fixed bottom, for non-drag-match) */}
        {!showResult && content.kind !== "drag-match" && (
          <div
            className="fixed bottom-0 left-0 right-0 p-4 z-20"
            style={{
              background: "rgba(13,27,42,0.9)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="max-w-5xl mx-auto">
              <motion.button
                onClick={handleCheck}
                disabled={!canCheck}
                whileTap={canCheck ? { scale: 0.98 } : {}}
                className={cn(
                  "w-full py-4 rounded-2xl font-black text-sm transition-all duration-200 cursor-pointer",
                  canCheck
                    ? "text-white cursor-pointer"
                    : "text-white/30 cursor-not-allowed",
                )}
                style={
                  canCheck
                    ? {
                        background: course.color,
                        boxShadow: `0 4px 24px ${course.shadow}`,
                      }
                    : { background: "rgba(255,255,255,0.06)" }
                }
              >
                CHECK
              </motion.button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showResult && (
            <ResultBanner
              isCorrect={isCorrect}
              explanation={explanation}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
