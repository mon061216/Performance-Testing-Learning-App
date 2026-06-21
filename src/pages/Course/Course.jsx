import { Navigate } from "react-router";
import { Star } from "lucide-react";
import AuroraBackground from "@/components/common/AuroraBackground";
import ProgressBar from "@/components/common/ProgressBar";
import CourseHeader from "./CourseHeader";
import CourseMap from "./CourseMap";
import { useCourse } from "@/hooks/useCourse";

export default function Course({ completedLessons, xp, hearts, streak }) {
  const { course, doneLessons, done, progressPercent } = useCourse(completedLessons);

  if (!course) {
    return <Navigate to="/" replace />;
  }

  return (
    <div
      className="min-h-screen relative animate-fadeIn"
      style={{ fontFamily: "Nunito,sans-serif" }}
    >
      <AuroraBackground />
      <div className="relative z-10">
        <CourseHeader streak={streak} hearts={hearts} />

        <main className="max-w-xl mx-auto px-4 py-6">
          {/* Course info card */}
          <div
            className="rounded-3xl border border-white/[0.08] p-5 mb-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              borderTop: `2px solid ${course.color}`,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 select-none"
                style={{
                  background: `${course.color}18`,
                  border: `1.5px solid ${course.color}40`,
                }}
              >
                {course.emoji}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-black text-foreground mb-0.5 select-none">
                  {course.title}
                </h1>
                <p className="text-xs text-muted-foreground font-semibold mb-3 select-none">
                  {course.description}
                </p>
                <div className="flex items-center gap-3">
                  <ProgressBar
                    value={progressPercent}
                    color={course.color}
                  />
                  <span
                    className="text-xs font-black shrink-0 select-none"
                    style={{ color: course.color }}
                  >
                    {done}/{course.lessons.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Map trail */}
          <CourseMap
            course={course}
            completedLessons={doneLessons}
            xp={xp}
            hearts={hearts}
          />

          <div className="mt-8 text-center pb-8 select-none">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(255,217,0,0.1)",
                border: "1px solid rgba(255,217,0,0.2)",
              }}
            >
              <Star className="w-3.5 h-3.5 text-[#FFD900] fill-[#FFD900]" />
              <span className="text-[#FFD900] font-black text-xs">
                Total XP: {xp}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
