const fs = require('fs');
const css = `
/* FIX CHECKPOINT ALIGNMENT AND BORDER RADIUS */
.checkpoint-base {
  transform: translate(-50%, -50%) rotateX(33.5deg) scale(1.25) !important;
}

.path-node.checkpoint .node-3d-face {
  border-radius: 20px !important;
}
`;
fs.appendFileSync('src/styles/styles.css', css);
console.log('Fixed alignment and border radius');
