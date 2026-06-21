import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { shuffle, cn } from "@/utils/helpers";

export default function DragMatchLesson({ content, onReady }) {
  const [terms] = useState(() => shuffle(content.pairs.map((p) => p.term)));
  const [defs] = useState(() => shuffle(content.pairs.map((p) => p.def)));
  const [selTerm, setSelTerm] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrongDef, setWrongDef] = useState(null);
  const correct = Object.fromEntries(content.pairs.map((p) => [p.term, p.def]));

  function clickTerm(t) {
    if (t in matched) return;
    setSelTerm((s) => (s === t ? null : t));
  }

  function clickDef(d) {
    if (Object.values(matched).includes(d) || !selTerm) return;
    if (correct[selTerm] === d) {
      const m2 = { ...matched, [selTerm]: d };
      setMatched(m2);
      setSelTerm(null);
      if (Object.keys(m2).length === content.pairs.length) onReady(true);
    } else {
      setWrongDef(d);
      setTimeout(() => {
        setWrongDef(null);
        setSelTerm(null);
      }, 700);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
        {content.instruction}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mb-0.5">
            Terms
          </p>
          {terms.map((t) => {
            const m = t in matched;
            const isSel = selTerm === t;
            return (
              <motion.button
                key={t}
                onClick={() => clickTerm(t)}
                whileTap={!m ? { scale: 0.96 } : {}}
                animate={m ? { opacity: 0.5 } : {}}
                className={cn(
                  "px-3 py-2 rounded-xl border-2 text-xs font-bold text-left transition-all cursor-pointer backdrop-blur-sm",
                  m
                    ? "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02]"
                    : isSel
                      ? "border-[#58CC02] bg-[#58CC02]/20 text-foreground shadow-lg"
                      : "border-white/10 bg-white/[0.04] text-foreground hover:border-[#58CC02]/50",
                )}
              >
                {m && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                {t}
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider mb-0.5">
            Definitions
          </p>
          {defs.map((d) => {
            const m = Object.values(matched).includes(d);
            const isWrong = wrongDef === d;
            return (
              <motion.button
                key={d}
                onClick={() => clickDef(d)}
                animate={isWrong ? { x: [0, -8, 8, -5, 0] } : {}}
                transition={{ duration: 0.35 }}
                className={cn(
                  "px-3 py-2 rounded-xl border-2 text-xs font-semibold text-left transition-all cursor-pointer backdrop-blur-sm",
                  m
                    ? "border-[#58CC02] bg-[#58CC02]/15 text-[#58CC02]"
                    : isWrong
                      ? "border-[#ff4b4b] bg-[#ff4b4b]/20 text-[#ff4b4b]"
                      : selTerm
                        ? "border-[#1CB0F6]/60 bg-[#1CB0F6]/08 text-foreground hover:border-[#1CB0F6] cursor-pointer"
                        : "border-white/10 bg-white/[0.04] text-foreground cursor-pointer",
                )}
              >
                {m && <CheckCircle2 className="inline w-3 h-3 mr-1" />}
                {d}
              </motion.button>
            );
          })}
        </div>
      </div>
      {Object.keys(matched).length < content.pairs.length && (
        <p className="text-[10px] text-muted-foreground text-center">
          {selTerm
            ? `"${selTerm}" selected — tap a definition`
            : "Tap a term to start matching"}
        </p>
      )}
    </div>
  );
}
