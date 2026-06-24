import React from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";

export function PathView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completed, isLocked } = useOutletContext();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <main className="path-view">
        <h2>Course not found</h2>
        <button className="ghost-button" onClick={() => navigate("/")}>Back to Home</button>
      </main>
    );
  }

  const completedCount = completed[course.id] || 0;
  const lessons = course.lessons;

  return (
    <main className="path-view" style={{ "--accent": course.accent }}>
      <header className="path-header">
        <button className="ghost-button" onClick={() => navigate("/")}>&larr; Courses</button>
        <div className="path-heading">
          <h2>{course.title}</h2>
          <p>{course.subtitle}</p>
        </div>
      </header>
      <div className="winding-path">
        {lessons.map((lesson, index) => {
          const isDone = index < completedCount;
          const isCurrent = index === completedCount;
          const isLockedNode = index > completedCount;
          const offset = Math.sin(index * 1.2) * 50;
          return (
            <div key={lesson.id} className="path-node-wrapper" style={{ transform: `translateX(${offset}px)` }}>
              {isCurrent && <div className="start-tooltip">START</div>}
              <button
                className={`path-node ${isCurrent ? "current" : ""} ${isDone ? "done" : ""} ${isLockedNode ? "locked" : ""}`}
                onClick={() => !isLockedNode && navigate(`/course/${course.id}/lesson/${index}`)}
                disabled={isLockedNode || isLocked}
                title={lesson.title}
              >
                {isDone ? "\u2714" : index + 1}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
