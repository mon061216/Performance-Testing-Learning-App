import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { courses } from "../data/courses";
import { PageTransition } from "../components/PageTransition";
import { motion } from "motion/react";

export function PathView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { completed, isLocked } = useOutletContext();
  const [clickedLessonIndex, setClickedLessonIndex] = useState(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(null);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <PageTransition>
        <main className="path-view">
          <h2>Course not found</h2>
          <button className="ghost-button" onClick={() => navigate("/")}>Back to Home</button>
        </main>
      </PageTransition>
    );
  }

  const completedCount = completed[course.id] || 0;
  const allLessons = course.levels ? course.levels.flatMap(l => l.lessons) : course.lessons;

  const handleNodeClick = (index, isLockedNode) => {
    if (isLockedNode || isLocked) return;
    if (selectedNodeIndex === index) {
      setSelectedNodeIndex(null);
    } else {
      setSelectedNodeIndex(index);
    }
  };

  const handleStartLesson = (index) => {
    setSelectedNodeIndex(null);
    setClickedLessonIndex(index);
    setTimeout(() => {
      navigate(`/course/${course.id}/lesson/${index}`);
    }, 800);
  };

  return (
    <PageTransition>
      <main className="path-view" style={{ "--accent": course.accent }}>
        <div className="path-layout-grid">
          <aside className="path-sidebar">
            <button className="ghost-button" onClick={() => navigate("/")} style={{ marginBottom: 20 }}>&larr; Courses</button>
            <div className="course-card" style={{ cursor: 'default' }}>
              <div className="course-card-content">
                <h2>{course.title}</h2>
                <p>{course.subtitle}</p>
                <div style={{ display: 'flex', gap: '15px', color: '#5f7187', fontWeight: 600, fontSize: '0.9rem', marginTop: 20 }}>
                  <span>📖 {allLessons.length} Lessons</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="path-content">
            <div className="winding-path">
              {(() => {
                let globalIndex = 0;
                return (course.levels || [{ title: "Khóa học", lessons: course.lessons }]).map((level, levelIdx) => (
                  <React.Fragment key={levelIdx}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <div className="level-header-pill">
                        <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1 }}>Level {levelIdx + 1}</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' }}>{level.title}</span>
                      </div>
                    </div>
                    {level.lessons.map((lesson) => {
                      const index = globalIndex++;
                      const isDone = index < completedCount;
                      const isCurrent = index === completedCount;
                      const isLockedNode = index > completedCount;
                      const offset = Math.sin(index * 1.2) * 50 - 70;
                      return (
                        <div key={lesson.id} className="path-node-wrapper" style={{ transform: `translateX(${offset}px)` }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '72px', height: '60px' }}>

                            {isCurrent && clickedLessonIndex === null && (
                              <>
                                {selectedNodeIndex !== index && (
                                  <div className="mascot-speech-bubble">Sẵn sàng học chưa?</div>
                                )}
                                <motion.img
                                  src="/mascot.png"
                                  alt="Mascot"
                                  className="mascot-path"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1, y: [0, -5, 0], rotate: [0, -2, 2, 0] }}
                                  transition={{
                                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                                    rotate: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                                  }}
                                />
                              </>
                            )}

                            {clickedLessonIndex === index && (
                              <motion.img
                                src="/mascot.png"
                                alt="Mascot jumping"
                                className="mascot-jumping"
                                style={{ zIndex: 13 }}
                                initial={{ scale: 1, opacity: 1, x: 0, y: -5 }}
                                animate={{ scale: 0, opacity: 0, x: 0, y: [-25, -25, 45] }}
                                transition={{ duration: 0.8, times: [0.3, 0.5, 1], ease: "easeIn" }}
                              />
                            )}

                            {selectedNodeIndex === index && clickedLessonIndex === null && (
                              <motion.div
                                className="popover-tooltip"
                                initial={{ scale: 0.8, opacity: 0, x: "-50%", y: 10 }}
                                animate={{ scale: 1, opacity: 1, x: "-50%", y: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              >
                                <h3>{lesson.title}</h3>
                                <button className="popover-button" onClick={() => handleStartLesson(index)}>
                                  Bắt đầu
                                </button>
                              </motion.div>
                            )}

                            <div className={`milestone-base ${isCurrent ? "current" : isDone ? "done" : "locked"}`}>
                              <div className="ring ring-outer"></div>
                              <div className="ring ring-inner"></div>
                              <div className="ring ring-core"></div>
                            </div>
                            <button
                              className={`path-node ${isCurrent ? "current" : ""} ${isDone ? "done" : ""} ${isLockedNode ? "locked" : ""} ${selectedNodeIndex === index ? "selected" : ""}`}
                              onClick={() => handleNodeClick(index, isLockedNode)}
                              disabled={isLockedNode || isLocked || clickedLessonIndex !== null}
                              title={lesson.title}
                              style={{ position: 'relative', zIndex: 2 }}
                            >
                              {clickedLessonIndex === index && (
                                <>
                                  <motion.div
                                    className="node-hole"
                                    initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                                    animate={{ scale: [0, 1.2, 1.1], opacity: 1, x: "-50%", y: "-50%" }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                  />
                                  <div className="portal-particles">
                                    {[...Array(6)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        className="portal-particle"
                                        initial={{ y: "0%", x: "-50%", opacity: 0, scale: 0 }}
                                        animate={{
                                          y: `-${80 + Math.random() * 80}px`,
                                          x: `${-50 + (Math.random() - 0.5) * 60}%`,
                                          opacity: [0, 1, 0],
                                          scale: [0.5, 1, 0.2]
                                        }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
                                        style={{ left: "50%", top: "40%" }}
                                      />
                                    ))}
                                  </div>
                                </>
                              )}
                              <div className="node-3d-face" style={{ opacity: clickedLessonIndex === index ? 0 : 1, transition: 'opacity 0.2s' }}>
                                {clickedLessonIndex === index ? null : (isDone ? "\u2714" : index + 1)}
                              </div>
                            </button>
                            <div className="node-title-label" style={{ opacity: selectedNodeIndex === index ? 0 : 1, transition: 'opacity 0.2s' }}>
                              {lesson.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ));
              })()}
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
