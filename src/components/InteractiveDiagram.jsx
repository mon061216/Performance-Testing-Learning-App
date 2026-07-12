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
            key={card.id}
            layoutId={result?.kind === 'answer' ? undefined : `card-${card.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`shape-card placed ${card.type}`} 
            onClick={() => removeCard(index)}
          >
            <ShapeIcon type={card.type} />
            <span>{card.label}</span>
          </motion.button>
        ) : (
          <span className="slot-placeholder">Drag and drop...</span>
        )}
      </div>
    );
  };

  const renderNode = (node, idx) => {
    if (node.type === 'slot') return renderSlot(node);
    
    if (node.type === 'initial') {
      return (
        <div key={idx} className="diagram-node initial-state-container">
          <div className="initial-state-marker"></div>
          {node.label && <span className="node-label">{node.label}</span>}
        </div>
      );
    }
    if (node.type === 'final') {
      return (
        <div key={idx} className="diagram-node final-state-container">
          <div className="final-state-marker"></div>
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

  if (diagram.layout === 'brainstorm') {
    const centerNode = diagram.nodes.find(n => n.type === 'state');
    const slots = diagram.nodes.filter(n => n.type === 'slot');
    return (
      <div className="interactive-diagram-container layout-brainstorm">
        <div className="brainstorm-center" style={{ position: 'relative', paddingBottom: '20px' }}>
          {centerNode && renderNode(centerNode, 0)}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', width: '2px', height: '20px', background: '#cbd5e1', transform: 'translateX(-50%)' }}></div>
        </div>
        <div className="brainstorm-slots-container">
          {slots.map((slot, i) => renderNode(slot, diagram.nodes.indexOf(slot)))}
        </div>
      </div>
    );
  }

  return (
    <div className={`interactive-diagram-container layout-${diagram.layout || 'flow'}`}>
      {diagram.nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
