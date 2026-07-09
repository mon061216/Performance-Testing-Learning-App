import React from "react";
import { motion, AnimatePresence } from "motion/react";

import { MermaidDiagram } from "./MermaidDiagram";

export function ExplanationModal({ isOpen, onClose, explanation, explanationMermaid }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            onClick={(e) => e.stopPropagation()}
          >
          <header className="modal-header">
            <h2>Detailed Explanation</h2>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </header>
          
          <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <p className="explanation-text">{explanation}</p>
            {explanationMermaid && (
              <div style={{ marginTop: '20px', padding: '10px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <MermaidDiagram chart={explanationMermaid} />
              </div>
            )}
          </div>
          
          <footer className="modal-footer">
            <div className="pagination-dots">
              <span className="dot active"></span>
            </div>
          </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
