import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const loadingMascots = [
  "/mascot.png",
  "/mascot_reading.png",
  "/mascot_coffee.png",
  "/mascot_computer.png",
  "/mascot_lying.png",
  "/mascot_lying_legs.png"
];

export function PageTransition({ children, className }) {
  const [isLoading, setIsLoading] = useState(true);
  const [mascotSrc, setMascotSrc] = useState("/mascot.png");

  useEffect(() => {
    setMascotSrc(loadingMascots[Math.floor(Math.random() * loadingMascots.length)]);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="loading-screen"
        >
          <motion.img 
            src={mascotSrc} 
            alt="Mascot loading" 
            className="mascot-loading"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <h3>Loading lesson...</h3>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ ...pageTransition, delay: 0.1 }}
          className={className}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
