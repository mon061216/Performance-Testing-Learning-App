import { motion } from "motion/react";
import { useNavigate } from "react-router";
import AuroraBackground from "@/components/common/AuroraBackground";

export default function OutOfHearts({ onRefill }) {
  const navigate = useNavigate();

  const handleRefill = () => {
    onRefill();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative animate-fadeIn"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10 text-center select-none">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          💔
        </motion.div>
        <h1 className="text-3xl font-black text-white mb-2">Out of Hearts!</h1>
        <p className="text-muted-foreground font-semibold mb-8 text-sm">
          You need hearts to continue learning.
        </p>
        <button
          onClick={handleRefill}
          className="px-8 py-4 rounded-2xl font-black text-sm text-white transition-transform active:scale-95 cursor-pointer"
          style={{
            background: "#1CB0F6",
            boxShadow: "0 4px 24px rgba(28,176,246,0.4)",
          }}
        >
          Refill Hearts (+5)
        </button>
      </div>
    </div>
  );
}
