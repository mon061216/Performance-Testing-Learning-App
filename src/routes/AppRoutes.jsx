import { Routes, Route } from "react-router";
import Home from "@/pages/Home/Home";
import Course from "@/pages/Course/Course";
import Lesson from "@/pages/Lesson/Lesson";
import CourseComplete from "@/pages/CourseComplete/CourseComplete";
import OutOfHearts from "@/pages/OutOfHearts/OutOfHearts";

export default function AppRoutes({
  xp,
  hearts,
  streak,
  completedLessons,
  onComplete,
  onRefill,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            xp={xp}
            hearts={hearts}
            streak={streak}
            completedLessons={completedLessons}
          />
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <Course
            completedLessons={completedLessons}
            xp={xp}
            hearts={hearts}
            streak={streak}
          />
        }
      />
      <Route
        path="/course/:courseId/lesson/:lessonIndex"
        element={<Lesson hearts={hearts} onComplete={onComplete} />}
      />
      <Route path="/course/:courseId/complete" element={<CourseComplete />} />
      <Route
        path="/out-of-hearts"
        element={<OutOfHearts onRefill={onRefill} />}
      />
    </Routes>
  );
}
