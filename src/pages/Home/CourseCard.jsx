import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import ProgressBar from "@/components/common/ProgressBar";

export default function CourseCard({ course, idx, done, onSelect }) {
  const pct = (done / course.lessons.length) * 100;

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + idx * 0.1 }}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className="w-full text-left rounded-3xl border border-white/[0.08] overflow-hidden transition-all duration-200 group"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 4px 30px rgba(0,0,0,0.3)`,
      }}
    >
      {/* color stripe */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${course.color}, transparent)`,
        }}
      />
      <div className="p-5 flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          style={{
            background: `${course.color}18`,
            border: `1.5px solid ${course.color}40`,
          }}
        >
          {course.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-black text-sm text-foreground group-hover:text-[#58CC02] transition-colors">
              {course.title}
            </h3>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#58CC02] transition-colors shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground font-semibold mb-3 line-clamp-2">
            {course.description}
          </p>
          <div className="flex items-center gap-3">
            <ProgressBar value={pct} color={course.color} />
            <span
              className="text-[10px] font-black shrink-0"
              style={{ color: course.color }}
            >
              {done}/{course.lessons.length}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
