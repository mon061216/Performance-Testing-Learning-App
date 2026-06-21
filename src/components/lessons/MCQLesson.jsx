import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/helpers";

export default function MCQLesson({ content, onReady, checked }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    setSel(null);
  }, [content]);

  function pick(i) {
    if (checked) return;
    setSel(i);
    onReady(i === content.correct);
  }

  const stateCls = (i) => {
    if (!checked)
      return sel === i
        ? "border-[#58CC02] bg-[#58CC02]/15"
        : "border-white/10 bg-white/[0.04] hover:border-[#58CC02]/50 hover:bg-[#58CC02]/08";
    if (i === content.correct) return "border-[#58CC02] bg-[#58CC02]/20";
    if (i === sel) return "border-[#ff4b4b] bg-[#ff4b4b]/20";
    return "border-white/05 bg-white/[0.02] opacity-50";
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-bold text-foreground leading-snug">
        {content.question}
      </p>
      <div className="grid grid-cols-1 gap-2.5 mt-1">
        {content.options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => pick(i)}
            whileTap={!checked ? { scale: 0.98 } : {}}
            className={cn(
              "w-full text-left px-4 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-150 cursor-pointer backdrop-blur-sm",
              stateCls(i),
            )}
          >
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black shrink-0",
                  !checked && sel === i
                    ? "border-[#58CC02] text-[#58CC02]"
                    : checked && i === content.correct
                      ? "border-[#58CC02] text-[#58CC02]"
                      : checked && i === sel
                        ? "border-[#ff4b4b] text-[#ff4b4b]"
                        : "border-white/20 text-white/40",
                )}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-foreground">{opt}</span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
