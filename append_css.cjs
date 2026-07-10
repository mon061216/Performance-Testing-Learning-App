const fs = require('fs');
const css = `

/* Checkpoint styling */
.path-node.checkpoint {
  width: 90px;
  height: 75px;
  border-radius: 20px;
  box-shadow: 0 10px 0 #cbd5e1, 0 15px 25px rgba(0, 0, 0, 0.15);
}
.path-node.checkpoint.current {
  box-shadow: 0 10px 0 color-mix(in srgb, var(--accent) 70%, #000), 0 15px 30px color-mix(in srgb, var(--accent) 40%, transparent);
}
.path-node.checkpoint.done {
  box-shadow: 0 10px 0 #d9a000, 0 15px 25px rgba(255, 200, 0, 0.3);
}
.checkpoint-base {
  transform: scale(1.25);
}
`;
fs.appendFileSync('src/styles/styles.css', css);
