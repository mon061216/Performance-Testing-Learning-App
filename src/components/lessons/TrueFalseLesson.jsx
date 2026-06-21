import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/helpers";

export default function TrueFalseLesson({ content, onReady, checked }) {
  const [sel, setSel] = useState(null);
  useEffect(() => {
    setSel(null);
  }, [content]);

  function pick(v) {
    if (checked) return;
    setSel(v);
    onReady(v === content.correct);
  }

  const cls = (v) => {
    if (!checked)
      return sel === v
        ? "border-[#58CC02] bg-[#58CC02]/15"
        : "border-white/10 bg-white/[0.04] hover:border-[#58CC02]/40";
    if (v === content.correct) return "border-[#58CC02] bg-[#58CC02]/20";
    if (v === sel) return "border-[#ff4b4b] bg-[#ff4b4b]/20";
    return "border-white/05 opacity-40";
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-2xl border border-white/08 bg-white/[0.03] backdrop-blur-sm">
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          {content.statement}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => (
          <motion.button
            key={String(v)}
            onClick={() => pick(v)}
            whileTap={!checked ? { scale: 0.96 } : {}}
            className={cn(
              "py-5 rounded-2xl border-2 font-black text-lg transition-all duration-150 cursor-pointer backdrop-blur-sm",
              cls(v),
            )}
          >
            {v ? "✅ True" : "❌ False"}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
