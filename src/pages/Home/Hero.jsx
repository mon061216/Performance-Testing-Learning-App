import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="text-center mb-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-6xl mb-4"
      >
        🚦
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-black mb-2"
        style={{
          background:
            "linear-gradient(135deg, #ffffff 0%, #58CC02 60%, #1CB0F6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Master Performance Testing
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground font-semibold text-sm"
      >
        Interactive lessons with animated concept diagrams. Learn by doing.
      </motion.p>
    </div>
  );
}
