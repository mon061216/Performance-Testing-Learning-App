import React from 'react';
import { motion } from 'motion/react';
import { MermaidDiagram } from './MermaidDiagram';

export function SelectableDiagram({ 
  diagram, 
  selections = [], 
  toggleSelection, 
  result,
  question
}) {
  if (!diagram) return null;

  const renderNode = (node, idx) => {
    const isSelected = selections.includes(node.id);
    const isSelectable = node.isSelectable;
    
    // Determine the state based on the result
    let resultClass = '';
    if (result && isSelectable) {
      if (result.kind === 'correct') {
        resultClass = question.answer.includes(node.id) ? 'correct' : '';
      } else if (result.kind === 'answer') {
        if (isSelected && !question.answer.includes(node.id)) {
          resultClass = 'wrong'; // User selected it but it's wrong
        } else if (!isSelected && question.answer.includes(node.id)) {
          resultClass = 'missed'; // Show what they should have selected
        } else if (isSelected && question.answer.includes(node.id)) {
          resultClass = 'correct'; // User selected it and it's correct
        }
      } else if (result.kind === 'try') {
        if (diagram.layout !== 'wrap') {
          if (isSelected && !question.answer.includes(node.id)) {
            resultClass = 'wrong'; // Highlight the wrong choices
          }
        }
      }
    }

    const commonProps = {
      key: idx,
      onClick: () => {
        if (!result?.locked && isSelectable) {
          toggleSelection(node.id);
        }
      }
    };

    if (node.type === 'initial') {
      return (
        <div {...commonProps} className={`diagram-node initial-state-container ${isSelectable ? 'selectable-node' : ''} ${isSelected ? 'selected' : ''} ${resultClass}`}>
          <div className="initial-state-marker"></div>
          {node.label && <span className="node-label">{node.mermaid ? <MermaidDiagram chart={node.mermaid} /> : node.label}</span>}
        </div>
      );
    }
    if (node.type === 'final') {
      return (
        <div {...commonProps} className={`diagram-node final-state-container ${isSelectable ? 'selectable-node' : ''} ${isSelected ? 'selected' : ''} ${resultClass}`}>
          <div className="final-state-marker"></div>
          {node.label && <span className="node-label">{node.label}</span>}
        </div>
      );
    }
    if (node.type === 'transition') {
      return (
        <div {...commonProps} className={`diagram-transition ${node.direction || 'right'} ${isSelectable ? 'selectable-node' : ''} ${isSelected ? 'selected' : ''} ${resultClass}`}>
          {node.label && <span className="transition-label">{node.label}</span>}
          <div className="transition-arrow"></div>
        </div>
      );
    }
    if (node.type === 'fork' || node.type === 'join') {
      return <div key={idx} className="diagram-node bar-node"></div>;
    }
    
    return (
      <motion.div 
        {...commonProps} 
        className={`diagram-node state-box ${isSelectable ? 'selectable-node' : ''} ${isSelected ? 'selected' : ''} ${resultClass}`}
        whileHover={!result?.locked && isSelectable ? { scale: 1.05 } : {}}
        whileTap={!result?.locked && isSelectable ? { scale: 0.95 } : {}}
      >
        {node.label}
      </motion.div>
    );
  };

  return (
    <div className={`interactive-diagram-container layout-${diagram.layout || 'flow'}`}>
      {diagram.nodes.map((node, i) => renderNode(node, i))}
    </div>
  );
}
