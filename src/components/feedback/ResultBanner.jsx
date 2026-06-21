import { motion } from "motion/react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function ResultBanner({ isCorrect, explanation, onContinue }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className="fixed bottom-0 left-0 right-0 z-30 px-4 pt-4 pb-8"
      style={{
        background: isCorrect ? "rgba(20,60,10,0.97)" : "rgba(60,10,10,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: `3px solid ${isCorrect ? "#58CC02" : "#ff4b4b"}`,
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-3 mb-4">
          {isCorrect ? (
            <CheckCircle2 className="w-6 h-6 text-[#58CC02] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-[#ff4b4b] shrink-0 mt-0.5" />
          )}
          <div>
            <p
              className={cn(
                "font-black text-base",
                isCorrect ? "text-[#58CC02]" : "text-[#ff4b4b]",
              )}
            >
              {isCorrect ? "Excellent! 🎉" : "Not quite ❌"}
            </p>
            <p className="text-xs font-semibold text-white/70 mt-0.5 leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-2xl font-black text-sm text-white transition-all active:scale-[0.98]"
          style={{
            background: isCorrect ? "#58CC02" : "#ff4b4b",
            boxShadow: `0 4px 20px ${isCorrect ? "rgba(88,204,2,0.4)" : "rgba(255,75,75,0.4)"}`,
          }}
        >
          {isCorrect ? "Continue →" : "Got it, continue"}
        </button>
      </div>
    </motion.div>
  );
}
