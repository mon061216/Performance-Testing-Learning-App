import { useEffect } from "react";
import { motion } from "motion/react";

export default function XPOverlay({ xpGained, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(13,27,42,0.75)",
        backdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.5, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="text-center"
      >
        <div className="text-6xl mb-3">⭐</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black text-[#FFD900]"
        >
          +{xpGained} XP
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
