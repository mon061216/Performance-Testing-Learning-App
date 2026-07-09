import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";
import { motion } from "motion/react";
import { PageTransition } from "../components/PageTransition";

export function HomeView() {
  const navigate = useNavigate();
  const { completed } = useOutletContext();

  return (
    <PageTransition>
    <main className="home-view">
      <div className="home-hero">
        <motion.img 
          src="/cat_mascot.png" 
          alt="Performance Testing Mascot" 
          className="home-mascot"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        />
        <div className="home-hero-text">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Become a Statechart Master!
          </motion.h1>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Master the art of reactive system design through UML Statecharts with visual and interactive drag-and-drop exercises.
          </motion.p>
        </div>
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      <div className="course-cards">
        {courses.map((course, index) => {
          const allLessons = course.levels ? course.levels.flatMap(l => l.lessons) : course.lessons;
          const done = completed[course.id] || 0;
          const total = allLessons.length;
          const progress = Math.round((done / total) * 100);
          return (
            <motion.div 
              key={course.id} 
              className="course-card" 
              style={{ "--accent": course.accent }} 
              onClick={() => navigate(`/course/${course.id}`)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
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
            </motion.div>
          );
        })}
      </div>
    </main>
    </PageTransition>
  );
}
