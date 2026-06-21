import { motion } from "motion/react";
import { Flame, Star, Zap } from "lucide-react";
import AuroraBackground from "@/components/common/AuroraBackground";
import HeartsDisplay from "@/components/common/HeartsDisplay";
import ProgressBar from "@/components/common/ProgressBar";
import { COURSES } from "@/data/courses";
import Hero from "./Hero";
import CourseCard from "./CourseCard";
import Stats from "./Stats";
import { useHome } from "@/hooks/useHome";

export default function Home({ xp, hearts, streak, completedLessons }) {
  const { navigate, completedCount } = useHome(completedLessons);

  return (
    <div
      className="min-h-screen relative animate-fadeIn"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10">
        {/* Nav */}
        <header
          className="sticky top-0 z-20 border-b border-white/[0.06]"
          style={{
            background: "rgba(13,27,42,0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 select-none">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #58CC02, #4aa800)",
                }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-black text-white tracking-tight">
                PerfLearn
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-[#FF9600] font-black text-sm select-none">
                <Flame className="w-4 h-4 fill-[#FF9600]" />
                {streak}
              </div>
              <HeartsDisplay count={hearts} />
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full select-none"
                style={{
                  background: "rgba(255,217,0,0.12)",
                  border: "1px solid rgba(255,217,0,0.25)",
                }}
              >
                <Star className="w-3.5 h-3.5 text-[#FFD900] fill-[#FFD900]" />
                <span className="text-[#FFD900] font-black text-xs">
                  {xp} XP
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <Hero />

          {/* XP bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/[0.08] p-4 mb-8 flex items-center gap-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: "rgba(255,217,0,0.15)",
                border: "1px solid rgba(255,217,0,0.3)",
              }}
            >
              <span className="text-xl">🏆</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-black text-foreground uppercase tracking-wider select-none">
                  Overall Progress
                </span>
                <span className="text-xs font-black text-[#58CC02]">
                  {xp} / 500 XP
                </span>
              </div>
              <ProgressBar value={(xp / 500) * 100} />
            </div>
          </motion.div>

          {/* Courses */}
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-4 select-none">
            Your Courses
          </h2>
          <div className="flex flex-col gap-4">
            {COURSES.map((course, idx) => {
              const done = (completedLessons[course.id] || []).length;
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  idx={idx}
                  done={done}
                  onSelect={() => navigate(`/course/${course.id}`)}
                />
              );
            })}
          </div>

          <Stats completedCount={completedCount} xp={xp} streak={streak} />
        </main>
      </div>
    </div>
  );
}
