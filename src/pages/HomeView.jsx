import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";

export function HomeView() {
  const navigate = useNavigate();
  const { completed } = useOutletContext();

  return (
    <main className="home-view">
      <div className="home-hero">
        <img src="/cat_mascot.png" alt="Cat Mascot" className="home-mascot" />
        <div className="home-hero-text">
          <h1>Ready to learn?</h1>
          <p>Pick a diagramming course and start practicing your skills with our interactive shapes!</p>
        </div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      <div className="course-cards">
        {courses.map((course) => {
          const done = completed[course.id] || 0;
          const total = course.lessons.length;
          const progress = Math.round((done / total) * 100);
          return (
            <div key={course.id} className="course-card" style={{ "--accent": course.accent }} onClick={() => navigate(`/course/${course.id}`)}>
              <div className="course-card-content">
                <h2>{course.title}</h2>
                <p>{course.subtitle}</p>
                <div className="progress-track">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <small>{done} / {total} lessons</small>
              </div>
              <button className="primary-button" onClick={(e) => {
                e.stopPropagation();
                navigate(`/course/${course.id}`);
              }}>
                {done === 0 ? "Start" : done >= total ? "Review" : "Continue"}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
