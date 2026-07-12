import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Arial, sans-serif',
  themeVariables: {
    primaryColor: '#e0e7ff',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#6366f1',
    lineColor: '#3b82f6',
    secondaryColor: '#dcfce7',
    tertiaryColor: '#f1f5f9',
    edgeLabelBackground: '#ffffff',
    noteBkgColor: '#fef9c3',
    noteTextColor: '#854d0e',
  },
  flowchart: { curve: 'linear', nodeSpacing: 70, rankSpacing: 70 },
  state: { curve: 'linear', nodeSpacing: 70, rankSpacing: 70 }
});

export function MermaidDiagram({ chart }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chart && chartRef.current) {
      mermaid.render(`mermaid-svg-${Math.random().toString(36).substr(2, 9)}`, chart)
        .then((result) => {
          if (chartRef.current) {
            chartRef.current.innerHTML = result.svg;
          }
        })
        .catch((error) => {
          console.error("Mermaid rendering failed:", error);
        });
    }
  }, [chart]);

  if (!chart) return null;

  return (
    <div className="mermaid-container" ref={chartRef} style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
      {/* SVG will be injected here */}
    </div>
  );
}
