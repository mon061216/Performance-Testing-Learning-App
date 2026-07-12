const fs = require('fs');

const css = `
/* FINAL FIX FOR CHECKPOINT ALIGNMENT AND LABEL */
.checkpoint-base {
  transform: translate(-50%, -50%) rotateX(33.5deg) scale(1.25) !important;
}

.path-node.checkpoint + .node-title-label {
  left: 105px !important;
}

.path-node.checkpoint .node-3d-face {
  border-radius: 20px !important;
}
`;

fs.appendFileSync('src/styles/styles.css', css);
console.log('Appended final fix css');
