import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { shuffle, cn } from "@/utils/helpers";

export default function WordOrderLesson({ content, onReady, checked }) {
  const [avail, setAvail] = useState(() => shuffle(content.words));
  const [placed, setPlaced] = useState([]);

  useEffect(() => {
    setAvail(shuffle(content.words));
    setPlaced([]);
  }, [content]);

  function place(w) {
    if (checked) return;
    const i = avail.indexOf(w);
    if (i === -1) return;
    const na = [...avail];
    na.splice(i, 1);
    const np = [...placed, w];
    setAvail(na);
    setPlaced(np);
    if (np.length === content.answer.length)
      onReady(np.join("|") === content.answer.join("|"));
  }

  function remove(i) {
    if (checked) return;
    const w = placed[i];
    const np = [...placed];
    np.splice(i, 1);
    setPlaced(np);
    setAvail((a) => [...a, w]);
  }

  const iC = (i) => checked && placed[i] === content.answer[i];
  const iW = (i) => checked && placed[i] !== content.answer[i];

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold text-foreground">{content.prompt}</p>
      <div className="min-h-[52px] rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-2.5 flex flex-wrap gap-2 items-center">
        <AnimatePresence>
          {placed.length === 0 && (
            <span className="text-muted-foreground text-xs font-semibold">
              Tap words below to build the sequence…
            </span>
          )}
          {placed.map((w, i) => (
            <motion.button
              key={`${i}-${w}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              onClick={() => remove(i)}
              className={cn(
                "px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition-colors",
                iC(i)
                  ? "border-[#58CC02] bg-[#58CC02]/20 text-[#58CC02]"
                  : iW(i)
                    ? "border-[#ff4b4b] bg-[#ff4b4b]/20 text-[#ff4b4b]"
                    : "border-[#1CB0F6] bg-[#1CB0F6]/15 text-foreground cursor-pointer",
              )}
            >
              {w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {avail.map((w, i) => (
            <motion.button
              key={`${w}-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => place(w)}
              disabled={checked}
              className="px-3 py-1.5 rounded-lg border-2 border-white/12 bg-white/[0.05] text-xs font-bold text-foreground hover:border-[#58CC02]/60 hover:bg-[#58CC02]/08 transition-colors cursor-pointer backdrop-blur-sm disabled:opacity-40"
            >
              {w}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
