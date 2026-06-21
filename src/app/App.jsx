import { AnimatePresence } from "motion/react";
import XPOverlay from "@/components/feedback/XPOverlay";
import AppRoutes from "@/routes/AppRoutes";
import { useAppState } from "@/hooks/useAppState";

export default function App() {
  const {
    completedLessons,
    xp,
    hearts,
    streak,
    showXp,
    lastXp,
    handleLessonComplete,
    handleXpDone,
    handleRefill,
  } = useAppState();

  return (
    <div style={{ fontFamily: "Nunito,sans-serif" }}>
      <AnimatePresence>
        {showXp && <XPOverlay xpGained={lastXp} onDone={handleXpDone} />}
      </AnimatePresence>

      <AppRoutes
        xp={xp}
        hearts={hearts}
        streak={streak}
        completedLessons={completedLessons}
        onComplete={handleLessonComplete}
        onRefill={handleRefill}
      />
    </div>
  );
}
