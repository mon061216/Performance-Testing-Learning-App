import { motion } from "motion/react";

export default function Stats({ completedCount, xp, streak }) {
  const statsList = [
    {
      label: "Completed",
      value: completedCount,
      icon: "✅",
    },
    { label: "Total XP", value: xp, icon: "⭐" },
    { label: "Streak Days", value: streak, icon: "🔥" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mt-8">
      {statsList.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08 }}
          className="rounded-2xl border border-white/[0.08] p-3 text-center"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="text-xl mb-0.5">{s.icon}</div>
          <div className="text-xl font-black text-foreground">
            {s.value}
          </div>
          <div className="text-[10px] text-muted-foreground font-semibold">
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
