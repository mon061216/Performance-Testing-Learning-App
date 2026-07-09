import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function MilestoneComplete({ xp, gainedXp = 25, streak, streakIncreased, onContinue }) {
  const [step, setStep] = useState(streakIncreased ? 'streak' : 'xp');

  const handleContinue = () => {
    if (step === 'streak') {
      setStep('xp');
    } else {
      onContinue();
    }
  };

  return (
    <div className="milestone-complete-overlay">
      <AnimatePresence mode="wait">
        {step === 'streak' ? (
          <motion.div 
            key="streak-screen"
            className="milestone-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div 
              className="mascot-container"
              initial={{ y: 100, opacity: 0, scale: 0.5 }}
              animate={{ y: [0, -30, 0], opacity: 1, scale: 1 }}
              transition={{ 
                y: { duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5, type: "spring", bounce: 0.5 }
              }}
            >
              <img src="/cat_mascot_transparent.png" alt="Mascot" className="milestone-mascot" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ color: '#ff9600' }}
            >
              You're on fire! 🔥
            </motion.h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: '#64748b' }}
            >
              Your streak is growing stronger!
            </motion.p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem' }}>
              <motion.div 
                className="xp-badge"
                initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.6 }}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <span className="xp-label" style={{ color: '#f97316', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '1px' }}>DAY STREAK</span>
                <div className="xp-value-container" style={{ justifyContent: 'center' }}>
                  <span className="xp-value" style={{ 
                    color: '#ea580c', 
                    fontSize: '5rem',
                    textShadow: '0 4px 15px rgba(234, 88, 12, 0.4)'
                  }}>{streak}</span>
                  <span className="xp-sparkle" style={{ fontSize: '3rem', filter: 'drop-shadow(0 2px 10px rgba(249, 115, 22, 0.6))' }}>🔥</span>
                </div>
              </motion.div>
            </div>

            <motion.button 
              className="continue-btn-large"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="xp-screen"
            className="milestone-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div 
              className="mascot-container"
              initial={{ y: 100, opacity: 0, scale: 0.5 }}
              animate={{ y: [0, -30, 0], opacity: 1, scale: 1 }}
              transition={{ 
                y: { duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5, type: "spring", bounce: 0.5 }
              }}
            >
              <img src="/cat_mascot_transparent.png" alt="Mascot" className="milestone-mascot" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Perfect!
            </motion.h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: '#64748b' }}
            >
              Let's keep the momentum going
            </motion.p>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1rem' }}>
              <motion.div 
                className="xp-badge"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
                style={{ 
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none'
                }}
              >
                <span className="xp-label" style={{ color: '#d97706', fontWeight: 'bold' }}>XP GAINED</span>
                <div className="xp-value-container">
                  <span className="xp-value" style={{ 
                    color: '#eab308',
                    fontSize: '5.5rem',
                    fontWeight: '900',
                    textShadow: '0 5px 20px rgba(234, 179, 8, 0.5)'
                  }}>
                    +{gainedXp}
                  </span>
                  <motion.span 
                    className="xp-sparkle"
                    animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))' }}
                  >✨</motion.span>
                </div>
              </motion.div>
            </div>

            <motion.button 
              className="continue-btn-large"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
