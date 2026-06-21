import { motion } from "motion/react";
import { Lock, Star, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

const TRAIL = [
  { x: 140, y: 70 },
  { x: 200, y: 160 },
  { x: 226, y: 255 },
  { x: 200, y: 348 },
  { x: 140, y: 438 },
  { x: 80, y: 528 },
  { x: 54, y: 620 },
  { x: 80, y: 712 },
  { x: 140, y: 800 },
  { x: 200, y: 890 },
];

function buildPath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const p = nodes[i - 1];
    const c = nodes[i];
    d += ` C ${p.x} ${p.y + 42} ${c.x} ${c.y - 42} ${c.x} ${c.y}`;
  }
  return d;
}

export default function CourseMap({ course, completedLessons, xp, hearts }) {
  const navigate = useNavigate();
  const done = completedLessons.length;
  const totalH = TRAIL[9].y + 80;
  const trailPath = buildPath(TRAIL);
  const completedPath =
    done > 0
      ? buildPath(TRAIL.slice(0, Math.min(done + 1, TRAIL.length)))
      : null;

  const handleLessonSelect = (i) => {
    if (hearts <= 0) {
      navigate("/out-of-hearts");
    } else {
      navigate(`/course/${course.id}/lesson/${i}`);
    }
  };

  return (
    <div className="relative mx-auto mt-6" style={{ width: "280px", height: `${totalH}px` }}>
      <svg
        className="absolute inset-0"
        width="280"
        height={totalH}
        style={{ pointerEvents: "none", overflow: "visible" }}
      >
        {/* Background path */}
        <path
          d={trailPath}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Flowing dashes on completed */}
        {completedPath && (
          <motion.path
            d={completedPath}
            fill="none"
            stroke={course.color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="12 8"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            opacity="0.7"
          />
        )}
      </svg>

      {/* Lesson nodes */}
      {course.lessons.map((lesson, i) => {
        const pos = TRAIL[i];
        const isCompleted = completedLessons.includes(i);
        const isCurrent = i === done;
        const isLocked = i > done;
        return (
          <motion.div
            key={lesson.id}
            className="absolute"
            style={{ left: pos.x - 28, top: pos.y - 28 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: i * 0.05,
              type: "spring",
              stiffness: 200,
            }}
          >
            <button
              onClick={() => !isLocked && handleLessonSelect(i)}
              disabled={isLocked}
              className="relative group cursor-pointer disabled:cursor-not-allowed"
            >
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: course.color }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg border-4 transition-all font-bold"
                style={
                  isCompleted
                    ? {
                        borderColor: "#58CC02",
                        background: "#58CC02",
                        boxShadow: "0 4px 20px rgba(88,204,2,0.5)",
                      }
                    : isCurrent
                      ? {
                          borderColor: course.color,
                          background: course.color,
                          boxShadow: `0 4px 24px ${course.shadow}`,
                        }
                      : {
                          borderColor: "rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.04)",
                        }
                }
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5 text-white/30" />
                ) : (
                  <span>{lesson.emoji}</span>
                )}
              </div>
              {/* Tooltip */}
              {!isLocked && (
                <div
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-xs font-bold border border-white/[0.08] shadow-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: "rgba(13,27,42,0.95)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="text-white">{lesson.title}</div>
                  <div className="text-[#58CC02]">+{lesson.xp} XP</div>
                </div>
              )}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
