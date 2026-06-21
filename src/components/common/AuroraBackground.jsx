import { motion } from "motion/react";

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(88,204,2,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(28,176,246,0.14) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/4 w-[500px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,150,0,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 50, 0], y: [0, -20, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
}
