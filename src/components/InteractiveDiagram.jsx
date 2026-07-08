import React from 'react';
import { motion } from 'motion/react';
import { ShapeIcon } from './ShapeIcon';

export function InteractiveDiagram({ 
  diagram, 
  placements, 
  question, 
  result, 
  draggedId, 
  dropCard, 
  removeCard 
}) {
  if (!diagram) return null;

  const renderSlot = (node) => {
    const index = node.index;
    const cardId = placements[index];
    const card = cardId ? question.cards.find(c => c.id === cardId) : null;
    const isCorrect = result?.locked && cardId === question.answer[index];
    const isWrong = result?.kind === 'try' && cardId !== question.answer[index] && cardId;

    return (
      <div 
        key={`slot-${index}`}
        className={`diagram-node diagram-slot ${node.slotType || 'state'} ${card ? "filled" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => draggedId && dropCard(index, draggedId)}
      >
        {card ? (
          <motion.button 
            layoutId={`card-${card.id}`}
            className={`shape-card placed ${card.type}`} 
            onClick={() => removeCard(index)}
          >
            <ShapeIcon type={card.type} />
            <span>{card.label}</span>
          </motion.button>
        ) : (
          <span className="slot-placeholder">Kéo thả...</span>
        )}
      </div>
    );
  };

  const renderNode = (node, idx) => {
    if (node.type === 'slot') return renderSlot(node);
    
    if (node.type === 'initial') {
      return (
        <div key={idx} className="diagram-node initial-state-container">
          <div className="initial-state"></div>
          {node.label && <span className="node-label">{node.label}</span>}
        </div>
      );
    }
    if (node.type === 'final') {
      return (
        <div key={idx} className="diagram-node final-state-container">
          <div className="final-state"></div>
          {node.label && <span className="node-label">{node.label}</span>}
        </div>
      );
    }
    if (node.type === 'transition') {
      return (
        <div key={idx} className={`diagram-transition ${node.direction || 'right'}`}>
          {node.label && <span className="transition-label">{node.label}</span>}
          <div className="transition-arrow"></div>
        </div>
      );
    }
    if (node.type === 'fork' || node.type === 'join') {
      return <div key={idx} className="diagram-node bar-node"></div>;
    }
    
    return (
      <div key={idx} className="diagram-node state-box">
        {node.label}
      </div>
    );
  };

  return (
    <div className={`interactive-diagram-container layout-${diagram.layout || 'flow'}`}>
      {diagram.nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
