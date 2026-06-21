import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useParams, useNavigate, Navigate } from "react-router";
import AuroraBackground from "@/components/common/AuroraBackground";
import { COURSES } from "@/data/courses";

export default function CourseComplete() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.id === courseId);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  const xpGained = course.lessons.reduce((s, l) => s + l.xp, 0);

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
          🎊
        </motion.div>
        <h1 className="text-3xl font-black text-white mb-2">
          Course Complete!
        </h1>
        <p className="text-muted-foreground font-semibold mb-8 text-sm">
          You finished{" "}
          <span className="text-white font-black">{course.title}</span>
        </p>
        <div className="flex gap-4 justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.15, type: "spring" }}
            >
              <Star className="w-14 h-14 text-[#FFD900] fill-[#FFD900]" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-white/[0.08] p-6 mb-8 inline-block"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="text-4xl font-black text-[#FFD900] mb-1">
            +{xpGained} XP
          </div>
          <div className="text-muted-foreground font-semibold text-xs">
            Experience earned
          </div>
        </motion.div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 rounded-2xl font-black text-sm text-white transition-all active:scale-[0.98] cursor-pointer"
            style={{
              background: "#58CC02",
              boxShadow: "0 4px 24px rgba(88,204,2,0.4)",
            }}
          >
            Continue Learning →
          </button>
        </div>
      </div>
    </div>
  );
}
